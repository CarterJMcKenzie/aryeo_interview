import { authHeaders } from "./AryeoClient";
import aryeoRequest from "./AryeoRequest";

async function appointment(appointment_id) {
    return await aryeoRequest({
        url: `/appointments/${appointment_id}?include=order,order.items,order.listing,users`,
        method: "GET",
        headers: authHeaders(),
    });
}

async function appointments() {
    return await aryeoRequest({
        url: `/appointments`,
        method: "GET",
        // Optional parameters...
        params: {
            "filter[search]": "", // (string) text search for appointment address or customer
            "filter[statuses][]": "", // (string, multiple) possible values: SCHEDULED, UNSCHEDULE, CANCELED, DRAFT
            "filter[tense]": "UPCOMING", // (string) possible values: PAST, UPCOMING
            "filter[start_at_gte]": "2022-03-12T22:31:21Z", // (date string)
            "filter[start_at_lte]": "2022-03-12T22:31:21Z", // (date string)
            "sort": "-start_timestamp,-created_at", // (string) comma-separated listed with -start_timestamp or -created_at
            "per_page": 25, // (int)
            "page": 1, // (int)
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

async function appointmentReschedule(appointment_id) {
    return await aryeoRequest({
        url: `/appointments/${appointment_id}/schedule`,
        method: "PUT",
        data: {
            start_at: "2022-03-12T22:31:21Z",
            end_at: "2022-03-12T24:31:21Z",
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
