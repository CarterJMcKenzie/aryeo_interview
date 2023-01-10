import { authHeaders } from "./AryeoClient";
import aryeoRequest from "./AryeoRequest";

async function appointment(appointment_id) {
    return await aryeoRequest({
        url: `/appointments/${appointment_id}?include=order,order.items,order.listing,users`,
        method: "GET",
        headers: authHeaders(),
    });
}

async function appointments(statusFilter, searchFilter, historyFilter, pageFilter) {
    return await aryeoRequest({
        url: `/appointments`,
        method: "GET",
        // Optional parameters...
        params: {
            "filter[search]": searchFilter, // (string) text search for appointment address or customer
            "filter[statuses][]": statusFilter, // (string, multiple) possible values: SCHEDULED, UNSCHEDULED, CANCELED, DRAFT
            "filter[tense]": historyFilter, // (string) possible values: PAST, UPCOMING
            "filter[start_at_gte]": "2021-03-12T22:31:21Z", // (date string)
            "filter[start_at_lte]": "2024-03-12T22:31:21Z", // (date string)
            "sort": "-start_at,-created_at", // (string) comma-separated listed with -start_timestamp or -created_at
            "per_page": 25, // (int)
            "page": pageFilter, // (int)
        },
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
