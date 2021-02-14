const formulario = document.querySelector('#formulario');
const resultado = document.querySelector('#resultado');
const paginacionDiv = document.querySelector('#paginacion');

const registroPorPagina = 30;
let totalPaginas;
let iterador;
let paginaActual = 1;

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

	buscarImagenes();
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

function buscarImagenes() {
	const termino = document.querySelector('#termino').value;
	const key = '1362366-2f4384e21f5db730c4eefbb59';
	const url = `https://pixabay.com/api/?key=${key}&q=${termino}&per_page=${registroPorPagina}&page=${paginaActual}`;

	fetch(url)
		.then((respuesta) => respuesta.json())
		.then((resultado) => {
			totalPaginas = calcularPaginas(resultado.totalHits);
			//console.log('total paginas' + totalPaginas);
			mostrarImagenes(resultado.hits);
		});
}
// generador
function* crearPaginador(total) {
	console.log('paginador total ' + total);

	for (let i = 1; i <= total; i++) {
		//console.log(i);

		yield i;
	}
}

function calcularPaginas(total) {
	return parseInt(Math.ceil(total / registroPorPagina));
}

function mostrarImagenes(imagenes) {
	while (resultado.firstChild) {
		resultado.removeChild(resultado.firstChild);
	}

	imagenes.forEach((imagen) => {
		const { previewURL, likes, views, largeImageURL } = imagen;
		resultado.innerHTML += `
        <div class='w-1/2 md:w1/3 lg:w-1/4 p-3 mb-4'>
            <div class="bg-white">
              <img class='w-full'src='${previewURL}'>
            <div class='p-4'>
				<p class='font-bold'> ${likes}<span class='font-light'> Me gusta </span> </p>
				<p class='font-bold'> ${views}<span class='font-light'> Veces vista </span> </p>
				<a class='block w-full bg-blue-800 hover:bg-blue-500 text-white uppercase font-bold text-center rounded mt-5 p-1' href='${largeImageURL}' target='_blank' rel='noopener noreferrer'> Ver imágen </a>
			</div>
            </div>
        </div>
        `;
	});

	//limpiar el paginador previo
	while (paginacionDiv.firstChild) {
		paginacionDiv.removeChild(paginacionDiv.firstChild);
	}

	imprimirPaginador();
	//probar poner aca todo el codigo de imprimir generador
}

function imprimirPaginador() {
	iterador = crearPaginador(totalPaginas);

	while (true) {
		const { value, done } = iterador.next();
		if (done) return;
		const boton = document.createElement('a');
		boton.href = '#';
		boton.dataset.pagina = value;
		boton.textContent = value;
		boton.classList.add(
			'siguiente',
			'mb-4',
			'bg-yellow-400',
			'px-4',
			'py-1',
			'mr-2',
			'font-bold',
			'rounded'
		);

		boton.onclick = () => {
			paginaActual = value;
			//console.log(paginaActual);
			buscarImagenes();
		};

		paginacionDiv.appendChild(boton);
	}
}
