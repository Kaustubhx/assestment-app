import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FieldValues, useForm } from 'react-hook-form'

type Props = {}

type SignUpTypes = {

}

const SignUpScreen = ({ }: Props) => {

    const { control, handleSubmit, formState: { errors } } = useForm<SignUpTypes | FieldValues>({
        defaultValues: {
            userName: "",
            userPass: "",
        }
    });

    return (
        <SafeAreaView className='flex-1 bg-white'>
            <View className='p-4'>
                <Text className='text-3xl text-red-400 font-medium'>
                    Create new account
                </Text>
            </View>
        </SafeAreaView>
    )
}

export default SignUpScreen