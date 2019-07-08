(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

var Particle = function () {
    function Particle(x, y) {
        _classCallCheck(this, Particle);

        this.x = x;
        this.y = y;

        this.prevX = x;
        this.prevY = y;

        this.initX = x;
        this.initY = y;

        this.radius = 100;

        this.resetTo();
    }

    _createClass(Particle, [{
        key: 'resetTo',
        value: function resetTo(fromRad) {
            this.fromRad = fromRad;
            this.toRad = this.fromRad + Math.random() * Math.PI * 0.1;

            this.duration = 200;
            this.startTime = new Date().getTime();
            this.fromRadius = 0;
            this.toRadius = 100 + 20 * Math.random();

            this.seedX = parseInt(WIDTH * Math.random());
            this.seedY = parseInt(HEIGHT * Math.random());

            this.x = this.initX;
            this.y = this.initY;
            this.prevX = this.x;
            this.prevY = this.y;
        }
    }, {
        key: 'update',
        value: function update(t, perlin) {
            var startTime = this.startTime,
                duration = this.duration,
                fromRadius = this.fromRadius,
                toRadius = this.toRadius,
                initX = this.initX,
                initY = this.initY,
                toRad = this.toRad,
                fromRad = this.fromRad;

            if (!startTime) return;

            var currTime = new Date().getTime();
            var a = (currTime - startTime) / duration;

            if (a > 1.0) {
                this.resetTo(Math.sin(t * 0.001) * 2 * Math.PI);
            } else {
                var currRad = fromRad + (toRad - fromRad) * a;
                var radius = fromRadius + (fromRadius - toRadius) * a;
                var perlinX = parseInt(this.seedX + Math.sin(t * 0.1) * 0.5);
                var perlinY = parseInt(this.seedY + Math.cos(t * 0.1) * 0.5);
                var perlinRad = perlin.data[(perlinX + perlinY * WIDTH) * 4] / 255. * 10.;

                var x = initX + Math.cos(currRad + perlinRad) * radius;
                var y = initY + Math.sin(currRad + perlinRad) * radius;

                this.prevX = this.x;
                this.prevY = this.y;

                this.x = x;
                this.y = y;
            }
        }
    }, {
        key: 'draw',
        value: function draw(context) {
            var x = this.x,
                y = this.y,
                prevX = this.prevX,
                prevY = this.prevY;


            context.beginPath();
            context.strokeStyle = 'rgba(255, 255, 255, 0.2)';
            context.moveTo(prevX, prevY, 1, 0, 2 * Math.PI);
            context.lineTo(x, y, 1, 0, 2 * Math.PI);
            context.stroke();
        }
    }]);

    return Particle;
}();

var init = function init(perlin) {
    var particles = [];

    for (var i = 0; i < 20; i++) {
        var particle = new Particle(WIDTH * 0.5, HEIGHT * 0.5);
        particles.push(particle);
    }

    var canvas = document.createElement('canvas');
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    document.body.append(canvas);
    var context = canvas.getContext('2d');

    context.fillStyle = '#444';
    context.fillRect(0, 0, WIDTH, HEIGHT);

    function render(t) {

        particles.forEach(function (particle) {
            particle.update(t, perlin);
            particle.draw(context);
        });
        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
};

var perlinImg = new Image();
perlinImg.src = './perlin.png';

perlinImg.onload = function () {
    var c = document.createElement('canvas').getContext('2d');
    c.drawImage(perlinImg, 0, 0, WIDTH, HEIGHT);
    var perlin = c.getImageData(0, 0, WIDTH, HEIGHT);
    init(perlin);
};

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUNDQSxJQUFNLFFBQVEsT0FBZCxVQUFBO0FBQ0EsSUFBTSxTQUFTLE9BQWYsV0FBQTs7SUFFQSxRO0FBQ0ksc0JBQUEsQ0FBQSxFQUFBLENBQUEsRUFBa0I7QUFBQTs7QUFDZCxhQUFBLENBQUEsR0FBQSxDQUFBO0FBQ0EsYUFBQSxDQUFBLEdBQUEsQ0FBQTs7QUFFQSxhQUFBLEtBQUEsR0FBQSxDQUFBO0FBQ0EsYUFBQSxLQUFBLEdBQUEsQ0FBQTs7QUFFQSxhQUFBLEtBQUEsR0FBQSxDQUFBO0FBQ0EsYUFBQSxLQUFBLEdBQUEsQ0FBQTs7QUFFQSxhQUFBLE1BQUEsR0FBQSxHQUFBOztBQUVBLGFBQUEsT0FBQTtBQUNIOzs7O2dDQUVELE8sRUFBaUI7QUFDYixpQkFBQSxPQUFBLEdBQUEsT0FBQTtBQUNBLGlCQUFBLEtBQUEsR0FBYSxLQUFBLE9BQUEsR0FBZSxLQUFBLE1BQUEsS0FBZ0IsS0FBaEIsRUFBQSxHQUE1QixHQUFBOztBQUVBLGlCQUFBLFFBQUEsR0FBQSxHQUFBO0FBQ0EsaUJBQUEsU0FBQSxHQUFrQixJQUFELElBQUMsR0FBbEIsT0FBa0IsRUFBbEI7QUFDQSxpQkFBQSxVQUFBLEdBQUEsQ0FBQTtBQUNBLGlCQUFBLFFBQUEsR0FBZ0IsTUFBTSxLQUFLLEtBQTNCLE1BQTJCLEVBQTNCOztBQUVBLGlCQUFBLEtBQUEsR0FBYSxTQUFTLFFBQVEsS0FBOUIsTUFBOEIsRUFBakIsQ0FBYjtBQUNBLGlCQUFBLEtBQUEsR0FBYSxTQUFTLFNBQVMsS0FBL0IsTUFBK0IsRUFBbEIsQ0FBYjs7QUFFQSxpQkFBQSxDQUFBLEdBQVMsS0FBVCxLQUFBO0FBQ0EsaUJBQUEsQ0FBQSxHQUFTLEtBQVQsS0FBQTtBQUNBLGlCQUFBLEtBQUEsR0FBYSxLQUFiLENBQUE7QUFDQSxpQkFBQSxLQUFBLEdB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QSxNQUFBLEdBQUEsTUFBQTtBQUNBLGFBQUEsSUFBQSxDQUFBLE1BQUEsQ0FBQSxNQUFBO0FBQ0EsUUFBTSxVQUFVLE9BQUEsVUFBQSxDQUFoQixJQUFnQixDQUFoQjs7QUFFQSxZQUFBLFNBQUEsR0FBQSxNQUFBO0FBQ0EsWUFBQSxRQUFBLENBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxLQUFBLEVBQUEsTUFBQTs7QUFFQSxhQUFBLE1BQUEsQ0FBQSxDQUFBLEVBQW1COztBQUdmLGtCQUFBLE9BQUEsQ0FBa0Isb0JBQWM7QUFDNUIscUJBQUEsTUFBQSxDQUFBLENBQUEsRUFBQSxNQUFBO0FBQ0EscUJBQUEsSUFBQSxDQUFBLE9BQUE7QUFGSixTQUFBO0FBSUEsOEJBQUEsTUFBQTtBQUNIOztBQUVELDBCQUFBLE1BQUE7QUEzQkosQ0FBQTs7QUErQkEsSUFBTSxZQUFZLElBQWxCLEtBQWtCLEVBQWxCO0FBQ0EsVUFBQSxHQUFBLEdBQUEsY0FBQTs7QUFFQSxVQUFBLE1BQUEsR0FBbUIsWUFBTTtBQUNyQixRQUFNLElBQUksU0FBQSxhQUFBLENBQUEsUUFBQSxFQUFBLFVBQUEsQ0FBVixJQUFVLENBQVY7QUFDQSxNQUFBLFNBQUEsQ0FBQSxTQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxLQUFBLEVBQUEsTUFBQTtBQUNBLFFBQU0sU0FBUyxFQUFBLFlBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLEtBQUEsRUFBZixNQUFlLENBQWY7QUFDQSxTQUFBLE1BQUE7QUFKSixDQUFBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiXG5jb25zdCBXSURUSCA9IHdpbmRvdy5pbm5lcldpZHRoXG5jb25zdCBIRUlHSFQgPSB3aW5kb3cuaW5uZXJIZWlnaHRcblxuY2xhc3MgUGFydGljbGUge1xuICAgIGNvbnN0cnVjdG9yKHgsIHkpIHtcbiAgICAgICAgdGhpcy54ID0geFxuICAgICAgICB0aGlzLnkgPSB5XG5cbiAgICAgICAgdGhpcy5wcmV2WCA9IHhcbiAgICAgICAgdGhpcy5wcmV2WSA9IHlcblxuICAgICAgICB0aGlzLmluaXRYID0geFxuICAgICAgICB0aGlzLmluaXRZID0geVxuXG4gICAgICAgIHRoaXMucmFkaXVzID0gMTAwXG5cbiAgICAgICAgdGhpcy5yZXNldFRvKClcbiAgICB9XG5cbiAgICByZXNldFRvKGZyb21SYWQpIHtcbiAgICAgICAgdGhpcy5mcm9tUmFkID0gZnJvbVJhZFxuICAgICAgICB0aGlzLnRvUmFkID0gdGhpcy5mcm9tUmFkICsgTWF0aC5yYW5kb20oKSAqIE1hdGguUEkgKiAwLjFcblxuICAgICAgICB0aGlzLmR1cmF0aW9uID0gMjAwXG4gICAgICAgIHRoaXMuc3RhcnRUaW1lID0gKG5ldyBEYXRlKCkpLmdldFRpbWUoKVxuICAgICAgICB0aGlzLmZyb21SYWRpdXMgPSAwXG4gICAgICAgIHRoaXMudG9SYWRpdXMgPSAxMDAgKyAyMCAqIE1hdGgucmFuZG9tKClcblxuICAgICAgICB0aGlzLnNlZWRYID0gcGFyc2VJbnQoV0lEVEggKiBNYXRoLnJhbmRvbSgpKVxuICAgICAgICB0aGlzLnNlZWRZID0gcGFyc2VJbnQoSEVJR0hUICogTWF0aC5yYW5kb20oKSlcblxuICAgICAgICB0aGlzLnggPSB0aGlzLmluaXRYXG4gICAgICAgIHRoaXMueSA9IHRoaXMuaW5pdFlcbiAgICAgICAgdGhpcy5wcmV2WCA9IHRoaXMueFxuICAgICAgICB0aGlzLnByZXZZID0gdGhpcy55XG4gICAgfVxuXG4gICAgdXBkYXRlKHQsIHBlcmxpbikge1xuICAgICAgICBjb25zdCB7IHN0YXJ0VGltZSwgZHVyYXRpb24sIGZyb21SYWRpdXMsIHRvUmFkaXVzLCBpbml0WCwgaW5pdFksIHRvUmFkLCBmcm9tUmFkIH0gPSB0aGlzXG4gICAgICAgIGlmICghc3RhcnRUaW1lKSByZXR1cm5cblxuICAgICAgICBjb25zdCBjdXJyVGltZSA9IChuZXcgRGF0ZSgpKS5nZXRUaW1lKClcbiAgICAgICAgY29uc3QgYSA9IChjdXJyVGltZSAtIHN0YXJ0VGltZSkgLyBkdXJhdGlvblxuXG4gICAgICAgIGlmIChhID4gMS4wKSB7ICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLnJlc2V0VG8oTWF0aC5zaW4odCAqIDAuMDAxKSAqIDIgKiBNYXRoLlBJKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgY3VyclJhZCA9IGZyb21SYWQgKyAodG9SYWQgLSBmcm9tUmFkKSAqIGFcbiAgICAgICAgICAgIGNvbnN0IHJhZGl1cyA9IGZyb21SYWRpdXMgKyAoZnJvbVJhZGl1cyAtIHRvUmFkaXVzKSAqIGFcbiAgICAgICAgICAgIGNvbnN0IHBlcmxpblggPSBwYXJzZUludCgodGhpcy5zZWVkWCArIE1hdGguc2luKHQgKiAwLjEpICogMC41KSlcbiAgICAgICAgICAgIGNvbnN0IHBlcmxpblkgPSBwYXJzZUludCgodGhpcy5zZWVkWSArIE1hdGguY29zKHQgKiAwLjEpICogMC41KSlcbiAgICAgICAgICAgIGNvbnN0IHBlcmxpblJhZCA9IHBlcmxpbi5kYXRhWyhwZXJsaW5YICsgcGVybGluWSAqIFdJRFRIKSAqIDRdIC8gMjU1LiAqIDEwLlxuICAgICAgICAgICAgXG4gICAgICAgICAgICBjb25zdCB4ID0gaW5pdFggKyBNYXRoLmNvcyhjdXJyUmFkICsgcGVybGluUmFkKSAqIHJhZGl1c1xuICAgICAgICAgICAgY29uc3QgeSA9IGluaXRZICsgTWF0aC5zaW4oY3VyclJhZCArIHBlcmxpblJhZCkgKiByYWRpdXNcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5wcmV2WCA9IHRoaXMueFxuICAgICAgICAgICAgdGhpcy5wcmV2WSA9IHRoaXMueVxuICAgIFxuICAgICAgICAgICAgdGhpcy54ID0geFxuICAgICAgICAgICAgdGhpcy55ID0geVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZHJhdyhjb250ZXh0KSB7XG4gICAgICAgIGNvbnN0IHsgeCwgeSwgcHJldlgsIHByZXZZIH0gPSB0aGlzXG5cbiAgICAgICAgXG4gICAgICAgIGNvbnRleHQuYmVnaW5QYXRoKClcbiAgICAgICAgY29udGV4dC5zdHJva2VTdHlsZSA9ICdyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMiknXG4gICAgICAgIGNvbnRleHQubW92ZVRvKHByZXZYLCBwcmV2WSwgMSwgMCwgMiAqIE1hdGguUEkpXG4gICAgICAgIGNvbnRleHQubGluZVRvKHgsIHksIDEsIDAsIDIgKiBNYXRoLlBJKVxuICAgICAgICBjb250ZXh0LnN0cm9rZSgpXG5cbiAgICB9XG59XG5cblxuY29uc3QgaW5pdCA9IChwZXJsaW4pID0+IHtcbiAgICBjb25zdCBwYXJ0aWNsZXMgPSBbXVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAyMDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHBhcnRpY2xlID0gbmV3IFBhcnRpY2xlKFdJRFRIICogMC41LCBIRUlHSFQgKiAwLjUpXG4gICAgICAgIHBhcnRpY2xlcy5wdXNoKHBhcnRpY2xlKVxuICAgIH1cbiAgICBcbiAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKVxuICAgIGNhbnZhcy53aWR0aCA9IFdJRFRIXG4gICAgY2FudmFzLmhlaWdodCA9IEhFSUdIVFxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kKGNhbnZhcylcbiAgICBjb25zdCBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoJzJkJylcbiAgICBcbiAgICBjb250ZXh0LmZpbGxTdHlsZSA9ICcjNDQ0J1xuICAgIGNvbnRleHQuZmlsbFJlY3QoMCwgMCwgV0lEVEgsIEhFSUdIVClcbiAgICBcbiAgICBmdW5jdGlvbiByZW5kZXIodCkge1xuICAgIFxuICAgIFxuICAgICAgICBwYXJ0aWNsZXMuZm9yRWFjaCgocGFydGljbGUpID0+IHtcbiAgICAgICAgICAgIHBhcnRpY2xlLnVwZGF0ZSh0LCBwZXJsaW4pXG4gICAgICAgICAgICBwYXJ0aWNsZS5kcmF3KGNvbnRleHQpXG4gICAgICAgIH0pXG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShyZW5kZXIpXG4gICAgfVxuICAgIFxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShyZW5kZXIpXG4gICAgXG59XG5cbmNvbnN0IHBlcmxpbkltZyA9IG5ldyBJbWFnZSgpXG5wZXJsaW5JbWcuc3JjID0gJy4vcGVybGluLnBuZydcblxucGVybGluSW1nLm9ubG9hZCA9ICgpID0+IHtcbiAgICBjb25zdCBjID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJykuZ2V0Q29udGV4dCgnMmQnKVxuICAgIGMuZHJhd0ltYWdlKHBlcmxpbkltZywgMCwgMCwgV0lEVEgsIEhFSUdIVClcbiAgICBjb25zdCBwZXJsaW4gPSBjLmdldEltYWdlRGF0YSgwLCAwLCBXSURUSCwgSEVJR0hUKVxuICAgIGluaXQocGVybGluKVxufVxuXG4iXX0=
