import { GraphQLSchema, GraphQLObjectType, GraphQLList } from 'graphql'
import { UserGraphQLType } from '../model/user.model'
import { userService } from '../service'

export const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        users: {
            type: new GraphQLList(UserGraphQLType),
            description: 'List of All Users',
            resolve: () => userService.read({})
        },
    })
})