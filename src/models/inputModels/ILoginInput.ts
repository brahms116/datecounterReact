import IAuth from "../dataModels/IAuth";

export default interface ILoginInput {
    credientials: IAuth;
    rememberMe: boolean;
}
