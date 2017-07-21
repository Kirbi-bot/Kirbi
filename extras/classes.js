const raidProtectionSeconds = 10;
const raidProtectionUserLimit = 4;
const AntiraidSettings = class antiraidSettings {
    constructor(guild) {
        this.channel = guild ? guild.defaultChannel : null;
        this.seconds = raidProtectionSeconds;
        this.limit = raidProtectionUserLimit;
        this.recentMembers = [];
        this.kicking = false;
    };

    static settingTypes() {
        return {
            channel: 'Channel',
            limit: 'int',
            seconds: 'int'
        }
    }
};

module.exports = {
    AntiraidSettings
};
