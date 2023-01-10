import React, {useContext, useState} from 'react';
import {
    View,
    Text,
    Modal,
    StyleSheet,
    TouchableOpacity, Platform, Pressable,
} from 'react-native';
import {AppContext} from "../providers/AppProvider";
import {modalStyles, textStyles} from "../styles/Styles";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import appointmentService from "../../services/aryeo/AppointmentService";

export default function RescheduleModal({activeAppointment, modalVisible, setModalVisible}) {
    // I believe the boolean string error is in here, but I poked around and nothing seemed off
    const {setActiveAppointment, setAppointments, setStatusFilter} = useContext(AppContext);
    const [newStart, setNewStart] = useState('');
    const [newEnd, setNewEnd] = useState('');
    const [date, setDate] = useState(new Date());
    const [modalText, setModalText] = useState('Select Appointment Start');

    function onConfirm() {
        if (newStart.length > 0) {
            if (newEnd.length > 0) {
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
                                <Text style={textStyles.medium}>{new Date(newStart).toLocaleDateString(undefined,{weekday: "short", day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit'})}</Text>
                            </View>
                            <View
                                style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 3}}>
                                <Text style={textStyles.smallBold}>End:  </Text>
                                <Text style={textStyles.medium}>{new Date(newEnd).toLocaleDateString(undefined,{weekday: "short", day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit'})}</Text>
                            </View>
                        </View>
                         :
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
