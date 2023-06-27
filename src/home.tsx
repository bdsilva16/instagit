import { useState } from "react";
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, } from "react-native";
import UserEntity from "./entities/user-entity";
import { Image } from "expo-image"
import { FontAwesome } from '@expo/vector-icons';



export default function Home() {

    const [users, setUsers] = useState<UserEntity[]>([]);

    function search() {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer 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");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
        };


        fetch("https://api.github.com/users/niltondiniz", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                setUsers([{

                    name: result['name'],
                    imageUrl: result['avatar_url'],
                    reposUrl: result['repos_url'],
                }])
            })
            .catch(error => console.log('error', error));
    }


    return (
        <View style={styles.container}>
            <Text style={styles.title}>lista de usuarios</Text>

            <View style={styles.containerInput}>

                <TouchableOpacity onPress={() => {
                    search()
                }}>
                    <FontAwesome name="search" size={24} color="black" />
                </TouchableOpacity>

                <TextInput style={styles.input} />
            </View>



            <FlatList
                data={users}
                keyExtractor={(item) => item.name}
                renderItem={(user) =>
                    <View style={styles.card}>
                        <View>
                            <Image style={styles.image} source={{ uri: user.item.imageUrl }} />
                        </View>

                        <Text >{user.item.name}</Text>

                    </View>
                }

            >
            </FlatList>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        flex: 1,
        backgroundColor: '#4285f4'
    },
    card: {
        backgroundColor: '#336',
        aspectRatio: 3.0,
        width: '100%',
        height: 120,
        borderRadius: 10,
        marginTop: 25,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        borderWidth: 5,
        borderColor: 'black',
        elevation: 15,
        shadowColor: '#fff',

    },
    title: {
        marginTop: 60,
        fontSize: 22,
        fontWeight: '700',
        alignItems: 'center',
    },
    image: {
        width: 80,
        height: 80,
        marginRight: 10,
        borderRadius: 10,
        marginLeft: 10
    },
    input: {
        backgroundColor: '#333',
        borderRadius: 10,
        width: 250,
        marginLeft: 6,

    },
    containerInput: {
        marginTop: 20,
        flexDirection: 'row',
    }
})