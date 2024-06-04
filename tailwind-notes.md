1. If you parent container has a "display: inline-flex" property or just any other flexbox property, "float: right/left" won't work. Instead, you'll need to use `ml-auto` which would push the content to the right instead.

=> If `ml-auto` isn't working as intended, add `w-full` to the parent div to make sure the div's width is 100%. That may be a contributing factor as to why the element won't move to the end.

2. `justify-start` is used to align items to the left of the container but only will work if it's using `flex`.

3. To horizontally and vertically center text in a div, use the CSS classes: `flex items-center justify-center`

4. If you want to add custom Google Fonts to Tailwind, add the global '@import' CSS font URL to the `index.css` file. Next, in the `tailwind.config.js` file, inside of `theme {...}`, add `extend {...}`. Within that, add `fontFamily: {...}`. It should look something like this:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: { ... }
		}
	},
	plugins: []
};
```

Let's say I'm planning on adding the Google font Kanit. The @import URL looks like this: `@import url("https://fonts.googleapis.com/css2?family=Kanit:wght@300;400&display=swap");` The fontFamily property will be the name of the font. In this case, it's Kanit The key value of the property (Kanit) will be the CSS font-family names. On the website, it gives us:

```css
.kanit-light {
	font-family: "Kanit", sans-serif;
}
```

So the key value will be an array of strings holding "Kanit" and "sans-serif" like so:

```javascript
{
	extend: {
		fontFamily: {
			Kanit: ["Kanit", "sans-serif"];
		}
	}
}
```

And that's it. Still confused? Refer to: https://stackoverflow.com/a/73330858/13215593

5. `m-auto` not aligning content in the center? Make sure to include `flex`
