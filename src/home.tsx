import { View,Text,StyleSheet } from "react-native";

export default function Home(){
    return(
        <View style={styles.container}>
            <Text> brempo</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        alignItems:'center',
        justifyContent:'center',
        flex:1,
        backgroundColor:'#4285f4'
    }
})