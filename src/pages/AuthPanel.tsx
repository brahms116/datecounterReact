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
import { useContext, useState } from "react";
import swapPresence from "../utils/swapPresence";
import { dataContext } from "../Contexts/DataContext";
import handleFormError from "../utils/handleFormError";
import handleFormSubmit from "../utils/handleFormSubmit";

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

    const appData = useContext(dataContext);

    //helper function to populate the error fields of inputs
    const populateErrors = handleFormError(
        ["email", "password", "server"],
        [setEmailError, setPasswordError, setServerError]
    );

    //login procedure
    const handleLogin = async () => {
        //clear validation errors
        setEmailError("");
        setPasswordError("");
        setServerError("");
        //swap button and loader
        await swapPresence(buttonControl, loaderControl);
        //register request
        const result = await appData.events.login(email, password, rememberMe);
        if (!result.isSuccess) {
            await swapPresence(loaderControl, buttonControl);
            populateErrors(result.error!);
        } else {
            await props.fadeOut();
            history.push("/home");
        }
    };

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
                    type="text"
                    label="EMAIL"
                    onChange={(e) => {
                        setEmail(e.currentTarget.value);
                    }}
                    value={email}
                    error={emailError}
                    onKeyDown={(e) => handleFormSubmit(e, handleLogin)}
                ></TextInput>
            </div>
            <div className={loginStyles.password}>
                <TextInput
                    label="PASSWORD"
                    type="password"
                    onChange={(e) => {
                        setPassword(e.currentTarget.value);
                    }}
                    value={password}
                    error={passwordError}
                    onKeyDown={(e) => handleFormSubmit(e, handleLogin)}
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

    const appData = useContext(dataContext);

    const populateErrors = handleFormError(
        ["email", "password", "server"],
        [setEmailError, setPasswordError, setServerError]
    );

    //login procedure
    const handleRegister = async () => {
        //clear validation errors
        setConfirmPasswordError("");
        setEmailError("");
        setPasswordError("");
        setServerError("");

        if (confirmPassword !== password) {
            setConfirmPasswordError("PASSWORDS DO NOT MATCH");
            return;
        }
        //swap button and loader
        await swapPresence(buttonControl, loaderControl);
        //register request
        const result = await appData.events.register(
            email,
            password,
            rememberMe
        );
        if (!result.isSuccess) {
            await swapPresence(loaderControl, buttonControl);
            populateErrors(result.error!);
        } else {
            await props.fadeOut();
            history.push("/home");
        }
    };

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
                    type="text"
                    label="EMAIL"
                    onChange={(e) => {
                        setEmail(e.currentTarget.value);
                        //console.log(email);
                    }}
                    value={email}
                    error={emailError}
                    onKeyDown={(e) => handleFormSubmit(e, handleRegister)}
                ></TextInput>
            </div>
            <div className={registerStyles.password}>
                <TextInput
                    label="PASSWORD"
                    type="password"
                    onChange={(e) => {
                        setPassword(e.currentTarget.value);
                    }}
                    value={password}
                    error={passwordError}
                    onKeyDown={(e) => handleFormSubmit(e, handleRegister)}
                ></TextInput>
            </div>
            <div className={registerStyles.confirm_password}>
                <TextInput
                    label="CONFIRM PASSWORD"
                    type="password"
                    helpertext="PASSWORD"
                    onChange={(e) => {
                        setConfirmPassword(e.currentTarget.value);
                    }}
                    value={confirmPassword}
                    error={confirmPasswordError}
                    onKeyDown={(e) => handleFormSubmit(e, handleRegister)}
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
