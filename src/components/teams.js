import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import TeamDetails from './teamDetails';
import './components.css';

const Teams = () => {

    const [teams, setTeams] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [currentTeam, setCurrentTeam] = useState(null)

    // input states
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

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

    const handleChange = event => {
        setSearchTerm(event.target.value);
    };

    useEffect(() => {
        if (teams) {
            const results = teams.filter(team =>
                team.name.toLowerCase().includes(searchTerm)
            );
            setSearchResults(results);
        }
    }, [searchTerm]);

    if (loading) return "Loading..."
    if (error) return "Error!"

    return ( 
        !currentTeam ? 
        <div className={"mainPage"} data-testid="teams">
            <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={handleChange}
            />
            <ul>
            {teams && !searchResults ? teams.map(team => 
                <li>
                    <button onClick={()=>setCurrentTeam(team.id)}>{team.name}</button>
                </li>) : 
                searchResults.map(team => 
                    <li>
                        <button onClick={()=>setCurrentTeam(team.id)}>{team.name}</button>
                    </li>)
            }
            </ul>
        </div> : <div>
            <TeamDetails currentTeam={currentTeam} setCurrentTeam={setCurrentTeam}/>
            </div>
    );
};

Teams.propTypes = {
    
};

export default Teams;