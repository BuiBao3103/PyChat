/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				primary: {
					DEFAULT: "#00B894",
					100: '#edf8f4',
					200: '#daf1e9',
					300: '#c7eade',
					400: '#b4e3d3',
					500: '#a0dcc8',
					600: '#8cd5be',
					700: '#76ceb3',
					800: '#5dc7a9',
					900: '#3fbf9e',
				},
				"light-gray": "#efeff1",
				"primary-dark" : "#18191a",
				"dark-gray" : "#737373"
			}
		},
		fontFamily: {
			'inter': 'Inter',
			'oleo-script-regular': "Oleo Script Regular",
			'oleo-script-bold': 'Oleo Script Bold'
		}
	},
	plugins: [],
}