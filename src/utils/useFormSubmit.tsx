import { useEffect } from "react";

export default function useFormSubmit(
    ref: React.RefObject<HTMLElement>,
    cb: () => Promise<void> | void
) {
    const formSubmit = () => {
        document.body.focus();
        cb();
    };

    useEffect(() => {
        //document.addEventListener()
    });
}
