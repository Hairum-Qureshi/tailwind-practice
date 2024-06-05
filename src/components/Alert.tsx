import {
	faCheck,
	faCircleExclamation
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AlertContent as Props } from "./Contacts";

export default function Alert({ alertContent }: Props) {
	return !alertContent.isError ? (
		<div className="w-full box-border bg-green-600 p-2 rounded-md relative z-10 border-2 text-white border-green-800 -top-3">
			<div className="flex items-center">
				<FontAwesomeIcon icon={faCheck} />
				<p className="ml-2">{alertContent.message}</p>
			</div>
		</div>
	) : (
		<div className="w-full box-border bg-red-600 p-2 rounded-md relative z-10 border-2 text-white border-red-800 -top-3">
			<div className="flex items-center">
				<FontAwesomeIcon icon={faCircleExclamation} />
				<p className="ml-2">{alertContent.message}</p>
			</div>
		</div>
	);
}
