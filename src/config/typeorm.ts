import {createConnection} from 'typeorm'
import path from 'path'

export async function connect() {
    await createConnection({
        type: "mysql",
        host: process.env.HOST || "localhost",
        port: 3306,
        username: process.env.DB_USERNAME || "root",
        password: process.env.DB_PASSWORD || "1234",
        database: process.env.DB_NAME ||'graphqlts',
        entities: [
          path.join(__dirname, '../entity/**/**.ts')
        ],
        synchronize: true
    
    });
    console.log('Database is connected')
}

