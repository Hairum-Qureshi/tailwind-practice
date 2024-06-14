import { v4 as uuidv4 } from "uuid";
import { useMemo, useState } from "react";
import Alert from "./Alert";
import PhoneInput, {
	formatPhoneNumberIntl,
	isPossiblePhoneNumber
} from "react-phone-number-input";
import "react-phone-number-input/style.css";
import {
	faCopy,
	faPenToSquare,
	faTrash
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Contact {
	id: string;
	name: string;
	phone_number: string;
}

// TODO - add an edit and delete button -> when the user presses edit, populate the form fields with that contact's details
// TODO - save to local storage
// TODO - add hover and active classes to buttons
// TODO - consider adding pagination as well for the contacts

export interface AlertContent {
	isError: boolean;
	message: string;
}

export default function Contacts() {
	const [contacts, setContacts] = useState<Contact[]>([]);
	const [contactName, setContactName] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [showAlert, setShowAlert] = useState(false);
	const [alertContent, setAlertContent] = useState<AlertContent>({
		isError: false,
		message: ""
	});
	const [searchPhrase, setSearchPhrase] = useState("");
	const [editMode, setEditMode] = useState(false);
	const [contactID, setContactID] = useState("");

	function createAlert(isAnError: boolean, message: string, duration: number) {
		setAlertContent({
			isError: isAnError,
			message
		});
		setShowAlert(true);
		setTimeout(() => {
			setShowAlert(false);
		}, duration);
	}

	function addContact() {
		let formattedPhoneNumber: string = formatPhoneNumberIntl(phoneNumber);
		let area_code: string = formattedPhoneNumber.substring(3, 6);
		const modifiedAreaCode: string = `(${area_code})`;
		formattedPhoneNumber = formattedPhoneNumber.replace(
			area_code,
			modifiedAreaCode
		);

		if (!isPossiblePhoneNumber(phoneNumber) && !contactName) {
			createAlert(true, "Please provide a phone number and contact name", 2000);
		}
		if (isPossiblePhoneNumber(phoneNumber)) {
			if (contactName) {
				const new_contact: Contact = {
					id: uuidv4(),
					name: contactName,
					phone_number: formattedPhoneNumber
				};

				if (contacts.length === 0) {
					setContacts([new_contact]);
					createAlert(false, "Successfully added contact!", 500);
					setContactName("");
					setPhoneNumber("");
				} else {
					let formattedPhoneNumber: string = formatPhoneNumberIntl(phoneNumber);
					let area_code: string = formattedPhoneNumber.substring(3, 6);
					const modifiedAreaCode: string = `(${area_code})`;
					formattedPhoneNumber = formattedPhoneNumber.replace(
						area_code,
						modifiedAreaCode
					);

					const duplicateFound: boolean = contacts.some(
						(contact: Contact) => contact.phone_number === formattedPhoneNumber
					);

					if (!duplicateFound) {
						setContacts([new_contact, ...contacts]);
						createAlert(false, "Successfully added contact!", 500);
						setContactName("");
						setPhoneNumber("");
					} else {
						createAlert(true, "Duplicate phone number found", 1000);
					}
				}
			} else {
				createAlert(true, "Please make sure to provide a contact name", 2000);
			}
		} else {
			createAlert(
				true,
				"Please double check if you have provided a phone number. If you have, check if it's in the correct format: (xxx)-xxx-xxxx",
				2000
			);
		}
	}

	// Search contacts functionality:
	const filteredContacts: Contact[] = useMemo(() => {
		return contacts.filter((contact: Contact) => {
			return contact.name.toLowerCase().includes(searchPhrase.toLowerCase());
		});
	}, [contacts, searchPhrase]);

	function copyContact(contact_name: string, contact_phoneNumber: string) {
		const phoneNumber_dashes: string = contact_phoneNumber.replace(/\s+/g, "-");

		navigator.clipboard.writeText(
			`${contact_name} -> ${phoneNumber_dashes.slice(
				0,
				2
			)} ${phoneNumber_dashes.slice(3, phoneNumber_dashes.length)}`
		);
		createAlert(false, "Copied contact!", 500);
	}

	function deleteContact(contact_id: string, contact_name: string) {
		const confirmation: boolean = confirm(
			`Are you sure you would like to delete the contact: "${contact_name}"?`
		);

		if (confirmation) {
			const new_contacts: Contact[] = contacts.filter(
				(contact: Contact) => contact.id !== contact_id
			);
			setContacts(new_contacts);
		}
	}

	function editContact(contact_id: string, phone_number: string) {
		const contactToUpdate: Contact = contacts.find(
			(contact: Contact) => contact.id === contact_id
		)!;

		setContactID(contact_id);
		setContactName(contactToUpdate.name);
		setPhoneNumber(phone_number);
	}

	function updateContact() {
		// update the addContact function so the code checking if the user provided a contact name and phone number exists/not
		// and so it also clears the inputs upon success

		const foundContact: Contact = contacts.find(
			(contact: Contact) => contact.id === contactID
		)!;

		const updatedContact: Contact = {
			id: foundContact.id,
			name: contactName,
			phone_number: phoneNumber
		};

		setContacts(prevContacts =>
			prevContacts.map(contact =>
				contact.id === foundContact.id ? updatedContact : contact
			)
		);

		setContactName("");
		setPhoneNumber("");

		setEditMode(false);
	}

	return (
		<div className="p-8 text-sky-950 absolute lg:relative top-16 w-full m-auto lg:w-2/3">
			{showAlert && <Alert alertContent={alertContent} />}
			<h2 className="text-2xl font-black font-Kanit lg:text-left text-center">
				ADD YOUR CONTACTS:
			</h2>
			<div className="border-2 border-slate-200 mt-2 p-2 w-full box-border rounded-md bg-slate-100">
				<div>
					<label>Enter new contact's name:</label>
					<input
						type="text"
						placeholder="Name"
						maxLength={50}
						value={contactName}
						className="border-2 border-slate-400 outline-none w-full p-2 rounded"
						onChange={e => setContactName(e.target.value)}
					/>
				</div>
				<div className="mt-4">
					<label>Enter new contact's phone number:</label>
					<PhoneInput
						defaultCountry="US"
						placeholder="(xxx)-xxx-xxxx"
						numberInputProps={{
							className:
								"border-2 border-slate-400 outline-none w-full p-2 rounded"
						}}
						// className="border-2 border-slate-400 outline-none w-full p-2 rounded"
						value={phoneNumber}
						onChange={setPhoneNumber}
					/>
				</div>
				<div className="mt-3">
					{!editMode ? (
						<button
							onClick={() => {
								addContact();
							}}
							className="border-2 rounded border-gray-500 bg-gray-200 p-2 font-Kanit flex m-auto"
						>
							Add Contact
						</button>
					) : (
						<button
							onClick={() => {
								updateContact();
							}}
							className="border-2 rounded border-gray-500 bg-gray-200 p-2 font-Kanit flex m-auto"
						>
							Update Contact
						</button>
					)}
				</div>
			</div>
			<div className="mt-2 p-2 w-full box-border rounded-md">
				<h1 className="text-xl">Your Saved Contacts ({contacts.length}):</h1>
				<input
					type="search"
					placeholder="Search contact by name"
					className="mt-5 border-2 rounded p-2 w-full outline-none"
					onInput={e => {
						setSearchPhrase(e.target.value);
					}}
				/>
				<div>
					{filteredContacts.length > 0 ? (
						filteredContacts.map((contact: Contact) => {
							return (
								<div
									className="w-full box-border border-2 border-gray-200 p-2 mt-5 rounded-md bg-slate-100 flex select-none h-auto"
									key={contact.id}
								>
									<div className="flex flex-col w-full box-border">
										<h2 className="text-xl font-bold">{contact.name}</h2>
										<div className="flex justify-between items-center mt-2">
											<p className="text-gray-400">{`${contact.phone_number
												.replace(/\s+/g, "-")
												.slice(0, 2)} ${contact.phone_number
												.replace(/\s+/g, "-")
												.slice(3, contact.phone_number.length)}`}</p>
											<div className="flex items-center">
												<FontAwesomeIcon
													icon={faTrash}
													className="ml-2 border-2 border-slate-400 rounded bg-red-400 p-1 hover:bg-red-500 text-zinc-100 hover:cursor-pointer active:bg-red-600"
													onClick={() =>
														deleteContact(contact.id, contact.name)
													}
												/>
												<FontAwesomeIcon
													icon={faPenToSquare}
													className="ml-2 border-2 border-slate-400 active:text-white rounded bg-orange-400 p-1 hover:bg-orange-500 hover:cursor-pointer active:bg-orange-600"
													onClick={() => {
														editContact(contact.id, contact.phone_number);
														setEditMode(true);
													}}
												/>
												<FontAwesomeIcon
													icon={faCopy}
													onClick={() =>
														copyContact(contact.name, contact.phone_number)
													}
													className="ml-2 border-2 border-slate-400 rounded bg-blue-400 p-1 hover:bg-blue-500 hover:text-white hover:cursor-pointer active:bg-blue-600"
												/>
											</div>
										</div>
									</div>
								</div>
							);
						})
					) : (
						<h1 className="text-xl text-center mt-5">
							No contact found. Try searching a different name or adding a new
							contact.
						</h1>
					)}
				</div>
			</div>
		</div>
	);
}
