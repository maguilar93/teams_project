import axios from 'axios';
import React, { useReducer, useEffect, useState } from 'react';
import TeamDetails from './teamDetails';

const initialState = {
    loading: true,
    error: '',
    teams: {}
}

const reducer = (state, action) => {
    switch(action.type) {
        case 'FETCH_SUCCESS' : 
        return {
            loading: false, 
            teams: action.payload,
            error: ''
        }

        case 'FETCH_ERROR' : 
        return {
            laoding: false,
            teams: {},
            error: 'Something went wrong!'
        }

        default: 
        return state
    }
}

const DataFetchingTeams = () => {

    const [state, dispatch] = useReducer(reducer, initialState)

    const [currentTeam, setCurrentTeam] = useState(null)

    // input states
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]); 

    const handleChange = event => {
        setSearchTerm(event.target.value);
    };

    useEffect(()=>{
        axios.get('https://cgjresszgg.execute-api.eu-west-1.amazonaws.com/teams/')
        .then(response => {
            console.log('both', response)
            dispatch({type: 'FETCH_SUCCESS', payload: response.json()})
        })
        .catch(error =>{
            dispatch({type: 'FETCH_ERROR', payload: error})
        })
    }, [])

    console.log('zin', state.teams)

    useEffect(() => {
        if (state.teams) {
            const results = state.teams.filter(team =>
                team.name.toLowerCase().includes(searchTerm)
            );
            setSearchResults(results);
        }
    }, [searchTerm, state]);

    if (state.loading) return "Loading..." 
    if (state.error) return state.error
    if (!currentTeam) { 
        return (
        <div className={"mainPage"} data-testid="teams">
            <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={handleChange}
            />
            <ul>
            {state.teams && !searchResults ? state.teams.map(team => 
                <li>
                    <button onClick={()=>setCurrentTeam(team.id)}>{team.name}</button>
                </li>) : 
                searchResults.map(team => 
                    <li>
                        <button onClick={()=>setCurrentTeam(team.id)}>{team.name}</button>
                    </li>)
            }
            </ul>
        </div> 
    )} else {
        <div>
            <TeamDetails currentTeam={currentTeam} setCurrentTeam={setCurrentTeam}/>
        </div>
    }
};

export default DataFetchingTeams;