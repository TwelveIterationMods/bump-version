const core = require('@actions/core');
const bumpVersion = require('./version');

async function run() {
  try {
    const version = core.getInput('version');
    const bump = core.getInput('bump');
    core.info(`Bumping ${bump} version of ${version} ...`);

    const bumpedVersion = await bumpVersion(version, bump);

    core.setOutput('version', bumpedVersion);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
