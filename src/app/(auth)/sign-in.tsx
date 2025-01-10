import { ToastAndroid, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useForm, Controller, FieldValues, SubmitHandler } from "react-hook-form"
import { router } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { Text } from '@/components/ui/text'
import { STORAGE_KEYS } from '@/libs/constants'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import * as Location from 'expo-location';

type Props = {}

type SignInTypes = {
    userCred: string;
    userPass: string;
}

const SignInScreen = ({ }: Props) => {

    const { control, handleSubmit, setError, formState: { errors } } = useForm<SignInTypes | FieldValues>({
        defaultValues: {
            userCred: "",
            userPass: "",
        }
    });

    const goToSignUpScreen = () => {
        router.navigate("/sign-up")
    };

    const requestUserLocation = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync()
    }

    const handleUserSignIn: SubmitHandler<SignInTypes | FieldValues> = async (formData) => {

        const values = await AsyncStorage.multiGet([STORAGE_KEYS.USER_EMAIL_KEY, STORAGE_KEYS.USER_PASS_KEY, STORAGE_KEYS.USER_PHONE_KEY])

        const { userEmail, userPass, userPhone } = Object.fromEntries(values);

        const isCredValid =
            (formData.userCred === userEmail || formData.userCred === userPhone) &&
            formData.userPass === userPass;

        if (!isCredValid) {
            setError("userCred", {
                type: "custom",
                message: "Invalid email / phonenumber or password."
            });
            setError("userPass", {
                type: "custom",
                message: "Invalid email / phonenumber or password."
            });
            return;
        };

        requestUserLocation();
        router.replace("/home");
    };

    return (
        <SafeAreaView className='flex-1 bg-white'>
            <View className='p-4'>
                <Text className='text-3xl text-red-400 font-medium'>
                    Sign In
                </Text>

                <View className='mt-10 gap-8'>
                    <View>
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
                                    className='rounded-full pl-6 bg-white text-black'
                                />
                            )}
                        />
                        {errors.userCred?.type === "required" ? (
                            <Text className='text-red-500 my-1'>Please enter your credentials</Text>
                        ) : (
                            <Text className='text-red-500 mt-1'>{errors.userCred?.message?.toString()}</Text>
                        )}
                    </View>

                    <View>
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
                                    className='rounded-full pl-6 bg-white text-black'
                                />
                            )}
                        />
                        {errors.userPass?.type === "required" && <Text className='text-red-500 my-1'>Please enter your password</Text>}
                        {errors.userPass && <Text className='text-red-500 mt-1'>{errors.userPass.message?.toString()}</Text>}
                    </View>
                </View>

                <View className='mt-5'>
                    <Button
                        className='bg-red-400 rounded-full'
                        size={"lg"}
                        onPress={handleSubmit(handleUserSignIn)}
                    >
                        <Text className='text-white'>
                            Login
                        </Text>
                    </Button>

                    <View className='flex-row items-center'>
                        <Text adjustsFontSizeToFit className='text-black'>Don&apos;t have an account?{" "}</Text>
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