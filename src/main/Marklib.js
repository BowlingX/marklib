/* global Node, Text, Marklib, Document */
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
        this.cssClass = cssClass || 'marking';

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
    }

    /**
     * @returns {string} id of this rendering
     */
    getId() {
        return this.id;
    }

    /**
     * @param {string} id
     * @returns {Marklib}
     */
    setId(id) {
        this.id = id;
        return this;
    }

    /**
     * @param {Node} container
     * @param {int} thisIndex
     * @param {string} attr
     * @returns {int}
     * @private
     */
    static _getParentIfHas(container, thisIndex, attr) {
        var p = container.parentNode;
        var index = parseInt(p.getAttribute(attr));
        return index > thisIndex ? index : thisIndex;
    }

    /**
     * @param {Node} container
     * @param {int} thisIndex
     * @returns {int} index of parent or original
     * @private
     */
    static _getIndexParentIfHas(container, thisIndex) {
        return Marklib._getParentIfHas(container, thisIndex, ATTR_DATA_ORIGINAL_INDEX);
    }

    /**
     * @param container
     * @returns {int} offset start of parent if has, else 0
     */
    static _getOffsetParentIfHas(container) {
        return Marklib._getParentIfHas(container, ATTR_DATA_ORIGINAL_OFFSET_START);
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
     * @param {String} id
     * @param {String} text
     * @returns {Node}
     * @private
     */
    _createStartEndWrapTemplate(id, text) {
        var el = this._createWrapTemplate(), vTrue = "true";
        el.setAttribute(ATTR_DATA_START_END, vTrue);
        el.id = id;
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
        var wrapper = this._createStartEndWrapTemplate(prefix + this.getId(), text);
        wrapper.setAttribute(ATTR_DATA_ORIGINAL_INDEX, Marklib._getIndexParentIfHas(initialNode, index));
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
        var originalIndex = optionalIndex >= 0 ? optionalIndex : Util.calcIndex(el);
        var wrapper = this._createWrapTemplate();
        wrapper.setAttribute(ATTR_DATA_ORIGINAL_INDEX, Marklib._getIndexParentIfHas(el, originalIndex));
        var offsetLength = optionalLength >= 0 ? optionalLength : Marklib._getOffsetParentIfHas(el);
        wrapper.setAttribute(ATTR_DATA_ORIGINAL_OFFSET_START, offsetLength);

        // Save a reference to original text node in wrapper
        wrapper.setAttribute(DATA_ORIGINAL_TEXT_NODE_INDEX, originalIndex);

        // save this marker instance to given node
        wrapper.marklibInstance = this;

        if (optionalIsSameNode) {
            wrapper.setAttribute(ATTR_DATA_START_END, ATTR_DATA_START_END);
        }

        return Util.wrap(el, wrapper);
    }

    /**
     * Create split container element
     * @param originalElement {Node} original text node element that is created a wrapper for
     * @param index
     * @param offset
     * @returns {*|jQuery|Node}
     */
    _createSplitContainer(originalElement, index, offset) {
        var wrapper = this.document.createElement(TAG_NAME), vTrue = "true";
        wrapper.setAttribute(DATA_IS_SELECTION, vTrue);
        wrapper.setAttribute(ATTR_DATA_ORIGINAL_INDEX, Marklib._getIndexParentIfHas(originalElement, index));
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
        var nextParentNode = start;
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
        var next = start;
        var found = false;

        // Capsule some logic
        var wrap = ((n) => {
            if (n.parentNode.hasAttribute(ATTR_DATA_START_END) &&
                n.parentNode.hasAttribute(ATTR_DATA_IS_HIGHLIGHT_NODE) &&
                n.parentNode.getAttribute(ATTR_DATA_ID) == this.getId()) {
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
                    this._walkTextNodes(currentNext, (el) => {
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

    /**
     * Marks text of the same node
     * @param {Node} textNode
     * @param {int} startIndex
     * @param {int} endIndex
     * @private
     */
    _markTextSameNode(textNode, startIndex, endIndex) {
        var initialText = textNode.nodeValue;
        var initialIndex = Util.calcIndex(textNode);
        if (!initialText) {
            return false;
        }
        //If there is an unmarked part in the beginning of the text node,
        //cut off that part and put it into it's own textnode.
        if (startIndex > 0) {
            var textBefore = initialText.slice(0, startIndex);
            textNode.parentNode.insertBefore(new Text(textBefore), textNode);
            // wrap cutted text node:
            Util.wrap(textNode.previousSibling, this._createSplitContainer(textNode,
                initialIndex, Marklib._getOffsetParentIfHas(textNode)));
        }
        //If there is an unmarked part at the end of the text node,
        //cut off that part and put it into it's own textnode.
        if (endIndex < initialText.length) {
            var textAfter = initialText.slice(endIndex, initialText.length);
            textNode.parentNode.insertBefore(new Text(textAfter), textNode.nextSibling);

            Util.wrap(textNode.nextSibling, this._createSplitContainer(textNode,
                initialIndex, Marklib._getOffsetParentIfHas(textNode) + endIndex));
        }

        //Cutoff the unmarked parts and wrap the textnode into a span.
        textNode.nodeValue = initialText.slice(startIndex, endIndex);
        this.startContainer = this._createWrap(textNode,
            Marklib._getOffsetParentIfHas(textNode) + startIndex, initialIndex, true).parentNode;
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
        var startContainerIndex = Util.calcIndex(startContainer);
        var endContainerIndex = Util.calcIndex(endContainer);

        // Split text
        var fullTextStartValue = startContainer.nodeValue;
        // init with startContainer because we may have not a text node here
        var startT = startContainer;

        if (undefined !== fullTextStartValue) {
            var partTextStartValue = fullTextStartValue.slice(startOffset, fullTextStartValue.length);
            // Set new text to start node
            startContainer.nodeValue = fullTextStartValue.slice(0, startOffset);

            var offsetStart = Marklib._getOffsetParentIfHas(startContainer);
            // Create a new node for splitted text, offset is the length of new startContainer.nodeValue:
            startT = this._createStartOrEndContainer(startContainer, this.markerPrefix, partTextStartValue,
                offsetStart === startOffset ? offsetStart : offsetStart + startOffset, startContainerIndex);
            // Append this node after startContainer
            startContainer.parentNode.insertBefore(startT, startContainer.nextSibling);
            this.startContainer = startT;

            if (startContainer.nodeValue) {
                // Wrap start container in detection node, offset is always 0 or parent offset.
                Util.wrap(startContainer, this._createSplitContainer(startContainer, startContainerIndex,
                    Marklib._getOffsetParentIfHas(startContainer)));
            }
        }

        // init with endContainer because we may have not a text node here
        var endT = endContainer;

        // 2. Extract end Text node,
        var fullTextEndValue = endContainer.nodeValue;
        // It's possible that end container value is null (if a whole paragraph is marked)
        if (undefined !== fullTextEndValue) {
            // Split text
            var partTextEndValue = fullTextEndValue.slice(0, endOffset);
            endContainer.nodeValue = fullTextEndValue.slice(endOffset, fullTextEndValue.length);
            // End Container start offset is always 0 or parent offset.
            endT = this._createStartOrEndContainer(endContainer, this.markerSuffix, partTextEndValue,
                Marklib._getOffsetParentIfHas(endContainer), endContainerIndex);

            endContainer.parentNode.insertBefore(endT, endContainer);
            this.endContainer = endT;
            var offsetParent = Marklib._getOffsetParentIfHas(endContainer);
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
        var lengthElement = Util.parent(element, '[' + ATTR_DATA_ORIGINAL_OFFSET_START + ']');
        return lengthElement ? parseInt(lengthElement.getAttribute(ATTR_DATA_ORIGINAL_OFFSET_START)) : 0;
    }

    /**
     * Renders a selection
     * @param {Node} startContainer
     * @param {Node} endContainer
     * @param {Node} commonAncestor
     * @param {int} startOffset
     * @param {int} endOffset
     * @returns {{startOffset: (int), endOffset: (int)}} the original offsets found
     * @private
     */
    _renderWithElements(startContainer, endContainer, commonAncestor, startOffset, endOffset) {
        var outer = Util.parents(startContainer, commonAncestor);
        outer = outer[outer.length - 1];
        var contextContainer = outer ? outer : commonAncestor;

        // Same Element, means the selection is fully contained in a discrete area, start and endpoint have the same parent
        // but are different nodes:

        // Start and End offset have to be recalculated because dom might be already changed by highlighting in given node
        // 1: First detect real start offset in startContainer:

        // That works by selecting the highest wrapper and get original-offset-start data element, see "findOriginalOffset"
        // So first select that container:
        var originalStartOffset = this._findOriginalOffset(startContainer);
        var originalEndOffset = this._findOriginalOffset(endContainer);

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
            var endContainerContents = Util.closest(startContainer, ':not([' + DATA_IS_SELECTION + '])').childNodes;
            if (endContainerContents.length) {
                var r = endContainerContents[endContainerContents.length - 1];
                if (r.nodeType === Node.TEXT_NODE) {
                    endContainer = r;
                    endOffset = r.length;
                } else {
                    var f = r.lastChild;
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

        var result = {
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
     * Deserializes a specific path and finds the right textnodes
     * This even works when DOM has been manipulated before by `marklib`
     * @param {string} path the serialized path (including offsets)
     * @return {Node}
     * @private
     */
    _deserializePath(path) {
        var pSplit = path.split(';'), p = pSplit[0],
            objectIndex = parseInt(pSplit[1]),
            charOffset = parseInt(pSplit[2]),
            container = this.context.querySelector(p), maybeFoundNode = null;
        this.walkDom(container, function (n) {
            if (n.nodeType === Node.TEXT_NODE) {
                var atrOffsetStart = n.parentNode.getAttribute(ATTR_DATA_ORIGINAL_OFFSET_START);
                atrOffsetStart = null === atrOffsetStart ? 0 : atrOffsetStart;
                var atrIndex = n.parentNode.getAttribute(ATTR_DATA_ORIGINAL_INDEX);
                atrIndex = null === atrIndex ? Util.calcIndex(n) : atrIndex;
                if (atrIndex == objectIndex && charOffset >= atrOffsetStart &&
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
     * @returns {*}
     */
    renderWithPath(startPath, endPath) {
        var startContainer = this._deserializePath(startPath);
        var endContainer = this._deserializePath(endPath);
        if (startContainer && endContainer && startContainer.node && endContainer.node) {
            var range = document.createRange();
            range.setStart(startContainer.node, startContainer.offset);
            range.setEnd(endContainer.node, endContainer.offset);
            this.renderWithRange(range);
            return range;
        }
        throw 'Could not find start- and/or end-container in document';
    }


    /**
     * Prepares a selection with a range object
     * @param {Range} range
     * @returns {*}
     */
    renderWithRange(range) {
        return this._renderWithElements(range.startContainer, range.endContainer,
            range.commonAncestorContainer, range.startOffset, range.endOffset);
    }
}

