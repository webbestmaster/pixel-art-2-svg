// @flow

import getPixels from 'get-pixels';

function getImageData(pathToImage: string): Promise<ImageDataType | void> {
    return new Promise((resolve: (imageData: ImageDataType) => void, reject: (error: Error) => void) => {
        getPixels(pathToImage, (error: Error | null, imageData: ImageDataType) => {
            if (error !== null) {
                reject(error);
                return;
            }
            resolve(imageData);
        });
    }).catch((error: Error) => {
        console.error('Can not get pixels from image', pathToImage);
        console.error(error);
    });
}

const svgDefaultString =
    '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" ' +
    'width="{width}" height="{height}" viewBox="0 0 {width} {height}" shape-rendering="crispEdges">{data}</svg>';

const rectDefaultString = '<rect x="{x}" y="{y}" width="1" height="1" fill="{fill}"/>';

function imageDataToSvg(imageData: ImageDataType): string {
    const width = imageData.shape[0];
    const height = imageData.shape[1];

    const svgString = svgDefaultString.replace(/{width}/g, width.toString()).replace(/{height}/g, height.toString());

    const rectList = [];

    imageData.data.forEach((colorValue: number, index: number) => {
        if (index % 4 !== 0) {
            return;
        }

        const pixelNumber = index / 4;
        const x = String(pixelNumber % width);
        const y = String(Math.floor(pixelNumber / width));
        const red = imageData.data[index];
        const green = imageData.data[index + 1];
        const blue = imageData.data[index + 2];
        const alpha = imageData.data[index + 3];

        if (alpha === 0) {
            return;
        }

        const fillHex =
            '#' + [red, green, blue].map((color: number): string => color.toString(16).padStart(2, '0')).join('');

        const rectString = rectDefaultString
            .replace('{x}', x)
            .replace('{y}', y)
            .replace('{fill}', fillHex);

        rectList.push(rectString);
    });

    return svgString.replace('{data}', rectList.join(''));
}

module.exports = function imgToSvg(pathToImage: string): Promise<string | null> {
    return getImageData(pathToImage).then(
        (imageData: ImageDataType | void): string | null => {
            if (!imageData) {
                return null;
            }

            return imageDataToSvg(imageData);
        }
    );
};
