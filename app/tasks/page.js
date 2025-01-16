'use client'
import TaskDashboard from "@/components/TaskDashboard";
import { Provider } from 'react-redux';
import store from '@/store/store';
import Navbar from "@/components/Navbar";

const task = () => {
    return (
        <Provider store={store}>
        <Navbar/>
        <TaskDashboard />
        </Provider>
    );
}

export default task