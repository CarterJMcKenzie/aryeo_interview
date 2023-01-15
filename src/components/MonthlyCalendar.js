import React, {useContext, useEffect} from "react";
import {Text, ScrollView, Pressable, View} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import {AppContext} from "../providers/AppProvider";
import AppointmentItem from "./AppointmentItem";
import {textStyles} from "../styles/Styles";
import MonthlyCalendarBox from "./MonthlyCalendarBox";
import {makeMonthString} from "../functions/DateHandler";
import AppointmentList from "./AppointmentList";
import {createMonthAgenda} from "../functions/CalendarBuilder";

export default function MonthlyCalendar({appointmentList}) {

    const {activeMonth, selectedDay} = useContext(AppContext)
    let monthAgenda = createMonthAgenda(activeMonth, appointmentList);

    return (
        // view appointment items on page and toggle between pages.  displays note if no events in list
        <View style={{flex: 1}}>
            <View style={{flexDirection: 'row'}}>
                {['Sun','Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'].map((dayOfWeek) =>
                    <View key={dayOfWeek} style={{width: '14.28%', alignItems: 'center'}}>
                        <Text style={textStyles.mediumBold}>{dayOfWeek}</Text>
                    </View>
                )}
            </View>
            <View
                style={{flexDirection: 'row', flexWrap: 'wrap', height: '50%', borderTopWidth: 1, borderColor: '#717171'}}>
            {monthAgenda.map((dayAgenda, index) => (
                    <MonthlyCalendarBox key={'day' + index} dayAgenda={dayAgenda}/>
                )
            )}
            </View>
            <View style={{marginTop: 8}}>
                <AppointmentList eventList={monthAgenda.filter(object => object.date.getDate() === selectedDay.getDate())[0].appointments} />
            </View>
        </View>

    )
}
