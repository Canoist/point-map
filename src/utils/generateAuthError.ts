export function generateAuthError(message: string): string {
    switch (message) {
        case "INVALID_PASSWORD":
            return "Email или пароль введены некорректно";
        case "EMAIL_NOT_FOUND":
            return "Email или пароль введены некорректно";
        case "EMAIL_EXISTS":
            return "Пользователь с таким Email уже существует";
        case "IVALID_DATA":
            return "Проверьте правильность введенных данных";
        default:
            return "Слишком много попыток входа. Попробуйте позже";
    }
}
