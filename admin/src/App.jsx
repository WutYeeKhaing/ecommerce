import { useState } from 'react'

import './App.css'
import Navbar from './Components/Navbar/Navbar'
import Admin from './Pages/Admin/Admin'
import {Routes,Route} from 'react-router-dom'
import AddProduct from './Components/AddProduct/AddProduct'
import ListProduct from './Components/ListProduct/ListProduct'
function App() {
  

  return (
    <div>
      <Navbar/>
      <Admin/>
      <Routes>
      <Route path='/addproduct' element={<AddProduct/>}/>
      <Route path='/listproduct' element={<ListProduct/>}/>
      </Routes>
    </div>
  )
}

export default App
