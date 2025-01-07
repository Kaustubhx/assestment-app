import { View, Text } from 'react-native'
import React from 'react'

type Props = {
    headerBackVisible?: boolean,
    title?: string;
}

const Header = ({ headerBackVisible, title }: Props) => {
    return (
        <View>
            <View>
                <Text className='text-2xl font-medium'>
                    {title || "Welcome User 😃"}
                </Text>
            </View>
        </View>
    )
}

export default Header