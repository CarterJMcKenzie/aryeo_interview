import React, {useState} from "react";
import {Platform, Text, View} from "react-native";

// icons
import RNDateTimePicker from "@react-native-community/datetimepicker";
import {makeDateString, makeTimeStringSeperated} from "../functions/DateHandler";
import {shortDateFormat, textStyles} from "../styles/Styles";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function GenericDatePicker({newStart, setDate, date}) {
    // the android time picker that works with expo doesn't allow any customization so threw together a temporary one
    // if this wasn't expo I would use react-native-date-picker

    // round recent date to nearest 30 minutes
    const [activeDate, setActiveDate] = useState(Math.round(date.getTime() / 1800000) * 1800000)

    // for android
    function changeDate(interval) {
        // if a start has already been set end date can only be toggled greater than it
        let newTime = activeDate + interval
        if (newStart) {
            if (activeDate - 30 * 60 * 1000 > new Date(newStart).getTime()) {
                setActiveDate(newTime);
                setDate(new Date(newTime));
            } else {
                if (interval > 0) {
                    setActiveDate(newTime);
                    setDate(new Date(newTime));
                }
            }
        } else {
            setActiveDate(newTime);
            setDate(new Date(newTime));
        }

    }

    if (Platform.OS === 'ios') {
        return (
            <RNDateTimePicker
                mode={'datetime'}
                minimumDate={newStart ? newStart : false}
                display={'spinner'}
                minuteInterval={5}
                onChange={(result, selectedDate) => {
                    setDate(selectedDate)
                }}
                value={date}
                style={{width: '100%', height: 150}}
            />
        )
    } else {
        return (
            <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '80%'}}>
                <View style={{alignItems: 'center'}}>
                    <Ionicons
                        name={'caret-up'}
                        size={15}
                        style={{padding: 15}}
                        onPress={() => changeDate(- 24 * 60 * 60 * 1000)}
                    />
                    <Text style={textStyles.large}>
                        {makeDateString(new Date(activeDate), shortDateFormat)}
                    </Text>
                    <Ionicons
                        name={'caret-down'}
                        size={15}
                        style={{padding: 15}}
                        onPress={() => changeDate( 24 * 60 * 60 * 1000)}

                    />
                </View>
                <View style={{alignItems: 'center'}}>
                    <Ionicons
                        name={'caret-up'}
                        size={15}
                        style={{padding: 15}}
                        onPress={() => changeDate( -60 * 60 * 1000)}

                    />
                    <Text style={textStyles.large}>
                        {makeTimeStringSeperated(new Date(activeDate)).hours}
                    </Text>
                    <Ionicons
                        name={'caret-down'}
                        size={15}
                        style={{padding: 15}}
                        onPress={() => changeDate(60 * 60 * 1000)}
                    />
                </View>
                <View style={{alignItems: 'center'}}>
                    <Ionicons
                        name={'caret-up'}
                        size={15}
                        style={{padding: 15}}
                        onPress={() => changeDate(- 30 * 60 * 1000)}

                    />
                    <Text style={textStyles.large}>
                        {makeTimeStringSeperated(new Date(activeDate)).minutes }
                    </Text>
                    <Ionicons
                        name={'caret-down'}
                        size={15}
                        style={{padding: 15}}
                        onPress={() => changeDate(30 * 60 * 1000)}

                    />
                </View>
                <View style={{alignItems: 'center'}}>
                    <Ionicons
                        name={'caret-up'}
                        size={15}
                        style={{padding: 15}}
                        onPress={() => changeDate(-12 * 60 * 60 * 1000)}
                    />
                    <Text style={textStyles.large}>
                        {makeTimeStringSeperated(new Date(activeDate)).ampm }
                    </Text>
                    <Ionicons
                        name={'caret-down'}
                        size={15}
                        style={{padding: 15}}
                        onPress={() => changeDate(12 * 60 * 60 * 1000)}

                    />
                </View>

            </View>


        )
    }
}
