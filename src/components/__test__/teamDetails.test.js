import React from 'react';
import ReactDOM from 'react-dom'
import TeamDetails from '../teamDetails'

it('renders teamDetails without crashing', ()=>{
    const div = document.createElement('div');
    ReactDOM.render(<TeamDetails></TeamDetails>, div)
})
