import IError from "../models/dataModels/IError";
import { isValidationError } from "../models/dataModels/IValidationError";
import handleEventReturn from "./handleEventReturn";

const handleServerError = (error: IError) => {
    if (isValidationError(error)) {
        return handleEventReturn(false, null, error);
    } else {
        return handleEventReturn(false, null, {
            msg: error.msg,
            errors: [{ field: "server", msg: error.msg.toLocaleUpperCase() }],
        });
    }
};

export default handleServerError;
