import styles from "./Checkbox.module.css";
import { motion } from "framer-motion";
import { useState } from "react";

interface IProps {
    onClick: () => void;
    label: string;
}
export default function Checkbox(props: IProps) {
    const [checkBoxState, setCheckBoxState] = useState("idle");
    const [hoverCache, setHoverCache] = useState("idle");
    const boxVariants = {
        idle: {
            backgroundColor: "var(--textOnPrimaryColor)",
            borderColor: "var(--primaryColor)",
        },
        selected: {
            backgroundColor: "var(--primaryColor)",
        },
        hover: {
            backgroundColor: "var(--primaryHoverColor)",
            borderColor: "var(--primaryHoverColor)",
        },
    };

    const textVariants = {
        hover: {
            color: "var(--primaryHoverColor)",
        },
        normal: {
            color: "var(--primaryColor)",
        },
    };

    const handleClick = () => {
        if (hoverCache === "selected") {
            setHoverCache("idle");
            setCheckBoxState("idle");
        } else {
            props.onClick();
            setHoverCache("selected");
            setCheckBoxState("selected");
        }
    };
    const handleMouseEnter = () => {
        setHoverCache(checkBoxState);
        setCheckBoxState("hover");
    };
    const handleMouseLeave = () => {
        // console.log(hoverCache);
        setCheckBoxState(hoverCache);
    };

    return (
        <div
            className={styles.check_box}
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <motion.div
                className={styles.box}
                animate={checkBoxState}
                variants={boxVariants}
                transition={{ duration: 0.2 }}
            ></motion.div>
            <motion.div
                variants={textVariants}
                animate={checkBoxState === "hover" ? "hover" : "normal"}
                transition={{ duration: 0.2 }}
            >
                {props.label}
            </motion.div>
        </div>
    );
}
