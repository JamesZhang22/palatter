// import { complementColor } from "./complement";

class Colour {
	constructor(hex, element) {
		this.hex = hex;
		this.element = element;
		this.locked = false;
	}

	setHex(hex) {
		this.hex = hex;
		this.element.style.backgroundColor = hex;
		this.element.querySelector(".colour-input").value = hex;
	}

	setLocked(locked) {
		this.locked = locked;

		if (locked) {
			this.element
				.querySelector(".lock-toggle")
				.classList.add("is-locked");

			this.element
				.querySelector("img")
				.src = "icons/lock-closed.svg";
		} else {
			this.element
				.querySelector(".lock-toggle")
				.classList.remove("is-locked");

			this.element
				.querySelector("img")
				.src = "icons/lock-open.svg";
		}
	}

	toggleLocked() {
		this.setLocked(!this.locked);
	}

	complementryRGBColor(r, g, b) {
		if (Math.max(r, g, b) == Math.min(r, g, b)) {
			return [255 - r, 255 - g, 255 - b];
	
		} else {
			r /= 255, g /= 255, b /= 255;
			var max = Math.max(r, g, b), min = Math.min(r, g, b);
			var h, s, l = (max + min) / 2;
			var d = max - min;
			s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
		
			switch (max) {
				case r: h = (g - b) / d + (g < b ? 6 : 0); break;
				case g: h = (b - r) / d + 2; break;
				case b: h = (r - g) / d + 4; break;
			}
		
			h = Math.round((h*60) + 180) % 360;
			h /= 360;
			
			function hue2rgb(p, q, t) {
				if (t < 0) t += 1;
				if (t > 1) t -= 1;
				if (t < 1/6) return p + (q - p) * 6 * t;
				if (t < 1/2) return q;
				if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
				return p;
			}
		
			var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
			var p = 2 * l - q;
		
			r = hue2rgb(p, q, h + 1/3);
			g = hue2rgb(p, q, h);
			b = hue2rgb(p, q, h - 1/3);
	
			return [Math.round(r*255), Math.round(g*255), Math.round(b*255)];
		}
	}

	generateHex() {
		if (this.locked) {
			return
		}
		
		const chars = "0123456789ABCDEF";
		let color = "#";
		for (let i = 0; i < 6; i++) {
			color += chars[Math.floor(Math.random() * 16)];
		}
		
		this.setHex(color);
	}

    // generateCompHex(hex) {
    //     if (this.locked) {
	// 		return
	// 	}

	// 	let r = hex.length == 4 ? parseInt(hex[1] + hex[1], 16) : parseInt(hex.slice(1, 3), 16);
	// 	let g = hex.length == 4 ? parseInt(hex[2] + hex[2], 16) : parseInt(hex.slice(3, 5), 16);
	// 	let b = hex.length == 4 ? parseInt(hex[3] + hex[3], 16) : parseInt(hex.slice(5), 16);
	
	// 	[r, g, b] = this.complementryRGBColor(r, g, b);
	// 	let color = '#' + (r < 16 ? '0' + r.toString(16) : r.toString(16)) + (g < 16 ? '0' + g.toString(16) : g.toString(16)) + (b < 16 ? '0' + b.toString(16) : b.toString(16));
	// 	this.setHex(color);
    // }

	copyToClipboard() {
		const input = this.element.querySelector(".colour-input");
		input.select();
		document.execCommand("copy");
		input.blur();
		this.element.classList.add("copied");
		setTimeout(() => {
			this.element.classList.remove("copied");
		}, 1000);
	}
}

const colour_elements = document.querySelectorAll('.colours .colour');

const colours = [];

const comp_colour_elements = document.querySelectorAll('.comp-colours .comp-colour');

const comp_colours = [];

for (let i = 0; i < colour_elements.length; i++) {
	const colour_element = colour_elements[i];

	const input = colour_element.querySelector(".colour-input");
	const lock_toggle = colour_element.querySelector(".lock-toggle");
	const copy_btn = colour_element.querySelector(".copy-hex");

	const hex = input.value;

	const colour = new Colour(hex, colour_element);

	input.addEventListener('input', (e) => colour.setHex(e.target.value));
	lock_toggle.addEventListener('click', () => colour.toggleLocked());
	copy_btn.addEventListener('click', () => colour.copyToClipboard());

	colour.generateHex();
	colours.push(colour);
}

// for (let i = 0; i < comp_colour_elements.length; i++) {
// 	const comp_colour_element = comp_colour_elements[i];

// 	const comp_input = comp_colour_element.querySelector(".colour-input");
// 	const comp_copy_btn = comp_colour_element.querySelector(".copy-hex");

// 	const comp_hex = comp_input.value;

// 	const comp_colour = new Colour("#86D928", comp_colour_element);

// 	comp_input.addEventListener('input', (e) => comp_colour.setHex(e.target.value));
// 	comp_copy_btn.addEventListener('click', () => comp_colour.copyToClipboard());

// 	comp_colour.generateCompHex("#86D928");
// 	comp_colours.push(comp_colour);
// }

document.querySelector(".generator-button").addEventListener("click", () => {
	for (let i = 0; i < colours.length; i++) {
		colours[i].generateHex();
	}
});

document.addEventListener('keypress', (e) => {
	if (e.code.toLowerCase() === "space") {
		document.querySelector(".generator-button").click();
	}
})