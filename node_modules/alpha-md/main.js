const languageRegex = require(`./lib/wordlist.js`);
module.exports = function check(word) {
    let regex = new RegExp('\n' + word +'\n');
            if (languageRegex.match(regex)) {
                return true;
            }
    return false;
};
