import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Modal, Image } from 'react-native';
import { Camera } from 'expo-camera';
import { FontAwesome } from "@expo/vector-icons"

export default function App() {

  const camRef = useRef(null)
  const [type, setType] = useState(Camera.Constants.Type.back)
  const [hasPermission, setHasPermission] = useState(null)
  const [capturaFoto, setCapturaFoto] = useState(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync()
      setHasPermission(status === "granted")
    })();
  }, [])

  if (hasPermission === null) {
    return <View />
  }
  if (hasPermission === false) {
    return <Text>Acesso a camera Negado</Text>
  }

  async function takePicture() {
    if (camRef) {
      const data = await camRef.current.takePictureAsync();
      setCapturaFoto(data.uri)
      setOpen(true)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Camera
        style={styles.camera}
        type={type}
        ref={camRef}
      >
        <View style={styles.contentButtons}>
          <TouchableOpacity
            style={styles.buttonFlip}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              )
            }}
          >
            <FontAwesome name="exchange" size={23} color="red"></FontAwesome>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonCamera}
            onPress={takePicture}
              >
            <FontAwesome name="camera" size={23} color="#FFF"/>
          </TouchableOpacity>
      </View>
    </Camera>
    {capturaFoto &&(
    <Modal 
    animationType='slide'
    transparent={true}
    visible={open}
    >
      <View style={styles.contentModal}>
      <Image></Image>
      </View>
    </Modal>
    )}
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    //top:-110,
    width: "100%",
    height: "75%"
  },
  contentButtons: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row"
  },
  buttonFlip: {
    position: "absolute",
    bottom: 50,
    left: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    margin: 20,
    height: 50,
    width: 50,
    borderRadius: 50
  },
  buttonCamera:{
    position: "absolute",
    bottom: 50,
    right: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
    margin: 20,
    height: 50,
    width: 50,
    borderRadius: 50
  }
});
