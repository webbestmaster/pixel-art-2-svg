'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _getPixels = require('get-pixels');

var _getPixels2 = _interopRequireDefault(_getPixels);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
}

function _asyncToGenerator(fn) {
    return function() {
        var gen = fn.apply(this, arguments);
        return new Promise(function(resolve, reject) {
            function step(key, arg) {
                try {
                    var info = gen[key](arg);
                    var value = info.value;
                } catch (error) {
                    reject(error);
                    return;
                }
                if (info.done) {
                    resolve(value);
                } else {
                    return Promise.resolve(value).then(
                        function(value) {
                            step('next', value);
                        },
                        function(err) {
                            step('throw', err);
                        }
                    );
                }
            }
            return step('next');
        });
    };
}

function getImageData(pathToImage) {
    return new Promise(function(resolve, reject) {
        (0, _getPixels2.default)(pathToImage, function(error, imageData) {
            if (error !== null) {
                reject(error);
                return;
            }
            resolve(imageData);
        });
    }).catch(function(error) {
        console.error('Can not get pixels from image', pathToImage);
        console.error(error);
    });
}

var svgDefaultString =
    '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" ' +
    'width="{width}" height="{height}" viewBox="0 0 {width} {height}" shape-rendering="crispEdges">{data}</svg>';

var rectDefaultString = '<rect x="{x}" y="{y}" width="1" height="1" fill="{fill}"/>';

function imageDataToSvg(imageData) {
    var width = imageData.shape[0];
    var height = imageData.shape[1];

    var svgString = svgDefaultString.replace(/{width}/g, width.toString()).replace(/{height}/g, height.toString());

    var rectList = [];

    imageData.data.forEach(function(colorValue, index) {
        if (index % 4 !== 0) {
            return;
        }

        var pixelNumber = index / 4;
        var x = String(pixelNumber % width);
        var y = String(Math.floor(pixelNumber / width));
        var red = imageData.data[index];
        var green = imageData.data[index + 1];
        var blue = imageData.data[index + 2];
        var alpha = imageData.data[index + 3];

        if (alpha === 0) {
            return;
        }

        var fillHex =
            '#' +
            [red, green, blue]
                .map(function(color) {
                    return color.toString(16).padStart(2, '0');
                })
                .join('');

        var rectString = rectDefaultString
            .replace('{x}', x)
            .replace('{y}', y)
            .replace('{fill}', fillHex);

        rectList.push(rectString);
    });

    return svgString.replace('{data}', rectList.join(''));
}

exports.default = (function() {
    var _ref = _asyncToGenerator(
        /*#__PURE__*/ regeneratorRuntime.mark(function _callee(pathToImage) {
            var imageData;
            return regeneratorRuntime.wrap(
                function _callee$(_context) {
                    while (1) {
                        switch ((_context.prev = _context.next)) {
                            case 0:
                                _context.next = 2;
                                return getImageData(pathToImage);

                            case 2:
                                imageData = _context.sent;

                                if (imageData) {
                                    _context.next = 5;
                                    break;
                                }

                                return _context.abrupt('return', null);

                            case 5:
                                return _context.abrupt('return', imageDataToSvg(imageData));

                            case 6:
                            case 'end':
                                return _context.stop();
                        }
                    }
                },
                _callee,
                this
            );
        })
    );

    function imgToSvg(_x) {
        return _ref.apply(this, arguments);
    }

    return imgToSvg;
})();
