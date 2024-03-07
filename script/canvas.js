/** Script del elemento Canva */
window.onload = function iniciar() {
    var elemento = document.getElementById('lienzo');
    var lienzo = elemento.getContext('2d',{willReadFrequently:true});
    var imagenes=['./img/SantaCruzVerde.jpg','./img/pared.avif','./img/urban.webp','./img/container.webp'];
    var indiceImagenActual = 0;

    function cargarImagen(src) {
        return new Promise((resolve, reject) => {
            var imagen = new Image();
            imagen.onload = () => resolve(imagen);
            imagen.onerror = reject;
            imagen.src = src;
        });
    }

    // Funcion que aplica los filtros a las imagenes
    function aplicarFiltro(info, filtro) {
        var pos;
        for (var x = 0; x <= info.width; x++) {
            for (var y = 0; y <= info.height; y++) {
                pos = (info.width * 4 * y) + (x * 4);
                switch (filtro) {
                    case 'negativo':
                        info.data[pos] = 255 - info.data[pos];
                        info.data[pos + 1] = 255 - info.data[pos + 1];
                        info.data[pos + 2] = 255 - info.data[pos + 2];
                        break;
                    case 'bw':
                        var gris = (info.data[pos] + info.data[pos + 1] + info.data[pos + 2]) / 3;
                        info.data[pos] = info.data[pos + 1] = info.data[pos + 2] = gris < 140 ? 0 : 255;
                        break;
                    case 'gris':
                        var gris = (info.data[pos] + info.data[pos + 1] + info.data[pos + 2]) / 3;
                        info.data[pos] = info.data[pos + 1] = info.data[pos + 2] = gris;
                        break;
                    case 'sepia':
                        var gris = (info.data[pos] + info.data[pos + 1] + info.data[pos + 2]) / 3;
                        info.data[pos] = gris + 100;
                        info.data[pos + 1] = gris + 50;
                        info.data[pos + 2] = gris;
                        break;
                    default:
                        break;
                }
            }
        }
        return info;
    }

    function dibujarImagen(imagen) {
        lienzo.clearRect(0, 0, elemento.width, elemento.height);
        lienzo.drawImage(imagen, 0, 0, elemento.width, elemento.height);
    }
    
    function aplicarFiltroYDibujar(filtro) {
        var info = lienzo.getImageData(0, 0, elemento.width, elemento.height);
        info = aplicarFiltro(info, filtro);
        lienzo.putImageData(info, 0, 0);
    }
    
    function siguienteImagen() {
        cargarImagen(imagenes[indiceImagenActual])
            .then(imagen => {
                var filtros = ['negativo', 'bw', 'gris', 'sepia', ''];
                dibujarImagen(imagen);
    
                // 2 segundos de espera antes de aplicar el filtro
                setTimeout(() => {
                    aplicarFiltroYDibujar(filtros[indiceImagenActual]);
                }, 2000); 
    
                // Actualizar el boton que indica la imagen
                var puntos = document.querySelectorAll('.punto');
                puntos.forEach((punto, index) => {
                    punto.classList.remove('activo');
                    if (index === indiceImagenActual) {
                        punto.classList.add('activo');
                    }
                });
    
                indiceImagenActual = (indiceImagenActual + 1) % imagenes.length;
            })
            .catch(error => console.error(error));
    }
    
    setInterval(siguienteImagen, 6000);
    siguienteImagen();}