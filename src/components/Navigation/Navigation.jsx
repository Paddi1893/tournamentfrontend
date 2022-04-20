import React from "react";
import {Link, NavLink, useLocation} from "react-router-dom";

const Navigation = ({logoutUser}) => {
    let location = useLocation();
    
    if(location.pathname === "/"){
        return(
            <div>
                <nav style={{display: "flex", justifyContent: "flex-end"}}>
                    <NavLink to="/register" className="f3 link dim black underline pa3 pointer" >Register</NavLink>                        
                </nav>
            </div> 
        )
    }
    else if(location.pathname === "/register"){
        return(
            <div>
                <nav style={{display: "flex", justifyContent: "flex-end"}}>
                    <Link  to="/" className="f3 link dim black underline pa3 pointer">Sign in</Link>
                </nav>
            </div> 
        )
    }
    else if(location.pathname === "/dashboard" || location.pathname === "/members" || location.pathname === "/tournament"  ){
        return(
            <div>
            <nav style={{display: "flex", justifyContent: "flex-end"}}>
                <Link onClick={() => {
                    localStorage.clear();
                    logoutUser();
                }
                } 
                to="/" className="f3 link dim black underline pa3 pointer">Sign Out</Link>
            </nav>
        </div> 
        )
        
    }
    else{
        return(
            <div>
                <nav style={{display: "flex", justifyContent: "flex-end"}}>
                    <Link to="/register" className="f3 link dim black underline pa3 pointer">Register</Link>
                </nav>
            </div>
        )
    }
}


export default Navigation;