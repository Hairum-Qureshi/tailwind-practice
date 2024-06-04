import validator from "validator";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

interface Contact {
	id: string;
	name: string;
	phone_number: string;
}

// TODO - add an edit and delete button -> when the user presses edit, populate the form fields with that contact's details
// TODO - save to local storage
// TODO - make the search bar functioning and show results on key input
// TODO - clear the inputs after a user adds a new contact
// TODO - add hover and active classes to buttons
// TODO - consider adding pagination as well for the contacts

export default function Contacts() {
	const [contacts, setContacts] = useState<Contact[]>([]);
	const [contactName, setContactName] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");

	function addContact() {
		const isValidPhoneNumber = validator.isMobilePhone(phoneNumber);
		if (isValidPhoneNumber && contactName) {
			if (contacts.length === 0) {
				setContacts([
					{
						id: uuidv4(),
						name: contactName,
						phone_number: phoneNumber
					}
				]);
			} else {
				setContacts([
					...contacts,
					{
						id: uuidv4(),
						name: contactName,
						phone_number: phoneNumber
					}
				]);
			}
		}
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
						onChange={e => setContactName(e.target.value)}
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
					{contacts.length > 0 ? (
						contacts.map((contact: Contact) => {
							return (
								<div
									className="w-full box-border border-2 border-gray-200 p-2 mt-5 rounded-md bg-slate-100 flex"
									key={contact.id}
								>
									<div className="flex items-center w-full">
										<h2 className="text-lg">{contact.name}</h2>
										<p className="text-gray-400 ml-auto">
											{contact.phone_number}
										</p>
									</div>
								</div>
							);
						})
					) : (
						<h1 className="text-xl text-center mt-5">
							Enter a contact to be added here
						</h1>
					)}
				</div>
			</div>
		</div>
	);
}
