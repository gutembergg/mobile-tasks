import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Tasks from './components/Tasks';
import * as Animatable from 'react-native-animatable';

const AnimetedTouchable = Animatable.createAnimatableComponent(
  TouchableOpacity,
);

const index = () => {
  const [task, setTask] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [input, setInput] = useState('');

  const handleTask = () => {
    if (input === '') return;

    const data = {
      key: input,
      task: input,
    };

    setTask([...task, data]);
    setOpenModal(false);
    setInput('');
  };

  const hendleDelete = useCallback(data => {
    const find = task.filter(item => item.key !== data.key);
    setTask(find);
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#171d31" barStyle="ligth-content" />
      <View style={styles.content}>
        <Text style={styles.title}>Mes Taches</Text>
      </View>

      <FlatList
        showsHorizontalScrollIndicator={false}
        data={task}
        keyExtractor={item => String(item.key)}
        renderItem={({item}) => (
          <Tasks hendleDelete={hendleDelete} data={item} />
        )}
      />

      <Modal animationType="slide" transparent={false} visible={openModal}>
        <SafeAreaView style={styles.modal}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setOpenModal(false)}>
              <Ionicons
                style={{marginLeft: 5, marginRight: 5}}
                name="md-arrow-back"
                size={40}
                color="#FFF"
              />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Nouvelle tache</Text>
          </View>
          <Animatable.View
            style={styles.modalBody}
            animation="fadeInUp"
            useNativeDriver>
            <TextInput
              style={styles.input}
              placeholder="Entrez nouvelle tache"
              placeholderTextColor="#747474"
              multiline={true}
              autoCorrect={false}
              value={input}
              onChangeText={text => setInput(text)}
            />

            <TouchableOpacity style={styles.handleAdd} onPress={handleTask}>
              <Text style={styles.textAdd}>Valider</Text>
            </TouchableOpacity>
          </Animatable.View>
        </SafeAreaView>
      </Modal>

      <AnimetedTouchable
        style={styles.fab}
        useNativeDriver
        animation="bounceInUp"
        duration={1500}
        onPress={() => setOpenModal(true)}>
        <Icon name="plus" size={35} color="#FFF" />
      </AnimetedTouchable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#171d31',
  },
  title: {
    textAlign: 'center',
    marginTop: 20,
    paddingBottom: 10,
    color: '#FFF',
    fontSize: 25,
  },
  fab: {
    position: 'absolute',
    backgroundColor: '#0094FF',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    right: 25,
    bottom: 25,
    elevation: 2,
    zIndex: 9,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 1,
      height: 3,
    },
  },
  modal: {
    flex: 1,
    backgroundColor: '#171d31',
  },
  modalHeader: {
    marginLeft: 10,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalTitle: {
    color: '#FFF',
    fontSize: 23,
    marginLeft: 15,
  },
  modalBody: {
    marginTop: 15,
  },
  input: {
    fontSize: 20,
    backgroundColor: '#FFF',
    margin: 10,
    padding: 9,
    height: 85,
    textAlignVertical: 'top',
    color: '#000',
    borderRadius: 5,
  },
  handleAdd: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 5,
    backgroundColor: '#FFF',
    height: 40,
  },
  textAdd: {
    fontSize: 20,
  },
});

export default index;
