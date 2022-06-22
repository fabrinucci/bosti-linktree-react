import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { DashboardScreen } from '../components/app/DashboardScreen'
import { EditProfileScreen } from '../components/app/EditProfileScreen'

export const DashboardRouter = () => {
  return (
    <div>
      <Routes>
        <Route
          path='/' 
          element={<DashboardScreen />}
        />
        <Route 
          path='/profile' 
          element={<EditProfileScreen />}
        />
      </Routes>
    </div>
  )
}
