import React, {useContext, useState} from 'react';
import {
    View,
    Text,
    Modal,
    StyleSheet,
    TouchableOpacity, Platform, Pressable,
} from 'react-native';
import {AppContext} from "../providers/AppProvider";
import {modalStyles, shortDateFormat, textStyles} from "../styles/Styles";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import appointmentService from "../../services/aryeo/AppointmentService";
import {makeDateTimeString} from "../functions/DateHandler";
import GenericDatePicker from "./GenericDatePicker";

export default function RescheduleModal({activeAppointment, modalVisible, setModalVisible}) {
    // I believe the boolean string error is in here, but I poked around and nothing seemed off
    const {setActiveAppointment, setAppointments, setStatusFilter} = useContext(AppContext);
    const [newStart, setNewStart] = useState(false);
    const [newEnd, setNewEnd] = useState(false);
    const [date, setDate] = useState(new Date());
    const [modalText, setModalText] = useState('Select Appointment Start');

    function onConfirm() {
        if (newStart) {
            if (newEnd) {
                // reschedule the appointment then fetch the fresh data for this appointment and the dashboard
                appointmentService.appointmentReschedule(activeAppointment.id, newStart, newEnd).then((response) => {
                    appointmentService.appointment(activeAppointment.id).then((result) => {
                        setActiveAppointment(result.result.data);
                        appointmentService.appointments('SCHEDULED', '', 'UPCOMING', 1).then((result) => {
                            setAppointments(result.result.data);
                            setStatusFilter('SCHEDULED');

                        })
                    })
                })
                setModalVisible(false);

            }
            setNewEnd(date.toISOString())
            setModalText('Confirm Reschedule')
        } else {
            setNewStart(date.toISOString())
            setModalText('Select Appointment End')
        }
    }

    return (
        <Modal transparent={true} visible={modalVisible}>
            <View style={modalStyles.centeredView}>
                <View style={modalStyles.largeModalView}>
                    <Text style={[textStyles.medium, { textAlign: 'center'}]}>{modalText}</Text>
                    {newStart.length > 0 && newEnd.length > 0 ?
                        <View style={{width: '100%', justifyContent: 'center', marginTop: 10}}>
                            <View
                                style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 3}}>
                                <Text style={textStyles.smallBold}>Start:  </Text>
                                <Text style={textStyles.medium}>{makeDateTimeString(new Date(newStart), shortDateFormat)}</Text>
                            </View>
                            <View
                                style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 3}}>
                                <Text style={textStyles.smallBold}>End:  </Text>
                                <Text style={textStyles.medium}>{makeDateTimeString(new Date(newEnd), shortDateFormat)}</Text>
                            </View>
                        </View>
                         :
                        <GenericDatePicker
                            newStart={newStart}
                            setDate={setDate}
                            date={date}
                        />
                    }
                    <View
                        style={{
                            marginTop: 10,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%'
                        }}>
                        <Pressable
                            onPress={() => {
                                setModalVisible(false);
                                setNewStart(false);
                                setNewEnd(false);
                                setModalText('Select Appointment Start')
                            }}
                              style={{
                                  flex: 1,
                                  alignItems: 'center',
                                  justifyContent: 'center',
                              }}
                        >
                            <Text
                                style={textStyles.textButton}>
                                Exit
                            </Text>
                        </Pressable>
                        <Pressable
                            style={{
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                            onPress={onConfirm}>
                            <Text style={textStyles.coloredButton}>Confirm</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
}
