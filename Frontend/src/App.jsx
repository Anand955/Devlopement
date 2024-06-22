import React from 'react';
import Navbar from './Components/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Create from './Components/Create';
import Update from './Components/Update';
import Read from './Components/Read';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route exact path='/create' element={<Create/>}/>
        <Route exact path='/update' element={<Update/>}/>
        <Route exact path='/read' element={<Read/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
