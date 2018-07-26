// @flow

/* global describe, it, __dirname */

import assert from 'assert';
import path from 'path';
import pixelArtToSvg from './../src';

// eslint-disable-next-line id-match
const CDW = __dirname;

describe('Pixel Art to SVG', () => {
    it('Convert', async (): Promise<void> => {
        const svgString = await pixelArtToSvg(path.join(CDW, 'swords.png'));

        console.log(svgString);
        assert.equal(1 + 1, 2);
    });
});
