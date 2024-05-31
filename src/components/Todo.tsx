import useTodos from "../hooks/useTodos";

// TODO - need to add active class to the edit and delete task buttons
// TODO - need to add hover class to the edit and delete task buttons

export default function Todo() {
	const {
		addTask,
		deleteTask,
		deleteAllTasks,
		handleEditMode,
		editTask,
		taskSetter,
		editedTaskSetter,
		editModeSetter,
		task,
		tasks,
		taskToEditIdx,
		editTaskVal,
		editMode
	} = useTodos();

	return (
		<div className="p-8 text-sky-950 text-center absolute lg:relative top-16">
			<div className="border-2 border-gray-400 rounded-md m-auto w-full lg:w-2/5 bg-gray-100 h-auto pb-8">
				<h2 className="text-2xl pt-2">List your to-dos!</h2>
				<input
					type="text"
					value={task}
					placeholder="Enter a task..."
					className="mt-2 border-2 border-gray-600 w-11/12 box-border outline-0 p-2 rounded-md"
					onChange={e => taskSetter(e.target.value)}
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
									className="mt-4 border-2 border-gray-600 w-11/12 box-border h-full p-2 text-left m-auto inline-flex bg-slate-300"
									key={index}
								>
									{editMode && index === taskToEditIdx ? (
										<input
											type="text"
											value={editTaskVal}
											onChange={e => editedTaskSetter(e.target.value)}
											onKeyDown={e => editTask(e)}
											className="w-full mr-2 outline-0"
										/>
									) : (
										<h3 className="flex items-center justify-center">{task}</h3>
									)}

									<div className="ml-auto text-sm inline-flex" key={index}>
										{editMode && index === taskToEditIdx ? (
											<span
												className="text-red-500 bg-red-800 hover:bg-red-900 active:bg-red-700 rounded-full text-center align-middle p-2 w-7 h-7 flex items-center justify-center hover:cursor-pointer"
												onClick={() => editModeSetter(false)}
											>
												❌
											</span>
										) : (
											<>
												<span
													className="text-yellow-600 mr-2 bg-slate-400 hover:bg-slate-500 active:bg-slate-600 rounded-full text-center align-middle p-2 w-7 h-7 flex items-center justify-center hover:cursor-pointer"
													onClick={() => handleEditMode(index)}
												>
													✏️
												</span>
												<span
													className="text-red-500 bg-red-800 hover:bg-red-900 active:bg-red-700 rounded-full text-center align-middle p-2 w-7 h-7 flex items-center justify-center hover:cursor-pointer"
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
