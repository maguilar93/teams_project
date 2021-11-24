import React from 'react';
import './components.css';
import {useTeams} from "../talons/useTeams"
import {NavLink} from "react-router-dom";

const Teams = () => {

    const talonProps = useTeams();

    const { 
      searchResults,
      teams,
      handleChange,
      loading,
      error,
      searchTerm,
    } = talonProps;

    if (loading) return "Loading..."
    if (error) return error

    return ( 

        <div className={"mainPage"} data-testid="teams">
            <input
                type="text"
                placeholder="Search"
                value={searchTerm ? searchTerm : ''}
                onChange={handleChange}
            />
            <ul>
            {teams && !searchResults ? teams.map(team => 
                <li>
                    <NavLink to={`/team/${team.id}`}>{team.name}</NavLink>
                </li>) : 
                searchResults.map(team => 
                    <li>
                        <NavLink to={`/team/${team.id}`}>{team.name}</NavLink>
                    </li>)
            }
            </ul>
        </div> 
    );
};

export default Teams;