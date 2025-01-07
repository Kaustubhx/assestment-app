import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { useForm, Controller, FieldValues } from "react-hook-form"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { router } from 'expo-router'

type Props = {}

type SignInTypes = {
    userCred: string;
    userPass: string;
}

const SignInScreen = ({ }: Props) => {

    const { control, handleSubmit, formState: { errors } } = useForm<SignInTypes | FieldValues>({
        defaultValues: {
            userCred: "",
            userPass: "",
        }
    });

    const goToSignUpScreen = () => {
        router.navigate("/sign-up")
    }

    return (
        <SafeAreaView className='flex-1 bg-white'>
            <View className='p-4'>
                <Text className='text-3xl text-red-400 font-medium'>
                    Sign In
                </Text>

                <View className='mt-10 gap-8'>
                    <Controller
                        name='userCred'
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({ field: { value, onChange, onBlur } }) => (
                            <Input
                                placeholder='E-mail or phone number'
                                placeholderTextColor={"#EAEAEA"}
                                value={value}
                                onChangeText={onChange}
                                className='rounded-full pl-6'
                            />
                        )}
                    />

                    <Controller
                        name='userPass'
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({ field: { value, onChange, onBlur } }) => (
                            <Input
                                placeholder='Password'
                                placeholderTextColor={"#EAEAEA"}
                                value={value}
                                onChangeText={onChange}
                                className='rounded-full pl-6'
                            />
                        )}
                    />

                </View>

                <View className='mt-10'>
                    <Button className='bg-red-400 rounded-full'>
                        <Text className='text-white'>
                            Login
                        </Text>
                    </Button>
                    <View className='flex-row items-center'>
                        <Text adjustsFontSizeToFit>Don&apos;t have an account?{" "}</Text>
                        <Button
                            className='p-0'
                            variant={"ghost"}
                            size={"sm"}
                            onPress={() => goToSignUpScreen()}
                        >
                            <Text className='text-red-400 font-medium'>
                                Sign Up
                            </Text>
                        </Button>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default SignInScreen