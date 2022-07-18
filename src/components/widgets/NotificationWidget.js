
import { Toast, ToastHeader, ToastBody } from "reactstrap"

export default function NotificationWidget(props) {
    return (
        <Toast>
            <ToastHeader>
                {props.headerText}
            </ToastHeader>
            <ToastBody>
                {props.notificationText}
            </ToastBody>
        </Toast>
    )
}