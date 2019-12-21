const graphql = require('graphql')
const db = require('../pgAdaptor.js')
const { GraphQLObjectType, GraphQLID, GraphQLBoolean, GraphQLString } = graphql
const { ProjectType } = require('./types')

const RootMutation = new GraphQLObjectType({
    name: "RootMutationType",
    type: "Mutation",
    fields: {
        addProject: {
            type: ProjectType,
            args: {
                creatorId: { type:GraphQLID },
                title: { type: GraphQLString },
                description: { type: GraphQLString },
            },
            resolve(parentValue, args) {
                const query = 'INSERT INTO project(creator_id, created, title, description) VALUES ($1, $2, $3, $4) RETURNING title'
                const params = [
                    args.creatorId,
                    new Date(),
                    args.title,
                    args.description
                ]

                return db
                        .one(query, params)
                        .then(res => res)
                        .catch(err => console.log(err))
            }
        }
    } 
})

exports.mutation = RootMutation