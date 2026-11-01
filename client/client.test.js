import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import fs from 'fs';
import users from './user-data/src/data';

const axios = require('axios');
const ids = users.map(u => u.user_id);

const real = {
  post: axios.post,
  existsSync: fs.existsSync,
  readFileSync: fs.readFileSync,
  writeFileSync: fs.writeFileSync,
};

async function runClient() {
  vi.resetModules();
  await import('./client.js');
  await new Promise(r => setTimeout(r, 0));
}

describe('client.js', () => {
  beforeEach(() => {
    fs.existsSync = vi.fn(() => false);
    fs.writeFileSync = vi.fn();
  });

  afterEach(() => {
    axios.post = real.post;
    fs.existsSync = real.existsSync;
    fs.readFileSync = real.readFileSync;
    fs.writeFileSync = real.writeFileSync;
  });

  it('saves all users on 200', async () => {
    axios.post = vi.fn(() => Promise.resolve({}));
    await runClient();
    expect(axios.post).toHaveBeenCalledTimes(users.length);
    expect(fs.writeFileSync).toHaveBeenLastCalledWith('./saved-users.json', JSON.stringify(ids));
  });

  it('saves nothing on 500', async () => {
    axios.post = vi.fn(() => Promise.reject({ response: { status: 500 } }));
    await runClient();
    expect(fs.writeFileSync).not.toHaveBeenCalled();
  });

  it('skips saved users', async () => {
    fs.existsSync = vi.fn(() => true);
    fs.readFileSync = vi.fn(() => JSON.stringify(ids));
    axios.post = vi.fn(() => Promise.resolve({}));
    await runClient();
    expect(axios.post).not.toHaveBeenCalled();
  });
});