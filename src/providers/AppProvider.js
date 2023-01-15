import React, {createContext, useEffect, useLayoutEffect, useReducer, useState} from 'react';
import AppointmentService from "../../services/aryeo/AppointmentService";
import {standardFont} from "../styles/Styles";
import {
    fetchAryeoData,
    fetchAsyncstorageData,
    formatAppointments,
    readAsyncstorage,
    reducer
} from "../functions/DataHandler";
import asyncStorage from "@react-native-async-storage/async-storage/src/AsyncStorage";

export const AppContext = createContext({});

export const AppProvider = ({children}) => {
    // master App Context, controls all data within app so that it is provided to all screens, fetches appointment data from aryeo
    const today = new Date()

    // Aryeo data buckets
    const [appointments, setAppointments] = useState([]);
    const [currentPage, setCurrentPage] = useState([]);
    const [nextPage, setNextPage] = useState([]);
    const [prevPage, setPrevPage] = useState([])

    // user preferences
    const [appColor, setAppColor] = useState('#f9d949')
    const [fontSize, setFontSize] = useState(standardFont)
    const [dashboardStyle, setDashboardStyle] = useState(false)
    const [nameColors, setNameColors] = useState(
        {
            'James Bond': 'lightblue',
            'Bernard Hodson': 'darkseagreen',
            'Nirmalpreet Singh': 'lightcoral',
            'Sevak Mkrtchyan' : 'lemonchiffon',
            'Denny Tedrow': '#d2b48c',
            'Joseph Loretto': '#f4a460',
            'Testing Testing': '#d8bfd8',
            'Franklin Nash': '#bc8f8f',
        })

    // dashboard filters
    const [statusFilter, setStatusFilter] = useState(['Scheduled']);
    const [historyFilter, setHistoryFilter] = useState('UPCOMING');
    const [searchFilter, setSearchFilter] = useState('')
    const [pageFilter, setPageFilter] = useState(1)

    // loading data flag
    const [loadingData, setLoadingData] = useState(true)

    // session data
    const [activeMonth, setActiveMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1))
    const [selectedDay, setSelectedDay] = useState(today)
    const [selectedAppointment, setSelectedAppointment] = useState({});

    // Get data from aryeo
    useEffect(() => {
        setLoadingData(true);
        getAppointments(statusFilter, searchFilter, historyFilter, activeMonth).then(result => {
            let formattedAppointmentArray = formatAppointments(result)
            setAppointments(formattedAppointmentArray);
            setLoadingData(false);
        })
    }, [statusFilter, historyFilter, searchFilter, activeMonth]);

    // // fetch saved preferences from asyncstorage
    // useEffect(() => {
    //     readAsyncstorage('preferences')
    // }, [])

    async function getAppointments() {
        return await AppointmentService.appointments(statusFilter, searchFilter, historyFilter, activeMonth);
    }

    return (
        <AppContext.Provider
            value={{
                appointments,
                setAppointments,
                appColor,
                fontSize,
                selectedAppointment,
                setSelectedAppointment,
                statusFilter,
                setStatusFilter,
                historyFilter,
                setHistoryFilter,
                searchFilter,
                setSearchFilter,
                pageFilter,
                setPageFilter,
                loadingData,
                nameColors,
                dashboardStyle,
                setDashboardStyle,
                activeMonth,
                setActiveMonth,
                selectedDay,
                setSelectedDay,
            }}>
            {children}
        </AppContext.Provider>
    );
};
