import {useEffect, useState} from 'react';

export const useTeamDetails = props => {

    const { team } = props;

    const [teamDetails, setTeamDetails] = useState(null)
    const [users, setUsers] = useState(null);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(()=>{
        fetch(`https://cgjresszgg.execute-api.eu-west-1.amazonaws.com/teams/${team}`)
        .then(response => {
            if (response) {
                return response.json()
            }
        })
        .then(data => {
            setTeamDetails(data)
        })
        .catch(error => {
            console.error("Error fetching data: ", error)
            setError(error)
        })
        .finally(setLoading(false))
    }, [team])

    useEffect(()=>{
        fetch(`https://cgjresszgg.execute-api.eu-west-1.amazonaws.com/users`)
        .then(response => {
            if (response) {
                return response.json()
            }
        })
        .then(data => {
            setUsers(data)
        })
        .catch(error => {
            console.error("Error fetching data: ", error)
            setError(error)
        })
        .finally(setLoading(false))
    }, [])

    return {
        teamDetails,
        loading,
        error,
        users
    };
};