import React, {Fragment, useContext} from "react";
import {Text, View, SafeAreaView, StatusBar, Image} from "react-native";

import {useNavigation} from '@react-navigation/native';

// icons
import Ionicons from '@expo/vector-icons/Ionicons';
import {screenStyles, textStyles} from '../styles/Styles';
import {AppContext} from '../providers/AppProvider';

export default function GenericScreen({title, icon, destination, children}) {
    const navigation = useNavigation();

    const {appColor, fontSize} = useContext(AppContext);

    return (
        // default screen building blocks
        <Fragment>
            <SafeAreaView style={{flex: 0, backgroundColor: '#ebebeb' }}/>
            <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
                <StatusBar
                    animated={true}
                    backgroundColor='#ebebeb'
                    barStyle={'dark-content'}
                    showHideTransition={'none'}
                    hidden={false}
                />
                <View style={screenStyles.headerView}>
                    <View style={{flex: 1}}>
                        <Ionicons
                            name={icon}
                            size={30}
                            color={'#2a2a2a'}
                            onPress={() => navigation.navigate(destination)}
                        />
                    </View>
                    <View style={{flex: 2, alignItems:'center'}}>
                        <Text style={textStyles.xlargeBold}>{title}</Text>
                    </View>
                    <View style={{flex: 1, alignItems: 'center'}}>
                        <Image
                            source={require('../assets/logoDetailed.png')}
                            style={{height: 30, resizeMode: 'contain'}}
                        />
                    </View>
                </View>
                <View style={screenStyles.mainView}>{children}</View>
            </SafeAreaView>
        </Fragment>

    );
}
