import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import EmailValidator from "email-validator";
import axios from "../Axios/BaseAxios";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { InputAdornment, IconButton } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import Cookies from "js-cookie";
import history from "../history";
import Footer from "./Footer";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

let SIGNIN;
if (process.env.NODE_ENV === "development") {
    SIGNIN = "http://localhost:3000/#/sign-in";
} else {
    SIGNIN = "https://blue-cliff-09a573400.azurestaticapps.net/#/sign-in";
}

export default function SignUp() {
    const classes = useStyles();
    const [signUp, setSignUp] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailErrorText, setEmailErrorText] = useState("");
    const [emailIsNotValid, setEmailIsNotValid] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        let user = Cookies.get("user");
        if (user) {
            // history.replace("/");
            history.goBack();
        }
    }, []);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        if (!EmailValidator.validate(e.target.value)) {
            setEmailErrorText("Email not valid!");
            setEmailIsNotValid(true);
        } else {
            setEmailErrorText("");
            setEmailIsNotValid(false);
        }
    };

    const makeName = (first, last) => {
        return [first, last].join("_");
    };

    const SignUp = (e) => {
        e.preventDefault();
        axios({
            method: "POST",
            data: {
                username: makeName(firstName, lastName),
                email: email,
                password: password,
            },
            withCredentials: true,
            url: "/register",
        })
            .then((res) => {
                console.log(res);
                if (res.data.SignUp === true) {
                    setSignUp(true);
                }
            })
            .catch((err) => console.log("err", err));
    };

    return signUp ? (
        <Redirect to="/sign-in" />
    ) : (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={classes.form}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lname"
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                error={emailIsNotValid}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                onChange={handleEmailChange}
                                helperText={emailErrorText}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type={showPassword ? "text" : "password"}
                                id="password"
                                autoComplete="current-password"
                                onChange={(e) => setPassword(e.target.value)}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}>
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                    </Grid>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={!(email && password && firstName && lastName) || emailIsNotValid}
                        onClick={SignUp}>
                        Sign Up
                    </Button>

                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href={SIGNIN} variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Footer />
        </Container>
    );
}
