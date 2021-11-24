import {useState, useEffect} from 'react';

export const useUserDetails = props => {

    const {user} = props;

    console.log(user)

    const [userDetails, setUserDetails] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(()=>{
        fetch(`https://cgjresszgg.execute-api.eu-west-1.amazonaws.com/users/${user}`)
        .then(response => {
            if (response) {
                return response.json()
            }
        })
        .then(data => {
            setUserDetails(data)
        })
        .catch(error => {
            console.error("Error fetching data: ", error)
            setError(error)
        })
        .finally(setLoading(false))
    }, [user])

    return {
        loading,
        error,
        userDetails
    }
};