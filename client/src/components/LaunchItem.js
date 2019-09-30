import React from 'react'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'

import BooleanItem from './BooleanItem'

export default function LaunchItem({flight_number, mission_name, launch_date_local, launch_success}) {
  return (
    <div className="card card-body mb-3">
        <div className="row">
            <div className="col-md-9">
                <h4>Mission: <BooleanItem toggle={launch_success}>{mission_name}</BooleanItem></h4>
                <p>Date: <Moment format="DD-MM-YYYY HH:MM">{ launch_date_local }</Moment></p>
            </div>
            <div className="col-md-3">
                <Link to={`/launch/${flight_number}`} className="btn btn-secondary">Details</Link>
            </div>
        </div>
    </div>
  )
}

