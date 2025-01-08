import { KeyboardAvoidingView, Platform, ToastAndroid, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form'

import AsyncStorage from '@react-native-async-storage/async-storage';

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/text'
import { Textarea } from '@/components/ui/textarea'
import { STORAGE_KEYS } from '@/libs/constants'

type Props = {}

type SignUpTypes = {
    userName: string;
    userPhone: string;
    userEmail: string;
    userPass: string;
    userAddress: string;
}

const SignUpScreen = ({ }: Props) => {

    const { control, handleSubmit, formState: { errors } } = useForm<SignUpTypes | FieldValues>({
        defaultValues: {
            userName: "",
            userPhone: "",
            userEmail: "",
            userPass: "",
            userAddress: "",
        }
    });

    const handleUserSignUp: SubmitHandler<SignUpTypes | FieldValues> = async (formData) => {
        const userNamePair: [string, string] = [STORAGE_KEYS.USER_NAME_KEY, formData.userName];
        const userPhonePair: [string, string] = [STORAGE_KEYS.USER_PHONE_KEY, formData.userPhone];
        const userEmailPair: [string, string] = [STORAGE_KEYS.USER_EMAIL_KEY, formData.userEmail];
        const userPassPair: [string, string] = [STORAGE_KEYS.USER_PASS_KEY, formData.userPass];
        const userAddressPair: [string, string] = [STORAGE_KEYS.USER_ADDRESS_KEY, formData.userAddress];

        await AsyncStorage.multiSet([userNamePair, userPhonePair, userEmailPair, userPassPair, userAddressPair])
            .then((res) => {
                ToastAndroid.show("Registration successful", ToastAndroid.SHORT);
            })
            .catch((err) => {
                ToastAndroid.show("Something went wrong while registration " + err, ToastAndroid.LONG);
            });
    };

    return (
        <SafeAreaView className='flex-1 bg-white'>
            <View className='p-4'>
                <Text className='text-3xl text-red-400 font-medium'>
                    Create new account
                </Text>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                >
                    <View className='my-8 gap-6'>
                        <View>
                            <Controller
                                name='userName'
                                control={control}
                                rules={{
                                    required: true
                                }}
                                render={({ field: { onBlur, onChange, value } }) => (
                                    <Input
                                        placeholder='Full Name'
                                        placeholderTextColor={"#EAEAEA"}
                                        value={value}
                                        onChangeText={onChange}
                                        className='rounded-full pl-6'
                                    />
                                )}
                            />
                            {errors.userName?.type == "required" && <Text className='text-red-500 text-sm my-1'>Please enter your full name</Text>}
                        </View>

                        <View>
                            <Controller
                                name='userPhone'
                                control={control}
                                rules={{
                                    required: true
                                }}
                                render={({ field: { onBlur, onChange, value } }) => (
                                    <Input
                                        keyboardType='number-pad'
                                        placeholder='Phone Number'
                                        placeholderTextColor={"#EAEAEA"}
                                        value={value}
                                        onChangeText={onChange}
                                        className='rounded-full pl-6'
                                    />
                                )}
                            />
                            {errors.userPhone?.type == "required" && <Text className='text-red-500 text-sm my-1'>Please enter your full name</Text>}
                        </View>

                        <View>
                            <Controller
                                name='userEmail'
                                control={control}
                                rules={{
                                    required: true
                                }}
                                render={({ field: { onBlur, onChange, value } }) => (
                                    <Input
                                        placeholder='E-mail Address'
                                        placeholderTextColor={"#EAEAEA"}
                                        value={value}
                                        onChangeText={onChange}
                                        className='rounded-full pl-6'
                                    />
                                )}
                            />
                            {errors.userEmail?.type == "required" && <Text className='text-red-500 text-sm my-1'>Please enter your full name</Text>}
                        </View>

                        <View>
                            <Controller
                                name='userPass'
                                control={control}
                                rules={{
                                    required: true
                                }}
                                render={({ field: { onBlur, onChange, value } }) => (
                                    <Input
                                        placeholder='Password'
                                        placeholderTextColor={"#EAEAEA"}
                                        value={value}
                                        onChangeText={onChange}
                                        className='rounded-full pl-6'
                                    />
                                )}
                            />
                            {errors.userPass?.type == "required" && <Text className='text-red-500 text-sm my-1'>Please enter your full name</Text>}
                        </View>

                        <View>
                            <Controller
                                name='userAddress'
                                control={control}
                                render={({ field: { onBlur, onChange, value } }) => (
                                    <Textarea
                                        placeholder='Enter you full address'
                                        placeholderTextColor={"#EAEAEA"}
                                        value={value}
                                        onChangeText={onChange}
                                        className='rounded-lg pl-6'
                                    />
                                )}
                            />
                        </View>
                    </View>

                    <Button
                        className='bg-red-400 w-10/12 mx-auto rounded-full'
                        size={"lg"}
                        onPress={handleSubmit(handleUserSignUp)}
                    >
                        <Text className='text-white'>
                            Sign Up
                        </Text>
                    </Button>
                </KeyboardAvoidingView>
            </View>
        </SafeAreaView >
    )
}

export default SignUpScreen