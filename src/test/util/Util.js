/* global loadFixtures */

import Util from 'util/Util';
import $ from 'jquery';
import setup from 'setup';

setup();

describe("Test some DOM stuff", () => {
  beforeEach(() => {
    loadFixtures('text-node-fixtures.html');
  });

  it("Node: An extracted path must be query able", () => {
    const el = $('#inline-el')[0];
    const path = Util.getPath(el, document);
    expect(el).toEqual(document.querySelector(path));
  });

  it("TextNode: Find the right path of a TextNode", () => {
    const el = $('#inline-el')[0].childNodes[2];
    const splitPath = Util.getPath(el, document).split(';');
    expect(document.querySelector(splitPath[0]).childNodes[parseInt(splitPath[1], 10)]).toEqual(el);
  });
});

describe("Test some DOM stuff in manipulated state", () => {
  beforeEach(() => {
    loadFixtures('text-node-fixtures-manipulated.html');
  });

  it("Marker should not be included in the resulting serialized query", () => {
    const el = $('#inline-el')[0].children[0].childNodes[0];
    const path = Util.getPath(el, document);
    expect(path).toEqual('html>body>div>section>div:nth-of-type(2)>p>i;0');
  });
});

describe("Scoping", () => {
  beforeEach(() => {
    loadFixtures('scoped.html');
  });

  it("The correct scoped path should be determined", () => {
    const scope = $('#B')[0];
    const el = $('#Content')[0].childNodes[0];
    const path = Util.getPath(el, scope);
    expect(path).toEqual('div>p;0');
  });

  it("The correct scoped path should be determined, even inside markers", () => {
    const scope = $('#B')[0];
    const el = $('#Marker')[0].childNodes[0];
    const path = Util.getPath(el, scope);
    expect(path).toEqual('div>p;0');
  });

  it("The correct scoped path should be determined, when scope === el", () => {
    const scope = $('#Content')[0];
    const el = $('#Marker')[0].childNodes[0];
    const path = Util.getPath(el, scope);
    expect(path).toEqual(';0');
  });
});
