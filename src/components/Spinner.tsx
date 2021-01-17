import styles from "./Spinner.module.css";

export default function Spinner(props: { className?: string }) {
    return <div className={`${styles.spinner} ${props.className}`}></div>;
}
