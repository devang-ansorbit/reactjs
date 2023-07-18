import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import User from './User';

const AllRoutes = () => {
  return (
    <Routes>
    <Route path='/' element={<HomePage />} />
    <Route path='/users' element={<User />} />
   </Routes>
  )
}

export default AllRoutes
