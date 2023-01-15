import React, {useContext, useEffect} from "react";
import {Text, ScrollView, Pressable, View} from "react-native";
import {standardFont, textStyles} from "../styles/Styles";
import MonthlyCalendarEvent from "./MonthlyCalendarEvent";
import {AppContext} from "../providers/AppProvider";

export default function MonthlyCalendarBox({dayAgenda}) {

    const {setSelectedDay, activeMonth, selectedDay} = useContext(AppContext);
    let boxDate = new Date(dayAgenda.date);
    return (
        <Pressable
            onPress={() => setSelectedDay(new Date(dayAgenda.date))}
            style={{backgroundColor: boxDate.getMonth() === activeMonth.getMonth() ? 'white' : '#ebebeb', padding: 2, height: '20%', borderBottomWidth: 1, borderLeftWidth: 1, borderColor: '#717171', width: '14.28%'}}>
            <Text style={(boxDate === selectedDay ? textStyles.large : {fontSize: standardFont.small, fontWeight: boxDate.getMonth() === activeMonth.getMonth() ? 'bold' : null, color: boxDate.getMonth() === activeMonth.getMonth() ? '#2a2a2a' : '#828282',  marginBottom: 3})}>
                {new Date(dayAgenda.date).getDate()}
            </Text>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{alignItems: 'center'}}>
                {dayAgenda.appointments.map((appointment,index) => (
                    <MonthlyCalendarEvent key={'appointment' + appointment.id} appointment={appointment}/>
                ))}
            </ScrollView>
        </Pressable>
    )
}
