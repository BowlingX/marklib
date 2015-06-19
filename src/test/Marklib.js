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

    it("indices must be correct in different situations", () => {

        // first render something
        var marklib = new Rendering(document, 'aFirst');
        var range = document.createRange();
        range.setStart(document.getElementById("FirstStrong").childNodes[0], 0);
        range.setEnd(document.getElementById("Paragraph").childNodes[8], 72);

        const result = marklib.renderWithRange(range);

        // Serialized result must be equal our range before
        expect(result.startOffset).toBe(0);
        expect(result.endOffset).toBe(72);
        expect(result.startContainerPath).toBe("html>body>div>p>strong:nth-of-type(1);0");
        expect(result.endContainerPath).toBe("html>body>div>p;8");
        // render something else in the same document:

        const secondMarklib = new Rendering(document, 'aSecond');

        const secondResult = secondMarklib.renderWithResult({
            startOffset: 1,
            endOffset: 6,
            startContainerPath: 'html>body>div>p;8',
            endContainerPath: 'html>body>div>p;8'
        });
        expect(secondResult).toBe('clita');

        const thirdResult = secondMarklib.renderWithResult({
            startOffset: 11,
            endOffset: 16,
            startContainerPath: 'html>body>div>p;6',
            endContainerPath: 'html>body>div>p;6'
        });

        expect(thirdResult).toBe('magna');

        const fourthResult = secondMarklib.renderWithResult({
            startOffset: 0,
            endOffset: 20,
            startContainerPath: "html>body>div>p:nth-child(1);8",
            endContainerPath: "html>body>div>p:nth-child(1);8"
        });

        expect(fourthResult).toBe(' clita kasd gubergre');
    });
});

describe("Must fail and fallback", () => {
    beforeEach(() => {
        loadFixtures('bug-4-case-1.html');
    });

    it("fails when no start/end container was found (node) ", () => {
        const renderer = new Rendering(document, 'aSecond');
        expect(() => {
            renderer.renderWithResult({
                startOffset: 1,
                endOffset: 6,
                startContainerPath: 'html>body>div>p:nth-child(2);8',
                endContainerPath: 'html>body>div>p;8'
            });
        }).toThrow('Could not find start- and/or end-container in document');
    });

    it("fallback to last text-node if element (body) is given", () => {
        const renderer = new Rendering(document, 'aSecond');
        var range = document.createRange();
        range.setStart(document.getElementById("FirstStrong").childNodes[0], 0);
        range.setEnd(document.body, 0);
        const result = renderer.renderWithRange(range);
        expect(result).toEqual({
            startOffset: 0,
            endOffset: 87,
            startContainerPath: 'html>body;0',
            endContainerPath: 'html>body>div>p;8'
        });
    });

    it("Fallback to first text-node if element is given", () => {
        var range = document.createRange();
        range.setStart(document.getElementById("FirstStrong").childNodes[0], 0);
        range.setEnd(document.getElementById("Paragraph"), 0);

        const renderer = new Rendering(document, 'aSecond');
        const result = renderer.renderWithRange(range);

        expect(result).toEqual({
            startOffset: 0,
            endOffset: 87,
            startContainerPath: 'html>body>div>p;0',
            endContainerPath: 'html>body>div>p;8'
        });
    });
});

describe("Multiple nodes", () => {
    beforeEach(() => {
        loadFixtures('multiple-node-case.html');
    });

    it("must have the right indices later", () => {
        var range = document.createRange();
        range.setStart(document.getElementsByTagName("h2")[0].childNodes[0], 0);
        range.setEnd(document.getElementById("Paragraph").childNodes[0], 30);

        const renderer = new Rendering(document, 'aSecond');
        const result = renderer.renderWithRange(range);

        expect(result).toEqual({
            startOffset: 0,
            endOffset: 30,
            startContainerPath: 'html>body>div>h2;0',
            endContainerPath: 'html>body>div>p;0'
        });

        const secondResult = renderer.renderWithResult({
            startOffset: 0,
            endOffset: 20,
            startContainerPath: "html>body>div>p;8",
            endContainerPath: "html>body>div>p;8"
        });

        expect(secondResult).toBe(' clita kasd gubergre');
    });
});
