import IError from "../dataModels/IError";

export default interface IOutput {
    isSuccess: boolean;
    payload?: any;
    error?: IError;
}
