import { useState } from "react";
import validator from "validator";

export default function Contacts() {
	const [contactName, setContactName] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");

	function addContact() {
		const isValidPhoneNumber = validator.isMobilePhone(phoneNumber);
		alert(isValidPhoneNumber);
	}

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
						className="border-2 border-slate-400 outline-none w-full p-2 rounded"
					/>
				</div>
				<div className="mt-4">
					<label>Enter their phone number:</label>
					<input
						type="tel"
						placeholder="Phone Number"
						className="border-2 border-slate-400 outline-none w-full p-2 rounded"
						onChange={e => setPhoneNumber(e.target.value)}
					/>
				</div>
				<div className="mt-3">
					<button
						onClick={addContact}
						className="border-2 rounded border-gray-500 bg-gray-200 p-2 font-Kanit flex m-auto"
					>
						Add Contact
					</button>
				</div>
			</div>
			<div className="mt-2 p-2 w-full box-border rounded-md">
				<h1 className="text-xl">Your Saved Contacts:</h1>
				<input
					type="search"
					placeholder="Search"
					className="mt-5 border-2 rounded p-2 w-full outline-none"
				/>
				<div>
					<div className="w-full box-border border-2 border-gray-200 p-2 mt-5 rounded-md bg-slate-100 flex">
						<div className="flex items-center w-full">
							<h2 className="text-lg">Name Here</h2>
							<p className="text-gray-400 ml-auto">(123)-456-7890</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
