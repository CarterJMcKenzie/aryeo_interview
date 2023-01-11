// appointment component for the list view on the dashboard

import React, {useContext} from 'react';
import {Pressable, Text, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {AppContext} from "../providers/AppProvider";
import {shortDateFormat, textStyles, viewStyles} from "../styles/Styles";
import {makeDateString, makeTimeString} from "../functions/DateHandler";

export default function AppointmentItem({appointment, index, previous}) {
    const navigator = useNavigation();
    const {fontSize, setActiveAppointment} = useContext(AppContext);

    return (
        // conditionally renders the day of the week based on comparing it to the date above
        <View style={viewStyles.standardTab}>
            {index > 0  ?
                <View>
                    {new Date(appointment.start_at).toLocaleDateString() !== new Date(previous.start_at).toLocaleDateString() &&
                        <View
                        style={viewStyles.sectionHeader}
                        >
                            <Text style={textStyles.mediumBold}>{makeDateString(new Date(appointment.start_at), shortDateFormat)}</Text>
                        </View>
                    }
                </View>
                :
                <View>
                    <Text style={textStyles.mediumBold}>{makeDateString(new Date(appointment.start_at), shortDateFormat)}</Text>
                </View>
            }
            <Pressable
                style={{paddingVertical: 5, paddingHorizontal: 15}}
                onPress={() => {
                    setActiveAppointment(appointment)
                    navigator.navigate('Appointment');
                }}
            >
                <Text style={{fontSize: fontSize.medium}}>{appointment.title}</Text>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <Text style={{marginTop: 3}}>{makeTimeString(new Date(appointment.start_at))} - {makeTimeString(new Date(appointment.end_at))}</Text>
                    <Text
                        style={textStyles.coloredButtonSmall}
                    >
                        {appointment.status}
                    </Text>
                </View>
            </Pressable>
        </View>

    )
}
