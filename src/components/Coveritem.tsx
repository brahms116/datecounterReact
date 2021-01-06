import React from "react";
import Card from "./Card";
import styles from "./CoverItem.module.css";

interface IProps {
    isSecondary?: boolean;
}
export default function CoverItem(props: IProps) {
    return (
        <Card>
            <div className={styles.cover_item}>
                <div className={styles.subtitle}>DAYS SINCE</div>
                <div
                    className={`${styles.title} ${
                        props.isSecondary ? styles.secondary : styles.primary
                    }`}
                >
                    MOM'S BIRTHDAY
                </div>
                <div className={styles.date}>20/12/2020</div>
                <div
                    className={`${styles.number_small} ${
                        props.isSecondary ? styles.secondary : styles.primary
                    }`}
                >
                    1400000
                </div>
            </div>
        </Card>
    );
}
