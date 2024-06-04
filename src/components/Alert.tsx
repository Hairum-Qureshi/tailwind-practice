import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactNode } from "react";

interface Props {
	isError: boolean;
	icon: string;
	message: string;
	// children: ReactNode;
}

export default function Alert({ isError, icon, message }: Props) {
	return (
		<div
			className={`w-full box-border bg-red-600 p-2 rounded-md relative z-10 border-2 text-white border-red-600 -top-3`}
		>
			<div className="flex items-center">
				<FontAwesomeIcon icon={faCircleExclamation} />
				<p className="ml-2">Warning Here</p>
			</div>
		</div>
	);
}
