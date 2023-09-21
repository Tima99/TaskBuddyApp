import * as SecureStore from "expo-secure-store";
import STORE from "../constants";

async function DeleteTask(index, todos, setTodos){

    // index is index of deleted task
    const tasks = [...todos] 
    tasks.splice(index, 1)

    setTodos([...tasks])

    try {
      await SecureStore.setItemAsync(STORE.TODO_LIST, JSON.stringify(tasks))
    } catch (error) {
      console.log(error)
    }

}

export default DeleteTask;