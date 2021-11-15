import React from 'react';
import ReactDOM from 'react-dom'
import UserDetails from '../userDetails'

it('renders userDetails without crashing', ()=>{
    const div = document.createElement('div');
    ReactDOM.render(<UserDetails></UserDetails>, div)
})
