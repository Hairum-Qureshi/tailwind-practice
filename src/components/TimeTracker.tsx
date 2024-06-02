import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface Task {
	task_name: string;
	task_id: string;
	time_elapsed: string;
}

export default function TimeTracker() {
	const [timer, setTimer] = useState(false);
	const [paused, setPaused] = useState(false);
	const [hours, setHours] = useState(0);
	const [minutes, setMinutes] = useState(0);
	const [seconds, setSeconds] = useState(0);
	const [taskName, setTaskName] = useState("");
	const [taskData, setTaskData] = useState<Task[]>([]);

	useEffect(() => {
		let interval: any;
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

	function recordTask() {
		if (taskData.length === 0) {
			setTaskData([
				{
					task_name: taskName,
					task_id: uuidv4().toString(),
					time_elapsed: `${hours < 10 ? "0" + hours : hours}:${
						minutes < 10 ? "0" + minutes : minutes
					}:${seconds < 10 ? "0" + seconds : seconds}`
				}
			]);
		} else {
			setTaskData([
				...taskData,
				{
					task_name: taskName,
					task_id: uuidv4().toString(),
					time_elapsed: `${hours < 10 ? "0" + hours : hours}:${
						minutes < 10 ? "0" + minutes : minutes
					}:${seconds < 10 ? "0" + seconds : seconds}`
				}
			]);
		}
	}

	useEffect(() => {
		console.log(taskData);
	}, [taskData]);

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
					className="lg:hidden w-full p-1 outline-none"
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
									setTimer(false);
									setPaused(false);
									setSeconds(0);
									setMinutes(0);
									setHours(0);
									recordTask();
								}}
							>
								END
							</button>
						)}
					</div>
				</div>
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
