import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName: keyof typeof Ionicons.glyphMap;

                    if (route.name === 'index') iconName = 'home-outline';
                    else if (route.name === 'hire') iconName = 'briefcase-outline';
                    else if (route.name === 'works') iconName = 'list-outline';
                    else if (route.name === 'profile') iconName = 'person-outline';
                    else iconName = 'ellipse-outline';

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#ff6347',        // tomato (original)
                tabBarInactiveTintColor: '#888',         // gray (original)
                tabBarStyle: {
                    backgroundColor: '#fff',              // white background (original)
                    borderTopColor: '#eee',               // subtle border
                },
                headerShown: false,
            })}
        >
            <Tabs.Screen name="index" options={{ title: 'Home' , headerShown:false}} />
            <Tabs.Screen name="hire" options={{ title: 'Hire', headerShown:false }} />
            <Tabs.Screen name="works" options={{ title: 'Works', headerShown:false }} />
            <Tabs.Screen name="profile" options={{ title: 'Profile', headerShown:false }} />
        </Tabs>
    );
}