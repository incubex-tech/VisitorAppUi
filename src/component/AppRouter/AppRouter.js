import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from '../Login/Login'
import CheckIn from '../ChekIn/checkIn'

export default function AppRouter() {
  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path="checkIn" element={<CheckIn />} />
    </Routes>
  )
}
