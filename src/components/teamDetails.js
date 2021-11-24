import React from 'react';
import './components.css';
import { useParams } from "react-router-dom";
import {NavLink} from "react-router-dom";
import {useTeamDetails} from "../talons/useTeamDetails"

const TeamDetails = props => {

    const params = useParams()

    const talonProps = useTeamDetails({team: params.team})

    const {teamDetails, loading, error, users} = talonProps

    const teamMembersDetails = []
    let teamLeadName;

    if (loading) return "Loading..."
    if (error) return error;
    if (teamDetails && teamDetails.teamMemberIds && users) {
        teamDetails.teamMemberIds.forEach(id => teamMembersDetails.push(users.find( user => user.id === id)))
        teamLeadName = users.find( user => user.id === teamDetails.teamLeadId)
    }

    return (
        teamDetails &&
        <div className="App-body">
            <div className='teamDetails'>
                <div className="detailsSection">
                    <div>{`Name`}</div>
                    <div>{teamDetails.name}</div>
                </div>
                <div className="detailsSection">
                    <div>{`Team Lead Display Name`}</div>
                    {teamLeadName && <NavLink to={`/user/${teamLeadName.id}`}>{teamLeadName.displayName}</NavLink>}
                </div>
                <div className="detailsSection">
                    <div>{`Members Display Name`}</div>
                    <div className={'listOfNames'}>{teamMembersDetails.map(member => 
                            <NavLink to={`/team/${params.team}/user/${member.id}`}>{member.displayName}</NavLink>
                        )}
                    </div>
                </div>
            </div>
            <NavLink to="/">Return</NavLink>
        </div> 
    );
};

export default TeamDetails;