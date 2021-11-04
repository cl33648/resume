import {notification} from "antd";

const openNotificationWithIcon = (type, message, description, placement) => {
    placement = placement || "topRight" //IF THERE IS NO PLACEMENT VALUE, DEFAULT IS TOP RIGHT
    notification[type]({message, description, placement});
};

export const openSuccessNotification = (message, description, placement) =>
    openNotificationWithIcon('success', message, description, placement);

export const openErrorNotification = (message, description, placement) =>
    openNotificationWithIcon('error', message, description, placement);

export const openInfoNotification = (message, description, placement) =>
    openNotificationWithIcon('info', message, description, placement);

export const openWarningNotification = (message, description, placement) =>
    openNotificationWithIcon('warning', message, description, placement);