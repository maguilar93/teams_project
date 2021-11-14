import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

const Teams = props => {

    const [teams, setTeams] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(()=>{
        fetch('https://cgjresszgg.execute-api.eu-west-1.amazonaws.com/users/')
        .then(response => {
            if (response) {
                return response.json()
            }
        })
        .then(data => {
            setTeams(data)
          })
          .catch(error => {
              console.error("Error fetching data: ", error)
              setError(error)
          })
          .finally(setLoading(false))
    }, [])

    if (loading) return "Loading..."
    if (error) return "Error!"

    console.log(teams)

    return (
        <div>
            <ul>
            {teams && teams.map(team => 
                <li>
                    <a href="/">{team.displayName}</a>
                </li>)}
            </ul>
        </div>
    );
};

Teams.propTypes = {
    
};

export default Teams;