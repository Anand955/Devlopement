import React from 'react'
import Navbar from './Components/Navbar'
import {BrowserRouter, Routes, Route }  from "react-router-dom"


const App = () => {
  return (
<>

<Navbar/>
<BrowserRouter>
<Routes>
  <Route exact path='/' element=""/>
</Routes>
</BrowserRouter>


</>

      

  )
}

export default App