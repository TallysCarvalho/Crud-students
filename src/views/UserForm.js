import React, {useState, useContext} from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
  Image,
} from 'react-native';
import AvataNull from '../images/avatar.png'
import * as ImagePicker from 'react-native-image-picker';

import UsersContext from '../context/UsersContext';

export default ({route, navigation}) => {
  const [user, setUser] = useState(route.params ? route.params : {});
  const [photo, setPhoto] = useState(null);
  const {dispatch} = useContext(UsersContext);

  //Faz o upload da photo de perfil do Aluno
  UploadButton = () => {
    const options = {
      noData: true,
      type: 'photo',
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      console.log('response', response);
      if (response.uri) {
        setPhoto(response);
        user.avatarUrl = response.uri;
        console.log(user.avatarUrl);
        console.log(photo);
      }
    });
  };

  return (
    <View style={style.form}>
      <Text>Nome</Text>
      <TextInput
        style={style.input}
        onChangeText={(name) => setUser({...user, name})}
        placeholder="Informe o Nome"
        value={user.name}
      />
      <Text>Email</Text>
      <TextInput
        style={style.input}
        onChangeText={(email) => setUser({...user, email})}
        placeholder="Informe o E-mail"
        value={user.email}
      />
      <Text>Foto do Aluno</Text>
      

      <TouchableOpacity
        style={style.buttonStyle}
        title="Upload"
        onPress={this.UploadButton}>
        <Text style={{textAlign: 'center', fontWeight: 'bold', color: 'white',zIndex:101,position:'absolute'}}>
          +
        </Text>
        {photo && (
        <Image
          source={{uri: photo.uri}}
          style={{width: 165, height: 165,borderRadius:90,zIndex:100}}
        />
      )}
      {!photo && (
        <Image
          source={require('../images/avatar.png')}
          style={{width: 165, height: 165,borderRadius:90,zIndex:100}}
        />
      )}
      </TouchableOpacity>
      <Button
        title="Salvar"
        onPress={() => {
          dispatch({
            type: user.id ? 'updateUser' : 'createUser',
            payload: user,
          });
          navigation.goBack();
        }}
      />
    </View>
  );
};

//**************Styles***************

const style = StyleSheet.create({
  form: {
    padding: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
  },
  buttonStyle: {
    color: 'red',
    width:165,
    height:165,
    borderRadius:90,
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    zIndex: 5,
    marginBottom: 20,
    padding: 20,
    backgroundColor: 'blue',
    marginLeft:115
  },
});
