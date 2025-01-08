import { ToastAndroid, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { useForm, Controller, FieldValues, SubmitHandler } from "react-hook-form"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { router } from 'expo-router'
import { Text } from '@/components/ui/text'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { STORAGE_KEYS } from '@/libs/constants'

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

    const handleUserSignIn: SubmitHandler<SignInTypes | FieldValues> = async (formData) => {

        const values = await AsyncStorage.multiGet([STORAGE_KEYS.USER_EMAIL_KEY, STORAGE_KEYS.USER_PASS_KEY, STORAGE_KEYS.USER_PHONE_KEY])

        const { userEmail, userPass, userPhone } = Object.fromEntries(values);

        if ((userEmail && userPhone != formData.userCred) || (userPass != formData.userPass)) {
            setError("userCred", {
                type: "custom",
                message: "Invalid email / phonenumber or password."
            });
            setError("userPass", {
                type: "custom",
                message: "Invalid email / phonenumber or password."
            });
        };

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
                                    className='rounded-full pl-6'
                                />
                            )}
                        />
                        {errors.userCred && <Text className='text-red-500 my-1'>{errors.userCred.message?.toString()}</Text>}
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
                                    className='rounded-full pl-6'
                                />
                            )}
                        />
                        {errors.userPass && <Text className='text-red-500 my-1'>{errors.userPass.message?.toString()}</Text>}
                    </View>
                </View>

                <View className='mt-10'>
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