import { View, Text, TouchableOpacity } from 'react-native'
import { Feather, MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from 'expo-router'
import { DrawerActions } from '@react-navigation/native'

const Header = () => {
    const navigate = useNavigation()
    const ToggleDrawer = () => {
        navigate.dispatch(DrawerActions.toggleDrawer())
    }
    return (
        <View style={{ alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 20, width: "100%", backgroundColor: "rgba(0, 0, 0, 0)" }}>
            <TouchableOpacity onPress={ToggleDrawer}>
                <MaterialIcons name="menu" size={30} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
                style={{
                    backgroundColor: "#385533",
                    padding: 15,
                    borderRadius: 50,
                    position: 'relative'
                }}
            >
                <View style={{ position: 'absolute', alignItems: 'center', backgroundColor: '#EC1C23', top: 5, right: 5, height: 20, width: 20, borderRadius: 50, zIndex: 10 }}>
                    <Text style={{ color: "#fff", fontSize: 13 }}>1</Text>
                </View>
                <Feather name="shopping-bag" size={20} color="#fff" />
            </TouchableOpacity>
        </View>
    )
}

export default Header