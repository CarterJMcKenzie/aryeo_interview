import React from 'react';
import {AppProvider} from './providers/AppProvider';
import AppStack from "./navigators/AppStack";
import GenericScreen from "./components/GenericScreen";

const index = () => {
    return (
        <AppProvider>
            <AppStack />
        </AppProvider>
    );
};

export default index;
