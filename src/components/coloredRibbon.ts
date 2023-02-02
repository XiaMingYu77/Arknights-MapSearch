function createRibbons(sendBuilder: any = {}) {
    for (const key in sendBuilder) {
        if (key in builder) {
            builder[key] = sendBuilder[key];
        }
    }
    let Factory = build();
    new Factory();
}

const builder:any = {
    horizontalSpeed: 150,
    colorCycleSpeed: 5,
    ribbonCount: 4,
    colorAlpha: 0.65,
    strokeSize: 0,
    display:'block',
    margin: "auto",
    padding: "0",
    border: "0",
    position: { top: '0', bottom: '0', left: '0', right: '0' },
    width: "100%",
    height: "100%",
    z_index: "-1",
    color: "#E4EFF0",
    id: "bgCanvas"
}

function build() {
    var _w = window, _b = document.body, _d = document.documentElement;
    var random: any = function () {
        if (arguments.length === 1) {
            if (Array.isArray(arguments[0])) {
                var index = Math.round(random(0, arguments[0].length - 1));
                return arguments[0][index];
            }
            return random(0, arguments[0]);
        } else if (arguments.length === 2) {
            return Math.random() * (arguments[1] - arguments[0]) + arguments[0];
        }
        return 0;
    };
    var screenInfo = function (e: any) {
        var width = Math.max(0, _w.innerWidth || _d.clientWidth || _b.clientWidth || 0),
            height = Math.max(0, _w.innerHeight || _d.clientHeight || _b.clientHeight || 0),
            scrollx = Math.max(0, _w.pageXOffset || _d.scrollLeft || _b.scrollLeft || 0) - (_d.clientLeft || 0),
            scrolly = Math.max(0, _w.pageYOffset || _d.scrollTop || _b.scrollTop || 0) - (_d.clientTop || 0);
        return {
            width: width,
            height: height,
            ratio: width / height,
            centerx: width / 2,
            centery: height / 2,
            scrollx: scrollx,
            scrolly: scrolly
        };
    };
    var mouseInfo = function (e: any) {
        var screen = screenInfo(e), mousex = e ? Math.max(0, e.pageX || e.clientX || 0) : 0,
            mousey = e ? Math.max(0, e.pageY || e.clientY || 0) : 0;
        return {
            mousex: mousex,
            mousey: mousey,
            centerx: mousex - screen.width / 2,
            centery: mousey - screen.height / 2
        };
    };

    class Point {
        x = 0;
        y = 0;
        constructor(x: any = 0, y: any = 0) {
            this.x = 0;
            this.y = 0;
            this.set(x, y);
        }

        set(x: any, y: any) {
            this.x = x || 0;
            this.y = y || 0;
        }

        copy(point: any) {
            this.x = point.x || 0;
            this.y = point.y || 0;
            return this;
        }

        multiply(x: any, y: any) {
            this.x *= x || 1;
            this.y *= y || 1;
            return this;
        }

        divide(x: any, y: any) {
            this.x /= x || 1;
            this.y /= y || 1;
            return this;
        }

        add(x: any, y: any) {
            this.x += x || 0;
            this.y += y || 0;
            return this;
        }

        subtract(x: any, y: any) {
            this.x -= x || 0;
            this.y -= y || 0;
            return this;
        }

        clampX(min: any, max: any) {
            this.x = Math.max(min, Math.min(this.x, max));
            return this;
        }
        clampY(min: any, max: any) {
            this.y = Math.max(min, Math.min(this.y, max));
            return this;
        }
        flipX() {
            this.x *= -1;
            return this;
        }
        flipY() {
            this.y *= -1;
            return this;
        }
    }

    class Factory {
        _canvas: any;
        _context: any;
        _sto: any;
        _width: any;
        _height: any;
        _scroll: any;
        _ribbons: any;
        _options: any;

        constructor(options: any = null) {
            this._canvas = null;
            this._context = null;
            this._sto = null;
            this._width = 0;
            this._height = 0;
            this._scroll = 0;
            this._ribbons = [];
            this._options = {
                colorSaturation: "80%",
                colorBrightness: "60%",
                colorAlpha: builder.colorAlpha,
                colorCycleSpeed: builder.colorCycleSpeed,
                verticalPosition: "center",
                horizontalSpeed: builder.horizontalSpeed,
                ribbonCount: builder.ribbonCount,
                strokeSize: builder.strokeSize,
                parallaxAmount: -0.5,
                animateSections: true
            };
            this._onDraw = this._onDraw.bind(this);
            this._onResize = this._onResize.bind(this);
            this._onScroll = this._onScroll.bind(this);
            this.setOptions(options);
            this.init();
        }

        setOptions(options: any) {
            if (typeof options === "object") {
                for (var key in options) {
                    if (options.hasOwnProperty(key)) {
                        this._options[key] = options[key];
                    }
                }
            }
        }

        init() {
            try {
                this._canvas = document.createElement("canvas");
                this._canvas.style["display"] = builder.display;
                this._canvas.style["position"] = "fixed";
                this._canvas.style["margin"] = builder.margin;
                this._canvas.style["padding"] = builder.padding;
                this._canvas.style["border"] = builder.border;
                this._canvas.style["outline"] = "0";
                this._canvas.style["left"] = builder.position.left;
                this._canvas.style["right"] = builder.position.right;
                this._canvas.style["bottom"] = builder.position.bottom;
                this._canvas.style["top"] = builder.position.top;
                this._canvas.style["width"] = builder.width;
                this._canvas.style["height"] = builder.height;
                this._canvas.style["z-index"] = builder.z_index;
                this._canvas.style["background-color"] = builder.color;
                this._canvas.id = builder.id;
                this._onResize();
                this._context = this._canvas.getContext("2d");
                this._context.clearRect(0, 0, this._width, this._height);
                this._context.globalAlpha = this._options.colorAlpha;
                // 这里可以设置是否随着窗口的滚动而滚动
                window.addEventListener("resize", this._onResize);
                window.addEventListener("scroll", this._onScroll);
                // 这里设置添加的位置
                var body_ = document.getElementsByTagName('body')[0];
                body_.appendChild(this._canvas);
            } catch (e: any) {
                console.warn("Canvas Context Error: " + e.toString());
                return;
            }
            this._onDraw();
        }

        addRibbon() {
            var dir = Math.round(random(1, 9)) > 5 ? "right" : "left", stop = 1000, hide = 200, min = 0 - hide,
                max = this._width + hide, movex = 0, movey = 0, startx = dir === "right" ? min : max,
                starty = Math.round(random(0, this._height));
            if (/^(top|min)$/i.test(this._options.verticalPosition)) {
                starty = 0 + hide;
            } else if (/^(middle|center)$/i.test(this._options.verticalPosition)) {
                starty = this._height / 2;
            } else if (/^(bottom|max)$/i.test(this._options.verticalPosition)) {
                starty = this._height - hide;
            }
            var ribbon: any = [], point1 = new Point(startx, starty), point2 = new Point(startx, starty), point3: any = null,
                color = Math.round(random(0, 360)), delay = 0;
            while (true) {
                if (stop <= 0) break;
                stop--;
                movex = Math.round((Math.random() * 1 - 0.2) * this._options.horizontalSpeed);
                movey = Math.round((Math.random() * 1 - 0.5) * (this._height * 0.25));
                point3 = new Point();
                point3.copy(point2);
                if (dir === "right") {
                    point3.add(movex, movey);
                    if (point2.x >= max) break;
                } else if (dir === "left") {
                    point3.subtract(movex, movey);
                    if (point2.x <= min) break;
                }
                ribbon.push({
                    point1: new Point(point1.x, point1.y),
                    point2: new Point(point2.x, point2.y),
                    point3: point3,
                    color: color,
                    delay: delay,
                    dir: dir,
                    alpha: 0,
                    phase: 0
                });
                point1.copy(point2);
                point2.copy(point3);
                delay += 4;
                color += this._options.colorCycleSpeed;
            }
            this._ribbons.push(ribbon);
        }

        _drawRibbonSection(section: any) {
            if (section) {
                if (section.phase >= 1 && section.alpha <= 0) {
                    return true;
                }
                if (section.delay <= 0) {
                    section.phase += 0.02;
                    section.alpha = Math.sin(section.phase) * 1;
                    section.alpha = section.alpha <= 0 ? 0 : section.alpha;
                    section.alpha = section.alpha >= 1 ? 1 : section.alpha;
                    if (this._options.animateSections) {
                        var mod = Math.sin(1 + section.phase * Math.PI / 2) * 0.1;
                        if (section.dir === "right") {
                            section.point1.add(mod, 0);
                            section.point2.add(mod, 0);
                            section.point3.add(mod, 0);
                        } else {
                            section.point1.subtract(mod, 0);
                            section.point2.subtract(mod, 0);
                            section.point3.subtract(mod, 0);
                        }
                        section.point1.add(0, mod);
                        section.point2.add(0, mod);
                        section.point3.add(0, mod);
                    }
                } else {
                    section.delay -= 0.5;
                }
                var s = this._options.colorSaturation, l = this._options.colorBrightness,
                    c = "hsla(" + section.color + ", " + s + ", " + l + ", " + section.alpha + " )";
                this._context.save();
                if (this._options.parallaxAmount !== 0) {
                    this._context.translate(0, this._scroll * this._options.parallaxAmount);
                }
                this._context.beginPath();
                this._context.moveTo(section.point1.x, section.point1.y);
                this._context.lineTo(section.point2.x, section.point2.y);
                this._context.lineTo(section.point3.x, section.point3.y);
                this._context.fillStyle = c;
                this._context.fill();
                if (this._options.strokeSize > 0) {
                    this._context.lineWidth = this._options.strokeSize;
                    this._context.strokeStyle = c;
                    this._context.lineCap = "round";
                    this._context.stroke();
                }
                this._context.restore();
            }
            return false;
        }

        _onDraw() {
            for (var i = 0, t = this._ribbons.length; i < t; ++i) {
                if (!this._ribbons[i]) {
                    this._ribbons.splice(i, 1);
                }
            }
            this._context.clearRect(0, 0, this._width, this._height);
            for (var a = 0; a < this._ribbons.length; ++a) {
                var ribbon = this._ribbons[a], numSections = ribbon.length, numDone = 0;
                for (var b = 0; b < numSections; ++b) {
                    if (this._drawRibbonSection(ribbon[b])) {
                        numDone++;
                    }
                }
                if (numDone >= numSections) {
                    this._ribbons[a] = null;
                }
            }
            if (this._ribbons.length < this._options.ribbonCount) {
                this.addRibbon();
            }
            requestAnimationFrame(this._onDraw);
        }

        _onResize(e: any = null) {
            var screen = screenInfo(e);
            this._width = screen.width;
            this._height = screen.height;
            if (this._canvas) {
                this._canvas.width = this._width;
                this._canvas.height = this._height;
                if (this._context) {
                    this._context.globalAlpha = this._options.colorAlpha;
                }
            }
        }
        _onScroll(e: any) {
            var screen = screenInfo(e);
            this._scroll = screen.scrolly;
        }

    }
    return Factory;
}

export default createRibbons;