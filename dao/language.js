const db = require('../config/db');

module.exports.LanguagesDao = {
    create: async ({name, code, nativeName}) => {
        const query = `INSERT INTO Language (code, name, native_name) VALUES ($1, $2, $3);`;
        const params = [code, name, nativeName];
        const { rows } = await db.query(query, params);
        return rows
    }
}