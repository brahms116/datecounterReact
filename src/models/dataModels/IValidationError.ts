import IError from "./IError";

export default interface IValidationError extends IError {
    errors: IValidationErrorItem[];
}

export interface IValidationErrorItem {
    field: string;
    msg: string;
}
