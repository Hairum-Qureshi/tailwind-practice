## To install Tailwind CSS with Vite, TypeScript, and React run:

1. `npm create vite@latest`
2. Go through with all the Vite configurations 
3. `cd` into your folder
4. Follow the instructions starting at step 2 to set up and install Tailwind CSS: https://tailwindcss.com/docs/guides/vite

## Facing an issue with the <Link /> component from React-Router-Dom
The `<Link />` component will only work when it's in a React Router Dom `<Router />`/`<Route />` component. Without it, it won't work.

## Basic skeleton to set up routes in React Router Dom:
```javascript
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Navbar from "./Navbar";
import About from "./Todo";
import Contacts from "./Contacts";
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
				<Route path="/contacts" element={<Contacts />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
```