import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from "react-native";
import { Image } from "expo-image";
import RepositorieEntity from "../entities/repositorie-entity";
import { FontAwesome } from '@expo/vector-icons';

export default function Reposito({ route }) {
  const { name, imageUrl, reposUrl } = route.params;
  const [repositorie, setRepositorie] = useState<RepositorieEntity[]>([]);
  const [repositorieName, setRepositorieName] = useState('');
  const [filteredRepositorie, setFilteredRepositorie] = useState<RepositorieEntity[]>([]);

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer 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");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };

    fetch(reposUrl, requestOptions)
      .then(response => response.json())
      .then(dataJson => {
        const repositoriePosition = dataJson.map(repo => ({
          id: repo['id'],
          name: repo['name'],
          fullname: repo['full_name'],
          private: repo['private'],
          gitUrl: repo['git_url'],
          createAt: repo['created_at'],
          watchers: repo['watchers'],
          language: repo['language'],
          forks: repo['forks'],
          defaultBranch: repo['default_branch'],
        }));
        setRepositorie(repositoriePosition);
        setFilteredRepositorie(repositoriePosition);
      })
      .catch(error => console.log('error', error));
  }, []);

  const handleFilter = (text: string) => {
    setRepositorieName(text);

    const filtered = repositorie.filter(repo =>
      repo.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredRepositorie(filtered);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image style={styles.image} source={{ uri: imageUrl }} />
        <Text>{name}</Text>
      </View>

      <View style={styles.containerInput}>
        <TouchableOpacity onPress={() => handleFilter('')}>
          <FontAwesome name="search" size={24} color="black" />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          onChangeText={text => handleFilter(text)}
          value={repositorieName}
          placeholder="Digite o nome para buscar..."
          placeholderTextColor={'white'}
        />
      </View>

      <FlatList
        data={filteredRepositorie}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.cardRepo}>
            <Text style={styles.repoName}>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        flex: 1,
        backgroundColor: '#6fbdff'
    },

    repoName: {
        fontSize: 15,
        fontWeight: '700',
        alignItems: 'center',
    },


    card: {
        backgroundColor: '#336',
        aspectRatio: 3.5,
        width: '100%',
        height: 100,
        borderRadius: 10,
        marginTop: 10,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        borderWidth: 5,
        borderColor: 'black',
        elevation: 20,
        shadowColor: '#000',
    },

    cardRepo: {
        backgroundColor: '#336',
        width: '100%',
        height: 70,
        borderRadius: 10,
        marginTop: 10,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        borderWidth: 5,
        borderColor: 'black',
        elevation: 20,
        shadowColor: '#000',

    },

    image: {
        width: 80,
        height: 80,
        marginRight: 10,
        borderRadius: 10,
        marginLeft: 10
    },
    containerInput: {
        marginTop: 20,
        flexDirection: 'row',
    },
    input: {
        backgroundColor: '#333',
        borderRadius: 10,
        width: 250,
        marginLeft: 6,
        color: 'white',
        marginBottom: 20

    },

})