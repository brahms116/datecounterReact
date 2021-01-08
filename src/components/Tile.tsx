import styles from "./Tile.module.css";
import { motion } from "framer-motion";
import Dropdown from "./Dropdown";
import DropdownItem from "./DropdownItem";
interface IProps {
    title: string;
    numDays: number;
    id: number;
    isSecondary?: boolean;
}

export default function Tile(props: IProps) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.tile}
        >
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
                        onClick={() => {}}
                    ></DropdownItem>
                    <DropdownItem
                        label="SET AS COVER"
                        onClick={() => {}}
                    ></DropdownItem>
                </Dropdown>
            </div>
        </motion.div>
    );
}
