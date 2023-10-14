/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			container: {
				screens: {
					"2xl": "1540px",
					xl: "1279px",
					lg: "1023px",
					md: "767px",
					sm: "639px",
				},
			},
		},
	},
	plugins: [],
};
