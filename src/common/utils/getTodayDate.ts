export const getTodayDate = () => {
    const date = new Date(); // 현재 시간
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const dateStr = year + '-' + month + '-' + day;
    const today = new Date(dateStr)
    return today;
}