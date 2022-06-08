import { FieldValues, UseFormRegister } from "react-hook-form";

export interface ErrorFromHook {
    message: string;
    ref: HTMLAnchorElement;
    type: string;
}

export default interface ITextFieldForm {
    error: undefined | ErrorFromHook;
    register: UseFormRegister<FieldValues>;
}
