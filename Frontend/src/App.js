import React,{useState} from 'react'
import './App.css';
import {
  BrowserRouter as Router,Routes,Route,Link
} from "react-router-dom";
import NavBar from "./components/NavBar" 
import About from './components/About';
import Home from './components/Home'
import NoteSate from './contexts/notes/noteState';
import Alerts from './components/Alerts';
import Login from './components/Login';
import Signup from './components/Signup';
function App() {
  const[mode,setMode]=useState('light')
  const[alert,setAlert]=useState(null)
  const togglemode = () =>{
    if(mode==='dark'){
      setMode('light')
      document.body.style.backgroundColor='white'
      showAlert('Light mode has been enabled','success')
    }else{
      setMode('dark')
      document.body.style.backgroundColor='#042743'
      showAlert('Dark mode has been enabled','success')
    }
  }
  const showAlert = (message,type) =>{
    setAlert({
      msg:message,
      type:type
    })
    setTimeout(()=>{
      setAlert(null)
    },1500)
  }
  return (
    <>
    <NoteSate>
      <Router>
        <NavBar  showAlert={showAlert}  mode={mode} toggleMode={togglemode} />
        <Alerts alert={alert}/>
        <div className="container">
          <Routes>
            <Route exact path='/' element={<Home showAlert = {showAlert} mode={mode}/>}/>
            <Route exact path='/about' element={<About mode={mode}/>}/>
            <Route exact path='/login' element={<Login showAlert = {showAlert} mode={mode}/>}/>
            <Route exact path='/signup' element={<Signup showAlert = {showAlert} mode={mode}/>}/>
          </Routes>
        </div>
      </Router>
      </NoteSate>
    </>
  );
}

export default App;
