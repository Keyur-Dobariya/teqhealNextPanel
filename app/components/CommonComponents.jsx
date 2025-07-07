export const showToast = (type = "info", content = "") => {
    if (messageApi) {
        messageApi.open({
            type,
            content,
        });
    } else {
        message.open({
            type,
            content,
        });
    }
};