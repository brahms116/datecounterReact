import IAuthEventOutput from "../outputModels/IAuthEventOutput";

export default interface IUseAuth {
    token: string;
    isAuth: boolean;
    checkToken: () => Promise<IAuthEventOutput>;
    login: (
        email: string,
        password: string,
        rememberMe: boolean
    ) => Promise<IAuthEventOutput>;
    register: (
        email: string,
        password: string,
        rememberMe: boolean
    ) => Promise<IAuthEventOutput>;
    logout: () => void;
}
