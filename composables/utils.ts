export const useDateFormat = (date) => {
    return useState('dateFormat', () => date.split('T')[0]);
}
