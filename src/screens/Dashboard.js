import React, {useContext} from "react";

import GenericScreen from "../components/GenericScreen";
import {AppContext} from "../providers/AppProvider";
import AppointmentList from "../components/AppointmentList";
import {Text, View} from "react-native";
import {modalStyles, textStyles} from "../styles/Styles";


export default function Dashboard({navigation}) {
    const {appointments, loadingData, fontSize} = useContext(AppContext);

    return (
        // contains appointment list component, would like to add monthly calendar style as alternate.  Loading screen displays when data is being fetched in AppProvider
        <GenericScreen icon={'options'} title={'Dashboard'} destination={'Settings'}>
            {loadingData ?
                <View style={modalStyles.centeredView}>
                    <Text style={textStyles.large}>Loading ...</Text>
                </View>
                :
                <AppointmentList eventList={appointments}/>

            }
        </GenericScreen>
    );
}
