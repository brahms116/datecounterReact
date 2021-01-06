import styles from "./DropdownItem.module.css";

interface IProps {
    label: string;
    onClick: () => void;
}

export default function DropdownItem(props: IProps) {
    return (
        <div className={styles.dropdown_item} onClick={props.onClick}>
            {props.label}
        </div>
    );
}
