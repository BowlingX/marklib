(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define(factory);
	else if(typeof exports === 'object')
		exports["Marklib"] = factory();
	else
		root["Marklib"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = __webpack_require__(3)["default"];
	
	var Rendering = _interopRequire(__webpack_require__(1));
	
	var Util = _interopRequire(__webpack_require__(2));
	
	module.exports = {
	    Rendering: Rendering,
	    Util: Util
	};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/* global Node, Rendering, Document */
	"use strict";
	
	var _classCallCheck = __webpack_require__(4)["default"];
	
	var _createClass = __webpack_require__(5)["default"];
	
	var _interopRequire = __webpack_require__(3)["default"];
	
	var _utilUtil = __webpack_require__(2);
	
	var Util = _interopRequire(_utilUtil);
	
	var ATTR_DATA_ORIGINAL_INDEX = _utilUtil.ATTR_DATA_ORIGINAL_INDEX;
	var DATA_IS_SELECTION = _utilUtil.DATA_IS_SELECTION;
	
	/**
	 * @type {string}
	 */
	var TAG_NAME = "x-marker";
	/**
	 * @type {string}
	 */
	var ATTR_DATA_ORIGINAL_OFFSET_START = "data-original-offset-start";
	/**
	 * @type {string}
	 */
	var DATA_ORIGINAL_TEXT_NODE_INDEX = "original-text-node-index";
	/**
	 * @type {string}
	 */
	var ATTR_DATA_START_END = "data-is-start-end";
	/**
	 * @type {string}
	 */
	var ATTR_DATA_IS_HIGHLIGHT_NODE = "data-is-highlight-node";
	/**
	 * @type {string}
	 */
	var ATTR_DATA_ID = "data-selection-id";
	
	var Rendering = (function () {
	    function Rendering(document, cssClass, context) {
	        _classCallCheck(this, Rendering);
	
	        if (!(document instanceof Document)) {
	            throw "Marklib {0} is required to be a document instance";
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
	        this.cssClass = undefined === cssClass ? "marking" : cssClass;
	
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
	        this.markerPrefix = "marker-start-";
	
	        /**
	         * Suffix before ID
	         * @type {string}
	         */
	        this.markerSuffix = "marker-end-";
	
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
	
	    _createClass(Rendering, {
	        getId: {
	
	            /**
	             * @returns {string} id of this rendering
	             */
	
	            value: function getId() {
	                return this.id;
	            }
	        },
	        setId: {
	
	            /**
	             * @param {string} id
	             * @returns {Rendering}
	             */
	
	            value: function setId(id) {
	                this.id = id;
	                return this;
	            }
	        },
	        onWrappedNode: {
	
	            /**
	             * Listener that is called when a node is wrapped on this instance
	             * @param {Function} f
	             * @returns {Rendering}
	             */
	
	            value: function onWrappedNode(f) {
	                this._onWrappedNodeFunc = f;
	                return this;
	            }
	        },
	        _callOnWrappedNode: {
	
	            /**
	             * @private
	             */
	
	            value: function _callOnWrappedNode() {
	                if ("function" === typeof this._onWrappedNodeFunc) {
	                    this._onWrappedNodeFunc.apply(this, arguments);
	                }
	            }
	        },
	        _createWrapTemplate: {
	
	            /**
	             * Creates a Template used as a wrapper
	             * @returns {Node}
	             * @private
	             */
	
	            value: function _createWrapTemplate() {
	                var el = this.document.createElement(TAG_NAME),
	                    vTrue = "true";
	                el.className = this.cssClass;
	                el.setAttribute(DATA_IS_SELECTION, vTrue);
	                el.setAttribute(ATTR_DATA_ID, this.getId());
	                el.setAttribute(ATTR_DATA_IS_HIGHLIGHT_NODE, vTrue);
	
	                return el;
	            }
	        },
	        _createStartEndWrapTemplate: {
	
	            /**
	             * Creates a Template to use as start and end marks
	             * @param {String} id
	             * @param {String} text
	             * @returns {Node}
	             * @private
	             */
	
	            value: function _createStartEndWrapTemplate(id, text) {
	                var el = this._createWrapTemplate(),
	                    vTrue = "true";
	                el.setAttribute(ATTR_DATA_START_END, vTrue);
	                el.id = id;
	                el.textContent = text;
	                return el;
	            }
	        },
	        _createStartOrEndContainer: {
	
	            /**
	             * Creates Start or End Container Element
	             * @param initialNode
	             * @param prefix
	             * @param text
	             * @param offset
	             * @param index
	             * @returns {Node}
	             */
	
	            value: function _createStartOrEndContainer(initialNode, prefix, text, offset, index) {
	                var wrapper = this._createStartEndWrapTemplate(prefix + this.getId(), text);
	                wrapper.setAttribute(ATTR_DATA_ORIGINAL_INDEX, Rendering._getIndexParentIfHas(initialNode, index));
	                wrapper.setAttribute(ATTR_DATA_ORIGINAL_OFFSET_START, offset);
	                wrapper.setAttribute(DATA_ORIGINAL_TEXT_NODE_INDEX, index);
	                wrapper.marklibInstance = this;
	                return wrapper;
	            }
	        },
	        _createWrap: {
	
	            /**
	             * Wraps given element
	             * @param {Node} el
	             * @param [optionalLength]
	             * @param [optionalIndex]
	             * @param [optionalIsSameNode]
	             * @returns {Node}
	             * @private
	             */
	
	            value: function _createWrap(el, optionalLength, optionalIndex, optionalIsSameNode) {
	                var originalIndex = optionalIndex >= 0 ? optionalIndex : Util.calcIndex(el);
	                var wrapper = this._createWrapTemplate();
	                wrapper.setAttribute(ATTR_DATA_ORIGINAL_INDEX, Rendering._getIndexParentIfHas(el, originalIndex));
	                var offsetLength = optionalLength >= 0 ? optionalLength : Rendering._getOffsetParentIfHas(el);
	                wrapper.setAttribute(ATTR_DATA_ORIGINAL_OFFSET_START, offsetLength);
	
	                // Save a reference to original text node in wrapper
	                wrapper.setAttribute(DATA_ORIGINAL_TEXT_NODE_INDEX, originalIndex);
	
	                // save this marker instance to given node
	                wrapper.marklibInstance = this;
	
	                if (optionalIsSameNode) {
	                    wrapper.setAttribute(ATTR_DATA_START_END, ATTR_DATA_START_END);
	                }
	                var wrap = Util.wrap(el, wrapper);
	                this._callOnWrappedNode(el, wrap);
	                return wrap;
	            }
	        },
	        _createSplitContainer: {
	
	            /**
	             * Create split container element
	             * @param originalElement {Node} original text node element that is created a wrapper for
	             * @param index
	             * @param offset
	             * @returns {*|jQuery|Node}
	             */
	
	            value: function _createSplitContainer(originalElement, index, offset) {
	                var wrapper = this.document.createElement(TAG_NAME),
	                    vTrue = "true";
	                wrapper.setAttribute(DATA_IS_SELECTION, vTrue);
	                wrapper.setAttribute(ATTR_DATA_ORIGINAL_INDEX, Rendering._getIndexParentIfHas(originalElement, index));
	                wrapper.setAttribute(ATTR_DATA_ORIGINAL_OFFSET_START, offset);
	                wrapper.setAttribute(DATA_ORIGINAL_TEXT_NODE_INDEX, index);
	                return wrapper;
	            }
	        },
	        _walkTextNodes: {
	
	            /**
	             * Extracts all TextNodes inside a container
	             * @param {Node} el
	             * @returns {Array.<Text>}
	             */
	
	            value: function _walkTextNodes(el, func) {
	                this.walkDom(el, function (node) {
	                    if (Node.TEXT_NODE === node.nodeType && !Util.nodeIsEmpty(node)) {
	                        func(node);
	                    }
	                    return true;
	                });
	            }
	        },
	        walk: {
	
	            /**
	             * Walks the tree
	             * @param start
	             * @param endContainer
	             * @param nextParent
	             */
	
	            value: function walk(start, endContainer, nextParent) {
	                var nextParentNode = start;
	                while (nextParentNode && nextParentNode !== nextParent.parentNode) {
	                    var currentParentNode = nextParentNode;
	                    nextParentNode = nextParentNode.parentNode;
	                    if (this.wrapSiblings(currentParentNode.nextSibling, endContainer)) {
	                        break;
	                    }
	                }
	            }
	        },
	        wrapSiblings: {
	
	            /**
	             * Will Wrap all textNode siblings of a container (start) inside a defined Element (like a span)
	             * If an Element node is found, it will wrap all children of this node inside a element as well.
	             * It will stop if endContainer is found as a node
	             *
	             * @param {Node} start
	             * @param {Node} endContainer
	             * @returns {boolean} (true if endContainer was found)
	             */
	
	            value: function wrapSiblings(start, endContainer) {
	                var _this = this;
	
	                var next = start;
	                var found = false;
	
	                // Capsule some logic
	                var wrap = (function (n) {
	                    if (n.parentNode.hasAttribute(ATTR_DATA_START_END) && n.parentNode.hasAttribute(ATTR_DATA_IS_HIGHLIGHT_NODE) && n.parentNode.getAttribute(ATTR_DATA_ID) == _this.getId()) {
	                        var thisNode = _this._createWrap(n).parentNode;
	                        thisNode.classList.remove(_this.cssClass);
	                        thisNode.removeAttribute(ATTR_DATA_IS_HIGHLIGHT_NODE);
	                    } else {
	                        _this._createWrap(n);
	                    }
	                }).bind(this);
	
	                var wrapIf = function (n) {
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
	                            this.walkDom(currentNext, function (e) {
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
	                            this._walkTextNodes(currentNext, function (el) {
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
	        },
	        walkDom: {
	
	            /**
	             * Recursively walks the dom tree unless func returns false
	             * This is a lot more efficient then using any jQuery operations
	             *
	             * Applies node to function
	             * @param node
	             * @param func
	             * @returns {*}
	             */
	
	            value: function walkDom(node, func) {
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
	        },
	        _markTextSameNode: {
	
	            /**
	             * Marks text of the same node
	             * @param {Node} textNode
	             * @param {int} startIndex
	             * @param {int} endIndex
	             * @private
	             */
	
	            value: function _markTextSameNode(textNode, startIndex, endIndex) {
	                var initialText = textNode.nodeValue;
	                var initialIndex = Util.calcIndex(textNode);
	                if (!initialText) {
	                    return false;
	                }
	                //If there is an unmarked part in the beginning of the text node,
	                //cut off that part and put it into it's own textnode.
	                if (startIndex > 0) {
	                    var textBefore = initialText.slice(0, startIndex);
	                    textNode.parentNode.insertBefore(global.document.createTextNode(textBefore), textNode);
	                    // wrap cutted text node:
	                    Util.wrap(textNode.previousSibling, this._createSplitContainer(textNode, initialIndex, Rendering._getOffsetParentIfHas(textNode)));
	                }
	                //If there is an unmarked part at the end of the text node,
	                //cut off that part and put it into it's own textnode.
	                if (endIndex < initialText.length) {
	                    var textAfter = initialText.slice(endIndex, initialText.length);
	                    textNode.parentNode.insertBefore(global.document.createTextNode(textAfter), textNode.nextSibling);
	                    Util.wrap(textNode.nextSibling, this._createSplitContainer(textNode, initialIndex, Rendering._getOffsetParentIfHas(textNode) + endIndex));
	                }
	
	                //Cutoff the unmarked parts and wrap the textnode into a span.
	                textNode.nodeValue = initialText.slice(startIndex, endIndex);
	                this.startContainer = this._createWrap(textNode, Rendering._getOffsetParentIfHas(textNode) + startIndex, initialIndex, true).parentNode;
	                this.endContainer = this.startContainer;
	                return this.startContainer;
	            }
	        },
	        _markTextDifferentNode: {
	
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
	
	            value: function _markTextDifferentNode(startContainer, endContainer, startOffset, endOffset) {
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
	
	                    var offsetStart = Rendering._getOffsetParentIfHas(startContainer);
	                    // Create a new node for splitted text, offset is the length of new startContainer.nodeValue:
	                    startT = this._createStartOrEndContainer(startContainer, this.markerPrefix, partTextStartValue, offsetStart === startOffset ? offsetStart : offsetStart + startOffset, startContainerIndex);
	                    // Append this node after startContainer
	                    startContainer.parentNode.insertBefore(startT, startContainer.nextSibling);
	                    this.startContainer = startT;
	
	                    if (startContainer.nodeValue) {
	                        // Wrap start container in detection node, offset is always 0 or parent offset.
	                        Util.wrap(startContainer, this._createSplitContainer(startContainer, startContainerIndex, Rendering._getOffsetParentIfHas(startContainer)));
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
	                    endT = this._createStartOrEndContainer(endContainer, this.markerSuffix, partTextEndValue, Rendering._getOffsetParentIfHas(endContainer), endContainerIndex);
	
	                    endContainer.parentNode.insertBefore(endT, endContainer);
	                    this.endContainer = endT;
	                    var offsetParent = Rendering._getOffsetParentIfHas(endContainer);
	                    Util.wrap(endContainer, this._createSplitContainer(endContainer, endContainerIndex, offsetParent === endOffset ? offsetParent : offsetParent + endOffset));
	                }
	
	                return { startT: startT, endT: endT };
	            }
	        },
	        _findOriginalOffset: {
	
	            /**
	             * Will return the original first offset
	             * @param element
	             * @returns {int}
	             * @private
	             */
	
	            value: function _findOriginalOffset(element) {
	                if (!element.parentNode.hasAttribute(ATTR_DATA_ORIGINAL_OFFSET_START)) {
	                    return 0;
	                }
	                var lengthElement = Util.parent(element, "[" + ATTR_DATA_ORIGINAL_OFFSET_START + "]");
	                return lengthElement ? parseInt(lengthElement.getAttribute(ATTR_DATA_ORIGINAL_OFFSET_START)) : 0;
	            }
	        },
	        _renderWithElements: {
	
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
	
	            value: function _renderWithElements(startContainer, endContainer, commonAncestor, startOffset, endOffset) {
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
	                    var endContainerContents = Util.closest(startContainer, ":not([" + DATA_IS_SELECTION + "])").childNodes;
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
	                                        endOffset = parseInt(f.parentNode.getAttribute(ATTR_DATA_ORIGINAL_OFFSET_START)) + endOffset;
	                                    }
	                                }
	                                f = f.lastChild;
	                            }
	                        }
	                    }
	                    // still no textNode?
	                    if (endContainer.nodeType !== Node.TEXT_NODE) {
	                        throw "Could not found endContainer, highlighting would be unstable";
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
	        },
	        _renderSelection: {
	
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
	
	            value: function _renderSelection(startContainer, endContainer, startOffset, endOffset, contextContainer, outer) {
	
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
	        },
	        _deserializePath: {
	
	            /**
	             * Deserializes a specific path and finds the right textnodes
	             * This even works when DOM has been manipulated before by `marklib`
	             * @param {string} path the serialized path (including offsets)
	             * @return {Node}
	             * @private
	             */
	
	            value: function _deserializePath(path) {
	                var pSplit = path.split(";"),
	                    p = pSplit[0],
	                    objectIndex = parseInt(pSplit[1]),
	                    charOffset = parseInt(pSplit[2]),
	                    container = this.context.querySelector(p),
	                    maybeFoundNode = null;
	                this.walkDom(container, function (n) {
	                    if (n.nodeType === Node.TEXT_NODE) {
	                        var atrOffsetStart = n.parentNode.getAttribute(ATTR_DATA_ORIGINAL_OFFSET_START);
	                        atrOffsetStart = null === atrOffsetStart ? 0 : atrOffsetStart;
	                        var atrIndex = n.parentNode.getAttribute(ATTR_DATA_ORIGINAL_INDEX);
	                        atrIndex = null === atrIndex ? Util.calcIndex(n) : atrIndex;
	                        if (atrIndex == objectIndex && charOffset >= atrOffsetStart && parseInt(atrOffsetStart) + n.length >= charOffset) {
	                            var thisOffset = n.parentNode.hasAttribute(ATTR_DATA_ORIGINAL_OFFSET_START) ? charOffset - parseInt(n.parentNode.getAttribute(ATTR_DATA_ORIGINAL_OFFSET_START)) : charOffset;
	                            maybeFoundNode = { node: n, offset: thisOffset };
	                            return false;
	                        }
	                    } else {
	                        return true;
	                    }
	                    return true;
	                });
	
	                return maybeFoundNode;
	            }
	        },
	        renderWithPath: {
	
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
	
	            value: function renderWithPath(startPath, endPath) {
	                var startContainer = this._deserializePath(startPath);
	                var endContainer = this._deserializePath(endPath);
	                if (startContainer && endContainer && startContainer.node && endContainer.node) {
	                    var range = document.createRange();
	                    range.setStart(startContainer.node, startContainer.offset);
	                    range.setEnd(endContainer.node, endContainer.offset);
	                    this.renderWithRange(range);
	                    return range;
	                }
	                throw "Could not find start- and/or end-container in document";
	            }
	        },
	        renderWithRange: {
	
	            /**
	             * Prepares a selection with a range object
	             * @param {Range} range
	             * @returns {*}
	             */
	
	            value: function renderWithRange(range) {
	                return this._renderWithElements(range.startContainer, range.endContainer, range.commonAncestorContainer, range.startOffset, range.endOffset);
	            }
	        }
	    }, {
	        _getIndexParentIfHas: {
	
	            /**
	             * @param {Node} container
	             * @param {Number} thisIndex
	             * @returns {int} index of parent or original
	             * @private
	             */
	
	            value: function _getIndexParentIfHas(container, thisIndex) {
	                var p = container.parentNode;
	                var index = parseInt(p.getAttribute(ATTR_DATA_ORIGINAL_INDEX));
	                return index > thisIndex ? index : thisIndex;
	            }
	        },
	        _getOffsetParentIfHas: {
	
	            /**
	             * @param container
	             * @returns {int} offset start of parent if has, else 0
	             */
	
	            value: function _getOffsetParentIfHas(container) {
	                var p = container.parentNode;
	                var offset = parseInt(p.getAttribute(ATTR_DATA_ORIGINAL_OFFSET_START));
	                return offset > 0 ? offset : 0;
	            }
	        }
	    });
	
	    return Rendering;
	})();
	
	module.exports = Rendering;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _classCallCheck = __webpack_require__(4)["default"];
	
	var _createClass = __webpack_require__(5)["default"];
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/* global Node, NodeList */
	
	/**
	 * @type {string}
	 */
	var ATTR_DATA_ORIGINAL_INDEX = "data-original-index";
	exports.ATTR_DATA_ORIGINAL_INDEX = ATTR_DATA_ORIGINAL_INDEX;
	/**
	 * @type {string}
	 */
	var DATA_PSEUDO = "data-is-pseudo";
	exports.DATA_PSEUDO = DATA_PSEUDO;
	/**
	 * @type {string}
	 */
	var DATA_IS_SELECTION = "data-is-selection";
	exports.DATA_IS_SELECTION = DATA_IS_SELECTION;
	/**
	 * @type {string}
	 */
	var SERIALIZE_SEPARATOR = ";";
	
	/**
	 * Utility class
	 * Contains DOM/Node manipulation helpers
	 */
	
	var Util = (function () {
	    function Util() {
	        _classCallCheck(this, Util);
	    }
	
	    _createClass(Util, null, {
	        nodeListFilter: {
	            /**
	             * Filter for a NodeList
	             * @param {NodeList} nodes
	             * @param {Function} func
	             * @returns {Array.<HTMLElement>}
	             */
	
	            value: function nodeListFilter(nodes, func) {
	                return Array.prototype.filter.call(nodes || [], func);
	            }
	        },
	        guid: {
	
	            /**
	             * Generates a unique id
	             * @return {String}
	             */
	
	            value: function guid() {
	                function s4() {
	                    return Math.floor((1 + Math.random()) * 65536).toString(16).substring(1);
	                }
	
	                return s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4();
	            }
	        },
	        nodeIsEmpty: {
	
	            /**
	             * Checks if a given node is empty
	             * @param {HTMLElement} node
	             * @returns {*}
	             */
	
	            value: function nodeIsEmpty(node) {
	                return node.nodeValue.match(/^[\s]*$/g);
	            }
	        },
	        index: {
	
	            /**
	             * @param {HTMLElement} node
	             * @param [optionalList]
	             * @return {int} the index of this node in context to it's siblings
	             */
	
	            value: function index(node, optionalList) {
	                var children = optionalList || (node.nodeType === Node.TEXT_NODE ? node.parentNode.childNodes : node.parentNode.children);
	                return Array.prototype.indexOf.call(children || [], node);
	            }
	        },
	        wrap: {
	
	            /**
	             * Wraps given `elms` in given `wrapper`
	             *
	             * @param {HTMLElement} wrapper
	             * @param {HTMLElement|Array.<HTMLElement>} elms
	             * @return {HTMLElement}
	             */
	
	            value: function wrap(elms, wrapper) {
	                if (!elms) {
	                    return wrapper;
	                } // Convert `elms` to an array, if necessary.
	                if (!(elms instanceof NodeList || elms instanceof Array)) elms = [elms];
	                for (var i = elms.length - 1; i >= 0; i--) {
	                    var child = i > 0 ? wrapper.cloneNode(true) : wrapper;
	                    var el = elms[i];
	                    // Cache the current parent and sibling.
	                    var parent = el.parentNode,
	                        sibling = el.nextSibling;
	
	                    child.appendChild(el);
	                    if (sibling) {
	                        parent.insertBefore(child, sibling);
	                    } else {
	                        parent.appendChild(child);
	                    }
	                }
	                return wrapper;
	            }
	        },
	        calcIndex: {
	
	            /**
	             * Will calculate an index depending on an already modified dom by marklib
	             * @param {HTMLElement} node
	             * @returns {int|boolean}
	             */
	
	            value: function calcIndex(node) {
	                var calculatedIndex = 0;
	                var foundWrapper = false;
	                var nodes = node.childNodes,
	                    length = nodes.length;
	                for (var thisIndex = 0; thisIndex < length; thisIndex++) {
	                    var el = nodes[thisIndex];
	                    if (el === node) {
	                        return false;
	                    }
	                    var maybeIndexOfOriginal = el.getAttribute(ATTR_DATA_ORIGINAL_INDEX);
	                    var isOriginal = maybeIndexOfOriginal !== undefined;
	                    // Important: do not include pseudo elements
	                    if (el !== node && (el.nodeType !== Node.TEXT_NODE || isOriginal) && !el.hasAttribute(DATA_PSEUDO)) {
	                        if (isOriginal) {
	                            calculatedIndex = parseInt(maybeIndexOfOriginal);
	                            foundWrapper = true;
	                        } else {
	                            calculatedIndex++;
	                        }
	                    }
	                }
	                return foundWrapper ? calculatedIndex : Util.index(node);
	            }
	        },
	        parents: {
	
	            /**
	             * @param {HTMLElement} el
	             * @param {String} [optionalSelector] will test given element against a selector
	             *  if matches, returns this element immediately
	             * @return {Array.<HTMLElement>} an array of all found parents of given element (and optional selector)
	             */
	
	            value: function parents(el, optionalSelector) {
	                var element = el;
	                var foundElements = [];
	                while (element.parentNode !== null) {
	                    element = element.parentNode;
	                    if (optionalSelector && (element === optionalSelector || typeof optionalSelector === "string" && element.matches && element.matches(optionalSelector))) {
	                        foundElements.push(element);
	                    } else if (!optionalSelector) {
	                        foundElements.push(element);
	                    }
	                }
	                return foundElements;
	            }
	        },
	        parent: {
	
	            /**
	             * Finds a parent node (the closest) with a given selector
	             * @param {Node} el
	             * @param {String} selector
	             * @returns {*}
	             */
	
	            value: function parent(el, selector) {
	                var element = el;
	                while (element.parentNode !== null) {
	                    element = element.parentNode;
	                    if (element.matches && element.matches(selector)) {
	                        return element;
	                    }
	                }
	                return false;
	            }
	        },
	        closest: {
	            value: function closest(el, selector) {
	                var element = el;
	                while (element !== null) {
	                    if (element.matches && element.matches(selector)) {
	                        return element;
	                    }
	                    element = element.parentNode;
	                }
	                return false;
	            }
	        },
	        getPath: {
	
	            /**
	             * Determines the correct paths and excludes all `marklib` generated content
	             * TODO: To improve performance we could shorten the path if an ID is present in it.
	             * @param {HTMLElement} el
	             * @param {HTMLElement} [context] if given extraction path is relative to this element
	             * @returns {*}
	             */
	
	            value: function getPath(el, context) {
	                var path = null,
	                    node = el;
	
	                while (node) {
	                    var name = null;
	                    // If node is a text-node, save index
	                    if (Node.TEXT_NODE === node.nodeType) {
	
	                        /* Because nodes may wrapped inside a highlighting node, we need to find the original index that was
	                         * valid before the dom changes. We store the last known index position inside all wrapper elements
	                         * We select the outermost
	                         */
	
	                        // Extract original index of this node:
	                        // Outer most data-original-index is original index
	                        var outerMostElement = Util.parents(node, "[" + ATTR_DATA_ORIGINAL_INDEX + "]").reverse()[0];
	                        // if element is not yet wrapped in span, recalculate index based on parent container:
	                        // We have to do this because text node indexes != element indexes...
	                        var calculatedIndex = 0;
	                        if (!outerMostElement) {
	                            calculatedIndex = Util.calcIndex(node);
	                        }
	                        var index = outerMostElement ? parseInt(outerMostElement.getAttribute(ATTR_DATA_ORIGINAL_INDEX)) : calculatedIndex;
	                        name = SERIALIZE_SEPARATOR + index;
	                    } else {
	                        name = node.nodeName;
	                    }
	
	                    if (!name) break;
	
	                    name = name.toLowerCase();
	
	                    var parent = node.parentNode;
	                    if (node instanceof HTMLElement && node.hasAttribute(DATA_IS_SELECTION)) {
	                        node = parent;
	                        continue;
	                    }
	                    // Select only siblings that are not part of selection and are of the same type
	                    // (because we use nth-of-type selector later)
	                    var siblings = Util.nodeListFilter(parent.children, function (el) {
	                        return !el.hasAttribute(DATA_IS_SELECTION) && el.nodeName === node.nodeName;
	                    }),
	                        nodeIndex = Util.index(node, siblings);
	
	                    if (siblings.length > 1 && nodeIndex >= 0) {
	                        name += ":nth-of-type(" + (nodeIndex + 1) + ")";
	                    }
	
	                    path = name + (path ? ">" + path : "");
	
	                    if (parent === context) {
	                        break;
	                    }
	
	                    node = parent;
	                }
	
	                return path.replace("#document>", "").replace(">;", ";");
	            }
	        }
	    });
	
	    return Util;
	})();
	
	exports["default"] = Util;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports["default"] = function (obj) {
	  return obj && obj.__esModule ? obj["default"] : obj;
	};
	
	exports.__esModule = true;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports["default"] = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};
	
	exports.__esModule = true;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports["default"] = (function () {
	  function defineProperties(target, props) {
	    for (var key in props) {
	      var prop = props[key];
	      prop.configurable = true;
	      if (prop.value) prop.writable = true;
	    }
	
	    Object.defineProperties(target, props);
	  }
	
	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	})();
	
	exports.__esModule = true;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=marklib.map