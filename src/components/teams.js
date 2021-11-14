import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import TeamDetails from './teamDetails';
import './components.css';

const Teams = props => {

    const [teams, setTeams] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [currentTeam, setCurrentTeam] = useState(null)

    useEffect(()=>{
        fetch('https://cgjresszgg.execute-api.eu-west-1.amazonaws.com/teams/')
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

    return (
        !currentTeam ? 
        <div>
            <ul>
            {teams && teams.map(team => 
                <li>
                    <button onClick={setCurrentTeam(team.id)}>{team.name}</button>
                </li>)}
            </ul>
        </div> : <div>
            <TeamDetails teamId={currentTeam}/>
            </div>
    );
};

Teams.propTypes = {
    
};

export default Teams;