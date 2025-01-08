import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '@/libs/constants';

type Props = {
    headerBackVisible?: boolean,
    title?: string;
}

const Header = ({ headerBackVisible, title }: Props) => {

    const [userName, setUserName] = useState<string | null>();

    useEffect(() => {
        getUserName();
    }, [])

    const getUserName = async () => {
        const localUserName = await AsyncStorage.getItem(STORAGE_KEYS.USER_NAME_KEY)
        setUserName(localUserName);
    };

    return (
        <View>
            <View>
                <Text className='text-2xl font-medium'>
                    {title || `Welcome ${userName || "User"} 😃`}
                </Text>
            </View>
        </View>
    )
}

export default Header