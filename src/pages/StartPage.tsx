import React, { useContext, useEffect } from "react";
import Card from "../components/Card";
import AuthPanel from "./AuthPanel";
import styles from "./StartPage.module.css";
import Logo from "../media/Logo.svg";
import { motion, useAnimation } from "framer-motion";
import Spinner from "../components/Spinner";
import swapPresence from "../utils/swapPresence";
import { authContext } from "../Contexts/AuthContext";

export default function StartPage() {
    const controller = useAnimation();
    const fadeOut = async () => {
        await controller.start({
            opacity: 0,
        });
    };

    const authC = useContext(authContext);
    const spinnerController = useAnimation();
    const pageController = useAnimation();

    const checktoken = async () => {
        const result = await authC.initialTokenCheck();
        if (!result) {
            await swapPresence(spinnerController, pageController, "grid");
        }
    };
    useEffect(() => {
        checktoken();
    }, []);
    return (
        <motion.div animate={controller}>
            <motion.div className={styles.spinner} animate={spinnerController}>
                <Spinner />
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
        </motion.div>
    );
}
