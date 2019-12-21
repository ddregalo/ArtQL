const { db } = require('../pgAdaptor.js')
const { GraphQlObjectType, GraphQLID } = require('graphql')
const { UserType, ProjectType } = require('./types.js')

const RootQuery = new GraphQlObjectType({
    name: 'RootQueryType',
    type: 'Query',
    fields: {
        project: {
            type: ProjectType,
            args: { id: { type: GraphQLID } },
            resolve(parentValue, args) {
              const query = `SELECT * FROM project WHERE id=$1`;
              const values = [args.id];
      
              return db
                .one(query, values)
                .then(res => res)
                .catch(err => err);
            }
          },
          user: {
            type: UserType,
            args: { id: { type: GraphQLID } },
            resolve(parentValue, args) {
              const query = `SELECT * FROM users WHERE id=$1`;
              const values = [args.id];
      
              return db
                .one(query, values)
                .then(res => res)
                .catch(err => err);
            }
          }
    }
})

exports.query = RootQuery
