import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '@/libs/constants';
import { Button } from './ui/button';
import { Redirect, router } from 'expo-router';
import { useRoute } from '@react-navigation/native';

type Props = {
    headerBackVisible?: boolean,
    title?: string;
}

const Header = ({ headerBackVisible, title }: Props) => {

    const [userName, setUserName] = useState<string | null>();

    const route = useRoute();

    useEffect(() => {
        getUserName();
    }, [])

    const getUserName = async () => {
        const localUserName = await AsyncStorage.getItem(STORAGE_KEYS.USER_NAME_KEY)
        setUserName(localUserName);
    };

    return (
        <View className='flex-row items-center justify-between w-[98%]'>
            <Text className='text-2xl font-medium'>
                {title || `Welcome ${userName || "User"} 😃`}
            </Text>
        </View>
    )
}

export default Header