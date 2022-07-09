import React, {useState, useEffect} from 'react';
import './App.css';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Navigation from './components/Navigation/Navigation';
import UserDashboard from './components/UserDashboard/UserDashboard';
import AddMembers from './components/AddMembers/AddMembers';
import Tournament from './components/Tournament/Tournament';
import ProtectedRoute from './components/SignIn/ProtectedRoute';
import { BrowserRouter, Routes, Route} from "react-router-dom";


const App = () => {
    const [path, setPath] = useState("/");
    const [currentUser, setCurrentUser] = useState({name:"", id: ""});
    
    useEffect(()=> {
        setPath(window.location.pathname);
        if(localStorage.getItem("name")){
            setCurrentUser({
                name: localStorage.getItem("name"),
                id: localStorage.getItem("id")
            })
        }
    },[path])//only runs the effect again if path changes and on first mount
    

    const loginUser = () => {
        setCurrentUser({
            name: localStorage.getItem("name"),
            id: localStorage.getItem("id")
        })
    }
    const logoutUser = () => {
        setCurrentUser({
            name: "",
            id: ""
        })
    }

    return(
        <>
            <BrowserRouter>
                <Navigation logoutUser={logoutUser}/>
                <h1 className='f1 tc dark-blue'>Tournament Manager</h1>
                <Routes>
                    <Route path="/" element={<SignIn loginUser={loginUser}/>}/>
                    <Route path="/register" element={<Register loginUser={loginUser} />}/>
                    <Route element={<ProtectedRoute user={currentUser}/>}>
                        <Route path="/dashboard" element={ <UserDashboard user={currentUser}/>}/>
                        <Route path="/members" element={<AddMembers user={currentUser}/>}/>
                        <Route path="/tournament" element={<Tournament user={currentUser}/>}/>
                    </Route>
                    <Route path='*' element={<SignIn loginUser={loginUser}/>}/>
                </Routes>
                                
            </BrowserRouter>
        </>
    );
}

export default App;