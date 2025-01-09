import { View, Text, Image } from 'react-native'
import React from 'react'
import { User, UserResponse } from '@/types/userData'

type Props = {
    user: User | undefined;
}

const UserCard = ({ user }: Props) => {
    return (
        <View className='p-2 bg-gray-100 rounded-lg w-40 xs:w-48 sm:w-56'>
            <View className='items-center'>
                <View className='mb-2'>
                    <Image className='w-24 h-24 rounded-full' source={{ uri: user?.picture.large }} />
                </View>

                <Text className='text-lg font-medium'>{user?.name.first} {user?.name.last}</Text>
                <Text className='font-medium'>{user?.location.country}</Text>
                <Text className='mt-1'>{user?.email}</Text>
            </View>
        </View>
    )
}

export default UserCard