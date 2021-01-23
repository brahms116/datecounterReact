import IEventOutput from "./IEventOutput";

export default interface IAuthEventOutput extends IEventOutput {
    payload?: {
        token: string;
    };
}
