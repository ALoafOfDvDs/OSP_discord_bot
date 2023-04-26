module.exports = {
    check_mod(role) {
        return role === 'OSP' || role === 'Team Leaders' ||
               role === 'Archivists' || role === 'Keepers';
    },
}