/* global localStorage */
import Marklib from 'modules/Marklib';
/**
 * Contains Module for the demonstration
 */

document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    const STORAGE_KEY = 'savedRanges';

    /**
     * Creates an animated rendering
     */
    function presentRendering(selector, classNames, speed) {
        var autoMarkText = document.getElementById(selector).childNodes[0];
        let thisLength = autoMarkText.length;

        var render = function (autoMarkText, c, length) {
            var r = new Marklib.Rendering(document, classNames);
            var range = document.createRange();
            range.setStart(autoMarkText, 0);
            range.setEnd(autoMarkText, 1);
            r.renderWithRange(range, true);
            if (autoMarkText.parentNode.nextSibling) {
                autoMarkText = autoMarkText.parentNode.nextSibling.childNodes[0];
                setTimeout(function () {
                        render(autoMarkText, ++c, length);
                }, speed);
            }
        };
        return render(autoMarkText, 0, thisLength);
    }

    presentRendering('automark', 'fadeInDown', 20);

    var savedRanges = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [], animated = false;

    savedRanges.forEach(function (range) {
        var marker = new Marklib.Rendering(document);
        try {
            marker.renderWithPath(range.startContainerPath + ";" + range.startOffset,
                range.endContainerPath + ";" + range.endOffset);
        } catch (e) {
            console.warn("Could not render:", range);
            localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
            throw 'Cleared local storage because of a rendering issue, the page might have been changed ;)';
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
            selection.removeAllRanges();
            console.log(result);
            savedRanges.push(result);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(savedRanges));
        } catch (e) {
            console.warn("Could not add selection: ", e);
        }
    };

    document.addEventListener("keydown", function (e) {
        if (13 === e.keyCode) {
            actionMark();
        }
    });

    document.addEventListener("click", function (e) {
        if (e.target.id === 'action-mark') {
            return actionMark();
        } else if (e.target.id === 'action-clear') {
            var elements = document.getElementsByTagName('x-marker');
            for (var i = 0; i < elements.length; i++) {
                elements[i].classList.add('deleted');
                elements[i].classList.remove('marking');

            }
            savedRanges = [];
            localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
        }
    });
});

export default Marklib;
