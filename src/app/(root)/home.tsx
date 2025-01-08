import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { STORAGE_KEYS } from '@/libs/constants'

type Props = {}

const HomeScreen = ({ }: Props) => {

    const [userName, setUserName] = useState<string | null>();

    useEffect(() => {
        getUserName();
    }, [])

    const getUserName = async () => {
        const localUserName = await AsyncStorage.getItem(STORAGE_KEYS.USER_NAME_KEY)
        setUserName(localUserName);
    };

    return (
        <SafeAreaView className='bg-white flex-1'>
            <View className='p-4 items-center justify-center flex-1'>
                <Text className='text-center my-4'>
                    Hello, {userName} we got your location as you requested :D
                </Text>

                <Text>
                    Latitude: <Text></Text>
                </Text>
                <Text>
                    Longitude: <Text></Text>
                </Text>
            </View>
        </SafeAreaView>
    )
}

export default HomeScreen