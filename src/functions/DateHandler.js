import {Platform} from "react-native";

const month = {
    short: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sept',
        'Oct',
        'Nov',
        'Dec',
    ],
    long: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ],
}

const weekday = {
    short: ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
    long: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
    ],
}

export function makeDateString(date, format) {
    if (Platform.OS === 'ios') {
        return date.toLocaleDateString('en-US', {
            weekday: format.weekday,
            day: 'numeric',
            month: format.month,
        });
    } else {
        let utc = date.getTime() + date.getTimezoneOffset() * 60000,
            US_time = utc + 3600000 * -4,
            US_date = new Date(US_time);

        return (
            weekday[format.weekday][US_date.getDay() - 1] +
            ', ' +
            month[format.month][US_date.getMonth()] +
            ' ' +
            US_date.getDate() +
            (format.year ? ', ' + US_date.getFullYear() : '')
        );
    }
}



export function makeTimeString(date) {
    let hours = date.getHours();
    // console.log('timezone:');
    // console.log('date in ampm function', date);
    // console.log('time in ampm function', date.getHours());
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return hours + ':' + minutes + ' ' + ampm;
}

export function makeTimeStringSeperated(date) {
    let hours = date.getHours();
    // console.log('timezone:');
    // console.log('date in ampm function', date);
    // console.log('time in ampm function', date.getHours());
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    let time = {'hours': hours, 'minutes': minutes, 'ampm': ampm}
    return time
}

export function makeDateTimeString(date, format) {
    return (makeDateString(date, format) + ' at ' + makeTimeString(date))
}
