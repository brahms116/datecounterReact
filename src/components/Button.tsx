import styles from "./Button.module.css";
interface IProps {
    text: string;
    isOutline?: boolean;
    onClick: () => void;
}
export default function Button(props: IProps) {
    return (
        <div
            className={props.isOutline ? styles.outlined_button : styles.button}
            onClick={props.onClick}
        >
            <div className={styles.button_text}>{props.text}</div>
        </div>
    );
}
