// config/database.ts

function getDBConf() {
    if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "development"){
        return {
            'connection': {
                'host': 'localhost',
                'user': 'de_jackies',
                'password' : 'spelvreugde666',
               'createDatabaseTable': 'true'

         },
            'database': 'tournament',
            'users_table': 'users'
        };
    }
    return {
        'connection': {
            'host': 'localhost',
            'user' : 'root'
        },
        'database': 'tournament',
        'users_table': 'users'
        };
}

module.exports =  getDBConf();

