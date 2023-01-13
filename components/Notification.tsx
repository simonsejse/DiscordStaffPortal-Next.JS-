import { Alert, AlertColor, AlertTitle, Typography } from '@mui/material';
import { Notifications } from '@prisma/client';
import React from 'react'
import { useSnackbar } from './Snackbar';

const alertTitle = {
    "error": 'Vigtigt',
    "warning": 'Advarsel',
    "info": 'Vigtig meddelelse',
    "success": 'Godkendt'
};

interface NotificationProp {
    id: string;
    severity: string;
    message: string;
    userId: string;
    setNotifications: React.Dispatch<React.SetStateAction<Notifications[]>>;
};

type Data = {
    message: string;
    severity: string;
}

const Notification = ({ setNotifications, id, severity, message }: NotificationProp) => {
    const { showMessage } = useSnackbar();
    const deleteNotificationFromUser = async () => {
        const data = await fetch(`api/notifications/delete`, {
            method: 'delete',
            body: id
        }).then((response) => response.json())
        if (data || !(data.ok)) {
            if (showMessage)
                showMessage(data.message, data.severity)
        }


    }
    return (
        <Alert onClose={() => { deleteNotificationFromUser() }} severity={severity as AlertColor}>
            <Typography
                variant="body2"
                fontWeight={600}
                style={{ color: '#8ba1b7', opacity: 0.9, letterSpacing: '0.3px' }}
            >
                Notifikation modtaget d. 12-04/2022
            </Typography>
            <AlertTitle>{alertTitle[severity as keyof typeof alertTitle]}</AlertTitle>
            {message}
        </Alert>
    )
}

export default Notification