document.addEventListener('DOMContentLoaded', () => {
	const themeToggle = document.getElementById('theme-toggle');
	const themeIcon = document.getElementById('theme-icon');
	const body = document.body;

	const savedTheme = localStorage.getItem('theme');
	if (savedTheme) {
		body.classList.add(savedTheme);
		themeIcon.classList.toggle('fa-sun', savedTheme === 'dark-theme');
		themeIcon.classList.toggle('fa-moon', savedTheme !== 'dark-theme');
	} else {
		body.classList.add('light-theme');
		localStorage.setItem('theme', 'light-theme');
	}

	themeToggle.addEventListener('click', () => {
		const isDark = body.classList.toggle('dark-theme');
		body.classList.toggle('light-theme', !isDark);
		themeIcon.classList.toggle('fa-sun', isDark);
		themeIcon.classList.toggle('fa-moon', !isDark);

		const projectCards = document.querySelectorAll('.card-proyect');
		projectCards.forEach((card) => {
			if (isDark) {
				card.classList.remove('light-theme-card');
			} else {
				card.classList.add('light-theme-card');
			}
		});

		localStorage.setItem('theme', isDark ? 'dark-theme' : 'light-theme');
	});

	const hamburger = document.getElementById('hamburger');
	const menu = document.getElementById('menu');

	hamburger.addEventListener('click', () => {
		menu.classList.toggle('hidden');
	});

	const sections = document.querySelectorAll('section');
	const observerOptions = {
		root: null,
		rootMargin: '0px',
		threshold: 0.1,
	};

	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add('visible');
				observer.unobserve(entry.target);
			}
		});
	}, observerOptions);

	sections.forEach((section) => {
		observer.observe(section);
	});
});

function cambiarIdioma(idioma) {
	const elementosTraducibles = document.querySelectorAll('[data-i18n]');
	elementosTraducibles.forEach((elemento) => {
		elemento.textContent =
			traducciones[idioma][elemento.dataset.i18n] || elemento.textContent;
	});
}

const btn = document.getElementById('button');

document.getElementById('form').addEventListener('submit', function (event) {
	event.preventDefault();

	btn.value = 'Sending...';

	const serviceID = 'default_service';
	const templateID = 'template_8faoa8r';

	emailjs.sendForm(serviceID, templateID, this).then(
		() => {
			btn.value = 'Send Email';
			alert('Sent!');
		},
		(err) => {
			btn.value = 'Send Email';
			alert(JSON.stringify(err));
		},
	);
});
