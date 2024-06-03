/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				"custom-color": "#074973",
				"custom-nav-color": "#032859"
			},
			fontFamily: {
				Kanit: ["Kanit", "sans-serif"]
			}
		}
	},
	plugins: []
};
