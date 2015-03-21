import Util from 'util/Util';

import {ATTR_DATA_ORIGINAL_INDEX, DATA_IS_SELECTION} from 'util/Util';

/**
 * @type {string}
 */
const TAG_NAME = 'x-marker';
/**
 * @type {string}
 */
const ATTR_DATA_ORIGINAL_OFFSET_START = 'data-original-offset-start';
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

export default
class Marklib {

    constructor(document, cssClass) {

        /**
         * @type {Document}
         */
        this.document = document;

        /**
         * ID of rendering, will be set on each element that is part of it
         * @type {String}
         */
        this.id = 'new-id';

        /**
         * Class that is set on all highlight nodes
         * @type {String}
         */
        this.cssClass = cssClass;

        /**
         * StartContainer
         * @type {HTMLElement}
         */
        this.startContainer = null;

        /**
         * EndContainer
         * @type {HTMLElement}
         */
        this.endContainer = null;
    }

    /**
     * @returns {String} id of this rendering
     */
    getId() {
        return this.id;
    }

    /**
     * @param {HTMLElement} container
     * @param {Number} thisIndex
     * @returns {String} index of parent or original
     * @private
     */
    static _getIndexParentIfHas(container, thisIndex) {
        var p = container.parentNode;
        var index = p.getAttribute(ATTR_DATA_ORIGINAL_INDEX);
        return index > thisIndex ? index : thisIndex;
    }

    /**
     * @param container
     * @returns {Number} offset start of parent if has, else 0
     */
    static _getOffsetParentIfHas(container) {
        var p = container.parentNode;
        var offset = p.getAttribute(ATTR_DATA_ORIGINAL_OFFSET_START);
        return offset > 0 ? offset : 0;
    }

    /**
     * Creates a Template used as a wrapper
     * @returns {HTMLElement}
     * @private
     */
    _createSpanTemplate() {
        var el = this.document.createElement(TAG_NAME), vTrue = "true";
        el.className = this.cssClass;
        el.setAttribute(DATA_IS_SELECTION, vTrue);
        el.setAttribute(ATTR_DATA_ID, this.getId());
        el.setAttribute(ATTR_DATA_IS_HIGHLIGHT_NODE, vTrue);
        return el;
    }

    /**
     * Creates a Template to use as start and end marks
     * @param {String} id
     * @param {String} text
     * @returns {HTMLElement}
     * @private
     */
    _createSpanStartEndTemplate(id, text) {
        var el = this._createSpanTemplate(), vTrue = "true";
        el.setAttribute(ATTR_DATA_START_END, vTrue);
        el.id = id;
        el.textContent = text;
        return el;
    }

    /**
     * Wraps given element
     * @param {HTMLElement} el
     * @param [optionalLength]
     * @param [optionalIndex]
     * @param [optionalIsSameNode]
     * @returns {HTMLElement}
     * @private
     */
    _createWrap(el, optionalLength, optionalIndex, optionalIsSameNode) {
        var originalIndex = optionalIndex >= 0 ? optionalIndex : Util.calcIndex(el);
        var wrapper = this._createSpanTemplate();
        wrapper.setAttribute(ATTR_DATA_ORIGINAL_INDEX, Marklib._getIndexParentIfHas(el, originalIndex));
        var offsetLength = optionalLength >= 0 ? optionalLength : Marklib._getOffsetParentIfHas(el);
        wrapper.setAttribute(ATTR_DATA_ORIGINAL_OFFSET_START, offsetLength);

        // Save a reference to original text node in wrapper
        wrapper.setAttribute(DATA_ORIGINAL_TEXT_NODE_INDEX, originalIndex);

        // save this marker instance to given node
        wrapper.marklibInstance = this;

        if (optionalIsSameNode) {
            wrapper.setAttribute(ATTR_DATA_START_END, ATTR_DATA_START_END)
        }

        return Util.wrap(el, wrapper);
    }

    /**
     * Extracts all TextNodes inside a container
     * @param {HTMLElement} el
     * @returns {Array.<Text>}
     */
    _getTextNodesIn(el) {
        return Util.nodeListFilter(el.childNodes, (node) => {
            return Node.TEXT_NODE === node.nodeType && !Util.nodeIsEmpty(node);
        });
    }


    /**
     * Walks the tree
     * @param start
     * @param endContainer
     * @param nextParent
     */
    walk(start, endContainer, nextParent) {
        var nextParentNode = start;
        while (nextParentNode && nextParentNode !== nextParent[0].parentNode) {
            var currentParentNode = nextParentNode;
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
     * @param {HTMLElement} start
     * @param {HTMLElement} endContainer
     * @returns {boolean} (true if endContainer was found)
     */
    wrapSiblings(start, endContainer) {
        var next = start;
        var found = false;

        // Capsule some logic
        var wrap = ((n) => {
            if (n.parentNode.hasAttribute(ATTR_DATA_START_END)
                && n.parentNode.hasAttribute(
                    ATTR_DATA_IS_HIGHLIGHT_NODE) && n.parentNode.getAttribute(ATTR_DATA_ID) == this.getId()) {
                var thisNode = this._createWrap(n).parentNode;
                thisNode.classList.remove(this.cssClass);
                thisNode.removeAttribute(ATTR_DATA_IS_HIGHLIGHT_NODE);
            } else {
                this._createWrap(n);
            }
        }).bind(this);

        var wrapIf = (n) => {
            if (!Util.nodeIsEmpty(n)) {
                wrap(n);
            }
        };

        while (null !== next && next !== endContainer) {
            var currentNext = next;
            next = next.nextSibling;
            // Found a text node, directly wrap inside a span
            if (Node.TEXT_NODE === currentNext.nodeType) {
                wrapIf(currentNext);
            } else {
                if (currentNext.contains(endContainer)) {
                    this.walkDom(currentNext, (e) => {
                        if (e === endContainer) {
                            return false;
                        }
                        if (Node.TEXT_NODE === e.nodeType) {
                            wrapIf(e);
                        }
                        return true;
                    });
                    found = true;
                } else {
                    var nodes = this._getTextNodesIn(currentNext);
                    nodes.forEach((el) => {
                        wrapIf(el);
                    });
                }
                if (found) {
                    return true;
                }
            }
        }
        return found;
    }

    /**
     * Recursively walks the dom tree unless func returns false
     * This is a lot more efficient then using any jQuery operations
     *
     * Applies node to function
     * @param node
     * @param func
     * @returns {*}
     */
    walkDom(node, func) {
        if (!node) {
            return false;
        }
        var children = node.childNodes;
        if (!children) {
            return false;
        }
        for (var i = 0; i < children.length; i++) {
            if (!this.walkDom(children[i], func)) {
                return false;
            }
        }
        return func(node);
    }

}

