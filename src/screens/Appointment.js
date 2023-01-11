import React, {useContext, useState} from "react";

import GenericScreen from "../components/GenericScreen";
import {Pressable, ScrollView, Text, View} from "react-native";
import {AppContext} from "../providers/AppProvider";
import Ionicons from "@expo/vector-icons/Ionicons";
import ModalGeneric from "../components/GenericModal";
import appointmentService from "../../services/aryeo/AppointmentService";
import RescheduleModal from "../components/RescheduleModal";
import {shortDateFormat, textStyles} from "../styles/Styles";
import {makeDateTimeString} from "../functions/DateHandler";

export default function Appointment({navigation}) {

    const {activeAppointment, fontSize, setActiveAppointment, setAppointments, setStatusFilter} = useContext(AppContext)

    const [cancelModalShow, setCancelModalShow] = useState(false)
    const [rescheduleModalShow, setRescheduleModalShow] = useState(false)

    function cancelEvent() {
        // cancel appointment then update active appointment and dashboard to show updated canceled appointments
        appointmentService.appointmentCancel(activeAppointment.id).then(() => {
            appointmentService.appointment(activeAppointment.id).then((result) => {
                setActiveAppointment(result.result.data);
                appointmentService.appointments('CANCELED', '', 'UPCOMING', 1).then((result) => {
                    setAppointments(result.result.data);
                    setStatusFilter('CANCELED');
                })

            })
        })
        setCancelModalShow(false)
    }

    return (
        // screen for editing appointments, if it is a cancelled appointment, cancel button is not shown
        <GenericScreen icon={'options'} title={'Appointment'} destination={'Settings'}>
            <ModalGeneric
                modalVisible={cancelModalShow}
                setModalVisible={setCancelModalShow}
                confirmationAction={() => cancelEvent()}
                text={'Are you sure you want to cancel this appointment?'}/>
            <RescheduleModal
                activeAppointment={activeAppointment}
                modalVisible={rescheduleModalShow}
                setModalVisible={setRescheduleModalShow}
            />
            <Pressable
                onPress={() => navigation.navigate('Dashboard')}
                style={{flexDirection: 'row', alignItems: 'center', marginTop: 10, marginBottom: 10}}>
                <Ionicons
                    name={'caret-back-outline'}
                    size={20}
                    color={'#2a2a2a'}
                />
                <Text style={{fontSize: fontSize.medium, textAlign: 'center'}}>Back</Text>
                <View style={{flex: 1}}/>
            </Pressable>
            <ScrollView>
                <View
                    style={{flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 3}}>
                    <Text style={[textStyles.smallBold, {flex: 1}]}>Title:</Text>
                    <Text style={[textStyles.medium, {flex: 6}]}>{activeAppointment.title}</Text>
                </View>
                <View
                    style={{flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 3}}>
                    <Text style={[textStyles.smallBold, {flex: 1}]}>Start:</Text>
                    <Text style={[textStyles.medium, {flex: 6}]}>{makeDateTimeString(new Date(activeAppointment.start_at), shortDateFormat)}</Text>
                </View>
                <View
                    style={{flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 3}}>
                    <Text style={[textStyles.smallBold, {flex: 1}]}>End:</Text>
                    <Text style={[textStyles.medium, {flex: 6}]}>{makeDateTimeString(new Date(activeAppointment.end_at), shortDateFormat)}</Text>
                </View>
                <View
                    style={{flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, marginTop: 10}}>
                    <Text style={[textStyles.smallBold, {flex: 1}]}>Status:</Text>
                    <Text style={[textStyles.medium, {flex: 6}]}>{activeAppointment.status}</Text>
                </View>
                <View
                    style={{flexDirection: 'row', paddingHorizontal: 10, marginTop: 15}}
                >
                    <Text style={[textStyles.smallBold, {flex: 1}]}>Notes:</Text>
                    <Text style={[textStyles.small, {flex: 6, paddingTop: 0}]}>{activeAppointment.description}</Text>
                </View>
                <View style={{flexDirection: 'row', marginTop: 30}}>
                    {activeAppointment.status !== 'CANCELED' &&
                        <Pressable
                            style={{flex:1, alignItems: 'center'}}
                            onPress={() => {
                                setCancelModalShow(true)
                            }}
                        >
                            <Text
                                style={textStyles.coloredButton}
                            >
                                Cancel
                            </Text>
                        </Pressable>
                    }
                    <Pressable
                        style={{flex:1, alignItems: 'center'}}
                        onPress={() => {
                            setRescheduleModalShow(true)
                        }}
                    >
                        <Text
                            style={textStyles.coloredButton}
                        >
                            Reschedule
                        </Text>
                    </Pressable>
                </View>
            </ScrollView>

        </GenericScreen>
    );
}
