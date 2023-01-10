import React, {useContext} from 'react';
import {
    View,
    Text,
    Modal,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import {modalStyles, textStyles} from "../styles/Styles";

export default function ModalGeneric({
                                         modalVisible,
                                         setModalVisible,
                                         confirmationAction,
                                         text,
                                     }) {
    return (
        // generic modal with confirmation action, only usage so far in this app but would be helpful as need arose
        <Modal transparent={true} visible={modalVisible}>
            <View style={modalStyles.centeredView}>
                <View style={modalStyles.modalView}>
                    <View>
                        <Text style={{fontSize: 18, textAlign: 'center', color: 'black'}}>{text}</Text>
                    </View>
                    <View
                        style={{
                            marginTop: 20,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%'
                        }}>
                        <TouchableOpacity onPress={() => setModalVisible(false)}
                            style={{
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Text
                                style={textStyles.textButton}>
                                No
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                            onPress={() => confirmationAction()}>
                            <Text style={textStyles.coloredButton}>Yes</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}
