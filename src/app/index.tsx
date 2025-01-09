import { STORAGE_KEYS } from "@/libs/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect } from "expo-router";
import React from "react";
import { useEffect, useState } from "react";

export default function Index() {

  const [localUser, setLocalUser] = useState<string | null>(null);

  const getLocalUser = async () => {
    const localUserName = await AsyncStorage.getItem(STORAGE_KEYS.USER_NAME_KEY);
    console.log(localUserName, "LOCAL_NAME");
    setLocalUser(localUserName);
  };

  useEffect(() => {
    getLocalUser();
  }, []);

  return <Redirect href={"/sign-in"} />

}
