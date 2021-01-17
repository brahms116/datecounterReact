import { unescapeLeadingUnderscores } from "typescript";
import { IValidationErrorItem } from "../models/dataModels/IValidationError";
import ILoginOutput from "../models/outputModels/ILoginOutput";

const Validation = {
    validateRegisterInput: (email: string, password: string) => {
        const validationErrors: IValidationErrorItem[] = [];
        if (
            !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                email
            )
        ) {
            validationErrors.push({
                field: "email",
                msg: "PLEASE PUT A VALID EMAIL",
            } as IValidationErrorItem);
        }
        if (password.length < 6) {
            validationErrors.push({
                field: "password",
                msg: "PASSWORD MUST HAVE AT LEAST 6 CHARACHTERS",
            });
        }

        if (password.length === 0) {
            validationErrors.push({
                field: "password",
                msg: "PLEASE PUT IN A PASSWORD",
            });
        }

        if (validationErrors.length > 0) {
            return {
                isSuccess: false,
                payload: undefined,
                error: {
                    msg: "There are some validation errors",
                    errors: validationErrors,
                },
            } as ILoginOutput;
        } else {
            return {
                isSuccess: true,
            } as ILoginOutput;
        }
    },
    validateLoginInput: (email: string, password: string) => {
        const validationErrors: IValidationErrorItem[] = [];
        if (email.length === 0)
            validationErrors.push({
                field: "email",
                msg: "EMAIL CANNOT BE BLANK",
            });
        if (password.length === 0)
            validationErrors.push({
                field: "password",
                msg: "PASSWORD CANNOT BE BLANK",
            });
        if (validationErrors.length > 0) {
            return {
                isSuccess: false,
                payload: undefined,
                error: {
                    msg: "There are some validation errors",
                    errors: validationErrors,
                },
            } as ILoginOutput;
        } else {
            return {
                isSuccess: true,
            } as ILoginOutput;
        }
    },
};

export default Validation;
