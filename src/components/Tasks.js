import React from 'react';

import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import * as Animatable from 'react-native-animatable';

const Tasks = ({data, hendleDelete}) => {
  return (
    <Animatable.View
      style={styles.container}
      animation="bounceIn"
      useNativeDriver>
      <TouchableOpacity onPress={() => hendleDelete(data)}>
        <Icon name="checkcircleo" size={30} color="#121212" />
      </TouchableOpacity>
      <View>
        <Text style={styles.task}>{data.task}</Text>
      </View>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 9,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#FFF',
    padding: 7,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 1,
      height: 3,
    },
  },
  task: {
    color: '#121212',
    fontSize: 20,
    paddingLeft: 10,
    paddingRight: 20,
  },
});

export default Tasks;
