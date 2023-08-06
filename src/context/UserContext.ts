import { createContext, useContext } from "react";
export type UserGlobal = {
    user: object,
    setUser: (c: object) => void,
    isLoggedIn: string,
    setIsLoggedIn: (c: string) => void
}

export const UserContext = createContext<UserGlobal>({
    user: {},
    setUser: () => {},
    isLoggedIn: "",
    setIsLoggedIn: () => ""
})

export const useUserContext = () => useContext(UserContext);