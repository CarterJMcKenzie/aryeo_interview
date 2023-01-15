import React, {useContext} from "react";

import GenericScreen from "../components/GenericScreen";
import {AppContext} from "../providers/AppProvider";
import AppointmentList from "../components/AppointmentList";
import {Text, View} from "react-native";
import {modalStyles, textStyles} from "../styles/Styles";
import MonthlyCalendar from "../components/MonthlyCalendar";
import Ionicons from "@expo/vector-icons/Ionicons";
import {makeMonthString} from "../functions/DateHandler";


export default function Dashboard({navigation}) {
    const {appointments, loadingData, dashboardStyle, activeMonth, setActiveMonth, setSelectedDay} = useContext(AppContext);

    return (
        // contains appointment list component, would like to add monthly calendar style as alternate.  Loading screen displays when data is being fetched in AppProvider
        <GenericScreen icon={'options'} title={'Dashboard'} destination={'Settings'}>
            {loadingData ?
                <View style={modalStyles.centeredView}>
                    <Text style={textStyles.large}>Loading ...</Text>
                </View>
                :
                <View style={{flex: 1}}>
                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                        <Ionicons
                            name={'caret-back-outline'}
                            size={20}
                            style={{padding: 10}}
                            onPress={() => {
                                setActiveMonth(new Date(activeMonth.getFullYear(), activeMonth.getMonth() - 1, 1))
                                setSelectedDay(activeMonth)
                            }}
                        />
                        <Text style={[textStyles.largeBold]}>
                            {makeMonthString(activeMonth, {month: 'long'})}
                        </Text>
                        <Ionicons
                            name={'caret-forward-outline'}
                            size={20}
                            style={{padding: 10}}
                            onPress={() => {
                                setActiveMonth(new Date(activeMonth.getFullYear(), activeMonth.getMonth() + 1, 1))
                                setSelectedDay(activeMonth)
                            }}
                        />
                    </View>
                    {dashboardStyle ?
                        <AppointmentList eventList={appointments}/>
                        :
                        <MonthlyCalendar appointmentList={appointments}/>
                    }
                </View>
            }
        </GenericScreen>
    );
}
