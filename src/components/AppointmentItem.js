// appointment component for the list view on the dashboard

import React, {useContext} from 'react';
import {Pressable, Text, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {AppContext} from "../providers/AppProvider";
import {textStyles, viewStyles} from "../styles/Styles";

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
                            <Text style={textStyles.mediumBold}>{new Date(appointment.start_at).toLocaleDateString(undefined,{weekday: "short", day: 'numeric', month: 'short'})}</Text>
                        </View>
                    }
                </View>
                :
                <View>
                    <Text style={textStyles.mediumBold}>{new Date(appointment.start_at).toLocaleDateString(undefined,{weekday: "short", day: 'numeric', month: 'short'})}</Text>
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
                    <Text style={{marginTop: 3}}>{new Date(appointment.start_at).toLocaleTimeString(undefined, {hour12: true, hour: 'numeric', minute: '2-digit'})} - {new Date(appointment.end_at).toLocaleTimeString(undefined, {hour12: true, hour: 'numeric', minute: '2-digit'})}</Text>
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
