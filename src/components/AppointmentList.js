import React, {useContext} from "react";
import {Text, ScrollView, Pressable, View} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import {AppContext} from "../providers/AppProvider";
import AppointmentItem from "./AppointmentItem";
import {textStyles} from "../styles/Styles";


export default function AppointmentList({eventList}) {
    const {pageFilter, setPageFilter, fontSize} = useContext(AppContext)
    return (
        // view 25 appointment items on on page and toggle between pages.  displays note if no events in list
        <View>
            {eventList.length > 0 ?
                <View>
                    <View style={{flexDirection: 'row'}}>
                        {pageFilter !== 1 ?
                            <Pressable
                                onPress={() => setPageFilter(pageFilter - 1)}
                                style={{flexDirection: 'row', alignItems: 'center', flex: 1, padding: 5}}>
                                <Ionicons
                                    name={'caret-back-outline'}
                                    size={15}
                                    color={'#2a2a2a'}
                                />
                                <Text style={textStyles.smallBold}>
                                    Prev
                                </Text>
                            </Pressable>
                            :
                            <View style={{flex: 1}}/>
                        }
                        <Text style={[textStyles.smallBold, {padding: 5, flex: 1, textAlign: 'center'}]}>
                            Page {pageFilter}
                        </Text>
                        {eventList.length === 25 ?
                            <Pressable
                                onPress={() => setPageFilter(pageFilter + 1)}
                                style={{flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', flex: 1, padding: 5}}>
                                <Text style={textStyles.smallBold}>
                                    Next
                                </Text>
                                <Ionicons
                                    name={'caret-forward-outline'}
                                    size={15}
                                    color={'#2a2a2a'}
                                />
                            </Pressable>
                            :
                            <View style={{flex: 1}}/>
                        }
                    </View>
                    <ScrollView>
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
                        No events found, visit Settings and adjust your filters
                    </Text>
                </View>
            }
        </View>


    )
}
