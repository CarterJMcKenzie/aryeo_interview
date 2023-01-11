import React, {useContext} from "react";
import {Platform, Switch} from "react-native";

// icons
import {AppContext} from '../providers/AppProvider';

export default function GenericSwitch({value, onValueChange}) {

    const {appColor} = useContext(AppContext);

    return (
        // default screen building blocks
        <Switch
            trackColor={{ false: "#767577", true: appColor }}
            value={value}
            onValueChange={onValueChange}
            style={
                Platform.OS === 'android'
                    ? {transform: [{scaleX: 1.25}, {scaleY: 1.25}]}
                    : false
            }
            thumbColor={Platform.OS === 'android' ? '#c7c7c7' : false}
        />
    );
}
