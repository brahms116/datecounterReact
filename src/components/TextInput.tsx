import { useState } from "react";
import styles from "./TextInput.module.css";
import { motion } from "framer-motion";

interface IProps {
    label: string;
    isPassword?: boolean;
    error?: string;
}

export default function TextInput(props: IProps) {
    const [isFocus, setIsFocus] = useState(false);
    const boxVariants = {
        blur: {
            borderColor: "var(--inputBoxColor)",
        },
        focus: {
            borderColor: "var(--primaryColor)",
        },
    };

    const helperVariants = {
        blur: {
            opacity: 0,
        },
        focus: {
            opacity: 1,
        },
    };
    const handleFocus = () => {
        setIsFocus(!isFocus);
    };
    return (
        <div
            className={styles.text_input}
            onFocus={handleFocus}
            onBlur={handleFocus}
        >
            <motion.div
                animate={isFocus ? "focus" : "blur"}
                variants={boxVariants}
                className={styles.input_box}
            >
                <input
                    type={props.isPassword ? "password" : "text"}
                    placeholder={props.label}
                ></input>
                {/* {isFocus && <div className={styles.helper_text}>EMAIL</div>} */}
                <motion.div
                    className={styles.helper_text}
                    animate={isFocus ? "focus" : "blur"}
                    variants={helperVariants}
                >
                    {props.label}
                </motion.div>
            </motion.div>
            {props.error && (
                <motion.div
                    className={styles.error_text}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    {props.error}
                </motion.div>
            )}
        </div>
    );
}
