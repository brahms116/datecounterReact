import { IValidationErrorItem } from "../models/dataModels/IValidationError";
import IEventOutput from "../models/outputModels/IEventOutput";

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

        if (password.match(/\s/g)) {
            validationErrors.push({
                field: "password",
                msg: "PASSWORD CANNOT HAVE BLANKS",
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
            } as IEventOutput;
        } else {
            return {
                isSuccess: true,
            } as IEventOutput;
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
            } as IEventOutput;
        } else {
            return {
                isSuccess: true,
            } as IEventOutput;
        }
    },
    validateDateItemTitle(title: string) {
        const validationErrors: IValidationErrorItem[] = [];
        if (title.length === 0)
            validationErrors.push({
                field: "title",
                msg: "TITLE CANNOT BE BLANK",
            });
        if (/^\s.*\s$/g.test(title)) {
            validationErrors.push({
                field: "title",
                msg: "CANNOT START OR END WITH BLANKS",
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
            } as IEventOutput;
        } else {
            return {
                isSuccess: true,
            } as IEventOutput;
        }
    },
};

export default Validation;
