import React from 'react';

// screens
import Dashboard from '../screens/Dashboard';
import Settings from '../screens/Settings';
import Appointment from '../screens/Appointment';

import {AppProvider} from '../providers/AppProvider';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function AppStack() {
    // self explanatory
    return (
        <AppProvider>
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName="Dashboard"
                    screenOptions={{headerShown: false}}>
                    <Stack.Screen component={Dashboard} name="Dashboard" />
                    <Stack.Screen component={Settings} name="Settings" />
                    <Stack.Screen component={Appointment} name="Appointment" />
                </Stack.Navigator>
            </NavigationContainer>
        </AppProvider>
    );
}
