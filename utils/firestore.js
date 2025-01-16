import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from './firebase';

const tasksCollection = collection(db, 'tasks');

export const fetchTasks = async () => {
  const snapshot = await getDocs(tasksCollection);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const addTask = async (task) => {
  await addDoc(tasksCollection, task);
};

export const updateTask = async (id, updatedTask) => {
  const taskDoc = doc(db, 'tasks', id);
  await updateDoc(taskDoc, updatedTask);
};

export const deleteTask = async (id) => {
  const taskDoc = doc(db, 'tasks', id);
  await deleteDoc(taskDoc);
};
