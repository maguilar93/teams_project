import {useEffect, useState} from 'react';

export const useTeams = () => {

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
    }, [searchTerm, teams]);

    return {
        searchResults,
        teams,
        handleChange,
        loading,
        searchTerm,
        error,
        currentTeam,
        setCurrentTeam
    };
};