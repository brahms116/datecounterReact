import styles from "./Card.module.css";

interface IProps {
    children: React.ReactNode;
}

export default function Card(props: IProps) {
    return <div className={styles.card}>{props.children}</div>;
}
