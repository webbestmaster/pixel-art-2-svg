'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _getPixels = require('get-pixels');

var _getPixels2 = _interopRequireDefault(_getPixels);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getImageData(pathToImage) {
    return new _promise2.default(function (resolve, reject) {
        (0, _getPixels2.default)(pathToImage, function (error, imageData) {
            if (error !== null) {
                reject(error);
                return;
            }
            resolve(imageData);
        });
    }).catch(function (error) {
        console.error('Can not get pixels from image', pathToImage);
        console.error(error);
    });
}

var svgDefaultString = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" ' + 'width="{width}" height="{height}" viewBox="0 0 {width} {height}" shape-rendering="crispEdges">{data}</svg>';

var rectDefaultString = '<rect x="{x}" y="{y}" width="1" height="1" fill="{fill}"/>';

function imageDataToSvg(imageData) {
    var width = imageData.shape[0];
    var height = imageData.shape[1];

    var svgString = svgDefaultString.replace(/{width}/g, width.toString()).replace(/{height}/g, height.toString());

    var rectList = [];

    imageData.data.forEach(function (colorValue, index) {
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

        var fillHex = '#' + [red, green, blue].map(function (color) {
            return color.toString(16).padStart(2, '0');
        }).join('');

        var rectString = rectDefaultString.replace('{x}', x).replace('{y}', y).replace('{fill}', fillHex);

        rectList.push(rectString);
    });

    return svgString.replace('{data}', rectList.join(''));
}

module.exports = function imgToSvg(pathToImage) {
    return getImageData(pathToImage).then(function (imageData) {
        if (!imageData) {
            return null;
        }

        return imageDataToSvg(imageData);
    });
};