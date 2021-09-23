import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import ReactJson from 'react-json-view'

export default function App() {
  const [caseId, setCaseId] = useState('')
  const [casePassword, setCasePassword] = useState('')
  const [clientId, setClientId] = useState('')
  const [clientSecret, setClientSecret] = useState('')
  const [responseAPI, setResponseAPI] = useState({})

  const inputs = [
    { id: 1, name: 'Case ID', value: caseId, setValue: (text) => setCaseId(text) },
    { id: 2, name: 'Case Password', value: casePassword, setValue: (text) => setCasePassword(text) },
    { id: 3, name: 'Client ID', value: clientId, setValue: (text) => setClientId(text) },
    { id: 4, name: 'Client Password', value: clientSecret, setValue: (text) => setClientSecret(text) }
  ]

  const submit = () => {
    let data = {
      "case_id": caseId,
      "case_password": casePassword,
      "client_id": clientId,
      "client_secret": clientSecret,
      "grant_type": "password"
    }

    fetch('https://app.fastvisa.us/v1/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
      setResponseAPI(data)
    })
    .catch((error) => {
      setResponseAPI(data)
    });
  }

  return (
    <View style={ styles.container }>
      <StatusBar style="auto" />
      <Text style={ styles.textHeader }>Generate Access Token</Text>
      <View style={{ width: 300 }}>
        {inputs.map(input => (
          <View key={ input.id }>
            <Text style={ styles.text }>{ input.name }</Text>
            <TextInput
              style={ styles.inputField }
              onChangeText={ text => input.setValue(text) }
              value={ input.value }
            />
          </View>
        ))}
        <TouchableOpacity style={ styles.submitButton } onPress={ submit }>
          Submit
        </TouchableOpacity>
        <Text style={ styles.textHeader }>Response API</Text>
        <ReactJson
          src={ responseAPI }
          theme="monokai"
          iconStyle="triangle"
          enableClipboard="true"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 640,
    alignSelf: 'center'
  },
  text: {
    marginVertical: 5
  },
  textHeader: {
    fontSize: 20,
    marginVertical: 15
  },
  inputField: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5
  },
  submitButton: {
    borderRadius: 5,
    backgroundColor: '#2F80ED',
    marginVertical: 20,
    width: 100,
    color: '#FFF',
    padding: 10,
    fontSize: 15,
    alignSelf: 'center',
    alignItems: 'center'
  }
});
