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

        const result = marklib.renderWithRange(range);

        const expectedResult = {
            startOffset: 1,
            endOffset: 2,
            startContainerPath: 'html>body>div>div>p:nth-of-type(1);0',
            endContainerPath: 'html>body>div>div>p:nth-of-type(4);0'
        };

        expect(result).toEqual(expectedResult);
    });

    it("should render a range in the same node", () => {
        var marklib = new Rendering(document, 'highlight');
        var range = document.createRange();

        range.setStart(document.getElementById("firstP").childNodes[0], 0);
        range.setEnd(document.getElementById("firstP").childNodes[0], 4);

        var text = range.toString();

        expect(text).toBe('This');

        var result = marklib.renderWithRange(range);


        const rangeResult =
        {
            startOffset: 0,
            endOffset: 4,
            startContainerPath: 'html>body>div>div>p:nth-of-type(1);0',
            endContainerPath: 'html>body>div>div>p:nth-of-type(1);0'
        };

        expect(result).toEqual(rangeResult);

        // do a second marking over the old one
        const resultedText = new Rendering(document, 'second').renderWithResult(rangeResult);
        expect(resultedText).toEqual('This');

    });
});


describe("Bug #4, set the right indices, event if the markup has been modified by marklib", () => {
    beforeEach(() => {
        loadFixtures('bug-4-case-1.html');
    });

    it("should render a range", () => {

        // first render something
        var marklib = new Rendering(document, 'aFirst');
        var range = document.createRange();
        range.setStart(document.getElementById("FirstStrong").childNodes[0], 0);
        range.setEnd(document.getElementById("Paragraph").childNodes[8], 77);

        var result = marklib.renderWithRange(range);

        // Serialized result must be equal our range before
        expect(result.startOffset).toBe(0);
        expect(result.endOffset).toBe(77);
        expect(result.startContainerPath).toBe("html>body>div>p>strong:nth-of-type(1);0");
        expect(result.endContainerPath).toBe("html>body>div>p;8");

        // render something else in the same document:

        var secondMarklib = new Rendering(document, 'aSecond');

        var secondResult = secondMarklib.renderWithResult({
            startOffset: 1,
            endOffset: 6,
            startContainerPath: 'html>body>div>p;8',
            endContainerPath: 'html>body>div>p;8'
        });

        expect(secondResult).toBe('clita');

        var thirdResult = secondMarklib.renderWithResult({
            startOffset: 11,
            endOffset: 16,
            startContainerPath: 'html>body>div>p;6',
            endContainerPath: 'html>body>div>p;6'
        });

        expect(thirdResult).toBe('magna');
    });
});
