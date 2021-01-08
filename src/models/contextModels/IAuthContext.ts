import ILoginInput from "../inputModels/ILoginInput";

export default interface IAuthContext {
    token: string;
    isAuth: boolean;
    rememberMe: boolean;
    login: (input: ILoginInput) => void;
    register: (input: ILoginInput) => void;
    logout: () => {};
}
