import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

const UserDetails = props => {

    const {currentUser, setCurrentUser} = props

    const [userDetails, setUserDetails] = useState(null)
    const [users, setUsers] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(()=>{
        fetch(`https://cgjresszgg.execute-api.eu-west-1.amazonaws.com/users/${currentUser}`)
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
    }, [])

    if (loading) return "Loading..."
    if (error) return "Error!"

    return (
        <div data-testid="userDetails">
            {userDetails && 
            <div>
                <div>
                    <img src={userDetails.avatarUrl}/>
                </div>
                <div className='teamDetails'>
                <div className="detailsSection">
                        <div>{`Display Name`}</div>
                        <div>{`${userDetails.displayName}`}</div>
                    </div>
                    <div className="detailsSection">
                        <div>{`Name`}</div>
                        <div>{`${userDetails.firstName} ${userDetails.lastName}`}</div>
                    </div>
                    <div className="detailsSection">
                        <div>{`Location`}</div>
                        <div>{userDetails.location}</div>
                    </div>
                </div>
                <button onClick={()=>{setCurrentUser(null)}}>Return</button>
            </div>}
        </div>
    );
};

UserDetails.propTypes = {
    
};

export default UserDetails;