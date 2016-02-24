/* global loadFixtures */

import setup from 'setup';
import Rendering from 'Rendering';

setup();

describe("Test some Instance stuff", () => {
    it("Create an instance", () => {
        const marklib = new Rendering(document);
        expect(marklib instanceof Rendering).toBe(true);
    });
});

describe("Test some wrappings", () => {
    beforeEach(() => {
        loadFixtures('wrap-test.html');
    });

    it("should wrapSiblings", () => {
        const marklib = new Rendering(document);
        marklib.wrapSiblings(
            document.getElementById('startContainer'),
            document.getElementById('endContainer')
        );
    });

    it("should render a range in different start/end nodes", () => {
        const marklib = new Rendering(document);
        const range = document.createRange();
        range.setStart(document.getElementById("firstP").childNodes[0], 1);
        range.setEnd(document.getElementById("lastP").childNodes[0], 2);

        const result = marklib.renderWithRange(range);

        const expectedResult = {
            startOffset: 1,
            endOffset: 2,
            startContainerPath: 'html>body>div>div>p:nth-of-type(1);0',
            endContainerPath: 'html>body>div>div>p:nth-of-type(4);0'
        };

        expect(marklib.range.startOffset).toEqual(0);
        expect(marklib.range.endOffset).toEqual(2);

        expect(result.serialize()).toEqual(expectedResult);
    });

    it("should render a range in the same node", () => {
        const marklib = new Rendering(document);
        const range = document.createRange();

        range.setStart(document.getElementById("firstP").childNodes[0], 0);
        range.setEnd(document.getElementById("firstP").childNodes[0], 4);

        const text = range.toString();

        expect(text).toBe('This');

        const result = marklib.renderWithRange(range);

        const rangeResult = {
            startOffset: 0,
            endOffset: 4,
            startContainerPath: 'html>body>div>div>p:nth-of-type(1);0',
            endContainerPath: 'html>body>div>div>p:nth-of-type(1);0'
        };
        expect(marklib.range.startOffset).toEqual(0);
        expect(marklib.range.endOffset).toEqual(4);

        expect(result.serialize()).toEqual(rangeResult);

        // do a second marking over the old one
        const resultedText = new Rendering(document).renderWithResult(rangeResult);
        expect(resultedText).toEqual('This');
    });
});


describe("Bug #4, set the right indices, event if the markup has been modified by marklib", () => {
    beforeEach(() => {
        loadFixtures('bug-4-case-1.html');
    });

    it("indices must be correct in different situations", () => {
        // first render something
        const marklib = new Rendering(document);
        const range = document.createRange();
        range.setStart(document.getElementById("FirstStrong").childNodes[0], 0);
        range.setEnd(document.getElementById("Paragraph").childNodes[8], 72);

        const result = marklib.renderWithRange(range);

        // Serialized result must be equal our range before
        expect(result.startOffset).toBe(0);
        expect(result.endOffset).toBe(72);
        expect(result.startContainerPath).toBe("html>body>div>p>strong:nth-of-type(1);0");
        expect(result.endContainerPath).toBe("html>body>div>p;8");
        // render something else in the same document:

        const secondMarklib = new Rendering(document);

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
        const renderer = new Rendering(document);
        expect(() => {
            renderer.renderWithResult({
                startOffset: 1,
                endOffset: 6,
                startContainerPath: 'html>body>div>p:nth-child(2);8',
                endContainerPath: 'html>body>div>p;8'
            });
        }).toThrow(Error('Could not find start- and/or end-container in document'));
    });

    it("to last text-node if element (body) is given", () => {
        const renderer = new Rendering(document);
        const range = document.createRange();
        range.setStart(document.getElementById("FirstStrong").childNodes[0], 0);
        range.setEnd(document.body, 0);
        const result = renderer.renderWithRange(range);
        expect(result.serialize()).toEqual({
            startOffset: 0,
            endOffset: 1,
            startContainerPath: 'html>body;0',
            endContainerPath: 'html>head;6'
        });
    });

    it("Fallback to first text-node if element is given", () => {
        const range = document.createRange();
        range.setStart(document.getElementById("FirstStrong").childNodes[0], 0);
        range.setEnd(document.getElementById("Paragraph"), 0);

        const renderer = new Rendering(document);
        const result = renderer.renderWithRange(range);

        expect(result.serialize()).toEqual({
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
        const range = document.createRange();
        range.setStart(document.getElementsByTagName("h2")[0].childNodes[0], 0);
        range.setEnd(document.getElementById("Paragraph").childNodes[0], 30);

        const renderer = new Rendering(document);
        const result = renderer.renderWithRange(range);

        expect(result.serialize()).toEqual({
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

describe("Scoped/Contexted rendering", () => {
    beforeEach(() => {
        loadFixtures('scoped-marking.html');
    });

    it("must render correct when a scope element is given", () => {
        const renderer = new Rendering(document, {}, document.getElementById('Test'));
        const result = renderer.renderWithResult({
            startOffset: 0,
            endOffset: 4,
            startContainerPath: ";0",
            endContainerPath: ";0"
        });

        expect(result).toBe('This');
    });
});

describe("iFrame", () => {
    let frame;
    let frameDocument;
    beforeEach((cb) => {
        loadFixtures('iframe.html');
        frame = document.getElementById('iframe');
        frame.onload = () => {
            frameDocument = frame.contentDocument;
            cb();
        };
    });

    it("must work inside an iframe", () => {
        const renderer = new Rendering(frameDocument);
        const range = frameDocument.createRange();
        range.setStart(frameDocument.getElementById("p1").childNodes[0], 0);
        range.setEnd(frameDocument.getElementById("p1").childNodes[0], 7);
        const selection = range.toString();
        expect(selection).toEqual('This is');

        const result = renderer.renderWithRange(range);

        expect(result.serialize()).toEqual({
            startOffset: 0,
            endOffset: 7,
            startContainerPath: 'html>body>p;0',
            endContainerPath: 'html>body>p;0'
        });
    });
});

describe('Constructor Arguments', () => {
    beforeEach(() => {
        loadFixtures('simple-text.html');
    });

    it('Must support arrays as classNames', () => {
        const renderer = new Rendering(document, {
            className: ['highlight', 'comment']
        });
        const range = document.createRange();
        range.setStart(document.getElementById("p").childNodes[0], 0);
        range.setEnd(document.getElementById("p").childNodes[0], 10);

        renderer.renderWithRange(range);
        expect(document.getElementById("p").childNodes[0].className)
            .toEqual('highlight comment');
    });

    it('Must support strings as classNames', () => {
        const renderer = new Rendering(document, {
            className: 'highlight comment'
        });
        const range = document.createRange();

        range.setStart(document.getElementById("p").childNodes[0], 0);
        range.setEnd(document.getElementById("p").childNodes[0], 10);

        renderer.renderWithRange(range);
        expect(document.getElementById("p").childNodes[0].className)
            .toEqual('highlight comment');
    });
});

describe("Cleanup", () => {
    beforeEach(() => {
        loadFixtures('simple-text.html');
    });

    it("Must cleanup bindings to nodes after destroying", () => {
        const renderer = new Rendering(document, {
            className: 'highlight comment'
        });
        const range = document.createRange();

        range.setStart(document.getElementById("p").childNodes[0], 0);
        range.setEnd(document.getElementById("p").childNodes[0], 10);

        renderer.renderWithRange(range);
        const nodes = document.getElementById("p").childNodes[0];
        expect(nodes.className)
            .toEqual('highlight comment');
        expect(nodes.marklibInstance instanceof Rendering).toEqual(true);
        renderer.destroy();

        expect(document.getElementById("p").childNodes[0].className)
            .toBe('');

        expect(nodes.marklibInstance).toBeUndefined();
    });
});
