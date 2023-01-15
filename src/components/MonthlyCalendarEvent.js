import React, {useContext, useEffect} from "react";
import {Platform, Switch, Text, View} from "react-native";

// icons
import {AppContext} from '../providers/AppProvider';
import {textStyles} from "../styles/Styles";
import {makeTimeString, makeTimeStringShort} from "../functions/DateHandler";

export default function MonthlyCalendarEvent({appointment}) {

    const {nameColors} = useContext(AppContext);

    return (
       <Text
            key={'MonthlyCalendar' + appointment.id}
            numberOfLines={1}
            style={[textStyles.customColoredButtonXSmall, {backgroundColor: nameColors[appointment.name], marginBottom: 1}]}>
            {appointment.number}
       </Text>
    );
}
