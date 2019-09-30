import React, { Component, Fragment } from 'react'
import gql from 'graphql-tag'
import LaunchItem from './LaunchItem'
import MissionKey from './MissionKey'
import Spinner from './Spinner'
import { Query } from 'react-apollo'

const launches_query = gql `query LaunchesQuery {
    launches {
        flight_number
        mission_name
        launch_date_local
        launch_success
    }
}`

export class Launches extends Component {
  render() {
    return (
      <Fragment>
        <h1 className="display-4 my-3">Launches</h1>
        <MissionKey />
        <Query query={launches_query}>
            {
                ({loading, error, data}) => {
                    if(loading) {
                      return <Spinner />
                    }
                    if(error) {
                        console.error(error)
                    }

                    return <Fragment>{data.launches.map(launch => <LaunchItem key={launch.flight_number} {...launch} />)}</Fragment>;
                } 
            }
        </Query>
      </Fragment>
    )
  }
}

export default Launches;
