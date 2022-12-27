import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Main from './container/Main/Main';
import NewContact from './container/NewContact/NewContact';

function App() {
  return (
    <div className="App container-fluid">
      <div>
        <Navbar/>
      </div>
      <Routes>
        <Route path='/' element={(
          <Main/>
        )}/>
        <Route path='/new-contact' element={(
          <NewContact/>
        )}/>
        <Route path='/edit/:id' element={(
          <NewContact/>
        )}/>
        <Route path='*' element={(<h2>NOT FOUND!</h2>)}/>
      </Routes>
    </div>
  );
}

export default App;
