import { AnimationControls } from "framer-motion";

export default async function swapPresence(
    present: AnimationControls,
    hidden: AnimationControls,
    hiddenDisplayValue?: string
) {
    await present.start({
        opacity: 0,
    });
    await present.start({
        display: "none",
        transition: { duration: 0 },
    });
    await hidden.start({
        display: hiddenDisplayValue ? hiddenDisplayValue : "block",
        opacity: 0,
        transition: { duration: 0 },
    });
    await hidden.start({
        opacity: 1,
    });
}
