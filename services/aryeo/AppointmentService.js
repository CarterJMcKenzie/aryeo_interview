import { authHeaders } from "./AryeoClient";
import aryeoRequest from "./AryeoRequest";

async function appointment(appointment_id) {
    return await aryeoRequest({
        url: `/appointments/${appointment_id}?include=order,order.items,order.listing,users`,
        method: "GET",
        headers: authHeaders(),
    });
}

async function appointments(statusFilter, searchFilter, historyFilter, activeMonth) {
    let start_at_gte = activeMonth.toISOString()
    let end_at_gte = new Date(activeMonth.getFullYear(), activeMonth.getMonth() + 1, 1).toISOString()
    statusFilter = statusFilter.map((status) => '&filter[statuses][]=' + status).join('')
    let params =
        "?sort=" + "-start_at,-created_at" +
        "&filter[search]=" + searchFilter +
        statusFilter +
        // "&filter[tense]=" + historyFilter +
        "&filter[start_at_gte]=" + start_at_gte +
        "&filter[start_at_lte]=" + end_at_gte +
        "&per_page=" + 100
    return await aryeoRequest({
        url: `/appointments` + params,
        method: "GET",
        headers: authHeaders(),
    });
}

async function appointmentCancel(appointment_id) {
    return await aryeoRequest({
        url: `/appointments/${appointment_id}/cancel`,
        method: "PUT",
        data: {
            notify_customer: true,
        },
        headers: authHeaders(),
    });
}

async function appointmentReschedule(appointment_id, new_start, new_end) {
    return await aryeoRequest({
        url: `/appointments/${appointment_id}/schedule`,
        method: "PUT",
        data: {
            start_at: new_start,
            end_at: new_end,
            notify_customer: true,
        },
        headers: authHeaders(),
    });
}

const AppointmentService = {
    appointment,
    appointments,
    appointmentCancel,
    appointmentReschedule,
};

export default AppointmentService;
