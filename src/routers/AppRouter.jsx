// import { useEffect, useState } from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
  } from 'react-router-dom';

import { HomeScreen } from '../components/app/HomeScreen';
import { AuthRouter } from './AuthRouter';
import { DashboardRouter } from './DashboardRouter';
import { PublicProfileScreen } from '../components/app/PublicProfileScreen';

export const AppRouter = () => {

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path='/' element={<HomeScreen />}/>
  
          <Route path='auth/*' element={<AuthRouter />} />
  
          <Route path='dashboard/*' element={<DashboardRouter />}/>
          
          <Route path='u/:username' element={<PublicProfileScreen />}/>
        </Routes>
  
</      div>
    </BrowserRouter>
  )
}
