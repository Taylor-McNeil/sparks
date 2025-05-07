import { useState, useEffect } from 'react'
import './App.css'
import Dashboard from './components/Dashboard'
import useUIStore from './store/useUIStore'

function App() {


  const theme = useUIStore((state) => state.theme);
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <>
      <Dashboard />
    </>
  )
}

export default App
