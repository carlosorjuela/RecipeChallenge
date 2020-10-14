import express from 'express'
import {ApolloServer} from 'apollo-server-express'
import {UserResolver} from './resolvers/UserResolver'
import {buildSchema} from 'type-graphql'
import {RecetaResolver} from './resolvers/RecetaResolver'
import {CategoryResolver} from './resolvers/CategoryResolver'
import { authChecker, decodedToken } from './auth'

export async function startServer() {
    const app = express();
const server = new ApolloServer ({
    schema: await buildSchema({
        resolvers: [CategoryResolver, RecetaResolver, UserResolver], authChecker,
    }),
    playground:true,
    introspection: true,

    context: async ({ req } ) => {
			
        let user:any = {}

        if(req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            const token = req.headers.authorization.split(' ')[1]
            const decoded = await decodedToken(token)
            user = decoded
        } 
        return { req, user }
    }
})
server.applyMiddleware({app, path: '/graphql'});    
return app;
}
