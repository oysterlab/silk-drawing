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

            this.pos.x += this.acc.x;
            this.pos.y += this.acc.y;

            var perlin = this.perlin;

            var i = (parseInt(this.pos.x) + WIDTH * parseInt(this.pos.y)) * 4;
            var deg = perlin.data[i] / 255.;

            var nx = Math.cos(deg * 2 * Math.PI) * 2.0;
            var ny = Math.sin(deg * 2 * Math.PI) * 2.0;

            this.pos.x += nx;
            this.pos.y += ny;

            this.acc.x *= 0.95;
            this.acc.y *= 0.95;

            if (Math.abs(this.acc.x) < 0.2 && Math.abs(this.acc.y) < 0.2) {
                this.alive = false;
            }
        }
    }, {
        key: 'draw',
        value: function draw(context) {
            var pos = this.pos;


            context.fillStyle = 'rgba(120, 150, 255, 0.1)';
            context.beginPath();
            context.arc(pos.x, pos.y, 1, 0, 2 * Math.PI);
            context.closePath();
            context.fill();
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
    window.addEventListener('mousedown', function (e) {
        isGenerative = true;
        currPos.x = e.clientX;
        currPos.y = e.clientY;
    });
    window.addEventListener('mousemove', function (e) {
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
            for (var i = 0; i < 20; i++) {
                particles.push(new Particle({
                    x: x + (Math.random() - 0.5) * 2.0 * 10.0,
                    y: y + (Math.random() - 0.5) * 2.0 * 10.0
                }, {
                    x: diff.x * 0.1,
                    y: diff.y * 0.1
                }, perlin));
            }
        }
    });
    window.addEventListener('mouseup', function (e) {
        isGenerative = false;
    });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUNDQSxJQUFNLFFBQVEsT0FBZCxVQUFBO0FBQ0EsSUFBTSxTQUFTLE9BQWYsV0FBQTs7QUFFQSxJQUFNLFNBQVMsU0FBQSxhQUFBLENBQWYsUUFBZSxDQUFmO0FBQ0EsT0FBQSxLQUFBLEdBQUEsS0FBQTtBQUNBLE9BQUEsTUFBQSxHQUFBLE1BQUE7QUFDQSxTQUFBLElBQUEsQ0FBQSxXQUFBLENBQUEsTUFBQTtBQUNBLElBQU0sVUFBVSxPQUFBLFVBQUEsQ0FBaEIsSUFBZ0IsQ0FBaEI7O0lBR0EsUTtBQUNJLHNCQUFBLEdBQUEsRUFBQSxHQUFBLEVBQUEsTUFBQSxFQUE4QjtBQUFBOztBQUMxQixhQUFBLEdBQUEsR0FBQSxHQUFBO0FBQ0EsYUFBQSxHQUFBLEdBQUEsR0FBQTtBQUNBLGFBQUEsTUFBQSxHQUFBLE1BQUE7QUFDQSxhQUFBLEtBQUEsR0FBQSxJQUFBO0FBQ0g7Ozs7aUNBRVE7QUFDTCxnQkFBSSxDQUFDLEtBQUwsS0FBQSxFQUFpQjs7QUFFakIsaUJBQUEsR0FBQSxDQUFBLENBQUEsSUFBYyxLQUFBLEdBQUEsQ0FBZCxDQUFBO0FBQ0EsaUJBQUEsR0FBQSxDQUFBLENBQUEsSUFBYyxLQUFBLEdBQUEsQ0FBZCxDQUFBOztBQUVBLGdCQUFNLFNBQVMsS0FBZixNQUFBOztBQUVBLGdCQUFNLElBQUksQ0FBQyxTQUFTLEtBQUEsR0FBQSxDQUFULENBQUEsSUFBdUIsUUFBUSxTQUFTLEtBQUEsR0FBQSxDQUF6QyxDQUFnQyxDQUFoQyxJQUFWLENBQUE7QUFDQSxnQkFBTSxNQUFNLE9BQUEsSUFBQSxDQUFBLENBQUEsSUFBWixJQUFBOztBQUVBLGdCQUFNLEtBQUssS0FBQSxHQUFBLENBQVMsTUFBQSxDQUFBLEdBQVUsS0FBbkIsRUFBQSxJQUFYLEdBQUE7QUFDQSxnQkFBTSxLQUFLLEtB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R0FBOEI7QUFGYixpQkFBYixFQUdaO0FBQ0MsdUJBQUcsS0FBQSxDQUFBLEdBREosR0FBQTtBQUVDLHVCQUFHLEtBQUEsQ0FBQSxHQUFTO0FBRmIsaUJBSFksRUFBZixNQUFlLENBQWY7QUFPSDtBQUVKO0FBeEJMLEtBQUE7QUEwQkEsV0FBQSxnQkFBQSxDQUFBLFNBQUEsRUFBbUMsYUFBTztBQUN0Qyx1QkFBQSxLQUFBO0FBREosS0FBQTtBQTNESixDQUFBOztBQWdFQSxJQUFNLFlBQVksSUFBbEIsS0FBa0IsRUFBbEI7QUFDQSxVQUFBLEdBQUEsR0FBQSxjQUFBOztBQUVBLFVBQUEsTUFBQSxHQUFtQixZQUFNO0FBQ3JCLFFBQU0sU0FBUyxTQUFBLGFBQUEsQ0FBZixRQUFlLENBQWY7QUFDQSxXQUFBLEtBQUEsR0FBQSxLQUFBO0FBQ0EsV0FBQSxNQUFBLEdBQUEsTUFBQTtBQUNBLFFBQU0sSUFBSSxPQUFBLFVBQUEsQ0FBVixJQUFVLENBQVY7QUFDQSxNQUFBLFNBQUEsQ0FBQSxTQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxLQUFBLEVBQUEsTUFBQTtBQUNBLFFBQU0sU0FBUyxFQUFBLFlBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLEtBQUEsRUFBZixNQUFlLENBQWY7QUFDQSxTQUFBLE1BQUE7QUFQSixDQUFBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiXG5jb25zdCBXSURUSCA9IHdpbmRvdy5pbm5lcldpZHRoXG5jb25zdCBIRUlHSFQgPSB3aW5kb3cuaW5uZXJIZWlnaHRcblxuY29uc3QgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJylcbmNhbnZhcy53aWR0aCA9IFdJRFRIXG5jYW52YXMuaGVpZ2h0ID0gSEVJR0hUXG5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNhbnZhcylcbmNvbnN0IGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKVxuXG5cbmNsYXNzIFBhcnRpY2xlIHtcbiAgICBjb25zdHJ1Y3Rvcihwb3MsIGFjYywgcGVybGluKSB7XG4gICAgICAgIHRoaXMucG9zID0gcG9zXG4gICAgICAgIHRoaXMuYWNjID0gYWNjXG4gICAgICAgIHRoaXMucGVybGluID0gcGVybGluXG4gICAgICAgIHRoaXMuYWxpdmUgPSB0cnVlXG4gICAgfVxuXG4gICAgdXBkYXRlKCkge1xuICAgICAgICBpZiAoIXRoaXMuYWxpdmUpIHJldHVyblxuXG4gICAgICAgIHRoaXMucG9zLnggKz0gdGhpcy5hY2MueFxuICAgICAgICB0aGlzLnBvcy55ICs9IHRoaXMuYWNjLnkgICAgICAgIFxuXG4gICAgICAgIGNvbnN0IHBlcmxpbiA9IHRoaXMucGVybGluXG5cbiAgICAgICAgY29uc3QgaSA9IChwYXJzZUludCh0aGlzLnBvcy54KSArIFdJRFRIICogcGFyc2VJbnQodGhpcy5wb3MueSkpICogNFxuICAgICAgICBjb25zdCBkZWcgPSBwZXJsaW4uZGF0YVtpXSAgLyAyNTUuXG4gICAgICAgIFxuICAgICAgICBjb25zdCBueCA9IE1hdGguY29zKGRlZyAqIDIgKiBNYXRoLlBJKSAqIDIuMFxuICAgICAgICBjb25zdCBueSA9IE1hdGguc2luKGRlZyAqIDIgKiBNYXRoLlBJKSAqIDIuMFxuXG4gICAgICAgIHRoaXMucG9zLnggKz0gbnhcbiAgICAgICAgdGhpcy5wb3MueSArPSBueSAgICAgICAgXG4gICAgICAgIFxuXG4gICAgICAgIHRoaXMuYWNjLnggKj0gMC45NVxuICAgICAgICB0aGlzLmFjYy55ICo9IDAuOTVcblxuICAgICAgICBpZiAoTWF0aC5hYnModGhpcy5hY2MueCkgPCAwLjIgJiYgTWF0aC5hYnModGhpcy5hY2MueSkgPCAwLjIpIHtcbiAgICAgICAgICAgIHRoaXMuYWxpdmUgPSBmYWxzZVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZHJhdyhjb250ZXh0KSB7XG4gICAgICAgIGNvbnN0IHsgcG9zIH0gPSB0aGlzXG4gXG4gICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gJ3JnYmEoMTIwLCAxNTAsIDI1NSwgMC4xKSdcbiAgICAgICAgY29udGV4dC5iZWdpblBhdGgoKVxuICAgICAgICBjb250ZXh0LmFyYyhwb3MueCwgcG9zLnksIDEsIDAsIDIgKiBNYXRoLlBJKVxuICAgICAgICBjb250ZXh0LmNsb3NlUGF0aCgpXG4gICAgICAgIGNvbnRleHQuZmlsbCgpXG4gICAgfSAgICBcbn1cblxuY29uc3QgaW5pdCA9IChwZXJsaW4pID0+IHtcbiAgICBjb25zdCBwYXJ0aWNsZXMgPSBbXSBcblxuICAgIGNvbnRleHQuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gJ2xpZ2h0ZXInXG4gICAgY29udGV4dC5maWxsU3R5bGUgPSAnIzIyMidcbiAgICBjb250ZXh0LmZpbGxSZWN0KDAsIDAsIFdJRFRILCBIRUlHSFQpXG5cbiAgICBmdW5jdGlvbiByZW5kZXIodCkge1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGFydGljbGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBwYXJ0aWNsZSA9IHBhcnRpY2xlc1tpXVxuICAgICAgICAgICAgcGFydGljbGUudXBkYXRlKClcbiAgICAgICAgICAgIHBhcnRpY2xlLmRyYXcoY29udGV4dClcbiAgICAgICAgICAgIGlmICghcGFydGljbGUuYWxpdmUpIHtcbiAgICAgICAgICAgICAgICBwYXJ0aWNsZXMuc3BsaWNlKGksIDEpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJlbmRlcilcbiAgICB9XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJlbmRlcilcblxuICAgIGxldCBpc0dlbmVyYXRpdmUgPSBmYWxzZVxuICAgIGxldCBwcmV2UG9zID0ge1xuICAgICAgICB4OjAsIHk6MFxuICAgIH1cbiAgICBsZXQgY3VyclBvcyA9IHtcbiAgICAgICAgeDowLCB5OjBcbiAgICB9XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIChlKSA9PiB7XG4gICAgICAgIGlzR2VuZXJhdGl2ZSA9IHRydWVcbiAgICAgICAgY3VyclBvcy54ID0gZS5jbGllbnRYXG4gICAgICAgIGN1cnJQb3MueSA9IGUuY2xpZW50WVxuICAgIH0pXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIChlKSA9PiB7XG4gICAgICAgIGlmIChpc0dlbmVyYXRpdmUpIHtcbiAgICAgICAgICAgIGNvbnN0IHggPSBlLmNsaWVudFhcbiAgICAgICAgICAgIGNvbnN0IHkgPSBlLmNsaWVudFlcbiAgICAgICAgICAgIHByZXZQb3MueCA9IGN1cnJQb3MueFxuICAgICAgICAgICAgcHJldlBvcy55ID0gY3VyclBvcy55XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGN1cnJQb3MueCA9IHhcbiAgICAgICAgICAgIGN1cnJQb3MueSA9IHlcblxuICAgICAgICAgICAgY29uc3QgZGlmZiA9IHtcbiAgICAgICAgICAgICAgICB4OiAoY3VyclBvcy54IC0gcHJldlBvcy54KSxcbiAgICAgICAgICAgICAgICB5OiAoY3VyclBvcy55IC0gcHJldlBvcy55KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAyMDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgcGFydGljbGVzLnB1c2gobmV3IFBhcnRpY2xlKHtcbiAgICAgICAgICAgICAgICAgICAgeDogeCArIChNYXRoLnJhbmRvbSgpIC0gMC41KSAqIDIuMCAqIDEwLjAsXG4gICAgICAgICAgICAgICAgICAgIHk6IHkgKyAoTWF0aC5yYW5kb20oKSAtIDAuNSkgKiAyLjAgKiAxMC4wXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB4OiBkaWZmLnggKiAwLjEsXG4gICAgICAgICAgICAgICAgICAgIHk6IGRpZmYueSAqIDAuMVxuICAgICAgICAgICAgICAgIH0sIHBlcmxpbikpICAgIFxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICB9KVxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgKGUpID0+IHtcbiAgICAgICAgaXNHZW5lcmF0aXZlID0gZmFsc2UgICAgXG4gICAgfSlcbn1cblxuY29uc3QgcGVybGluSW1nID0gbmV3IEltYWdlKClcbnBlcmxpbkltZy5zcmMgPSAnLi9wZXJsaW4ucG5nJ1xuXG5wZXJsaW5JbWcub25sb2FkID0gKCkgPT4ge1xuICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpXG4gICAgY2FudmFzLndpZHRoID0gV0lEVEhcbiAgICBjYW52YXMuaGVpZ2h0ID0gSEVJR0hUXG4gICAgY29uc3QgYyA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpXG4gICAgYy5kcmF3SW1hZ2UocGVybGluSW1nLCAwLCAwLCBXSURUSCwgSEVJR0hUKVxuICAgIGNvbnN0IHBlcmxpbiA9IGMuZ2V0SW1hZ2VEYXRhKDAsIDAsIFdJRFRILCBIRUlHSFQpXG4gICAgaW5pdChwZXJsaW4pXG59XG4iXX0=
