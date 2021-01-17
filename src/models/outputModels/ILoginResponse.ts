import IOutput from "./IOutput";

export interface ILoginResponseData {
    token: string;
}
export default interface ILoginResponse extends IOutput {
    payload: ILoginResponseData;
}
