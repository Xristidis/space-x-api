import React from 'react';
import logo from './logo.svg';
import './App.css';

import { useQuery } from '@apollo/react-hooks';
import gql from "graphql-tag";

const GET_ROCKET_INFO = gql`
{
  rockets {
    name
    height {
      meters
    }
    cost_per_launch
    country
    active
    description
    diameter {
      feet
      meters
    }
    id
  }
}`

function App() {
  const { data, loading, error } = useQuery(GET_ROCKET_INFO);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  console.log(data.rockets);
  return (
    <React.Fragment>
      <h1>ACTIVE ROCKETS</h1>
      <div className="container">
        {data.rockets.map((rocket, id) => (
          <div key={id} className="card">
            {/* <img src={rocket.image} /> */}
            <div class="card-body">
              <h3>{rocket.name}</h3>
              <h3>${rocket.cost_per_launch}</h3>
              <h3>{rocket.country}</h3>
              <h3>{rocket.description}</h3>

              <p>
                {rocket.evolutions && rocket.evolutions.length !== 0 && (
                  <p>
                    {" "}
                    Evolutions:
                    {rocket.evolutions.map((e, indx) => {
                      return <p key={indx}> {e.name} </p>;
                    })}
                  </p>
                )}
              </p>
            </div>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
}

export default App;
