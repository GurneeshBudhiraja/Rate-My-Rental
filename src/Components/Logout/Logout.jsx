import React,  {useState} from 'react'
import { Button } from '../components'
import {auth} from '../../Appwrite/Services/services'
import { useDispatch } from 'react-redux'
import {logoutUser} from "../../Store/AuthSlice/AuthSlice"

function Logout() {
  const dispatch= useDispatch();
  
  
  return (
    <div>
      
      <Button
      children="Logout" 
      />
    </div>
  )
}

export default Logout