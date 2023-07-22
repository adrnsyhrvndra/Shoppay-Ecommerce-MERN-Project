import dayjs from "dayjs";

export function calculateDiff(timeInMs) {
    const timeStamDayjs = dayjs(timeInMs);
    const nowDayjs = dayjs();

    if (timeStamDayjs.isBefore(nowDayjs)) {
        return {
            seconds: "00",
            minutes: "00",
            hours: "00",
            days: "00",
        };
    }
    return{
        seconds:getRemainingSeconds(nowDayjs, timeStamDayjs),
        minutes:getRemainingMinutes(nowDayjs, timeStamDayjs),
        hours:getRemainingHours(nowDayjs, timeStamDayjs),
        days:getRemainingDays(nowDayjs, timeStamDayjs),
    };
}

function getRemainingSeconds(nowDayjs, timeStamDayjs) {
    const seconds = timeStamDayjs.diff(nowDayjs, "seconds") % 60;
    return padWithZeroes(seconds,2);
}

function getRemainingMinutes(nowDayjs, timeStamDayjs) {
    const minutes = timeStamDayjs.diff(nowDayjs, "minutes") % 60;
    return padWithZeroes(minutes,2);
}

function getRemainingHours(nowDayjs, timeStamDayjs) {
    const hours = timeStamDayjs.diff(nowDayjs, "hours") % 60;
    return padWithZeroes(hours,2);
}

function getRemainingDays(nowDayjs, timeStamDayjs) {
    const days = timeStamDayjs.diff(nowDayjs, "day");
    return days.toString();
}

function padWithZeroes(number,length) {
    const numberString = number.toString();
    if(numberString.length >= length) return numberString;
    return "0".repeat(length - numberString.length) + numberString;
}