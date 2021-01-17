import { motion } from "framer-motion";

export default function TransitionDiv(props: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={props.className}
        >
            {props.children}
        </motion.div>
    );
}
