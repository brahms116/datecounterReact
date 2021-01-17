import styles from "./InsertPage.module.css";
import { motion, useAnimation } from "framer-motion";
import closeIcon from "../media/CloseIcon.svg";
import TextInput from "../components/TextInput";
import React, { useState } from "react";
import Button from "../components/Button";
export default function InsertPage() {
    const pageController = useAnimation();
    const dateController = useAnimation();
    const titleController = useAnimation();

    const [date, setDate] = useState("");
    const [dateError, setDateError] = useState("");
    const [title, setTitle] = useState("");
    const [titleError, setTitleError] = useState("");

    return (
        <motion.div className={styles.page}>
            <img src={closeIcon} alt="closeIcon" className={styles.icon}></img>
            <motion.div
                className={styles.main}
                initial={{ opacity: 0, display: "none" }}
            >
                <div className={styles.title}>
                    WHAT IS A DATE THAT YOU WANT TO REMEMBER?
                </div>
                <div className={styles.text_input}>
                    <TextInput
                        label="DD/MM/YYYY"
                        helpertext="DATE"
                        onChange={() => {}}
                    ></TextInput>
                </div>
                <div className={styles.submit_button}>
                    <Button text="NEXT" onClick={() => {}}></Button>
                </div>
            </motion.div>
            <motion.div className={styles.main}>
                <div className={styles.title}>GIVE THIS DATE A TITLE</div>
                <div className={styles.text_input}>
                    <TextInput
                        label="E.G. MY BIRTHDAY"
                        helpertext="TITLE"
                        onChange={() => {}}
                    ></TextInput>
                </div>
                <div className={styles.submit_button}>
                    <Button text="ADD" onClick={() => {}}></Button>
                </div>
            </motion.div>
        </motion.div>
    );
}
