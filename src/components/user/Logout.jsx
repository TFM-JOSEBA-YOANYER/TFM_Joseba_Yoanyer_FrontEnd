import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

export const Logout = () => {

    const { setAuth, setCounters } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
      //Vaciar LocalStorage
      localStorage.clear();

      // Setear estados globales o vacio
      setAuth({});
      setCounters({});

      // Navigate (redirección) al login
      navigate("/login");

    });
    
  return (
    <h1> Cerrando Sesión... </h1>
  )
}
