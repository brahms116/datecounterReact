import IValidationError from "../models/dataModels/IValidationError";

export default function handleFormError(
    fields: string[],
    cb: React.Dispatch<React.SetStateAction<string>>[]
) {
    //not very efficient
    const handleErrors = (error: IValidationError) => {
        for (const err of error.errors) {
            for (let i in fields) {
                if (err.field === fields[i]) {
                    cb[i](err.msg);
                    break;
                }
            }
        }
    };
    return handleErrors;
}
