const db = require('mongoose')

db.set('useFindAndModify', false);
db.Promise = global.Promise
async function connect(url=''){
    await db.connect(url,{
        useNewUrlParser:true,
        dbName:'PetApp',
        useUnifiedTopology:true,
        useFindAndModify:false
        })
    console.log('[DB conectada]');
}

module.exports = connect