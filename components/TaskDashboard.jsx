'use client';

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addTask,
  editTask,
  deleteTask,
  toggleTaskCompletion,
} from '@/store/tasksSlice';
import { useAuth } from '@/utils/AuthContext';

const TaskDashboard = () => {
  const dispatch = useDispatch();
  const { user, loading } = useAuth();
  const tasks = useSelector((state) => state.tasks.tasks);

  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: '',
  });
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [schedule, setSchedule] = useState(false)

  const TASK_STORAGE_KEY = 'userTasks';

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem(TASK_STORAGE_KEY));
    if (storedTasks) {
      storedTasks.forEach((task) => dispatch(addTask(task)));
    }
  }, [dispatch]);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem(TASK_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const handleAddOrUpdateTask = () => {
    if (!newTask.title.trim()) return;

    if (editingTaskId) {
      dispatch(editTask({ id: editingTaskId, ...newTask }));
      setEditingTaskId(null);
    } else {
      dispatch(addTask(newTask));
    }

    setNewTask({ title: '', description: '', dueDate: '' });
  };

  const handleEditTask = (task) => {
    setNewTask({
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
    });
    setEditingTaskId(task.id);
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setNewTask({ title: '', description: '', dueDate: '' });
  };

  const currentDate = new Date().toISOString().split('T')[0];

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());

    if (filter === 'completed') return matchesSearch && task.completed;
    if (filter === 'pending') return matchesSearch && !task.completed;
    if (filter === 'overdue')
      return matchesSearch && task.dueDate < currentDate && !task.completed;
    return matchesSearch; // 'all' filter
  });

  return (
    <div className="flex min-h-screen bg-[#FBFDFC] p-2">
      <div className='hidden md:block h-[70vh] w-72 bg-[#EEF6EF] ml-10 mt-24'>
        <div className='flex flex-col items-center justify-center space-y-3 text-black -mt-10'>
          <img src={user.photoURL || 'images/profile.png'} alt="" className='rounded-full shadow-lg' />
          <p className='font-semibold'>Hey, {user.displayName || 'User'}!</p>
        </div>

        <div className='flex flex-col justify-center bg-[#FBFDFC] text-black mx-4 px-4 py-5 space-y-5 mt-2'>
          <div className='flex items-center space-x-3'>
            <img src="images/task.png" alt="" />
            <p>All Tasks</p>
          </div>

          <div className='flex items-center space-x-3'>
            <img src="images/today.png" alt="" />
            <p>Today</p>
          </div>

          <div className='flex items-center space-x-3'>
            <img src="images/imp.png" alt="" />
            <p>Important</p>
          </div>

          <div className='flex items-center space-x-3'>
            <img src="images/plan.png" alt="" />
            <p>Planned</p>
          </div>

          <div className='flex items-center space-x-3'>
            <img src="images/assign.png" alt="" />
            <p>Assigned to me</p>
          </div>
        </div>

        <div className='flex flex-col justify-center bg-[#FBFDFC] text-black mt-2 mx-4 px-4 py-5 space-y-5'>
          <div className='flex items-center space-x-3'>
            <img src="images/add.png" alt="" />
            <p>Add list</p>
          </div>
        </div>
        <div className='flex flex-col justify-center bg-[#FBFDFC] text-black m-4 px-4 space-y-5'>
          <h1>Today Tasks</h1>
        </div>
      </div>

      <div className='flex-col mx-0 md:mx-10 w-full md:w-[70vw]'>
        {/* Add/Edit Task Form */}
        <div className="relative bg-gradient-to-b from-[#D0FFD21A] to-[#3579371A] border border-t-[#496E4B33] border-b-[#496E4B33] h-56">
          <div className="flex flex-col h-full justify-end mx-3 py-3">
            <input
              type="text"
              placeholder="Add A Task"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              className="absolute top-12 text-[#1B281BB8] w-full bg-transparent focus:outline-none"
            />
            <textarea
              placeholder="Task Description"
              value={newTask.description}
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
              className="absolute top-24 text-[#1B281BB8] w-full bg-transparent focus:outline-none"
            ></textarea>
            {schedule && <input
              type="date"
              value={newTask.dueDate}
              onChange={(e) =>
                setNewTask({ ...newTask, dueDate: e.target.value })
              }
              className=" text-[#1B281BB8] w-full bg-transparent focus:outline-none mb-3"
            />}

            <div className='flex justify-between items-center'>
              <div className='flex items-center space-x-7'>
                <img src="images/ring.png" alt="" />
                <img src="images/repeat.png" alt="" />
                <button onClick={() => setSchedule(!schedule)}>
                  <img src="images/schedule.png" alt="" />

                </button>
              </div>

              <div className="flex justify-between items-center space-x-2">
                <button
                  onClick={handleAddOrUpdateTask}
                  className="bg-[#35793729] text-[#357937] py-2 px-6 rounded-lg hover:bg-[#19361929] transition"
                >
                  {editingTaskId ? 'Update Task' : 'Add Task'}
                </button>

                {editingTaskId && (
                  <button
                    onClick={handleCancelEdit}
                    className="bg-[#67707129] text-[#414641] py-2 px-6 rounded-lg hover:bg-gray-600 transition"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Search Bar */}
        <div className="">
          <div className='p-6'>
            <input
              type="text"
              placeholder="Search tasks by title or description"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
            />
          </div>
          <div className='space-x-4 space-y-2'>
            {['all', 'completed', 'pending', 'overdue'].map((filterType) => (
              <button
                key={filterType}
                onClick={() => setFilter(filterType)}
                className={`py-2 px-4 rounded ${filter === filterType
                  ? 'bg-[#35793729] text-[#357937]'
                  : 'bg-gray-300 text-gray-800'
                  }`}
              >
                {filterType.charAt(0).toUpperCase() + filterType.slice(1)} Tasks
              </button>
            ))}
          </div>
          <div className='mt-4 space-y-2'>
            {filteredTasks.map((task) => (
              <div
                key={task.id}
                className="p-4 bg-white border rounded-lg shadow-md hover:shadow-lg transition"
              >
                <h3 className="font-bold text-lg text-black">{task.title}</h3>
                <p className="text-gray-500 break-words mt-2 text-sm">{task.description}</p>
                <p className="text-gray-400 text-xs mt-1">
                  Due: {task.dueDate} |{' '}
                  {task.completed ? (
                    <span className="text-green-600">Completed</span>
                  ) : (
                    <span className="text-red-600">Pending</span>
                  )}
                </p>
                <div className="flex justify-end mt-4 space-x-2">
                  <button
                    onClick={() => handleEditTask(task)}
                    className="bg-[#35793729] text-[#357937] py-1 px-4 rounded hover:bg-[#1f462029] transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => dispatch(deleteTask(task.id))}
                    className="bg-[#79353529] text-[#793535] py-1 px-4 rounded hover:bg-[#4c212129] transition"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => dispatch(toggleTaskCompletion(task.id))}
                    className="bg-[#35367929] text-[#353d79] py-1 px-4 rounded hover:bg-[#1b1b3c29] transition"
                  >
                    {task.completed ? 'Mark Pending' : 'Mark Complete'}
                  </button>
                </div>
              </div>
            ))}

          </div>


        </div>
      </div>
    </div>
  );
};

export default TaskDashboard;
