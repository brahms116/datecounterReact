import IError from "./IError";

export default interface IValidationError extends IError {
    errors: IValidationErrorItem[];
}

export const isValidationError = (
    error: IError | IValidationError
): error is IValidationError => {
    return (
        (error as IValidationError).errors !== undefined ||
        (error as IValidationError).errors === null
    );
};

export interface IValidationErrorItem {
    field: string;
    msg: string;
}
