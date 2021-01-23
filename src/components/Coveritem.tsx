import React from "react";
import { IConvertedCoverItem } from "../utils/convertDateItem";
import Card from "./Card";
import styles from "./CoverItem.module.css";

interface IProps {
    item: IConvertedCoverItem;
}
export default function CoverItem(props: IProps) {
    return (
        <Card>
            <div className={styles.cover_item}>
                <div className={styles.subtitle}>
                    DAYS {props.item.isSecondary ? "SINCE" : "TILL"}
                </div>
                <div
                    className={`${styles.title} ${
                        props.item.isSecondary
                            ? styles.secondary
                            : styles.primary
                    }`}
                >
                    {props.item.title}
                </div>
                <div className={styles.date}>{props.item.date}</div>
                <div
                    className={`${styles.number_small} ${
                        props.item.isSecondary
                            ? styles.secondary
                            : styles.primary
                    }`}
                >
                    {+props.item.daysDiff === 0 ? "TODAY" : props.item.daysDiff}
                </div>
            </div>
        </Card>
    );
}
