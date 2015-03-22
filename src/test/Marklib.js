import $ from 'jquery';
import setup from 'setup';
import Marklib from 'Marklib';

setup();

describe("Test some Instance stuff", () => {
    it("Create an instance", () => {
        var marklib = new Marklib(document, 'highlight');
        expect(marklib instanceof Marklib).toBe(true);
    });
});

describe("Test some wrappings", () => {
    beforeEach(() => {
        loadFixtures('wrap-test.html');
    });

    it("should wrapSiblings", () => {
        var marklib = new Marklib(document, 'wow');
        marklib.wrapSiblings(document.getElementById('startContainer'), document.getElementById('endContainer'));
    });

    it("should render a range in different start/end nodes", () => {
        var marklib = new Marklib(document, 'wow');
        var range = document.createRange();
        range.setStart(document.getElementById("firstP").childNodes[0], 1);
        range.setEnd(document.getElementById("lastP").childNodes[0], 2);
        marklib.renderWithRange(range);

        //console.log(document.getElementById('startContainer'))
    });

    it("should render a range in the same node", () => {
        var marklib = new Marklib(document, 'highlight');

        var range = document.createRange();
        range.setStart(document.getElementById("firstP").childNodes[0], 0);
        range.setEnd(document.getElementById("firstP").childNodes[0], 5);
        marklib.renderWithRange(range);

        console.log(document.getElementById('startContainer'));
    });
});