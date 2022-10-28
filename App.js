import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import AppointmentService from "./services/aryeo/AppointmentService";

export default function App() {
    useEffect(() => {
        getAppointments();
    }, []);

    async function getAppointments() {
        const result = await AppointmentService.appointments();
        console.log(result);
    }

    async function getAppointment(appointment_id) {
        const result = await AppointmentService.appointment(appointment_id);
        console.log(result);
    }

    return (
        <View style={styles.container}>
            <Text>Open up App.js to start working on your app!</Text>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
