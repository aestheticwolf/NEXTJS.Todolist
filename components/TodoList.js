import { useState, useEffect } from "react";
import Image from "next/image";
import { CheckCircle, XCircle } from "lucide-react";
import styles from "../styles/Todo.module.css";

export default function TaskTrek() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() === "") return;
    setTasks([...tasks, { text: newTask, completed: false }]);
    setNewTask("");
  };

  const toggleTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const removeTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <Image
          src="/tasktrek-logo.WEBP"
          alt="TaskTrek Logo"
          width={120}
          height={120}
          priority
        />
      </div>

      <header className={styles.header}>
        <h1>TaskTrek</h1>
        <p>Stay Organized, Stay Productive</p>
      </header>

      <div className={styles.inputContainer}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
          className={styles.input}
        />
        <button onClick={addTask} className={styles.addButton}>Add</button>
      </div>

      <ul className={styles.taskList}>
        {tasks.map((task, index) => (
          <li key={index} className={`${styles.task} ${task.completed ? styles.completed : ""}`}>
            <span>{task.text}</span>
            <div className={styles.buttons}>
              <CheckCircle className={styles.checkButton} onClick={() => toggleTask(index)} />
              <XCircle className={styles.deleteButton} onClick={() => removeTask(index)} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
