import { View, Text, FlatList } from 'react-native'
import React from 'react'

import useSWR from 'swr'
import { fetcher } from '@/utils/fetcher'
import UserCard from '@/components/UserCard'
import { UserResponse } from '@/types/userData'
import { SafeAreaView } from 'react-native-safe-area-context'


type Props = {}

const UserListScreen = ({ }: Props) => {

    const { data, error, isLoading } = useSWR("https://randomuser.me/api/?results=100&amp;inc=name", fetcher)

    return (
        <SafeAreaView className='flex-1 bg-white'>
            <View className='p-4'>
                {isLoading ? (
                    <View>
                        <Text>Loading users</Text>
                    </View>
                ) : (
                    <FlatList
                        data={data?.results}
                        numColumns={2}
                        columnWrapperStyle={{
                            justifyContent: 'space-between', // Space items within each row
                            // marginBottom: 16, // Space between rows
                            gap: 16,
                        }}
                        contentContainerStyle={{
                            gap: 16
                        }}
                        renderItem={({ index, item }) => (
                            <View key={index} className='gap-4'>
                                <UserCard user={item} />
                            </View>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
                )}
            </View>
        </SafeAreaView>
    )
}

export default UserListScreen