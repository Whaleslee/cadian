import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { View, Text, StyleSheet, Platform, TextInput, TouchableOpacity, KeyboardAvoidingView, Keyboard } from 'react-native';
import Task from './components/Task';

export default function App() {
  // useState is used for things that change often for the app
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState( [] );

  const handleAddTask = () => {
    Keyboard.dismiss();
    console.log(task);

    if(task === null) {
      return;
    }
    
    setTaskItems([...taskItems, task])
    setTask(null);
  }

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  }
  
  return (
    <View style={styles.container}>
      {/* Tasks */}
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Today's tasks</Text>
        
        <View style={styles.items}>
          {/* This is where the tasks will go */}
          {
            taskItems.map((item, index) => {
              return (
                <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                  <Task text={item} />
                </TouchableOpacity>
              )

            })
          }
        </View>

      </View> 
      
      {/* Write a task */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === "android" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput style={styles.input} placeholder={'write a task'} value={task} onChangeText={text => setTask(text)} />

        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // todo: add a colors file in the assets folder
    backgroundColor: '#ffffff',
    alignContent: "center",
  },
  tasksWrapper: {
    paddingTop: 100,
    paddingHorizontal: 30,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width:250,

  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText: {},
});
