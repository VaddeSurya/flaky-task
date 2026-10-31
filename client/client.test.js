import { test, expect, vi, beforeEach, afterEach } from 'vitest';
import fs from 'fs';
import users from './user-data/src/data';
// import { run } from './client.js';
const axios = require('axios');
const ids = users.map(u => u.user_id);

async function run() {
  vi.resetModules();                         
  await import('./client.js');               
  await new Promise(r => setTimeout(r, 0)); 
}

beforeEach(() => {
  vi.spyOn(fs, 'existsSync').mockReturnValue(false);
  vi.spyOn(fs, 'writeFileSync').mockImplementation(() => {});
});

afterEach(() => vi.restoreAllMocks());

test('saves all users on 200', async () => {
  const post = vi.spyOn(axios, 'post').mockResolvedValue({ status: 200 });
  await run();
  expect(post).toHaveBeenCalledTimes(users.length);
  expect(fs.writeFileSync).toHaveBeenLastCalledWith('./saved-users.json', JSON.stringify(ids));
});

test('saves nothing on 500', async () => {
  vi.spyOn(axios, 'post').mockRejectedValue({ response: { status: 500 } });
  await run();
  expect(fs.writeFileSync).not.toHaveBeenCalled();
});

test('skips already saved users', async () => {
  fs.existsSync.mockReturnValue(true);
  vi.spyOn(fs, 'readFileSync').mockReturnValue(JSON.stringify(ids));
  const post = vi.spyOn(axios, 'post').mockResolvedValue({ status: 200 });
  await run();
  expect(post).not.toHaveBeenCalled();
});