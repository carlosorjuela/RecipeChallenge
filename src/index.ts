import "reflect-metadata";
import {connect} from './config/typeorm'
import {startServer} from './server'


async function main() {
    connect();
    const app = await startServer();
    const port = process.env.PORT || '3000'
    app.listen(port, () => {console.log(`Server running on port... ${port}`)}); 
}
main();