'use strict';

/* global localStorage, document */

import Marklib from 'modules/Marklib';
import {Tooltip} from 'flexcss';

const KEY_ENTER = 13;

/**
 * Contains Module for the demonstration
 */

document.addEventListener("DOMContentLoaded", function () {

    const STORAGE_KEY = 'savedRanges';
    const ANIMATIONEND = 'animationend';
    let allRanges = [];
    const tooltip = new Tooltip(document.body);

    /**
     * Creates an animated rendering
     */
    function presentRendering(selector, classNames, speed) {
        var text = document.getElementById(selector).childNodes[0];
        let thisLength = text.length;

        var render = function (autoMarkText, c, length) {
            var r = new Marklib.Rendering(document, {className: classNames});
            var range = document.createRange();
            range.setStart(autoMarkText, 0);
            range.setEnd(autoMarkText, 1);
            r.renderWithRange(range);
            if (autoMarkText.parentNode.nextSibling) {
                let nextText = autoMarkText.parentNode.nextSibling.childNodes[0];
                setTimeout(function () {
                    render(nextText, ++c, length);
                }, speed);
            }
        };
        return render(text, 0, thisLength);
    }

    presentRendering('automark', 'fadeInDown', 20);

    var savedRanges = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [], animated = false;

    /**
     * OnClick event for renderings
     */
    const onClick = function () {
        const self = this;
        this.wrapperNodes.forEach((n) => {
            n.addEventListener(ANIMATIONEND, function self(e) {
                e.target.classList.remove('bubble');
                e.target.removeEventListener(ANIMATIONEND, self);
            });
            n.classList.add('bubble');
        });

        if (tooltip.getCurrentTarget() === this.wrapperNodes[0]) {
            return;
        }

        tooltip.createTooltip(this.wrapperNodes[0], this.result.text, false);

        setTimeout(function () {
            if (tooltip.getCurrentTarget()) {
                document.addEventListener('click', function thisFunction(e) {
                    if(tooltip.getCurrentTarget() && tooltip.getCurrentTarget() === self.wrapperNodes[0]) {
                        tooltip.removeTooltip();
                    }
                    document.removeEventListener('click', thisFunction);
                });
            }
        }, 0);
    };


    savedRanges.forEach(function (range) {
        var marker = new Marklib.Rendering(document);
        try {
            marker.renderWithResult(range);
            allRanges.push(marker);
            marker.on('click', onClick);
        } catch (e) {
            console.warn("Could not render:", range, e);
            localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
            console.error('Cleared local storage because of a rendering issue, the page might have been changed ;)');
        }

    });

    window.addEventListener('scroll', function () {
        var el = document.getElementById('secondParagraph'), r = el.getBoundingClientRect(),
            html = document.documentElement;
        if (r.top <= html.clientHeight && r.bottom >= 0 && !animated) {
            animated = true;

            el.classList.add('animate');
            if (!savedRanges.length) {
                presentRendering('secondParagraphItem', 'marking', 30);
            }
        }
    });

    var actionMark = function () {
        try {
            var selection = document.getSelection(), renderer = new Marklib.Rendering(document),
                result = renderer.renderWithRange(selection.getRangeAt(0));

            renderer.on('click', onClick);
            allRanges.push(renderer);

            selection.removeAllRanges();
            savedRanges.push(result.serialize());
            localStorage.setItem(STORAGE_KEY, JSON.stringify(savedRanges));
        } catch (e) {
            console.warn("Could not add selection: ", e);
        }
    };

    document.addEventListener("keydown", function (e) {
        if (e.keyCode === KEY_ENTER) {
            actionMark();
        }
    });

    document.addEventListener("click", function (e) {
        if (e.target.id === 'action-mark') {
            return actionMark();
        } else if (e.target.id === 'action-clear') {
            allRanges.forEach((range) => range.destroy());
            savedRanges = [];
            allRanges = [];
            localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
        }
    });
});

export default Marklib;
