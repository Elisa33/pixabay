const formulario = document.querySelector('#formulario');
const resultado = document.querySelector('#resultado');
const paginacion = document.querySelector('#paginacion');

window.onload = () => {
	formulario.addEventListener('submit', validarFormulario);
};

function validarFormulario(e) {
	e.preventDefault();
	const terminoBusqueda = document.querySelector('#termino').value;

	if (terminoBusqueda === '') {
		mostrarAlerta('Agrega un término de búsqueda');
		return;
	}

	buscarImagenes(terminoBusqueda);
}

function mostrarAlerta(mensaje) {
	const existeAlerta = document.querySelector('.bg-red-200');
	if (!existeAlerta) {
		const alerta = document.createElement('p');
		alerta.textContent = mensaje;
		alerta.classList.add(
			'bg-red-200',
			'text-red-700',
			'border-red-700',
			'max-w-lg',
			'mx-auto',
			'py-3',
			'text-center',
			'mt-6'
		);
		formulario.appendChild(alerta);
		setTimeout(() => {
			alerta.remove();
		}, 3000);
	}
}

function buscarImagenes(termino) {
	const key = '1362366-2f4384e21f5db730c4eefbb59';
	const url = `https://pixabay.com/api/?key=${key}&q=${termino}`;
	console.log(url);

	fetch(url)
		.then((respuesta) => respuesta.json())
		.then((resultado) => {
			mostrarImagenes(resultado.hits);
		});
}
