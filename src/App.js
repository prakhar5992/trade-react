import React, { Component } from "react";
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";
import Navi from "./Components/Navi";
import SearchSR from "./Components/SearchSR";
import CustomerDetails from "./Components/CustomerDetails";
import login from "./Components/login";
import myPortal from "./Components/myPortal";
import './App.css';



function App(){
		return (
      <Router>
        <div className = "main-page">
          <Route path = "/" exact component={login} />
          <Route path = "/MainPage/:group/:user" exact component={myPortal} />
        </div>
      </Router>

		);
	}

export default App;
