import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Navi from "./Navi";
import SearchSR from "./SearchSR";
import maker from "./maker";
import checker from "./checker";
import profileImage from "./profile.jpg";
import logo from "./logo.png";
import CreateInstance from "./CreateInstance";

class myPortal extends Component {
    constructor(props) {
        console.log(props.match);

        super(props);

        this.state = {
            user: props.match.params.user,
            group: props.match.params.group,
        };
    }
    onClickLogout = (e) => {
        this.props.history.push("/");
    };

    render() {
        var lnk;
        if (this.state.group == 'Initiator') {
            lnk = CreateInstance;
        } else {
            lnk = SearchSR;
        }
        return (
            <Router>
                <div className="App">
                    <div className="Header">
                        <div className="box">
                            <div className="imageHeader">
                                <img src={logo} className="AppLogo" />
                                <div className="profile-details">
                                <div className="profile-side-one">
                                    <img src={profileImage} className="profile-image" />
                                </div>
                                    <div className="profile-side-two">
                                        <h4>{this.state.user}</h4>
                                        <h4>{this.state.group}</h4>
                                    </div>

                                </div>
                                <div className="navigation">
                                    <div>
                                        <h3 className="navigation-title"><input type="submit" value="Logout" className="form-logout-button" onClick={(e) => this.onClickLogout(e)} /></h3>
                                        <Navi name={this.state}></Navi>
                                    </div>
                                </div>
                            </div>
                            
                                    <Route path="/MainPage/:group/:user" exact component={lnk} />
                                    <Route path="/maker/:taskid/:group/:user" exact component={maker} />
                                    <Route path="/checker/:taskid/:group/:user" exact component={checker} />

                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}

export default myPortal;
