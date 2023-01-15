import React, {useContext} from "react";
import {Text, ScrollView, Pressable, View} from "react-native";
import {AppContext} from "../providers/AppProvider";
import AppointmentItem from "./AppointmentItem";

export default function AppointmentList({eventList}) {
    const {fontSize} = useContext(AppContext)
    return (
        // view 25 appointment items on page and toggle between pages.  displays note if no events in list
        <View>
            {eventList.length > 0 ?
                <View>
                    <ScrollView style={{marginBottom: 50}}>
                        {eventList.map((item, index) => (
                                    <AppointmentItem
                                        key={'event' + index}
                                        index={index}
                                        appointment={item}
                                        previous={eventList[index -1]}
                                    />
                        ))}
                    </ScrollView>
                </View>
                :
                <View>
                    <Text style={{textAlign: 'center', marginTop: 100, fontSize: fontSize.medium, marginHorizontal: 20}}>
                        No events found, try visiting Settings to adjust your filters
                    </Text>
                </View>
            }
        </View>


    )
}
