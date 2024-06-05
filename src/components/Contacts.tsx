import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import Alert from "./Alert";
import PhoneInput, {
	formatPhoneNumberIntl,
	isPossiblePhoneNumber
} from "react-phone-number-input";
import "react-phone-number-input/style.css";

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
// TODO - need to also check for duplicate contacts

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

		if (isPossiblePhoneNumber(phoneNumber)) {
			if (contactName) {
				if (contacts.length === 0) {
					setContacts([
						{
							id: uuidv4(),
							name: contactName,
							phone_number: formattedPhoneNumber
						}
					]);
					createAlert(false, "Successfully added contact!", 500);
				} else {
					setContacts([
						...contacts,
						{
							id: uuidv4(),
							name: contactName,
							phone_number: formattedPhoneNumber
						}
					]);
					createAlert(false, "Successfully added contact!", 500);
				}
			} else {
				createAlert(true, "Please make sure to provide a contact name", 2000);
			}
		} else {
			createAlert(
				true,
				"Please double check if you have provided a phone number. If you have, check if it's in the correct format",
				2000
			);
		}
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
						onChange={setPhoneNumber}
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
				<h1 className="text-xl">Your Saved Contacts ({contacts.length}):</h1>
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
