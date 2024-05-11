import React from 'react'
import { Navigation, TopHeader } from '../../components'
import { Outlet } from 'react-router-dom'

const LayoutPublic = () => {
  return (
    <main>
      <TopHeader/>
      <Navigation/>
      <div>
        <Outlet></Outlet>
      </div>
    </main>
  )
}

export default LayoutPublic