export default function handleFormSubmit(
    event: React.KeyboardEvent<HTMLInputElement>,
    cb: () => Promise<void> | void
) {
    if (event.key === "Enter") {
        event.currentTarget.blur();
        cb();
    }

    return handleFormSubmit;
}
