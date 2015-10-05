/* global loadFixtures */

'use strict';

import setup from 'setup';
import Rendering from 'Rendering';
import RenderResult from 'RenderResult';
import $ from 'jquery';

setup();

describe("Test Event handling", () => {
    let hasClick;

    beforeEach((result) => {
        loadFixtures('simple-text.html');
        const rendering = new Rendering(document);

        const range = document.createRange();
        range.setStart(document.getElementById("p").childNodes[0], 0);
        range.setEnd(document.getElementById("p").childNodes[0], 10);

        const r = rendering.renderWithRange(range);
        expect(r instanceof RenderResult).toBe(true);
        rendering.on('click', function(){
            hasClick = true;
            result();
        });
        rendering.wrapperNodes[0].dispatchEvent(new MouseEvent('click', {
            'view': window,
            'bubbles': true,
            'cancelable': true
        }));

    });

    it("should execute click event if is clicked", () => {

        it('should have a click', () => {
            expect(hasClick).toBe(true);
        });

    });
});
