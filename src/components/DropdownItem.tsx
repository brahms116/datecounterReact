import styles from "./DropdownItem.module.css";

interface IProps {
    label: string;
    onClick: () => void;
    animationClose?: () => Promise<void>;
}

export default function DropdownItem(props: IProps) {
    const handleClick = async () => {
        if (props.animationClose) {
            await props.animationClose();
        }
        props.onClick();
    };
    return (
        <div
            className={styles.dropdown_item}
            onClick={() => {
                handleClick();
            }}
        >
            {props.label}
        </div>
    );
}
