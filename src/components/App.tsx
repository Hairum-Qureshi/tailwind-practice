import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Navbar from "./Navbar";
import About from "./Todo";
import Contact from "./Contact";
import "../css/App.css";
import NotFound from "./NotFound";
import TimeTracker from "./TimeTracker";

function App() {
	return (
		<BrowserRouter>
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/time-tracker" element={<TimeTracker />} />
				<Route path="/to-dos" element={<About />} />
				<Route path="/contacts" element={<Contact />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;