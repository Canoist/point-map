import { IFormInputs } from "./../ui/registerForm";
import {
    DeepRequired,
    FieldErrorsImpl,
    UseFormRegister
} from "react-hook-form";

export default interface ITextFieldForm {
    error: FieldErrorsImpl<DeepRequired<IFormInputs>>;
    register: UseFormRegister<IFormInputs>;
}
