/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */





/* global CssSizeUnits */



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



/**
 * 
 * @param {Array} xpoints
 * @param {Array} ypoints
 * @param {Number} npoints
 * @returns {Polygon}
 */
function Polygon(xpoints, ypoints, npoints) {
    
    this.bounds = new Rectangle();
    if (xpoints && ypoints && xpoints.length !== ypoints.length) {
        logger('xpoints and ypoints must have the same size.');
        return;
    }
    
    if (Object.prototype.toString.call(xpoints) !== '[object Array]') {
        logger('xpoints must be an array of integer numbers');
        this.xpoints = [];
    }else{
        this.xpoints = xpoints;
    }
    if (Object.prototype.toString.call(ypoints) !== '[object Array]') {
        logger('ypoints must be an array of integer numbers');
        this.ypoints = [];
    }else{
        this.ypoints = ypoints;
    }
    if (typeof npoints !== 'number') {
        logger('npoints must be an integer number');
        npoints = this.xpoints.length;
    }else{
        this.npoints = npoints;
    }
}

/**
 * 
 * @param {Number} x The x coordinate of the Point
 * @param {Number} y The y coordinate of the Point
 * @returns {undefined}
 */
Polygon.prototype.addPoint = function (x, y) {
    if (typeof x !== 'number') {
        logger('x must be an integer number');
        return;
    }
    if (typeof y !== 'number') {
        logger('y must be an integer number');
        return;
    }
    this.xpoints.push(x);
    this.ypoints.push(y);

    this.npoints += 1;
};

/**
 * Add an array of points to the Polygon
 * @param {Array} xpts The array of x points
 * @param {Array} ypts The array of y points
 * @returns {undefined}
 */
Polygon.prototype.addPoints = function (xpts, ypts) {
    if (Object.prototype.toString.call(xpts) !== '[object Array]') {
        logger('xpts must be an array of integer numbers');
        return;
    }
    if (Object.prototype.toString.call(ypts) !== '[object Array]') {
        logger('ypts must be an array of integer numbers');
        return;
    }

    if (xpts.length === ypts.length) {
        this.xpoints.push.apply(xpts);
        this.ypoints.push.apply(ypts);
        this.npoints += xpts.length;
    } else {
        logger('xpts and ypts must have the same length');
    }

};


/**
 * 
 * @param {Number} x The x coordinate of a point
 * @param {Number} y The y coordinate of a point
 * @returns {Number|Boolean}
 */
Polygon.prototype.contains = function (x, y) {
    if (this.npoints <= 2 || !this.getBoundingBox().contains(x, y)) {
        return false;
    }
    var hits = 0;

    var lastx = xpoints[npoints - 1];
    var lasty = ypoints[npoints - 1];
    var curx, cury;

    // Walk the edges of the polygon
    for (var i = 0; i < npoints; i++) {
        curx = xpoints[i];
        cury = ypoints[i];

        if (cury === lasty) {
            continue;
        }

        var leftx;
        if (curx < lastx) {
            if (x >= lastx) {
                continue;
            }
            leftx = curx;
        } else {
            if (x >= curx) {
                continue;
            }
            leftx = lastx;
        }

        var test1, test2;
        if (cury < lasty) {
            if (y < cury || y >= lasty) {
                continue;
            }
            if (x < leftx) {
                hits++;
                continue;
            }
            test1 = x - curx;
            test2 = y - cury;
        } else {
            if (y < lasty || y >= cury) {
                continue;
            }
            if (x < leftx) {
                hits++;
                continue;
            }
            test1 = x - lastx;
            test2 = y - lasty;
        }

        if (test1 < (test2 / (lasty - cury) * (lastx - curx))) {
            hits++;
        }
    }
    lastx = curx;
    lasty = cury;
    return ((hits & 1) !== 0);
};

Polygon.prototype.getBoundingBox = function () {
    if (this.npoints === 0) {
        return new Rectangle();
    }
    if (bounds === null) {
        this.calculateBounds(this.xpoints, this.ypoints, this.npoints);
    }
    return this.bounds.getBounds();
};

/*
 * Calculates the bounding box of the points passed to the constructor.
 * Sets {@code bounds} to the result.
 * @param {Array} xpts array of <i>x</i> coordinates
 * @param {Array} ypts array of <i>y</i> coordinates
 * @param {Number} npoints the total number of points
 */
Polygon.prototype.calculateBounds = function (xpts, ypts, npts) {
    if (Object.prototype.toString.call(xpts) !== '[object Array]') {
        logger('xpts must be an array of integer numbers');
        return;
    }
    if (Object.prototype.toString.call(ypts) !== '[object Array]') {
        logger('ypts must be an array of integer numbers');
        return;
    }
    if (typeof npts !== 'number') {
        logger('npts must be an integer number');
    }
    var boundsMinX = Number.MAX_VALUE;
    var boundsMinY = Number.MAX_VALUE;
    var boundsMaxX = Number.MIN_VALUE;
    var boundsMaxY = Number.MIN_VALUE;

    for (var i = 0; i < npoints; i++) {
        var x = xpts[i];
        boundsMinX = Math.min(boundsMinX, x);
        boundsMaxX = Math.max(boundsMaxX, x);
        var y = ypts[i];
        boundsMinY = Math.min(boundsMinY, y);
        boundsMaxY = Math.max(boundsMaxY, y);
    }
    this.bounds = new Rectangle(boundsMinX, boundsMinY,
            boundsMaxX,
            boundsMaxY);
};

   /*
     * Resizes the bounding box to accommodate the specified coordinates.
     * @param x,&nbsp;y the specified coordinates
     */
Polygon.prototype.updateBounds = function (x, y) {
        if (x < this.bounds.x) {
            this.bounds.width = this.bounds.width + (this.bounds.x - x);
            this.bounds.x = x;
        }
        else {
            this.bounds.width = Math.max(this.bounds.width, x - this.bounds.x);
        }

        if (y < this.bounds.y) {
            this.bounds.height = this.bounds.height + (this.bounds.y - y);
            this.bounds.y = y;
        }
        else {
            this.bounds.height = Math.max(this.bounds.height, y - this.bounds.y);
        }
    };
    




////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * 
 * @param {string} style
 * @param {Number} size
 * @param {string} name
 * @param {Object} sizeUnits
 * @returns {Font}
 */
function Font(style , size, name, sizeUnits){
    this.style = style;
    this.size = size;
    this.name = name;
    
    if(typeof sizeUnits === 'undefined'){
       this.sizeUnits = CssSizeUnits.EM;
    }else{
        this.sizeUnits = sizeUnits;
    }
}

Font.prototype.string = function (){
    return this.style+' '+this.size+this.sizeUnits+' '+this.name;
};

Font.prototype.getSize = function (){
    return this.size;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function Graphics(canvas) {
    this.ctx = canvas.getContext('2d');
    this.ctx.strokeStyle = "#000";
    this.ctx.lineWidth = 4;
    this.ctx.globalAlpha = 1.0;
    this.ctx.fillStyle = "#FFF";
    this.ctx.font = "bold 0.9em Arial";
}


/**
 * 
 * @param {Font} font
 * @returns {undefined}
 */
Graphics.prototype.setFont = function (font) {
   if (font.constructor.name === 'Font') {
        this.ctx.font = font.string();
    }
};

/**
 * 
 * @param {string} color
 * @returns {undefined}
 */
Graphics.prototype.setColor = function (color) {
    if (typeof color === 'string') {
        this.ctx.strokeStyle = color;
    }
};

/**
 * 
 * @param {string} bg
 * @returns {undefined}
 */
Graphics.prototype.setBackground = function (bg) {
    if (typeof bg === 'string') {
        this.ctx.fillStyle = bg;
    }
};

/**
 * 
 * @param {Number} strokeWidth
 * @returns {undefined}
 */
Graphics.prototype.setStrokeWidth = function (strokeWidth) {
    if (typeof strokeWidth === 'number') {
        this.ctx.lineWidth = strokeWidth;
    }
};

/**
 * 
 * @param {Number} alpha A number between 0 and 1
 * @returns {undefined}
 */
Graphics.prototype.setAlpha = function (alpha) {
    if (typeof alpha === 'number') {
        this.ctx.globalAlpha = alpha;
    }
};

/**
 * ctx.lineJoin = "bevel" || "round" || "miter";
 * @param {string} lineJoinStyle
 * @returns {undefined}
 */
Graphics.prototype.lineJoinStyle = function (lineJoinStyle) {
    if (typeof lineJoinStyle === 'string') {
        this.ctx.lineJoin = lineJoinStyle;
    }
};

/**
 * ctx.lineCap = "butt" || "round" || "square";
 * @param {string} lineCapStyle
 * @returns {undefined}
 */
Graphics.prototype.lineCapStyle = function (lineCapStyle) {
    if (typeof lineCapStyle === 'string') {
        this.ctx.lineCap = lineCapStyle;
    }
};


/**
 * Draws a rectangular shape's outline
 * @param {type} x The left coordinates of the rectangle
 * @param {type} y The right top coordinates of the rectangle
 * @param {type} width The width of the rectangle
 * @param {type} height The height of the rectangle
 * @returns {undefined}
 */
Graphics.prototype.drawRect = function (x, y, width, height) {
    if (typeof x === 'number' && typeof height === 'number' && typeof width === 'number' && typeof height === 'number') {
        this.ctx.strokeRect(x, y, width, height);
    }
};


/**
 * Fills a rectangular shape with color
 * @param {type} x The left coordinates of the rectangle
 * @param {type} y The right top coordinates of the rectangle
 * @param {type} width The width of the rectangle
 * @param {type} height The height of the rectangle
 * @returns {undefined}
 */
Graphics.prototype.fillRect = function (x, y, width, height) {
    if (typeof x === 'number' && typeof height === 'number' && typeof width === 'number' && typeof height === 'number') {
        this.ctx.fillRect(x, y, width, height);
    }
};



/**
 * Fills a rectangular shape with color
 * @param {type} x The left coordinates of the rectangle
 * @param {type} y The right top coordinates of the rectangle
 * @param {type} width The width of the rectangle
 * @param {type} height The height of the rectangle
 * @returns {undefined}
 */
Graphics.prototype.drawArc = function (x, y, width, height) {
    if (typeof x === 'number' && typeof height === 'number' && typeof width === 'number' && typeof height === 'number') {
        this.ctx.fillRect(x, y, width, height);
    }
};


/**
 * Draws an ellipse
 * @param {Number} cenX The x-center of the ellipse
 * @param {Number} cenY The y-center of the ellipse
 * @param {Number} radX The ellipse's major-axis radius. Must be non-negative.
 * @param {Number} radY The ellipse's minor-axis radius. Must be non-negative.
 * @param {Number} rotation The rotation of the ellipse, expressed in radians.
 * @param {Number} startAngle The angle at which the ellipse starts, measured clockwise from the positive x-axis and expressed in radians.
 * @param {Number} endAngle The angle at which the ellipse ends, measured clockwise from the positive x-axis and expressed in radians.
 * @param {Number} counterclockwise An optional Boolean which, if true, draws the ellipse counterclockwise (anticlockwise). The default value is false (clockwise).
 * @returns {undefined}
 */
Graphics.prototype.drawEllipse = function (cenX, cenY, radX, radY, rotation, startAngle, endAngle, counterclockwise) {
    if (typeof cenX === 'number' && typeof cenY === 'number' && typeof radX === 'number' && typeof radY === 'number' &&
            typeof rotation === 'number' && typeof startAngle === 'number' && typeof endAngle === 'number' && typeof counterclockwise === 'boolean') {
        this.ctx.beginPath();
        this.ctx.ellipse(cenX, cenY, radX, radY, rotation, startAngle, endAngle, counterclockwise);
        this.ctx.closePath();
        this.ctx.stroke();
    }
};

/**
 * Fills an ellipse
 * @param {Number} cenX The x-center of the ellipse
 * @param {Number} cenY The y-center of the ellipse
 * @param {Number} radX The ellipse's major-axis radius. Must be non-negative.
 * @param {Number} radY The ellipse's minor-axis radius. Must be non-negative.
 * @param {Number} rotation The rotation of the ellipse, expressed in radians.
 * @param {Number} startAngle The angle at which the ellipse starts, measured clockwise from the positive x-axis and expressed in radians.
 * @param {Number} endAngle The angle at which the ellipse ends, measured clockwise from the positive x-axis and expressed in radians.
 * @param {Number} counterclockwise An optional Boolean which, if true, draws the ellipse counterclockwise (anticlockwise). The default value is false (clockwise).
 * @returns {undefined}
 */
Graphics.prototype.fillEllipse = function (cenX, cenY, radX, radY, rotation, startAngle, endAngle, counterclockwise) {
    if (typeof cenX === 'number' && typeof cenY === 'number' && typeof radX === 'number' && typeof radY === 'number' &&
            typeof rotation === 'number' && typeof startAngle === 'number' && typeof endAngle === 'number' && typeof counterclockwise === 'boolean') {
        this.ctx.beginPath();
        this.ctx.ellipse(cenX, cenY, radX, radY, rotation, startAngle, endAngle, counterclockwise);
        this.ctx.closePath();
        this.ctx.fill();
    }
};



/**
 * Same as drawEllipse, but with less options
 * @param {Number} cenX The x-center of the ellipse
 * @param {Number} cenY The y-center of the ellipse
 * @param {Number} radX The ellipse's major-axis radius. Must be non-negative.
 * @param {Number} radY The ellipse's minor-axis radius. Must be non-negative.
 * @returns {undefined}
 */
Graphics.prototype.drawOval = function (cenX, cenY, radX, radY) {
    if (typeof cenX === 'number' && typeof cenY === 'number' && typeof radX === 'number' && typeof radY === 'number') {
        this.ctx.beginPath();
        this.ctx.ellipse(cenX, cenY, radX, radY, 0, 0, 2 * Math.PI, false);
        this.ctx.closePath();
        this.ctx.stroke();
    }
};

/**
 * Same as fillEllipse, but with less options
 * @param {Number} cenX The x-center of the ellipse
 * @param {Number} cenY The y-center of the ellipse
 * @param {Number} radX The ellipse's major-axis radius. Must be non-negative.
 * @param {Number} radY The ellipse's minor-axis radius. Must be non-negative.
 * @returns {undefined}
 */
Graphics.prototype.fillOval = function (cenX, cenY, radX, radY) {
    if (typeof cenX === 'number' && typeof cenY === 'number' && typeof radX === 'number' && typeof radY === 'number') {
        this.ctx.beginPath();
        this.ctx.ellipse(cenX, cenY, radX, radY, 0, 0, 2 * Math.PI, false);
        this.ctx.closePath();
        this.ctx.fill();
       
    }
};

/**
 * Draws a circle
 * @param {Number} cenX The x center  of the circle
 * @param {Number} cenY The y center  of the circle
 * @param {Number} radius The radius of the circle
 * @returns {undefined}
 */
Graphics.prototype.drawCircle = function (cenX, cenY, radius) {
    if (typeof cenX === 'number' && typeof cenY === 'number' && typeof radius === 'number') {
        this.drawOval(cenX, cenY, radius, radius);
    }
};


/**
 * Fills a circle
 * @param {Number} cenX The x center  of the circle
 * @param {Number} cenY The y center  of the circle
 * @param {Number} radius The radius of the circle
 * @returns {undefined}
 */
Graphics.prototype.drawCircle = function (cenX, cenY, radius) {
    if (typeof cenX === 'number' && typeof cenY === 'number' && typeof radius === 'number') {
        this.fillOval(cenX, cenY, radius, radius);
    }
};

Graphics.prototype.drawArc = function (cenX, cenY, radius, startAngle, endAngle, counterclockwise) {
    if (typeof cenX === 'number' && typeof cenY === 'number' && typeof radius === 'number' &&
            typeof startAngle === 'number' && typeof endAngle === 'number' && typeof counterclockwise === 'boolean') {
        this.ctx.beginPath();
        this.ctx.arc(cenX, cenY, startAngle, endAngle, counterclockwise);
        this.ctx.stroke();
    }
};
/**
 * Draws a line between the 2 points
 * @param {Number} x1 The x coordinate of the first point
 * @param {Number} y1 The y coordinate of the first point
 * @param {Number} x2 The x coordinate of the second point
 * @param {Number} y2 The x coordinate of the seond point
 * @returns {undefined}
 */
Graphics.prototype.drawLine = function (x1, y1, x2, y2) {
    if (typeof x1 === 'number' && typeof y1 === 'number' && typeof x2 === 'number' && typeof y2 === 'number') {
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.stroke();
    }
};

/**
 * Draw a polygon
 * @param {Polygon} polygon
 * @returns {undefined}
 */
Graphics.prototype.drawPolygon = function (polygon) {
    if (polygon.constructor.name === 'Polygon') {
        var x = 0;
        var y = 0;
        this.ctx.beginPath();
        for (var i = 0; i < polygon.xpoints.length; i++) {
            x = polygon.xpoints[i];
            y = polygon.ypoints[i];
            if (i === 0) {
                this.ctx.moveTo(x, y);
            } else {
                this.ctx.lineTo(x, y);
            }
        }
        this.ctx.lineTo(x, y);
        this.ctx.stroke();
    }
};


/**
 * Fills a polygon
 * @param {Polygon} polygon
 * @returns {undefined}
 */
Graphics.prototype.fillPolygon = function (polygon) {
    if (polygon.constructor.name === 'Polygon') {
        var x = 0;
        var y = 0;
        this.ctx.beginPath();
        for (var i = 0; i < polygon.xpoints.length; i++) {
            x = polygon.xpoints[i];
            y = polygon.ypoints[i];
            if (i === 0) {
                this.ctx.moveTo(x, y);
            } else {
                this.ctx.lineTo(x, y);
            }
        }
        this.ctx.lineTo(x, y);
        this.ctx.fill();
    }
};



/**
 * Draws a polygon given its vertices and its vertex count
 * @param {type} xpoints An array of x coordinates in the polygon
 * @param {type} ypoints An array of y coordinates in the polygon
 * @param {type} npoints The number of items in x and y: must be same
 * @returns {undefined}
 */
Graphics.prototype.drawPolygonFromVertices = function (xpoints, ypoints, npoints) {
    if (Object.prototype.toString.call(xpoints) !== '[object Array]') {
        logger('xpoints must be an array of integer numbers');
        return;
    }
    if (Object.prototype.toString.call(ypoints) !== '[object Array]') {
        logger('ypoints must be an array of integer numbers');
        return;
    }
    if (typeof npoints !== 'number') {
        logger('npoints must be an integer number');
        return;
    }
    if (xpoints.length !== ypoints.length) {
        logger('xpoints and ypoints must have the same size.');
        return;
    }
    var x = 0;
    var y = 0;
    this.ctx.beginPath();
    for (var i = 0; i < xpoints.length; i++) {
        var x = xpoints[i];
        var y = ypoints[i];
        if (i === 0) {
            this.ctx.moveTo(x, y);
        } else {
            this.ctx.lineTo(x, y);
        }
    }
    this.ctx.lineTo(x, y);
    this.ctx.stroke();

};


/**
 * Fills a polygon given its vertices and its vertex count
 * @param {type} xpoints An array of x coordinates in the polygon
 * @param {type} ypoints An array of y coordinates in the polygon
 * @param {type} npoints The number of items in x and y: must be same
 * @returns {undefined}
 */
Graphics.prototype.fillPolygonFromVertices = function (xpoints, ypoints, npoints) {
    if (Object.prototype.toString.call(xpoints) !== '[object Array]') {
        logger('xpoints must be an array of integer numbers');
        return;
    }
    if (Object.prototype.toString.call(ypoints) !== '[object Array]') {
        logger('ypoints must be an array of integer numbers');
        return;
    }
    if (typeof npoints !== 'number') {
        logger('npoints must be an integer number');
        return;
    }
    if (xpoints.length !== ypoints.length) {
        logger('xpoints and ypoints must have the same size.');
        return;
    }
    var x = 0;
    var y = 0;
    this.ctx.beginPath();
    for (var i = 0; i < xpoints.length; i++) {
        var x = xpoints[i];
        var y = ypoints[i];
        if (i === 0) {
            this.ctx.moveTo(x, y);
        } else {
            this.ctx.lineTo(x, y);
        }
    }
    this.ctx.lineTo(x, y);
    this.fill();

};

/**
 * 
 * @param {type} text The text to draw
 * @param {type} x The x coordinate of the text's location
 * @param {type} y The y coordinate of the text's location
 * @returns {undefined}
 */
Graphics.prototype.drawHollowString = function (text, x, y) {
    this.ctx.drawText(text, x, y);
};
/**
 * 
 * @param {type} text The text to draw
 * @param {type} x The x coordinate of the text's location
 * @param {type} y The y coordinate of the text's location
 * @returns {undefined}
 */
Graphics.prototype.drawString = function (text, x, y) {
    this.ctx.fillText(text, x, y);
};

Graphics.prototype.drawImageAt = function (image, dx, dy) {
    this.ctx.drawImage(image, dx, dy);
};

Graphics.prototype.drawImageAtLocWithSize = function (image, dx, dy, dWidth, dHeight) {
    this.ctx.drawImage(image, dx, dy, dWidth, dHeight);
};


Graphics.prototype.drawImage = function (image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) {
    this.ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
};

/**
 * 
 * @param {Number} x The x location
 * @param {Number} y The y location
 * @param {Number} width The width of the area to copy
 * @param {Number} height The height of the area to copy
 * @returns {unresolved}
 */
Graphics.prototype.getImageData = function (x,y,width,height) {
    return this.ctx.getImageData(x,y,width,height);
};


/**
 * 
 * @param {Number} text Text whose width is needed
 * @returns {undefined}
 */
Graphics.prototype.stringWidth = function (text) {
    if (typeof text === 'string') {
        return this.ctx.measureText(text).width;
    }
    return 0;
};


/**
 * 
 * @param {Number} text A number between 0 and 1
 * @returns {undefined}
 */
Graphics.prototype.textHeight = function (text) {
 if (typeof text === 'string') {
        return this.ctx.measureText('M').width;
    }
    return 0;
};