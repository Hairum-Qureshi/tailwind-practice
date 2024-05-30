import { useState } from "react";

export default function Todo() {
	const [task, setTask] = useState("");
	const [tasks, setTasks] = useState<string[]>([]);

	function addTask(event: React.KeyboardEvent) {
		if (event.key === "Enter") {
			if (task?.trim()) {
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
									className="mt-4 border-2 border-gray-600 w-11/12 box-border p-2 text-left m-auto inline-flex"
									key={Math.floor(index * Date.now())}
								>
									<h3>{task}</h3>
									<div className="ml-auto text-sm inline-flex">
										<span className="text-yellow-600 mr-2 bg-gray-300 rounded-full text-center align-middle p-2 w-7 h-7 flex items-center justify-center">
											E
										</span>

										<span
											className="text-red-500 bg-red-900 rounded-full text-center align-middle p-2 w-7 h-7 flex items-center justify-center"
											onClick={() => deleteTask(index)}
										>
											X
										</span>
									</div>
								</div>
							);
						})}
					</>
				) : (
					<h3 className="mt-5 text-lg">You've completed all your tasks!</h3>
				)}
			</div>
		</div>
	);
}
