import Card from "./Card";
import styles from "./Dropdown.module.css";
import moreIcon from "../media/DropdownIcon.svg";
import closeIcon from "../media/CloseIcon.svg";
import React, { useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import useClickOutside from "../utils/useClickAway";

interface IProps {
    children: React.ReactNode;
    isLarge?: boolean;
}

export default function Dropdown(props: IProps) {
    const ref = useRef<HTMLDivElement>(null);
    const count = React.Children.count(props.children);
    const iconAnimationControls = useAnimation();
    const menuAnimationControls = useAnimation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    const openMenu = async () => {
        if (!isAnimating) {
            setIsAnimating(true);
            await menuAnimationControls.start({
                display: "block",
                opacity: 0,
                transition: { duration: 0 },
            });
            await Promise.all([
                menuAnimationControls.start({
                    opacity: 1,
                }),
                iconAnimationControls.start({
                    opacity: 0,
                }),
            ]);
            setIsMenuOpen(true);
            await iconAnimationControls.start({
                opacity: 1,
            });
            setIsAnimating(false);
        }
    };

    const closeMenu = async () => {
        if (!isAnimating) {
            setIsAnimating(true);
            await Promise.all([
                menuAnimationControls.start({
                    opacity: 0,
                }),
                iconAnimationControls.start({
                    opacity: 0,
                }),
            ]);
            setIsMenuOpen(false);
            await iconAnimationControls.start({
                opacity: 1,
            });
            await menuAnimationControls.start({
                display: "none",
                opacity: 0,
                transition: { duration: 0 },
            });
            setIsAnimating(false);
        }
    };
    const handleIconClick = async () => {
        if (!isMenuOpen) {
            await openMenu();
        } else {
            await closeMenu();
        }
    };
    useClickOutside(ref, closeMenu);

    return (
        <div className={styles.dropdown} ref={ref}>
            <motion.div
                className={props.isLarge ? styles.large_icon : styles.icon}
                animate={iconAnimationControls}
                onClick={handleIconClick}
            >
                <img src={isMenuOpen ? closeIcon : moreIcon} alt="" />
            </motion.div>
            <motion.div
                className={styles.dropdown_menu}
                animate={menuAnimationControls}
            >
                <Card>
                    {React.Children.map(props.children, (child, i) => {
                        if (i < count - 1) {
                            return (
                                <div>
                                    {child}
                                    <div className={styles.divider} />
                                </div>
                            );
                        } else return child;
                    })}
                </Card>
            </motion.div>
        </div>
    );
}
