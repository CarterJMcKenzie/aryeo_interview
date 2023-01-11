import React, {useContext, useState} from "react";

import GenericScreen from "../components/GenericScreen";
import {
    Platform,
    Pressable,
    ScrollView,
    Switch,
    Text,
    TextInput,
    View
} from "react-native";
import {settingsStyles, textStyles, viewStyles} from "../styles/Styles";
import {AppContext} from "../providers/AppProvider";
import GenericSwitch from "../components/GenericSwitch";


export default function Settings({navigation}) {
    // really should be called filters since I didn't have time to implement fontsize and theme settings, can only filter by one status at a time would like to change this if I had more time
    const {
        appColor,
        fontSize,
        statusFilter,
        setStatusFilter,
        historyFilter,
        setHistoryFilter,
        setSearchFilter
    } = useContext(AppContext);

    const [searchBar, setSearchBar] = useState('')

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
                                width: '60%'
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
                    Filter Appointments by Status
                </Text>
                <View
                    style={viewStyles.doubleTab}
                >
                    <View style={settingsStyles.rowViewSpaced}>
                        <Text style={textStyles.medium}>Scheduled</Text>
                        <GenericSwitch
                            value={statusFilter === 'SCHEDULED'}
                            onValueChange={() => setStatusFilter('SCHEDULED')}
                        />
                    </View>
                    <View style={settingsStyles.rowViewSpaced}>
                        <Text style={textStyles.medium}>Unscheduled</Text>
                        <GenericSwitch
                            onValueChange={() => setStatusFilter('UNSCHEDULED')}
                            value={statusFilter === 'UNSCHEDULED'}
                        />
                    </View>
                    <View style={settingsStyles.rowViewSpaced}>
                        <Text style={textStyles.medium}>Canceled</Text>
                        <GenericSwitch
                            onValueChange={() => setStatusFilter('CANCELED')}
                            value={statusFilter === 'CANCELED'}
                        />
                    </View>
                    <View style={settingsStyles.rowViewSpaced}>
                        <Text style={textStyles.medium}>Drafts</Text>
                        <GenericSwitch
                            onValueChange={() => setStatusFilter('DRAFT')}
                            value={statusFilter === 'DRAFT'}
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
