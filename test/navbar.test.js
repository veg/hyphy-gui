import React from 'react';
import ReactDOM from 'react-dom';
import {HyPhyGUINavBar} from 'NavBar';

it('renders the navbar component without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<HyPhyGUINavBar/>, div);
});
