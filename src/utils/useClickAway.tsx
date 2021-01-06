import React, { useEffect } from "react";

const useClickOutside = (
    ref: React.RefObject<HTMLDivElement>,
    cb: () => void
) => {
    const handleClick = (evt: MouseEvent) => {
        if (ref.current && !ref.current.contains(evt.target as Node)) {
            cb();
        }
    };
    useEffect(() => {
        document.addEventListener("mousedown", handleClick);

        return () => {
            document.removeEventListener("mousedown", handleClick);
        };
    });
};

export default useClickOutside;
