import React from 'react';
import ReactDOM from 'react-dom'
import Teams from '../teams'

it('renderst teams without crashing', ()=>{
    const div = document.createElement('div');
    ReactDOM.render(<Teams></Teams>, div)
})