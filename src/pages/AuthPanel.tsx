import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { Switch, useLocation, Route, useHistory } from "react-router-dom";
import TransitionDiv from "../utils/TransitionDiv";
import styles from "./AuthPanel.module.css";
import coverStyles from "./CoverPage.module.css";
import loginStyles from "./LoginPage.module.css";
import registerStyles from "./RegisterPage.module.css";
import Logo from "../media/Logo.svg";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import Checkbox from "../components/Checkbox";
import BackIcon from "../media/BackIcon.svg";
import Spinner from "../components/Spinner";
import { useContext, useEffect, useState } from "react";
import Validation from "../services/ValidationService";
import ILoginOutput from "../models/outputModels/ILoginOutput";
import swapPresence from "../utils/swapPresence";
import { authContext } from "../Contexts/AuthContext";
import { isValidationError } from "../models/dataModels/IValidationError";
import { dateItemContext } from "../Contexts/DateItemContext";

interface IProps {
    fadeOut: () => Promise<void>;
}

export default function AuthPanel(props: IProps) {
    const location = useLocation();

    return (
        <TransitionDiv className={styles.auth_panel}>
            <AnimatePresence exitBeforeEnter>
                <Switch location={location} key={location.pathname}>
                    <Route
                        exact
                        path="/login"
                        render={() => <Login fadeOut={props.fadeOut} />}
                    />
                    <Route
                        exact
                        path="/register"
                        render={() => <Register fadeOut={props.fadeOut} />}
                    />
                    <Route
                        exact
                        path="/"
                        render={() => <Cover fadeOut={props.fadeOut} />}
                    />
                </Switch>
            </AnimatePresence>
        </TransitionDiv>
    );
}

function Cover(props: IProps) {
    const history = useHistory();
    return (
        <TransitionDiv className={coverStyles.page}>
            <img src={Logo} alt="logo" className={coverStyles.logo} />
            <div className={coverStyles.title}>DATE COUNTER</div>
            <div className={coverStyles.login_button}>
                <Button
                    text="LOGIN"
                    isOutline
                    onClick={() => {
                        history.push("/login");
                    }}
                ></Button>
            </div>
            <div className={coverStyles.register_button}>
                <Button
                    text="SIGN UP"
                    onClick={() => {
                        history.push("/register");
                    }}
                ></Button>
            </div>
        </TransitionDiv>
    );
}

////////////////////////////////////////////////////////LOGIN///////////////////////

function Login(props: IProps) {
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [serverError, setServerError] = useState("");
    const buttonControl = useAnimation();
    const loaderControl = useAnimation();

    const authC = useContext(authContext);
    const dateItemC = useContext(dateItemContext);

    //helper function to populate the error fields of inputs
    const populateErrors = (result: ILoginOutput) => {
        if (result.error) {
            if (isValidationError(result.error)) {
                for (const error of result.error.errors) {
                    switch (error.field) {
                        case "email":
                            setEmailError(error.msg);
                            break;
                        case "password":
                            setPasswordError(error.msg);
                    }
                }
            } else {
                setServerError(result.error.msg);
            }
        } else {
            setServerError("Server Error");
        }
    };

    //console.log(serverError.length > 0);
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        //console.log(event.key);
        if (event.key === "Enter") {
            event.currentTarget.blur();
            handleLogin();
        }
    };

    //login procedure
    const handleLogin = async () => {
        //clear validation errors
        setEmailError("");
        setPasswordError("");
        setServerError("");

        //frontend validation from validation service
        const frontEndValidateResult = Validation.validateLoginInput(
            email,
            password
        );
        //populate errors
        if (!frontEndValidateResult.isSuccess) {
            populateErrors(frontEndValidateResult);
            return;
        }

        //if no validations so far begin request to server...
        //swap button and loader
        await swapPresence(buttonControl, loaderControl);

        //register request
        const serverResult = await authC.login({
            credientials: { email, password },
            rememberMe,
        });
        // console.log(authC.token);
        // check for validationErrors
        if (!serverResult.isSuccess) {
            await swapPresence(loaderControl, buttonControl);
            populateErrors(serverResult);
        }
    };

    const moveToNextPage = async () => {
        const result = await dateItemC.getItems();
        if (result.isSuccess) {
            await props.fadeOut();
            history.push("/home");
        }
    };
    useEffect(() => {
        if (authC.isAuth === true) {
            moveToNextPage();
        }
    }, [authC.isAuth]);

    return (
        <TransitionDiv className={loginStyles.page}>
            <img
                src={BackIcon}
                className={styles.back_button}
                alt="closeIcon"
                onClick={() => {
                    history.push("/");
                }}
            />
            <div className={loginStyles.title}>LOGIN</div>

            <div className={loginStyles.email}>
                <TextInput
                    label="EMAIL"
                    onChange={(e) => {
                        setEmail(e.currentTarget.value);
                    }}
                    value={email}
                    error={emailError}
                    onKeyDown={handleKeyDown}
                ></TextInput>
            </div>
            <div className={loginStyles.password}>
                <TextInput
                    label="PASSWORD"
                    isPassword
                    onChange={(e) => {
                        setPassword(e.currentTarget.value);
                    }}
                    value={password}
                    error={passwordError}
                    onKeyDown={handleKeyDown}
                ></TextInput>
            </div>

            {serverError && (
                <motion.div
                    className={loginStyles.error}
                    animate={{ opacity: 1 }}
                    initial={{ opacity: 0 }}
                >
                    {serverError}
                </motion.div>
            )}

            <div className={loginStyles.remember_me}>
                <Checkbox
                    label="REMEMBER ME"
                    onClick={() => {
                        setRememberMe(!rememberMe);
                    }}
                ></Checkbox>
            </div>

            <motion.div className={loginStyles.login} animate={buttonControl}>
                <Button text="LOGIN" onClick={handleLogin}></Button>
            </motion.div>
            <motion.div
                className={loginStyles.spinner}
                initial={{ opacity: 0, display: "none" }}
                animate={loaderControl}
            >
                <Spinner />
            </motion.div>
        </TransitionDiv>
    );
}

////////////////////////////////////////////////////////REGISTER///////////////////////
function Register(props: IProps) {
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [serverError, setServerError] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    const buttonControl = useAnimation();
    const loaderControl = useAnimation();

    const authC = useContext(authContext);
    const dateItemC = useContext(dateItemContext);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        //console.log(event.key);
        if (event.key === "Enter") {
            event.currentTarget.blur();
            handleRegister();
        }
    };

    //helper function to populate the error fields of inputs
    const populateErrors = (result: ILoginOutput) => {
        if (result.error) {
            if (isValidationError(result.error)) {
                for (const error of result.error.errors) {
                    switch (error.field) {
                        case "email":
                            setEmailError(error.msg);
                            break;
                        case "password":
                            setPasswordError(error.msg);
                    }
                }
            } else {
                setServerError(result.error.msg);
            }
        } else {
            setServerError("Server Error");
        }
    };

    //register procedure
    const handleRegister = async () => {
        //clear validation errors
        setEmailError("");
        setPasswordError("");
        setConfirmPasswordError("");
        setServerError("");

        //check if passwords match
        if (password !== confirmPassword) {
            setConfirmPasswordError("PASSWORDS DO NOT MATCH");
            return;
        }

        //frontend validation from validation service
        const frontEndValidateResult = Validation.validateRegisterInput(
            email,
            password
        );
        //populate errors
        if (!frontEndValidateResult.isSuccess) {
            populateErrors(frontEndValidateResult);
            return;
        }

        //if no validations so far begin request to server...
        //swap button and loader
        await swapPresence(buttonControl, loaderControl);

        //register request
        const serverResult = await authC.register({
            credientials: { email, password },
            rememberMe,
        });

        //check for validationErrors
        if (!serverResult.isSuccess) {
            await swapPresence(loaderControl, buttonControl);
            populateErrors(serverResult);
        }
    };

    const moveToNextPage = async () => {
        const result = await dateItemC.getItems();
        if (result.isSuccess) {
            await props.fadeOut();
            history.push("/home");
        }
    };
    useEffect(() => {
        if (authC.isAuth === true) {
            moveToNextPage();
        }
    }, [authC.isAuth]);

    return (
        <TransitionDiv className={registerStyles.page}>
            <img
                src={BackIcon}
                className={styles.back_button}
                alt="closeIcon"
                onClick={() => {
                    history.push("/");
                }}
            />
            <div className={registerStyles.title}>SIGN UP</div>
            <div className={registerStyles.email}>
                <TextInput
                    label="EMAIL"
                    onChange={(e) => {
                        setEmail(e.currentTarget.value);
                        //console.log(email);
                    }}
                    value={email}
                    error={emailError}
                    onKeyDown={handleKeyDown}
                ></TextInput>
            </div>
            <div className={registerStyles.password}>
                <TextInput
                    label="PASSWORD"
                    isPassword
                    onChange={(e) => {
                        setPassword(e.currentTarget.value);
                    }}
                    value={password}
                    error={passwordError}
                    onKeyDown={handleKeyDown}
                ></TextInput>
            </div>
            <div className={registerStyles.confirm_password}>
                <TextInput
                    label="CONFIRM PASSWORD"
                    isPassword
                    helpertext="PASSWORD"
                    onChange={(e) => {
                        setConfirmPassword(e.currentTarget.value);
                    }}
                    value={confirmPassword}
                    error={confirmPasswordError}
                    onKeyDown={handleKeyDown}
                ></TextInput>
            </div>
            <div className={registerStyles.remember_me}>
                <Checkbox
                    label="REMEMBER ME"
                    onClick={() => {
                        setRememberMe(!rememberMe);
                    }}
                ></Checkbox>
            </div>
            {serverError && (
                <motion.div
                    className={loginStyles.error}
                    animate={{ opacity: 1 }}
                    initial={{ opacity: 0 }}
                >
                    {serverError}
                </motion.div>
            )}
            <motion.div
                className={registerStyles.spinner}
                initial={{ display: "none" }}
                animate={loaderControl}
            >
                <Spinner />
            </motion.div>
            <motion.div
                className={registerStyles.register}
                animate={buttonControl}
            >
                <Button text="LET'S GO" onClick={handleRegister}></Button>
            </motion.div>
        </TransitionDiv>
    );
}
