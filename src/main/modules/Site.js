/* global localStorage, document */

import 'babel-polyfill';
import { Rendering, registerEvents } from 'modules/Marklib';
import { Tooltip } from 'flexcss';

const KEY_ENTER = 13;

/**
 * Contains Module for the demonstration
 */

document.addEventListener("DOMContentLoaded", () => {
  registerEvents();
  const STORAGE_KEY = 'savedRanges';
  const ANIMATIONEND = 'animationend';
  let allRanges = [];
  const tooltip = new Tooltip(document.body);

  /**
   * Creates an animated rendering
   */
  function presentRendering(selector, classNames, speed) {
    const text = document.getElementById(selector).childNodes[0];
    const thisLength = text.length;

    const render = (autoMarkText, cp, length) => {
      let c = cp;
      const r = new Rendering(document, {
        className: classNames
      });
      const range = document.createRange();
      range.setStart(autoMarkText, 0);
      range.setEnd(autoMarkText, 1);
      r.renderWithRange(range);
      if (autoMarkText.parentNode.nextSibling) {
        const nextText = autoMarkText.parentNode.nextSibling.childNodes[0];
        setTimeout(() => {
          render(nextText, ++c, length);
        }, speed);
      }
    };

    return render(text, 0, thisLength);
  }

  presentRendering('automark', 'fadeInDown', 20);

  let savedRanges = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  let animated = false;

  /**
   * OnClick event for renderings
   */
  function onClick(instance) {
    const self = instance;
    self.wrapperNodes.forEach((n) => {
      n.addEventListener(ANIMATIONEND, function thisFunction(e) {
        e.target.classList.remove('bubble');
        e.target.removeEventListener(ANIMATIONEND, thisFunction);
      });
      n.classList.add('bubble');
    });

    if (tooltip.getCurrentTarget() === self.wrapperNodes[0]) {
      return;
    }

    tooltip.createTooltip(self.wrapperNodes[0], self.result.text, false);

    setTimeout(() => {
      if (tooltip.getCurrentTarget()) {
        document.addEventListener('click', function thisFunction() {
          if (tooltip.getCurrentTarget() && tooltip.getCurrentTarget() === self.wrapperNodes[0]) {
            tooltip.removeTooltip();
          }
          document.removeEventListener('click', thisFunction);
        });
      }
    }, 0);
  }

  Rendering.globalEmitter().on('click', onClick);


  savedRanges.forEach((range) => {
    const marker = new Rendering(document);
    try {
      marker.renderWithResult(range);
      allRanges.push(marker);
    } catch (e) {
      console.warn("Could not render:", range, e);
      localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
      console.error('Cleared local storage because of a rendering issue, the page might have been changed ;)');
    }
  });

  window.addEventListener('scroll', () => {
    const el = document.getElementById('secondParagraph');
    const r = el.getBoundingClientRect();
    const html = document.documentElement;
    if (r.top <= html.clientHeight && r.bottom >= 0 && !animated) {
      animated = true;

      el.classList.add('animate');
      if (!savedRanges.length) {
        presentRendering('secondParagraphItem', 'marking', 30);
      }
    }
  });

  const actionMark = () => {
    try {
      const selection = document.getSelection();
      const renderer = new Rendering(document);
      const result = renderer.renderWithRange(selection.getRangeAt(0));

      renderer.on('click', onClick);
      allRanges.push(renderer);

      selection.removeAllRanges();
      savedRanges.push(result.serialize());
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedRanges));
    } catch (e) {
      console.warn("Could not add selection: ", e);
    }
  };

  document.addEventListener("keydown", (e) => {
    if (e.keyCode === KEY_ENTER) {
      actionMark();
    }
  });

  document.addEventListener("click", (e) => {
    if (e.target.id === 'action-mark') {
      actionMark();
      return;
    }
    if (e.target.id === 'action-clear') {
      allRanges.forEach((range) => range.destroy());
      savedRanges = [];
      allRanges = [];
      localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    }
  });
});

export default Rendering;
