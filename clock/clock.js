/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function logger(txt) {
    if (DEBUG === true) {
        console.log(txt);
    }
}

function Point(x, y) {
    this.x = x;
    this.y = y;
}

Point.prototype.move = function (x, y) {
    this.x = x;
    this.y = y;
};

Point.prototype.translate = function (dx, dy) {
    this.x += dx;
    this.y += dy;
};


/**
 * *
 *
 * @param {Point} pt the Point object whose distance to this Point object is
 * required
 * @return the distance between the 2 Point objects.
 */
Point.prototype.calcDistanceTo = function (pt) {
    if (pt && pt.constructor.name === 'Point') {
        return Math.sqrt(Math.pow((this.x - pt.x), 2) + Math.pow((this.y - pt.y), 2));
    }
    return Number.NaN;
};


Point.prototype.equals = function (point) {
    if (point && point.constructor.name === 'Point') {
        return point.x === this.x && point.y === this.y;
    }
    return false;
};

function FloatPoint(x, y, z) {
    Point.call(this, x, y);
    this.z = z;
}


FloatPoint.prototype.constructor = FloatPoint;
FloatPoint.prototype = Object.create(Point.prototype);

FloatPoint.prototype.move = function (x, y, z) {
    Object.getPrototypeOf(FloatPoint.prototype).move.call(this, x, y);
    this.z = z;
};

FloatPoint.prototype.translate = function (dx, dy, dz) {
    Object.getPrototypeOf(FloatPoint.prototype).translate.call(this, dx, dy);
    this.z += dz;
};

/**
 * *
 *
 * @param {FloatPoint} fpt the FloatPoint object whose distance to this Point object is
 * required
 * @return the distance between the 2 FloatPoint objects.
 */
FloatPoint.prototype.calcDistanceTo = function (fpt) {
    if (fpt && fpt.constructor.name === 'FloatPoint') {
        return Math.sqrt(pow((this.x - fpt.x), 2) + Math.pow((this.y - fpt.y), 2) + Math.pow((this.z - fpt.z), 2));
    }
    return Number.NaN;
};


FloatPoint.prototype.toPoint = function () {
    return new Point(this.x, this.y);
};

FloatPoint.prototype.equals = function (fpt) {
    if (fpt && fpt.constructor.name === 'FloatPoint') {
        return fpt.x === this.x && fpt.y === this.y && fpt.z === this.z;
    }
    return false;
};




/**
 *
 * @param {FloatPoint} pt the point between which an imaginary line runs
 * @return the gradient of the projection of the line joining these points
 * on the XY plane
 */
FloatPoint.prototype.findXYGrad = function (pt) {
    if (pt && pt.constructor.name === 'FloatPoint') {
        return (this.y - pt.y) / (this.x - pt.x);
    }
    return Number.NaN;
};

/**
 *
 * @param {FloatPoint} pt the point between which an imaginary line runs
 * @return the gradient of the projection of the line joining these points
 * on the XZ plane
 */
FloatPoint.prototype.findXZGrad = function (pt) {
    if (pt && pt.constructor.name === 'FloatPoint') {
        return (this.z - pt.z) / (this.x - pt.x);
    }
    return Number.NaN;
};

/**
 *
 * @param {FloatPoint} pt the point between which an imaginary line runs
 * @return the gradient of the projection of the line joining these points
 * on the YZ plane
 */
FloatPoint.prototype.findYZGrad = function (pt) {
    if (pt && pt.constructor.name === 'FloatPoint') {
        return (this.z - pt.z) / (this.y - pt.y);
    }
    return Number.NaN;
};

/**
 *
 * @param {Point} p1 The first Point object.
 * @param {Point} p2 The second Point object.
 * @return The Point object that contains the coordinates of the midpoint of
 * the line joining p1 and p2
 */
function midPoint(p1, p2) {
    if (p1 && p1.constructor.name === 'Point' && p2 && p2.constructor.name === 'Point') {
        return new Point((0.5 * (p1.x + p2.x)), (0.5 * (p1.y + p2.y)));
    }
    return null;
}
;

/**
 *
 * @param {FloatPoint} p1 The first FloatPoint object.
 * @param {FloatPoint} p2 The second FloatPoint object.
 * @return The FloatPoint object that contains the coordinates of the midpoint of
 * the line joining p1 and p2
 */
function midPointF(p1, p2) {
    if (p1 && p1.constructor.name === 'FloatPoint' && p2 && p2.constructor.name === 'FloatPoint') {
        return new FloatPoint((0.5 * (p1.x + p2.x)), (0.5 * (p1.y + p2.y)), (0.5 * (p1.z + p2.z)));
    }
    return null;
}
;



/**
 *
 * @param {FloatPoint} p1 The first point
 * @param {FloatPoint} p2 The second point
 * @return true if this Point object lies on the same straight line with p1
 * and p2 and it lies in between them.
 */
FloatPoint.prototype.liesBetween = function (p1, p2) {
    if (p1 && p1.constructor.name === 'FloatPoint' && p2 && p2.constructor.name === 'FloatPoint') {
        var truly1 = ((p1.x <= x && p2.x >= this.x) || (p2.x <= x && p1.x >= this.x));
        var truly2 = ((p1.y <= y && p2.y >= this.y) || (p2.y <= y && p1.y >= this.y));
        var truly3 = ((p1.z <= z && p2.z >= this.z) || (p2.z <= z && p1.z >= this.z));

        return truly1 && truly2 && truly3 && isCollinearWith(p1, p2);
    }
    return false;
};





/**
 * A line passing between 2 points
 * @param {FloatPoint} fpt1
 * @param {FloatPoint} fpt2
 * @returns {Line}
 */
function Line(fpt1, fpt2) {
    if (fpt1 && fpt1.constructor.name === 'FloatPoint' && fpt2 && fpt2.constructor.name === 'FloatPoint') {
        this.m = fpt1.findXYGrad(fpt2);
        this.c = fpt1.y - this.m * fpt1.x;
    }
    return null;
}


/**
 *
 * @param {Number} y the y coordinate of
 * a given point on a Line object.
 * @return the x coordinate of that point.
 */
Line.prototype.getX = function (y) {
    if (typeof y === "number") {
        return (y - this.c) / this.m;
    }
    return Number.NaN;
};

Line.prototype.getY = function (x) {
    if (typeof x === "number") {
        return (this.m * x) + this.c;
    }
    return Number.NaN;
};



/**
 *
 * Finds the distance between 2 Point objects lying on this Line object
 * They must lie on this Line object, else the method will return 0;
 * @param {Point} p1 the first Point object to consider
 * @param {Point} p2 the second Point object to consider
 * @return the distance along this Line
 * object between the 2 given Point objects lying on it
 */

Line.prototype.distance = function (p1, p2) {
    if (p1 && p1.constructor.name === 'Point' && p2 && p2.constructor.name === 'Point') {
        if (this.passesThroughPoint(p1) && this.passesThroughPoint(p2)) {
            return p2.calcDistanceTo(p1);
        }
    }
    return Number.NaN;
};

/**
 *
 * Finds the distance between 2 Point objects lying on this Line object
 * They must lie on this Line object, else the method will return 0;
 * @param {FloatPoint} p1 the first FloatPoint object to consider
 * @param {FloatPoint} p2 the second FloatPoint object to consider
 * @return the distance along this Line
 * object between the 2 given Point objects lying on it
 */
Line.prototype.distanceF = function (p1, p2) {
    if (p1 && p1.constructor.name === 'FloatPoint' && p2 && p2.constructor.name === 'FloatPoint') {
        if (this.passesThroughPoint(p1) && this.passesThroughPoint(p2)) {
            return p2.calcDistanceTo(p1);
        }
    }
    return Number.NaN;
};

/**
 *
 * Finds the square of the distance between 2 Point objects lying on this Line object
 * They must lie on this Line object, else the method will return 0;
 * @param {FloatPoint} p1 the first Point object to consider
 * @param {FloatPoint} p2 the second Point object to consider
 * @return the distance along this Line
 * object between the 2 given Point objects lying on it
 */
Line.prototype.distanceSquared = function (p1, p2) {
    if (p1 && p1.constructor.name === 'FloatPoint' && p2 && p2.constructor.name === 'FloatPoint') {
        if (this.passesThroughPoint(p1) && this.passesThroughPoint(p2)) {
            var dist = p2.calcDistanceTo(p1);
            return dist * dist;
        }
    }
    return Number.NaN;
};




/**
 *
 * @param {Line} line the Line object to be checked if or not it intersects with this one.
 * @return true if the 2 Line objects intersect.
 */
Line.prototype.intersectsLine = function (line) {
    return !this.isParallelTo(line);
};

/**
 * Checks if this Line object is parallel to another.
 * @param {Line} line the Line object to be checked against this one for parallelism
 * @return true if it is parallel to the other Line object
 */
Line.prototype.isParallelTo = function (line) {
    return this.approxEquals(this.m, line.m);
};

/**
 * 
 * @param {Point} p1 the Point object that we
 * wish to check if or not it lies on this Line
 * object.
 * @return true if it lies on this Line object
 */
Line.prototype.passesThroughPoint = function (p1) {
    if (p1 && p1.constructor.name === 'Point') {
        return this.approxEquals(p1.y, (this.m * p1.x + this.c));
    }
    return false;
};
/**
 * 
 * @param {FloatPoint} p1 the Point object that we
 * wish to check if or not it lies on this Line
 * object.
 * @return true if it lies on this Line object
 */
Line.prototype.passesThroughPointF = function (p1) {
    if (p1 && p1.constructor.name === 'FloatPoint') {
        return this.approxEquals(p1.y, (this.m * p1.x + this.c));
    }
};

/**
 *
 * @param {Line} line the Line object whose point of
 * intersection with this Line object is required
 * @return the point of intersection of both Line objects
 */
Line.prototype.intersectionWithLine = function (line) {
    if (line && line.constructor.name === 'Line') {
        var x = (-1 * (this.c - line.c) / (this.m - line.m));
        var y = this.m * x + this.c;
        return new FloatPoint(x, y);
    }
    return null;
};


/**
 * Compares two numbers to see if they are close enough to be almost the same
 * It checks if the values deviate by 1.0E-14 or lesser.
 * @param {Number} val1 the first value to compare
 * @param {Number} val2 the second value to compare
 * @return true if the values deviate by 1.0E-14 or lesser.
 */

function approxEquals(val1, val2) {
    if (typeof val1 === "number" && typeof val2 === "number") {
        return Math.abs(Math.abs(val1) - Math.abs(val2)) <= 1.0E-14;
    }
    return false;
}
;

/**
 * Compares two numbers to see if they are close enough to be almost the same
 * It checks if the values deviate by 1.0E-14 or lesser.
 * @param {Number} val1 the first value to compare
 * @param {Number} val2 the second value to compare
 * @param minDeviation the minimum difference they
 * must have to be acceptably equal.
 * @return true if the values deviate by 1.0E-14 or lesser.
 */

function approxEquals(val1, val2, minDeviation) {
    if (typeof val1 === "number" && typeof val2 === "number" && typeof minDeviation === "number") {
        return abs(abs(val1) - abs(val2)) <= abs(minDeviation);
    }
    return false;
}
;

/**
 * 
 * @param {string} id
 * @param {Number} x1 The starting x on the line
 * @param {Number} x2 The ending x on the line
 * @param {string} color The color of the line in color hex format: e.g. #000FFF
 * @param {Number} thickness The stroke thickness for the line.
 * @returns {undefined}
 */
Line.prototype.draw = function (id, x1, x2, color, thickness) {
    if (typeof id === "string" && typeof x1 === "number" && typeof x2 === "number" && typeof color === "string" && typeof thickness === "number") {
        var canvas = document.getElementById(id);

        var ctx = canvas.getContext("2d");

        var wid = canvas.width;
        var hei = canvas.height;

        let y1 = this.getY(x1);
        let y2 = this.getY(x2);

        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = thickness;
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    } else {
        console.log("Invalid Line draw args");
    }


};

function Dimension(width, height) {
    if (typeof width === "number" && typeof height === "number") {
        this.width = width;
        this.height = height;
    } else {
        this.width = 0;
        this.height = 0;
    }

}

/**
 * Scales a given Dimension along both the width and the height.
 * @param {Number} scaleFactor
 * @returns {undefined}
 */
Dimension.prototype.scale = function (scaleFactor) {
    if (typeof scaleFactor === "number") {
        this.width *= scaleFactor;
        this.height *= scaleFactor;
    }
};

/**
 * Scales a given Dimension along both the width and the height and returns the nw dimension
 * @param {Number} scaleFactor
 * @returns a new Dimension
 */
Dimension.prototype.getScaledInstance = function (scaleFactor) {
    if (typeof scaleFactor === "number") {
        var w = this.width * scaleFactor;
        var h = this.height * scaleFactor;
        return new Dimension(w, h);
    }
    return null;
};
/**
 * 
 * @param {Number} a the coefficient in x squared
 * @param {Number} b the coefficient in x
 * @param {Number} c the constant factor
 * @returns {Quadratic}
 */
function Quadratic(a, b, c) {
    if (typeof a === "number" && typeof b === "number" && typeof c === "number") {
        this.a = a;
        this.b = b;
        this.c = c;
    }
}

Quadratic.prototype.solve = function () {
    var result = "";

    var a = this.a;
    var b = this.b;
    var c = this.c;


    if ((Math.pow(b, 2) - 4 * a * c) >= 0) {
        var x1 = ((-b / (2 * a)) + (Math.sqrt(Math.pow(b, 2) - 4 * a * c) / (2 * a)));
        var x2 = ((-b / (2 * a)) - (Math.sqrt(Math.pow(b, 2) - 4 * a * c) / (2 * a)));

        return x1 + " , " + x2;
    } else if ((pow(b, 2) - 4 * a * c) < 0) {
        var a1 = (-b / (2 * a));
        var b1 = ((Math.sqrt(4 * a * c - Math.pow(b, 2)) / (2 * a)));

        var a2 = (-b / (2 * a));
        var b2 = ((Math.sqrt(4 * a * c - Math.pow(b, 2)) / (2 * a)));

        return a1 + " + " + b1 + " i , " + a2 + " - " + b2 + " i";
    }
//2p^2-3p-4.09=0
};

Quadratic.prototype.solutionArray = function () {

    var a = this.a;
    var b = this.b;
    var c = this.c;

    var arr = new Array();


    if ((Math.pow(b, 2) - 4 * a * c) >= 0) {
        var x1 = ((-b / (2 * a)) + (Math.sqrt(Math.pow(b, 2) - 4 * a * c) / (2 * a)));
        var x2 = ((-b / (2 * a)) - (Math.sqrt(Math.pow(b, 2) - 4 * a * c) / (2 * a)));
        arr.push(x1);
        arr.push(x2);
    } else if ((pow(b, 2) - 4 * a * c) < 0) {
        var a1 = (-b / (2 * a));
        var b1 = ((Math.sqrt(4 * a * c - Math.pow(b, 2)) / (2 * a)));

        var a2 = (-b / (2 * a));
        var b2 = ((Math.sqrt(4 * a * c - Math.pow(b, 2)) / (2 * a)));

        arr.push(a1 + " + " + b1 + " i");
        arr.push(a2 + " - " + b2 + " i");


    }

    return arr;
};


function Rectangle(left, top, right, bottom) {
    if (typeof left === 'number' && typeof top === 'number' && typeof right === 'number' && typeof bottom === 'number') {
        this.left = left;
        this.top = top;
        this.right = right;
        this.bottom = bottom;
    } else {
        this.left = 0;
        this.top = 0;
        this.right = 0;
        this.bottom = 0;
    }
}

Rectangle.prototype.setLocation = function (x, y) {
    if (typeof x === 'number' && typeof y === 'number') {
        this.x = x;
        this.y = y;
    }
};

Rectangle.prototype.getLocation = function () {
    return new Point(this.x, this.y);
};

/**
 * The algorithm here is a translation of what is in the Java API.
 * @param {Number} dx
 * @param {Number} dy
 * @returns {undefined}]
 */
Rectangle.prototype.translate = function (dx, dy) {
    var oldv = this.x;
    var newv = oldv + dx;
    if (dx < 0) {
        // moving leftward
        if (newv > oldv) {
            // negative overflow
            // Only adjust width if it was valid (>= 0).
            if (width >= 0) {
                // The right edge is now conceptually at
                // newv+width, but we may move newv to prevent
                // overflow.  But we want the right edge to
                // remain at its new location in spite of the
                // clipping.  Think of the following adjustment
                // conceptually the same as:
                // width += newv; newv = MIN_VALUE; width -= newv;
                width += newv - Number.MIN_VALUE;
                // width may go negative if the right edge went past
                // MIN_VALUE, but it cannot overflow since it cannot
                // have moved more than MIN_VALUE and any non-negative
                // number + MIN_VALUE does not overflow.
            }
            newv = Number.MIN_VALUE;
        }
    } else {
        // moving rightward (or staying still)
        if (newv < oldv) {
            // positive overflow
            if (width >= 0) {
                // Conceptually the same as:
                // width += newv; newv = MAX_VALUE; width -= newv;
                width += newv - Number.MAX_VALUE;
                // With large widths and large displacements
                // we may overflow so we need to check it.
                if (width < 0)
                    width = Number.MAX_VALUE;
            }
            newv = Number.MAX_VALUE;
        }
    }
    this.x = newv;

    oldv = this.y;
    newv = oldv + dy;
    if (dy < 0) {
        // moving upward
        if (newv > oldv) {
            // negative overflow
            if (height >= 0) {
                height += newv - Number.MIN_VALUE;
                // See above comment about no overflow in this case
            }
            newv = Number.MIN_VALUE;
        }
    } else {
        // moving downward (or staying still)
        if (newv < oldv) {
            // positive overflow
            if (height >= 0) {
                height += newv - Number.MAX_VALUE;
                if (height < 0)
                    height = Number.MAX_VALUE;
            }
            newv = Number.MAX_VALUE;
        }
    }
    this.y = newv;
};
/**
 * 
 * @returns {Dimension}
 */
Rectangle.prototype.getSize = function () {
    return new Dimension(this.width, this.height);
};

/**
 * 
 * @param {type} d
 * @returns {undefined}
 */
Rectangle.prototype.setSize = function (d) {
    if (d.constructor.name === 'Dimension') {
        this.width = d.width;
        this.height = d.height;
    }
};
/**
 * 
 * @param {Number} X The x coordinate of the Point
 * @param {Number} Y The y coordinate of the Point
 * @returns {Boolean} true if the point specified lies inside this rectangle
 */
Rectangle.prototype.containsPoint = function (X, Y) {
    if (typeof X === 'number' && typeof Y === 'number') {
        var w = this.width;
        var h = this.height;
        if ((w | h) < 0) {
            // At least one of the dimensions is negative...
            return false;
        }
        // Note: if either dimension is zero, tests below must return false...
        var x = this.x;
        var y = this.y;
        if (X < x || Y < y) {
            return false;
        }
        w += x;
        h += y;
        //    overflow || intersect
        return ((w < x || w > X) &&
                (h < y || h > Y));
    }
    return false;
};

/**
 * 
 * @param {Rectangle} rect
 * @returns {Boolean} true if the specified Rectangle lies within this Rectangle.
 */
Rectangle.prototype.contains = function (rect) {
    if (rect.constructor.name === 'Rectangle') {
        var X = rect.left;
        var Y = rect.right;
        var W = rect.width;
        var H = rect.height;

        var w = this.width;
        var h = this.height;
        if ((w | h | W | H) < 0) {
            // At least one of the dimensions is negative...
            return false;
        }
        // Note: if any dimension is zero, tests below must return false...
        var x = this.x;
        var y = this.y;
        if (X < x || Y < y) {
            return false;
        }
        w += x;
        W += X;
        if (W <= X) {
            // X+W overflowed or W was zero, return false if...
            // either original w or W was zero or
            // x+w did not overflow or
            // the overflowed x+w is smaller than the overflowed X+W
            if (w >= x || W > w)
                return false;
        } else {
            // X+W did not overflow and W was not zero, return false if...
            // original w was zero or
            // x+w did not overflow and x+w is smaller than X+W
            if (w >= x && W > w)
                return false;
        }
        h += y;
        H += Y;
        if (H <= Y) {
            if (h >= y || H > h)
                return false;
        } else {
            if (h >= y && H > h)
                return false;
        }
        return true;
    }
    return false;
};


/**
 * Determines whether or not this Rectangle and the specified
 * Rectangle intersect. Two rectangles intersect if
 * their intersection is nonempty.
 *
 * @param {Rectangle} r the specified  Rectangle
 * @return    true if the specified  Rectangle
 *            and this Rectangle intersect;
 *             false otherwise.
 */
Rectangle.prototype.intersects = function (r) {
    if (r.constructor.name === 'Rectangle') {
        var tw = this.width;
        var th = this.height;
        var rw = r.width;
        var rh = r.height;
        if (rw <= 0 || rh <= 0 || tw <= 0 || th <= 0) {
            return false;
        }
        var tx = this.x;
        var ty = this.y;
        var rx = r.x;
        var ry = r.y;
        rw += rx;
        rh += ry;
        tw += tx;
        th += ty;
        //      overflow || intersect
        return ((rw < rx || rw > tx) &&
                (rh < ry || rh > ty) &&
                (tw < tx || tw > rx) &&
                (th < ty || th > ry));
    }
    return false;
};

/**
 * Computes the intersection of this Rectangle with the
 * specified Rectangle. Returns a new  Rectangle
 * that represents the intersection of the two rectangles.
 * If the two rectangles do not intersect, the result will be
 * an empty rectangle.
 *
 * @param {Rectangle}    r   the specified Rectangle
 * @return    the largest Rectangle contained in both the
 *            specified Rectangle and in
 *            this Rectangle; or if the rectangles
 *            do not intersect, an empty rectangle.
 */
Rectangle.prototype.intersection = function (r) {
    if (r.constructor.name === 'Rectangle') {
        var tx1 = this.x;
        var ty1 = this.y;
        var rx1 = r.x;
        var ry1 = r.y;
        var tx2 = tx1;
        tx2 += this.width;
        var ty2 = ty1;
        ty2 += this.height;
        var rx2 = rx1;
        rx2 += r.width;
        var ry2 = ry1;
        ry2 += r.height;
        if (tx1 < rx1)
            tx1 = rx1;
        if (ty1 < ry1)
            ty1 = ry1;
        if (tx2 > rx2)
            tx2 = rx2;
        if (ty2 > ry2)
            ty2 = ry2;
        tx2 -= tx1;
        ty2 -= ty1;
        // tx2,ty2 will never overflow (they will never be
        // larger than the smallest of the two source w,h)
        // they might underflow, though...
        if (tx2 < Number.MIN_VALUE)
            tx2 = Number.MIN_VALUE;
        if (ty2 < Number.MIN_VALUE)
            ty2 = Number.MIN_VALUE;
        return new Rectangle(tx1, ty1, tx2, ty2);
    }
    return null;
};

/**
 * Computes the union of this Rectangle with the
 * specified Rectangle. Returns a new
 * Rectangle that
 * represents the union of the two rectangles.
 * <p>
 * If either Rectangle has any dimension less than zero
 * the rules for non-existent rectangles
 * apply.
 * If only one has a dimension less than zero, then the result
 * will be a copy of the other {@code Rectangle}.
 * If both have dimension less than zero, then the result will
 * have at least one dimension less than zero.
 * <p>
 * If the resulting Rectangle would have a dimension
 * too large to be expressed as an int, the result
 * will have a dimension of Number.MAX_VALUE along
 * that dimension.
 * @param r the specified Rectangle
 * @return    the smallest Rectangle containing both
 *            the specified Rectangle and this
 *             Rectangle.
 */
Rectangle.prototype.union = function (r) {
    if (r.constructor.name === 'Rectangle') {
        var tx2 = this.width;
        var ty2 = this.height;
        if ((tx2 | ty2) < 0) {
            // This rectangle has negative dimensions...
            // If r has non-negative dimensions then it is the answer.
            // If r is non-existent (has a negative dimension), then both
            // are non-existent and we can return any non-existent rectangle
            // as an answer.  Thus, returning r meets that criterion.
            // Either way, r is our answer.
            return new Rectangle(r);
        }
        var rx2 = r.width;
        var ry2 = r.height;
        if ((rx2 | ry2) < 0) {
            return new Rectangle(this);
        }
        var tx1 = this.x;
        var ty1 = this.y;
        tx2 += tx1;
        ty2 += ty1;
        var rx1 = r.x;
        var ry1 = r.y;
        rx2 += rx1;
        ry2 += ry1;
        if (tx1 > rx1)
            tx1 = rx1;
        if (ty1 > ry1)
            ty1 = ry1;
        if (tx2 < rx2)
            tx2 = rx2;
        if (ty2 < ry2)
            ty2 = ry2;
        tx2 -= tx1;
        ty2 -= ty1;
        // tx2,ty2 will never underflow since both original rectangles
        // were already proven to be non-empty
        // they might overflow, though...
        if (tx2 > Number.MAX_VALUE)
            tx2 = Number.MAX_VALUE;
        if (ty2 > Number.MAX_VALUE)
            ty2 = Number.MAX_VALUE;
        return new Rectangle(tx1, ty1, tx2, ty2);
    }
    return null;
};

Rectangle.prototype.draw = function (canvasId, color, thickness) {

    if (typeof canvasId === "string" && typeof color === "string" && typeof thickness === "number") {
        var canvas = document.getElementById(canvasId);

        var ctx = canvas.getContext("2d");


        ctx.beginPath();
        ctx.lineWidth = thickness;
        ctx.strokeStyle = color;
        ctx.rect(this.left, this.top, this.width, this.height);
        ctx.stroke();
    } else {
        console.log("Invalid Line draw args");
    }


};


Rectangle.prototype.fill = function (canvasId, color, thickness) {

    if (typeof canvasId === "string" && typeof color === "string" && typeof thickness === "number") {
        var canvas = document.getElementById(canvasId);

        var ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.lineWidth = thickness;
        ctx.strokeStyle = color;
        ctx.fillRect(this.left, this.top, this.width, this.height);
        ctx.stroke();
    } else {
        console.log("Invalid Rectangle draw args");
    }


};

/**
 * 
 * @param {FloatPoint} center 
 * @param {Number} width
 * @param {Number} height
 * @returns {EllipseModel}
 */
function EllipseModel(center, width, height) {
    if (center && center.constructor.name === 'FloatPoint' && typeof width === 'number' && typeof height === 'number') {
        this.center = center;
        this.size = new Dimension(width, height);
    } else {
        this.center = new FloatPoint(0, 0, 0);
        this.size = new Dimension(0, 0);
    }

    var r = new Rect();
}


/**
 * The largest rectangle that can be inscribed in an ellipse
 * is a rectangle of area 2.a.b where 'a' is the half-length of the major axis and
 * 'b' is the half-length of the minor axis.
 * @return the biggest rectangle that can be inscribed in the ellipse
 */
EllipseModel.prototype.getBiggestRectangle = function () {
    var r = new Rectangle();
    r.x = (this.center.x - 0.5 * this.size.width * Math.sqrt(2));
    r.y = (this.center.y - 0.5 * this.size.height * Math.sqrt(2));
    r.width = (this.size.width * Math.sqrt(2));
    r.height = (this.size.height * Math.sqrt(2));
    return r;
};

EllipseModel.prototype.area = function () {
    return Math.PI * this.size.width * this.size.height;
};



/**
 *
 * @param {Number} y the y coordinate of
 * a given point on an ellipse.
 * @return the 2 possible x coordinates of that point in a number array.
 */
EllipseModel.prototype.getX = function (y) {
    var x = new Array();
    var evalYPart = Math.pow((y - this.center.y) / this.size.height, 2);
    x.push(this.center.x + this.size.width * sqrt(1 - evalYPart));
    x.push(this.center.x - this.size.width * sqrt(1 - evalYPart));
    return x;
};

/**
 *
 * @param {Number} x the x coordinate of
 * a given point on an ellipse.
 * @return the 2 possible y coordinates of that point.
 */
EllipseModel.prototype.getY = function (x) {
    var y = new Array();

    var evalXPart = pow((x - this.center.x) / this.size.width, 2);

    y.push(this.center.y + this.size.height * sqrt(1 - evalXPart));
    y.push(this.center.y - this.size.height * sqrt(1 - evalXPart));

    return y;
};

/**
 *
 * @param {FloatPoint} p the Point to check if or not it lies on the EllipseModel
 * @return true if it lies on the EllipseModel object or deviates from its
 * equation by 1.0E-14 or lesser.
 */
EllipseModel.prototype.isOnEllipse = function (p) {
    var eval = Math.pow(((p.x - this.center.x) / this.size.width), 2) + Math.pow(((p.y - this.center.y) / this.size.height), 2);
    return approxEquals(eval, 1);
};


/**
 * The theory behind this is that for a point to be inside an ellipse, a
 * line that passes through the center of the ellipse and this point will
 * cut the ellipse at 2 points such that the point will lie in between both
 * points.
 *
 * @param {FloatPoint} p the Point object
 * @return true if the Point object is located inside this EllipseModel
 * object.
 */
EllipseModel.prototype.contains = function (p) {
    if (p.constructor.name === 'FloatPoint') {
        var line = new Line(p, this.center);
        var x1 = 0;
        var y1 = 0;
        var x2 = 0;
        var y2 = 0;
        var soln = lineIntersection(line);

        x1 = parseFloat(soln[0]);
        y1 = parseFloat(soln[1]);
        x2 = parseFloat(soln[2]);
        y2 = parseFloat(soln[3]);

        var truly1 = ((x1 <= p.x && x2 >= p.x) || (x2 <= p.x && x1 >= p.x));
        var truly2 = ((y1 <= p.y && y2 >= p.y) || (y2 <= p.y && y1 >= p.y));

        return truly1 && truly2;
    } else {
        return false;
    }
};




/**
 *
 * @param {Line} line the Line object that cuts this EllipseModel
 * @return the possible coordinates of the points where the Line object cuts this EllipseModel object
 * The result is returned in the format:
 * Let the solution array be array[], then:
 *
 * array[0] = x coordinate of the first point;
 * array[1] = y coordinate of the first point;
 * array[2] = x coordinate of the second point;
 * array[3] = y coordinate of the second point;
 *
 * The coordinates are returned as strings
 * to account for complex solutions too.
 *
 * THIS METHOD WILL RETURN A NULL ARRAY AND THROW
 * IF NO INTERSECTION
 * OCCURS.
 */
EllipseModel.prototype.lineIntersection = function (line) {
    if (line.constructor.name === 'Line') {
        var str = new Array();
        var m = line.m;
        var c = line.c;


        var A = pow(this.size.height, 2) + pow(this.size.width * m, 2);
        var B = 2 * (pow(this.size.width, 2) * m * (c - this.center.y) - pow(this.size.height, 2) * this.center.x);
        var C = pow(this.center.x * this.size.height, 2) + pow(this.size.width, 2) * (pow(c - this.center.y, 2) - pow(this.size.height, 2));
        var quad = new Quadratic(A, B, C);
        var str1 = quad.soln();

        try {
            str[0] = str1[0];
            str[1] = str1[1];
            str[2] = String.valueOf(m * parseFloat(str1[0]) + c);
            str[3] = String.valueOf(m * parseFloat(str1[1]) + c);

            var str1 = new Array();

            str1[0].push(str[0]);
            str1[1].push(str[2]);
            str1[2].push(str[1]);
            str1[3].push(str[3]);

        }//end try
        catch (e) {
            str1 = null;
            str = null;
        }//end catch


        return str1;
    }
    return null;
};//end method


/**
 *
 * @param {Line} line The Line object
 * @return true if the EllipseModel object
 * intersects with th Line object.
 */
EllipseModel.prototype.intersectsWithLine = function (line) {
    if (line.constructor.name === 'Line') {
        var intersects = false;
        try {
            var c = lineIntersection(line);
            for (var i = 0; i < c.length; i++) {
                var val = c[i];
                intersects = true;//if a null value is detected, then no intersection occurs.
            }
        } catch (e) {
            intersects = false;
        }
        return intersects;
    }
    return false;
};


/**
 * 
 * @param {EllipseModel} ellipse The EllipseModel object whose size is to
 * be compared with this one.
 * @return true if the parameter EllipseModel object is bigger than this EllipseModel object
 */
EllipseModel.prototype.isBiggerThan = function (ellipse) {
    return this.area() > ellipse.area();
};
/**
 *
 * @param {EllipseModel} ellipse The EllipseModel object whose size is to
 * be compared with this one.
 * @return true if the parameter EllipseModel object is smaller than this EllipseModel object
 */
EllipseModel.prototype.isSmallerThan = function (ellipse) {
    return this.area() < ellipse.area();
};
/**
 * Returns true if their areas deviate by 1.0E-14 or lesser.
 * @param {EllipseModel} ellipse the EllipseModel object whose size is to be compared with this EllipseModel object.
 * @return true if their sizes are the same or deviate by 1.0E-14 or lesser
 */
EllipseModel.prototype.hasAlmostSameSizeAs = function (ellipse) {
    return approxEquals(this.area(), ellipse.area());
};
/**
 * Returns true if their areas are exactly equal.
 * This method can be tricky at times and may produce slight errors if
 * truncation errors have occured or rounding errors.
 * YOU CAN USE METHOD hasAlmostSameSizeAs to reduce this likelihood.
 * That method will still return true for deviations of 1.0E-14 and lesser.
 * @param {EllipseModel} ellipse the EllipseModel object whose size is to be compared with this EllipseModel object.
 * @return true if their areas are exactly equal.
 */
EllipseModel.prototype.hasSameSizeAs = function (ellipse) {
    return this.area() === ellipse.area();
};




/**
 *
 * @param {Rectangle} rect The rectangle
 * @return an array of FloatPoint objects
 * constituting the points of intersection between this
 * EllipseModel object and the rectangle.
 */
EllipseModel.prototype.intersection = function (rect) {
    var pt = new FloatPoint(rect.x, rect.y);
    var rectSize = rect.getSize();
    var A = pt.x;
    var B = pt.y;
    var h = this.center.x;
    var k = this.center.y;
    var W = rectSize.width;
    var H = rectSize.height;
    var a = getWidth();
    var b = getHeight();


    var pts = new Array();
    var p1 = new Array(new FloatPoint(), new FloatPoint());//intersection of the top line of the rectangle with the ellipse
    var p2 = new Array(new FloatPoint(), new FloatPoint());//intersection of the bottom line  of the rectangle with the ellipse
    var p3 = new Array(new FloatPoint(), new FloatPoint());//intersection of the left line  of the rectangle with the ellipse
    var p4 = new Array(new FloatPoint(), new FloatPoint()); //intersection of the right line  of the rectangle with the ellipse
    var val = 0;

    try {
        val = a * sqrt(1 - pow((B - k) / b, 2));
        p1[0].x = (h + val);
        p1[0].y = (B);
        p1[1].x = (h - val);
        p1[1].y = (B);
        if (p1[0] !== null && !Number.isNaN(p1[0].x) && !Number.isNaN(p1[0].y)) {
            pts.add(p1[0]);
        }
        if (p1[1] !== null && !Number.isNaN(p1[1].x) && !Number.isNaN(p1[1].y)) {
            pts.add(p1[1]);
        }
    } catch (e) {

    }

    try {
        val = a * Math.sqrt(1 - pow((B + H - k) / b, 2));
        p2[0].x = (h + val);
        p2[0].y = (B + H);
        p2[1].x = (h - val);
        p2[1].y = (B + H);
        if (p2[0] !== null && !Number.isNaN(p2[0].x) && !Number.isNaN(p2[0].y)) {
            pts.add(p2[0]);
        }
        if (p2[1] !== null && !Number.isNaN(p2[1].x) && !Number.isNaN(p2[1].y)) {
            pts.add(p2[1]);
        }
    } catch (ex) {

    }

    try {
        val = b * Math.sqrt(1 - pow((A - h) / a, 2));
        p3[0].x = A;
        p3[0].y = k + val;
        p3[1].x = A;
        p3[1].y = k - val;
        if (p3[0] !== null && !Number.isNaN(p3[0].x) && !Number.isNaN(p3[0].y)) {
            pts.add(p3[0]);
        }
        if (p3[1] !== null && !Number.isNaN(p3[1].x) && !Number.isNaN(p3[1].y)) {
            pts.add(p3[1]);
        }
    } catch (arit) {

    }

    try {
        val = b * sqrt(1 - pow((A + W - h) / a, 2));
        p4[0].x = (A + W);
        p4[0].y = (k + val);
        p4[1].x = (A + W);
        p4[1].y = (k - val);
        if (p4[0] !== null && !Number.isNaN(p4[0].x) && !Number.isNaN(p4[0].y)) {
            pts.add(p4[0]);
        }
        if (p4[1] !== null && !Number.isNaN(p4[1].x) && !Number.isNaN(p4[1].y)) {
            pts.add(p4[1]);
        }
    } catch (arit1) {

    }



    return pts;
};

/**
 *
 * @param {Rectangle} rect The intersecting rectangle
 * @return true if the rectangle intersects with this Ellipse object.
 */
EllipseModel.prototype.intersectsWith = function (rect) {
    var pt = new FloatPoint(rect.x, rect.y);
    var rectSize = rect.getSize();
    var A = pt.x;
    var B = pt.y;
    var h = getXCenter();
    var k = getYCenter();
    var W = rectSize.getWidth();
    var H = rectSize.height;
    var a = getWidth();
    var b = getHeight();


    var p1 = new Array(new FloatPoint(), new FloatPoint());//intersection of the top line of the rectangle with the ellipse
    var p2 = new Array(new FloatPoint(), new FloatPoint());//intersection of the bottom line  of the rectangle with the ellipse
    var p3 = new Array(new FloatPoint(), new FloatPoint());//intersection of the left line  of the rectangle with the ellipse
    var p4 = new Array(new FloatPoint(), new FloatPoint()); //intersection of the right line  of the rectangle with the ellipse
    var val = 0;
    var intersects1 = false;
    var intersects2 = false;
    var intersects3 = false;
    var intersects4 = false;

    try {
        val = a * Math.sqrt(1 - pow((B - k) / b, 2));
        p1[0].x = (h + val);
        p1[0].y = (B);
        p1[1].x = (h - val);
        p1[1].y = (B);
        if ((rect.containsPoint(p1[0].x, p1[0].y) && this.contains(p1[0])) ||
                (rect.containsPoint(p1[1].x, p1[1].y) && this.contains(p1[1]))) {
            intersects1 = true;
        }
    } catch (arit) {

    }

    try {
        val = a * Math.sqrt(1 - pow((B + H - k) / b, 2));
        p2[0].x = (h + val);
        p2[0].y = (B + H);
        p2[1].x = (h - val);
        p2[1].y = (B + H);
        if ((rect.containsPoint(p2[0].x, p2[0].y) && this.contains(p2[0])) ||
                (rect.containsPoint(p2[1].x, p2[1].y) && this.contains(p2[1]))) {
            intersects2 = true;
        }
    } catch (arit) {

    }

    try {
        val = b * Math.sqrt(1 - pow((A - h) / a, 2));
        p3[0].x = (A);
        p3[0].y = (k + val);
        p3[1].x = (A);
        p3[1].y = (k - val);
        if ((rect.containsPoint(p3[0].x, p3[0].y) && this.contains(p3[0])) ||
                (rect.containsPoint(p3[1].x, p3[1].y) && this.contains(p3[1]))) {
            intersects3 = true;
        }
    } catch (arit) {

    }

    try {
        val = b * Math.sqrt(1 - pow((A + W - h) / a, 2));
        p4[0].x = (A + W);
        p4[0].y = (k + val);
        p4[1].x = (A + W);
        p4[1].y = (k - val);
        if ((rect.containsPoint(p4[0].x, p4[0].y) && this.contains(p4[0])) ||
                (rect.containsPoint(p4[1].x, p4[1].y) && this.contains(p4[1]))) {
            intersects4 = true;
        }
    } catch (arit) {

    }



    return intersects1 || intersects2 || intersects3 || intersects4;
};



/**
 *
 * @param {EllipseModel} ellipse The EllipseModel object.
 * @return true if this object intersects with or is contained within the
 * given EllipseModel object and vice versa.
 */
EllipseModel.prototype.intersectsWith = function (ellipse) {

    var line = new Line(this.center, ellipse.center);

//The 2 centers coincide
    if (this.center.equals(ellipse.center)) {
        return true;
    }

//String soln[] = this.lineIntersection(line);

    var otherSoln = ellipse.lineIntersection(line);
    try {
//Point p1 = new Point( Double.valueOf(soln[0]) , Double.valueOf(soln[1]) );
//Point p2 = new Point( Double.valueOf(soln[2]) , Double.valueOf(soln[3]) );

        var p3 = new FloatPoint(parseFloat(otherSoln[0]), parseFloat(otherSoln[1]));
        var p4 = new FloatPoint(parseFloat(otherSoln[2]), parseFloat(otherSoln[3]));

        if ((this.contains(p3) || this.contains(p4))) {
            return true;
        }//end if
        else {
            return false;
        }
    }//end try
    catch (num) {
        return false;
    }//end catch

};//end method




function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}


// Using Math.round() will give you a non-uniform distribution!
function randomInt(min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function Random() {

}

Random.prototype.nextInt = function (max) {
    return randomInt(0, max);
};

Random.prototype.generateUUID = function () { // Public Domain/MIT
    var d = new Date().getTime();//Timestamp
    var d2 = (performance && performance.now && (performance.now() * 1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if (d > 0) {//Use timestamp until depleted
            r = (d + r) % 16 | 0;
            d = Math.floor(d / 16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r) % 16 | 0;
            d2 = Math.floor(d2 / 16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
};

/**
 * 
 * @param {type} input The string input to be split
 * @param {type} includeTokensInOutput If true, the tokens are retained in the splitted output.
 * @param {type} tokens The tokens to be employed in splitting the original string.
 * @returns {Scanner}
 */
function Scanner(input, includeTokensInOutput, tokens) {
    this.input = input;
    this.includeTokensInOutput = includeTokensInOutput;
    this.tokens = tokens;
}

Scanner.prototype.scan = function () {
    var inp = this.input;

    var parse = [];
    this.tokens.sort(function (a, b) {
        return b.length - a.length; //ASC, For Descending order use: b - a
    });
    for (var i = 0; i < inp.length; i++) {


        for (var j = 0; j < this.tokens.length; j++) {

            var token = this.tokens[j];
            var len = token.length;
            if (len > 0 && i + len <= inp.length()) {
                var portion = inp.substring(i, i + len);
                if (portion.equals(token)) {
                    if (i !== 0) {//avoid empty spaces
                        parse[parse.length] = inp.substring(0, i);
                    }
                    if (this.includeTokensInOutput) {
                        parse[parse.length] = token;
                    }
                    inp = inp.substring(i + len);
                    i = -1;
                    break;
                }

            }

        }

    }
    if (!inp.isEmpty()) {
        parse[parse.length] = inp;
    }

    return parse;


};


/**
 * 
 * @param {type} str The initialization string.
 * @returns {StringBuffer}
 */
function StringBuffer(str) {
    if (str && typeof str === 'string') {
        this.dataArray = new Array(str);
    } else {
        this.dataArray = new Array(str);
    }
}

StringBuffer.prototype.append = function (str) {
    this.dataArray.push(str);
    return this;
};
StringBuffer.prototype.toString = function () {
    return this.dataArray.join("");
};



/**
 * 
 * @param {string} txt
 * @param {Canvas} ctx
 * @param {Number} availableWidth The width available for drawing text.
 * @returns {Array|scanLines.lines}
 */
function scanLines(txt, ctx, availableWidth) {
//txt ='Page 1 is about our country. What do we do about the countenance of people towards this great nation called Nigeria? God bless Nigeria.';
    var lines = [];

    var token = new StringBuffer();
    for (var i = 0; i < txt.length; i++) {

        if (ctx.measureText(token.toString()).width < availableWidth) {
            token.append(txt.substring(i, i + 1));
        } else {
            var tx = token.toString();
            var line = {
                width: ctx.measureText(tx).width,
                text: tx
            };

            lines.push(line);
            token = new StringBuffer();
            token.append(txt.substring(i, i + 1));
        }
    }
    if (token.toString().length > 0) {
        var tx = token.toString();
        var line = {
            width: ctx.measureText(tx).width,
            text: tx
        };
        lines.push(line);
    }
    return lines;
}

/**
 * @param {string} text The text to split into lines of text.
 * @param {Context} ctx The Canvas context used to display the text.
 * @param {Number} lineWidth The maximum width of the line.
 * The splitting algorithm ensures 
 * @return the text divided into lines.
 */
function getLinesByMaxWidthAlgorithm(text, ctx, lineWidth) {
    var lines = new Array();

    var cs = new Scanner(text, true, new Array(" ", "\n"));
    var list = cs.scan();
    var sz = list.size();


    for (var i = 0; i < sz; i++) {
        var line = "";
        var wid = ctx.measureText(line).width;
        while (wid <= lineWidth && i < sz) {
            if (list.get(i).equals("\n")) {
                break;
            }
            line = line.concat(list.get(i));
            wid = ctx.measureText(line);
            if (wid >= lineWidth) {
                break;
            } else {
                ++i;
            }

        }//end while
        lines.push(new LineAndWidth(line, wid));
    }//end for loop
    return lines;
}//end method



/**
 * 
 * @returns {Number}
 */
function oneDegInRads() {
    return (Math.PI / 180.0);
}
/**
 * 
 * @param {type} angdeg
 * @returns {Number}
 */
function angDegToRads(angdeg) {
    return (angdeg * Math.PI / 180.0);
}
/**
 * 
 * @param {type} angrad
 * @returns {Number}
 */
function angRadToDegs(angrad) {
    return (180 * angrad / Math.PI);
}



/**
 * 
 * @param num1 The first number
 * @param num2 The second number
 * @return true if the two numbers are equal.
 */
function equals(num1, num2) {
    return Math.abs(Math.abs(num1) - Math.abs(num2)) <= 1.0E-10;
}



function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
        /* if present, the header is where you move the DIV from:*/
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
        /* otherwise, move the DIV from anywhere inside the DIV:*/
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
    }
}














//clockmath ends


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//clock code here












var win = window,
        doc = document,
        docElem = doc.documentElement,
        body = doc.getElementsByTagName('body')[0],
        screenWidth = win.innerWidth || docElem.clientWidth || body.clientWidth,
        screenHeight = win.innerHeight || docElem.clientHeight || body.clientHeight;

const HandType = {
    HOURHAND: "hour",
    MINUTEHAND: "minute",
    SECONDHAND: "second"
};

const DEBUG = true;

const CssSizeUnits = {
    EM: "em",
    PT: "pt",
    PX: "px"
};



const ALARM_DURATION_IN_MINUTES = 1;


const SHOW_MAIN = 1;
const SHOW_FIRST = 2;
const SHOW_SECOND = 3;
const SHOW_ALARM_NOTIF = 4;

const choiceMaker = new Random();

const REFRESH_RATE = 700;
const ALARM_REFRESH_RATE = 150;
const MOVE_NONE = -1;
const MOVE_AWAY = -2;
const MOVE_LEFT = 0;
const MOVE_RIGHT = 1;
const MOVE_UP = 2;
const MOVE_DOWN = 3;
const MOVE_UP_HOR_LEFT = 4;
const MOVE_UP_HOR_RIGHT = 5;
const MOVE_DOWN_HOR_LEFT = 6;
const MOVE_DOWN_HOR_RIGHT = 7;
var DYNAMIC_BASE_TEXT = new DynamicBaseText(SHOW_MAIN);




function AlarmMonitor() {
    this.busy = false;
}


AlarmMonitor.prototype.checkAlarm = function (clock) {

    if (!this.busy) {
        this.busy = true;
        var thisObj = this;
        window.setTimeout(function () {
            clock.fireAlarm();
            thisObj.busy = false;
        }, REFRESH_RATE);

    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/**
 * 
 * @param {HandType} handType
 * @param {Number} handLengthAsFractionOfClockWidth
 * @param {Number} angle
 * @param {String} color
 * @returns {ClockHand}
 */
function ClockHand(handType, handLengthAsFractionOfClockWidth, angle, color) {

    /**
     * The type of the hand:Hour, Minute or Second
     */
    this.handType = handType;
    /**
     * Expresses the length of the clock hand as a fraction of the clock's inner
     * circle diameter.
     */
    this.handLengthAsFractionOfClockWidth = (handLengthAsFractionOfClockWidth <= 1) ? handLengthAsFractionOfClockWidth : 0.9;
    /**
     * The angle subtended by the hand at the center.
     */
    this.angle = angle;
    /**
     * The color used to draw the hand.
     */
    this.color = color;

}

ClockHand.prototype.setHandLengthAsFractionOfClockWidth = function (handLengthAsFractionOfClockWidth) {
    this.handLengthAsFractionOfClockWidth = (handLengthAsFractionOfClockWidth <= 1) ? handLengthAsFractionOfClockWidth : 0.9;
};

/**
 * 
 * @param {type} clockFrame The clock
 * @returns {Number}
 */
ClockHand.prototype.handLength = function (clockFrame) {
    return this.handLengthAsFractionOfClockWidth * clockFrame.getInnerCircleDimension() / 2;
};

/**
 * 
 * @param {Clock} clockFrame The ClockFrame object that has this ClockHand object
 * @returns {Number} The angle at the vertex of this ClockHand object (ClockHand
 * objects display as a filled isosceles triangle).
 */
ClockHand.prototype.vertexAngle = function (clockFrame) {
    var tanAng = (2 * this.handLength(clockFrame) / clockFrame.getCenterSpotWidth());
    return 2.0 * ((Math.PI / 2.0) - Math.atan(tanAng));
};




/**
 * 
 * @param {Clock} clockFrame he ClockFrame object that has this ClockHand object
 * @returns {Number}  Any of the base angles of this ClockHand object (ClockHand
 * objects display as a filled isosceles triangle).
 */
ClockHand.prototype.baseAngle = function (clockFrame) {
    var vertexAngle = this.vertexAngle(clockFrame);
    return (Math.PI - vertexAngle) / 2.0;
};


/**
 * 
 * @param {type} clockFrame The ClockFrame object that has this ClockHand object
 * @returns {Number} Any of the base angles of this ClockHand object (ClockHand
 * objects display as a filled isosceles triangle).
 */
ClockHand.prototype.baseAngle = function (clockFrame) {
    var vertexAngle = this.vertexAngle(clockFrame);
    return (Math.PI - vertexAngle) / 2.0;
};

/**
 * 
 * @param {Clock} clockFrame The ClockFrame object that has this ClockHand object
 * @returns {Number}  the length of the 2 equal sides of this ClockHand object.
 */
ClockHand.prototype.equalSideLength = function (clockFrame) {
    return this.handLength(clockFrame) / Math.sin(this.baseAngle(clockFrame));
};


/**
 * 
 * @param {Clock} clockFrame The ClockFrame object that has this ClockHand object
 * @returns {Point} the Point at the upper tip of this ClockHand object
 */
ClockHand.prototype.handTopTipCoords = function (clockFrame) {
    var d = this.handLength(clockFrame);
    var cen = clockFrame.getCenter();
    var cenX = cen.x;
    var cenY = cen.y;
    return new Point((cenX + d * Math.cos(this.angle)), (cenY - d * Math.sin(this.angle)));
};

/**
 * 
 * @param {Clock} clockFrame The ClockFrame object that has this ClockHand object
 * @returns {Point} the Point at the tip of the left base of this ClockHand object
 */
ClockHand.prototype.leftTipCoords = function (clockFrame) {
    var baseAngle = this.baseAngle(clockFrame);
    var ang = baseAngle - ((Math.PI / 2.0) - this.angle);
    var sideLength = this.equalSideLength(clockFrame);
    var xDispFromHandTip = (sideLength * Math.cos(ang));
    var yDispFromHandTip = (sideLength * Math.sin(ang));

    var handTopTipCoords = this.handTopTipCoords(clockFrame);

    return new Point(handTopTipCoords.x - (xDispFromHandTip), handTopTipCoords.y + yDispFromHandTip);
};

/**
 *
 * @param clockFrame The ClockFrame object that has this ClockHand object
 * @return the Point at the tip of the right base of this ClockHand object
 */

ClockHand.prototype.rightTipCoords = function (clockFrame) {
    var baseAngle = this.baseAngle(clockFrame);
    var ang = (Math.PI / 2.0) + this.angle - baseAngle;
    var sideLength = this.equalSideLength(clockFrame);
    var xDispFromHandTip = (sideLength * Math.cos(ang));
    var yDispFromHandTip = (sideLength * Math.sin(ang));

    var handTopTipCoords = this.handTopTipCoords(clockFrame);

    return new Point(handTopTipCoords.x - (xDispFromHandTip), handTopTipCoords.y + yDispFromHandTip);
};



/**
 * 
 * @param {type} clockFrame The ClockFrame object that has this ClockHand object
 * @returns {Point}
 */
ClockHand.prototype.centralCoords = function (clockFrame) {
    return clockFrame.getCenter();
};


ClockHand.prototype.tellTime = function () {

    switch (handType) {

        case HandType.HOURHAND:
            return this.getSystemHour();
        case HandType.MINUTEHAND:
            return this.getSystemMinutes();
        case HandType.SECONDHAND:
            return this.getSystemSeconds();

        default:

            break;

    }
    return -1;
};

/**
 *
 * @return the seconds portion of the system time
 */
ClockHand.prototype.getSystemSeconds = function () {
    var date = new Date();
    let second = date.getSeconds();

    return second < 59 ? second + 1 : 0;
};

/**
 *
 * @return the minutes portion of the system time
 */
ClockHand.prototype.getSystemMinutes = function () {

    var date = new Date();

    return date.getMinutes();
};

/**
 *
 * @return the hour portion of the system time
 */
ClockHand.prototype.getSystemHour = function () {

    var date = new Date();

    return date.getHours();
};

/**
 *
 * @return the equivalent angle in rads that the seconds hand must subtend
 * at the horizontal for a given seconds time.
 */
ClockHand.prototype.getAngleFromSeconds = function () {
    return this.angle = (0.5 * Math.PI) * (1 - (this.getSystemSeconds() / 15.0));
};

/**
 *
 * @return the equivalent angle in rads that the minutes hand must subtend
 * at the horizontal for a given minutes time.
 */
ClockHand.prototype.getAngleFromMinutes = function () {
    return this.angle = (0.5 * Math.PI) * (1 - (this.getSystemMinutes() / 15.0));
};

/**
 *
 * @return the equivalent angle in rads that the minutes hand must subtend
 * at the horizontal for a given minutes time.
 */
ClockHand.prototype.getAngleFromHours = function () {
    return this.angle = ((0.5 * Math.PI) * (1 - (this.getSystemHour() / 3.0))) - this.getSystemMinutes() * (Math.PI / 360.0);
};

/**
 *
 * @return the angle relevant to each ClockHand Type
 */
ClockHand.prototype.getAngleForEachState = function () {
    if (this.handType === HandType.SECONDHAND) {
        return this.getAngleFromSeconds();
    } else if (this.handType === HandType.MINUTEHAND) {
        return this.getAngleFromMinutes();
    } else {
        return this.getAngleFromHours();
    }
};



ClockHand.prototype.draw = function (g, clockFrame) {

    var cen = this.centralCoords(clockFrame);
    var topTip = this.handTopTipCoords(clockFrame);
    var leftTip = this.leftTipCoords(clockFrame);
    var rightTip = this.rightTipCoords(clockFrame);

    g.setColor(color);

    g.drawLine(topTip.x, topTip.y, leftTip.x, leftTip.y);
    g.drawLine(topTip.x, topTip.y, cen.x, cen.y);
    g.drawLine(topTip.x, topTip.y, rightTip.x, rightTip.y);
    g.drawLine(leftTip.x, leftTip.y, rightTip.x, rightTip.y);

};


ClockHand.prototype.fill = function (g, clockFrame) {
    var cen = this.centralCoords(clockFrame);
    var topTip = this.handTopTipCoords(clockFrame);
    var leftTip = this.leftTipCoords(clockFrame);
    var rightTip = this.rightTipCoords(clockFrame);

    g.setColor(this.color);

    g.drawLine(topTip.x, topTip.y, leftTip.x, leftTip.y);
    g.drawLine(topTip.x, topTip.y, cen.x, cen.y);
    g.drawLine(topTip.x, topTip.y, rightTip.x, rightTip.y);
    g.drawLine(leftTip.x, leftTip.y, rightTip.x, rightTip.y);

    var p = new Polygon();
    p.addPoint(leftTip.x, leftTip.y);
    p.addPoint(topTip.x, topTip.y);
    p.addPoint(rightTip.x, rightTip.y);
    p.addPoint(cen.x, cen.y);
    p.addPoint(leftTip.x, leftTip.y);
    g.setBackground(this.color);
    g.fillPolygon(p);
};




////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




const mainText = "By gbenroscience";
function DynamicBaseText(state) {
    if (typeof state !== 'number') {
        logger("`state` must be a number type");
        return;
    }
    this.state = state;

    this.textGroup = new Array("Clock written", "in Native JS");

    this.alarmTextGroup = new Array();

    this.counter = 0;


}

DynamicBaseText.prototype.setState = function (state) {
    this.counter = 0;
    this.state = state;
};


DynamicBaseText.prototype.control = function () {

    var countDelayForMainText = 12 + new Random().nextInt(5);
    var countDelayForOtherText = 2;

    const countDelayForAlarmText = 2;

    switch (this.state) {

        case SHOW_MAIN:

            if (this.counter < countDelayForMainText) {
                ++this.counter;

                return mainText;
            } else {
                this.counter = 0;
                this.state = SHOW_FIRST;
                return this.textGroup[0];
            }

        case SHOW_FIRST:
            if (this.counter < countDelayForOtherText) {
                ++this.counter;

                return this.textGroup[0];
            } else {
                this.counter = 0;
                this.state = SHOW_SECOND;
                return this.textGroup[1];
            }
        case SHOW_SECOND:
            if (this.counter < countDelayForOtherText) {
                ++this.counter;

                return this.textGroup[1];
            } else {
                this.counter = 0;
                this.state = SHOW_MAIN;
                return mainText;
            }

        case SHOW_ALARM_NOTIF:
            if (this.counter < this.alarmTextGroup.size()) {
                return this.alarmTextGroup.get(counter++);
            } else {
                this.counter = 0;
                return this.alarmTextGroup.get(counter++);
            }

        default:

            return mainText;
    }

};

DynamicBaseText.prototype.scan = function (alarm) {
    this.setState(SHOW_ALARM_NOTIF);
    var message = alarm.description;
    const re = /\s/;
    this.alarmTextGroup = message.split(re);
    this.alarmTextGroup.add(alarm.getFriendlyTime());
};

DynamicBaseText.prototype.shutdownAlarmState = function () {
    this.setState(SHOW_MAIN);
    this.alarmTextGroup = new Array();
};

/**
 * Actually, it is the center of the clock
 * @param {Number} fractionOfLineShowing The fraction of the line that will be displayed
 * @param {Number} angle The angle this line will subtend at the center, measured with respect to the 3.0.clock angle i.e 0 degs.
 * @param {string} color The color of the line
 * @param {Number} thickness The thickness of the Tick.
 * @param {Boolean} majorTick If true this tick is a major or a bold or longer one
 * @returns {Tick}
 */
function Tick(fractionOfLineShowing, angle, color, thickness, majorTick) {
    this.fractionOfLineShowing = fractionOfLineShowing;
    this.angle = angle;
    this.color = color;
    this.thickness = thickness;
    this.majorTick = majorTick;
}

/**
 *
 * @param clock The clock that owns the tick
 * @return {Point} the coordinates of the beginning of the tick
 */
Tick.prototype.getTickStartPoint = function (clock) {

    var radius = clock.getInnerCircleDimension() / 2.0;
    var stop = clock.getCenter();
    var xEnd = (stop.x + radius * Math.cos(this.angle));
    var yEnd = stop.y - (radius * Math.sin(this.angle));

    return new Point(xEnd, yEnd);
};

/**
 *
 * @param clock The clock that owns the tick
 * @return {Point} the coordinates of the end of the tick
 */
Tick.prototype.getTickEndPoint = function (clock) {
    var start = this.getTickStartPoint(clock);
    var radius = clock.getInnerCircleDimension() / 2.0;
    //len is the distance between the starting point and the stop
    //point on the circumference. It is actually the length of the tick
    //modeled by the line.
    var len = this.fractionOfLineShowing * radius;

    return new Point((start.x - len * Math.cos(this.angle)), start.y + (len * Math.sin(this.angle)));
};




/**
 *
 * @return the number associated with each major tick;
 */
Tick.prototype.getTickValue = function () {
    if (this.angle === 0) {
        return "3";
    } else if (equals(angRadToDegs(angle), 30.0)) {
        return "2";
    } else if (equals(angRadToDegs(angle), 60.0)) {
        return "1";
    } else if (equals(angRadToDegs(angle), 90.0)) {
        return "12";
    } else if (equals(angRadToDegs(angle), 120.0)) {
        return "11";
    } else if (equals(angRadToDegs(angle), 150.0)) {
        return "10";
    } else if (equals(angRadToDegs(angle), 180.0)) {
        return "9";
    } else if (equals(angRadToDegs(angle), 210.0)) {
        return "8";
    } else if (equals(angRadToDegs(angle), 240.0)) {
        return "7";
    } else if (equals(angRadToDegs(angle), 270.0)) {
        return "6";
    } else if (equals(angRadToDegs(angle), 300.0)) {
        return "5";
    } else if (equals(angRadToDegs(angle), 330.0)) {
        return "4";
    } else {
        return "";
    }

};



/**
 *
 * @param g The graphics if the clock.
 * @param clock The clock that owns the tick
 */
Tick.prototype.draw = function (g, clock) {

    var fontSz = clock.getTextFontSize();



    if (clock.tickTextFont === null) {//italic bold 10pt Courier
        clock.tickTextFont = new Font('italic bold', fontSz, 'Gothic', CssSizeUnits.EM);
    }
    if (clock.topTextFont === null) {
        clock.topTextFont = new Font("bold", fontSz, 'Times New Roman', CssSizeUnits.EM);
    }
    if (clock.bottomTextFont === null) {
        clock.bottomTextFont = new Font("bold", fontSz, 'Times New Roman', CssSizeUnits.EM);
    }

    clock.tickTextFont.size = fontSz;
    clock.topTextFont.size = fontSz;
    clock.bottomTextFont.size = fontSz;


    g.setColor(this.color);
    var begin = this.getTickStartPoint(clock);
    var end = this.getTickEndPoint(clock);
    g.setFont(clock.tickTextFont);


    g.setStrokeWidth(this.thickness);

    g.drawLine(begin.x, begin.y, end.x, end.y);

    g.setBackground(this.color);
    var tickVal = this.getTickValue();
    if (tickVal === "12") {
        g.drawString(tickVal, end.x - 7, end.y + 9);
    }
    switch (tickVal) {
        case "1":
        case "2":
            g.drawString(tickVal, end.x - 10, end.y + 6);
            break;
        case "3":
            g.drawString(tickVal, end.x - 10, end.y + 3);
            break;
        case "4":
        case "5":
            g.drawString(tickVal, end.x - 10, end.y);
            break;
        case "6":
            g.drawString(tickVal, end.x - 4, end.y - 2);
            break;
        case "7":
            g.drawString(tickVal, end.x, end.y - 1);
            break;
        case "8":
            g.drawString(tickVal, end.x + 2, end.y);
            break;
        case "9":
            g.drawString(tickVal, end.x + 5, end.y + 3);
            break;
        case "10":
            g.drawString(tickVal, end.x + 2, end.y + 2);
            break;
        case "11":
            g.drawString(tickVal, end.x + 2, end.y + 4);
            break;
        default:
            break;
    }

    if (tickVal === "12") {
        g.setColor("#444");
        var pt = clock.getCenter();
        var dim = clock.getInnerCircleDimension();
        var f = clock.topTextFont;
        var str = "DIGITAL";
        var strWid = g.stringWidth(str);
        g.setFont(f);

        g.drawString(str, (clock.diameter - strWid) / 2, end.y + dim / 6);
    }
    if (tickVal === "6") {
        if (clock.showBaseText === true) {
            var pt = clock.getCenter();
            var dim = clock.getInnerCircleDimension();
            var f = clock.bottomTextFont;
            var str = DYNAMIC_BASE_TEXT.control();
            var strWid = g.stringWidth(str);
            g.setFont(f);
            g.setColor("884");

            g.drawString(str, (clock.diameter - strWid) / 2, pt.y + dim / 4);
        }
    }

};

/**
 *
 * @return the number associated with each major tick;
 */
Tick.prototype.getTickValue = function () {
    if (this.angle === 0) {
        return "3";
    } else if (equals(angRadToDegs(this.angle), 30.0)) {
        return "2";
    } else if (equals(angRadToDegs(this.angle), 60.0)) {
        return "1";
    } else if (equals(angRadToDegs(this.angle), 90.0)) {
        return "12";
    } else if (equals(angRadToDegs(this.angle), 120.0)) {
        return "11";
    } else if (equals(angRadToDegs(this.angle), 150.0)) {
        return "10";
    } else if (equals(angRadToDegs(this.angle), 180.0)) {
        return "9";
    } else if (equals(angRadToDegs(this.angle), 210.0)) {
        return "8";
    } else if (equals(angRadToDegs(this.angle), 240.0)) {
        return "7";
    } else if (equals(angRadToDegs(this.angle), 270.0)) {
        return "6";
    } else if (equals(angRadToDegs(this.angle), 300.0)) {
        return "5";
    } else if (equals(angRadToDegs(this.angle), 330.0)) {
        return "4";
    } else {
        return "";
    }

};





////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




/**
 * Stores a line of text and its pixel width
 * @param {string} txtline
 * @param {Number} width
 * @returns {LineAndWidth}
 */
function LineAndWidth(txtline, width) {
    if (typeof txtline !== 'string' || typeof width !== 'number') {
        this.line = "";
        this.width = 0;
        return;
    }

    this.line = txtline;
    this.width = width;
}



function BubbleMetrics() {
    this.lines = new Array();
    /**
     * The box into which the text is inscribed.
     */
    this.textBoxRect = new Rectangle(0, 0, 0, 0);
    this.textHeight = 0;
    this.verticalWordSpacing = 0;
}


/**
 * @param {Clock} clock The clock that this Bubble belongs to. 
 * @param {string} notification The notification text
 * @param {Point} location The location of the Bubble
 * @param {Number} horSpeed The horizontal component of the speed
 * @param {Number} verSpeed The vertical component of the speed
 * @returns {undefined}
 */
function Bubble(clock, notification, location, horSpeed, verSpeed) {


    if (typeof notification !== 'string') {
        logger("`notification` must be a `string` variable");
        return;
    }

    if (location.constructor.name !== 'Point') {
        logger("`location` must be a `Point` object");
        return;
    }

    if (typeof horSpeed !== 'number') {
        logger("`horSpeed` must be a `number`");
        return;
    }

    if (typeof verSpeed !== 'number') {
        logger("`verSpeed` must be a `number`");
        return;
    }


    this.width = 0;
    this.height = 0;
    this.notification = "";
    this.visible = true;

    /**
     * If true, this needs be garbage collected.
     */
    this.garbage = false;

    /**
     * Move within box boundary.
     */
    this.moveInBox = true;
    /**
     * If true, some critical property got changed, so re-setup the dimensions
     * of the object.
     */
    this.propertyChanged = true;
    /**
     * The horizontal speed.
     */
    this.horSpeed = 1;
    /**
     * The vertical speed.
     */
    this.verSpeed = 1;

    this.metrics = new BubbleMetrics();

    this.direction = MOVE_RIGHT;
    this.location = new Point();

    if (typeof notification !== 'string' || location.constructor.name !== 'Point' || typeof horSpeed !== 'number' || typeof verSpeed !== 'number') {
        this.notification = "";
        this.horSpeed = 0;
        this.verSpeed = 0;
        return;
    }
    this.notification = notification;
    this.location = location;
    this.horSpeed = horSpeed;
    this.verSpeed = verSpeed;
    this.setup(clock);
}

Bubble.prototype.getFont = function (clock) {

    if (clock.constructor.name === 'Clock') {
        var fontSz = clock.getTextFontSize();

        var alarmFontSz = (0.85 * fontSz);
        var alarmTextFont = new Font("", alarmFontSz, "Times New Roman", CssSizeUnits.EM);
        return alarmTextFont;
    }


    return null;
};

Bubble.prototype.setup = function (clock) {
    var ctx = clock.canvas.getContext('2d');

    ctx.font = this.getFont(clock).string();

    var lines = getLinesByMaxWidthAlgorithm(this.notification, ctx, this.width);

    var maxWidth = 0;
    var indexOfMaxWidth = 0;
    var numOfLines = lines.length;

    for (var l in lines) {
        var newWidth = l.width;
        if (newWidth > maxWidth) {
            maxWidth = newWidth;
        }
    }

    var verticalWordSpacing = 4;
    var textHeight = ctx.measureText("M").width;
    var w = maxWidth + 2 * verticalWordSpacing;
    var h = numOfLines * textHeight + (numOfLines + 1) * verticalWordSpacing;


    /**
     * Now w and h are the widths and heights for the maximum inscribed 
     * rectangles in the bubble's ellipse.
     * 
     * To get the size of the ellipse itself, since w = a.sqrt(2),(where w = length of the rectangle and a is the half length of its major axis)
     * then the full width of the ellipse of the bubble...(i.e twice its major half length) is 2*a = 2.w/sqrt(2) = w.sqrt(2)
     * 
     * Also, since h = b.sqrt(2),(where h = breadth of the rectangle and b is the half length of its minor axis)
     * then the full height of the ellipse of the bubble...(i.e twice its minor half length) is is 2*b = 2.h/sqrt(2) = h.sqrt(2)
     * 
     * We will apply some padding between the text and the bubble though and we will make it equal to the vertical word spacing
     */



    this.width = ((w + 2 * verticalWordSpacing) * Math.sqrt(2));
    this.height = ((h + 2 * verticalWordSpacing) * Math.sqrt(2));


    this.metrics.lines = lines;
    this.metrics.textHeight = textHeight;
    this.metrics.verticalWordSpacing = verticalWordSpacing;

    this.metrics.textBoxRect = this.getBiggestInscribedRect();


};

Bubble.prototype.getBiggestInscribedRect = function () {
    var model = new EllipseModel(this.width / 2, this.height / 2, this.width / 2, this.height / 2);
    return model.getBiggestRectangle();
};

Bubble.prototype.getRight = function () {
    return this.location.x + width;
};

Bubble.prototype.getBottom = function () {
    return this.location.y + height;
};

//Not used in Java version, might be removed
Bubble.prototype.intersects = function (s) {
    var modelEllipse = new EllipseModel(this.location.x + this.width / 2, this.location.y + this.height / 2, this.width / 2, this.height / 2);
    return modelEllipse.intersectsWith(s.getBoundingRect());
};

Bubble.prototype.chooseDirection = function () {
    var dir = 0;
    while ((dir = choiceMaker.nextInt(MOVE_DOWN_HOR_RIGHT + 1)) === this.direction) {
    }
    this.direction = dir;
};

Bubble.prototype.move = function (c) {

    if (visible) {

        var xSpeed = horSpeed + Tick.choiceMaker.nextInt(horSpeed);

        var ySpeed = verSpeed + Tick.choiceMaker.nextInt(verSpeed);

        var dx = c.location.x - this.location.x;
        var dy = c.location.y - this.location.y;

        var dist = Math.sqrt(dx * dx + dy * dy);

        logger("[horSpeed , verSpeed , direction] = [" + horSpeed + " , " + verSpeed + " , " + direction + "]");

        if (this.moveInBox) {

            switch (this.direction) {

                case MOVE_AWAY:

                    if (this.location.x > 0) {
                        this.location.x -= 2 * xSpeed;
                        if (c.location.x > this.location.x && dist > 2 * this.width) {
                            this.garbage = true;
                        }
                    } else {
                        this.location.x = 0;
                        this.chooseDirection();
                    }

                    break;
                case MOVE_LEFT:
                    if (this.location.x > 0) {
                        this.location.x -= xSpeed;
                    } else {
                        this.location.x = 0;
                        this.chooseDirection();
                    }

                    break;
                case MOVE_RIGHT:
                    if (this.getRight() < c.getDiameter()) {
                        this.location.x += xSpeed;
                    } else {
                        this.location.x = c.getDiameter() - this.width;
                        this.chooseDirection();
                    }

                    break;
                case MOVE_UP:
                    if (this.location.y > 0) {
                        this.location.y -= ySpeed;
                    } else {
                        this.location.y = 0;
                        this.chooseDirection();
                    }

                    break;
                case MOVE_DOWN:

                    if (this.getBottom() < c.getDiameter()) {
                        this.location.y += ySpeed;
                    } else {
                        this.location.y = c.getDiameter() - this.height;
                        this.chooseDirection();
                    }

                    break;

                case MOVE_DOWN_HOR_LEFT:

                    if (this.location.x > 0) {
                        this.location.x -= xSpeed;
                    } else {
                        this.location.x = 0;
                        this.direction = MOVE_DOWN_HOR_RIGHT;
                    }

                    if (this.getBottom() < c.getDiameter()) {
                        this.location.y += ySpeed;
                    } else {
                        this.location.y = c.getDiameter() - this.height;
                        this.direction = MOVE_UP_HOR_LEFT;
                    }

                    break;
                case MOVE_DOWN_HOR_RIGHT:

                    if (this.getRight() < c.getDiameter()) {
                        this.location.x += xSpeed;
                    } else {
                        this.location.x = c.getDiameter() - this.width;
                        direction = MOVE_DOWN_HOR_LEFT;
                    }

                    if (this.getBottom() < c.getDiameter()) {
                        this.location.y += ySpeed;
                    } else {
                        this.location.y = c.getDiameter() - this.height;
                        this.direction = MOVE_UP_HOR_RIGHT;
                    }

                    break;
                case MOVE_UP_HOR_RIGHT:

                    if (this.getRight() < c.getDiameter()) {
                        this.location.x += xSpeed;
                    } else {
                        this.location.x = c.getDiameter() - this.width;
                        this.direction = MOVE_UP_HOR_LEFT;
                    }

                    if (this.location.y > 0) {
                        this.location.y -= ySpeed;
                    } else {
                        this.location.y = 0;
                        this.direction = MOVE_DOWN_HOR_RIGHT;
                    }
                    break;
                case MOVE_UP_HOR_LEFT:

                    if (this.location.x > 0) {
                        this.location.x -= xSpeed;
                    } else {
                        this.location.x = 0;
                        this.direction = MOVE_UP_HOR_RIGHT;
                    }

                    if (this.location.y > 0) {
                        this.location.y -= ySpeed;
                    } else {
                        this.location.y = 0;
                        this.direction = MOVE_DOWN_HOR_LEFT;
                    }
                    break;

            }

        }

    }


};
/**
 * 
 * @param {type} c The Clock
 * @param {type} g The Graphics object
 * @returns {undefined}
 */
Bubble.prototype.draw = function (c, g) {
    if (this.visible === true && !this.notification.isEmpty()) {


        this.move(c);

        if (this.propertyChanged) {
            this.setup();
        }




        g.fillOval(0, 0, this.width, this.height);


        g.setColor("#FFF");
        g.setFont(this.getFont(c));



        var r = this.metrics.textBoxRect;

        var left = (this.width - r.width) / 2 + this.metrics.verticalWordSpacing;
        var topY = (this.height - r.height) / 2 + this.metrics.verticalWordSpacing + 3 * this.metrics.textHeight / 4;



        for (var i = 0; i < this.metrics.lines.size(); i++) {
            g.drawString(this.metrics.lines.get(i).getLine(), left, topY + i * (this.metrics.verticalWordSpacing + this.metrics.textHeight));
        }

    }//end if visible

};



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    




function Alarm(alarmText, hh, mm, sec) {


    if (typeof alarmText !== 'string') {
        logger("`alarmText` must be a `string` variable");
        return;
    }

    if (typeof hh !== 'number') {
        logger("`hh` must be a `number`");
        return;
    }

    if (typeof mm !== 'number') {
        logger("`mm` must be a `number`");
        return;
    }

    if (typeof sec !== 'number') {
        logger("`sec` must be a `number`");
        return;
    }



    if (hh === 0) {
        logger("The hour must lie between 1 and 23");
    }
    if (mm === 0) {
        logger("The minute must lie between 1 and 59");
    }
    if (sec === 0) {
        logger("The hour must lie between 1 and 59");
    }
    if (alarmText === null || alarmText.isEmpty()) {
        logger("Please enter a valid description for the alarm.");
    }


    this.notificationBubble = new Bubble("", new Point(0, 0), 0, 0);


    this.description = alarmText !== null && !alarmText.isEmpty() ? alarmText : "";
    this.id = new Random().generateUUID();

    this.hh = hh >= 1 && hh <= 23 ? hh : -1;
    this.mm = mm >= 0 && mm <= 59 ? mm : -1;
    this.sec = sec >= 0 && sec <= 59 ? sec : -1;
    /**
     * If true, the code has discovered that this Alarm's time has come. So it places the
     * Alarm in the ringing state. One the code has finished running this ALarm, it sets
     * this flag to false.
     * 
     */
    this.nowRunning = false;
    /**
     * The user might decide to disable this alarm.
     */
    this.userDisabled = false;


}

Alarm.prototype.initBubble = function (c) {
    var pt = c.getCenter();

    var x = pt.x;
    var y = pt.x;

    this.notificationBubble = new Bubble("Alarm at: " + this.getFriendlyTime() + ".\n" + description, new Point(x, y), 5, 5);
};





Alarm.prototype.getFriendlyTime = function () {

    var hour = this.hh + "";
    var min = this.mm + "";
    var secs = this.sec + "";

    hour = hour.length() === 1 ? "0" + hour : hour;
    min = min.length() === 1 ? "0" + min : min;
    secs = secs.length() === 1 ? "0" + secs : secs;


    return hour + ":" + min + ":" + secs;
};


function getErrorNotif(hh, mm, sec, description) {

    if (hh === -1) {
        return "The hour must lie between 1 and 23";
    }
    if (mm === -1) {
        return "The minute must lie between 1 and 59";
    }
    if (sec === -1) {
        return "The hour must lie between 1 and 59";
    }
    if (description === null || description.isEmpty()) {
        return "Please enter a valid description for the alarm.";
    }
    return "Some error occurred.";
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////







/**
 * {
 * canvasId: "xxxx",
 * floating: true,
 * outerColor: "css-color",
 * middleColor: "css-color",
 * innerColor: "css-color",
 * centerSpotWidth: number,
 * outerCircleAsFractionOfFrameSize: float_zero_to_1,
 * showBaseText: false,
 * canvas:{
 * x: 100,
 * y: 100,
 * width: 100,
 * height: 100,
 * }
 * 
 * 
 * 
 * }
 * 
 * You define the `floating` option when you dont want to add any code to the HTML DOM yourself.
 * You are saying that the Clock should create its own canvas element, add it to the DOM and use it as its own drawing area.
 * Whether or not you define the `floating` option, you must define the canvasId.
 * If you define the `floating` option, the canvas id would be used as the DOM id of the dynamically created canvas added to the DOM
 * If you do not define the `floating` option, the Clock will look (through the DOM) for a canvas having the specified canvasId and use it for its drawing area.
 * 
 * @param {Object} options
 * @returns {Clock}
 */
function Clock(options) {
    this.outerCircleAsFractionOfFrameSize = 1.0;
    this.centerSpotWidth = 3;
    this.outerColor = "transparent";
    this.middleColor = "#262626";
    this.innerColor = "#000";
    this.showBaseText = false;

    var DEFAULT_SIZE = 150;


// The canvas id must be specified, it is used as the DOM id of the canvas element
    if (options.canvasId) {
        if (typeof options.canvasId !== 'string') {
            logger("The field: `canvasId` must be a string");
            return;
        }
    } else {
        logger("No field: `canvasId` This field is mandatory!");
        return;
    }

//floating option defined, so pay attention!
    if (typeof options.floating !== 'undefined') {
        if (typeof options.floating !== 'boolean') {
            logger("The field called: `floating` must be a `true` or a `false`. Clock not created");
            return;
        }
        if (options.floating === true) {//creates own canvas and injects in the DOM
            if (typeof options.canvas === 'undefined') {
                logger("Please define the width and height of the canvas to be created for the clock as an options.canvas object. Currently setting the area to `100 X 100`");
                var area = new Object();
                area.width = DEFAULT_SIZE;
                area.height = DEFAULT_SIZE;
                options['canvas'] = area;
            } else {
                if (typeof options.canvas.width === 'undefined') {
                    logger("You need to define the `width` sub-field in the options.canvas field. Creating it for you and defaulting it to `" + DEFAULT_SIZE + "`");
                    options.canvas.width = DEFAULT_SIZE;
                }
                if (typeof options.canvas.height === 'undefined') {
                    logger("You need to define the `height` sub-field in the options.canvas field. Creating it for you and defaulting it to `" + DEFAULT_SIZE + "`");
                    options.canvas.height = DEFAULT_SIZE;
                }
                if (typeof options.canvas.width !== 'number') {
                    logger("The `width` option must be a number type! Fixing it for you and defaulting it to " + DEFAULT_SIZE + "`");
                    options.canvas.width = DEFAULT_SIZE;
                }
                if (typeof options.canvas.height !== 'number') {
                    logger("The `height` option must be a number type! Fixing it for you and defaulting it to " + DEFAULT_SIZE + "`");
                    options.canvas.height = DEFAULT_SIZE;
                }

                var defX = options.canvas.width / 2;
                var defY = options.canvas.width / 2;

                if (typeof options.canvas.x === 'undefined') {
                    logger("You need to define the `x` sub-field in the options.canvas field. Creating it for you and defaulting it to `" + defX + "`");
                    options.canvas.x = defX;
                }
                if (typeof options.canvas.y === 'undefined') {
                    logger("You need to define the `y` sub-field in the options.canvas field. Creating it for you and defaulting it to `" + defY + "`");
                    options.canvas.y = defY;
                }
                if (typeof options.canvas.x !== 'number') {
                    logger("The `x` option must be a number type! Fixing it for you and defaulting it to " + defX + "`");
                    options.canvas.x = defX;
                }
                if (typeof options.canvas.y !== 'number') {
                    logger("The `y` option must be a number type! Fixing it for you and defaulting it to " + defY + "`");
                    options.canvas.y = defY;
                }
            }
            //Create the canvas dynamically and inject it in the DOM.

            this.canvas = createCanvas(options.canvasId, options.canvas.width, options.canvas.height,  options.canvas.x,  options.canvas.y);
            dragElement(this.canvas);
        } else {//get canvas from the DOM
            this.canvas = document.getElementById(options.canvasId);
        }
        this.floating = options.floating;
    } else {
        this.floating = false;
        this.canvas = document.getElementById(options.canvasId);
    }






    if (options.outerCircleAsFractionOfFrameSize) {
        if (typeof options.outerCircleAsFractionOfFrameSize === 'number') {
            this.outerCircleAsFractionOfFrameSize = options.outerCircleAsFractionOfFrameSize;
            /**
             * The size of the outermost circle of the clock expressed as a fraction of
             * the clock size
             */
            this.outerCircleAsFractionOfFrameSize = (this.outerCircleAsFractionOfFrameSize <= 1) ? this.outerCircleAsFractionOfFrameSize : 0.9;
        } else {
            logger("The field: `outerCircleAsFractionOfFrameSize` must be a number");
            return;
        }
    } else {
        logger("No field: `outerCircleAsFractionOfFrameSize`");
        this.outerCircleAsFractionOfFrameSize = 1.0;
    }
    if (options.centerSpotWidth) {
        if (typeof options.centerSpotWidth === 'number') {

            /**
             * The size of the circle at the center of the clock to which all clock
             * hands are hinged.
             */

            this.centerSpotWidth = options.centerSpotWidth;
        } else {
            logger("The field: `centerSpotWidth` must be a number");
            this.centerSpotWidth = 3;
        }
    } else {
        logger("No field: `centerSpotWidth`");
    }

    if (options.outerColor) {
        if (typeof options.outerColor === 'string') {
            //The general color of the clock's outer background
            this.outerColor = options.outerColor;
        } else {
            logger("The field: `outerColor` must be a string");
            return;
        }
    } else {
        logger("No field: `outerColor`");
        this.outerColor = "transparent";
    }


    if (options.middleColor) {
        if (typeof options.middleColor === 'string') {
            //The color between the 2 circles on the clock
            this.middleColor = options.middleColor;
        } else {
            logger("The field: `middleColor` must be a string");
            return;
        }
    } else {
        logger("No field: `middleColor`");
        this.middleColor = "#262626";
    }


    if (options.innerColor) {
        if (typeof options.innerColor === 'string') {
            //The color of the clock's inner background
            this.innerColor = options.innerColor;
        } else {
            logger("The field: `innerColor` must be a string");
            return;
        }
    } else {
        logger("No field: `innerColor`");
        this.innerColor = "#000";
    }

    if (typeof options.showBaseText === 'undefined') {
        logger("No field: `showBaseText`");
        this.showBaseText = true;
    } else if (typeof options.showBaseText === 'boolean') {
        this.showBaseText = options.showBaseText;
    } else {
        logger("The field: `showBaseText` must be a Boolean(true|false)");
        return;
    }


    this.settingsOpened = false;
    this.alarms = [];

    this.canvas.style.backgroundColor = 'transparent';
    this.canvas.height = this.canvas.width;

    this.diameter = this.canvas.width - 4;


    /**
     * The location of the clock center.
     */
    this.center = new Point(this.canvas.width / 2, this.canvas.width / 2);



    /**
     * The color of the center point.
     */
    this.centerSpotColor = this.middleColor;


    /**
     * The size of the inner circle of the clock expressed as a fraction of the
     * clock size
     */
    this.innerCircleAsFractionOfFrameSize = 0.9 * this.outerCircleAsFractionOfFrameSize;

    /**
     * The ticks
     */
    this.ticks = new Array();//new Tick[60];



    this.tickTextFont = new Font('italic bold', 0.9, 'Gothic', CssSizeUnits.EM);
    this.topTextFont = new Font('bold', 0.9, 'Times New Roman', CssSizeUnits.EM);
    this.bottomTextFont = new Font('bold', 0.9, 'Papyrus', CssSizeUnits.EM);



    /**
     * The seconds hand;
     */
    this.secondsHand = new ClockHand(HandType.SECONDHAND, 0.82 * this.outerCircleAsFractionOfFrameSize, 0, "#f00");
    /**
     * The minute hand;
     */
    this.minuteHand = new ClockHand(HandType.MINUTEHAND, 0.8 * this.outerCircleAsFractionOfFrameSize, 1, "#bbb");
    /**
     * The hour hand;
     */
    this.hourHand = new ClockHand(HandType.HOURHAND, 0.6 * this.outerCircleAsFractionOfFrameSize, 2, "#bbb");

    this.location = new Point();

    var i = 0;
    for (var angle = 0; i < 60; i++) {

        if (i % 5 === 0) {
            this.ticks[i] = new Tick(0.1, angle, "#fff", 2, true);
        } else {
            this.ticks[i] = new Tick(0.04, angle, "#fff", 2, false);
        }
        angle += (6 * Math.PI / 180);
    }//end for

    this.screenSize = new Dimension(screenWidth, screenHeight);

    this.monitor = new AlarmMonitor();

    this.end = false;

//    var clock = this;
//    var canvas = this.canvas;
//    this.canvas.onmouseup = function (e) {
//        var point = clock.getMousePos(canvas, e);
//    };
//    this.canvas.onmousemove = function (e) {
//        var point = clock.getMousePos(canvas, e);
//    };
//    this.canvas.onmousedown = function (e) {
//        var point = clock.getMousePos(canvas, e);
//    };


}

function createCanvas(canvasId, width, height, x, y) {
    var canvas = document.createElement('canvas');
    canvas.id = canvasId;
    canvas.width = width;
    canvas.height = height;
    canvas.style.zIndex = 8;
    canvas.style.position = "absolute";
    canvas.style.left = x+"px";
    canvas.style.top = y+"px";
    canvas.style.border = "0px solid";


    var body = document.getElementsByTagName("body")[0];
    body.appendChild(canvas);

    return canvas;
}

Clock.prototype.run = function () {
    var clock = this;
    var interval = setInterval(function () {
        if (clock.end === false) {
            clock.draw();
        } else {
            clearInterval(interval);
        }
    }, 700);
};

Clock.prototype.kill = function () {
    this.end = true;
};

Clock.prototype.getCenter = function () {
    return this.center;
};


Clock.prototype.getOuterCircleAsFractionOfFrameSize = function () {
    return this.outerCircleAsFractionOfFrameSize;
};

Clock.prototype.setOuterCircleAsFractionOfFrameSize = function (outerCircleAsFractionOfFrameSize) {
    this.outerCircleAsFractionOfFrameSize = outerCircleAsFractionOfFrameSize;
};

Clock.prototype.getTextFontSize = function () {
    return  ((25 / 9500) * this.diameter);
};

Clock.prototype.getOuterCircleDimension = function () {
    return  (this.outerCircleAsFractionOfFrameSize * this.diameter);
};

Clock.prototype.getInnerCircleDimension = function () {
    return  (this.innerCircleAsFractionOfFrameSize * this.diameter);
};

Clock.prototype.getMousePos = function (canvas, evt) {
    var rect = canvas.getBoundingClientRect(), // abs. size of element
            scaleX = canvas.width / rect.width, // relationship bitmap vs. element for X
            scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for Y

    return {
        x: (evt.clientX - rect.left) * scaleX, // scale mouse coordinates after they have
        y: (evt.clientY - rect.top) * scaleY     // been adjusted to be relative to element
    };
};

Clock.prototype.getDiameter = function () {
    return this.diameter;
};


Clock.prototype.getCenterSpotWidth = function () {
    return this.centerSpotWidth;
};



Clock.prototype.draw = function () {


    var g = new Graphics(this.canvas);

    g.setBackground(this.outerColor);
    g.fillRect(0, 0, this.diameter, this.diameter);
    g.setStrokeWidth(1);

    var outer = this.getOuterCircleDimension() + 2;
    var inner = this.getInnerCircleDimension();

    g.setBackground(this.middleColor);
    g.fillOval(this.center.x, this.center.y, outer / 2, outer / 2);
    g.setBackground(this.innerColor);
    g.fillOval(this.center.x, this.center.y, inner / 2, inner / 2);
    g.setBackground(this.centerSpotColor);
    g.fillOval(this.center.x, this.center.y, this.centerSpotWidth, this.centerSpotWidth);
    g.setBackground(rgbToHex(153, 153, 0));
    g.fillOval(this.center.x, this.center.y, this.centerSpotWidth / 2, this.centerSpotWidth / 2);


    for (var i = 0; i < this.ticks.length; i++) {
        this.ticks[i].draw(g, this);
    }
    this.secondsHand.fill(g, this);
    this.minuteHand.fill(g, this);
    this.hourHand.fill(g, this);

    this.secondsHand.getAngleForEachState();
    this.minuteHand.getAngleForEachState();
    this.hourHand.getAngleForEachState();



};


Clock.prototype.fireAlarm = function () {

    var now = new Date();

    var millis = ALARM_DURATION_IN_MINUTES * 60 * 1000;

//    for (var alarm in this.alarms) {
//
//    }

    this.alarms.forEach((alarm) => {

        if (!alarm.isUserDisabled()) {


            var yr = now.getFullYear();
            var mth = now.getMonth();
            var dyOfMth = now.getDate();
            var hr = now.getHours();
            var mm = now.getMinutes();
            var sec = now.getSeconds();


            var alarmTime = new Date();
            alarmTime.setFullYear(yr);
            alarmTime.setMonth(mth);
            alarmTime.setDate(dyOfMth);
            alarmTime.setHours(alarm.hh);
            alarmTime.setMinutes(alarm.mm);
            alarmTime.setSeconds(alarm.sec);


            var millisDiff = now.getTime()() - alarmTime.getTime();

            if (millisDiff >= 0) {
                if (millisDiff <= millis) {
                    play("heal8.ogg");

                    if (DYNAMIC_BASE_TEXT.getState() !== DynamicBaseText.SHOW_ALARM_NOTIF) {
                        alarm.nowRunning = true;
                        alarm.initBubble(this);
                        DYNAMIC_BASE_TEXT.scan(alarm);
                    }

                } else {
                    if (alarm.nowRunning) {
                        alarm.nowRunning = false;
                        if (DYNAMIC_BASE_TEXT.getState() === DynamicBaseText.SHOW_ALARM_NOTIF) {
                            DYNAMIC_BASE_TEXT.shutdownAlarmState();
                        }
                    }

                }
            }

        }
    });

};

Clock.prototype.setDiameter = function (diameter) {
    this.diameter = diameter;

    this.canvas.width = diameter;
    this.canvas.height = this.canvas.width;

    this.location = new Point((screenWidth - this.diameter) / 2, (screenWidth - this.diameter) / 2);
    this.center = new Point(this.canvas.width / 2, this.canvas.width / 2);
    this.secondsHand.setHandLengthAsFractionOfClockWidth(0.82 * this.outerCircleAsFractionOfFrameSize);
    this.minuteHand.setHandLengthAsFractionOfClockWidth(0.8 * this.outerCircleAsFractionOfFrameSize);
    this.hourHand.setHandLengthAsFractionOfClockWidth(0.6 * this.outerCircleAsFractionOfFrameSize);
};


Clock.prototype.play = function (fileName) {
    if (typeof fileName === 'string') {
        var audio = new Audio(fileName);
        audio.play();
    }
};