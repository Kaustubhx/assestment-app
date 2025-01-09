import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import Header from '@/components/Header'

type Props = {}

const AuthLayout = ({ }: Props) => {
    return (
        <Stack>
            <Stack.Screen
                name='home'
                options={{
                    headerBackVisible: false,
                    headerTitle: () => (
                        <Header />
                    )
                }}
            />

            <Stack.Screen
                name='usersList'
                options={{
                    headerTitle: () => (
                        <Header title='Explore Users' />
                    )
                }}
            />
        </Stack>
    )
}

export default AuthLayout