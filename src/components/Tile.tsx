import styles from "./Tile.module.css";
import Dropdown from "./Dropdown";
import DropdownItem from "./DropdownItem";
import React, { useContext } from "react";
import TransitionDiv from "../utils/TransitionDiv";
import { tileContext } from "../pages/HomePage";
interface IProps {
    title: string;
    numDays: string;
    id: number;
    isSecondary?: boolean;
}

export default function Tile(props: IProps) {
    const tileC = useContext(tileContext);
    return (
        <TransitionDiv className={styles.tile}>
            <div className={styles.title}>{props.title}</div>
            <div
                className={`${styles.number} ${
                    props.isSecondary ? styles.secondary : styles.primary
                }`}
            >
                {props.numDays}
            </div>
            <div className={styles.dropdown}>
                <Dropdown>
                    <DropdownItem
                        label="DELETE MY CARD"
                        onClick={() => {
                            tileC.onDelete(props.id);
                        }}
                    ></DropdownItem>
                    <DropdownItem
                        label="SET AS COVER"
                        onClick={() => {
                            tileC.onSetCover(props.id);
                        }}
                    ></DropdownItem>
                </Dropdown>
            </div>
        </TransitionDiv>
    );
}
