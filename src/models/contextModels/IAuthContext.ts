import ILoginInput from "../inputModels/ILoginInput";
import ILoginOutput from "../outputModels/ILoginOutput";

export default interface IAuthContext {
    token: string;
    isAuth: boolean;
    initialTokenCheck: () => Promise<boolean>;
    login: (input: ILoginInput) => Promise<ILoginOutput>;
    register: (input: ILoginInput) => Promise<ILoginOutput>;
    logout: () => {};
}
