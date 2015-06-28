/* global Node, Document */

'use strict';

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

/**
 * @see https://developer.mozilla.org/de/docs/Web/API/Node/compareDocumentPosition
 * @type {number}
 */
const DOCUMENT_POSITION_CONTAINED_BY = 16;

export default
class Rendering {

    constructor(document, cssClass, context) {

        if (!(document instanceof Document)) {
            throw 'Marklib {0} is required to be a document instance';
        }
        /**
         * @type {Document}
         */
        this.document = document;

        /**
         * ID of rendering, will be set on each element that is part of it
         * @type {String}
         */
        this.id = Util.guid();

        /**
         * Class that is set on all highlight nodes
         * @type {String}
         */
        this.cssClass = undefined === cssClass ? 'marking' : cssClass;

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
         * Prefix before ID
         * @type {string}
         */
        this.markerPrefix = 'marker-start-';

        /**
         * Suffix before ID
         * @type {string}
         */
        this.markerSuffix = 'marker-end-';

        /**
         * @type {Node}
         */
        this.context = context || this.document;

        /**
         * @type {Function}
         * @private
         */
        this._onWrappedNodeFunc = null;
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
        return this;
    }

    /**
     * Listener that is called when a node is wrapped on this instance
     * @param {Function} f
     * @returns {Rendering}
     */
    onWrappedNode(f) {
        this._onWrappedNodeFunc = f;
        return this;
    }

    /**
     * @private
     */
    _callOnWrappedNode() {
        if (typeof this._onWrappedNodeFunc === 'function') {
            this._onWrappedNodeFunc.apply(this, arguments);
        }
    }


    /**
     * @param {Node} container
     * @param {Number} thisIndex
     * @returns {int} index of parent or original
     * @private
     */
    static _getIndexParentIfHas(container, thisIndex) {
        var p = container.parentNode;
        var index = parseInt(p.getAttribute(ATTR_DATA_ORIGINAL_INDEX));
        return index > thisIndex ? index : thisIndex;
    }

    /**
     * @param container
     * @returns {int} offset start of parent if has, else 0
     */
    static _getOffsetParentIfHas(container) {
        var p = container.parentNode;
        var offset = parseInt(p.getAttribute(ATTR_DATA_ORIGINAL_OFFSET_START));
        return offset > 0 ? offset : 0;
    }

    /**
     * Creates a Template used as a wrapper
     * @returns {Node}
     * @private
     */
    _createWrapTemplate() {
        var el = this.document.createElement(TAG_NAME), vTrue = "true";
        el.className = this.cssClass;
        el.setAttribute(DATA_IS_SELECTION, vTrue);
        el.setAttribute(ATTR_DATA_ID, this.getId());
        el.setAttribute(ATTR_DATA_IS_HIGHLIGHT_NODE, vTrue);

        return el;
    }

    /**
     * Creates a Template to use as start and end marks
     * @param {String} text
     * @returns {Node}
     * @private
     */
    _createStartEndWrapTemplate(text) {
        var el = this._createWrapTemplate(), vTrue = "true";
        el.setAttribute(ATTR_DATA_START_END, vTrue);
        el.textContent = text;
        return el;
    }


    /**
     * Creates Start or End Container Element
     * @param initialNode
     * @param prefix
     * @param text
     * @param offset
     * @param index
     * @returns {Node}
     */
    _createStartOrEndContainer(initialNode, prefix, text, offset, index) {
        const wrapper = this._createStartEndWrapTemplate(text);
        wrapper.setAttribute(ATTR_DATA_ORIGINAL_INDEX, Rendering._getIndexParentIfHas(initialNode, index));
        wrapper.setAttribute(ATTR_DATA_ORIGINAL_OFFSET_START, offset);
        wrapper.setAttribute(DATA_ORIGINAL_TEXT_NODE_INDEX, index);
        wrapper.marklibInstance = this;
        return wrapper;
    }

    /**
     * Wraps given element
     * @param {Node} el
     * @param [optionalLength]
     * @param [optionalIndex]
     * @param [optionalIsSameNode]
     * @returns {Node}
     * @private
     */
    _createWrap(el, optionalLength, optionalIndex, optionalIsSameNode) {
        const originalIndex = optionalIndex >= 0 ? optionalIndex : Util.calcIndex(el);
        const wrapper = this._createWrapTemplate();
        wrapper.setAttribute(ATTR_DATA_ORIGINAL_INDEX, Rendering._getIndexParentIfHas(el, originalIndex));
        const offsetLength = optionalLength >= 0 ? optionalLength : Rendering._getOffsetParentIfHas(el);
        wrapper.setAttribute(ATTR_DATA_ORIGINAL_OFFSET_START, offsetLength);

        // Save a reference to original text node in wrapper
        wrapper.setAttribute(DATA_ORIGINAL_TEXT_NODE_INDEX, originalIndex);

        // save this marker instance to given node
        wrapper.marklibInstance = this;

        if (optionalIsSameNode) {
            wrapper.setAttribute(ATTR_DATA_START_END, ATTR_DATA_START_END);
        }
        const wrap = Util.wrap(el, wrapper);
        this._callOnWrappedNode(el, wrap);
        return wrap;
    }

    /**
     * Create split container element
     * @param originalElement {Node} original text node element that is created a wrapper for
     * @param index
     * @param offset
     * @returns {*|jQuery|Node}
     */
    _createSplitContainer(originalElement, index, offset) {
        const wrapper = this.document.createElement(TAG_NAME), vTrue = "true";
        wrapper.setAttribute(DATA_IS_SELECTION, vTrue);
        wrapper.setAttribute(ATTR_DATA_ORIGINAL_INDEX, Rendering._getIndexParentIfHas(originalElement, index));
        wrapper.setAttribute(ATTR_DATA_ORIGINAL_OFFSET_START, offset);
        wrapper.setAttribute(DATA_ORIGINAL_TEXT_NODE_INDEX, index);
        return wrapper;
    }

    /**
     * Extracts all TextNodes inside a container
     * @param {Node} el
     * @returns {Array.<Text>}
     */
    _walkTextNodes(el, func) {
        this.walkDom(el, function (node) {
            if (Node.TEXT_NODE === node.nodeType && !Util.nodeIsEmpty(node)) {
                func(node);
            }
            return true;
        });
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
     * @param {Node} start
     * @param {Node} endContainer
     * @returns {boolean} (true if endContainer was found)
     */
    wrapSiblings(start, endContainer) {
        let next = start,
            found = false;

        // Capsule some logic
        const wrap = ((n) => {
            if (n.parentNode.hasAttribute(ATTR_DATA_START_END) &&
                n.parentNode.hasAttribute(ATTR_DATA_IS_HIGHLIGHT_NODE) &&
                n.parentNode.getAttribute(ATTR_DATA_ID) === this.getId()) {
                let thisNode = this._createWrap(n).parentNode;
                thisNode.classList.remove(this.cssClass);
                thisNode.removeAttribute(ATTR_DATA_IS_HIGHLIGHT_NODE);
            } else {
                this._createWrap(n);
            }
        }).bind(this);

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
            var currentNext = next;
            next = next.nextSibling;
            // Found a text node, directly wrap inside a span
            if (Node.TEXT_NODE === currentNext.nodeType) {
                wrapIf(currentNext);
            } else {
                if ((currentNext.compareDocumentPosition(endContainer) & DOCUMENT_POSITION_CONTAINED_BY)) {
                    this.walkDom(currentNext, walkIfContained);
                    found = true;
                } else {
                    this._walkTextNodes(currentNext, walkIfNotContained);
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
        const children = node.childNodes;
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

    /**
     * Marks text of the same node
     * @param {Node} textNode
     * @param {int} startIndex
     * @param {int} endIndex
     * @private
     */
    _markTextSameNode(textNode, startIndex, endIndex) {

        const initialText = textNode.nodeValue,
            initialIndex = Util.calcIndex(textNode);

        if (!initialText) {
            return false;
        }

        //If there is an unmarked part in the beginning of the text node,
        //cut off that part and put it into it's own textnode.
        if (startIndex > 0) {
            const textBefore = initialText.slice(0, startIndex);
            textNode.parentNode.insertBefore(this.document.createTextNode(textBefore), textNode);
            // wrap cutted text node:
            Util.wrap(textNode.previousSibling, this._createSplitContainer(textNode,
                initialIndex, Rendering._getOffsetParentIfHas(textNode)));
        }
        //If there is an unmarked part at the end of the text node,
        //cut off that part and put it into it's own textnode.
        if (endIndex < initialText.length) {
            const textAfter = initialText.slice(endIndex, initialText.length);
            textNode.parentNode.insertBefore(this.document.createTextNode(textAfter), textNode.nextSibling);
            Util.wrap(textNode.nextSibling, this._createSplitContainer(textNode,
                initialIndex, Rendering._getOffsetParentIfHas(textNode) + endIndex));
        }

        //Cutoff the unmarked parts and wrap the textnode into a span.
        textNode.nodeValue = initialText.slice(startIndex, endIndex);
        this.startContainer = this._createWrap(textNode,
            Rendering._getOffsetParentIfHas(textNode) + startIndex, initialIndex, true).parentNode;
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
            var partTextStartValue = fullTextStartValue.slice(startOffset, fullTextStartValue.length);
            // Set new text to start node
            startContainer.nodeValue = fullTextStartValue.slice(0, startOffset);

            var offsetStart = Rendering._getOffsetParentIfHas(startContainer);
            // Create a new node for splitted text, offset is the length of new startContainer.nodeValue:
            startT = this._createStartOrEndContainer(startContainer, this.markerPrefix, partTextStartValue,
                offsetStart === startOffset ? offsetStart : offsetStart + startOffset, startContainerIndex);
            // Append this node after startContainer
            startContainer.parentNode.insertBefore(startT, startContainer.nextSibling);
            this.startContainer = startT;

            if (startContainer.nodeValue) {
                // Wrap start container in detection node, offset is always 0 or parent offset.
                Util.wrap(startContainer, this._createSplitContainer(startContainer, startContainerIndex,
                    Rendering._getOffsetParentIfHas(startContainer)));
            }
        }

        // init with endContainer because we may have not a text node here
        let endT = endContainer;

        // 2. Extract end Text node,
        const fullTextEndValue = endContainer.nodeValue;
        // It's possible that end container value is null (if a whole paragraph is marked)
        if (undefined !== fullTextEndValue) {
            // Split text
            var partTextEndValue = fullTextEndValue.slice(0, endOffset);
            endContainer.nodeValue = fullTextEndValue.slice(endOffset, fullTextEndValue.length);
            // End Container start offset is always 0 or parent offset.
            endT = this._createStartOrEndContainer(endContainer, this.markerSuffix, partTextEndValue,
                Rendering._getOffsetParentIfHas(endContainer), endContainerIndex);

            endContainer.parentNode.insertBefore(endT, endContainer);
            this.endContainer = endT;
            var offsetParent = Rendering._getOffsetParentIfHas(endContainer);
            Util.wrap(endContainer, this._createSplitContainer(endContainer, endContainerIndex,
                offsetParent === endOffset ? offsetParent : offsetParent + endOffset));
        }

        return {startT: startT, endT: endT};
    }

    /**
     * Will return the original first offset
     * @param element
     * @returns {int}
     * @private
     */
    _findOriginalOffset(element) {
        if (!element.parentNode.hasAttribute(ATTR_DATA_ORIGINAL_OFFSET_START)) {
            return 0;
        }
        const lengthElement = Util.parent(element, '[' + ATTR_DATA_ORIGINAL_OFFSET_START + ']');
        return lengthElement ? parseInt(lengthElement.getAttribute(ATTR_DATA_ORIGINAL_OFFSET_START)) : 0;
    }

    /**
     * Renders a selection
     * @param {Node} startContainer
     * @param {Node} endContainer
     * @param {Node} commonAncestor
     * @param {int} startOffset
     * @param {int} endOffset
     * @param {boolean} [withoutResult] if true result will not be calculated
     * @returns {{startOffset: (int), endOffset: (int)}} the original offsets found
     * @private
     */
    _renderWithElements(startContainer, endContainer, commonAncestor, startOffset, endOffset, withoutResult) {
        let outer = Util.parents(startContainer, commonAncestor);
        outer = outer[outer.length - 1];
        const contextContainer = outer ? outer : commonAncestor;

        // Same Element, means the selection is fully contained in a discrete area, start and endpoint have the same parent
        // but are different nodes:

        // Start and End offset have to be recalculated because dom might be already changed by highlighting in given node
        // 1: First detect real start offset in startContainer:

        // That works by selecting the highest wrapper and get original-offset-start data element, see "findOriginalOffset"
        // So first select that container:
        const originalStartOffset = this._findOriginalOffset(startContainer);
        const originalEndOffset = this._findOriginalOffset(endContainer);

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
            this.walkDom(startContainer, function (el) {
                if (el.nodeType === Node.TEXT_NODE) {
                    startContainer = el;
                    return false;
                }
                return true;
            });
        }

        if (endContainer.nodeType !== Node.TEXT_NODE) {
            // Get the last text node:
            const endContainerContents = Util.closest(startContainer, ':not([' + DATA_IS_SELECTION + '])').childNodes;
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
                                    .getAttribute(ATTR_DATA_ORIGINAL_OFFSET_START)) + endOffset;
                            }
                        }
                        f = f.lastChild;
                    }
                }
            }
            // still no textNode?
            if (endContainer.nodeType !== Node.TEXT_NODE) {
                throw 'Could not found endContainer, highlighting would be unstable';
            }
        }

        var result = withoutResult || {
                // Real offset is calculated by relative length and absolute length
                startOffset: originalStartOffset + startOffset,
                endOffset: originalEndOffset + endOffset,
                // get the path for this selection
                startContainerPath: Util.getPath(startContainer, this.context),
                endContainerPath: Util.getPath(endContainer, this.context)
            };

        this._renderSelection(startContainer, endContainer, startOffset, endOffset, contextContainer, outer);

        return result;
    }

    /**
     * Renders a given selection
     *
     * @param {Node} startContainer
     * @param {Node} endContainer
     * @param {int} startOffset
     * @param {int} endOffset
     * @param {Node} contextContainer
     * @param {Node} outer
     * @private
     */
    _renderSelection(startContainer, endContainer, startOffset, endOffset, contextContainer, outer) {

        // if start and end-container are the same, mark text on the same node
        if (startContainer === endContainer) {
            this._markTextSameNode(startContainer, startOffset, endOffset);
        } else {
            var result = this._markTextDifferentNode(startContainer, endContainer, startOffset, endOffset);
            if (!outer) {
                this.wrapSiblings(result.startT.nextSibling, endContainer);
            } else {
                this.walk(result.startT, endContainer, contextContainer);
            }
        }
    }


    /**
     * Deserialize a specific path and finds the right textNodes
     * This even works when DOM has been manipulated before by `marklib`
     * @param {string} path the serialized path (including offsets)
     * @return {Node}
     * @private
     */
    _deserializePath(path) {
        const pSplit = path.split(';'), p = pSplit[0],
            objectIndex = parseInt(pSplit[1]),
            charOffset = parseInt(pSplit[2]),
            container = this.context.querySelector(p);
        let maybeFoundNode = null;
        this.walkDom(container, function (n) {
            if (n.nodeType === Node.TEXT_NODE) {
                var atrOffsetStart = n.parentNode.getAttribute(ATTR_DATA_ORIGINAL_OFFSET_START);
                atrOffsetStart = atrOffsetStart === null ? 0 : atrOffsetStart;
                var atrIndex = n.parentNode.getAttribute(ATTR_DATA_ORIGINAL_INDEX);
                atrIndex = atrIndex === null ? Util.calcIndex(n) : atrIndex;
                if (parseInt(atrIndex) === objectIndex && charOffset >= atrOffsetStart &&
                    ((parseInt(atrOffsetStart) + n.length) >= charOffset)) {
                    var thisOffset = n.parentNode
                        .hasAttribute(ATTR_DATA_ORIGINAL_OFFSET_START) ? charOffset -
                    parseInt(n.parentNode
                        .getAttribute(ATTR_DATA_ORIGINAL_OFFSET_START)) : charOffset;
                    maybeFoundNode = {node: n, offset: thisOffset};
                    return false;
                }
            } else {
                return true;
            }
            return true;
        });

        return maybeFoundNode;
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
        const startContainer = this._deserializePath(startPath);
        const endContainer = this._deserializePath(endPath);
        if (startContainer && endContainer && startContainer.node && endContainer.node) {
            var range = document.createRange();
            range.setStart(startContainer.node, startContainer.offset);
            range.setEnd(endContainer.node, endContainer.offset);
            const text = range.toString();
            this.renderWithRange(range, true);
            return text;
        }
        throw 'Could not find start- and/or end-container in document';
    }

    /**
     * Renders a result (that returned from `renderWithRange`)
     * @param result
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
     * @param {boolean} [withoutResult] optional do calculate a result, the selection would not be serializable
     * @returns {Object}
     */
    renderWithRange(range, withoutResult) {
        return this._renderWithElements(range.startContainer, range.endContainer,
            range.commonAncestorContainer, range.startOffset, range.endOffset, withoutResult);
    }
}

