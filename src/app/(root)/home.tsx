import { View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { STORAGE_KEYS } from '@/libs/constants'

import * as Location from 'expo-location';
import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/text'
import { router } from 'expo-router'

type Props = {}

const HomeScreen = ({ }: Props) => {

    const [userName, setUserName] = useState<string | null>();
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [status] = Location.useForegroundPermissions();

    useEffect(() => {
        getUserName();
        getCurrentLocation();
    }, [])

    const getUserName = async () => {
        const localUserName = await AsyncStorage.getItem(STORAGE_KEYS.USER_NAME_KEY)
        setUserName(localUserName);
    };

    const getCurrentLocation = async () => {
        const location = await Location.getCurrentPositionAsync({});
        setLocation(location);
    };

    const goToUserList = () => {
        router.navigate("/usersList")
    };

    const handleUserLogout = async () => {
        await AsyncStorage.clear();
        router.replace("/sign-in");
    };

    return (
        <SafeAreaView className='bg-white flex-1'>
            <View className='p-4 items-center justify-center flex-1'>
                <Text className='text-center my-4 text-lg'>
                    Hello, {userName} we got your location as you requested :D
                </Text>

                {location?.coords && (
                    <>
                        <Text>
                            Latitude: <Text className='font-medium text-red-400'>{location?.coords.latitude}</Text>
                        </Text>
                        <Text>
                            Longitude: <Text className='font-medium text-red-400'>{location?.coords.longitude}</Text>
                        </Text>
                    </>
                )}

                {!status?.granted && (
                    <Text className='text-red-400 font-medium'>
                        Sorry. It seems that you didn't give us the required permission for location
                    </Text>
                )}


                <Button
                    className='my-8'
                    onPress={() => goToUserList()}
                >
                    <Text>
                        Explore more users
                    </Text>
                </Button>


                <Button onPress={() => handleUserLogout()}>
                    <Text>Logout</Text>
                </Button>
            </View>
        </SafeAreaView>
    )
}

export default HomeScreen