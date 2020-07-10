import React, { Component } from "react";

import documentImage from "./Address_Change_Document.pdf";

import FileViewer from "react-file-viewer";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import axios from "axios";

class login extends Component {
    constructor(props) {
        console.log(props.match);
        super(props);
        this.state = {
            login: "",
            password: "",
            group: ""
        };
    }
    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    submitHandler = (e) => {
        e.preventDefault();
        if (this.state.login == "Admin" && this.state.password == "123"){
          this.state.group = 'Management';
          this.props.history.push("/MainPage/"+this.state.group+"/"+this.state.login);
        }
        else if (this.state.login == "Sachin" && this.state.password == "123"){
          this.state.group = 'Initiator';
          this.props.history.push("/MainPage/"+this.state.group+"/"+this.state.login);
        }
        else if ((this.state.login == "checkerUser1"|| this.state.login == "checkerUser2") && this.state.password == "password"){
          this.state.group = 'Checker';
          this.props.history.push("/MainPage/"+this.state.group+"/"+this.state.login);
        }
        else if ((this.state.login == "makerUser1"|| this.state.login == "makerUser2") && this.state.password == "password"){
            this.state.group = 'Maker';
            this.props.history.push("/MainPage/"+this.state.group+"/"+this.state.login);
          }
        else alert("Invalid ID or Password");
    };

    onClickHandler = (e) => {
        this.state.status = e.target.value;
    };

    render() {
        return (
            <div className="login-details">
                <div className="login-section">
                    <form onSubmit={this.submitHandler}>
                        <div className="form-layout-login">
                            <div className="layout-full">
                                <h1 className="sub-section-header">Login</h1>
                                <div className="form-side-one-login">
                                    <label for="firstname">User : </label>
                                    <br />
                                    <input type="text" name="login" defaultValue={this.state.login} onChange={(e) => this.changeHandler(e)} />
                                    <br />
                                    <br />
                                    <label>Password : </label>
                                    <br />
                                    <input type="password" name="password" defaultValue={this.state.password} onChange={(e) => this.changeHandler(e)} />
                                    <br />
                                    <br />
                                </div>
                            </div>
                        </div>
                        <div className="form-button">
                            <input name="approvedStatus" type="submit" value="Login" className="form-approve-button" onClick={(e) => this.onClickHandler(e)} />
                            <br />
                            <br />
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    onError(e) {
        console.log(e, "error in file-viewer");
    }
}

export default login;
