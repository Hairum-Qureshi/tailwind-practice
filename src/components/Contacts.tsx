export default function Contacts() {
	return (
		<div className="p-8 text-sky-950 absolute lg:relative top-16 w-full m-auto lg:w-2/3">
			<h2 className="text-2xl font-black font-Kanit lg:text-left text-center">
				ADD YOUR CONTACTS:
			</h2>
			<div className="border-2 border-slate-200 mt-2 p-2 w-full box-border rounded-md bg-slate-100">
				<div>
					<label>Enter person's name:</label>
					<input
						type="text"
						placeholder="Name"
						className="border-2 border-slate-400 outline-none w-full p-1 rounded"
					/>
				</div>
				<div className="mt-4">
					<label>Enter their phone number:</label>
					<input
						type="tel"
						placeholder="Phone Number"
						className="border-2 border-slate-400 outline-none w-full p-1 rounded"
					/>
				</div>
			</div>
		</div>
	);
}
