import { Stack } from "expo-router";

import "../globals.css";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SWRConfig } from "swr";
import { AppState, AppStateStatus } from "react-native";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <SWRConfig
        value={{
          provider: () => new Map(),
          isOnline: () => { return true },
          isVisible: () => { return true },
          initFocus: (callback) => {
            let appState = AppState.currentState

            const onAppStateChange = (nextAppState: AppStateStatus) => {
              /* If it's resuming from background or inactive mode to active one */
              if (appState.match(/inactive|background/) && nextAppState === 'active') {
                callback()
              }
              appState = nextAppState
            }

            // Subscribe to the app state change events
            const subscription = AppState.addEventListener('change', onAppStateChange)

            return () => {
              subscription.remove()
            }
          },

        }}
      >
        <Stack screenOptions={{ headerShown: false }} />
      </SWRConfig>
    </SafeAreaProvider>
  );
}
