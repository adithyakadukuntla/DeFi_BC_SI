import React from 'react'
import NavigationBar from './components/NavigationBar'
import { Outlet } from 'react-router-dom'
import  Footer  from './components/Footer'

function Layout() {
  return (
    <div>
      <div className='pb-5' style={{zIndex:"100"}}>
        <NavigationBar/>
      </div>
      <div  style={{minHeight:"90vh"}} >
        <Outlet/>
      </div>
      <div className=''>
        <Footer/>
      </div>
    </div>
  ) 
}

export default Layout
