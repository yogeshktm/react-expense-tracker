export const getDateTime = () => {
    let today = new Date();

    let date =
        today.getDate() + "-" +
        Number(today.getMonth() + 1) + "-" +
        today.getFullYear();
    let time =
        " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return [date, time];
}

export const checkDataNotEmpty = (data) => {
    if (data.length > 0) {
        return true;
    }
    else {
        return false;
    }
}

export const isInputNotEmpty = (input) => {
    if (input.target.value.trim().length > 0) {
        return true;
    }
    else {
        return false;
    }
}

export const generateUniqueRandom = (max) => {
    return Math.floor(Math.random() * max);
}

export const generateRandomColor = () => {
    return Math.floor(Math.random() * 16777215).toString(16);
}