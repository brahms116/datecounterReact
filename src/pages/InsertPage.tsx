import styles from "./InsertPage.module.css";
import { motion, useAnimation } from "framer-motion";
import closeIcon from "../media/CloseIcon.svg";
import TextInput from "../components/TextInput";
import React, { ChangeEvent, useContext, useState } from "react";
import Button from "../components/Button";
import { useHistory } from "react-router-dom";
import moment from "moment";
import swapPresence from "../utils/swapPresence";
import { dataContext } from "../Contexts/DataContext";
import handleFormSubmit from "../utils/handleFormSubmit";
import handleFormError from "../utils/handleFormError";
import TransitionDiv from "../utils/TransitionDiv";
import PageSpinner from "../components/PageSpinner";
export default function InsertPage() {
    const dateController = useAnimation();
    const titleController = useAnimation();
    const spinnerController = useAnimation();
    const pageController = useAnimation();
    const history = useHistory();

    const [date, setDate] = useState("");
    const [dateError, setDateError] = useState("");
    const [title, setTitle] = useState("");
    const [titleError, setTitleError] = useState("");
    const [slashCount, setSlashCount] = useState(0);

    const appData = useContext(dataContext);

    const handleErrors = handleFormError(
        ["server", "title"],
        [setTitleError, setTitleError]
    );

    const handleDateSubmit = async () => {
        setDateError("");
        if (date.length !== 10) setDateError("PLEASE ENTER A COMPLETE DATE");
        else if (!moment(date, "DD-MM-YYYY").isValid()) {
            setDateError("PLEASE ENTER A VALID DATE");
        } else {
            await swapPresence(dateController, titleController, "grid");
        }
    };

    const handleTitleSubmit = async () => {
        setTitleError("");
        await swapPresence(pageController, spinnerController);
        const result = await appData.events.createItem(title, date);
        if (result.error) {
            await swapPresence(spinnerController, pageController, "grid");
            return handleErrors(result.error);
        } else {
            history.push("/home");
        }
    };

    const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
        let str = event.currentTarget.value;
        if (
            str.substr(str.length - 1, 1) === "/" &&
            !(str.length === 3 || str.length === 6)
        )
            str = str.substr(0, str.length - 1);
        // console.log(`start: ${str}`);
        if (str.length === 2) {
            if (slashCount === 0) {
                str = str + "/";
                setSlashCount(slashCount + 1);
            } else {
                str = str.substr(0, 1);
                setSlashCount(slashCount - 1);
            }
        } else if (str.length === 5) {
            if (slashCount === 1) {
                str = str + "/";
                setSlashCount(slashCount + 1);
            } else {
                str = str.substr(0, 4);
                setSlashCount(slashCount - 1);
            }
        } else if (str.length > 10) {
            str = str.substr(0, 10);
        }
        // console.log(`end: ${str}`);
        setDate(str);
    };

    return (
        <TransitionDiv>
            <motion.div
                animate={spinnerController}
                initial={{ display: "none", opacity: 0 }}
            >
                <PageSpinner />
            </motion.div>
            <motion.div className={styles.page} animate={pageController}>
                {appData.state.items.length > 0 && (
                    <img
                        src={closeIcon}
                        alt="closeIcon"
                        className={styles.icon}
                        onClick={() => {
                            history.push("/home");
                        }}
                    ></img>
                )}
                <motion.div className={styles.main} animate={dateController}>
                    <div className={styles.title}>
                        WHAT IS A DATE THAT YOU WANT TO REMEMBER?
                    </div>
                    <div className={styles.text_input}>
                        <TextInput
                            type="number"
                            value={date}
                            label="DD/MM/YYYY"
                            helpertext="DATE"
                            onChange={handleDateChange}
                            error={dateError}
                            onKeyDown={(e) =>
                                handleFormSubmit(e, handleDateSubmit)
                            }
                        ></TextInput>
                    </div>
                    <div className={styles.submit_button}>
                        <Button text="NEXT" onClick={handleDateSubmit}></Button>
                    </div>
                </motion.div>
                <motion.div
                    className={styles.main}
                    initial={{ opacity: 0, display: "none" }}
                    animate={titleController}
                >
                    <div className={styles.title}>GIVE THIS DATE A TITLE</div>
                    <div className={styles.text_input}>
                        <TextInput
                            type="text"
                            error={titleError}
                            label="E.G. MY BIRTHDAY"
                            helpertext="TITLE"
                            value={title}
                            onChange={(e) => {
                                setTitle(e.currentTarget.value);
                            }}
                            onKeyDown={(e) =>
                                handleFormSubmit(e, handleTitleSubmit)
                            }
                        ></TextInput>
                    </div>
                    <div className={styles.submit_button}>
                        <Button text="ADD" onClick={handleTitleSubmit}></Button>
                    </div>
                </motion.div>
            </motion.div>
        </TransitionDiv>
    );
}
