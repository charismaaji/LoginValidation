import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {user_login} from '../../api/user_api';
import {Eye, EyeActive} from '../../assets';

export default function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [seePassword, setSeePassword] = useState(true);
  const [checkValidEmail, setCheckValidEmail] = useState(false);

  const handleCheckEmail = text => {
    let re = /\S+@\S+\.\S+/;
    let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    setEmail(text);
    if (re.test(text) || regex.test(text)) {
      setCheckValidEmail(false);
    } else {
      setCheckValidEmail(true);
    }
  };

  const checkPasswordValidity = value => {
    const isNonWhiteSpace = /^\S*$/;
    if (!isNonWhiteSpace.test(value)) {
      return 'Password must not contain Whitespaces.';
    }

    const isContainsUppercase = /^(?=.*[A-Z]).*$/;
    if (!isContainsUppercase.test(value)) {
      return 'Password must have at least one Uppercase Character.';
    }

    const isContainsLowercase = /^(?=.*[a-z]).*$/;
    if (!isContainsLowercase.test(value)) {
      return 'Password must have at least one Lowercase Character.';
    }

    const isContainsNumber = /^(?=.*[0-9]).*$/;
    if (!isContainsNumber.test(value)) {
      return 'Password must contain at least one Digit.';
    }

    const isValidLength = /^.{8,16}$/;
    if (!isValidLength.test(value)) {
      return 'Password must be 8-16 Characters Long.';
    }

    // const isContainsSymbol =
    //   /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/;
    // if (!isContainsSymbol.test(value)) {
    //   return 'Password must contain at least one Special Symbol.';
    // }

    return null;
  };

  const handleLogin = () => {
    const checkPassowrd = checkPasswordValidity(password);
    if (!checkPassowrd) {
      user_login({
        email: email.toLocaleLowerCase(),
        password: password,
      })
        .then(result => {
          if (result.status == 200) {
            AsyncStorage.setItem('AccessToken', result.data.token);
            navigation.replace('Home');
          }
        })
        .catch(err => {
          console.error(err);
        });
    } else {
      alert(checkPassowrd);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapperInput}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={text => handleCheckEmail(text)}
        />
      </View>
      {checkValidEmail ? (
        <Text style={styles.textFailed}>Wrong format email</Text>
      ) : (
        <Text style={styles.textFailed}> </Text>
      )}
      <View style={styles.wrapperInput}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          secureTextEntry={seePassword}
          onChangeText={text => setPassword(text)}
        />
        <TouchableOpacity
          style={styles.wrapperIcon}
          onPress={() => setSeePassword(!seePassword)}>
          <Image source={seePassword ? Eye : EyeActive} style={styles.icon} />
        </TouchableOpacity>
      </View>
      {email == '' || password == '' || checkValidEmail == true ? (
        <TouchableOpacity
          disabled
          style={styles.buttonDisable}
          onPress={handleLogin}>
          <Text style={styles.text}>Login</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.text}>Login</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  wrapperInput: {
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: 'grey',
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    padding: 10,
    width: '100%',
  },
  wrapperIcon: {
    position: 'absolute',
    right: 0,
    padding: 10,
  },
  icon: {
    width: 30,
    height: 24,
  },
  button: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'orange',
    borderRadius: 5,
    marginTop: 25,
  },
  buttonDisable: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'grey',
    borderRadius: 5,
    marginTop: 25,
  },
  text: {
    color: 'white',
    fontWeight: '700',
  },
  textFailed: {
    alignSelf: 'flex-end',
    color: 'red',
  },
});
