const http = require('http');
const fs = require('fs');
const path = require('path');
const cors=require('cors');

const dataDir = path.join(__dirname, 'data');

const express = require('express');

const app = express();
const corsOptions={
  origin:"http://localhost:5173/"
}
app.use(cors(corsOptions));
app.use(express.json())


// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method !== 'POST' || req.url !== '/') {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
    return;
  }

  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });

  req.on('end', () => {
    try {
      const data = JSON.parse(body);
      const { id, name, email } = data;

      if (id === undefined || name === undefined || email === undefined) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Missing required fields: user_id, name, email' }));
        return;
      }

      const filePath = path.join(dataDir, `${id}.json`);

      // Check if file already exists
      if (fs.existsSync(filePath)) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'User already saved' }));
        return;
      }

      // 50% chance of being flaky
      const isFlaky = Math.random() < 0.5;

      if (isFlaky) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Flaky server - request failed' }));
        return;
      }

      // Save the file
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'User saved successfully' }));
    } catch (err) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Invalid JSON' }));
    }
  });
});



const PORT = 7676;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
