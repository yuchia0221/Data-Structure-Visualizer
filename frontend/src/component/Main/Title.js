import React from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Cookies from "js-cookie";
import history from "../../history";
import { Link } from "react-router-dom";

const titleStyle = {
    color: "black",
    fontSize: "8vmin",
    cursor: "default",
};

const subtitleStyle = {
    color: "#A8A8A8",
    fontSize: "3vmin",
    cursor: "default",
};

const buttonGroupStyle = {
    backgroundColor: "white",
    opacity: 0.8,
};

const linkStyle = {
    color: "#A8A8A8",
    textDecoration: "none",
};

const buttonStyle = {
    fontSize: "1.6vmin",
};

const Title = () => {
    const handleToSorting = () => {
        if (process.env.NODE_ENV === "development") history.push("/sorting");
        else {
            const user = Cookies.get("user");
            if (user) {
                history.push("/sorting");
            } else {
                history.push("/sign-in");
            }
        }
    };

    const handleToDS = () => {
        if (process.env.NODE_ENV === "development") history.push("/data-structure");
        else {
            const user = Cookies.get("user");
            if (user) {
                history.push("/data-structure");
            } else {
                history.push("/sign-in");
            }
        }
    };

    return (
        <div className="center_all">
            <h1 style={titleStyle}>Ultimate Visualizer</h1>
            <h5 style={subtitleStyle}>visualize your thought in simple steps</h5>
            <ButtonGroup fullWidth={true} style={buttonGroupStyle} aria-label="small outlined button group">
                <Button style={buttonStyle} onClick={handleToSorting}>
                    Sorting Visualizer
                </Button>
                <Button style={buttonStyle} onClick={handleToDS}>
                    Data Structure Visualizer
                </Button>
            </ButtonGroup>
            <Link style={linkStyle} to="/subscribe">
                Subscribe to our newsletter
            </Link>
        </div>
    );
};

export default Title;
