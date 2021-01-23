import IValidationError from "../dataModels/IValidationError";
import IOutput from "./IOutput";

export default interface IEventOutput extends IOutput {
    error?: IValidationError;
}
