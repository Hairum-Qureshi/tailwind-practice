import { useState } from "react";

export default function MoneyTracker() {
	// TODO - add an option for the user to enter their budget/paycheck
	// TODO - add an option for the user to provide how much of their provided budget/paycheck they plan to use
	//      -> From that, subtract from their budget/paycheck and sum up their overall expenses

	const [inputValue, setInputValue] = useState("");

	return (
		<div className="p-8 text-sky-950 absolute lg:relative top-16 w-full m-auto lg:w-5/6">
			<div className="border-2 rounded-md border-red-600 bg-red-200 p-2 mt-1 mb-4">
				<h3 className="font-semibold text-xl">Disclaimer:</h3>
				<p>
					Please note that your data will remain saved unless you explicitly
					clear your cache. Please do not use this as your personal and
					permanent finance tracker because there's no absolute guarantee your
					data will stay saved permanently and you <b>will</b> lose all your
					work! This tracker should only be used as a temporary tool to help you
					keep track of your spending!
				</p>
			</div>
			<h2 className="text-center lg:text-left text-2xl font-semibold lg:text-3xl">
				Track Your Finances!
			</h2>
			<div className="lg:flex">
				<div className="lg:w-1/2 h-screen">
					<div className="border-2 border-blue-600 p-2 text-2xl text-right">
						<h1 className="text-3xl">0000</h1>
					</div>
					<div className="w-full">
						<button className="w-1/3 bg-orange-400 p-3 text-2xl">AC</button>
						<button className="w-1/3 bg-slate-300 p-3 text-2xl">%</button>

						<button className="w-1/3 bg-blue-400 p-3 text-2xl">
							BACKSPACE
						</button>
						<button className="w-1/3 bg-slate-300 p-3 text-2xl">sin(x)</button>
						<button className="w-1/3 bg-slate-300 p-3 text-2xl">cos(x)</button>
						<button className="w-1/3 bg-slate-300 p-3 text-2xl">tan(x)</button>
						<button className="w-1/3 bg-slate-300 p-3 text-2xl">PI</button>
						<button className="w-1/3 bg-slate-300 p-3 text-2xl">e</button>
						<button className="w-1/3 bg-slate-300 p-3 text-2xl">(</button>
						<button className="w-1/3 bg-slate-300 p-3 text-2xl">)</button>
						<button className="w-1/3 bg-slate-300 p-3 text-2xl">SQRT</button>
						<button className="w-1/3 bg-slate-300 p-3 text-2xl">POW</button>
						<button className="w-1/3 bg-slate-300 p-3 text-2xl">1</button>
						<button className="w-1/3 bg-slate-300 p-3 text-2xl">*</button>
						<button className="w-1/3 bg-slate-300 p-3 text-2xl">2</button>
						<button className="w-1/3 bg-slate-300 p-3 text-2xl">3</button>
						<button className="w-1/3 bg-slate-300 p-3 text-2xl">/</button>
						<button className="w-1/3 bg-slate-300 p-3 text-2xl">4</button>
						<button className="w-1/3 bg-slate-300 p-3 text-2xl">5</button>
						<button className="w-1/3 bg-slate-300 p-3 text-2xl">+</button>
						<button className="w-1/3 bg-slate-300 p-3 text-2xl">6</button>
						<button className="w-1/3 bg-slate-300 p-3 text-2xl">-</button>
						<button className="w-1/3 bg-slate-300 p-3 text-2xl">7</button>
						<button className="w-1/3 bg-slate-300 p-3 text-2xl">8</button>
						<button className="w-1/3 bg-slate-300 p-3 text-2xl">9</button>
						<button className="w-1/3 bg-slate-300 p-3 text-2xl">0</button>
						<button className="w-1/3 bg-slate-300 p-3 text-2xl">.</button>
					</div>
				</div>
				<div className="lg:w-1/2 h-screen p-2 border-2 border-black text-center">
					<h2 className="text-2xl font-semibold text-green-600">
						Total Expenses: $00.00
					</h2>
				</div>
			</div>
		</div>
	);
}
