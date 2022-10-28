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
        headers: authHeaders(),
    });
}

async function appointmentCancel(appointment_id, notify_customer) {
    return await aryeoRequest({
        url: `/appointments/${appointment_id}/cancel`,
        method: "PUT",
        data: {
            notify_customer: notify_customer,
        },
        headers: authHeaders(),
    });
}

async function appointmentReschedule(
    appointment_id,
    start_at,
    end_at,
    notify_customer
) {
    return await aryeoRequest({
        url: `/appointments/${appointment_id}/schedule`,
        method: "PUT",
        data: {
            start_at: start_at,
            end_at: end_at,
            notify_customer: notify_customer,
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
