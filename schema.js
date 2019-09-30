const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLBoolean, GraphQLList, GraphQLSchema } = require('graphql');
const axios = require('axios');

//Launch type 
const LaunchType = new GraphQLObjectType({
    name: 'Launch',
    fields: () => ({
        flight_number: {type: GraphQLInt},
        mission_name: {type: GraphQLString},
        launch_year: {type: GraphQLString},
        launch_date_local: {type: GraphQLString},
        launch_success: {type: GraphQLBoolean},
        rocket: {type: RocketType}
    })
});

//Rocket type 
const RocketType = new GraphQLObjectType({
    name: 'Rocket',
    fields: () => ({
        rocket_id: {type: GraphQLString},
        rocket_name: {type: GraphQLString},
        rocket_type: {type: GraphQLString}
    })
})

//Root query 

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({
        launches: {
            type: new GraphQLList(LaunchType),
            resolve(parent, args){
                return axios
                    .get('https://api.spacexdata.com/v3/launches')
                    .then(result => result.data);
            }
        },
        launch: {
            type: LaunchType,
            args: {
                flight_number: {
                    type: GraphQLInt
                }
            },
            resolve(parent, {flight_number}){
                return axios
                    .get(`https://api.spacexdata.com/v3/launches/${flight_number}`)
                    .then(result => result.data);
            }
        },
        rockets: {
            type: new GraphQLList(RocketType),
            resolve(parent, args){
                return axios
                    .get('https://api.spacexdata.com/v3/rockets')
                    .then(result => result.data);
            }
        },
        rocket: {
            type: RocketType,
            args: {
                id: {
                    type: GraphQLString
                }
            },
            resolve(parent, {id}){
                return axios
                    .get(`https://api.spacexdata.com/v3/rockets/${id}`)
                    .then(result => result.data);
            }
        }
    })

});

module.exports = new GraphQLSchema({
    query: RootQuery
});