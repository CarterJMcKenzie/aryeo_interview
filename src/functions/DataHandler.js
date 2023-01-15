import asyncStorage from "@react-native-async-storage/async-storage/src/AsyncStorage";

// creates keys to access name, address and appointment number
export function formatAppointments(fetchResponse) {
    return fetchResponse.result.data.map((object) => {
        let dummy = object.title.split('-', 3)
        let number = dummy[0].slice(0, -1)
        let name = dummy[1].slice(1, -1)
        let address = dummy[2].slice(1)
        return {
            ...object,
            'name': name,
            'address': address,
            'number': number,
        }
    })
}



// work in progress
const asyncStorageLocation = 'GoldSprintMedia';

export async function readAsyncstorage(dispatcher, address) {
    asyncStorage.getItem(asyncStorageLocation).then(result => {
        if (result) {
            console.log('Data was found in asyncstorage, parsing...', JSON.parse(result));
            dispatcher({type: 'set', address: address, payload: JSON.parse(result)});
        }
    });
}
