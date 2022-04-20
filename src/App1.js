import React, {Component} from 'react';
import './App.css';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Navigation from './components/Navigation/Navigation';
import UserDashboard from './components/UserDashboard/UserDashboard';
import AddMembers from './components/AddMembers/AddMembers';
import Tournament from './components/Tournament/Tournament';

import { BrowserRouter as Router,Switch, Route} from "react-router-dom";
  

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      path: "/",
      currentUser: {
        name: "",
        email: ""
      },
      loggedIn: false
    }
  }
  componentDidMount(){
    this.setState({path: window.location.pathname})
    if(localStorage.getItem("email")){
      this.setState(prevState => {
        let currentUser = Object.assign({}, prevState.currentUser);  
        currentUser.name = localStorage.getItem("name");
        currentUser.email = localStorage.getItem("email");                                      
        return { currentUser };                                 
      })
      this.setState({loggedIn: true});
    }
  }
  updatePath = (newPath) => {
    this.setState({path: newPath});
  }
  loginUser = () => {
    this.setState(prevState => {
      let currentUser = Object.assign({}, prevState.currentUser);  
      currentUser.name = localStorage.getItem("name");
      currentUser.email = localStorage.getItem("email");                                      
      return { currentUser };                                 
    })
    this.setState({loggedIn: true});
  }
  logoutUser = () => {
    this.setState(prevState => {
      let currentUser = Object.assign({}, prevState.currentUser);  
      currentUser.name = "";
      currentUser.email = "";                                     
      return { currentUser };                                 
    })
    this.setState({loggedIn: true});
  }
  

  render(){
    return(
         <Router>
            <div>
            <Navigation logoutUser={this.logoutUser} updatePath={this.updatePath} path={this.state.path}/>
            <h1 className='f1 tc dark-blue'>Tournament Manager</h1>
            <Switch>
              <Route exact path="/" >
                  <SignIn loginUser={this.loginUser} updatePath={this.updatePath}/>
              </Route>
              <Route path="/register">
                    <Register loginUser={this.loginUser} updatePath={this.updatePath}/>
              </Route>
              {/* {
                localStorage.getItem("name") ? 
                <div> */}
                  <Route exact path="/" >
                    <SignIn loginUser={this.loginUser} updatePath={this.updatePath}/>
                  </Route>
                  <Route path="/dashboard">
                    <UserDashboard user={this.state.currentUser}/>
                  </Route>
                  <Route path="/members">
                    <AddMembers user={this.state.currentUser}/>
                  </Route>
                  <Route path="/tournament">
                    <Tournament user={this.state.currentUser}/>
                  </Route>
                  {/* <Route path="*">
                    <Redirect push to="/dashboard"/>
                  </Route> */}
                {/* </div>
                :
                <div>
                  <Redirect push to="/"/>
                  {/* <Route path="*">
                    <SignIn/>
                  </Route>
                  </div> */}
                
               
            </Switch>
            </div>
       </Router>
      
    );
  }
}

export default App;
