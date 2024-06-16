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
			<nav className="bg-custom-nav-color w-full p-5 text-white flex items-center justify-center lg:justify-start">
				<div className="inline-flex w-full box-border items-center">
					<h1 className="text-2xl font-Kanit">
						<Link to="/">Tracker Site</Link>
					</h1>
					<div className="lg:justify-start lg:block hidden ml-auto">
						<ul className="flex items-center text-lg">
							<li className="ml-4">
								<Link to="/time-tracker">Time Tracker</Link>
							</li>
							<li className="ml-4">
								<Link to="/to-dos">Todo List</Link>
							</li>
							<li className="ml-4">
								<Link to="/contacts">Contacts</Link>
							</li>
							<li className="ml-4">
								<Link to="/finances">Money Tracker</Link>
							</li>
						</ul>
					</div>
				</div>
				<div
					className="ml-auto inline-flex lg:hidden"
					onClick={() => setShowHamburgerMenu(!showHamburgerMenu)}
				>
					{!showHamburgerMenu ? (
						<FontAwesomeIcon
							icon={faBars}
							className="ml-auto text-xl hover:cursor-pointer"
						/>
					) : (
						<FontAwesomeIcon icon={faX} className="hover:cursor-pointer" />
					)}
				</div>
			</nav>
			{showHamburgerMenu && (
				<div className="w-full h-40 bg-blue-300 lg:hidden lg:z-0 flex items-center justify-left">
					<ul className="text-blue-950 text-xl p-8 space-y-2">
						<li>
							<Link to="/time-tracker">Time Tracker</Link>
						</li>
						<li>
							<Link to="/to-dos">Todo List</Link>
						</li>
						<li>
							<Link to="/contacts">Contacts</Link>
						</li>
						<li>
							<Link to="/finances">Finances</Link>
						</li>
					</ul>
				</div>
			)}
		</div>
	);
}
