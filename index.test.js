const bumpVersion = require('./version');
const process = require('process');
const cp = require('child_process');
const path = require('path');

test('throws invalid version', async () => {
  await expect(bumpVersion(123, 'major')).rejects.toThrow('version not a string');
});

test('throws malformed version', async () => {
  await expect(bumpVersion('1.0', 'major')).rejects.toThrow('version must be in the format x.y.z');
});

test('throws invalid bump', async () => {
  await expect(bumpVersion('1.0.0', 'ultra')).rejects.toThrow("bump must be either 'major', 'minor', or 'patch'");
});

test('bump major', async () => {
  const version = await bumpVersion('1.2.3', 'major');
  expect(version).toBe('2.0.0');
});

test('bump minor', async () => {
  const version = await bumpVersion('1.2.3', 'minor');
  expect(version).toBe('1.3.0');
});

test('bump patch', async () => {
  const version = await bumpVersion('1.2.3', 'patch');
  expect(version).toBe('1.2.4');
});

// shows how the runner will run a javascript action with env / stdout protocol
test('test runs', () => {
  process.env['INPUT_VERSION'] = '1.0.0';
  process.env['INPUT_BUMP'] = 'major';
  const ip = path.join(__dirname, 'index.js');
  const result = cp.execSync(`node "${ip}"`, {env: process.env}).toString();
  console.log(result);
})
