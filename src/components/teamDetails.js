import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './components.css';

const TeamDetails = props => {

    const {teamId} = props;
    
    const [teamDetails, setTeamDetails] = useState(null)
    const [users, setUsers] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [currentUser, setCurrentUser] = useState(null)

    const teamMembersDetails = []
    let teamLeadName;

    useEffect(()=>{
        if (teamId) {
            fetch(`https://cgjresszgg.execute-api.eu-west-1.amazonaws.com/teams/${teamId}`)
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
        }
    }, [teamId])


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

    console.log('pero', users)

    if (loading) return "Loading..."
    if (error) return "Error!"
    if (teamDetails && teamDetails.teamMemberIds && users) {
        teamDetails.teamMemberIds.forEach(id => teamMembersDetails.push(users.find( user => user.id === id)))
        teamLeadName = users.find( user => user.id === teamDetails.teamLeadId)
    }

    function titleCase(text) {
        const result = text.replace(/([A-Z])/g, " $1");
        const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
        return finalResult;
    }

    console.log(teamMembersDetails)
    console.log('currentUser', currentUser)

    return (
        teamDetails && teamId && 
        <div className='teamDetails'>
            <div className="detailsSection">
                <div>{`Name`}</div>
                <div>{teamDetails.name}</div>
            </div>
            <div className="detailsSection">
                <div>{`Team Lead`}</div>
                {teamLeadName && <button>{titleCase(teamLeadName.displayName)}</button>}
            </div>
            <div className="detailsSection">
                <div>{`Members`}</div>
                <ul>{teamMembersDetails.map(member => 
                    <li>
                        <button className='teamMember' onClick={()=>{setCurrentUser(member.id)}}>{titleCase(member.displayName)}</button>
                    </li>
                    )}
                </ul>
            </div>
        </div>
    );
};

TeamDetails.propTypes = {
    
};

export default TeamDetails;