import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import Header from '@/components/Header'

type Props = {}

const RootLayout = ({ }: Props) => {
    return (
        <Stack>
            <Stack.Screen
                name='sign-in'
                options={{
                    headerTitle: () => (
                        <Header title='Welcome User 😃' />
                    )
                }}
            />

            <Stack.Screen
                name='sign-up'
                options={{
                    headerTitle: () => (
                        <Header title='Welcome User 😃' />
                    )
                }}
            />
        </Stack>
    )
}

export default RootLayout