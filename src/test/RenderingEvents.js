/* global loadFixtures */

'use strict';

import setup from 'setup';
import Rendering from 'Rendering';
import RenderResult from 'RenderResult';
import $ from 'jquery';
import {EVENT_CLICK, EVENT_MOUSEENTER, EVENT_MOUSELEAVE} from 'RenderingEvents';
setup();

/**
 * @return {Rendering}
 */
function createRender() {
    const rendering = new Rendering(document);

    const range = document.createRange();
    range.setStart(document.getElementById("p").childNodes[0], 0);
    range.setEnd(document.getElementById("p").childNodes[0], 10);

    const r = rendering.renderWithRange(range);
    expect(r instanceof RenderResult).toBe(true);

    return rendering;
}

describe("Test Click Event handling", () => {
    let hasClick;

    beforeEach((result) => {
        loadFixtures('simple-text.html');

        const rendering = createRender();

        rendering.on(EVENT_CLICK, function(){
            hasClick = true;
            result();
        });

        // click node directly
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

describe("Test Mouseover Event handling", () => {
    let hasMouseEnter, hasMouseLeave;

    beforeEach((result) => {
        loadFixtures('simple-text.html');

        const rendering = createRender();

        rendering.on(EVENT_MOUSEENTER, function(){
            hasMouseEnter = true;
        });

        rendering.on(EVENT_MOUSELEAVE, function(){
            hasMouseLeave = true;
            result();
        });

        // hover node directly
        rendering.wrapperNodes[0].dispatchEvent(new MouseEvent('mouseover', {
            'view': window,
            'bubbles': true,
            'cancelable': true
        }));

        // hover somewhere else in the page
        document.body.dispatchEvent(new MouseEvent('mouseover', {
            'view': window,
            'bubbles': true,
            'cancelable': true
        }));

    });

    it("should execute mouseover handlers", () => {

        it('mouse-enter should have called', () => {
            expect(hasMouseEnter).toBe(true);
        });

        it('mouse-leave should have called', () => {
            expect(hasMouseLeave).toBe(true);
        });

    });
});
