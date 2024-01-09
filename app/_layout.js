import { Stack } from 'expo-router';

const Layout = () => {
    return <Stack
        screenOptions={{
        // Hide the header for all other routes.
        headerShown: false,
        }}
    >
        <Stack.Screen
            name="index"
            options={{
                // Hide the header for this route
                headerShown: false,
            }}
        />
    </Stack>;
}
export default Layout;