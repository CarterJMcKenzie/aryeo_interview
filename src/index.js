import React from 'react';
import {AppProvider} from './providers/AppProvider';
import AppStack from "./navigators/AppStack";

const index = () => {
    return (
        <AppProvider>
            <AppStack />
        </AppProvider>
    );
};

export default index;
