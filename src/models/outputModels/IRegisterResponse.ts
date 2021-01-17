import IOutput from "./IOutput";

export interface IRegisterResponseData {
    user: {
        id: number;
        email: string;
        password: string;
        is_email_confirmed: boolean;
    };
    token: string;
}

export default interface IRegisterResponse extends IOutput {
    payload: IRegisterResponseData;
}
