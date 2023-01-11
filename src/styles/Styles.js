import {StyleSheet} from 'react-native';

export const fontSize1 = {
    small: 12,
    medium: 16,
    large: 20,
    xlarge: 24,
    xxlarge: 38,
};

export const shortDateFormat = {weekday: "short", day: 'numeric', month: 'short'}

export const screenStyles = StyleSheet.create({
    safeView: {
        flex: 1,
        backgroundColor: '#ebebeb',
        justifyContent: 'flex-end',
        flexDirection: 'column',
        margin: 0,
    },
    headerView: {
        backgroundColor: '#ebebeb',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        margin: 0,
        padding: 10,
    },
    rowView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    rowViewSpaced: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    mainView: {
        backgroundColor: 'white',
        flex: 1,
    },
});

export const viewStyles = StyleSheet.create({
    standardMargin: {
        margin: 10
    },
    standardTab: {
        marginHorizontal: 10
    },
    doubleTab: {
        marginHorizontal: 20
    },
    sectionHeader: {borderTopWidth: 1, paddingTop: 2, borderColor: '#2a2a2a', marginTop: 10},
})

export const textStyles = StyleSheet.create({
    smallBold: {
        fontSize: fontSize1.small,
        fontWeight: 'bold',
        color: 'black',
    },
    small: {
        fontSize: fontSize1.small,
        color: 'black',
    },
    mediumBold: {
        fontSize: fontSize1.medium,
        fontWeight: 'bold',
        color: 'black',
    },
    medium: {
        fontSize: fontSize1.medium,
        color: 'black',
    },
    largeBold: {
        fontSize: fontSize1.large,
        fontWeight: 'bold',
        color: 'black',
    },
    large: {
        fontSize: fontSize1.large,
        color: 'black',
    },
    xlargeBold: {
        fontSize: fontSize1.xlarge,
        fontWeight: 'bold',
        color: 'black',
    },
    coloredButton: {
        fontSize: fontSize1.medium,
        backgroundColor: '#f9d949',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 15,
        overflow: 'hidden'
    },
    coloredButtonSmall: {fontSize: fontSize1.small, backgroundColor: '#f9d949', paddingHorizontal: 7, paddingVertical: 2, borderRadius: 10, overflow: 'hidden'},
    textButton: {
        fontSize: fontSize1.medium,
        color: '#2a2a2a',
        textDecorationLine: "underline",
        fontWeight: 'bold',
        textDecorationColor: '#2a2a2a',
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    sectionHeaderBold: {fontSize: fontSize1.medium, fontWeight: 'bold', borderColor: '#2a2a2a', color: 'black'},
});

export const settingsStyles = StyleSheet.create({
    rowViewSpaced: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 5,
    },
})

export const modalStyles = StyleSheet.create({
    modalView: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '70%',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    largeModalView: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '90%',
    },
});
