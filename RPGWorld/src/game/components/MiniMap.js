// code refrenced from https://reactnative.dev/docs/modal

import {useState} from 'react';
import {Alert, Image, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const MiniMap = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.centeredView}>
        <Modal
          animationType="faded"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Image
                    source={require('../assets/buildings/fullMap.png')}
                    style={styles.fullMap}
                    resizeMode="cover"
                />
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}>
          <Image
            source={require('../assets/buildings/fullMap.png')}
            style={styles.thumbnail}
            resizeMode="cover"
          />
          <Text style={styles.textStyle}>Show Modal</Text>
        </Pressable>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    layer: 100,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    layer: 100,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    layer: 100,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  thumbnail: {
    position: "absolute",
    top: 12,
    left: 12,
    width: 180,
    height: 100,
    zIndex: 3000,
    layer: 100,
  },
  buttonClose: {
    layer: 2100,
    height: 1250,
    width: '100%',
    flex: 1,
    margin: 0,
    padding: 0,
  },
  textStyle: {
    layer: 100,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    layer: 100,
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default MiniMap;