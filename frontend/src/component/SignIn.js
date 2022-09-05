import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import { TextField, InputAdornment, IconButton } from "@material-ui/core";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import EmailValidator from "email-validator";
import axios from "../Axios/BaseAxios";
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
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(2, 0, 1),
    },
}));

let SIGNUP;
if (process.env.NODE_ENV === "development") {
    SIGNUP = "http://localhost:3000/#/sign-up";
} else {
    SIGNUP = "https://blue-cliff-09a573400.azurestaticapps.net/#/sign-up";
}

export default function SignIn() {
    const classes = useStyles();
    const [login, setLogin] = useState(false);
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

    const LogIn = () => {
        axios({
            method: "POST",
            data: {
                email,
                password,
            },
            withCredentials: true,
            url: "/login",
        })
            .then((res) => {
                let LOGGIN = res.data.Login;
                if (LOGGIN === true) {
                    setLogin(true);
                    Cookies.set("user", true, { expires: 0.0104166667 }); // expires 15 min
                } else {
                    alert("Oops! Please sign up first, or check your password again : (");
                }
            })
            .catch((err) => console.log("err", err));
    };

    return login ? (
        <Redirect to="/" />
    ) : (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Log in
                </Typography>

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

                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    disabled={!(email && password) || emailIsNotValid}
                    onClick={LogIn}>
                    Log In
                </Button>

                <Grid container>
                    <Grid item>
                        <Link href={SIGNUP} variant="body2">
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                </Grid>
            </div>
            <Footer />
        </Container>
    );
}
