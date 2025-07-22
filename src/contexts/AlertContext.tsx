import { createContext, useCallback, useContext, useState, type FC, type ReactNode } from "react";

interface AlertContextProps {
    message: string;
    visible: boolean;
    showAlert: (message: string) => void;
    hideAlert: () => void;
}

const AlertContext = createContext<AlertContextProps | undefined>(undefined)
export const AlertProvider: FC<{ children: ReactNode }> = ({ children }) => {

    const [alert, setAlert] = useState({
        message: '',
        visible: false
    });

    const showAlert = useCallback((message: string) => {
        setAlert({ message, visible: true });
    }, []);

    const hideAlert = useCallback(() => {
        setAlert({ message: '', visible: false });
    }, []);

    return (
        <AlertContext.Provider value={{ ...alert, showAlert, hideAlert }}>
            {children}
        </AlertContext.Provider>
    )
}

export const useAlert = () => {
    const context = useContext(AlertContext);
    if (!context) {
        throw new Error('useAlert must be used within a AlertProvider');
    }
    return context
}