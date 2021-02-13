const languages = require('./languages.json')
const _ = require('lodash')
const {LanguagesDao} = require("../../dao/language");

module.exports.performMigration = async (req, res) => {

    for (const code in languages) {
        const {name, nativeName} = languages[code]
        await LanguagesDao.create({code, name, nativeName})
    }

    res.json({success: true})
}
