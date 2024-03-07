/** Script de la animación del logo**/
document.addEventListener('DOMContentLoaded', function () {

    var svg = document.querySelector('#bielas');
    var bbox = svg.getBBox();
    var centerX = bbox.x + bbox.width / 2;
    var centerY = bbox.y + bbox.height / 2;

    var svg = document.querySelector('#textoLogo');
    var bbox = svg.getBBox();
    var centerX2 = bbox.x + bbox.width / 2;
    var centerY2 = bbox.y + bbox.height / 2;

    console.log('Centro del SVG:', centerX, centerY);
    console.log('Centro del SVG:', centerX2, centerY2);

    var animacionBielas = anime({
        targets: '#bielas',
        rotate: '1turn',
        duration: 5000,
        transformOrigin: '133.95273780822754 74.04529190063477',
        complete: function (anim) {
            animacionTexto.restart();
        }
    });

    var animacionTexto = anime({
        targets: '#textoLogo',
        rotate: '1turn',
        duration: 5000,
        transformOrigin: '116.63431167602539 133.08849620819092',
        complete: function (anim) {
            animacionBielas.restart();
        }
    })
});