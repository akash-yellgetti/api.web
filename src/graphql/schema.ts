const expressGraphQL = require('express-graphql')
import { GraphQLSchema } from 'graphql'

const schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType
})