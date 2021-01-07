import styles from "./Tabs.module.css";
import { motion } from "framer-motion";
import React, { createContext, useContext, useEffect, useState } from "react";

interface IProps {
    children: React.ReactElement<ItemProps>[];
    onClick: (index: number) => void;
}

interface ItemProps {
    color: string;
    label: string;
    index?: number;
}

interface IContext {
    index: number;
    setIndex: (i: number) => void;
}
const TabSelectContext = createContext({} as IContext);

export default function Tabs(props: IProps) {
    const [index, setIndex] = useState(0);
    return (
        <TabSelectContext.Provider value={{ index, setIndex } as IContext}>
            <div className={styles.tabs}>
                {React.Children.map(props.children, (x, i) => {
                    // console.log(x);
                    return (
                        <div
                            onClick={() => {
                                props.onClick(i);
                            }}
                        >
                            {React.cloneElement(x, { index: i })}
                        </div>
                    );
                })}
            </div>
        </TabSelectContext.Provider>
    );
}

export function TabItem(props: ItemProps) {
    const [isActive, setActive] = useState(false);

    const tabContext = useContext(TabSelectContext);

    const variants = {
        idle: {
            color: "var(--iconColor)",
            borderColor: "var(--iconColor)",
        },
        active: {
            color: props.color,
            borderColor: props.color,
        },
    };

    useEffect(() => {
        if (props.index === tabContext.index) {
            setActive(true);
        } else {
            setActive(false);
        }
    }, [tabContext.index, props.index]);

    const handleClick = () => {
        // console.log(props.index);
        if (props.index != null) tabContext.setIndex(props.index);
    };
    return (
        <motion.div
            variants={variants}
            animate={isActive ? "active" : "idle"}
            className={styles.tab_item}
            onClick={handleClick}
        >
            {props.label}
        </motion.div>
    );
}
