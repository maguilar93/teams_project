import React from 'react';
import { useParams } from 'react-router';
import {NavLink} from "react-router-dom";
import { useUserDetails } from '../talons/useUserDetails';

const UserDetails = () => {

    const params = useParams()

    const talonProps = useUserDetails({user: params.user})
    const {loading, error, userDetails} = talonProps
    const image = userDetails && userDetails.avatarUrl

    if (loading) return "Loading..."
    if (error) return "Error!"

    return (
        <div data-testid="userDetails" >
            {userDetails && 
            <div className="App-body">
                <div>
                    <img src={image} alt={'user'}/>
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
                <NavLink to={`/team/${params.team}`}>Return</NavLink>
            </div>}
        </div>
    );
};

export default UserDetails;