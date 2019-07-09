(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

var canvas = document.createElement('canvas');
canvas.width = WIDTH;
canvas.height = HEIGHT;
document.body.appendChild(canvas);
var context = canvas.getContext('2d');

var Particle = function () {
    function Particle(pos, acc, perlin) {
        _classCallCheck(this, Particle);

        this.pos = pos;
        this.acc = acc;
        this.perlin = perlin;
        this.alive = true;
    }

    _createClass(Particle, [{
        key: 'update',
        value: function update() {
            if (!this.alive) return;

            this.prevPos = {
                x: this.pos.x,
                y: this.pos.y
            };

            this.pos.x += this.acc.x;
            this.pos.y += this.acc.y;

            var perlin = this.perlin;

            var i = (parseInt(this.pos.x) + WIDTH * parseInt(this.pos.y)) * 4;
            var deg = (perlin.data[i] / 255. - 0.5) * 2.0;

            var nx = Math.cos(deg * 2 * Math.PI) * 2.0;
            var ny = Math.sin(deg * 2 * Math.PI) * 2.0;

            this.pos.x += nx;
            this.pos.y += ny;

            this.acc.x *= 0.9;
            this.acc.y *= 0.9;

            if (Math.abs(this.acc.x) < 0.2 && Math.abs(this.acc.y) < 0.2) {
                this.alive = false;
            }
        }
    }, {
        key: 'draw',
        value: function draw(context) {
            var pos = this.pos,
                prevPos = this.prevPos;


            if (!prevPos) return;

            for (var a = 0; a < 1.0; a += 0.1) {
                var x = prevPos.x + (pos.x - prevPos.x) * a;
                var y = prevPos.y + (pos.y - prevPos.y) * a;

                context.fillStyle = 'rgba(120, 150, 255, 0.1)';
                context.beginPath();
                context.arc(x, y, 0.2, 0, 2 * Math.PI);
                context.closePath();
                context.fill();
            }
        }
    }]);

    return Particle;
}();

var init = function init(perlin) {
    var particles = [];

    context.globalCompositeOperation = 'lighter';
    context.fillStyle = '#222';
    context.fillRect(0, 0, WIDTH, HEIGHT);

    function render(t) {

        for (var i = 0; i < particles.length; i++) {
            var particle = particles[i];
            particle.update();
            particle.draw(context);
            if (!particle.alive) {
                particles.splice(i, 1);
            }
        }
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);

    var isGenerative = false;
    var prevPos = {
        x: 0, y: 0
    };
    var currPos = {
        x: 0, y: 0
    };

    var startDrawingCallback = function startDrawingCallback(e) {
        isGenerative = true;
        currPos.x = e.clientX;
        currPos.y = e.clientY;
    };
    var drawingCallback = function drawingCallback(e) {
        if (isGenerative) {
            var x = e.clientX;
            var y = e.clientY;
            prevPos.x = currPos.x;
            prevPos.y = currPos.y;

            currPos.x = x;
            currPos.y = y;

            var diff = {
                x: currPos.x - prevPos.x,
                y: currPos.y - prevPos.y
            };
            for (var i = 0; i < particles.length; i++) {
                particles[i].acc.x += diff.x * 0.1;
                particles[i].acc.y += diff.y * 0.1;
            }
            for (var _i = 0; _i < 30; _i++) {
                particles.push(new Particle({
                    x: x + (Math.random() - 0.5) * 2.0 * 3.0,
                    y: y + (Math.random() - 0.5) * 2.0 * 3.0
                }, {
                    x: diff.x * 0.1,
                    y: diff.y * 0.1
                }, perlin));
            }
        }
    };
    var stopDrawingCallback = function stopDrawingCallback(e) {
        isGenerative = false;
    };

    window.addEventListener('mousedown', startDrawingCallback);
    window.addEventListener('mousemove', drawingCallback);
    window.addEventListener('mouseup', stopDrawingCallback);

    window.addEventListener('touchstart', startDrawingCallback);
    window.addEventListener('touchmove', drawingCallback);
    window.addEventListener('touchend', stopDrawingCallback);
};

var perlinImg = new Image();
perlinImg.src = './perlin.png';

perlinImg.onload = function () {
    var canvas = document.createElement('canvas');
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    var c = canvas.getContext('2d');
    c.drawImage(perlinImg, 0, 0, WIDTH, HEIGHT);
    var perlin = c.getImageData(0, 0, WIDTH, HEIGHT);
    init(perlin);
};

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUNDQSxJQUFNLFFBQVEsT0FBZCxVQUFBO0FBQ0EsSUFBTSxTQUFTLE9BQWYsV0FBQTs7QUFFQSxJQUFNLFNBQVMsU0FBQSxhQUFBLENBQWYsUUFBZSxDQUFmO0FBQ0EsT0FBQSxLQUFBLEdBQUEsS0FBQTtBQUNBLE9BQUEsTUFBQSxHQUFBLE1BQUE7QUFDQSxTQUFBLElBQUEsQ0FBQSxXQUFBLENBQUEsTUFBQTtBQUNBLElBQU0sVUFBVSxPQUFBLFVBQUEsQ0FBaEIsSUFBZ0IsQ0FBaEI7O0lBR0EsUTtBQUNJLHNCQUFBLEdBQUEsRUFBQSxHQUFBLEVBQUEsTUFBQSxFQUE4QjtBQUFBOztBQUMxQixhQUFBLEdBQUEsR0FBQSxHQUFBO0FBQ0EsYUFBQSxHQUFBLEdBQUEsR0FBQTtBQUNBLGFBQUEsTUFBQSxHQUFBLE1BQUE7QUFDQSxhQUFBLEtBQUEsR0FBQSxJQUFBO0FBQ0g7Ozs7aUNBRVE7QUFDTCxnQkFBSSxDQUFDLEtBQUwsS0FBQSxFQUFpQjs7QUFFakIsaUJBQUEsT0FBQSxHQUFlO0FBQ1gsbUJBQUcsS0FBQSxHQUFBLENBRFEsQ0FBQTtBQUVYLG1CQUFHLEtBQUEsR0FBQSxDQUFTO0FBRkQsYUFBZjs7QUFLQSxpQkFBQSxHQUFBLENBQUEsQ0FBQSxJQUFjLEtBQUEsR0FBQSxDQUFkLENBQUE7QUFDQSxpQkFBQSxHQUFBLENBQUEsQ0FBQSxJQUFjLEtBQUEsR0FBQSxDQUFkLENBQUE7O0FBRUEsZ0JBQU0sU0FBUyxLQUFmLE1BQUE7O0FBRUEsZ0JBQU0sSUFBSSxDQUFDLFNBQVMsS0FBQSxHQUFBLENBQVQsQ0FBQSxJQUF1QixRQUFRLFNBQVMsS0FBQSxHQUFBLENBQXpDLENBQWdDLENBQWhDLElBQVYsQ0FBQTtBQUNBLGdCQUFNLE1BQU0sQ0FBQyxPQUFBLElBQUEsQ0FBQSxDQUFBLElB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QUFBLG9CQUFBO0FBQ0EsV0FBQSxnQkFBQSxDQUFBLFdBQUEsRUFBQSxlQUFBO0FBQ0EsV0FBQSxnQkFBQSxDQUFBLFVBQUEsRUFBQSxtQkFBQTtBQTFFSixDQUFBOztBQTZFQSxJQUFNLFlBQVksSUFBbEIsS0FBa0IsRUFBbEI7QUFDQSxVQUFBLEdBQUEsR0FBQSxjQUFBOztBQUVBLFVBQUEsTUFBQSxHQUFtQixZQUFNO0FBQ3JCLFFBQU0sU0FBUyxTQUFBLGFBQUEsQ0FBZixRQUFlLENBQWY7QUFDQSxXQUFBLEtBQUEsR0FBQSxLQUFBO0FBQ0EsV0FBQSxNQUFBLEdBQUEsTUFBQTtBQUNBLFFBQU0sSUFBSSxPQUFBLFVBQUEsQ0FBVixJQUFVLENBQVY7QUFDQSxNQUFBLFNBQUEsQ0FBQSxTQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxLQUFBLEVBQUEsTUFBQTtBQUNBLFFBQU0sU0FBUyxFQUFBLFlBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLEtBQUEsRUFBZixNQUFlLENBQWY7QUFDQSxTQUFBLE1BQUE7QUFQSixDQUFBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiXG5jb25zdCBXSURUSCA9IHdpbmRvdy5pbm5lcldpZHRoXG5jb25zdCBIRUlHSFQgPSB3aW5kb3cuaW5uZXJIZWlnaHRcblxuY29uc3QgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJylcbmNhbnZhcy53aWR0aCA9IFdJRFRIXG5jYW52YXMuaGVpZ2h0ID0gSEVJR0hUXG5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNhbnZhcylcbmNvbnN0IGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKVxuXG5cbmNsYXNzIFBhcnRpY2xlIHtcbiAgICBjb25zdHJ1Y3Rvcihwb3MsIGFjYywgcGVybGluKSB7XG4gICAgICAgIHRoaXMucG9zID0gcG9zXG4gICAgICAgIHRoaXMuYWNjID0gYWNjXG4gICAgICAgIHRoaXMucGVybGluID0gcGVybGluXG4gICAgICAgIHRoaXMuYWxpdmUgPSB0cnVlXG4gICAgfVxuXG4gICAgdXBkYXRlKCkge1xuICAgICAgICBpZiAoIXRoaXMuYWxpdmUpIHJldHVyblxuXG4gICAgICAgIHRoaXMucHJldlBvcyA9IHtcbiAgICAgICAgICAgIHg6IHRoaXMucG9zLngsXG4gICAgICAgICAgICB5OiB0aGlzLnBvcy55XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnBvcy54ICs9IHRoaXMuYWNjLnhcbiAgICAgICAgdGhpcy5wb3MueSArPSB0aGlzLmFjYy55ICAgICAgICBcblxuICAgICAgICBjb25zdCBwZXJsaW4gPSB0aGlzLnBlcmxpblxuXG4gICAgICAgIGNvbnN0IGkgPSAocGFyc2VJbnQodGhpcy5wb3MueCkgKyBXSURUSCAqIHBhcnNlSW50KHRoaXMucG9zLnkpKSAqIDRcbiAgICAgICAgY29uc3QgZGVnID0gKHBlcmxpbi5kYXRhW2ldICAvIDI1NS4gLSAwLjUpICogMi4wXG4gICAgICAgIFxuICAgICAgICBjb25zdCBueCA9IE1hdGguY29zKGRlZyAqIDIgKiBNYXRoLlBJKSAqIDIuMFxuICAgICAgICBjb25zdCBueSA9IE1hdGguc2luKGRlZyAqIDIgKiBNYXRoLlBJKSAqIDIuMFxuXG5cbiAgICAgICAgdGhpcy5wb3MueCArPSBueFxuICAgICAgICB0aGlzLnBvcy55ICs9IG55ICAgICAgICBcblxuICAgICAgICB0aGlzLmFjYy54ICo9IDAuOVxuICAgICAgICB0aGlzLmFjYy55ICo9IDAuOVxuXG4gICAgICAgIGlmIChNYXRoLmFicyh0aGlzLmFjYy54KSA8IDAuMiAmJiBNYXRoLmFicyh0aGlzLmFjYy55KSA8IDAuMikge1xuICAgICAgICAgICAgdGhpcy5hbGl2ZSA9IGZhbHNlXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkcmF3KGNvbnRleHQpIHtcbiAgICAgICAgY29uc3QgeyBwb3MsIHByZXZQb3MgfSA9IHRoaXNcbiAgICAgICAgXG4gICAgICAgIGlmKCFwcmV2UG9zKSByZXR1cm5cblxuICAgICAgICBmb3IobGV0IGEgPSAwOyBhIDwgMS4wOyBhICs9IDAuMSkge1xuICAgICAgICAgICAgY29uc3QgeCA9IHByZXZQb3MueCArIChwb3MueCAtIHByZXZQb3MueCkgKiBhXG4gICAgICAgICAgICBjb25zdCB5ID0gcHJldlBvcy55ICsgKHBvcy55IC0gcHJldlBvcy55KSAqIGFcblxuICAgICAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSAncmdiYSgxMjAsIDE1MCwgMjU1LCAwLjEpJ1xuICAgICAgICAgICAgY29udGV4dC5iZWdpblBhdGgoKVxuICAgICAgICAgICAgY29udGV4dC5hcmMoeCwgeSwgMC4yLCAwLCAyICogTWF0aC5QSSlcbiAgICAgICAgICAgIGNvbnRleHQuY2xvc2VQYXRoKClcbiAgICAgICAgICAgIGNvbnRleHQuZmlsbCgpXG4gICAgICAgIH1cbiAgICB9ICAgIFxufVxuXG5jb25zdCBpbml0ID0gKHBlcmxpbikgPT4ge1xuICAgIGNvbnN0IHBhcnRpY2xlcyA9IFtdIFxuXG4gICAgY29udGV4dC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSAnbGlnaHRlcidcbiAgICBjb250ZXh0LmZpbGxTdHlsZSA9ICcjMjIyJ1xuICAgIGNvbnRleHQuZmlsbFJlY3QoMCwgMCwgV0lEVEgsIEhFSUdIVClcblxuICAgIGZ1bmN0aW9uIHJlbmRlcih0KSB7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXJ0aWNsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHBhcnRpY2xlID0gcGFydGljbGVzW2ldXG4gICAgICAgICAgICBwYXJ0aWNsZS51cGRhdGUoKVxuICAgICAgICAgICAgcGFydGljbGUuZHJhdyhjb250ZXh0KVxuICAgICAgICAgICAgaWYgKCFwYXJ0aWNsZS5hbGl2ZSkge1xuICAgICAgICAgICAgICAgIHBhcnRpY2xlcy5zcGxpY2UoaSwgMSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVuZGVyKVxuICAgIH1cbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVuZGVyKVxuXG4gICAgbGV0IGlzR2VuZXJhdGl2ZSA9IGZhbHNlXG4gICAgbGV0IHByZXZQb3MgPSB7XG4gICAgICAgIHg6MCwgeTowXG4gICAgfVxuICAgIGxldCBjdXJyUG9zID0ge1xuICAgICAgICB4OjAsIHk6MFxuICAgIH1cblxuICAgIGNvbnN0IHN0YXJ0RHJhd2luZ0NhbGxiYWNrID0gKGUpID0+IHtcbiAgICAgICAgaXNHZW5lcmF0aXZlID0gdHJ1ZVxuICAgICAgICBjdXJyUG9zLnggPSBlLmNsaWVudFhcbiAgICAgICAgY3VyclBvcy55ID0gZS5jbGllbnRZXG4gICAgfVxuICAgIGNvbnN0IGRyYXdpbmdDYWxsYmFjayA9IChlKSA9PiB7XG4gICAgICAgIGlmIChpc0dlbmVyYXRpdmUpIHtcbiAgICAgICAgICAgIGNvbnN0IHggPSBlLmNsaWVudFhcbiAgICAgICAgICAgIGNvbnN0IHkgPSBlLmNsaWVudFlcbiAgICAgICAgICAgIHByZXZQb3MueCA9IGN1cnJQb3MueFxuICAgICAgICAgICAgcHJldlBvcy55ID0gY3VyclBvcy55XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGN1cnJQb3MueCA9IHhcbiAgICAgICAgICAgIGN1cnJQb3MueSA9IHlcblxuICAgICAgICAgICAgY29uc3QgZGlmZiA9IHtcbiAgICAgICAgICAgICAgICB4OiAoY3VyclBvcy54IC0gcHJldlBvcy54KSxcbiAgICAgICAgICAgICAgICB5OiAoY3VyclBvcy55IC0gcHJldlBvcy55KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXJ0aWNsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBwYXJ0aWNsZXNbaV0uYWNjLnggKz0gZGlmZi54ICogMC4xXG4gICAgICAgICAgICAgICAgcGFydGljbGVzW2ldLmFjYy55ICs9IGRpZmYueSAqIDAuMSAgICAgICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzA7IGkrKykge1xuICAgICAgICAgICAgICAgIHBhcnRpY2xlcy5wdXNoKG5ldyBQYXJ0aWNsZSh7XG4gICAgICAgICAgICAgICAgICAgIHg6IHggKyAoTWF0aC5yYW5kb20oKSAtIDAuNSkgKiAyLjAgKiAzLjAsXG4gICAgICAgICAgICAgICAgICAgIHk6IHkgKyAoTWF0aC5yYW5kb20oKSAtIDAuNSkgKiAyLjAgKiAzLjBcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHg6IGRpZmYueCAqIDAuMSxcbiAgICAgICAgICAgICAgICAgICAgeTogZGlmZi55ICogMC4xXG4gICAgICAgICAgICAgICAgfSwgcGVybGluKSkgICAgXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBzdG9wRHJhd2luZ0NhbGxiYWNrID0gKGUpID0+IHtcbiAgICAgICAgaXNHZW5lcmF0aXZlID0gZmFsc2VcbiAgICB9XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgc3RhcnREcmF3aW5nQ2FsbGJhY2spXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGRyYXdpbmdDYWxsYmFjaylcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHN0b3BEcmF3aW5nQ2FsbGJhY2spXG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHN0YXJ0RHJhd2luZ0NhbGxiYWNrKVxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBkcmF3aW5nQ2FsbGJhY2spXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgc3RvcERyYXdpbmdDYWxsYmFjaylcbn1cblxuY29uc3QgcGVybGluSW1nID0gbmV3IEltYWdlKClcbnBlcmxpbkltZy5zcmMgPSAnLi9wZXJsaW4ucG5nJ1xuXG5wZXJsaW5JbWcub25sb2FkID0gKCkgPT4ge1xuICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpXG4gICAgY2FudmFzLndpZHRoID0gV0lEVEhcbiAgICBjYW52YXMuaGVpZ2h0ID0gSEVJR0hUXG4gICAgY29uc3QgYyA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpXG4gICAgYy5kcmF3SW1hZ2UocGVybGluSW1nLCAwLCAwLCBXSURUSCwgSEVJR0hUKVxuICAgIGNvbnN0IHBlcmxpbiA9IGMuZ2V0SW1hZ2VEYXRhKDAsIDAsIFdJRFRILCBIRUlHSFQpXG4gICAgaW5pdChwZXJsaW4pXG59XG4iXX0=
