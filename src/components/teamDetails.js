import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './components.css';
import UserDetails from './userDetails';

const TeamDetails = props => {

    const {currentTeam, setCurrentTeam} = props;
    
    const [teamDetails, setTeamDetails] = useState(null)
    const [users, setUsers] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [currentUser, setCurrentUser] = useState(null)

    const teamMembersDetails = []
    let teamLeadName;

    useEffect(()=>{
        if (currentTeam) {
            fetch(`https://cgjresszgg.execute-api.eu-west-1.amazonaws.com/teams/${currentTeam}`)
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
    }, [currentTeam])

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

    return (
        !currentUser ? 
        teamDetails && currentTeam && 
        <div>
            <div className='teamDetails'>
                <div className="detailsSection">
                    <div>{`Name`}</div>
                    <div>{teamDetails.name}</div>
                </div>
                <div className="detailsSection">
                    <div>{`Team Lead Display Name`}</div>
                    {teamLeadName && <button onClick={()=>{setCurrentUser(teamLeadName.id)}}>{teamLeadName.displayName}</button>}
                </div>
                <div className="detailsSection">
                    <div>{`Members Display Name`}</div>
                    <div className={'listOfNames'}>{teamMembersDetails.map(member => 
                            <button className='teamMember' onClick={()=>{setCurrentUser(member.id)}}>{member.displayName}</button>
                        )}
                    </div>
                </div>
            </div>
            <button onClick={()=>{setCurrentTeam(null)}}>Return</button>
        </div> : <div><UserDetails currentUser={currentUser} setCurrentUser={setCurrentUser}/></div>
    );
};

TeamDetails.propTypes = {
    
};

export default TeamDetails;