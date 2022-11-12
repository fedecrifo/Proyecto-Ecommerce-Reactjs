import { createContext, useState } from "react";
import '../notification/NotificationService.css'

const Notification = ({message, severity}) => {
    const notificationStyle = {

    }

    if (message === '') return
    
    return (
        <div className="container">
            <div className="animation">
            {message}
            </div>
        </div>    
    )
}

export const NotificationContext = createContext()

export const NotificationProvider= ({children}) => {
    const[message, setMessage]= useState('')
    const[severity, setSeverity] = useState('success')

    const setNotification = (sev, msj, time = 2) => {
        setSeverity(sev)
        setMessage(msj)
        setTimeout(() => {
            setMessage('')
        }, time * 1000);
    }

    return(
        <NotificationContext.Provider value={{setNotification}}>
            <Notification severity={severity} message={message}/>
            {children}
        </NotificationContext.Provider>
    )
}

export default NotificationContext