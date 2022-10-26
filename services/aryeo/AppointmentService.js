import aryeoRequest from "./AryeoRequest";

async function appointments() {
    return await aryeoRequest({
        url: `/appointments`,
        method: "GET",
        headers: {
            "Authorization": `Bearer token`,
            "Aryeo-Group-Id": ``,
        },
    });
}

const AppointmentService = {
    appointments,
};

export default AppointmentService;
