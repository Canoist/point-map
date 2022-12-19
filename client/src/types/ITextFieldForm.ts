import { IFormInputs } from "./../ui/registerForm";
import { FieldErrorsImpl, UseFormRegister } from "react-hook-form";

export default interface ITextFieldForm {
    error: FieldErrorsImpl<IFormInputs>;
    register: UseFormRegister<IFormInputs>;
}
