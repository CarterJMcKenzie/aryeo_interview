
// take array of agenda items and map them to a date (could be done on back end)
export function createMonthAgenda(activeMonth, appointmentList) {
    let year = activeMonth.getFullYear();
    let month = activeMonth.getMonth();

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const leadingDays = activeMonth.getDay();
    const trailingDays = 35 - daysInMonth - leadingDays;
    // create an array containing a date value for each day in the month
    let leadingArray = Array.from({length: leadingDays}, (_, index) => ({date: new Date(year, month, index + 1 - leadingDays), appointments: []}));
    let trailingArray = Array.from({length: trailingDays}, (_, index) => ({date: new Date(year, month + 1, index + 1), appointments: []}));
    let monthAgenda = Array.from({length: daysInMonth}, (_, index) => ({date: new Date(year, month, index + 1)}));

    // create an agenda for the month by mapping the appointments to each of those days
    let mainArray = monthAgenda.map((day, index) => {
        let dayAgenda = appointmentList.filter(appointment => {
            return new Date(appointment.start_at).getDate() === day.date.getDate()
        })
        return {
            'date': day.date,
            'appointments': dayAgenda
        }
    })
    return leadingArray.concat(mainArray, trailingArray)
}
