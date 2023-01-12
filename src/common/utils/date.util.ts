export const getTodayDate = () => {
    const date = new Date();
    const dateStr = dateToString(date);
    const today = new Date(dateStr);
    return today;
}

export const getYesterdayDate = () => {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    const dateStr = dateToString(date);
    const today = new Date(dateStr);
    return today;
}

export const dateToString = (date: Date) => {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return year + '-' + month + '-' + day;
}