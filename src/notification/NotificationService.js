import { createContext, useState } from "react";
import '../notification/NotificationService.css'

const Notification = ({message, severity}) => {
    const notificationStyle = {
        position: 'absolute',
        bottom: 40,
        widht: 'auto',
        height: 'auto',
        padding: '10px 20px 10px 20px',

    }

    if (message === '') return
    
    return (
        <div className="container" >
            <div className="animation" style={notificationStyle}>
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