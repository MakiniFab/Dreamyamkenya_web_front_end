import { useState } from 'react'
import './App.css'
import image1 from './assets/images (1).jpeg';
import './index.css';
import SidePanel from './SidePanel';
import Logos from './Logos';

function App() {

  return (
    <div>
      <div className='homepage-container'></div>
      <div>
        <SidePanel/>
        <Logos/>
      </div> 
    </div>
  )
}

export default App
