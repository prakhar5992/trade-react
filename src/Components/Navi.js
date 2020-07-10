import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import styled from "styled-components";

const Navi = (props) => {
    console.log(props.name);
    const link = "/MainPage/" + props.name.group + "/" + props.name.user;
    const newInstancelink = "/MainPage/"+props.name.group + "/" + props.name.user;
    if (props.name.group == "Initiator")
        return (
            <div>
                <Link to={link}> Work </Link>
            </div>
        );
    else
        return (
            <div>
                <Link to={link}> Work </Link>
            </div>
        );
};

export default Navi;
