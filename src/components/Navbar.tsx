import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faX } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function Navbar() {
	const [showHamburgerMenu, setShowHamburgerMenu] = useState(false);

	return (
		<div
			className={`w-full h-screen absolute ${
				!showHamburgerMenu ? "z-0" : "z-10"
			}`}
		>
			<nav className="bg-custom-nav-color w-full p-5 text-white flex items-center justify-center">
				<div className="text-2xl">
					<h1>
						<Link to="/">Tracker</Link>
					</h1>
				</div>
				<div
					className="ml-auto inline-flex lg:hidden"
					onClick={() => setShowHamburgerMenu(!showHamburgerMenu)}
				>
					{!showHamburgerMenu ? (
						<FontAwesomeIcon icon={faBars} className="ml-auto text-xl" />
					) : (
						<FontAwesomeIcon icon={faX} />
					)}
				</div>
			</nav>
			{showHamburgerMenu && (
				<div className="w-full h-40 bg-blue-300 lg:hidden lg:z-0  flex items-center justify-left">
					<ul className="text-blue-950 text-2xl p-8">
						<li>
							<Link to="#">Time Tracker</Link>
						</li>
						<li className="mt-2">
							<Link to="#">Todo List</Link>
						</li>
						<li className="mt-2">
							<Link to="#">Contacts</Link>
						</li>
					</ul>
				</div>
			)}
		</div>
	);
}
