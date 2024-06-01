export default function TimeTracker() {
	return (
		<div className="p-8 text-sky-950 text-center absolute lg:relative top-16">
			<h1 className="text-3xl text-blue-600 font-bold mb-5">
				TRACK YOUR TIME!
			</h1>
			<div className="border-1 w-2/3 border-gray-300 m-auto">
				<div className="flex border-2 m-auto w-full">
					<input
						type="text"
						placeholder="Enter task name"
						className="w-full outline-none p-1"
					/>
					<div className="flex items-center ml-auto">
						<h1 className="p-1 text-2xl flex items-center bg-slate-300 h-full">
							00:00:00
						</h1>
						<button className=" bg-blue-500 text-white p-2 w-40">Start</button>
					</div>
				</div>
			</div>
		</div>
	);
}
