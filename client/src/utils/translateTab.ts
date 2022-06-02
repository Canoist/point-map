import { ReactNode } from "react";

export function translateTab(name:string):ReactNode {
    switch (name) {
        case "Main":
            return "Map";
        case "Favorites":
            return "Избранное";
        case "Profile":
            return "Профиль";
        case "Logout":
            return "Выйти";

        default:
            break;
    }
}
