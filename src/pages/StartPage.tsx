import React, { useContext, useEffect } from "react";
import Card from "../components/Card";
import AuthPanel from "./AuthPanel";
import styles from "./StartPage.module.css";
import Logo from "../media/Logo.svg";
import { motion, useAnimation } from "framer-motion";
import swapPresence from "../utils/swapPresence";

import { useHistory } from "react-router-dom";
import { dataContext } from "../Contexts/DataContext";
import TransitionDiv from "../utils/TransitionDiv";
import PageSpinner from "../components/PageSpinner";

export default function StartPage() {
    const history = useHistory();
    const fadeOut = async () => {
        // await controller.start({
        //     opacity: 0,
        // });
    };

    const appData = useContext(dataContext);
    const spinnerController = useAnimation();
    const pageController = useAnimation();

    const checktoken = async () => {
        const result = await appData.events.appInit();
        if (!result.isSuccess) {
            await swapPresence(spinnerController, pageController, "grid");
        } else {
            history.push("/home");
        }
    };
    useEffect(() => {
        checktoken();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <TransitionDiv>
            <motion.div animate={spinnerController}>
                <PageSpinner />
            </motion.div>
            <motion.div
                className={styles.page}
                initial={{ opacity: 0, display: "none" }}
                animate={pageController}
            >
                <div className={styles.with_card}>
                    <Card>
                        <AuthPanel fadeOut={fadeOut} />
                    </Card>
                </div>
                <img src={Logo} alt="logo" className={styles.logo} />
                <div className={styles.without_card}>
                    <AuthPanel fadeOut={fadeOut} />
                </div>
            </motion.div>
        </TransitionDiv>
    );
}
