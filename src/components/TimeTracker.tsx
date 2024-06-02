import {
	faPause,
	faPencil,
	faPlay,
	faTrash
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface Task {
	task_name: string;
	task_id: string;
	time_elapsed: string;
	date: string;
}

// TODO - need to save time data to local storage
// TODO - need to add the computer view of the interface
// TODO - display the task/time data
// TODO - add a total time worked as well
// TODO - add hover and active classes to the buttons

export default function TimeTracker() {
	const [timer, setTimer] = useState(false);
	const [paused, setPaused] = useState(false);
	const [hours, setHours] = useState(0);
	const [minutes, setMinutes] = useState(0);
	const [seconds, setSeconds] = useState(0);
	const [taskName, setTaskName] = useState("");
	const [taskData, setTaskData] = useState<Task[]>([]);

	useEffect(() => {
		let interval: ReturnType<typeof setInterval>;
		if (timer && !paused) {
			interval = setInterval(() => {
				setSeconds(prevSeconds => {
					if (prevSeconds < 59) {
						return prevSeconds + 1;
					} else {
						setMinutes(prevMinutes => {
							if (prevMinutes < 59) {
								return prevMinutes + 1;
							} else {
								setHours(prevHours => prevHours + 1);
								return 0;
							}
						});
						return 0;
					}
				});
			}, 1000);
			return () => clearInterval(interval);
		}
		if (paused) {
			return () => clearInterval(interval);
		}
	}, [timer, paused]);

	document.title = `${hours < 10 ? "0" + hours : hours}:${
		minutes < 10 ? "0" + minutes : minutes
	}:${seconds < 10 ? "0" + seconds : seconds}`;

	function recordTask() {
		if (taskName.trim()) {
			if (taskData.length === 0) {
				setTaskData([
					{
						task_name: taskName,
						task_id: uuidv4().toString(),
						time_elapsed: `${hours < 10 ? "0" + hours : hours}:${
							minutes < 10 ? "0" + minutes : minutes
						}:${seconds < 10 ? "0" + seconds : seconds}`,
						date: new Date().toLocaleDateString("en-US")
					}
				]);
			} else {
				setTaskData([
					{
						task_name: taskName,
						task_id: uuidv4().toString(),
						time_elapsed: `${hours < 10 ? "0" + hours : hours}:${
							minutes < 10 ? "0" + minutes : minutes
						}:${seconds < 10 ? "0" + seconds : seconds}`,
						date: new Date().toLocaleDateString("en-US")
					},
					...taskData
				]);
			}
		} else {
			alert("Please enter the name of your task");
		}
	}

	return (
		<div className="p-8 text-sky-950 text-center absolute lg:relative top-16 w-full m-auto lg:w-2/3">
			<h1 className="text-3xl text-blue-600 font-bold mb-5">
				TRACK YOUR TIME!
			</h1>
			<div className="border-2 border-gray-400">
				<input
					type="text"
					placeholder="Enter task name"
					value={taskName}
					onChange={e => setTaskName(e.target.value)}
					className="lg:hidden w-full p-2 outline-none"
				/>
				<div className="flex">
					<h1 className="p-1 text-2xl items-center justify-center bg-slate-300 h-full w-full">
						{hours < 10 ? "0" + hours : hours}:
						{minutes < 10 ? "0" + minutes : minutes}:
						{seconds < 10 ? "0" + seconds : seconds}
					</h1>
					<div className="flex ml-auto">
						<button className=" bg-blue-500 text-white p-2">
							{!paused ? (
								<FontAwesomeIcon
									icon={faPlay}
									onClick={() => {
										timer && setPaused(true);
									}}
								/>
							) : (
								<FontAwesomeIcon
									icon={faPause}
									onClick={() => setPaused(false)}
								/>
							)}
						</button>
						{!timer ? (
							<button
								className=" bg-blue-400 text-white p-2"
								onClick={() => {
									setTimer(true);
								}}
							>
								Start
							</button>
						) : (
							<button
								className=" bg-red-500 text-white p-2"
								onClick={() => {
									if (taskName) {
										setTimer(false);
										setPaused(false);
										setSeconds(0);
										setMinutes(0);
										setHours(0);
										setTaskName("");
									}
									recordTask();
								}}
							>
								END
							</button>
						)}
					</div>
				</div>
			</div>

			<div className="border-2 w-full box-border border-slate-200 mt-4 h-full text-left p-1">
				{taskData.map((task: Task) => {
					return (
						<div
							className="h-full bg-blue-200 mt-2 first-of-type:mt-0"
							key={task.task_id}
						>
							<div className="text-right text-sm bg-blue-300 p-0.5">
								{task.date}
							</div>
							<div className="flex">
								<div className="p-2">{task.task_name}</div>
								<div className="ml-auto bg-orange-500 flex items-center justify-center w-9 text-white">
									<FontAwesomeIcon icon={faPencil} />
								</div>
							</div>
							<div className="bg-blue-400 flex text-white">
								<div className="p-2 font-bold">{task.time_elapsed}</div>
								<div className="ml-auto bg-red-500 flex items-center justify-center w-9">
									<FontAwesomeIcon icon={faTrash} />
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

// export default function TimeTracker() {
// 	return (
// 		<div className="p-8 text-sky-950 text-center absolute lg:relative top-16">
// 			<h1 className="text-3xl text-blue-600 font-bold mb-5">
// 				TRACK YOUR TIME!
// 			</h1>
// 			<div className="border-1 w-2/3 border-gray-300 m-auto">
// 				<div className="flex m-auto w-full">
// 					<input
// 						type="text"
// 						placeholder="Enter task name"
// 						className="w-full outline-none p-1"
// 					/>
// 					<div className="flex items-center ml-auto">
// 						<h1 className="p-1 text-2xl flex items-center bg-slate-300 h-full">
// 							00:00:00
// 						</h1>
// 						<button className=" bg-blue-400 text-white p-2 w-40">Start</button>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }
