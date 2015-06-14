/* global loadFixtures */

'use strict';

import setup from 'setup';
import Rendering from 'Rendering';

setup();

describe("Test some Instance stuff", () => {
    it("Create an instance", () => {
        var marklib = new Rendering(document, 'highlight');
        expect(marklib instanceof Rendering).toBe(true);
    });
});

describe("Test some wrappings", () => {
    beforeEach(() => {
        loadFixtures('wrap-test.html');
    });

    it("should wrapSiblings", () => {
        var marklib = new Rendering(document, 'wow');
        marklib.wrapSiblings(document.getElementById('startContainer'), document.getElementById('endContainer'));
    });

    it("should render a range in different start/end nodes", () => {
        var marklib = new Rendering(document, 'wow');
        var range = document.createRange();
        range.setStart(document.getElementById("firstP").childNodes[0], 1);
        range.setEnd(document.getElementById("lastP").childNodes[0], 2);

        marklib.renderWithRange(range);
    });

    it("should render a range in the same node", () => {
        var marklib = new Rendering(document, 'highlight');
        var range = document.createRange();
        range.setStart(document.getElementById("firstP").childNodes[0], 0);
        range.setEnd(document.getElementById("firstP").childNodes[0], 5);

        marklib.renderWithRange(range);
    });
});
