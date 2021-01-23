import IValidationError from "../models/dataModels/IValidationError";
import IEventOutput from "../models/outputModels/IEventOutput";

const handleEventReturn = <T extends IEventOutput>(
    isSuccess?: boolean,
    payload?: any,
    error?: IValidationError
) => {
    return {
        isSuccess: isSuccess === undefined ? true : isSuccess,
        payload: payload ? payload : null,
        error: error ? error : null,
    } as T;
};

export default handleEventReturn;
