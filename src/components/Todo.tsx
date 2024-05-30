import { useEffect, useState } from "react";

export default function Todo() {
	const [task, setTask] = useState("");
	const [tasks, setTasks] = useState<string[]>([]);
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
		}
	}

	function deleteAllTasks() {
		const confirmation: boolean = confirm(
			`Are you sure you would like to delete all ${tasks.length} tasks?`
		);
		if (confirmation) {
			setTasks([]);
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
		console.log(e);
		if (e.key === "Enter") {
			if (task) {
				if (tasks.includes(task)) {
					alert("Cannot add duplicate tasks!");
				} else {
					tasksCopy[taskToEditIdx] = task;
					setTasks(tasksCopy);
					setEditMode(false);
				}
			}
		}
	}

	useEffect(() => {
		setEditedTaskVal(tasks[taskToEditIdx]);
	}, [taskToEditIdx]);

	// TODO - need to add active class to the edit and delete task buttons
	// !FIX - when you have more than one to-do, the edit feature is buggy when it comes to typing

	return (
		<div className="p-8 text-sky-950 text-center">
			<div className="border-2 border-gray-400 rounded-md m-auto w-full lg:w-2/5 bg-gray-100 h-auto pb-8">
				<h2 className="text-2xl pt-2">List your to-dos!</h2>
				<input
					type="text"
					value={task}
					placeholder="Enter a task..."
					className="mt-2 border-2 border-gray-600 w-11/12 box-border outline-0 p-2 rounded-md"
					onChange={e => setTask(e.target.value)}
					onKeyDown={e => addTask(e)}
				/>
				{tasks.length > 0 ? (
					<>
						<button
							className="w-1/2 mt-5 p-1 border-2 rounded-md bg-red-600 border-red-900 text-white"
							onClick={deleteAllTasks}
						>
							Delete All Tasks
						</button>
						{tasks.map((task: string, index: number) => {
							return (
								<div
									className="mt-4 border-2 border-gray-600 w-11/12 box-border h-full p-2 text-left m-auto inline-flex"
									key={Math.floor(index * Date.now())}
								>
									{editMode && index === taskToEditIdx ? (
										<input
											type="text"
											value={editTaskVal}
											onChange={e => setEditedTaskVal(e.target.value)}
											onKeyDown={e => editTask(e)}
											className="w-full mr-2 outline-0"
										/>
									) : (
										<h3 className="flex items-center justify-center">{task}</h3>
									)}

									<div className="ml-auto text-sm inline-flex">
										{editMode && index === taskToEditIdx ? (
											<span
												className="text-red-500 bg-red-900 rounded-full text-center align-middle p-2 w-7 h-7 flex items-center justify-center hover:cursor-pointer"
												onClick={() => setEditMode(false)}
											>
												❌
											</span>
										) : (
											<>
												<span
													className="text-yellow-600 mr-2 bg-gray-300 rounded-full text-center align-middle p-2 w-7 h-7 flex items-center justify-center hover:cursor-pointer"
													onClick={() => handleEditMode(index)}
												>
													✏️
												</span>
												<span
													className="text-red-500 bg-red-900 rounded-full text-center align-middle p-2 w-7 h-7 flex items-center justify-center hover:cursor-pointer"
													onClick={() => deleteTask(index)}
												>
													❌
												</span>
											</>
										)}
									</div>
								</div>
							);
						})}
					</>
				) : (
					<h3 className="mt-5 text-lg">You've completed all your tasks! 🎉</h3>
				)}
			</div>
		</div>
	);
}
