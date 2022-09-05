import React, { useState } from "react";
import validator from "validator";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import axios from "../../Axios/BaseAxios";
import Footer from "../Footer";
import ParticleBackground from "../Main/ParticleBackground";

const titleStyle = {
    position: "absolute",
    top: "20%",
    left: "50%",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
    color: "black",
    fontSize: "8vmin",
    cursor: "default",
};

const containerStyle = {
    position: "absolute",
    top: "45%",
    left: "50%",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
};

const buttonStyle = {
    opacity: "0.9",
    marginTop: "5vh",
};

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function SubscribeBox() {
    const [isCorrect, setIsCorrect] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState("");

    const handleOnChange = (e) => {
        setEmail(e.target.value);
        setIsCorrect(validator.isEmail(e.target.value));
    };

    const hadnleOnKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            if (isCorrect) handleSubmit();
        }
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleSubmit = async () => {
        try {
            await axios.post("/api/subscribe", { email });
            setIsOpen(true);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <h1 style={titleStyle}>Ultimate Visualizer</h1>
            <ParticleBackground />
            <Container component="main" maxWidth="xs" style={containerStyle}>
                <form onSubmit={handleSubmit}>
                    <TextField
                        required
                        autoFocus={true}
                        multiline={true}
                        fullWidth={true}
                        label="Email"
                        placeholder="user@email.com"
                        error={!isCorrect}
                        onChange={handleOnChange}
                        onKeyDown={hadnleOnKeyDown}
                    />
                    <Button type="submit" variant="outlined" color="primary" disabled={!isCorrect} style={buttonStyle}>
                        Subscribe
                    </Button>
                </form>
            </Container>
            <Snackbar open={isOpen} autoHideDuration={1000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    Subscription completed!
                </Alert>
            </Snackbar>
            <Footer />
        </>
    );
}

export default SubscribeBox;
