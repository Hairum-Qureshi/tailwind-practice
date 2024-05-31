import { useEffect, useState } from "react";

interface TodoListHandlers {
	addTask: (event: React.KeyboardEvent) => void;
	deleteTask: (index: number) => void;
	deleteAllTasks: () => void;
	handleEditMode: (index: number) => void;
	editTask: (event: React.KeyboardEvent) => void;
	taskSetter: (task: string) => void;
	editedTaskSetter: (editedTask: string) => void;
	editModeSetter: (enable_disable_factor: boolean) => void;
	task: string;
	tasks: string[];
	taskToEditIdx: number;
	editTaskVal: string;
	editMode: boolean;
}

export default function useTodos(): TodoListHandlers {
	const savedTodos: string | null = localStorage.getItem("todos");
	const [task, setTask] = useState("");
	const [tasks, setTasks] = useState<string[]>(
		JSON.parse(savedTodos ? savedTodos : "[]") || []
	);
	const [editMode, setEditMode] = useState(false);
	const [taskToEditIdx, setTaskToEditIdx] = useState(-1);
	const [editTaskVal, setEditedTaskVal] = useState("");

	function addTask(event: React.KeyboardEvent) {
		if (event.key === "Enter") {
			if (task.trim()) {
				if (tasks.length > 0 && !tasks.includes(task.trim())) {
					setTasks([...tasks, task]);
					setTask("");
				} else if (tasks.includes(task.trim())) {
					alert("Cannot add duplicate tasks!");
				} else {
					setTasks([task]);
					setTask("");
				}
			}
		}
	}

	function deleteTask(index: number) {
		const tasksCopy: string[] = [...tasks];
		const taskToDelete: string = tasksCopy[index];
		const confirmation: boolean = confirm(
			`Are you sure you would like to delete the task "${taskToDelete}"?`
		);
		if (confirmation) {
			const filteredTasks: string[] = tasksCopy.filter(
				(task: string) => task !== taskToDelete
			);
			setTasks(filteredTasks);
			setTaskToEditIdx(-1);
		}
	}

	function deleteAllTasks() {
		const confirmation: boolean = confirm(
			`Are you sure you would like to delete all ${tasks.length} tasks?`
		);
		if (confirmation) {
			setTasks([]);
			setTaskToEditIdx(-1);
		}
	}

	function handleEditMode(index: number) {
		if (!editMode) {
			setEditMode(true);
			setTaskToEditIdx(index);
		} else {
			setEditMode(false);
			setTaskToEditIdx(-1);
		}
	}

	function editTask(e: React.KeyboardEvent) {
		const task: string = editTaskVal.trim();
		const tasksCopy: string[] = [...tasks];
		if (e.key === "Enter") {
			if (task) {
				if (tasks.includes(task) && tasks[taskToEditIdx] === task) {
					setEditMode(false);
				} else if (tasks.includes(task)) {
					alert("Cannot add duplicate tasks!");
				} else {
					tasksCopy[taskToEditIdx] = task;
					setTasks(tasksCopy);
					setEditMode(false);
				}
			}
		}
	}

	function taskSetter(task: string) {
		setTask(task);
	}

	function editedTaskSetter(editedTask: string) {
		setEditedTaskVal(editedTask);
	}

	function editModeSetter(enable_disable_factor: boolean) {
		setEditMode(enable_disable_factor);
	}

	useEffect(() => {
		if (taskToEditIdx !== -1) {
			setEditedTaskVal(tasks[taskToEditIdx]);
		}

		localStorage.setItem("todos", JSON.stringify(tasks));
	}, [taskToEditIdx, task, tasks]);

	return {
		addTask,
		deleteTask,
		deleteAllTasks,
		handleEditMode,
		editTask,
		taskSetter,
		editedTaskSetter,
		task,
		tasks,
		taskToEditIdx,
		editTaskVal,
		editMode
	};
}
