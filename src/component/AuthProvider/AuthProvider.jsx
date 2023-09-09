import { createContext } from "react";

export const authContext = createContext();
const AuthProvider = ({children}) => {
    
    
    // The necessary data that are to pass another component.
    const value = {name:"shafin"}
    
    return (
        <authContext.Provider value={value}>
            {children}
        </authContext.Provider>
    );
};

export default AuthProvider;