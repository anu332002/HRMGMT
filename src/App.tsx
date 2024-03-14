import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Router from './appRouting';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';

const App: React.FC = (): JSX.Element => {
  return (
    <BrowserRouter>
      <div className="App">
        <Router />
      </div>
    </BrowserRouter>
  );
}

export default App;
