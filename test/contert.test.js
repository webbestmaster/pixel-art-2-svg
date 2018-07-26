// @flow

/* global describe, it, __dirname */

import assert from 'assert';
import path from 'path';
import pixelArtToSvg from './../src';
import {testPngInSvg} from './reference';

// eslint-disable-next-line id-match
const CDW = __dirname;

describe('Pixel Art to SVG', () => {
    it('Convert', async (): Promise<void> => {
        const svgString = await pixelArtToSvg(path.join(CDW, 'test.png'));

        assert.equal(svgString, testPngInSvg);
    });
});
