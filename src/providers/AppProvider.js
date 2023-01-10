import React, {createContext, useEffect, useLayoutEffect, useState} from 'react';
import AppointmentService from "../../services/aryeo/AppointmentService";
import {fontSize1} from "../styles/Styles";

export const AppContext = createContext({});

export const AppProvider = ({children}) => {
    // master App Context, controls all data within app so that it is provided to all screens, fetches appointment data from aryeo

    const [appointments, setAppointments] = useState([]);
    const [appColor, setAppColor] = useState('#f9d949')
    const [fontSize, setFontSize] = useState(fontSize1)
    const [activeAppointment, setActiveAppointment] = useState({})
    const [statusFilter, setStatusFilter] = useState('SCHEDULED');
    const [historyFilter, setHistoryFilter] = useState('UPCOMING');
    const [searchFilter, setSearchFilter] = useState('')
    const [pageFilter, setPageFilter] = useState(1)
    const [loadingData, setLoadingData] = useState(true)

    useEffect(() => {
        setLoadingData(true);
        getAppointments(statusFilter, searchFilter, historyFilter, pageFilter).then(result => {
            setAppointments(result.result.data);
            setLoadingData(false);
        });
    }, [statusFilter, historyFilter, searchFilter, pageFilter]);

    async function getAppointments() {
        return await AppointmentService.appointments(statusFilter, searchFilter, historyFilter, pageFilter);
    }

    async function getAppointment(appointment_id) {
        const result = await AppointmentService.appointment(appointment_id);
    }
    return (
        <AppContext.Provider
            value={{
                appointments,
                setAppointments,
                appColor,
                fontSize,
                activeAppointment,
                setActiveAppointment,
                statusFilter,
                setStatusFilter,
                historyFilter,
                setHistoryFilter,
                searchFilter,
                setSearchFilter,
                pageFilter,
                setPageFilter,
                loadingData,
            }}>
            {children}
        </AppContext.Provider>
    );
};
