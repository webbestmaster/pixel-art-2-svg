// @flow

/* global describe, it */

import http from 'http';
import assert from 'assert';

import '../dist';

describe('Example Node Server', () => {
    it('should return 200', () => {
        assert.equal(200, 199 + 1);
    });
});
