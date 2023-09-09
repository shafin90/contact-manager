import { createContext, useEffect, useState } from "react";

export const authContext = createContext();
const AuthProvider = ({ children }) => {
    const [allContacts, setAllContacts] = useState([]); //This state hold all the contacts
    const [reload, setReload] = useState(true) // This state tell useEffect to fetch data again when this state get changed through POST method

    // Loading all contacts
    useEffect(() => {
        fetch("http://localhost:5000/api/contacts")
            .then(res => res.json())
            .then(data => setAllContacts(data))
    }, [reload])

    // The necessary data that are to pass another component.
    const value = {
        allContacts,
        setReload,
        reload
    }

    return (
        <authContext.Provider value={value}>
            {children}
        </authContext.Provider>
    );
};

export default AuthProvider;