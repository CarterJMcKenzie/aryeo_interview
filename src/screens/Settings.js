import React, {useContext, useEffect, useState} from "react";

import GenericScreen from "../components/GenericScreen";
import {
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View
} from "react-native";
import {settingsStyles, textStyles, viewStyles} from "../styles/Styles";
import {AppContext} from "../providers/AppProvider";
import GenericSwitch from "../components/GenericSwitch";
import ExpoCheckbox from "expo-checkbox";

export default function Settings({navigation}) {
    // really should be called filters since I didn't have time to implement fontsize and theme settings, can only filter by one status at a time would like to change this if I had more time
    const {
        appColor,
        fontSize,
        statusFilter,
        setStatusFilter,
        historyFilter,
        setHistoryFilter,
        setSearchFilter,
        setDashboardStyle,
        dashboardStyle,
    } = useContext(AppContext);

    const [searchBar, setSearchBar] = useState('')

    function statusUpdate(status, value) {
        if (value) {
            return statusFilter.concat([status])
        } else {
            console.log('statusFilter', statusFilter)
            console.log('index', statusFilter.indexOf(status))
            let index = statusFilter.indexOf(status)
            return statusFilter.slice(0, index).concat(statusFilter.slice(index + 1))
        }
    }

    return (
        <GenericScreen icon={'caret-back-outline'} destination={'Dashboard'} title={'Settings'}>
            <ScrollView style={viewStyles.standardMargin}>
                <Text
                    style={textStyles.mediumBold}>
                    Find Appointments By Title
                </Text>
                <View style={viewStyles.doubleTab}>
                    <View style={settingsStyles.rowViewSpaced}>
                        <TextInput
                            style={{
                                fontSize: fontSize.medium,
                                color: '#717171',
                                includeFontPadding: false,
                                width: '60%',
                                borderBottomWidth: 1,
                                borderColor: '#717171'
                            }}
                            defaultValue={searchBar}
                            placeholder={'Enter Title'}
                            placeholderTextColor={'#717171'}
                            multiline={true}
                            onChangeText={newValue => {
                                setSearchBar(newValue)
                            }}
                        />
                        <Pressable
                            onPress={() => {
                                setSearchFilter(searchBar)
                                navigation.navigate('Dashboard')
                            }}
                        >
                            <Text style={textStyles.coloredButton}>
                                Search
                            </Text>
                        </Pressable>
                    </View>
                </View>
                <View style={viewStyles.sectionHeader}/>
                <Text
                    style={textStyles.mediumBold}>
                    Set Dashboard Style
                </Text>
                <View style={viewStyles.doubleTab}>
                    <View style={settingsStyles.rowViewSpaced}>
                        <Text
                            style={textStyles.medium}>
                            Calendar
                        </Text>
                        <ExpoCheckbox
                            key={'box1'}
                            value={!dashboardStyle}
                            color={appColor}
                            style={{marginRight: '10%'}}
                            onValueChange={(value) => setDashboardStyle(false)}
                        />
                        <Text
                            style={textStyles.medium}>
                            List
                        </Text>
                        <ExpoCheckbox
                            key={'box2'}
                            style={{marginRight: '10%'}}
                            color={appColor}
                            value={dashboardStyle}
                            onValueChange={(value) => setDashboardStyle(true)}
                        />
                    </View>
                </View>
                <View style={viewStyles.sectionHeader}/>
                <Text
                    style={textStyles.mediumBold}>
                    Filter Appointments by Status
                </Text>
                <View
                    style={viewStyles.doubleTab}
                >
                    <View style={settingsStyles.rowViewSpaced}>
                        <Text style={textStyles.medium}>Scheduled</Text>
                        <GenericSwitch
                            value={statusFilter.includes('Scheduled')}
                            onValueChange={(value) => {
                                setStatusFilter(statusUpdate('Scheduled', value))}}
                        />
                    </View>
                    <View style={settingsStyles.rowViewSpaced}>
                        <Text style={textStyles.medium}>Unscheduled</Text>
                        <GenericSwitch
                            value={statusFilter.includes('Unscheduled')}
                            onValueChange={(value) => {
                                setStatusFilter(statusUpdate('Unscheduled', value))}}
                        />
                    </View>
                    <View style={settingsStyles.rowViewSpaced}>
                        <Text style={textStyles.medium}>Canceled</Text>
                        <GenericSwitch
                            value={statusFilter.includes('Canceled')}
                            onValueChange={(value) => {
                                setStatusFilter(statusUpdate('Canceled', value))}}
                        />
                    </View>
                    <View style={settingsStyles.rowViewSpaced}>
                        <Text style={textStyles.medium}>Drafts</Text>
                        <GenericSwitch
                            value={statusFilter.includes('Draft')}
                            onValueChange={(value) => {
                                setStatusFilter(statusUpdate('Draft', value))
                                console.log(statusFilter)
                            }}
                        />
                    </View>
                </View>
                <View style={viewStyles.sectionHeader}/>
                <Text style={textStyles.mediumBold}>
                        Filter Appointments by History
                    </Text>
                    <View style={viewStyles.doubleTab}>
                        <View style={settingsStyles.rowViewSpaced}>
                            <Text style={textStyles.medium}>Upcoming</Text>
                            <GenericSwitch
                                value={historyFilter === 'UPCOMING'}
                                onValueChange={() => setHistoryFilter('UPCOMING')}
                            />
                        </View>
                        <View style={settingsStyles.rowViewSpaced}>
                            <Text style={textStyles.medium}>Past</Text>
                            <GenericSwitch
                                onValueChange={() => setHistoryFilter('PAST')}
                                value={historyFilter === 'PAST'}
                            />
                        </View>
                    </View>
            </ScrollView>
        </GenericScreen>
    );
}
