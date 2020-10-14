import {createConnection} from 'typeorm'
import path from 'path'

export async function connect() {
    await createConnection({
        type: "mysql",
        host: process.env.HOST || "us-cdbr-east-02.cleardb.com",
        port: 3306,
        username: process.env.DB_USERNAME || "bf6d8ddd47a321",
        password: process.env.DB_PASSWORD || "9971bf23",
        database: process.env.DB_NAME || 'heroku_15d24a3b3f63fc5',
        entities: [
          path.join(__dirname, '../entity/**/**.ts')
        ],
        synchronize: true
    
    });
    console.log('Database is connected')
}