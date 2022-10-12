let bumpVersion = async function (version, bump) {
    if (typeof version !== 'string') {
        throw new Error('version not a string');
    }
    if (bump !== 'major' && bump !== 'minor' && bump !== 'patch') {
        throw new Error("bump must be either 'major', 'minor', or 'patch'");
    }
    let versionParts = version.split('.');
    if (versionParts.length < 3) {
        throw new Error('version must be in the format x.y.z');
    }
    let major = parseInt(versionParts[0]);
    let minor = parseInt(versionParts[1]);
    let patch = parseInt(versionParts[2]);
    if (bump === 'major') {
        major++;
        minor = 0;
        patch = 0;
    } else if (bump === 'minor') {
        minor++;
        patch = 0;
    } else if (bump === 'patch') {
        patch++;
    }
    return major + '.' + minor + '.' + patch;
};

module.exports = bumpVersion;
