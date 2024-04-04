import React from 'react'
import { Outlet } from 'react-router-dom'
import {Header, Footer} from '../../Pages/pages'
import {store} from '../../Store/store'
import { Provider } from 'react-redux' 
function Layout() {
  return (
    <Provider store={store}>
      <div className='flex flex-col justify-between'>
        <Header/>
        <Outlet />        
        <Footer />
      </div>
    </Provider>
  )
}

export default Layout