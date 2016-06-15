/* global Node */

import RenderResult from './RenderResult';
import RenderingEvents from './RenderingEvents';
import Util, { ATTR_DATA_ORIGINAL_INDEX, DATA_IS_SELECTION } from './util/Util';

/**
 * @type {string}
 */
const TAG_NAME = 'x-marker';
/**
 * @type {string}
 */
export const ATTR_DATA_ORIGINAL_OFFSET_START = 'data-original-offset-start';
/**
 * @type {string}
 */
const DATA_ORIGINAL_TEXT_NODE_INDEX = 'original-text-node-index';
/**
 * @type {string}
 */
const ATTR_DATA_START_END = 'data-is-start-end';
/**
 * @type {string}
 */
const ATTR_DATA_IS_HIGHLIGHT_NODE = 'data-is-highlight-node';
/**
 * @type {string}
 */
const ATTR_DATA_ID = 'data-selection-id';

/**
 * @see https://developer.mozilla.org/de/docs/Web/API/Node/compareDocumentPosition
 * @type {number}
 */
const DOCUMENT_POSITION_CONTAINED_BY = 16;


/**
 * @type {string}
 */
export const EVENT_WRAPPED_NODE = 'wrapped-node';

/**
 * Manages a single Render
 */
class Rendering extends RenderingEvents {

  /**
   * @param {Document} document
   * @param {object} options
   * @param {Node} context
   */
  constructor(document, options, context) {
    super(options, document);

    /**
     * ID of rendering, will be set on each element that is part of it
     * @type {String}
     */
    this.id = Util.guid();

    /**
     * StartContainer
     * @type {Node}
     */
    this.startContainer = null;

    /**
     * EndContainer
     * @type {Node}
     */
    this.endContainer = null;

    /**
     * @type {Node}
     */
    this.context = context || this.document;

    /**
     * Flag if this instance has been rendered
     * @type {RenderResult}
     * @private
     */
    this._renderResult = null;
  }

  /**
   * @returns {string} id of this rendering
   */
  getId() {
    return this.id;
  }

  /**
   * @param {string} id
   * @returns {Rendering}
   */
  setId(id) {
    this.id = id;

    if (this._renderResult) {
      this.wrapperNodes.forEach((node) => node.setAttribute(ATTR_DATA_ID, this.id));
    }

    return this;
  }

  /**
   * Creates a Template used as a wrapper and an indication that this is a highlight node
   * @param {Boolean} [omitHighlight]
   * @returns {Node}
   * @private
   */
  _createWrapTemplate(omitHighlight) {
    const el = this.document.createElement(TAG_NAME);
    const vTrue = "true";

    if (!omitHighlight) {
      el.className = this.options.className.join(' ');
      // save this marker instance to given node
      Rendering.setMarklibInstance(el, this);
      // keep track of highlight nodes
      this.wrapperNodes.push(el);
      el.setAttribute(ATTR_DATA_IS_HIGHLIGHT_NODE, vTrue);
      el.setAttribute(ATTR_DATA_ID, this.getId());
    }
    el.setAttribute(DATA_IS_SELECTION, vTrue);

    return el;
  }

  /**
   * Creates a Template to use as start and end marks
   * @param {String} text
   * @returns {Node}
   * @private
   */
  _createStartEndWrapTemplate(text) {
    const el = this._createWrapTemplate();
    el.setAttribute(ATTR_DATA_START_END, 'true');
    el.textContent = text;
    return el;
  }


  /**
   * Creates Start or End Container Element
   * @param initialNode
   * @param text
   * @param offset
   * @param index
   * @returns {Node}
   */
  _createStartOrEndContainer(initialNode, text, offset, index) {
    const wrapper = this._createStartEndWrapTemplate(text);
    wrapper.setAttribute(ATTR_DATA_ORIGINAL_INDEX, Util.getIndexParentIfHas(initialNode, index));
    wrapper.setAttribute(ATTR_DATA_ORIGINAL_OFFSET_START, offset);
    wrapper.setAttribute(DATA_ORIGINAL_TEXT_NODE_INDEX, index);

    return wrapper;
  }

  /**
   * Wraps given element
   * @param {Node|HTMLElement} el
   * @param [optionalLength]
   * @param [optionalIndex]
   * @param [optionalIsSameNode]
   * @param {Boolean} [omitHighlight] set to true to prevent node to be a highlight node
   * @returns {Node}
   * @private
   */
  _createWrap(el, optionalLength, optionalIndex, optionalIsSameNode, omitHighlight) {
    const originalIndex = optionalIndex >= 0 ? optionalIndex : Util.calcIndex(el);
    const wrapper = this._createWrapTemplate(omitHighlight);
    wrapper.setAttribute(ATTR_DATA_ORIGINAL_INDEX, Util.getIndexParentIfHas(el, originalIndex));
    const offsetLength = optionalLength >= 0 ? optionalLength : Util.getOffsetParentIfHas(el);
    wrapper.setAttribute(ATTR_DATA_ORIGINAL_OFFSET_START, offsetLength);

    // Save a reference to original text node in wrapper
    wrapper.setAttribute(DATA_ORIGINAL_TEXT_NODE_INDEX, originalIndex);

    if (optionalIsSameNode) {
      wrapper.setAttribute(ATTR_DATA_START_END, ATTR_DATA_START_END);
    }
    const wrap = Util.wrap(el, wrapper);

    this.emit(EVENT_WRAPPED_NODE, el, wrap);

    return wrap;
  }

  /**
   * Create split container element
   * @param originalElement {Node} original text node element that is created a wrapper for
   * @param index
   * @param offset
   * @returns {Node}
   */
  _createSplitContainer(originalElement, index, offset) {
    const wrapper = this.document.createElement(TAG_NAME);
    wrapper.setAttribute(DATA_IS_SELECTION, 'true');
    wrapper.setAttribute(ATTR_DATA_ORIGINAL_INDEX, Util.getIndexParentIfHas(originalElement, index));
    wrapper.setAttribute(ATTR_DATA_ORIGINAL_OFFSET_START, offset);
    wrapper.setAttribute(DATA_ORIGINAL_TEXT_NODE_INDEX, index);
    return wrapper;
  }

  /**
   * Walks the tree
   * @param start
   * @param endContainer
   * @param nextParent
   */
  walk(start, endContainer, nextParent) {
    let nextParentNode = start;
    while (nextParentNode && nextParentNode !== nextParent.parentNode) {
      const currentParentNode = nextParentNode;
      nextParentNode = nextParentNode.parentNode;
      if (this.wrapSiblings(currentParentNode.nextSibling, endContainer)) {
        break;
      }
    }
  }


  /**
   * Will Wrap all textNode siblings of a container (start) inside a defined Element (like a span)
   * If an Element node is found, it will wrap all children of this node inside a element as well.
   * It will stop if endContainer is found as a node
   *
   * @param {Node} start
   * @param {Node} endContainer
   * @returns {boolean} (true if endContainer was found)
   */
  wrapSiblings(start, endContainer) {
    let next = start;
    let found = false;

    // Capsule some logic
    const wrap = (n) => {
      const instance = Rendering.getMarklibInstance(n.parentNode);
      if (n.parentNode.hasAttribute(ATTR_DATA_START_END) &&
        n.parentNode.hasAttribute(ATTR_DATA_IS_HIGHLIGHT_NODE) &&
        instance === this) {
        this._createWrap(n, undefined, undefined, undefined, true);
      } else {
        this._createWrap(n);
      }
    };

    // helper functions

    const wrapIf = (n) => {
      if (!Util.nodeIsEmpty(n)) {
        wrap(n);
      }
    };

    const walkIfContained = (e) => {
      if (e === endContainer) {
        return false;
      }
      if (Node.TEXT_NODE === e.nodeType) {
        wrapIf(e);
      }
      return true;
    };

    const walkIfNotContained = (el) => {
      wrapIf(el);
    };

    while (next !== null && next !== endContainer) {
      const currentNext = next;
      next = next.nextSibling;
      // Found a text node, directly wrap inside a span
      if (Node.TEXT_NODE === currentNext.nodeType) {
        wrapIf(currentNext);
      } else {
        if ((currentNext.compareDocumentPosition(endContainer) & DOCUMENT_POSITION_CONTAINED_BY)) {
          Util.walkDom(currentNext, walkIfContained);
          found = true;
        } else {
          Util.walkTextNodes(currentNext, walkIfNotContained);
        }
        if (found) {
          return true;
        }
      }
    }
    return found;
  }

  /**
   * Marks text of the same node
   * @param {Node} textNode
   * @param {int} startIndex
   * @param {int} endIndex
   * @private
   */
  _markTextSameNode(textNode, startIndex, endIndex) {
    const initialText = textNode.nodeValue;
    const initialIndex = Util.calcIndex(textNode);

    if (!initialText) {
      return false;
    }
    // If there is an unmarked part in the beginning of the text node,
    // cut off that part and put it into it's own textnode.
    if (startIndex > 0) {
      const textBefore = initialText.slice(0, startIndex);
      textNode.parentNode.insertBefore(this.document.createTextNode(textBefore), textNode);
      // wrap cutted text node:
      Util.wrap(textNode.previousSibling, this._createSplitContainer(textNode,
        initialIndex, Util.getOffsetParentIfHas(textNode)));
    }
    // If there is an unmarked part at the end of the text node,
    // cut off that part and put it into it's own textnode.
    if (endIndex < initialText.length) {
      const textAfter = initialText.slice(endIndex, initialText.length);
      textNode.parentNode.insertBefore(this.document.createTextNode(textAfter), textNode.nextSibling);
      Util.wrap(textNode.nextSibling, this._createSplitContainer(textNode,
        initialIndex, Util.getOffsetParentIfHas(textNode) + endIndex));
    }

    // Cutoff the unmarked parts and wrap the textnode into a span.
    textNode.nodeValue = initialText.slice(startIndex, endIndex);
    this.startContainer = this._createWrap(textNode,
      Util.getOffsetParentIfHas(textNode) + startIndex, initialIndex, true).parentNode;
    this.endContainer = this.startContainer;
    return this.startContainer;
  }


  /**
   * Marks text of end and start containers if start and end nodes are different
   * Important: There might be no end container!
   *
   * @param {Node} startContainer
   * @param {Node} endContainer
   * @param {int} startOffset
   * @param {int} endOffset
   * @returns {{startT: (Node), endT: (Node)}}
   * @private
   */
  _markTextDifferentNode(startContainer, endContainer, startOffset, endOffset) {
    // Get current for both start and end:
    const startContainerIndex = Util.calcIndex(startContainer);
    const endContainerIndex = Util.calcIndex(endContainer);

    // Split text
    const fullTextStartValue = startContainer.nodeValue;
    // init with startContainer because we may have not a text node here
    let startT = startContainer;

    if (undefined !== fullTextStartValue) {
      const partTextStartValue = fullTextStartValue.slice(startOffset, fullTextStartValue.length);
      // Set new text to start node
      startContainer.nodeValue = fullTextStartValue.slice(0, startOffset);

      const offsetStart = Util.getOffsetParentIfHas(startContainer);
      // Create a new node for splitted text, offset is the length of new startContainer.nodeValue:
      startT = this._createStartOrEndContainer(startContainer, partTextStartValue,
        offsetStart === startOffset ? offsetStart : offsetStart + startOffset, startContainerIndex);
      // Append this node after startContainer
      startContainer.parentNode.insertBefore(startT, startContainer.nextSibling);
      this.startContainer = startT;

      if (startContainer.nodeValue) {
        // Wrap start container in detection node, offset is always 0 or parent offset.
        Util.wrap(startContainer, this._createSplitContainer(startContainer, startContainerIndex,
          Util.getOffsetParentIfHas(startContainer)));
      }
    }

    // init with endContainer because we may have not a text node here
    let endT = endContainer;

    // 2. Extract end Text node,
    const fullTextEndValue = endContainer.nodeValue;
    // It's possible that end container value is null (if a whole paragraph is marked)
    if (undefined !== fullTextEndValue) {
      // Split text
      const partTextEndValue = fullTextEndValue.slice(0, endOffset);
      endContainer.nodeValue = fullTextEndValue.slice(endOffset, fullTextEndValue.length);
      // End Container start offset is always 0 or parent offset.
      endT = this._createStartOrEndContainer(endContainer, partTextEndValue,
        Util.getOffsetParentIfHas(endContainer), endContainerIndex);

      endContainer.parentNode.insertBefore(endT, endContainer);
      this.endContainer = endT;
      const offsetParent = Util.getOffsetParentIfHas(endContainer);
      Util.wrap(endContainer, this._createSplitContainer(endContainer, endContainerIndex,
        offsetParent === endOffset ? offsetParent : offsetParent + endOffset));
    }

    return {
      startT,
      endT
    };
  }

  /**
   * Renders a selection
   * @param {Node} startContainerP
   * @param {Node} endContainerP
   * @param {Node} commonAncestor
   * @param {int} startOffset
   * @param {int} endOffsetP
   * @returns RenderResult
   * @private
   */
  _renderWithElements(startContainerP, endContainerP, commonAncestor, startOffset, endOffsetP) {
    if (this._renderResult) {
      return this._renderResult;
    }
    let startContainer = startContainerP;
    let endContainer = endContainerP;
    let endOffset = endOffsetP;
    let outer = Util.parents(startContainer, commonAncestor);
    outer = outer[outer.length - 1];
    const contextContainer = outer || commonAncestor;

    // Same Element, means the selection is fully contained in a discrete area,
    // start and endpoint have the same parent
    // but are different nodes:

    // Start and End offset have to be recalculated because dom might be already changed by
    // highlighting in given node
    // 1: First detect real start offset in startContainer:

    // That works by selecting the highest wrapper and get original-offset-start data element,
    // see "findOriginalOffset"
    // So first select that container:
    const originalStartOffset = Util.findOriginalOffset(startContainer);
    const originalEndOffset = Util.findOriginalOffset(endContainer);

    // We may run into Browser Bugs:

    // If both are not text nodes, use next sibling as endContainer
    if (startContainer.nodeType !== Node.TEXT_NODE && endContainer.nodeType !== Node.TEXT_NODE) {
      if (startContainer === endContainer) {
        endContainer = endContainer.nextElementSibling || endContainer;
      }
    }
    // IF start/end container is not type of text, select first child text node:
    // We run in some bugs with firefox here that selects no text-nodes sometimes, trying to fix this here
    // Sometimes does not work correctly... (specially when DOM was modified)
    if (startContainer.nodeType !== Node.TEXT_NODE) {
      Util.walkDom(startContainer, (el) => {
        if (el.nodeType === Node.TEXT_NODE) {
          startContainer = el;
          return false;
        }
        return true;
      });
    }

    if (endContainer.nodeType !== Node.TEXT_NODE) {
      let toFindNode = startContainer;

      if (endOffset === 0) {
        toFindNode = endContainer.previousElementSibling || startContainer;
      }

      // Get the last text node:
      const endContainerContents = Util.closest(toFindNode, `:not([${DATA_IS_SELECTION}])`).childNodes;
      if (endContainerContents.length) {
        const r = endContainerContents[endContainerContents.length - 1];
        if (r.nodeType === Node.TEXT_NODE) {
          endContainer = r;
          endOffset = r.length;
        } else {
          let f = r.lastChild;
          while (f !== null) {
            if (f && f.nodeType === Node.TEXT_NODE) {
              endContainer = f;
              endOffset = f.length;
              if (f.parentNode.hasAttribute(ATTR_DATA_ORIGINAL_OFFSET_START)) {
                endOffset = parseInt(f.parentNode
                    .getAttribute(ATTR_DATA_ORIGINAL_OFFSET_START), 10) + endOffset;
              }
            }
            f = f.lastChild;
          }
        }
      }
      // still no textNode?
      if (endContainer.nodeType !== Node.TEXT_NODE) {
        throw Error('Could not found endContainer, highlighting would be unstable');
      }
    }

    this._renderResult = new RenderResult(
      // Real offset is calculated by relative length and absolute length
      originalStartOffset + startOffset,
      originalEndOffset + endOffset,
      // get the path for this selection
      Util.getPath(startContainer, this.context),
      Util.getPath(endContainer, this.context)
    );

    this._renderResult.instance = this;


    this._renderSelection(startContainer, endContainer, startOffset, endOffset, contextContainer, !!outer);

    return this._renderResult;
  }

  /**
   * Renders a given selection
   *
   * @param {Node} startContainer
   * @param {Node} endContainer
   * @param {int} startOffset
   * @param {int} endOffset
   * @param {Node} contextContainer
   * @param {Boolean} outer
   * @private
   */
  _renderSelection(startContainer, endContainer, startOffset, endOffset, contextContainer, outer) {
    // if start and end-container are the same, mark text on the same node
    if (startContainer === endContainer) {
      this._markTextSameNode(startContainer, startOffset, endOffset);
    } else {
      const result = this._markTextDifferentNode(startContainer, endContainer, startOffset, endOffset);
      const index = this.wrapperNodes.indexOf(result.endT);
      // remove endContainer, to keep order:
      this.wrapperNodes.splice(index, 1);
      if (!outer) {
        this.wrapSiblings(result.startT.nextSibling, endContainer);
      } else {
        this.walk(result.startT, endContainer, contextContainer);
      }
      this.wrapperNodes.push(result.endT);
    }
  }

  /**
   * Prepares to render a Selection with path selectors
   * ```
   * A Path looks like this:
   *
   * #selector;#textnode;#offset
   * ``
   * @param {string} startPath
   * @param {string} endPath
   * @returns {string}
   */
  renderWithPath(startPath, endPath) {
    const startContainer = Util.deserializePath(startPath, this.context);
    const endContainer = Util.deserializePath(endPath, this.context);
    if (startContainer && endContainer && startContainer.node && endContainer.node) {
      const range = document.createRange();
      range.setStart(startContainer.node, startContainer.offset);
      range.setEnd(endContainer.node, endContainer.offset);
      const text = range.toString();
      const result = this.renderWithRange(range);
      result.text = text;
      return text;
    }
    throw new Error('Could not find start- and/or end-container in document');
  }

  /**
   * @returns {RenderResult}
   */
  get result() {
    return this._renderResult;
  }

  /**
   * Renders a result (that returned from `renderWithRange`)
   * @param {RenderResult|Object} result
   * @returns {string}
   */
  renderWithResult(result) {
    return this.renderWithPath(
      `${result.startContainerPath};${result.startOffset}`,
      `${result.endContainerPath};${result.endOffset}`);
  }

  /**
   * Prepares a selection with a range object
   * @param {Range} range
   * @returns {Object}
   */
  renderWithRange(range) {
    const text = range.toString();
    const result = this._renderWithElements(range.startContainer, range.endContainer,
      range.commonAncestorContainer, range.startOffset, range.endOffset);
    result.text = text;
    return result;
  }

  /**
   * Removes bindings and classNames to nodes
   */
  destroy() {
    this.wrapperNodes.forEach((node) => {
      delete node.marklibInstance;
      node.className = '';
    });
    this.removeEvent();
  }

  /**
   * @param {Node} el
   * @param {Rendering} instance
   * @returns {Node}
   */
  static setMarklibInstance(el, instance) {
    el.marklibInstance = instance;
    return el;
  }

  /**
   * @param {Node} el
   * @returns {Rendering|null|undefined}
   */
  static getMarklibInstance(el) {
    return el ? el.marklibInstance : null;
  }
}

export default Rendering;
