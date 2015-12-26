(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
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
/******/ 	__webpack_require__.p = "../";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(93);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.RenderingEvents = exports.RenderResult = exports.Util = exports.Rendering = undefined;
	
	var _Rendering = __webpack_require__(2);
	
	var _Rendering2 = _interopRequireDefault(_Rendering);
	
	var _Util = __webpack_require__(92);
	
	var _Util2 = _interopRequireDefault(_Util);
	
	var _RenderResult = __webpack_require__(52);
	
	var _RenderResult2 = _interopRequireDefault(_RenderResult);
	
	var _RenderingEvents = __webpack_require__(53);
	
	var _RenderingEvents2 = _interopRequireDefault(_RenderingEvents);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.Rendering = _Rendering2.default;
	exports.Util = _Util2.default;
	exports.RenderResult = _RenderResult2.default;
	exports.RenderingEvents = _RenderingEvents2.default;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.EVENT_WRAPPED_NODE = exports.ATTR_DATA_ORIGINAL_OFFSET_START = undefined;
	
	var _getPrototypeOf = __webpack_require__(3);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(15);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(16);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(20);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(45);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _RenderResult = __webpack_require__(52);
	
	var _RenderResult2 = _interopRequireDefault(_RenderResult);
	
	var _RenderingEvents2 = __webpack_require__(53);
	
	var _RenderingEvents3 = _interopRequireDefault(_RenderingEvents2);
	
	var _Util = __webpack_require__(92);
	
	var _Util2 = _interopRequireDefault(_Util);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * @type {string}
	 */
	var TAG_NAME = 'x-marker';
	/**
	 * @type {string}
	 */
	/* global Node */
	
	var ATTR_DATA_ORIGINAL_OFFSET_START = exports.ATTR_DATA_ORIGINAL_OFFSET_START = 'data-original-offset-start';
	/**
	 * @type {string}
	 */
	var DATA_ORIGINAL_TEXT_NODE_INDEX = 'original-text-node-index';
	/**
	 * @type {string}
	 */
	var ATTR_DATA_START_END = 'data-is-start-end';
	/**
	 * @type {string}
	 */
	var ATTR_DATA_IS_HIGHLIGHT_NODE = 'data-is-highlight-node';
	/**
	 * @type {string}
	 */
	var ATTR_DATA_ID = 'data-selection-id';
	
	/**
	 * @see https://developer.mozilla.org/de/docs/Web/API/Node/compareDocumentPosition
	 * @type {number}
	 */
	var DOCUMENT_POSITION_CONTAINED_BY = 16;
	
	/**
	 * @type {string}
	 */
	var EVENT_WRAPPED_NODE = exports.EVENT_WRAPPED_NODE = 'wrapped-node';
	
	/**
	 * Manages a single Render
	 */
	
	var Rendering = (function (_RenderingEvents) {
	    (0, _inherits3.default)(Rendering, _RenderingEvents);
	
	    /**
	     * @param {Document} document
	     * @param {object} options
	     * @param {Node} context
	     */
	
	    function Rendering(document, options, context) {
	        (0, _classCallCheck3.default)(this, Rendering);
	
	        /**
	         * ID of rendering, will be set on each element that is part of it
	         * @type {String}
	         */
	
	        var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Rendering).call(this, options, document));
	
	        _this.id = _Util2.default.guid();
	
	        /**
	         * StartContainer
	         * @type {Node}
	         */
	        _this.startContainer = null;
	
	        /**
	         * EndContainer
	         * @type {Node}
	         */
	        _this.endContainer = null;
	
	        /**
	         * @type {Node}
	         */
	        _this.context = context || _this.document;
	
	        /**
	         * Flag if this instance has been rendered
	         * @type {RenderResult}
	         * @private
	         */
	        _this._renderResult = null;
	        return _this;
	    }
	
	    /**
	     * @returns {string} id of this rendering
	     */
	
	    (0, _createClass3.default)(Rendering, [{
	        key: 'getId',
	        value: function getId() {
	            return this.id;
	        }
	
	        /**
	         * @param {string} id
	         * @returns {Rendering}
	         */
	
	    }, {
	        key: 'setId',
	        value: function setId(id) {
	            var _this2 = this;
	
	            this.id = id;
	
	            if (this._renderResult) {
	                this.wrapperNodes.forEach(function (node) {
	                    return node.setAttribute(ATTR_DATA_ID, _this2.id);
	                });
	            }
	
	            return this;
	        }
	
	        /**
	         * Creates a Template used as a wrapper and an indication that this is a highlight node
	         * @param {Boolean} [omitHighlight]
	         * @returns {Node}
	         * @private
	         */
	
	    }, {
	        key: '_createWrapTemplate',
	        value: function _createWrapTemplate(omitHighlight) {
	            var el = this.document.createElement(TAG_NAME);
	            var vTrue = "true";
	
	            if (!omitHighlight) {
	                el.className = this.options.className.join(' ');
	                // save this marker instance to given node
	                Rendering.setMarklibInstance(el, this);
	                // keep track of highlight nodes
	                this.wrapperNodes.push(el);
	                el.setAttribute(ATTR_DATA_IS_HIGHLIGHT_NODE, vTrue);
	                el.setAttribute(ATTR_DATA_ID, this.getId());
	            }
	            el.setAttribute(_Util.DATA_IS_SELECTION, vTrue);
	
	            return el;
	        }
	
	        /**
	         * Creates a Template to use as start and end marks
	         * @param {String} text
	         * @returns {Node}
	         * @private
	         */
	
	    }, {
	        key: '_createStartEndWrapTemplate',
	        value: function _createStartEndWrapTemplate(text) {
	            var el = this._createWrapTemplate();
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
	
	    }, {
	        key: '_createStartOrEndContainer',
	        value: function _createStartOrEndContainer(initialNode, text, offset, index) {
	            var wrapper = this._createStartEndWrapTemplate(text);
	            wrapper.setAttribute(_Util.ATTR_DATA_ORIGINAL_INDEX, _Util2.default.getIndexParentIfHas(initialNode, index));
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
	
	    }, {
	        key: '_createWrap',
	        value: function _createWrap(el, optionalLength, optionalIndex, optionalIsSameNode, omitHighlight) {
	            var originalIndex = optionalIndex >= 0 ? optionalIndex : _Util2.default.calcIndex(el);
	            var wrapper = this._createWrapTemplate(omitHighlight);
	            wrapper.setAttribute(_Util.ATTR_DATA_ORIGINAL_INDEX, _Util2.default.getIndexParentIfHas(el, originalIndex));
	            var offsetLength = optionalLength >= 0 ? optionalLength : _Util2.default.getOffsetParentIfHas(el);
	            wrapper.setAttribute(ATTR_DATA_ORIGINAL_OFFSET_START, offsetLength);
	
	            // Save a reference to original text node in wrapper
	            wrapper.setAttribute(DATA_ORIGINAL_TEXT_NODE_INDEX, originalIndex);
	
	            if (optionalIsSameNode) {
	                wrapper.setAttribute(ATTR_DATA_START_END, ATTR_DATA_START_END);
	            }
	            var wrap = _Util2.default.wrap(el, wrapper);
	
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
	
	    }, {
	        key: '_createSplitContainer',
	        value: function _createSplitContainer(originalElement, index, offset) {
	            var wrapper = this.document.createElement(TAG_NAME);
	            wrapper.setAttribute(_Util.DATA_IS_SELECTION, 'true');
	            wrapper.setAttribute(_Util.ATTR_DATA_ORIGINAL_INDEX, _Util2.default.getIndexParentIfHas(originalElement, index));
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
	
	    }, {
	        key: 'walk',
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
	
	        /**
	         * Will Wrap all textNode siblings of a container (start) inside a defined Element (like a span)
	         * If an Element node is found, it will wrap all children of this node inside a element as well.
	         * It will stop if endContainer is found as a node
	         *
	         * @param {Node} start
	         * @param {Node} endContainer
	         * @returns {boolean} (true if endContainer was found)
	         */
	
	    }, {
	        key: 'wrapSiblings',
	        value: function wrapSiblings(start, endContainer) {
	            var _this3 = this;
	
	            var next = start;
	            var found = false;
	
	            // Capsule some logic
	            var wrap = function wrap(n) {
	                var instance = Rendering.getMarklibInstance(n.parentNode);
	                if (n.parentNode.hasAttribute(ATTR_DATA_START_END) && n.parentNode.hasAttribute(ATTR_DATA_IS_HIGHLIGHT_NODE) && instance === _this3) {
	                    _this3._createWrap(n, undefined, undefined, undefined, true);
	                } else {
	                    _this3._createWrap(n);
	                }
	            };
	
	            // helper functions
	
	            var wrapIf = function wrapIf(n) {
	                if (!_Util2.default.nodeIsEmpty(n)) {
	                    wrap(n);
	                }
	            };
	
	            var walkIfContained = function walkIfContained(e) {
	                if (e === endContainer) {
	                    return false;
	                }
	                if (Node.TEXT_NODE === e.nodeType) {
	                    wrapIf(e);
	                }
	                return true;
	            };
	
	            var walkIfNotContained = function walkIfNotContained(el) {
	                wrapIf(el);
	            };
	
	            while (next !== null && next !== endContainer) {
	                var currentNext = next;
	                next = next.nextSibling;
	                // Found a text node, directly wrap inside a span
	                if (Node.TEXT_NODE === currentNext.nodeType) {
	                    wrapIf(currentNext);
	                } else {
	                    if (currentNext.compareDocumentPosition(endContainer) & DOCUMENT_POSITION_CONTAINED_BY) {
	                        _Util2.default.walkDom(currentNext, walkIfContained);
	                        found = true;
	                    } else {
	                        _Util2.default.walkTextNodes(currentNext, walkIfNotContained);
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
	
	    }, {
	        key: '_markTextSameNode',
	        value: function _markTextSameNode(textNode, startIndex, endIndex) {
	            var initialText = textNode.nodeValue;
	            var initialIndex = _Util2.default.calcIndex(textNode);
	
	            if (!initialText) {
	                return false;
	            }
	            // If there is an unmarked part in the beginning of the text node,
	            // cut off that part and put it into it's own textnode.
	            if (startIndex > 0) {
	                var textBefore = initialText.slice(0, startIndex);
	                textNode.parentNode.insertBefore(this.document.createTextNode(textBefore), textNode);
	                // wrap cutted text node:
	                _Util2.default.wrap(textNode.previousSibling, this._createSplitContainer(textNode, initialIndex, _Util2.default.getOffsetParentIfHas(textNode)));
	            }
	            // If there is an unmarked part at the end of the text node,
	            // cut off that part and put it into it's own textnode.
	            if (endIndex < initialText.length) {
	                var textAfter = initialText.slice(endIndex, initialText.length);
	                textNode.parentNode.insertBefore(this.document.createTextNode(textAfter), textNode.nextSibling);
	                _Util2.default.wrap(textNode.nextSibling, this._createSplitContainer(textNode, initialIndex, _Util2.default.getOffsetParentIfHas(textNode) + endIndex));
	            }
	
	            // Cutoff the unmarked parts and wrap the textnode into a span.
	            textNode.nodeValue = initialText.slice(startIndex, endIndex);
	            this.startContainer = this._createWrap(textNode, _Util2.default.getOffsetParentIfHas(textNode) + startIndex, initialIndex, true).parentNode;
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
	
	    }, {
	        key: '_markTextDifferentNode',
	        value: function _markTextDifferentNode(startContainer, endContainer, startOffset, endOffset) {
	            // Get current for both start and end:
	            var startContainerIndex = _Util2.default.calcIndex(startContainer);
	            var endContainerIndex = _Util2.default.calcIndex(endContainer);
	
	            // Split text
	            var fullTextStartValue = startContainer.nodeValue;
	            // init with startContainer because we may have not a text node here
	            var startT = startContainer;
	
	            if (undefined !== fullTextStartValue) {
	                var partTextStartValue = fullTextStartValue.slice(startOffset, fullTextStartValue.length);
	                // Set new text to start node
	                startContainer.nodeValue = fullTextStartValue.slice(0, startOffset);
	
	                var offsetStart = _Util2.default.getOffsetParentIfHas(startContainer);
	                // Create a new node for splitted text, offset is the length of new startContainer.nodeValue:
	                startT = this._createStartOrEndContainer(startContainer, partTextStartValue, offsetStart === startOffset ? offsetStart : offsetStart + startOffset, startContainerIndex);
	                // Append this node after startContainer
	                startContainer.parentNode.insertBefore(startT, startContainer.nextSibling);
	                this.startContainer = startT;
	
	                if (startContainer.nodeValue) {
	                    // Wrap start container in detection node, offset is always 0 or parent offset.
	                    _Util2.default.wrap(startContainer, this._createSplitContainer(startContainer, startContainerIndex, _Util2.default.getOffsetParentIfHas(startContainer)));
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
	                endT = this._createStartOrEndContainer(endContainer, partTextEndValue, _Util2.default.getOffsetParentIfHas(endContainer), endContainerIndex);
	
	                endContainer.parentNode.insertBefore(endT, endContainer);
	                this.endContainer = endT;
	                var offsetParent = _Util2.default.getOffsetParentIfHas(endContainer);
	                _Util2.default.wrap(endContainer, this._createSplitContainer(endContainer, endContainerIndex, offsetParent === endOffset ? offsetParent : offsetParent + endOffset));
	            }
	
	            return {
	                startT: startT,
	                endT: endT
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
	
	    }, {
	        key: '_renderWithElements',
	        value: function _renderWithElements(startContainerP, endContainerP, commonAncestor, startOffset, endOffsetP) {
	            if (this._renderResult) {
	                return this._renderResult;
	            }
	            var startContainer = startContainerP;
	            var endContainer = endContainerP;
	            var endOffset = endOffsetP;
	            var outer = _Util2.default.parents(startContainer, commonAncestor);
	            outer = outer[outer.length - 1];
	            var contextContainer = outer ? outer : commonAncestor;
	
	            // Same Element, means the selection is fully contained in a discrete area, start and endpoint have the same parent
	            // but are different nodes:
	
	            // Start and End offset have to be recalculated because dom might be already changed by highlighting in given node
	            // 1: First detect real start offset in startContainer:
	
	            // That works by selecting the highest wrapper and get original-offset-start data element, see "findOriginalOffset"
	            // So first select that container:
	            var originalStartOffset = _Util2.default.findOriginalOffset(startContainer);
	            var originalEndOffset = _Util2.default.findOriginalOffset(endContainer);
	
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
	                _Util2.default.walkDom(startContainer, function (el) {
	                    if (el.nodeType === Node.TEXT_NODE) {
	                        startContainer = el;
	                        return false;
	                    }
	                    return true;
	                });
	            }
	
	            if (endContainer.nodeType !== Node.TEXT_NODE) {
	                var toFindNode = startContainer;
	
	                if (endOffset === 0) {
	                    toFindNode = endContainer.previousElementSibling || startContainer;
	                }
	
	                // Get the last text node:
	                var endContainerContents = _Util2.default.closest(toFindNode, ':not([' + _Util.DATA_IS_SELECTION + '])').childNodes;
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
	                                    endOffset = parseInt(f.parentNode.getAttribute(ATTR_DATA_ORIGINAL_OFFSET_START), 10) + endOffset;
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
	
	            this._renderResult = new _RenderResult2.default(
	            // Real offset is calculated by relative length and absolute length
	            originalStartOffset + startOffset, originalEndOffset + endOffset,
	            // get the path for this selection
	            _Util2.default.getPath(startContainer, this.context), _Util2.default.getPath(endContainer, this.context));
	
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
	
	    }, {
	        key: '_renderSelection',
	        value: function _renderSelection(startContainer, endContainer, startOffset, endOffset, contextContainer, outer) {
	            // if start and end-container are the same, mark text on the same node
	            if (startContainer === endContainer) {
	                this._markTextSameNode(startContainer, startOffset, endOffset);
	            } else {
	                var result = this._markTextDifferentNode(startContainer, endContainer, startOffset, endOffset);
	                var index = this.wrapperNodes.indexOf(result.endT);
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
	
	    }, {
	        key: 'renderWithPath',
	        value: function renderWithPath(startPath, endPath) {
	            var startContainer = _Util2.default.deserializePath(startPath, this.context);
	            var endContainer = _Util2.default.deserializePath(endPath, this.context);
	            if (startContainer && endContainer && startContainer.node && endContainer.node) {
	                var range = document.createRange();
	                range.setStart(startContainer.node, startContainer.offset);
	                range.setEnd(endContainer.node, endContainer.offset);
	                var text = range.toString();
	                var result = this.renderWithRange(range);
	                result.text = text;
	                return text;
	            }
	            throw new Error('Could not find start- and/or end-container in document');
	        }
	
	        /**
	         * @returns {RenderResult}
	         */
	
	    }, {
	        key: 'renderWithResult',
	
	        /**
	         * Renders a result (that returned from `renderWithRange`)
	         * @param {RenderResult|Object} result
	         * @returns {string}
	         */
	        value: function renderWithResult(result) {
	            return this.renderWithPath(result.startContainerPath + ';' + result.startOffset, result.endContainerPath + ';' + result.endOffset);
	        }
	
	        /**
	         * Prepares a selection with a range object
	         * @param {Range} range
	         * @returns {Object}
	         */
	
	    }, {
	        key: 'renderWithRange',
	        value: function renderWithRange(range) {
	            var text = range.toString();
	            var result = this._renderWithElements(range.startContainer, range.endContainer, range.commonAncestorContainer, range.startOffset, range.endOffset);
	            result.text = text;
	            return result;
	        }
	
	        /**
	         * Removes bindings and classNames to nodes
	         */
	
	    }, {
	        key: 'destroy',
	        value: function destroy() {
	            this.wrapperNodes.forEach(function (node) {
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
	
	    }, {
	        key: 'result',
	        get: function get() {
	            return this._renderResult;
	        }
	    }], [{
	        key: 'setMarklibInstance',
	        value: function setMarklibInstance(el, instance) {
	            el.marklibInstance = instance;
	            return el;
	        }
	
	        /**
	         * @param {Node} el
	         * @returns {Rendering|null|undefined}
	         */
	
	    }, {
	        key: 'getMarklibInstance',
	        value: function getMarklibInstance(el) {
	            return el ? el.marklibInstance : null;
	        }
	    }]);
	    return Rendering;
	})(_RenderingEvents3.default);
	
	exports.default = Rendering;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(4), __esModule: true };

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(5);
	module.exports = __webpack_require__(11).Object.getPrototypeOf;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 Object.getPrototypeOf(O)
	var toObject = __webpack_require__(6);
	
	__webpack_require__(8)('getPrototypeOf', function($getPrototypeOf){
	  return function getPrototypeOf(it){
	    return $getPrototypeOf(toObject(it));
	  };
	});

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(7);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 7 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(9)
	  , core    = __webpack_require__(11)
	  , fails   = __webpack_require__(14);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(10)
	  , core      = __webpack_require__(11)
	  , ctx       = __webpack_require__(12)
	  , PROTOTYPE = 'prototype';
	
	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && key in target;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(param){
	        return this instanceof C ? new C(param) : C(param);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    if(IS_PROTO)(exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
	  }
	};
	// type bitmap
	$export.F = 1;  // forced
	$export.G = 2;  // global
	$export.S = 4;  // static
	$export.P = 8;  // proto
	$export.B = 16; // bind
	$export.W = 32; // wrap
	module.exports = $export;

/***/ },
/* 10 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 11 */
/***/ function(module, exports) {

	var core = module.exports = {version: '1.2.6'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(13);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 15 */
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	
	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _defineProperty = __webpack_require__(17);
	
	var _defineProperty2 = _interopRequireDefault(_defineProperty);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = (function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
	    }
	  }
	
	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	})();

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(18), __esModule: true };

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(19);
	module.exports = function defineProperty(it, key, desc){
	  return $.setDesc(it, key, desc);
	};

/***/ },
/* 19 */
/***/ function(module, exports) {

	var $Object = Object;
	module.exports = {
	  create:     $Object.create,
	  getProto:   $Object.getPrototypeOf,
	  isEnum:     {}.propertyIsEnumerable,
	  getDesc:    $Object.getOwnPropertyDescriptor,
	  setDesc:    $Object.defineProperty,
	  setDescs:   $Object.defineProperties,
	  getKeys:    $Object.keys,
	  getNames:   $Object.getOwnPropertyNames,
	  getSymbols: $Object.getOwnPropertySymbols,
	  each:       [].forEach
	};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _typeof2 = __webpack_require__(21);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function (self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }
	
	  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _symbol = __webpack_require__(22);
	
	var _symbol2 = _interopRequireDefault(_symbol);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _typeof(obj) { return obj && typeof _Symbol !== "undefined" && obj.constructor === _Symbol ? "symbol" : typeof obj; }
	
	exports.default = function (obj) {
	  return obj && typeof _symbol2.default !== "undefined" && obj.constructor === _symbol2.default ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(23), __esModule: true };

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(24);
	__webpack_require__(44);
	module.exports = __webpack_require__(11).Symbol;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var $              = __webpack_require__(19)
	  , global         = __webpack_require__(10)
	  , has            = __webpack_require__(25)
	  , DESCRIPTORS    = __webpack_require__(26)
	  , $export        = __webpack_require__(9)
	  , redefine       = __webpack_require__(27)
	  , $fails         = __webpack_require__(14)
	  , shared         = __webpack_require__(30)
	  , setToStringTag = __webpack_require__(31)
	  , uid            = __webpack_require__(33)
	  , wks            = __webpack_require__(32)
	  , keyOf          = __webpack_require__(34)
	  , $names         = __webpack_require__(38)
	  , enumKeys       = __webpack_require__(39)
	  , isArray        = __webpack_require__(40)
	  , anObject       = __webpack_require__(41)
	  , toIObject      = __webpack_require__(35)
	  , createDesc     = __webpack_require__(29)
	  , getDesc        = $.getDesc
	  , setDesc        = $.setDesc
	  , _create        = $.create
	  , getNames       = $names.get
	  , $Symbol        = global.Symbol
	  , $JSON          = global.JSON
	  , _stringify     = $JSON && $JSON.stringify
	  , setter         = false
	  , HIDDEN         = wks('_hidden')
	  , isEnum         = $.isEnum
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols     = shared('symbols')
	  , useNative      = typeof $Symbol == 'function'
	  , ObjectProto    = Object.prototype;
	
	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function(){
	  return _create(setDesc({}, 'a', {
	    get: function(){ return setDesc(this, 'a', {value: 7}).a; }
	  })).a != 7;
	}) ? function(it, key, D){
	  var protoDesc = getDesc(ObjectProto, key);
	  if(protoDesc)delete ObjectProto[key];
	  setDesc(it, key, D);
	  if(protoDesc && it !== ObjectProto)setDesc(ObjectProto, key, protoDesc);
	} : setDesc;
	
	var wrap = function(tag){
	  var sym = AllSymbols[tag] = _create($Symbol.prototype);
	  sym._k = tag;
	  DESCRIPTORS && setter && setSymbolDesc(ObjectProto, tag, {
	    configurable: true,
	    set: function(value){
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    }
	  });
	  return sym;
	};
	
	var isSymbol = function(it){
	  return typeof it == 'symbol';
	};
	
	var $defineProperty = function defineProperty(it, key, D){
	  if(D && has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))setDesc(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = _create(D, {enumerable: createDesc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return setDesc(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P){
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P){
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key){
	  var E = isEnum.call(this, key);
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key]
	    ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
	  var D = getDesc(it = toIObject(it), key);
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it){
	  var names  = getNames(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i)if(!has(AllSymbols, key = names[i++]) && key != HIDDEN)result.push(key);
	  return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
	  var names  = getNames(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i)if(has(AllSymbols, key = names[i++]))result.push(AllSymbols[key]);
	  return result;
	};
	var $stringify = function stringify(it){
	  if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
	  var args = [it]
	    , i    = 1
	    , $$   = arguments
	    , replacer, $replacer;
	  while($$.length > i)args.push($$[i++]);
	  replacer = args[1];
	  if(typeof replacer == 'function')$replacer = replacer;
	  if($replacer || !isArray(replacer))replacer = function(key, value){
	    if($replacer)value = $replacer.call(this, key, value);
	    if(!isSymbol(value))return value;
	  };
	  args[1] = replacer;
	  return _stringify.apply($JSON, args);
	};
	var buggyJSON = $fails(function(){
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
	});
	
	// 19.4.1.1 Symbol([description])
	if(!useNative){
	  $Symbol = function Symbol(){
	    if(isSymbol(this))throw TypeError('Symbol is not a constructor');
	    return wrap(uid(arguments.length > 0 ? arguments[0] : undefined));
	  };
	  redefine($Symbol.prototype, 'toString', function toString(){
	    return this._k;
	  });
	
	  isSymbol = function(it){
	    return it instanceof $Symbol;
	  };
	
	  $.create     = $create;
	  $.isEnum     = $propertyIsEnumerable;
	  $.getDesc    = $getOwnPropertyDescriptor;
	  $.setDesc    = $defineProperty;
	  $.setDescs   = $defineProperties;
	  $.getNames   = $names.get = $getOwnPropertyNames;
	  $.getSymbols = $getOwnPropertySymbols;
	
	  if(DESCRIPTORS && !__webpack_require__(43)){
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }
	}
	
	var symbolStatics = {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    return keyOf(SymbolRegistry, key);
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	};
	// 19.4.2.2 Symbol.hasInstance
	// 19.4.2.3 Symbol.isConcatSpreadable
	// 19.4.2.4 Symbol.iterator
	// 19.4.2.6 Symbol.match
	// 19.4.2.8 Symbol.replace
	// 19.4.2.9 Symbol.search
	// 19.4.2.10 Symbol.species
	// 19.4.2.11 Symbol.split
	// 19.4.2.12 Symbol.toPrimitive
	// 19.4.2.13 Symbol.toStringTag
	// 19.4.2.14 Symbol.unscopables
	$.each.call((
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,' +
	  'species,split,toPrimitive,toStringTag,unscopables'
	).split(','), function(it){
	  var sym = wks(it);
	  symbolStatics[it] = useNative ? sym : wrap(sym);
	});
	
	setter = true;
	
	$export($export.G + $export.W, {Symbol: $Symbol});
	
	$export($export.S, 'Symbol', symbolStatics);
	
	$export($export.S + $export.F * !useNative, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});
	
	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!useNative || buggyJSON), 'JSON', {stringify: $stringify});
	
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 25 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(14)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(28);

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var $          = __webpack_require__(19)
	  , createDesc = __webpack_require__(29);
	module.exports = __webpack_require__(26) ? function(object, key, value){
	  return $.setDesc(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 29 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(10)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(19).setDesc
	  , has = __webpack_require__(25)
	  , TAG = __webpack_require__(32)('toStringTag');
	
	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var store  = __webpack_require__(30)('wks')
	  , uid    = __webpack_require__(33)
	  , Symbol = __webpack_require__(10).Symbol;
	module.exports = function(name){
	  return store[name] || (store[name] =
	    Symbol && Symbol[name] || (Symbol || uid)('Symbol.' + name));
	};

/***/ },
/* 33 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var $         = __webpack_require__(19)
	  , toIObject = __webpack_require__(35);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = $.getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(36)
	  , defined = __webpack_require__(7);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(37);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 37 */
/***/ function(module, exports) {

	var toString = {}.toString;
	
	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(35)
	  , getNames  = __webpack_require__(19).getNames
	  , toString  = {}.toString;
	
	var windowNames = typeof window == 'object' && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];
	
	var getWindowNames = function(it){
	  try {
	    return getNames(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	};
	
	module.exports.get = function getOwnPropertyNames(it){
	  if(windowNames && toString.call(it) == '[object Window]')return getWindowNames(it);
	  return getNames(toIObject(it));
	};

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var $ = __webpack_require__(19);
	module.exports = function(it){
	  var keys       = $.getKeys(it)
	    , getSymbols = $.getSymbols;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = $.isEnum
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))keys.push(key);
	  }
	  return keys;
	};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(37);
	module.exports = Array.isArray || function(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(42);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 42 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 43 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 44 */
/***/ function(module, exports) {



/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _setPrototypeOf = __webpack_require__(46);
	
	var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);
	
	var _create = __webpack_require__(50);
	
	var _create2 = _interopRequireDefault(_create);
	
	var _typeof2 = __webpack_require__(21);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function (subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
	  }
	
	  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
	};

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(47), __esModule: true };

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(48);
	module.exports = __webpack_require__(11).Object.setPrototypeOf;

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export = __webpack_require__(9);
	$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(49).set});

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var getDesc  = __webpack_require__(19).getDesc
	  , isObject = __webpack_require__(42)
	  , anObject = __webpack_require__(41);
	var check = function(O, proto){
	  anObject(O);
	  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function(test, buggy, set){
	      try {
	        set = __webpack_require__(12)(Function.call, getDesc(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch(e){ buggy = true; }
	      return function setPrototypeOf(O, proto){
	        check(O, proto);
	        if(buggy)O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(51), __esModule: true };

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(19);
	module.exports = function create(P, D){
	  return $.create(P, D);
	};

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/**
	 * A Render Result
	 */
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _classCallCheck2 = __webpack_require__(15);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(16);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var RenderResult = (function () {
	    /**
	     * @param {int} startOffset
	     * @param {int} endOffset
	     * @param {String} startContainerPath
	     * @param {String} endContainerPath
	     */
	
	    function RenderResult(startOffset, endOffset, startContainerPath, endContainerPath) {
	        (0, _classCallCheck3.default)(this, RenderResult);
	
	        this.startOffset = startOffset;
	        this.endOffset = endOffset;
	        this.startContainerPath = startContainerPath;
	        this.endContainerPath = endContainerPath;
	        this._renderingInstance = null;
	    }
	
	    /**
	     * @param {Object} result
	     * @return RenderResult
	     */
	
	    (0, _createClass3.default)(RenderResult, [{
	        key: 'serialize',
	
	        /**
	         * @returns {Object}
	         */
	        value: function serialize() {
	            return {
	                startOffset: this.startOffset,
	                endOffset: this.endOffset,
	                startContainerPath: this.startContainerPath,
	                endContainerPath: this.endContainerPath
	            };
	        }
	
	        /**
	         * @param {String} text
	         */
	
	    }, {
	        key: 'text',
	        set: function set(text) {
	            this._text = text;
	        }
	
	        /**
	         * @returns {String}
	         */
	        ,
	        get: function get() {
	            return this._text;
	        }
	
	        /**
	         * @returns {null|Rendering}
	         */
	
	    }, {
	        key: 'instance',
	        get: function get() {
	            return this._renderingInstance;
	        }
	
	        /**
	         * @param {null|Rendering} instance
	         */
	        ,
	        set: function set(instance) {
	            this._renderingInstance = instance;
	        }
	    }], [{
	        key: 'fromObject',
	        value: function fromObject(result) {
	            return new RenderResult(result.startOffset, result.endOffset, result.startContainerPath, result.endContainerPath);
	        }
	    }]);
	    return RenderResult;
	})();
	
	exports.default = RenderResult;

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	/* global Set */
	
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.EVENT_PART_TREE_LEAVE = exports.EVENT_PART_TREE_ENTER = exports.EVENT_MOUSELEAVE = exports.EVENT_MOUSEENTER = exports.EVENT_CLICK = undefined;
	
	var _slicedToArray2 = __webpack_require__(54);
	
	var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);
	
	var _typeof2 = __webpack_require__(21);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	var _set = __webpack_require__(73);
	
	var _set2 = _interopRequireDefault(_set);
	
	var _assign = __webpack_require__(87);
	
	var _assign2 = _interopRequireDefault(_assign);
	
	var _getPrototypeOf = __webpack_require__(3);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(15);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(16);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(20);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(45);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _wolfy87Eventemitter = __webpack_require__(91);
	
	var _wolfy87Eventemitter2 = _interopRequireDefault(_wolfy87Eventemitter);
	
	var _Rendering = __webpack_require__(2);
	
	var _Rendering2 = _interopRequireDefault(_Rendering);
	
	var _Util = __webpack_require__(92);
	
	var _Util2 = _interopRequireDefault(_Util);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * @type {string}
	 */
	var EVENT_CLICK = exports.EVENT_CLICK = 'click';
	
	/**
	 * @type {string}
	 */
	var EVENT_MOUSEENTER = exports.EVENT_MOUSEENTER = 'hover-enter';
	
	/**
	 * @type {string}
	 */
	var EVENT_MOUSELEAVE = exports.EVENT_MOUSELEAVE = 'hover-leave';
	
	/**
	 * @type {string}
	 */
	var EVENT_PART_TREE_ENTER = exports.EVENT_PART_TREE_ENTER = 'tree-enter';
	
	/**
	 * @type {string}
	 */
	var EVENT_PART_TREE_LEAVE = exports.EVENT_PART_TREE_LEAVE = 'tree-leave';
	
	/**
	 * Generic Event Handlings for Renderer
	 */
	
	var RenderingEvents = (function (_EventEmitter) {
	    (0, _inherits3.default)(RenderingEvents, _EventEmitter);
	
	    /**
	     * @param {Object} options
	     * @param {Document} document
	     */
	
	    function RenderingEvents(options, document) {
	        (0, _classCallCheck3.default)(this, RenderingEvents);
	
	        /**
	         * Options
	         * @type {Object}
	         */
	
	        var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(RenderingEvents).call(this));
	
	        _this.options = {
	            hoverClass: 'marklib--hover',
	            treeClass: 'marklib--tree',
	            className: ['marking']
	        };
	
	        _this.options = (0, _assign2.default)(_this.options, options || {});
	
	        if (typeof _this.options.className === 'string') {
	            _this.options.className = _this.options.className.split(' ');
	        }
	
	        /**
	         * A collection of all nodes that are part of all events
	         * @type {Array}
	         */
	        _this.wrapperNodes = [];
	
	        _this._registerEvents(document);
	
	        /**
	         * @type {Document}
	         */
	        _this.document = document;
	        return _this;
	    }
	
	    /**
	     * Constructs a new Range from rendered result
	     * @returns {Range}
	     */
	
	    (0, _createClass3.default)(RenderingEvents, [{
	        key: '_registerEvents',
	
	        /**
	         * Will register events if not already bind.
	         * @param {Document} document
	         * @private
	         */
	        value: function _registerEvents(document) {
	            var _this2 = this;
	
	            this.on(EVENT_MOUSEENTER, function () {
	                _this2.wrapperNodes.forEach(function (node) {
	                    node.classList.add(_this2.options.hoverClass);
	                });
	            });
	
	            this.on(EVENT_MOUSELEAVE, function () {
	                _this2.wrapperNodes.forEach(function (node) {
	                    node.classList.remove(_this2.options.hoverClass);
	                });
	            });
	
	            this.on(EVENT_PART_TREE_ENTER, function () {
	                _this2.wrapperNodes.forEach(function (node) {
	                    node.classList.add(_this2.options.treeClass);
	                });
	            });
	
	            this.on(EVENT_PART_TREE_LEAVE, function () {
	                _this2.wrapperNodes.forEach(function (node) {
	                    node.classList.remove(_this2.options.treeClass);
	                });
	            });
	
	            if (!document.MARKLIB_EVENTS) {
	                document.MARKLIB_EVENTS = true;
	                (function init() {
	                    var currentHoverInstances = new _set2.default();
	                    var betweenInstances = new _set2.default();
	
	                    function checkMarklibInstance(e) {
	                        var instance = _Rendering2.default.getMarklibInstance(e);
	                        // instanceof check will fail if used in test scenario where different DOMs are used
	                        // see also http://perfectionkills.com/instanceof-considered-harmful-or-how-to-write-a-robust-isarray/
	                        return instance && (instance instanceof _Rendering2.default || 'wrapperNodes' in instance);
	                    }
	
	                    function closestInstance(e) {
	                        var closest = _Util2.default.closestCallback(e.target, function (thisE) {
	                            return checkMarklibInstance(thisE);
	                        });
	                        if ((typeof closest === 'undefined' ? 'undefined' : (0, _typeof3.default)(closest)) === 'object') {
	                            return _Rendering2.default.getMarklibInstance(closest);
	                        }
	                        return false;
	                    }
	
	                    function getInstancesBetween(e, instance) {
	                        return _Util2.default.parentsCallback(e.target, function (el) {
	                            return checkMarklibInstance(el) && _Rendering2.default.getMarklibInstance(el) !== instance;
	                        }).map(function (el) {
	                            return _Rendering2.default.getMarklibInstance(el);
	                        });
	                    }
	
	                    function mouseOutClear() {
	                        currentHoverInstances.forEach(function (thisInstance) {
	                            thisInstance.emit(EVENT_MOUSELEAVE);
	                        });
	                        currentHoverInstances.clear();
	
	                        betweenInstances.forEach(function (thisInstance) {
	                            thisInstance.emit(EVENT_PART_TREE_LEAVE);
	                        });
	
	                        betweenInstances.clear();
	                    }
	
	                    /**
	                     * @param {Event} e
	                     * @returns {Array|boolean}
	                     */
	                    function findTarget(e) {
	                        var instance = closestInstance(e);
	                        if (instance) {
	                            var between = getInstancesBetween(e, instance);
	                            if (e.target.textContent !== instance.result.text && between.length > 0) {
	                                var allInstances = between;
	                                allInstances.unshift(instance);
	                                // take the smallest selection
	                                allInstances = allInstances.sort(function (a, b) {
	                                    return a.result.text.length < b.result.text.length ? -1 : 1;
	                                });
	                                instance = allInstances[0];
	                            }
	
	                            return [instance, between];
	                        }
	                        return false;
	                    }
	
	                    document.addEventListener('click', function (e) {
	                        var target = findTarget(e);
	                        if (target) {
	                            target[0].emit(EVENT_CLICK, e, target[1]);
	                        }
	                    }, true);
	
	                    document.addEventListener('mouseover', function (e) {
	                        var target = findTarget(e);
	                        if (target) {
	                            (function () {
	                                var _target = (0, _slicedToArray3.default)(target, 2);
	
	                                var instance = _target[0];
	                                var between = _target[1];
	                                // find instances that lay in between the node
	
	                                mouseOutClear();
	                                between.forEach(function (instanceBetween) {
	                                    betweenInstances.add(instanceBetween);
	                                    instanceBetween.emit(EVENT_PART_TREE_ENTER, e, between);
	                                });
	                                instance.emit(EVENT_MOUSEENTER, e, between);
	                                currentHoverInstances.add(instance);
	                            })();
	                        } else {
	                            mouseOutClear();
	                        }
	                    }, true);
	                })();
	            }
	        }
	    }, {
	        key: 'range',
	        get: function get() {
	            var range = this.document.createRange();
	            var textNodes = [];
	
	            this.wrapperNodes.forEach(function (wrapper) {
	                _Util2.default.walkTextNodes(wrapper, function (node) {
	                    textNodes.push(node);
	                });
	            });
	
	            if (textNodes.length > 0) {
	                var lastTextNode = textNodes[textNodes.length - 1];
	                range.setStart(textNodes[0], 0);
	                range.setEnd(lastTextNode, lastTextNode.length);
	                return range;
	            }
	
	            return null;
	        }
	    }]);
	    return RenderingEvents;
	})(_wolfy87Eventemitter2.default);
	
	exports.default = RenderingEvents;

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _isIterable2 = __webpack_require__(55);
	
	var _isIterable3 = _interopRequireDefault(_isIterable2);
	
	var _getIterator2 = __webpack_require__(69);
	
	var _getIterator3 = _interopRequireDefault(_getIterator2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = (function () {
	  function sliceIterator(arr, i) {
	    var _arr = [];
	    var _n = true;
	    var _d = false;
	    var _e = undefined;
	
	    try {
	      for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
	        _arr.push(_s.value);
	
	        if (i && _arr.length === i) break;
	      }
	    } catch (err) {
	      _d = true;
	      _e = err;
	    } finally {
	      try {
	        if (!_n && _i["return"]) _i["return"]();
	      } finally {
	        if (_d) throw _e;
	      }
	    }
	
	    return _arr;
	  }
	
	  return function (arr, i) {
	    if (Array.isArray(arr)) {
	      return arr;
	    } else if ((0, _isIterable3.default)(Object(arr))) {
	      return sliceIterator(arr, i);
	    } else {
	      throw new TypeError("Invalid attempt to destructure non-iterable instance");
	    }
	  };
	})();

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(56), __esModule: true };

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(57);
	__webpack_require__(64);
	module.exports = __webpack_require__(67);

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(58);
	var Iterators = __webpack_require__(61);
	Iterators.NodeList = Iterators.HTMLCollection = Iterators.Array;

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(59)
	  , step             = __webpack_require__(60)
	  , Iterators        = __webpack_require__(61)
	  , toIObject        = __webpack_require__(35);
	
	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(62)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');
	
	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;
	
	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 59 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 60 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 61 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(43)
	  , $export        = __webpack_require__(9)
	  , redefine       = __webpack_require__(27)
	  , hide           = __webpack_require__(28)
	  , has            = __webpack_require__(25)
	  , Iterators      = __webpack_require__(61)
	  , $iterCreate    = __webpack_require__(63)
	  , setToStringTag = __webpack_require__(31)
	  , getProto       = __webpack_require__(19).getProto
	  , ITERATOR       = __webpack_require__(32)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';
	
	var returnThis = function(){ return this; };
	
	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , methods, key;
	  // Fix native
	  if($native){
	    var IteratorPrototype = getProto($default.call(new Base));
	    // Set @@toStringTag to native iterators
	    setToStringTag(IteratorPrototype, TAG, true);
	    // FF fix
	    if(!LIBRARY && has(proto, FF_ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    // fix Array#{values, @@iterator}.name in V8 / FF
	    if(DEF_VALUES && $native.name !== VALUES){
	      VALUES_BUG = true;
	      $default = function values(){ return $native.call(this); };
	    }
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES  ? $default : getMethod(VALUES),
	      keys:    IS_SET      ? $default : getMethod(KEYS),
	      entries: !DEF_VALUES ? $default : getMethod('entries')
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $              = __webpack_require__(19)
	  , descriptor     = __webpack_require__(29)
	  , setToStringTag = __webpack_require__(31)
	  , IteratorPrototype = {};
	
	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(28)(IteratorPrototype, __webpack_require__(32)('iterator'), function(){ return this; });
	
	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = $.create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(65)(true);
	
	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(62)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(66)
	  , defined   = __webpack_require__(7);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 66 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(68)
	  , ITERATOR  = __webpack_require__(32)('iterator')
	  , Iterators = __webpack_require__(61);
	module.exports = __webpack_require__(11).isIterable = function(it){
	  var O = Object(it);
	  return O[ITERATOR] !== undefined
	    || '@@iterator' in O
	    || Iterators.hasOwnProperty(classof(O));
	};

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(37)
	  , TAG = __webpack_require__(32)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';
	
	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = (O = Object(it))[TAG]) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(70), __esModule: true };

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(57);
	__webpack_require__(64);
	module.exports = __webpack_require__(71);

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(41)
	  , get      = __webpack_require__(72);
	module.exports = __webpack_require__(11).getIterator = function(it){
	  var iterFn = get(it);
	  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
	  return anObject(iterFn.call(it));
	};

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(68)
	  , ITERATOR  = __webpack_require__(32)('iterator')
	  , Iterators = __webpack_require__(61);
	module.exports = __webpack_require__(11).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(74), __esModule: true };

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(44);
	__webpack_require__(64);
	__webpack_require__(57);
	__webpack_require__(75);
	__webpack_require__(85);
	module.exports = __webpack_require__(11).Set;

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var strong = __webpack_require__(76);
	
	// 23.2 Set Objects
	__webpack_require__(84)('Set', function(get){
	  return function Set(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.2.3.1 Set.prototype.add(value)
	  add: function add(value){
	    return strong.def(this, value = value === 0 ? 0 : value, value);
	  }
	}, strong);

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $            = __webpack_require__(19)
	  , hide         = __webpack_require__(28)
	  , redefineAll  = __webpack_require__(77)
	  , ctx          = __webpack_require__(12)
	  , strictNew    = __webpack_require__(78)
	  , defined      = __webpack_require__(7)
	  , forOf        = __webpack_require__(79)
	  , $iterDefine  = __webpack_require__(62)
	  , step         = __webpack_require__(60)
	  , ID           = __webpack_require__(33)('id')
	  , $has         = __webpack_require__(25)
	  , isObject     = __webpack_require__(42)
	  , setSpecies   = __webpack_require__(83)
	  , DESCRIPTORS  = __webpack_require__(26)
	  , isExtensible = Object.isExtensible || isObject
	  , SIZE         = DESCRIPTORS ? '_s' : 'size'
	  , id           = 0;
	
	var fastKey = function(it, create){
	  // return primitive with prefix
	  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if(!$has(it, ID)){
	    // can't set id to frozen object
	    if(!isExtensible(it))return 'F';
	    // not necessary to add id
	    if(!create)return 'E';
	    // add missing object id
	    hide(it, ID, ++id);
	  // return object id with prefix
	  } return 'O' + it[ID];
	};
	
	var getEntry = function(that, key){
	  // fast case
	  var index = fastKey(key), entry;
	  if(index !== 'F')return that._i[index];
	  // frozen object case
	  for(entry = that._f; entry; entry = entry.n){
	    if(entry.k == key)return entry;
	  }
	};
	
	module.exports = {
	  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
	    var C = wrapper(function(that, iterable){
	      strictNew(that, C, NAME);
	      that._i = $.create(null); // index
	      that._f = undefined;      // first entry
	      that._l = undefined;      // last entry
	      that[SIZE] = 0;           // size
	      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
	    });
	    redefineAll(C.prototype, {
	      // 23.1.3.1 Map.prototype.clear()
	      // 23.2.3.2 Set.prototype.clear()
	      clear: function clear(){
	        for(var that = this, data = that._i, entry = that._f; entry; entry = entry.n){
	          entry.r = true;
	          if(entry.p)entry.p = entry.p.n = undefined;
	          delete data[entry.i];
	        }
	        that._f = that._l = undefined;
	        that[SIZE] = 0;
	      },
	      // 23.1.3.3 Map.prototype.delete(key)
	      // 23.2.3.4 Set.prototype.delete(value)
	      'delete': function(key){
	        var that  = this
	          , entry = getEntry(that, key);
	        if(entry){
	          var next = entry.n
	            , prev = entry.p;
	          delete that._i[entry.i];
	          entry.r = true;
	          if(prev)prev.n = next;
	          if(next)next.p = prev;
	          if(that._f == entry)that._f = next;
	          if(that._l == entry)that._l = prev;
	          that[SIZE]--;
	        } return !!entry;
	      },
	      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
	      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
	      forEach: function forEach(callbackfn /*, that = undefined */){
	        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3)
	          , entry;
	        while(entry = entry ? entry.n : this._f){
	          f(entry.v, entry.k, this);
	          // revert to the last existing entry
	          while(entry && entry.r)entry = entry.p;
	        }
	      },
	      // 23.1.3.7 Map.prototype.has(key)
	      // 23.2.3.7 Set.prototype.has(value)
	      has: function has(key){
	        return !!getEntry(this, key);
	      }
	    });
	    if(DESCRIPTORS)$.setDesc(C.prototype, 'size', {
	      get: function(){
	        return defined(this[SIZE]);
	      }
	    });
	    return C;
	  },
	  def: function(that, key, value){
	    var entry = getEntry(that, key)
	      , prev, index;
	    // change existing entry
	    if(entry){
	      entry.v = value;
	    // create new entry
	    } else {
	      that._l = entry = {
	        i: index = fastKey(key, true), // <- index
	        k: key,                        // <- key
	        v: value,                      // <- value
	        p: prev = that._l,             // <- previous entry
	        n: undefined,                  // <- next entry
	        r: false                       // <- removed
	      };
	      if(!that._f)that._f = entry;
	      if(prev)prev.n = entry;
	      that[SIZE]++;
	      // add to index
	      if(index !== 'F')that._i[index] = entry;
	    } return that;
	  },
	  getEntry: getEntry,
	  setStrong: function(C, NAME, IS_MAP){
	    // add .keys, .values, .entries, [@@iterator]
	    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
	    $iterDefine(C, NAME, function(iterated, kind){
	      this._t = iterated;  // target
	      this._k = kind;      // kind
	      this._l = undefined; // previous
	    }, function(){
	      var that  = this
	        , kind  = that._k
	        , entry = that._l;
	      // revert to the last existing entry
	      while(entry && entry.r)entry = entry.p;
	      // get next entry
	      if(!that._t || !(that._l = entry = entry ? entry.n : that._t._f)){
	        // or finish the iteration
	        that._t = undefined;
	        return step(1);
	      }
	      // return step by kind
	      if(kind == 'keys'  )return step(0, entry.k);
	      if(kind == 'values')return step(0, entry.v);
	      return step(0, [entry.k, entry.v]);
	    }, IS_MAP ? 'entries' : 'values' , !IS_MAP, true);
	
	    // add [@@species], 23.1.2.2, 23.2.2.2
	    setSpecies(NAME);
	  }
	};

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	var redefine = __webpack_require__(27);
	module.exports = function(target, src){
	  for(var key in src)redefine(target, key, src[key]);
	  return target;
	};

/***/ },
/* 78 */
/***/ function(module, exports) {

	module.exports = function(it, Constructor, name){
	  if(!(it instanceof Constructor))throw TypeError(name + ": use the 'new' operator!");
	  return it;
	};

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	var ctx         = __webpack_require__(12)
	  , call        = __webpack_require__(80)
	  , isArrayIter = __webpack_require__(81)
	  , anObject    = __webpack_require__(41)
	  , toLength    = __webpack_require__(82)
	  , getIterFn   = __webpack_require__(72);
	module.exports = function(iterable, entries, fn, that){
	  var iterFn = getIterFn(iterable)
	    , f      = ctx(fn, that, entries ? 2 : 1)
	    , index  = 0
	    , length, step, iterator;
	  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
	    entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
	    call(iterator, f, step.value, entries);
	  }
	};

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(41);
	module.exports = function(iterator, fn, value, entries){
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch(e){
	    var ret = iterator['return'];
	    if(ret !== undefined)anObject(ret.call(iterator));
	    throw e;
	  }
	};

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(61)
	  , ITERATOR   = __webpack_require__(32)('iterator')
	  , ArrayProto = Array.prototype;
	
	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(66)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var core        = __webpack_require__(11)
	  , $           = __webpack_require__(19)
	  , DESCRIPTORS = __webpack_require__(26)
	  , SPECIES     = __webpack_require__(32)('species');
	
	module.exports = function(KEY){
	  var C = core[KEY];
	  if(DESCRIPTORS && C && !C[SPECIES])$.setDesc(C, SPECIES, {
	    configurable: true,
	    get: function(){ return this; }
	  });
	};

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $              = __webpack_require__(19)
	  , global         = __webpack_require__(10)
	  , $export        = __webpack_require__(9)
	  , fails          = __webpack_require__(14)
	  , hide           = __webpack_require__(28)
	  , redefineAll    = __webpack_require__(77)
	  , forOf          = __webpack_require__(79)
	  , strictNew      = __webpack_require__(78)
	  , isObject       = __webpack_require__(42)
	  , setToStringTag = __webpack_require__(31)
	  , DESCRIPTORS    = __webpack_require__(26);
	
	module.exports = function(NAME, wrapper, methods, common, IS_MAP, IS_WEAK){
	  var Base  = global[NAME]
	    , C     = Base
	    , ADDER = IS_MAP ? 'set' : 'add'
	    , proto = C && C.prototype
	    , O     = {};
	  if(!DESCRIPTORS || typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function(){
	    new C().entries().next();
	  }))){
	    // create collection constructor
	    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
	    redefineAll(C.prototype, methods);
	  } else {
	    C = wrapper(function(target, iterable){
	      strictNew(target, C, NAME);
	      target._c = new Base;
	      if(iterable != undefined)forOf(iterable, IS_MAP, target[ADDER], target);
	    });
	    $.each.call('add,clear,delete,forEach,get,has,set,keys,values,entries'.split(','),function(KEY){
	      var IS_ADDER = KEY == 'add' || KEY == 'set';
	      if(KEY in proto && !(IS_WEAK && KEY == 'clear'))hide(C.prototype, KEY, function(a, b){
	        if(!IS_ADDER && IS_WEAK && !isObject(a))return KEY == 'get' ? undefined : false;
	        var result = this._c[KEY](a === 0 ? 0 : a, b);
	        return IS_ADDER ? this : result;
	      });
	    });
	    if('size' in proto)$.setDesc(C.prototype, 'size', {
	      get: function(){
	        return this._c.size;
	      }
	    });
	  }
	
	  setToStringTag(C, NAME);
	
	  O[NAME] = C;
	  $export($export.G + $export.W + $export.F, O);
	
	  if(!IS_WEAK)common.setStrong(C, NAME, IS_MAP);
	
	  return C;
	};

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var $export  = __webpack_require__(9);
	
	$export($export.P, 'Set', {toJSON: __webpack_require__(86)('Set')});

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var forOf   = __webpack_require__(79)
	  , classof = __webpack_require__(68);
	module.exports = function(NAME){
	  return function toJSON(){
	    if(classof(this) != NAME)throw TypeError(NAME + "#toJSON isn't generic");
	    var arr = [];
	    forOf(this, false, arr.push, arr);
	    return arr;
	  };
	};

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(88), __esModule: true };

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(89);
	module.exports = __webpack_require__(11).Object.assign;

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $export = __webpack_require__(9);
	
	$export($export.S + $export.F, 'Object', {assign: __webpack_require__(90)});

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.1 Object.assign(target, source, ...)
	var $        = __webpack_require__(19)
	  , toObject = __webpack_require__(6)
	  , IObject  = __webpack_require__(36);
	
	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = __webpack_require__(14)(function(){
	  var a = Object.assign
	    , A = {}
	    , B = {}
	    , S = Symbol()
	    , K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function(k){ B[k] = k; });
	  return a({}, A)[S] != 7 || Object.keys(a({}, B)).join('') != K;
	}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
	  var T     = toObject(target)
	    , $$    = arguments
	    , $$len = $$.length
	    , index = 1
	    , getKeys    = $.getKeys
	    , getSymbols = $.getSymbols
	    , isEnum     = $.isEnum;
	  while($$len > index){
	    var S      = IObject($$[index++])
	      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
	  }
	  return T;
	} : Object.assign;

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * EventEmitter v4.2.11 - git.io/ee
	 * Unlicense - http://unlicense.org/
	 * Oliver Caldwell - http://oli.me.uk/
	 * @preserve
	 */
	
	;(function () {
	    'use strict';
	
	    /**
	     * Class for managing events.
	     * Can be extended to provide event functionality in other classes.
	     *
	     * @class EventEmitter Manages event registering and emitting.
	     */
	    function EventEmitter() {}
	
	    // Shortcuts to improve speed and size
	    var proto = EventEmitter.prototype;
	    var exports = this;
	    var originalGlobalValue = exports.EventEmitter;
	
	    /**
	     * Finds the index of the listener for the event in its storage array.
	     *
	     * @param {Function[]} listeners Array of listeners to search through.
	     * @param {Function} listener Method to look for.
	     * @return {Number} Index of the specified listener, -1 if not found
	     * @api private
	     */
	    function indexOfListener(listeners, listener) {
	        var i = listeners.length;
	        while (i--) {
	            if (listeners[i].listener === listener) {
	                return i;
	            }
	        }
	
	        return -1;
	    }
	
	    /**
	     * Alias a method while keeping the context correct, to allow for overwriting of target method.
	     *
	     * @param {String} name The name of the target method.
	     * @return {Function} The aliased method
	     * @api private
	     */
	    function alias(name) {
	        return function aliasClosure() {
	            return this[name].apply(this, arguments);
	        };
	    }
	
	    /**
	     * Returns the listener array for the specified event.
	     * Will initialise the event object and listener arrays if required.
	     * Will return an object if you use a regex search. The object contains keys for each matched event. So /ba[rz]/ might return an object containing bar and baz. But only if you have either defined them with defineEvent or added some listeners to them.
	     * Each property in the object response is an array of listener functions.
	     *
	     * @param {String|RegExp} evt Name of the event to return the listeners from.
	     * @return {Function[]|Object} All listener functions for the event.
	     */
	    proto.getListeners = function getListeners(evt) {
	        var events = this._getEvents();
	        var response;
	        var key;
	
	        // Return a concatenated array of all matching events if
	        // the selector is a regular expression.
	        if (evt instanceof RegExp) {
	            response = {};
	            for (key in events) {
	                if (events.hasOwnProperty(key) && evt.test(key)) {
	                    response[key] = events[key];
	                }
	            }
	        }
	        else {
	            response = events[evt] || (events[evt] = []);
	        }
	
	        return response;
	    };
	
	    /**
	     * Takes a list of listener objects and flattens it into a list of listener functions.
	     *
	     * @param {Object[]} listeners Raw listener objects.
	     * @return {Function[]} Just the listener functions.
	     */
	    proto.flattenListeners = function flattenListeners(listeners) {
	        var flatListeners = [];
	        var i;
	
	        for (i = 0; i < listeners.length; i += 1) {
	            flatListeners.push(listeners[i].listener);
	        }
	
	        return flatListeners;
	    };
	
	    /**
	     * Fetches the requested listeners via getListeners but will always return the results inside an object. This is mainly for internal use but others may find it useful.
	     *
	     * @param {String|RegExp} evt Name of the event to return the listeners from.
	     * @return {Object} All listener functions for an event in an object.
	     */
	    proto.getListenersAsObject = function getListenersAsObject(evt) {
	        var listeners = this.getListeners(evt);
	        var response;
	
	        if (listeners instanceof Array) {
	            response = {};
	            response[evt] = listeners;
	        }
	
	        return response || listeners;
	    };
	
	    /**
	     * Adds a listener function to the specified event.
	     * The listener will not be added if it is a duplicate.
	     * If the listener returns true then it will be removed after it is called.
	     * If you pass a regular expression as the event name then the listener will be added to all events that match it.
	     *
	     * @param {String|RegExp} evt Name of the event to attach the listener to.
	     * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	    proto.addListener = function addListener(evt, listener) {
	        var listeners = this.getListenersAsObject(evt);
	        var listenerIsWrapped = typeof listener === 'object';
	        var key;
	
	        for (key in listeners) {
	            if (listeners.hasOwnProperty(key) && indexOfListener(listeners[key], listener) === -1) {
	                listeners[key].push(listenerIsWrapped ? listener : {
	                    listener: listener,
	                    once: false
	                });
	            }
	        }
	
	        return this;
	    };
	
	    /**
	     * Alias of addListener
	     */
	    proto.on = alias('addListener');
	
	    /**
	     * Semi-alias of addListener. It will add a listener that will be
	     * automatically removed after its first execution.
	     *
	     * @param {String|RegExp} evt Name of the event to attach the listener to.
	     * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	    proto.addOnceListener = function addOnceListener(evt, listener) {
	        return this.addListener(evt, {
	            listener: listener,
	            once: true
	        });
	    };
	
	    /**
	     * Alias of addOnceListener.
	     */
	    proto.once = alias('addOnceListener');
	
	    /**
	     * Defines an event name. This is required if you want to use a regex to add a listener to multiple events at once. If you don't do this then how do you expect it to know what event to add to? Should it just add to every possible match for a regex? No. That is scary and bad.
	     * You need to tell it what event names should be matched by a regex.
	     *
	     * @param {String} evt Name of the event to create.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	    proto.defineEvent = function defineEvent(evt) {
	        this.getListeners(evt);
	        return this;
	    };
	
	    /**
	     * Uses defineEvent to define multiple events.
	     *
	     * @param {String[]} evts An array of event names to define.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	    proto.defineEvents = function defineEvents(evts) {
	        for (var i = 0; i < evts.length; i += 1) {
	            this.defineEvent(evts[i]);
	        }
	        return this;
	    };
	
	    /**
	     * Removes a listener function from the specified event.
	     * When passed a regular expression as the event name, it will remove the listener from all events that match it.
	     *
	     * @param {String|RegExp} evt Name of the event to remove the listener from.
	     * @param {Function} listener Method to remove from the event.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	    proto.removeListener = function removeListener(evt, listener) {
	        var listeners = this.getListenersAsObject(evt);
	        var index;
	        var key;
	
	        for (key in listeners) {
	            if (listeners.hasOwnProperty(key)) {
	                index = indexOfListener(listeners[key], listener);
	
	                if (index !== -1) {
	                    listeners[key].splice(index, 1);
	                }
	            }
	        }
	
	        return this;
	    };
	
	    /**
	     * Alias of removeListener
	     */
	    proto.off = alias('removeListener');
	
	    /**
	     * Adds listeners in bulk using the manipulateListeners method.
	     * If you pass an object as the second argument you can add to multiple events at once. The object should contain key value pairs of events and listeners or listener arrays. You can also pass it an event name and an array of listeners to be added.
	     * You can also pass it a regular expression to add the array of listeners to all events that match it.
	     * Yeah, this function does quite a bit. That's probably a bad thing.
	     *
	     * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add to multiple events at once.
	     * @param {Function[]} [listeners] An optional array of listener functions to add.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	    proto.addListeners = function addListeners(evt, listeners) {
	        // Pass through to manipulateListeners
	        return this.manipulateListeners(false, evt, listeners);
	    };
	
	    /**
	     * Removes listeners in bulk using the manipulateListeners method.
	     * If you pass an object as the second argument you can remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
	     * You can also pass it an event name and an array of listeners to be removed.
	     * You can also pass it a regular expression to remove the listeners from all events that match it.
	     *
	     * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to remove from multiple events at once.
	     * @param {Function[]} [listeners] An optional array of listener functions to remove.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	    proto.removeListeners = function removeListeners(evt, listeners) {
	        // Pass through to manipulateListeners
	        return this.manipulateListeners(true, evt, listeners);
	    };
	
	    /**
	     * Edits listeners in bulk. The addListeners and removeListeners methods both use this to do their job. You should really use those instead, this is a little lower level.
	     * The first argument will determine if the listeners are removed (true) or added (false).
	     * If you pass an object as the second argument you can add/remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
	     * You can also pass it an event name and an array of listeners to be added/removed.
	     * You can also pass it a regular expression to manipulate the listeners of all events that match it.
	     *
	     * @param {Boolean} remove True if you want to remove listeners, false if you want to add.
	     * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add/remove from multiple events at once.
	     * @param {Function[]} [listeners] An optional array of listener functions to add/remove.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	    proto.manipulateListeners = function manipulateListeners(remove, evt, listeners) {
	        var i;
	        var value;
	        var single = remove ? this.removeListener : this.addListener;
	        var multiple = remove ? this.removeListeners : this.addListeners;
	
	        // If evt is an object then pass each of its properties to this method
	        if (typeof evt === 'object' && !(evt instanceof RegExp)) {
	            for (i in evt) {
	                if (evt.hasOwnProperty(i) && (value = evt[i])) {
	                    // Pass the single listener straight through to the singular method
	                    if (typeof value === 'function') {
	                        single.call(this, i, value);
	                    }
	                    else {
	                        // Otherwise pass back to the multiple function
	                        multiple.call(this, i, value);
	                    }
	                }
	            }
	        }
	        else {
	            // So evt must be a string
	            // And listeners must be an array of listeners
	            // Loop over it and pass each one to the multiple method
	            i = listeners.length;
	            while (i--) {
	                single.call(this, evt, listeners[i]);
	            }
	        }
	
	        return this;
	    };
	
	    /**
	     * Removes all listeners from a specified event.
	     * If you do not specify an event then all listeners will be removed.
	     * That means every event will be emptied.
	     * You can also pass a regex to remove all events that match it.
	     *
	     * @param {String|RegExp} [evt] Optional name of the event to remove all listeners for. Will remove from every event if not passed.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	    proto.removeEvent = function removeEvent(evt) {
	        var type = typeof evt;
	        var events = this._getEvents();
	        var key;
	
	        // Remove different things depending on the state of evt
	        if (type === 'string') {
	            // Remove all listeners for the specified event
	            delete events[evt];
	        }
	        else if (evt instanceof RegExp) {
	            // Remove all events matching the regex.
	            for (key in events) {
	                if (events.hasOwnProperty(key) && evt.test(key)) {
	                    delete events[key];
	                }
	            }
	        }
	        else {
	            // Remove all listeners in all events
	            delete this._events;
	        }
	
	        return this;
	    };
	
	    /**
	     * Alias of removeEvent.
	     *
	     * Added to mirror the node API.
	     */
	    proto.removeAllListeners = alias('removeEvent');
	
	    /**
	     * Emits an event of your choice.
	     * When emitted, every listener attached to that event will be executed.
	     * If you pass the optional argument array then those arguments will be passed to every listener upon execution.
	     * Because it uses `apply`, your array of arguments will be passed as if you wrote them out separately.
	     * So they will not arrive within the array on the other side, they will be separate.
	     * You can also pass a regular expression to emit to all events that match it.
	     *
	     * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
	     * @param {Array} [args] Optional array of arguments to be passed to each listener.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	    proto.emitEvent = function emitEvent(evt, args) {
	        var listenersMap = this.getListenersAsObject(evt);
	        var listeners;
	        var listener;
	        var i;
	        var key;
	        var response;
	
	        for (key in listenersMap) {
	            if (listenersMap.hasOwnProperty(key)) {
	                listeners = listenersMap[key].slice(0);
	                i = listeners.length;
	
	                while (i--) {
	                    // If the listener returns true then it shall be removed from the event
	                    // The function is executed either with a basic call or an apply if there is an args array
	                    listener = listeners[i];
	
	                    if (listener.once === true) {
	                        this.removeListener(evt, listener.listener);
	                    }
	
	                    response = listener.listener.apply(this, args || []);
	
	                    if (response === this._getOnceReturnValue()) {
	                        this.removeListener(evt, listener.listener);
	                    }
	                }
	            }
	        }
	
	        return this;
	    };
	
	    /**
	     * Alias of emitEvent
	     */
	    proto.trigger = alias('emitEvent');
	
	    /**
	     * Subtly different from emitEvent in that it will pass its arguments on to the listeners, as opposed to taking a single array of arguments to pass on.
	     * As with emitEvent, you can pass a regex in place of the event name to emit to all events that match it.
	     *
	     * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
	     * @param {...*} Optional additional arguments to be passed to each listener.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	    proto.emit = function emit(evt) {
	        var args = Array.prototype.slice.call(arguments, 1);
	        return this.emitEvent(evt, args);
	    };
	
	    /**
	     * Sets the current value to check against when executing listeners. If a
	     * listeners return value matches the one set here then it will be removed
	     * after execution. This value defaults to true.
	     *
	     * @param {*} value The new value to check for when executing listeners.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	    proto.setOnceReturnValue = function setOnceReturnValue(value) {
	        this._onceReturnValue = value;
	        return this;
	    };
	
	    /**
	     * Fetches the current value to check against when executing listeners. If
	     * the listeners return value matches this one then it should be removed
	     * automatically. It will return true by default.
	     *
	     * @return {*|Boolean} The current value to check for or the default, true.
	     * @api private
	     */
	    proto._getOnceReturnValue = function _getOnceReturnValue() {
	        if (this.hasOwnProperty('_onceReturnValue')) {
	            return this._onceReturnValue;
	        }
	        else {
	            return true;
	        }
	    };
	
	    /**
	     * Fetches the events object and creates one if required.
	     *
	     * @return {Object} The events storage object.
	     * @api private
	     */
	    proto._getEvents = function _getEvents() {
	        return this._events || (this._events = {});
	    };
	
	    /**
	     * Reverts the global {@link EventEmitter} to its previous value and returns a reference to this version.
	     *
	     * @return {Function} Non conflicting EventEmitter class.
	     */
	    EventEmitter.noConflict = function noConflict() {
	        exports.EventEmitter = originalGlobalValue;
	        return EventEmitter;
	    };
	
	    // Expose the class either via AMD, CommonJS or the global object
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	            return EventEmitter;
	        }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    }
	    else if (typeof module === 'object' && module.exports){
	        module.exports = EventEmitter;
	    }
	    else {
	        exports.EventEmitter = EventEmitter;
	    }
	}.call(this));


/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	/* global Node, NodeList, Element */
	
	'use strict';
	
	/**
	 * @type {string}
	 */
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.DATA_IS_SELECTION = exports.ATTR_DATA_ORIGINAL_INDEX = undefined;
	
	var _classCallCheck2 = __webpack_require__(15);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(16);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _Rendering = __webpack_require__(2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var ATTR_DATA_ORIGINAL_INDEX = exports.ATTR_DATA_ORIGINAL_INDEX = 'data-original-index';
	/**
	 * @type {string}
	 */
	var DATA_IS_SELECTION = exports.DATA_IS_SELECTION = 'data-is-selection';
	/**
	 * @type {string}
	 */
	var SERIALIZE_SEPARATOR = ";";
	
	// polyfill for matchesSelector, IE 10/11 does not support Element.matches
	if (Element && !Element.prototype.matches) {
	    var p = Element.prototype;
	    p.matches = p.matchesSelector || p.mozMatchesSelector || p.msMatchesSelector || p.oMatchesSelector || p.webkitMatchesSelector;
	}
	
	/**
	 * Utility class
	 * Contains DOM/Node manipulation helpers
	 */
	
	var Util = (function () {
	    function Util() {
	        (0, _classCallCheck3.default)(this, Util);
	    }
	
	    (0, _createClass3.default)(Util, null, [{
	        key: 'nodeListFilter',
	
	        /**
	         * Filter for a NodeList
	         * @param {NodeList} nodes
	         * @param {Function} func
	         *
	         * @returns {Array.<HTMLElement>}
	         */
	        value: function nodeListFilter(nodes, func) {
	            return Array.prototype.filter.call(nodes || [], func);
	        }
	
	        /**
	         * Generates a unique id
	         *
	         * @return {String}
	         */
	
	    }, {
	        key: 'guid',
	        value: function guid() {
	            var s4 = function s4() {
	                return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
	            };
	            return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
	        }
	
	        /**
	         * Checks if a given node is empty
	         * @param {HTMLElement} node
	         *
	         * @returns {*}
	         */
	
	    }, {
	        key: 'nodeIsEmpty',
	        value: function nodeIsEmpty(node) {
	            return node.nodeValue.match(/^[\s]*$/g);
	        }
	
	        /**
	         * @param {HTMLElement} node
	         * @param [optionalList]
	         *
	         * @return {int} the index of this node in context to it's siblings
	         */
	
	    }, {
	        key: 'index',
	        value: function index(node, optionalList) {
	            var children = optionalList || (node.nodeType === Node.TEXT_NODE ? node.parentNode.childNodes : node.parentNode.children);
	            return Array.prototype.indexOf.call(children || [], node);
	        }
	
	        /**
	         * Wraps given `elms` in given `wrapper`
	         *
	         * @param {HTMLElement|Array.<HTMLElement>|Node} elms
	         * @param {HTMLElement|Node} wrapper
	         *
	         * @return {HTMLElement}
	         */
	
	    }, {
	        key: 'wrap',
	        value: function wrap(elms, wrapper) {
	            var thisElms = elms;
	
	            if (!thisElms) {
	                return wrapper;
	            }
	            // Convert `elms` to an array, if necessary.
	            if (!(thisElms instanceof NodeList || thisElms instanceof Array)) {
	                thisElms = [thisElms];
	            }
	            for (var i = thisElms.length - 1; i >= 0; i--) {
	                var child = i > 0 ? wrapper.cloneNode(true) : wrapper;
	                var el = thisElms[i];
	                // Cache the current parent and sibling.
	                var parent = el.parentNode;
	                var sibling = el.nextSibling;
	
	                child.appendChild(el);
	                if (sibling) {
	                    parent.insertBefore(child, sibling);
	                } else {
	                    parent.appendChild(child);
	                }
	            }
	            return wrapper;
	        }
	
	        /**
	         * Will calculate an index depending on an already modified dom by marklib
	         * @param {HTMLElement|Node} node
	         *
	         * @returns {int|boolean}
	         */
	
	    }, {
	        key: 'calcIndex',
	        value: function calcIndex(node) {
	            var calculatedIndex = 0;
	            var foundWrapper = false;
	            var nodes = node.parentNode.childNodes;
	            var length = nodes.length;
	            for (var thisIndex = 0; thisIndex < length; thisIndex++) {
	                var el = nodes[thisIndex];
	                if (el === node) {
	                    break;
	                }
	                // reset index when original index is found
	                var maybeIndexOfOriginal = el.getAttribute ? el.getAttribute(ATTR_DATA_ORIGINAL_INDEX) : null;
	
	                if (maybeIndexOfOriginal) {
	                    calculatedIndex = parseInt(maybeIndexOfOriginal, 10);
	                    foundWrapper = true;
	                }
	                calculatedIndex++;
	            }
	            return foundWrapper ? calculatedIndex : Util.index(node);
	        }
	
	        /**
	         * @param {HTMLElement|Node} el
	         * @param {String} [optionalSelector] will test given element against a selector
	         *  if matches, returns this element immediately
	         *
	         * @return {Array.<HTMLElement>} an array of all found parents of given element (and optional selector)
	         */
	
	    }, {
	        key: 'parents',
	        value: function parents(el, optionalSelector) {
	            return Util.parentsCallback(el, function (element) {
	                if (optionalSelector && (element === optionalSelector || typeof optionalSelector === 'string' && element.matches && element.matches(optionalSelector))) {
	                    return true;
	                } else if (!optionalSelector) {
	                    return true;
	                }
	                return false;
	            });
	        }
	
	        /**
	         * @param {HTMLElement|Node} el
	         * @param {Function} callback
	         * @return {Array.<HTMLElement>} an array of all found parents of given element (and optional selector)
	         */
	
	    }, {
	        key: 'parentsCallback',
	        value: function parentsCallback(el, callback) {
	            var element = el;
	            var foundElements = [];
	            while (element.parentNode !== null) {
	                element = element.parentNode;
	                if (callback(element)) {
	                    foundElements.push(element);
	                }
	            }
	            return foundElements;
	        }
	
	        /**
	         * Finds a parent node (the closest) with a given selector
	         * @param {Node} el
	         * @param {String} selector
	         *
	         * @returns {Node|boolean}
	         */
	
	    }, {
	        key: 'parent',
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
	
	        /**
	         * Finds the closest element including itself matching a given selector
	         * @param {Node} el
	         * @param selector
	         *
	         * @returns {Node|boolean}
	         */
	
	    }, {
	        key: 'closest',
	        value: function closest(el, selector) {
	            return Util.closestCallback(el, function (element) {
	                return element.matches && element.matches(selector);
	            });
	        }
	
	        /**
	         * Finds the closest element including itself matching a callback
	         * @param {Node} el
	         * @param {Function} callback
	         * @returns {Node|boolean}
	         */
	
	    }, {
	        key: 'closestCallback',
	        value: function closestCallback(el, callback) {
	            var element = el;
	            while (element !== null) {
	                if (callback(element)) {
	                    return element;
	                }
	                element = element.parentNode;
	            }
	            return false;
	        }
	
	        /**
	         * Finds the outermost fitting element that matches callback
	         * @param {Node} el
	         * @param {Function} callback
	         * @returns {Node|boolean}
	         */
	
	    }, {
	        key: 'outerMostCallback',
	        value: function outerMostCallback(el, callback) {
	            var element = el;
	            var lastValid = false;
	            while (element !== null) {
	                if (callback(element)) {
	                    lastValid = element;
	                }
	                element = element.parentNode;
	            }
	            return lastValid;
	        }
	
	        /**
	         * @param {HTMLElement} n
	         *
	         * @return {boolean}
	         */
	
	    }, {
	        key: 'isMarkNode',
	        value: function isMarkNode(n) {
	            return n instanceof HTMLElement && n.hasAttribute(DATA_IS_SELECTION);
	        }
	
	        /**
	         * Determines the correct paths and excludes all `marklib` generated content
	         * TODO: To improve performance we could shorten the path if an ID is present in it.
	         * @param {HTMLElement|Node} el
	         * @param {HTMLElement|Node} [context] if given extraction path is relative to this element
	         * @returns {string}
	         */
	
	    }, {
	        key: 'getPath',
	        value: function getPath(el, context) {
	            var path = null;
	            var node = el;
	
	            var filterSiblings = function filterSiblings(thisEl) {
	                return !Util.isMarkNode(thisEl) && thisEl.nodeName === node.nodeName;
	            };
	
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
	                    var outerMostElement = Util.parents(node, '[' + ATTR_DATA_ORIGINAL_INDEX + ']').reverse()[0];
	                    // if element is not yet wrapped in span, recalculate index based on parent container:
	                    // We have to do this because text node indexes != element indexes...
	                    var calculatedIndex = 0;
	                    if (!outerMostElement) {
	                        calculatedIndex = Util.calcIndex(node);
	                    }
	                    var index = outerMostElement ? parseInt(outerMostElement.getAttribute(ATTR_DATA_ORIGINAL_INDEX), 10) : calculatedIndex;
	                    name = SERIALIZE_SEPARATOR + index;
	                } else {
	                    name = node.nodeName;
	                }
	
	                if (!name) {
	                    break;
	                }
	
	                name = name.toLowerCase();
	
	                var parent = node.parentNode;
	
	                if (Util.isMarkNode(node)) {
	                    if (parent !== context) {
	                        node = parent;
	                        continue;
	                    } else {
	                        break;
	                    }
	                }
	
	                // Select only siblings that are not part of selection and are of the same type
	                // (because we use nth-of-type selector later)
	                var siblings = Util.nodeListFilter(parent.children, filterSiblings);
	                var nodeIndex = Util.index(node, siblings);
	
	                if (siblings.length > 1 && nodeIndex >= 0) {
	                    name += ':nth-of-type(' + (nodeIndex + 1) + ')';
	                }
	
	                path = name + (path ? '>' + path : '');
	
	                if (parent === context) {
	                    break;
	                }
	
	                node = parent;
	            }
	
	            return path.replace("#document>", "").replace('>;', ';');
	        }
	
	        /**
	         * Will return the first original offset value that is found
	         * @param {Node} element
	         *
	         * @returns {int}
	         */
	
	    }, {
	        key: 'findOriginalOffset',
	        value: function findOriginalOffset(element) {
	            if (!element.parentNode.hasAttribute(_Rendering.ATTR_DATA_ORIGINAL_OFFSET_START)) {
	                return 0;
	            }
	            var lengthElement = Util.parent(element, '[' + _Rendering.ATTR_DATA_ORIGINAL_OFFSET_START + ']');
	            return lengthElement ? parseInt(lengthElement.getAttribute(_Rendering.ATTR_DATA_ORIGINAL_OFFSET_START), 10) : 0;
	        }
	
	        /**
	         * Deserialize a specific path and finds the right textNodes
	         * This even works when DOM has been manipulated before by `marklib`
	         * @param {string} path the serialized path (including offsets)
	         * @param {Node|HTMLElement} context
	         *
	         * @return {Node}
	         */
	
	    }, {
	        key: 'deserializePath',
	        value: function deserializePath(path, context) {
	            var pSplit = path.split(';');
	            var p = pSplit[0];
	            var objectIndex = parseInt(pSplit[1], 10);
	            var charOffset = parseInt(pSplit[2], 10);
	            var container = !p.trim() ? context : context.querySelector(p);
	
	            var maybeFoundNode = null;
	
	            Util.walkTextNodes(container, function (n) {
	                var atrOffsetStart = n.parentNode.getAttribute(_Rendering.ATTR_DATA_ORIGINAL_OFFSET_START);
	                atrOffsetStart = atrOffsetStart === null ? 0 : atrOffsetStart;
	                var atrIndex = n.parentNode.getAttribute(ATTR_DATA_ORIGINAL_INDEX);
	                atrIndex = atrIndex === null ? Util.calcIndex(n) : atrIndex;
	                if (parseInt(atrIndex, 10) === objectIndex && charOffset >= atrOffsetStart && parseInt(atrOffsetStart, 10) + n.length >= charOffset) {
	                    var thisOffset = n.parentNode.hasAttribute(_Rendering.ATTR_DATA_ORIGINAL_OFFSET_START) ? charOffset - parseInt(n.parentNode.getAttribute(_Rendering.ATTR_DATA_ORIGINAL_OFFSET_START), 10) : charOffset;
	
	                    maybeFoundNode = {
	                        node: n,
	                        offset: thisOffset
	                    };
	
	                    return false;
	                }
	                return true;
	            }, null);
	
	            return maybeFoundNode;
	        }
	
	        /**
	         * Walks the dom tree unless func returns false
	         * Applies node to function
	         *
	         * @param {Node} node
	         * @param {Function} func
	         * @param {int} type, see `NodeFilter`
	         * @param {Object} [filter] skips empty text nodes by default
	         *
	         * @returns {boolean} true if function did abort walk
	         */
	
	    }, {
	        key: 'walkDom',
	        value: function walkDom(node, func) {
	            var _document;
	
	            var type = arguments.length <= 2 || arguments[2] === undefined ? NodeFilter.SHOW_ALL : arguments[2];
	            var filter = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];
	
	            if (!node) {
	                return false;
	            }
	            var args = [node, type];
	            if (filter) {
	                args.push(filter);
	            }
	            var walker = (_document = document).createTreeWalker.apply(_document, args);
	            while (walker.nextNode()) {
	                if (!func(walker.currentNode)) {
	                    return true;
	                }
	            }
	            return false;
	        }
	
	        /**
	         * Extracts all TextNodes inside a container
	         * @param {Node} el
	         * @param {Function} func
	         * @param {Object} [filter] skips empty text nodes by default
	         * @returns {boolean} true if function did abort walk
	         */
	
	    }, {
	        key: 'walkTextNodes',
	        value: function walkTextNodes(el, func) {
	            var filter = arguments.length <= 2 || arguments[2] === undefined ? {
	                acceptNode: function acceptNode(node) {
	                    return !Util.nodeIsEmpty(node);
	                }
	            } : arguments[2];
	
	            return Util.walkDom(el, func, NodeFilter.SHOW_TEXT, filter);
	        }
	
	        /**
	         * @param {Node} container
	         * @param {Number} thisIndex
	         * @returns {int|string} index of parent or original
	         */
	
	    }, {
	        key: 'getIndexParentIfHas',
	        value: function getIndexParentIfHas(container, thisIndex) {
	            var p = container.parentNode;
	            var index = parseInt(p.getAttribute(ATTR_DATA_ORIGINAL_INDEX), 10);
	            return index > thisIndex ? index : thisIndex;
	        }
	
	        /**
	         * @param container
	         * @returns {int} offset start of parent if has, else 0
	         */
	
	    }, {
	        key: 'getOffsetParentIfHas',
	        value: function getOffsetParentIfHas(container) {
	            var p = container.parentNode;
	            var offset = parseInt(p.getAttribute(_Rendering.ATTR_DATA_ORIGINAL_OFFSET_START), 10);
	            return offset > 0 ? offset : 0;
	        }
	    }]);
	    return Util;
	})();
	
	exports.default = Util;

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _stringify = __webpack_require__(94);
	
	var _stringify2 = _interopRequireDefault(_stringify);
	
	var _Marklib = __webpack_require__(1);
	
	var _Marklib2 = _interopRequireDefault(_Marklib);
	
	var _flexcss = __webpack_require__(96);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/* global localStorage, document */
	
	var KEY_ENTER = 13;
	
	/**
	 * Contains Module for the demonstration
	 */
	
	document.addEventListener("DOMContentLoaded", function () {
	    var STORAGE_KEY = 'savedRanges';
	    var ANIMATIONEND = 'animationend';
	    var allRanges = [];
	    var tooltip = new _flexcss.Tooltip(document.body);
	
	    /**
	     * Creates an animated rendering
	     */
	    function presentRendering(selector, classNames, speed) {
	        var text = document.getElementById(selector).childNodes[0];
	        var thisLength = text.length;
	
	        var render = function render(autoMarkText, cp, length) {
	            var c = cp;
	            var r = new _Marklib2.default.Rendering(document, {
	                className: classNames
	            });
	            var range = document.createRange();
	            range.setStart(autoMarkText, 0);
	            range.setEnd(autoMarkText, 1);
	            r.renderWithRange(range);
	            if (autoMarkText.parentNode.nextSibling) {
	                (function () {
	                    var nextText = autoMarkText.parentNode.nextSibling.childNodes[0];
	                    setTimeout(function () {
	                        render(nextText, ++c, length);
	                    }, speed);
	                })();
	            }
	        };
	
	        return render(text, 0, thisLength);
	    }
	
	    presentRendering('automark', 'fadeInDown', 20);
	
	    var savedRanges = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
	    var animated = false;
	
	    /**
	     * OnClick event for renderings
	     */
	    function onClick() {
	        var self = this;
	        this.wrapperNodes.forEach(function (n) {
	            n.addEventListener(ANIMATIONEND, function thisFunction(e) {
	                e.target.classList.remove('bubble');
	                e.target.removeEventListener(ANIMATIONEND, thisFunction);
	            });
	            n.classList.add('bubble');
	        });
	
	        if (tooltip.getCurrentTarget() === this.wrapperNodes[0]) {
	            return;
	        }
	
	        tooltip.createTooltip(this.wrapperNodes[0], this.result.text, false);
	
	        setTimeout(function () {
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
	
	    savedRanges.forEach(function (range) {
	        var marker = new _Marklib2.default.Rendering(document);
	        try {
	            marker.renderWithResult(range);
	            allRanges.push(marker);
	            marker.on('click', onClick);
	        } catch (e) {
	            console.warn("Could not render:", range, e);
	            localStorage.setItem(STORAGE_KEY, (0, _stringify2.default)([]));
	            console.error('Cleared local storage because of a rendering issue, the page might have been changed ;)');
	        }
	    });
	
	    window.addEventListener('scroll', function () {
	        var el = document.getElementById('secondParagraph');
	        var r = el.getBoundingClientRect();
	        var html = document.documentElement;
	        if (r.top <= html.clientHeight && r.bottom >= 0 && !animated) {
	            animated = true;
	
	            el.classList.add('animate');
	            if (!savedRanges.length) {
	                presentRendering('secondParagraphItem', 'marking', 30);
	            }
	        }
	    });
	
	    var actionMark = function actionMark() {
	        try {
	            var selection = document.getSelection();
	            var renderer = new _Marklib2.default.Rendering(document);
	            var result = renderer.renderWithRange(selection.getRangeAt(0));
	
	            renderer.on('click', onClick);
	            allRanges.push(renderer);
	
	            selection.removeAllRanges();
	            savedRanges.push(result.serialize());
	            localStorage.setItem(STORAGE_KEY, (0, _stringify2.default)(savedRanges));
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
	            allRanges.forEach(function (range) {
	                return range.destroy();
	            });
	            savedRanges = [];
	            allRanges = [];
	            localStorage.setItem(STORAGE_KEY, (0, _stringify2.default)([]));
	        }
	    });
	});
	
	exports.default = _Marklib2.default;

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(95), __esModule: true };

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	var core = __webpack_require__(11);
	module.exports = function stringify(it){ // eslint-disable-line no-unused-vars
	  return (core.JSON && core.JSON.stringify || JSON.stringify).apply(JSON, arguments);
	};

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.LightBox = exports.Dropdown = exports.OffCanvas = exports.Toggleable = exports.Util = exports.Settings = exports.Widget = exports.Modal = exports.Tooltip = exports.Form = undefined;
	
	var _Form = __webpack_require__(97);
	
	var _Form2 = _interopRequireDefault(_Form);
	
	var _Tooltip = __webpack_require__(98);
	
	var _Tooltip2 = _interopRequireDefault(_Tooltip);
	
	var _Modal = __webpack_require__(105);
	
	var _Modal2 = _interopRequireDefault(_Modal);
	
	var _Widget = __webpack_require__(106);
	
	var _Widget2 = _interopRequireDefault(_Widget);
	
	var _Settings = __webpack_require__(101);
	
	var _Settings2 = _interopRequireDefault(_Settings);
	
	var _Toggleable = __webpack_require__(107);
	
	var _Toggleable2 = _interopRequireDefault(_Toggleable);
	
	var _OffCanvas = __webpack_require__(108);
	
	var _OffCanvas2 = _interopRequireDefault(_OffCanvas);
	
	var _Dropdown = __webpack_require__(109);
	
	var _Dropdown2 = _interopRequireDefault(_Dropdown);
	
	var _LightBox = __webpack_require__(110);
	
	var _LightBox2 = _interopRequireDefault(_LightBox);
	
	var _Util = __webpack_require__(99);
	
	var _Util2 = _interopRequireDefault(_Util);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.Form = _Form2.default;
	exports.Tooltip = _Tooltip2.default;
	exports.Modal = _Modal2.default;
	exports.Widget = _Widget2.default;
	exports.Settings = _Settings2.default;
	exports.Util = _Util2.default;
	exports.Toggleable = _Toggleable2.default;
	exports.OffCanvas = _OffCanvas2.default;
	exports.Dropdown = _Dropdown2.default;
	exports.LightBox = _LightBox2.default;

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/*global HTMLFormElement, fetch, FormData, clearTimeout, NodeList*/
	
	/*
	 * The MIT License (MIT)
	 *
	 * Copyright (c) 2015 David Heidrich, BowlingX <me@bowlingx.com>
	 *
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:
	 *
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 *
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	 */
	
	/*!
	 * FlexCss.Form
	 * Licensed under the MIT License (MIT)
	 * Copyright (c) 2015 David Heidrich, BowlingX <me@bowlingx.com>
	 */
	
	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.EVENT_FORM_AJAX_COMPLETED = exports.EVENT_FORM_AFTER_AJAX_SUBMIT = exports.EVENT_FORM_SUBMIT = exports.EVENT_FORM_READY = undefined;
	
	var _Tooltip = __webpack_require__(98);
	
	var _Tooltip2 = _interopRequireDefault(_Tooltip);
	
	__webpack_require__(102);
	
	var _Event = __webpack_require__(104);
	
	var _Event2 = _interopRequireDefault(_Event);
	
	var _Util = __webpack_require__(99);
	
	var _Util2 = _interopRequireDefault(_Util);
	
	var _Settings = __webpack_require__(101);
	
	var _Settings2 = _interopRequireDefault(_Settings);
	
	var _DestroyableWidget2 = __webpack_require__(100);
	
	var _DestroyableWidget3 = _interopRequireDefault(_DestroyableWidget2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var LOADING_CLASS = 'loading';
	var DATA_ELEMENT_INVALID = 'data-flexcss-invalid';
	var REMOTE = 'data-remote';
	var REMOTE_ACTION = 'data-remote-action';
	var ATTR_DISABLE_INLINE = 'data-disable-inline-validation';
	var ATTR_DISABLE_REALTIME = 'data-disable-realtime-validation';
	var ATTR_VALIDATOR = 'data-validate';
	var ATTR_DATA_CUSTOM_MESSAGE = 'data-validation-message';
	var ATTR_DATA_CUSTOM_LABEL = 'data-custom-label';
	var ATTR_VALIDATE_VISIBILITY = 'data-validate-visibility';
	var ATTR_ERROR_TARGET_ID = 'data-error-target';
	var ATTR_DEPENDS = 'data-depends-selector';
	var CONST_USE_JSON = 'json';
	var CONST_REALTIME_EVENT = 'input';
	var FOCUS_TOOLTIP_DELAY = 20;
	var CLICK_TOOLTIP_DELAY = 150;
	
	/**
	 * Triggered when form is fully initialized and handlers are binded
	 * @type {string}
	 */
	var EVENT_FORM_READY = exports.EVENT_FORM_READY = 'flexcss.form.ready';
	/**
	 * Fires when a form is submitted, cancelable
	 * @type {string}
	 */
	var EVENT_FORM_SUBMIT = exports.EVENT_FORM_SUBMIT = 'flexcss.form.submit';
	/**
	 * Fired directly after the form has been submitted via ajax
	 * @type {string}
	 */
	var EVENT_FORM_AFTER_AJAX_SUBMIT = exports.EVENT_FORM_AFTER_AJAX_SUBMIT = 'flexcss.form.afterAjaxSubmit';
	/**
	 * Fired when ajax events did complete
	 * @type {string}
	 */
	var EVENT_FORM_AJAX_COMPLETED = exports.EVENT_FORM_AJAX_COMPLETED = 'flexcss.form.ajaxCompleted';
	
	/**
	 * A HTML5 Form Validation replacement
	 */
	
	var Form = (function (_DestroyableWidget) {
	    _inherits(Form, _DestroyableWidget);
	
	    /**
	     * @param {HTMLElement} form
	     * @param [options] optional options
	     */
	
	    function Form(form, options) {
	        _classCallCheck(this, Form);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Form).call(this));
	
	        if (!(form instanceof HTMLFormElement)) {
	            throw 'argument {0} form needs to be an form element';
	        }
	
	        /**
	         * The Form
	         * @type {HTMLElement}
	         */
	        _this.form = form;
	
	        /**
	         * @type {Tooltip}
	         */
	        _this.tooltips = null;
	
	        /**
	         * @type {Promise}
	         */
	        _this.currentValidationFuture = new Promise(function () {});
	
	        /**
	         * Default options
	         * @type {Object}
	         */
	        _this.options = {
	            // if true creates tooltips above element, uses FlexCss Tooltips
	            createTooltips: true,
	            // if true appends error message after input element
	            appendError: false,
	            // type of ajax submit
	            ajaxSubmitType: 'POST',
	            // json content type if ajax method is set to json
	            ajaxJsonContentType: 'application/json; charset=utf-8',
	            // allow inline validation
	            inlineValidation: true,
	            // validate in realtime (on `input` event)
	            realtime: true,
	            // timeout when realtime event should be captured
	            realtimeTimeout: 250,
	            // formatting method for an error
	            formatErrorTooltip: function formatErrorTooltip(error) {
	                return '<i class="icon-attention"></i> ' + error;
	            },
	            // the class that will be put on the element to mark it failed validation
	            inputErrorClass: 'invalid',
	            // the container class for error messages below an element
	            containerErrorClass: 'form-error',
	            // additional options for fetch
	            fetchOptions: {
	                credentials: 'include'
	            },
	            // the container for tooltips
	            tooltipContainer: form,
	            tooltipOptions: {
	                containerClass: 'error-tooltip'
	            },
	            // if you have a fixed header, either set a number or function here
	            scrollToElementDiff: 0
	        };
	
	        // overwrite default options
	        Object.assign(_this.options, options);
	
	        // apply settings from attributes
	        _Util2.default.applyOptionsFromElement(form, _this.options);
	
	        // set form class as widget
	        // Forms are very different to classical widgets,
	        // we will not use our base widget class for this but just self
	        form.hfWidgetInstance = _this;
	
	        /**
	         * A List of Validators
	         * @type {Object}
	         * @private
	         */
	        _this._validators = Form.globalValidators;
	
	        /**
	         * @type {Function}
	         * @private
	         */
	        _this._remoteValidationFunction = null;
	
	        _this.initFormValidation();
	        return _this;
	    }
	
	    _createClass(Form, [{
	        key: 'destroy',
	        value: function destroy() {
	            _get(Object.getPrototypeOf(Form.prototype), 'destroy', this).call(this);
	            if (this.tooltips) {
	                this.tooltips.destroy();
	            }
	        }
	
	        /**
	         * Submits this form, either via ajax or just classical (default)
	         * @param {HTMLFormElement} thisForm
	         * @param {Event} e
	         * @private
	         * @returns {Promise|boolean} returns false if submit is cancled
	         */
	
	    }, {
	        key: '_submitFunction',
	        value: function _submitFunction(thisForm, e) {
	            var shouldUseAjax = thisForm.getAttribute(REMOTE),
	                ajaxPostUrl = thisForm.getAttribute(REMOTE_ACTION) || thisForm.getAttribute('action') || window.location.href,
	                useJson = CONST_USE_JSON === shouldUseAjax,
	                self = this;
	
	            var ev = _Event2.default.dispatch(thisForm, EVENT_FORM_SUBMIT).withOriginal(e).fire();
	
	            // abort execution is event was prevented
	            if (ev.defaultPrevented) {
	                self._formStopLoading();
	                return false;
	            }
	
	            if (shouldUseAjax === null) {
	                // submit
	                return thisForm.submit();
	            }
	            // prevent form from submit normally
	            e.preventDefault();
	
	            // add information that this is an XMLHttpRequest request (used by some frameworks)
	            var defaultHeaders = {
	                'X-Requested-With': 'XMLHttpRequest'
	            };
	
	            // setup default headers
	            if (useJson) {
	                Object.assign(defaultHeaders, {
	                    'Content-Type': this.options.ajaxJsonContentType
	                });
	            }
	            var defaultOptions = Object.assign(this.options.fetchOptions, {
	                headers: defaultHeaders,
	                method: this.options.ajaxSubmitType
	            });
	
	            // support either JSON request payload or normal payload submission
	            var serverCall = useJson ? fetch(ajaxPostUrl, Object.assign(defaultOptions, {
	                body: JSON.stringify(this.serialize())
	            })) : fetch(ajaxPostUrl, Object.assign(defaultOptions, {
	                body: new FormData(thisForm)
	            }));
	
	            _Event2.default.dispatch(thisForm, EVENT_FORM_AFTER_AJAX_SUBMIT).withOriginal(e).fire();
	
	            return serverCall.then(function (r) {
	                (self._remoteValidationFunction || Form.globalRemoteValidationFunction).apply(self, [r]);
	
	                _Event2.default.dispatch(thisForm, EVENT_FORM_AJAX_COMPLETED).withOriginal(e).withDetail({ response: r }).fire();
	                // always remove error class
	                self._formStopLoading();
	            });
	        }
	
	        /**
	         * Serializes a form to a json object
	         * @returns {Object}
	         */
	
	    }, {
	        key: 'serialize',
	        value: function serialize() {
	            var selectors = ['input[name]:not([type="radio"]):enabled', 'input[type="radio"][name]:checked', 'select[name]:enabled', 'textarea[name]:enabled'],
	                inputs = this.form.querySelectorAll(selectors.join(',')),
	                result = {};
	
	            Array.prototype.forEach.call(inputs, function (input) {
	                var exists = result[input.name],
	                    value = input.value;
	                if (exists instanceof Array) {
	                    exists.push(value);
	                } else if (exists) {
	                    result[input.name] = [result[input.name], value];
	                } else {
	                    result[input.name] = value;
	                }
	            });
	
	            return result;
	        }
	
	        /**
	         * Handles the chain of validation on given fields
	         *
	         * @param {HTMLElement|Array|NodeList} field
	         * @param [focus] optional focus first error
	         * @returns {Promise}
	         */
	
	    }, {
	        key: 'handleValidation',
	        value: function handleValidation(field, focus) {
	            var _this2 = this;
	
	            var fields = field instanceof Array || field instanceof NodeList ? field : [field];
	            return this._handleValidation(fields, focus, true).then((function (r) {
	                if (!r.foundAnyError) {
	                    // remove tooltips
	                    if (_this2.tooltips) {
	                        _this2.tooltips.removeTooltip();
	                    }
	                }
	                return r;
	            }).bind(this));
	        }
	
	        /**
	         * Handles errors on given node list
	         * @param {NodeList} toValidateFields
	         * @param {boolean} focus
	         * @param {boolean} scoped if true, will only validate the fields `invalidFields`
	         * @returns {Promise}
	         * @private
	         */
	
	    }, {
	        key: '_handleValidation',
	        value: function _handleValidation(toValidateFields, focus, scoped) {
	            var self = this;
	            var arr = Form._createArrayFromInvalidFieldList(toValidateFields),
	                isLocalInvalid = arr.length > 0;
	            // focus must appear in the same frame for iOS devices
	            if (isLocalInvalid && focus) {
	                self._focusElement(arr[0]);
	            }
	            var validation = scoped ? this._customValidationsForElements(toValidateFields) : self.validateCustomFields();
	            return validation.then(function (r) {
	                if (isLocalInvalid) {
	                    // combine browser and custom validators
	                    r.foundAnyError = true;
	                }
	                // get a unique field list of all fields that need to be checked and rendered
	                // it's possible that we have duplicates in non scoped mode
	                var thisToValidateFields = scoped ? toValidateFields : Array.from(arr).concat(r.checkedFields);
	                r.checkedFields = thisToValidateFields;
	                var foundInvalidFields = self.prepareErrors(thisToValidateFields, false),
	                    firstInvalidField = foundInvalidFields[0];
	                if (firstInvalidField) {
	                    if (focus) {
	                        self._focusElement(firstInvalidField);
	                        // if element could not be focused:
	                        if (document.activeElement !== firstInvalidField) {
	                            self._handleTooltipHideClickAfterChange();
	                        }
	                    } else {
	                        self._handleTooltipHideClickAfterChange();
	                    }
	                    self.showAndOrCreateTooltip(firstInvalidField);
	                }
	                return r;
	            });
	        }
	
	        /**
	         * @param {HTMLElement} field
	         * @param {ValidityState} validity
	         * @returns {*}
	         * @private
	         */
	
	    }, {
	        key: '_setupErrorMessages',
	        value: function _setupErrorMessages(field, validity) {
	            return Form.globalErrorMessageHandler ? Form.globalErrorMessageHandler.apply(this, [field, validity]) : false;
	        }
	
	        /**
	         * Handles class labels for elements
	         * @param {Object} fields
	         * @private
	         */
	
	    }, {
	        key: '_handleLabels',
	        value: function _handleLabels(fields) {
	            Object.keys(fields).forEach((function (id) {
	                var labels = this.getForm().querySelectorAll('[for="' + id + '"]'),
	                    invalid = fields[id];
	                if (labels.length) {
	                    for (var labelsIndex = 0; labelsIndex < labels.length; labelsIndex++) {
	                        var labelEl = labels[labelsIndex];
	                        // we can't use toggle attribute, not supported in IE
	                        if (invalid) {
	                            this._markElementInvalid(labelEl);
	                        } else {
	                            this._markElementValid(labelEl);
	                        }
	                    }
	                }
	            }).bind(this));
	        }
	
	        /**
	         * @param el
	         * @private
	         */
	
	    }, {
	        key: '_markElementInvalid',
	        value: function _markElementInvalid(el) {
	            el.setAttribute(DATA_ELEMENT_INVALID, "true");
	            el.classList.add(this.options.inputErrorClass);
	        }
	
	        /**
	         * @param el
	         * @private
	         */
	
	    }, {
	        key: '_markElementValid',
	        value: function _markElementValid(el) {
	            el.removeAttribute(DATA_ELEMENT_INVALID);
	            el.classList.remove(this.options.inputErrorClass);
	        }
	
	        /**
	         * A List of invalid elements (:invalid)
	         * @returns {Array}
	         * @private
	         */
	
	    }, {
	        key: '_getInvalidElements',
	        value: function _getInvalidElements() {
	            return Array.prototype.filter.call(this.getForm().querySelectorAll(":invalid"), function (r) {
	                return !(r instanceof HTMLFieldSetElement);
	            });
	        }
	
	        /**
	         * @param {HTMLElement} thisParent
	         * @private
	         */
	
	    }, {
	        key: '_removeElementErrors',
	        value: function _removeElementErrors(thisParent) {
	            var errors = thisParent.querySelectorAll('.' + this.options.containerErrorClass),
	                inputsWithErrorClasses = thisParent.querySelectorAll('[' + DATA_ELEMENT_INVALID + ']');
	            for (var elementErrorIndex = 0; elementErrorIndex < errors.length; elementErrorIndex++) {
	                errors[elementErrorIndex].parentNode.removeChild(errors[elementErrorIndex]);
	            }
	            for (var inputErrorIndex = 0; inputErrorIndex < inputsWithErrorClasses.length; inputErrorIndex++) {
	                var el = inputsWithErrorClasses[inputErrorIndex];
	                this._markElementValid(el);
	            }
	        }
	
	        /**
	         * Registers a custom validator
	         * @param {String} name
	         * @param {Function} validator a validation function should always return either a Future(true) or Future(false)
	         * even when the field has been invalidated with `setCustomValidity`, because of different browser `bugs`
	         * we can't rely on that
	         * @returns {Form}
	         */
	
	    }, {
	        key: 'registerValidator',
	        value: function registerValidator(name, validator) {
	            this._validators[name] = validator;
	            return this;
	        }
	
	        /**
	         * Runs async validation
	         * @param {String} validationRef
	         * @param {HTMLElement} field
	         * @returns {Promise}
	         * @private
	         */
	
	    }, {
	        key: '_runValidation',
	        value: function _runValidation(validationRef, field) {
	            if (!this._validators[validationRef]) {
	                throw 'Could not found validator: ' + validationRef;
	            }
	            var cl = field.classList,
	                future = this._validators[validationRef].apply(this, [field, this.form]);
	            cl.add(LOADING_CLASS);
	            future.then(function () {
	                cl.remove(LOADING_CLASS);
	            });
	            return future;
	        }
	
	        /**
	         * Run custom validations for elements, validations are done async do support XHR Requests or other stuff
	         *
	         * @param {Array|NodeList} fields
	         * @returns {Promise} contains either true if validations passed or false if something went wrong
	         * @private
	         */
	
	    }, {
	        key: '_customValidationsForElements',
	        value: function _customValidationsForElements(fields) {
	            var futures = [],
	                fieldsLength = fields.length,
	                checkedFields = [];
	            for (var iVal = 0; iVal < fieldsLength; iVal++) {
	                var field = fields[iVal],
	                    validationRef = field.getAttribute(ATTR_VALIDATOR),
	                    validity = field.validity;
	                if (this._validators[validationRef]) {
	                    // use local validation first and then continue with custom validations
	                    if (Form._shouldNotValidateField(field) || validity && !validity.customError && !validity.valid) {
	                        continue;
	                    }
	                    checkedFields.push(field);
	                    futures.push(this._runValidation(validationRef, field));
	                } else {
	                    if (validationRef) {
	                        console.warn('data-validate was set but no validator was found');
	                    }
	                }
	            }
	            return Promise.all(futures).then(function (allFutures) {
	                var l = allFutures.length;
	                var result = {
	                    checkedFields: checkedFields,
	                    foundAnyError: false
	                };
	                for (var fI = 0; fI < l; fI++) {
	                    if (!allFutures[fI]) {
	                        result.foundAnyError = true;
	                        break;
	                    }
	                }
	                return result;
	            });
	        }
	
	        /**
	         * Remove all errors for this form
	         * @returns {Form}
	         */
	
	    }, {
	        key: 'removeErrors',
	        value: function removeErrors() {
	            this._removeElementErrors(this.form);
	            if (this.tooltips) {
	                this.tooltips.removeTooltip();
	            }
	            return this;
	        }
	
	        /**
	         * Will handle errors for given fields
	         * @param {Array|NodeList} fields
	         * @param {Boolean} removeAllErrors
	         */
	
	    }, {
	        key: 'prepareErrors',
	        value: function prepareErrors(fields, removeAllErrors) {
	            if (removeAllErrors) {
	                this.removeErrors();
	            }
	            var labelGroups = {},
	                invalidFields = [];
	
	            function handleAdditionalLabels(isInvalid, thisLabelGroup, field) {
	                var additionalLabels = field.getAttribute(ATTR_DATA_CUSTOM_LABEL) || field.id,
	                    group = thisLabelGroup[additionalLabels];
	                if (additionalLabels) {
	                    // check additionally if field is currently marked as invalid
	                    // so the label is not marked as error if no field is marked as one
	                    group = group ? group : isInvalid;
	                    thisLabelGroup[additionalLabels] = group;
	                }
	            }
	
	            // We save all validations in an extra property because we need to reset the validity due some
	            // implementation errors in other browsers then chrome
	            for (var i = 0; i < fields.length; i++) {
	                var field = fields[i],
	                    errorTarget = Form._findErrorTarget(field),
	                    parent = errorTarget.parentNode,
	                    validity = field.validity,
	                    isInvalid = validity && !validity.valid;
	                if (Form._shouldNotValidateField(field)) {
	                    continue;
	                }
	                field.flexFormsSavedValidity = JSON.parse(JSON.stringify(validity));
	                handleAdditionalLabels(isInvalid, labelGroups, field);
	                if (isInvalid) {
	                    if (!removeAllErrors) {
	                        // Remove current errors:
	                        this._removeElementErrors(parent);
	                    }
	                    // setup custom error messages:
	                    this._setupErrorMessages(field, validity);
	                    var msg = field.validationMessage;
	
	                    // mark fields as invalid
	                    this._markElementInvalid(errorTarget);
	                    this._markElementInvalid(field);
	
	                    if (this.options.appendError) {
	                        parent.insertAdjacentHTML("beforeend", '<div class="' + this.options.containerErrorClass + '">' + msg + '</div>');
	                    }
	                    invalidFields.push(field);
	                    field.flexFormsSavedValidationMessage = msg;
	                } else {
	                    // restore invalid fields
	                    this._markElementValid(errorTarget);
	                    this._markElementValid(field);
	
	                    // cleanup
	                    delete field.flexFormsSavedValidationMessage;
	
	                    // remove error markup
	                    this._removeElementErrors(parent);
	                }
	                // We have to reset the custom validity here to allow native validations work again
	                field.setCustomValidity('');
	            }
	            // if validates a single field we need to check the linked fields to a label:
	            if (fields.length === 1) {
	                var field = fields[0];
	                var id = field.getAttribute(ATTR_DATA_CUSTOM_LABEL) || field.id;
	                if (id) {
	                    var linkedFields = Array.from(this.getForm().querySelectorAll('[' + ATTR_DATA_CUSTOM_LABEL + '="' + id + '"], #' + id));
	                    linkedFields.forEach((function (thisField) {
	                        var validity = thisField.validity,
	                            isInvalid = validity && !validity.valid && this._isElementInvalidElement(thisField);
	                        handleAdditionalLabels(isInvalid, labelGroups, thisField);
	                    }).bind(this));
	                }
	            }
	            this._handleLabels(labelGroups);
	            return invalidFields;
	        }
	
	        /**
	         * Validates all custom fields
	         * @returns {Promise}
	         */
	
	    }, {
	        key: 'validateCustomFields',
	        value: function validateCustomFields() {
	            return this._customValidationsForElements(this.form.querySelectorAll("[data-validate]"));
	        }
	
	        /**
	         * Tests if a field should be validated
	         * @param {HTMLElement} field
	         * @returns {boolean}
	         * @private
	         */
	
	    }, {
	        key: 'getForm',
	
	        /**
	         * This form
	         * @returns {HTMLElement}
	         */
	        value: function getForm() {
	            return this.form;
	        }
	
	        /**
	         * Registers a function that handles remote validation
	         * @param {Function} func
	         * @returns {Form}
	         */
	
	    }, {
	        key: 'registerRemoteValidation',
	        value: function registerRemoteValidation(func) {
	            this._remoteValidationFunction = func;
	            return this;
	        }
	
	        /**
	         * Formats the error content for the tooltip
	         * @param {String} error
	         * @returns {String}
	         * @private
	         */
	
	    }, {
	        key: '_formatErrorTooltip',
	        value: function _formatErrorTooltip(error) {
	            return this.options.formatErrorTooltip.apply(this, [error]);
	        }
	
	        /**
	         * Tries to find a custom error target on given target
	         * @param target
	         * @returns {HTMLElement}
	         * @private
	         */
	
	    }, {
	        key: 'showAndOrCreateTooltip',
	
	        /**
	         * Creates a tooltip at given element, will only create a new instance if not created
	         * @param {HTMLElement} target
	         * @param {Boolean} [remove]
	         */
	        value: function showAndOrCreateTooltip(target, remove) {
	            var self = this;
	            if (!this.tooltips && this.options.createTooltips) {
	                this.tooltips = new _Tooltip2.default(this.options.tooltipContainer, this.options.tooltipOptions);
	            }
	            if (!this.options.createTooltips) {
	                return false;
	            }
	
	            if (!target.flexFormsSavedValidity) {
	                return false;
	            }
	            var errorTarget = Form._findErrorTarget(target);
	            if (!target.flexFormsSavedValidity.valid && self._isElementInvalidElement(errorTarget)) {
	                self.tooltips.createTooltip(errorTarget, self._formatErrorTooltip(target.flexFormsSavedValidationMessage), false);
	                return true;
	            } else {
	                if (remove) {
	                    self.tooltips.removeTooltip();
	                }
	            }
	            return false;
	        }
	
	        /**
	         * Checks if element is marked as invalid
	         * @param {HTMLElement} el
	         * @returns {boolean}
	         * @private
	         */
	
	    }, {
	        key: '_isElementInvalidElement',
	        value: function _isElementInvalidElement(el) {
	            return el.hasAttribute(DATA_ELEMENT_INVALID);
	        }
	
	        /**
	         * Handles invalid event of a form
	         * @param {Event} e
	         * @returns {Promise|boolean}
	         * @private
	         */
	
	    }, {
	        key: '_checkIsInvalid',
	        value: function _checkIsInvalid(e) {
	            e.preventDefault();
	            var invalidFields = this.getForm().querySelectorAll(":invalid");
	            return this._handleValidation(invalidFields, true, false);
	        }
	
	        /**
	         * Will query dependent fields (by selector) that should be validated with given field
	         * @param field
	         * @returns {NodeList|[]}
	         * @private
	         */
	
	    }, {
	        key: '_getDependentFields',
	        value: function _getDependentFields(field) {
	            var fieldSelector = field.getAttribute(ATTR_DEPENDS),
	                base = [field];
	            if (fieldSelector) {
	                base.push.apply(base, Array.prototype.slice.apply(this.getForm().querySelectorAll(fieldSelector)));
	            }
	            return base;
	        }
	
	        /**
	         * @private
	         * @param {HTMLElement} [target]
	         */
	
	    }, {
	        key: '_handleTooltipInline',
	        value: function _handleTooltipInline(target) {
	            if (this.tooltips) {
	                this.tooltips.removeTooltip(target);
	            }
	        }
	
	        /**
	         * Initializes validation for a given form, registers event handlers
	         */
	
	    }, {
	        key: 'initFormValidation',
	        value: function initFormValidation() {
	            var _this3 = this;
	
	            // Suppress the default bubbles
	            var form = this.getForm(),
	                self = this,
	                invalidEvent = 'invalid';
	
	            /**
	             * Validates if is valid realtime element
	             * @param {HTMLElement} target
	             * @returns {boolean}
	             * @private
	             */
	            function _checkIsValidRealtimeElement(target) {
	                return !target.hasAttribute(ATTR_DISABLE_REALTIME) && !target.hasAttribute(ATTR_DISABLE_INLINE);
	            }
	
	            form.addEventListener(invalidEvent, function (e) {
	                e.preventDefault();
	            }, true);
	
	            _Util2.default.addEventOnce(invalidEvent, form, function handleInvalid(e) {
	                self._formLoading();
	                var result = self._checkIsInvalid(e);
	                if (result) {
	                    self.currentValidationFuture = new Promise(function (resolve) {
	                        result.then(function (r) {
	                            setTimeout(function () {
	                                _Util2.default.addEventOnce(invalidEvent, form, handleInvalid, true);
	                            }, 0);
	                            resolve(r);
	                            self._formStopLoading();
	                            if (!r.foundAnyError) {
	                                self._formLoading();
	                                self._handleSubmit(e);
	                            }
	                        });
	                    });
	                }
	            }, true);
	
	            this.addEventListener(form, 'reset', function () {
	                _this3.removeErrors();
	            });
	
	            // Timeout for keys:
	            var TIMEOUT_KEYDOWN,
	                KEYDOWN_RUNNING = false;
	
	            // resets keydown events
	            function clearKeyDownTimeout() {
	                KEYDOWN_RUNNING = false;
	                clearTimeout(TIMEOUT_KEYDOWN);
	            }
	
	            // setup custom realtime event if given
	            if (self.options.realtime) {
	                this.addEventListener(form, CONST_REALTIME_EVENT, function (e) {
	                    if (self._formIsLoading()) {
	                        return;
	                    }
	                    var target = e.target;
	                    clearTimeout(TIMEOUT_KEYDOWN);
	                    if (KEYDOWN_RUNNING) {
	                        return;
	                    }
	                    TIMEOUT_KEYDOWN = setTimeout(function () {
	                        var isStillTarget = document.activeElement === e.target;
	                        if (!_checkIsValidRealtimeElement(target)) {
	                            return;
	                        }
	                        if (isStillTarget) {
	                            self._handleTooltipInline();
	                        }
	                        KEYDOWN_RUNNING = true;
	                        var dependentFields = self._getDependentFields(target);
	                        self._customValidationsForElements(dependentFields).then(function () {
	                            self.prepareErrors(dependentFields, false);
	                            if (isStillTarget) {
	                                self.showAndOrCreateTooltip(e.target);
	                            }
	                            // future must be resolved before another event can be started
	                            KEYDOWN_RUNNING = false;
	                        });
	                    }, self.options.realtimeTimeout);
	                }, true);
	            }
	
	            /**
	             * Validates if target is a valid input field to check blur and focus events
	             *
	             * @param {HTMLElement} target
	             * @returns {boolean}
	             * @private
	             */
	            function _checkIsValidBlurFocusElement(target) {
	                var attr = target.getAttribute("type");
	                return attr !== "radio" && attr !== "checkbox" && attr !== "submit";
	            }
	
	            /**
	             * Validates if is valid inline-check element
	             * @param {HTMLElement} target
	             * @returns {boolean}
	             * @private
	             */
	            function _checkIsValidInlineCheckElement(target) {
	                return !target.hasAttribute(ATTR_DISABLE_INLINE);
	            }
	
	            this.addEventListener(form, 'blur', function (e) {
	                // do not hide tooltip after change event
	                if (!e.target.flexcssKeepTooltips) {
	                    self._handleTooltipInline(e.target);
	                }
	                delete e.target.flexcssKeepTooltips;
	            }, true);
	
	            // handle focus on input elements
	            // will show an error if field is invalid
	            this.addEventListener(form, "focus", function (e) {
	                if (self._formIsLoading()) {
	                    return;
	                }
	                // do not track errors for checkbox and radios on focus:
	                if (!_checkIsValidBlurFocusElement(e.target)) {
	                    return;
	                }
	                // we need to delay this a little, because Firefox and Safari do not show a tooltip after it
	                // just have been hidden (on blur). Maybe fix this with a queue later
	                setTimeout(function () {
	                    self.showAndOrCreateTooltip(e.target);
	                }, FOCUS_TOOLTIP_DELAY);
	            }, true);
	
	            if (self.options.inlineValidation) {
	                // Handle change for checkbox, radios and selects
	                this.addEventListener(form, "change", function (e) {
	                    var target = e.target;
	                    if (self._formIsLoading() || !_checkIsValidInlineCheckElement(target)) {
	                        return;
	                    }
	                    clearKeyDownTimeout();
	                    var name = target.getAttribute('name');
	                    var inputs = name ? form.querySelectorAll('[name="' + name + '"]') : [target];
	                    // we only support dependent fields for a single widgets right now
	                    if (inputs.length === 1) {
	                        inputs = self._getDependentFields(target);
	                    }
	                    self._customValidationsForElements(inputs).then(function () {
	                        self.prepareErrors(inputs, false);
	                        target.flexcssKeepTooltips = self.showAndOrCreateTooltip(target, true);
	                        if (target.flexcssKeepTooltips) {
	                            self._handleTooltipHideClickAfterChange();
	                        }
	                    });
	                });
	            }
	
	            // prevent default if form is invalid
	            this.addEventListener(form, "submit", function listener(e) {
	                self._submitListener(e, listener);
	            });
	
	            _Event2.default.dispatchAndFire(form, EVENT_FORM_READY);
	        }
	
	        /* Loading states, unfortunately we can't check if a promise is pending :/*/
	        /* TODO: Maybe wrap promise to extend this functionality */
	
	    }, {
	        key: '_formLoading',
	        value: function _formLoading() {
	            this.getForm().classList.add(LOADING_CLASS);
	        }
	    }, {
	        key: '_formStopLoading',
	        value: function _formStopLoading() {
	            this.getForm().classList.remove(LOADING_CLASS);
	        }
	    }, {
	        key: '_formIsLoading',
	        value: function _formIsLoading() {
	            return this.getForm().classList.contains(LOADING_CLASS);
	        }
	
	        // this defines the logic after a change event when a tooltip is shown
	        // because we call this method inside the change event, the click would be immeditally executed with the change
	        // event when not using setTimeout(). There might be another solution for this...
	
	    }, {
	        key: '_handleTooltipHideClickAfterChange',
	        value: function _handleTooltipHideClickAfterChange() {
	            var self = this;
	            if (this.options.createTooltips) {
	                setTimeout(function () {
	                    _Util2.default.addEventOnce(_Settings2.default.getTabEvent(), global.document.body, function (t) {
	                        if (!self._isElementInvalidElement(t.target)) {
	                            self._handleTooltipInline();
	                        }
	                    });
	                }, CLICK_TOOLTIP_DELAY);
	            }
	        }
	    }, {
	        key: '_focusElement',
	        value: function _focusElement(el) {
	            el.focus();
	            _Util2.default.scrollToElement(el, this.options.scrollToElementDiff);
	        }
	
	        /**
	         * Listener that is executed on form submit
	         * @param e
	         * @param submitListener
	         * @returns {boolean}
	         * @private
	         */
	
	    }, {
	        key: '_submitListener',
	        value: function _submitListener(e, submitListener) {
	
	            var form = this.getForm(),
	                self = this,
	                submitEvent = 'submit';
	
	            if (this._formIsLoading()) {
	                e.preventDefault();
	                return false;
	            }
	            this._formLoading();
	            form.removeEventListener(submitEvent, submitListener);
	            this.removeErrors();
	            e.preventDefault();
	            // reset:
	            if (form.checkValidity()) {
	                form.addEventListener(submitEvent, submitListener);
	                // It's possible that the form is valid but the custom validations need to be checked again:
	                self.currentValidationFuture = new Promise(function (resolve) {
	                    var validation = self.validateCustomFields();
	                    validation.then(function (r) {
	                        // because custom validators may mark multiple fields as invalid, we get all of them in the form
	                        var fields = self._getInvalidElements(),
	                            errors = self.prepareErrors(fields, false),
	                            firstError = errors[0];
	                        if (firstError) {
	                            self._focusElement(firstError);
	                            self.showAndOrCreateTooltip(firstError, true);
	                        }
	                        resolve(r);
	                    });
	                });
	                self.currentValidationFuture.then(function (r) {
	                    if (!r.foundAnyError) {
	                        // Handle submitting the form to server:
	                        self._handleSubmit(e);
	                    } else {
	                        self._formStopLoading();
	                    }
	                });
	            } else {
	                self._formStopLoading();
	                form.addEventListener(submitEvent, submitListener);
	            }
	        }
	
	        /**
	         * Handles submitting, optionally allows to stop submitting
	         * @param e
	         * @private
	         */
	
	    }, {
	        key: '_handleSubmit',
	        value: function _handleSubmit(e) {
	            this._submitFunction(this.form, e);
	        }
	
	        /**
	         * Registers a global event Handler
	         * @param errorFunc
	         */
	
	    }], [{
	        key: '_shouldNotValidateField',
	        value: function _shouldNotValidateField(field) {
	            var target = Form._findErrorTarget(field);
	            return target instanceof HTMLFieldSetElement || field.validity === undefined || target.hasAttribute(ATTR_VALIDATE_VISIBILITY) && !_Util2.default.isVisible(target);
	        }
	
	        /**
	         * Creates an array from a node list with invalid items
	         * This Method expicitly checks if field should not be validated so it can be used to foucs a field
	         * @param list
	         * @returns {Array}
	         * @private
	         */
	
	    }, {
	        key: '_createArrayFromInvalidFieldList',
	        value: function _createArrayFromInvalidFieldList(list) {
	            var arr = [];
	            for (var i = 0; i < list.length; ++i) {
	                var n = list[i];
	                if (n.validity && !n.validity.valid) {
	                    if (!Form._shouldNotValidateField(n)) {
	                        arr.push(n);
	                    }
	                }
	            }
	            return arr;
	        }
	    }, {
	        key: '_findErrorTarget',
	        value: function _findErrorTarget(target) {
	            var el = target.getAttribute(ATTR_ERROR_TARGET_ID) || target,
	                foundTarget = el instanceof HTMLElement ? el : global.document.getElementById(el);
	            if (!foundTarget) {
	                throw 'Given error target did not exsits:' + target;
	            }
	            return foundTarget;
	        }
	    }, {
	        key: 'registerErrorMessageHandler',
	        value: function registerErrorMessageHandler(errorFunc) {
	            Form.globalErrorMessageHandler = errorFunc;
	        }
	
	        /**
	         * Initialize forms for a specific selector
	         * @param {String} selector
	         * @param {Object} [options]
	         * @return {array.<Form>}
	         */
	
	    }, {
	        key: 'init',
	        value: function init(selector, options) {
	            var forms = selector instanceof HTMLElement ? selector.querySelectorAll('form') : document.querySelectorAll(selector),
	                instances = [];
	            for (var i = 0; i < forms.length; i++) {
	                instances.push(new Form(forms[i], options));
	            }
	            return instances;
	        }
	
	        /**
	         * Registers a global validator that is usable on all form instances
	         * @param {String} name
	         * @param {Function} validator
	         * @returns {Function}
	         */
	
	    }, {
	        key: 'registerValidator',
	        value: function registerValidator(name, validator) {
	            Form.globalValidators[name] = validator;
	            return Form;
	        }
	
	        /**
	         * Registers a global function that is called when a form should validate the response of a server
	         * @param {Function} func
	         * @returns {Form}
	         */
	
	    }, {
	        key: 'registerGlobalRemoteValidationFunction',
	        value: function registerGlobalRemoteValidationFunction(func) {
	            Form.globalRemoteValidationFunction = func;
	            return Form;
	        }
	    }]);
	
	    return Form;
	})(_DestroyableWidget3.default);
	
	/**
	 * Global validators
	 * @type {Array}
	 */
	
	Form.globalValidators = [];
	
	/**
	 * Global Remote validation function
	 */
	Form.globalRemoteValidationFunction = function () {};
	
	/**
	 * Handles custom error messages extracts custom message by default
	 */
	Form.globalErrorMessageHandler = function (field, validity) {
	    if (!validity.customError) {
	        var customMsg = field.getAttribute(ATTR_DATA_CUSTOM_MESSAGE);
	        if (customMsg) {
	            field.setCustomValidity(customMsg);
	        }
	    }
	};
	
	exports.default = Form;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _Util = __webpack_require__(99);
	
	var _Util2 = _interopRequireDefault(_Util);
	
	var _DestroyableWidget2 = __webpack_require__(100);
	
	var _DestroyableWidget3 = _interopRequireDefault(_DestroyableWidget2);
	
	var _Settings = __webpack_require__(101);
	
	var _Settings2 = _interopRequireDefault(_Settings);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * The MIT License (MIT)
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (c) 2015 David Heidrich, BowlingX <me@bowlingx.com>
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Permission is hereby granted, free of charge, to any person obtaining a copy
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * of this software and associated documentation files (the "Software"), to deal
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * in the Software without restriction, including without limitation the rights
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * copies of the Software, and to permit persons to whom the Software is
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * furnished to do so, subject to the following conditions:
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * The above copyright notice and this permission notice shall be included in
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * all copies or substantial portions of the Software.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * THE SOFTWARE.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	
	/*!
	 * FlexCss.Tooltip
	 * Licensed under the MIT License (MIT)
	 * Copyright (c) 2015 David Heidrich, BowlingX <me@bowlingx.com>
	 */
	
	/**
	 * @type {string}
	 */
	var CLASS_NAMES_TOOLTIP = 'tooltip-container';
	/**
	 * @type {string}
	 */
	var CLASS_NAMES_OPEN = 'open';
	
	/**
	 * @type {string}
	 */
	var ATTR_DATA_CLASSNAME = 'data-class';
	
	/**
	 * @type {string}
	 */
	var ATTR_DATA_NO_TOUCH = 'data-no-touch';
	
	/**
	 * @type {HTMLDocument}
	 */
	var doc = global.document;
	
	/**
	 * Simple Tooltip
	 */
	
	var Tooltip = (function (_DestroyableWidget) {
	    _inherits(Tooltip, _DestroyableWidget);
	
	    /**
	     * Creates a Tooltip
	     * @param {HTMLElement|String} DelegateContainer
	     * @param {Object} [options]
	     */
	
	    function Tooltip(DelegateContainer, options) {
	        _classCallCheck(this, Tooltip);
	
	        /**
	         * The Container where possible events are captured
	         */
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Tooltip).call(this));
	
	        _this.container = DelegateContainer instanceof HTMLElement ? DelegateContainer : doc.getElementById(DelegateContainer);
	
	        if (!_this.container) {
	            throw new Error('Could not create Tooltip, DelegateContainer not found');
	        }
	
	        /**
	         * The Container where tooltips are stored for this instance
	         * @type {HTMLElement}
	         */
	        _this.tooltipContainer = null;
	
	        /**
	         * Default Options
	         */
	        _this.options = {
	            containerClass: '',
	            selectorAttribute: 'data-tooltip',
	            collisionContainer: _this.container
	        };
	
	        Object.assign(_this.options, options || {});
	        return _this;
	    }
	
	    /**
	     * Creates and shows a tooltip
	     * @param {HTMLElement} target where is this tooltip positioned
	     * @param {String} text text content in tooltip, will be NOT escaped
	     * @param {Boolean} [removeTitle] removes title element if given
	     * @param {Node} [positionRelative]
	     */
	
	    _createClass(Tooltip, [{
	        key: 'createTooltip',
	        value: function createTooltip(target, text, removeTitle, positionRelative) {
	            // abort if text is empty
	            if (!text || text && text.trim() === '') {
	                return;
	            }
	
	            if (_Settings2.default.isTouchDevice() && target && target.hasAttribute(ATTR_DATA_NO_TOUCH)) {
	                return;
	            }
	
	            var tooltipContainer = this.tooltipContainer;
	
	            if (!tooltipContainer) {
	                tooltipContainer = doc.createElement('div');
	                this.container.appendChild(tooltipContainer);
	                this.tooltipContainer = tooltipContainer;
	            }
	            this._restoreClassNames(tooltipContainer, target);
	
	            tooltipContainer.style.left = 'auto';
	            tooltipContainer.style.top = 'auto';
	            tooltipContainer.innerHTML = text;
	            tooltipContainer.flexTooltipCurrentTarget = target;
	            if (removeTitle) {
	                target.oldTitle = text;
	                target.removeAttribute('title');
	            }
	
	            _Util2.default.setupPositionNearby(positionRelative || target, tooltipContainer, this.options.collisionContainer, true, true);
	
	            tooltipContainer.classList.add(CLASS_NAMES_OPEN);
	        }
	    }, {
	        key: '_restoreClassNames',
	        value: function _restoreClassNames(container, target) {
	            // allow additional classname per tooltip on target element
	            var classNames = [CLASS_NAMES_TOOLTIP, this.options.containerClass];
	            var maybeTargetClass = target.getAttribute(ATTR_DATA_CLASSNAME);
	            if (maybeTargetClass) {
	                classNames.push(maybeTargetClass);
	            }
	            container.className = classNames.join(" ");
	            return this;
	        }
	
	        /**
	         * @returns {HTMLElement|null}
	         */
	
	    }, {
	        key: 'getCurrentTarget',
	        value: function getCurrentTarget() {
	            return this.tooltipContainer ? this.tooltipContainer.flexTooltipCurrentTarget : null;
	        }
	
	        /**
	         * Destroys this Widget
	         * @returns {boolean}
	         */
	
	    }, {
	        key: 'destroy',
	        value: function destroy() {
	            _get(Object.getPrototypeOf(Tooltip.prototype), 'destroy', this).call(this);
	
	            if (this.tooltipContainer) {
	                this.tooltipContainer.parentNode.removeChild(this.tooltipContainer);
	                return true;
	            }
	            return false;
	        }
	
	        /**
	         * Removes a Tooltip on given target
	         * @param {HTMLElement} [target], if not given will remove current open tooltip on this instance
	         */
	
	    }, {
	        key: 'removeTooltip',
	        value: function removeTooltip(target) {
	            var selfTarget = target;
	            if (!selfTarget && this.tooltipContainer) {
	                selfTarget = this.tooltipContainer.flexTooltipCurrentTarget;
	            }
	            if (this.tooltipContainer) {
	                if (this.tooltipContainer.flexTooltipCurrentTarget !== selfTarget) {
	                    return;
	                }
	                this.tooltipContainer.classList.remove(CLASS_NAMES_OPEN);
	                delete this.tooltipContainer.flexTooltipCurrentTarget;
	            }
	            if (selfTarget && selfTarget.oldTitle) {
	                selfTarget.setAttribute('title', selfTarget.oldTitle);
	            }
	        }
	
	        /**
	         * Initilizes mouse events on container element
	         */
	
	    }, {
	        key: 'registerEvents',
	        value: function registerEvents() {
	            var self = this;
	            this.addEventListener(this.container, 'mouseover', function (e) {
	                if (e.target.hasAttribute(self.options.selectorAttribute)) {
	                    self.createTooltip(e.target, e.target.getAttribute('title'), true);
	                }
	            });
	
	            this.addEventListener(this.container, 'mouseout', function (e) {
	                if (e.target.hasAttribute(self.options.selectorAttribute)) {
	                    self.removeTooltip(e.target);
	                }
	            });
	            return this;
	        }
	    }]);
	
	    return Tooltip;
	})(_DestroyableWidget3.default);
	
	exports.default = Tooltip;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 99 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/*
	 * The MIT License (MIT)
	 *
	 * Copyright (c) 2015 David Heidrich, BowlingX <me@bowlingx.com>
	 *
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:
	 *
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 *
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	 */
	
	var PFX = ["webkit", "moz", "MS", "o", ""];
	
	var COL_LEFT_CLASS = 'is-collision-left';
	
	var COL_RIGHT_CLASS = 'is-collision-right';
	
	var COL_BOTTOM_CLASS = 'is-collision-bottom';
	
	/**
	 * Provides shared DOM-Utility functions
	 */
	
	var Util = (function () {
	    function Util() {
	        _classCallCheck(this, Util);
	    }
	
	    _createClass(Util, null, [{
	        key: "prefixedAnimateEvent",
	
	        /**
	         * Will register the right animation event based on browser
	         * @param element
	         * @param type
	         * @param callback
	         */
	        value: function prefixedAnimateEvent(element, type, callback) {
	            var thisFunction = function thisFunction(e) {
	                callback.apply(element, [e, thisFunction]);
	            };
	
	            for (var p = 0; p < PFX.length; p++) {
	                var thisType = type;
	                if (!PFX[p]) {
	                    thisType = type.toLowerCase();
	                }
	                var name = PFX[p] + thisType;
	                element.addEventListener(name, thisFunction, true);
	            }
	        }
	
	        /**
	         * Get correct transitionend event
	         * @returns {String}
	         * @private
	         */
	
	    }, {
	        key: "whichTransitionEndEvent",
	        value: function whichTransitionEndEvent() {
	            var t = undefined;
	            var el = document.createElement('fake');
	
	            var transitions = {
	                'transition': 'transitionend',
	                'OTransition': 'oTransitionEnd',
	                'MozTransition': 'transitionend',
	                'WebkitTransition': 'webkitTransitionEnd'
	            };
	
	            for (t in transitions) {
	                if (el.style[t] !== undefined) {
	                    return transitions[t];
	                }
	            }
	        }
	
	        /**
	         * Check if target is part of parent node
	         * @param target
	         * @param parent
	         * @returns {boolean}
	         */
	
	    }, {
	        key: "isPartOfNode",
	        value: function isPartOfNode(target, parent) {
	            if (!target || !parent) {
	                return false;
	            }
	            var now = target;
	            while (now !== parent && now !== null) {
	                if (now === parent) {
	                    break;
	                }
	                now = now.parentNode;
	            }
	            return now !== null;
	        }
	
	        /**
	         * Walks the tree until func returns true for given argument
	         * @param target
	         * @param func
	         * @returns {boolean|HTMLElement}
	         */
	
	    }, {
	        key: "parentsUntil",
	        value: function parentsUntil(target, func) {
	            if (!target) {
	                return false;
	            }
	            var now = target;
	            while (!func(now) && now !== null) {
	                now = now.parentNode;
	            }
	
	            return now;
	        }
	
	        /**
	         * Generates a unique id
	         * @return {String}
	         */
	
	    }, {
	        key: "guid",
	        value: function guid() {
	            function s4() {
	                return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
	            }
	
	            return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
	        }
	
	        /**
	         * Detects scrollbar width
	         * @see http://stackoverflow.com/questions/986937/how-can-i-get-the-browsers-scrollbar-sizes
	         * @returns {number}
	         */
	
	    }, {
	        key: "getScrollBarWidth",
	        value: function getScrollBarWidth() {
	            var doc = global.document;
	            var inner = doc.createElement('p');
	
	            inner.style.width = "100%";
	            inner.style.height = "200px";
	
	            var outer = doc.createElement('div');
	            outer.style.position = "absolute";
	            outer.style.top = "0px";
	            outer.style.left = "0px";
	            outer.style.visibility = "hidden";
	            outer.style.width = "200px";
	            outer.style.height = "150px";
	            outer.style.overflow = "hidden";
	            outer.appendChild(inner);
	
	            doc.body.appendChild(outer);
	            var w1 = inner.offsetWidth;
	            outer.style.overflow = 'scroll';
	            var w2 = inner.offsetWidth;
	            if (w1 === w2) {
	                w2 = outer.clientWidth;
	            }
	            doc.body.removeChild(outer);
	
	            return w1 - w2;
	        }
	
	        /**
	         * Run an event once
	         * @param {String} ev
	         * @param {HTMLElement|HTMLDocument} target
	         * @param {Function} func
	         * @param {boolean} [capture]
	         * @return Function created listener
	         */
	
	    }, {
	        key: "addEventOnce",
	        value: function addEventOnce(ev, target, func, capture) {
	            var thisFunction = function thisFunction(event) {
	                func(event, func);
	                target.removeEventListener(ev, thisFunction, capture);
	            };
	            target.addEventListener(ev, thisFunction, capture);
	            return thisFunction;
	        }
	
	        /**
	         * Checks if an element is visible
	         * @param {HTMLElement} element
	         * @returns bool
	         */
	
	    }, {
	        key: "isVisible",
	        value: function isVisible(element) {
	            return element.offsetWidth > 0 && element.offsetHeight > 0;
	        }
	
	        /**
	         * Creates a camelCaseRepresentation of a dashed string
	         * @param {String} str
	         * @returns String
	         */
	
	    }, {
	        key: "dashToCamelCase",
	        value: function dashToCamelCase(str) {
	            return str.replace(/-([a-z])/g, function (g) {
	                return g[1].toUpperCase();
	            });
	        }
	
	        /**
	         * Creates a copy of `input`
	         * @param {*} input
	         * @return *
	         */
	
	    }, {
	        key: "copy",
	        value: function copy(input) {
	            return JSON.parse(JSON.stringify(input));
	        }
	
	        /**
	         * Reads options from element (data attributes) and applies to base
	         * @param {HTMLElement} element
	         * @param {Object} base
	         * @return {Object}
	         */
	
	    }, {
	        key: "applyOptionsFromElement",
	        value: function applyOptionsFromElement(element, base) {
	            if (!element) {
	                return base;
	            }
	            var attrs = element.attributes;
	            for (var i = 0; i < attrs.length; i++) {
	                var attr = attrs[i];
	                if (attr) {
	                    var s = Util.dashToCamelCase(attr.nodeName.replace('data-', ''));
	                    var val = attr.nodeValue;
	                    if (base.hasOwnProperty(s)) {
	                        // skip functions
	                        if (typeof base[s] === 'function') {
	                            continue;
	                        }
	                        if (typeof base[s] === 'boolean') {
	                            base[s] = parseInt(val || 1, 10) === 1;
	                        } else {
	                            base[s] = val;
	                        }
	                    }
	                }
	            }
	            return base;
	        }
	
	        /**
	         * Will position an element directly at given target
	         * Is aware of a given collision container to detect edges
	         * Will put elementToPosition either to left, center or right edge (prefer right)
	         *  and either to bottom or top (prefers bottom)
	         *
	         * You may overwrite preferred positioned with `centerHorizontal` and `positionTop`
	         *
	         * @param {HTMLElement|ClientRect} target the target container to align to
	         * @param {HTMLElement} elementToPosition the element to position
	         * @param {HTMLElement} collisionContainer the outer container to prevent collisions
	         * @param {bool} [centerHorizontal] set true to center element, otherwise it's put on the right border by default
	         * @param {bool} [positionTop] flip top, by default element is positioned to the bottom.
	         * @returns {HTMLElement}
	         */
	
	    }, {
	        key: "setupPositionNearby",
	        value: function setupPositionNearby(target, elementToPosition, collisionContainer, centerHorizontal, positionTop) {
	            // determine relative offsets
	            var amountTop = 0;
	            var amountLeft = 0;
	            Util.parentsUntil(target.parentNode, function (el) {
	                if (!(el instanceof HTMLElement)) {
	                    return false;
	                }
	                var style = window.getComputedStyle(el);
	                if (Util.isPartOfNode(elementToPosition, el)) {
	                    if (style && style.position === 'relative') {
	                        amountTop += el.offsetTop || 0;
	                        amountLeft += el.offsetLeft || 0;
	                    }
	                    return false;
	                }
	                return true;
	            });
	
	            var targetPosition = target instanceof HTMLElement ? target.getBoundingClientRect() : target;
	            var elementRect = elementToPosition.getBoundingClientRect();
	            var colRect = collisionContainer.getBoundingClientRect();
	            var targetTop = targetPosition.top - amountTop;
	            var targetRight = targetPosition.right;
	            var isCollisionTop = targetTop - elementRect.height <= 0;
	            var isCollisionBottom = window.innerHeight < targetTop + amountTop + targetPosition.height + elementRect.height;
	            var isCollisionLeft = targetRight < elementRect.width;
	            var targetLeft = targetPosition.left;
	            var isCollisionRight = targetLeft + elementRect.width > colRect.width;
	            var classList = elementToPosition.classList;
	
	            classList.remove(COL_RIGHT_CLASS);
	            classList.remove(COL_LEFT_CLASS);
	            classList.remove(COL_BOTTOM_CLASS);
	
	            var calcTop = undefined;
	            var calcLeft = undefined;
	            if (isCollisionLeft && !isCollisionRight) {
	                // put element to left if collision with left
	                calcLeft = targetPosition.left - colRect.left - amountLeft + 'px';
	                classList.add(COL_LEFT_CLASS);
	            } else {
	                // maybe center if no collision with either side
	                var rightPosition = targetRight - elementRect.width - colRect.left - amountLeft + 'px';
	                var leftCentered = (targetLeft + targetPosition.width / 2 - elementRect.width / 2 || 0) - colRect.left;
	                var collisionCentered = leftCentered + elementRect.width > colRect.width;
	                if (centerHorizontal && !collisionCentered) {
	                    calcLeft = leftCentered + 'px';
	                } else {
	                    classList.add(COL_RIGHT_CLASS);
	                    calcLeft = rightPosition;
	                }
	            }
	
	            if (isCollisionBottom || positionTop && !isCollisionTop) {
	                // Put Element on top if collision
	                calcTop = targetTop - elementRect.height - colRect.top + 'px';
	                classList.add(COL_BOTTOM_CLASS);
	            } else {
	                calcTop = targetTop + targetPosition.height - colRect.top + 'px';
	            }
	
	            elementToPosition.style.cssText = "top:" + calcTop + ";left:" + calcLeft + ";";
	
	            return elementToPosition;
	        }
	
	        /**
	         * Brings a given element into viewport
	         * @param {HTMLElement} el
	         * @param {int|function}[optionalOffset]
	         */
	
	    }, {
	        key: "scrollToElement",
	        value: function scrollToElement(el, optionalOffset) {
	            el.scrollIntoView();
	            var thisOffset = optionalOffset;
	            // optionally use a additional scrollDif
	            if (thisOffset) {
	                if (typeof thisOffset === 'function') {
	                    thisOffset = optionalOffset();
	                }
	                if (thisOffset > 0) {
	                    var scrolledY = window.scrollY || window.pageYOffset;
	                    if (scrolledY) {
	                        window.scroll(0, scrolledY - thisOffset);
	                    }
	                }
	            }
	        }
	    }]);
	
	    return Util;
	})();
	
	exports.default = Util;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 100 */
/***/ function(module, exports) {

	/*
	 * The MIT License (MIT)
	 *
	 * Copyright (c) 2015 David Heidrich, BowlingX <me@bowlingx.com>
	 *
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:
	 *
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 *
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	 */
	
	'use strict';
	
	/**
	 * Provides a Basic Widget
	 */
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var DestroyableWidget = (function () {
	    function DestroyableWidget() {
	        _classCallCheck(this, DestroyableWidget);
	
	        this.listeners = [];
	    }
	
	    /**
	     * Destroys a Widget
	     */
	
	    _createClass(DestroyableWidget, [{
	        key: 'destroy',
	        value: function destroy() {
	            this.listeners.forEach(function (listener) {
	                listener.element.removeEventListener.apply(listener.element, listener.args);
	            });
	            this.listeners = [];
	        }
	
	        /**
	         * Adds an event and registers it later to remove bindings
	         * @param {HTMLElement} element
	         * @param {String} name
	         * @param {Function} listener
	         * @param {boolean} [capture]
	         * @returns {Function}
	         */
	
	    }, {
	        key: 'addEventListener',
	        value: function addEventListener(element, name, listener, capture) {
	            this.listeners.push({
	                element: element,
	                args: [name, listener, capture]
	            });
	
	            element.addEventListener(name, listener, capture);
	            return listener;
	        }
	    }]);
	
	    return DestroyableWidget;
	})();
	
	exports.default = DestroyableWidget;

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })(); /*
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * The MIT License (MIT)
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * Copyright (c) 2015 David Heidrich, BowlingX <me@bowlingx.com>
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * Permission is hereby granted, free of charge, to any person obtaining a copy
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * of this software and associated documentation files (the "Software"), to deal
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * in the Software without restriction, including without limitation the rights
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * copies of the Software, and to permit persons to whom the Software is
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * furnished to do so, subject to the following conditions:
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * The above copyright notice and this permission notice shall be included in
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * all copies or substantial portions of the Software.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * THE SOFTWARE.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        */
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _Util = __webpack_require__(99);
	
	var _Util2 = _interopRequireDefault(_Util);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	// we attach global settings to global once because settings might be shared a lot of times trough the application
	// Maybe find a better way to handle that scenario
	if (!global.FLEXCSS_GLOBAL_SETTINGS) {
	    (function () {
	        global.FLEXCSS_GLOBAL_SETTINGS = {
	            // defined breakpoint for small devices < n
	            smallBreakpoint: 768,
	            // nodes that should be updated when no scrollbar is expected
	            scrollbarUpdateNodes: global.document.body !== null ? [global.document.body] : [],
	            // additional Delay until darkener is fully hidden
	            darkenerFadeDelay: 100,
	            // class that is added if canvas has been toggled
	            canvasToggledClass: 'toggled-canvas'
	        };
	
	        global.FLEXCSS_CONST_IS_IOS = null;
	
	        global.FLEXCSS_CONST_IS_TOUCH = null;
	
	        global.FLEXCSS_CONST_IS_IE = null;
	
	        global.FLEXCSS_CONST_TAB_EVENT = 'click';
	
	        var init = function init() {
	            // Measure scrollbar width
	            global.FLEXCSS_CONST_SCROLLBAR_WIDTH = _Util2.default.getScrollBarWidth();
	            // detect right transition end event
	            global.FLEXCSS_CONST_TRANSITION_EVENT = _Util2.default.whichTransitionEndEvent();
	        };
	
	        if (global.document.readyState !== 'loading') {
	            init();
	        } else {
	            // it's possible that global.document.body is not available if the document is not
	            // loaded completely
	            document.addEventListener('DOMContentLoaded', function () {
	                init();
	            });
	        }
	    })();
	}
	
	/**
	 * Utility class that setups global settings
	 */
	
	var Settings = (function () {
	    function Settings() {
	        _classCallCheck(this, Settings);
	    }
	
	    _createClass(Settings, null, [{
	        key: 'setup',
	
	        /**
	         * Setup global settings, overwrite default values
	         * @param {Object} settings
	         */
	        value: function setup(settings) {
	            Object.assign(global.FLEXCSS_GLOBAL_SETTINGS, settings);
	        }
	
	        /**
	         * Access to global settings
	         * @returns {Object}
	         */
	
	    }, {
	        key: 'get',
	        value: function get() {
	            return global.FLEXCSS_GLOBAL_SETTINGS;
	        }
	
	        /**
	         * Detects a IOS Device, caches subsequent calls
	         * @returns {boolean}
	         */
	
	    }, {
	        key: 'isIosDevice',
	        value: function isIosDevice() {
	            if (!global.FLEXCSS_CONST_IS_IOS) {
	                global.FLEXCSS_CONST_IS_IOS = global.navigator.userAgent.match(/(iPad|iPhone|iPod)/i);
	            }
	
	            return global.FLEXCSS_CONST_IS_IOS;
	        }
	
	        /**
	         * Detects a touch device, caches subsequent calls
	         * @returns {boolean}
	         */
	
	    }, {
	        key: 'isTouchDevice',
	        value: function isTouchDevice() {
	            if (!global.FLEXCSS_CONST_IS_TOUCH) {
	                global.FLEXCSS_CONST_IS_TOUCH = 'ontouchstart' in window || !!global.navigator.msMaxTouchPoints;
	            }
	            return global.FLEXCSS_CONST_IS_TOUCH;
	        }
	
	        /**
	         * Checks if current browser is Internet Explorer
	         * @returns {boolean|*}
	         */
	
	    }, {
	        key: 'isIE',
	        value: function isIE() {
	            if (!global.FLEXCSS_CONST_IS_IE) {
	                global.FLEXCSS_CONST_IS_IE = "ActiveXObject" in window;
	            }
	            return global.FLEXCSS_CONST_IS_IE;
	        }
	
	        /**
	         * @returns {String}
	         */
	
	    }, {
	        key: 'getTransitionEvent',
	        value: function getTransitionEvent() {
	            return global.FLEXCSS_CONST_TRANSITION_EVENT;
	        }
	
	        /**
	         * @returns {int}
	         */
	
	    }, {
	        key: 'getScrollbarWidth',
	        value: function getScrollbarWidth() {
	            return global.FLEXCSS_CONST_SCROLLBAR_WIDTH;
	        }
	
	        /**
	         * @returns {String}
	         */
	
	    }, {
	        key: 'getTabEvent',
	        value: function getTabEvent() {
	            return global.FLEXCSS_CONST_TAB_EVENT;
	        }
	    }]);
	
	    return Settings;
	})();
	
	exports.default = Settings;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	// the whatwg-fetch polyfill installs the fetch() function
	// on the global object (window or self)
	//
	// Return that as the export for use in Webpack, Browserify etc.
	__webpack_require__(103);
	module.exports = self.fetch.bind(self);


/***/ },
/* 103 */
/***/ function(module, exports) {

	(function() {
	  'use strict';
	
	  if (self.fetch) {
	    return
	  }
	
	  function normalizeName(name) {
	    if (typeof name !== 'string') {
	      name = String(name)
	    }
	    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
	      throw new TypeError('Invalid character in header field name')
	    }
	    return name.toLowerCase()
	  }
	
	  function normalizeValue(value) {
	    if (typeof value !== 'string') {
	      value = String(value)
	    }
	    return value
	  }
	
	  function Headers(headers) {
	    this.map = {}
	
	    if (headers instanceof Headers) {
	      headers.forEach(function(value, name) {
	        this.append(name, value)
	      }, this)
	
	    } else if (headers) {
	      Object.getOwnPropertyNames(headers).forEach(function(name) {
	        this.append(name, headers[name])
	      }, this)
	    }
	  }
	
	  Headers.prototype.append = function(name, value) {
	    name = normalizeName(name)
	    value = normalizeValue(value)
	    var list = this.map[name]
	    if (!list) {
	      list = []
	      this.map[name] = list
	    }
	    list.push(value)
	  }
	
	  Headers.prototype['delete'] = function(name) {
	    delete this.map[normalizeName(name)]
	  }
	
	  Headers.prototype.get = function(name) {
	    var values = this.map[normalizeName(name)]
	    return values ? values[0] : null
	  }
	
	  Headers.prototype.getAll = function(name) {
	    return this.map[normalizeName(name)] || []
	  }
	
	  Headers.prototype.has = function(name) {
	    return this.map.hasOwnProperty(normalizeName(name))
	  }
	
	  Headers.prototype.set = function(name, value) {
	    this.map[normalizeName(name)] = [normalizeValue(value)]
	  }
	
	  Headers.prototype.forEach = function(callback, thisArg) {
	    Object.getOwnPropertyNames(this.map).forEach(function(name) {
	      this.map[name].forEach(function(value) {
	        callback.call(thisArg, value, name, this)
	      }, this)
	    }, this)
	  }
	
	  function consumed(body) {
	    if (body.bodyUsed) {
	      return Promise.reject(new TypeError('Already read'))
	    }
	    body.bodyUsed = true
	  }
	
	  function fileReaderReady(reader) {
	    return new Promise(function(resolve, reject) {
	      reader.onload = function() {
	        resolve(reader.result)
	      }
	      reader.onerror = function() {
	        reject(reader.error)
	      }
	    })
	  }
	
	  function readBlobAsArrayBuffer(blob) {
	    var reader = new FileReader()
	    reader.readAsArrayBuffer(blob)
	    return fileReaderReady(reader)
	  }
	
	  function readBlobAsText(blob) {
	    var reader = new FileReader()
	    reader.readAsText(blob)
	    return fileReaderReady(reader)
	  }
	
	  var support = {
	    blob: 'FileReader' in self && 'Blob' in self && (function() {
	      try {
	        new Blob();
	        return true
	      } catch(e) {
	        return false
	      }
	    })(),
	    formData: 'FormData' in self,
	    arrayBuffer: 'ArrayBuffer' in self
	  }
	
	  function Body() {
	    this.bodyUsed = false
	
	
	    this._initBody = function(body) {
	      this._bodyInit = body
	      if (typeof body === 'string') {
	        this._bodyText = body
	      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
	        this._bodyBlob = body
	      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
	        this._bodyFormData = body
	      } else if (!body) {
	        this._bodyText = ''
	      } else if (support.arrayBuffer && ArrayBuffer.prototype.isPrototypeOf(body)) {
	        // Only support ArrayBuffers for POST method.
	        // Receiving ArrayBuffers happens via Blobs, instead.
	      } else {
	        throw new Error('unsupported BodyInit type')
	      }
	    }
	
	    if (support.blob) {
	      this.blob = function() {
	        var rejected = consumed(this)
	        if (rejected) {
	          return rejected
	        }
	
	        if (this._bodyBlob) {
	          return Promise.resolve(this._bodyBlob)
	        } else if (this._bodyFormData) {
	          throw new Error('could not read FormData body as blob')
	        } else {
	          return Promise.resolve(new Blob([this._bodyText]))
	        }
	      }
	
	      this.arrayBuffer = function() {
	        return this.blob().then(readBlobAsArrayBuffer)
	      }
	
	      this.text = function() {
	        var rejected = consumed(this)
	        if (rejected) {
	          return rejected
	        }
	
	        if (this._bodyBlob) {
	          return readBlobAsText(this._bodyBlob)
	        } else if (this._bodyFormData) {
	          throw new Error('could not read FormData body as text')
	        } else {
	          return Promise.resolve(this._bodyText)
	        }
	      }
	    } else {
	      this.text = function() {
	        var rejected = consumed(this)
	        return rejected ? rejected : Promise.resolve(this._bodyText)
	      }
	    }
	
	    if (support.formData) {
	      this.formData = function() {
	        return this.text().then(decode)
	      }
	    }
	
	    this.json = function() {
	      return this.text().then(JSON.parse)
	    }
	
	    return this
	  }
	
	  // HTTP methods whose capitalization should be normalized
	  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']
	
	  function normalizeMethod(method) {
	    var upcased = method.toUpperCase()
	    return (methods.indexOf(upcased) > -1) ? upcased : method
	  }
	
	  function Request(input, options) {
	    options = options || {}
	    var body = options.body
	    if (Request.prototype.isPrototypeOf(input)) {
	      if (input.bodyUsed) {
	        throw new TypeError('Already read')
	      }
	      this.url = input.url
	      this.credentials = input.credentials
	      if (!options.headers) {
	        this.headers = new Headers(input.headers)
	      }
	      this.method = input.method
	      this.mode = input.mode
	      if (!body) {
	        body = input._bodyInit
	        input.bodyUsed = true
	      }
	    } else {
	      this.url = input
	    }
	
	    this.credentials = options.credentials || this.credentials || 'omit'
	    if (options.headers || !this.headers) {
	      this.headers = new Headers(options.headers)
	    }
	    this.method = normalizeMethod(options.method || this.method || 'GET')
	    this.mode = options.mode || this.mode || null
	    this.referrer = null
	
	    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
	      throw new TypeError('Body not allowed for GET or HEAD requests')
	    }
	    this._initBody(body)
	  }
	
	  Request.prototype.clone = function() {
	    return new Request(this)
	  }
	
	  function decode(body) {
	    var form = new FormData()
	    body.trim().split('&').forEach(function(bytes) {
	      if (bytes) {
	        var split = bytes.split('=')
	        var name = split.shift().replace(/\+/g, ' ')
	        var value = split.join('=').replace(/\+/g, ' ')
	        form.append(decodeURIComponent(name), decodeURIComponent(value))
	      }
	    })
	    return form
	  }
	
	  function headers(xhr) {
	    var head = new Headers()
	    var pairs = xhr.getAllResponseHeaders().trim().split('\n')
	    pairs.forEach(function(header) {
	      var split = header.trim().split(':')
	      var key = split.shift().trim()
	      var value = split.join(':').trim()
	      head.append(key, value)
	    })
	    return head
	  }
	
	  Body.call(Request.prototype)
	
	  function Response(bodyInit, options) {
	    if (!options) {
	      options = {}
	    }
	
	    this._initBody(bodyInit)
	    this.type = 'default'
	    this.status = options.status
	    this.ok = this.status >= 200 && this.status < 300
	    this.statusText = options.statusText
	    this.headers = options.headers instanceof Headers ? options.headers : new Headers(options.headers)
	    this.url = options.url || ''
	  }
	
	  Body.call(Response.prototype)
	
	  Response.prototype.clone = function() {
	    return new Response(this._bodyInit, {
	      status: this.status,
	      statusText: this.statusText,
	      headers: new Headers(this.headers),
	      url: this.url
	    })
	  }
	
	  Response.error = function() {
	    var response = new Response(null, {status: 0, statusText: ''})
	    response.type = 'error'
	    return response
	  }
	
	  var redirectStatuses = [301, 302, 303, 307, 308]
	
	  Response.redirect = function(url, status) {
	    if (redirectStatuses.indexOf(status) === -1) {
	      throw new RangeError('Invalid status code')
	    }
	
	    return new Response(null, {status: status, headers: {location: url}})
	  }
	
	  self.Headers = Headers;
	  self.Request = Request;
	  self.Response = Response;
	
	  self.fetch = function(input, init) {
	    return new Promise(function(resolve, reject) {
	      var request
	      if (Request.prototype.isPrototypeOf(input) && !init) {
	        request = input
	      } else {
	        request = new Request(input, init)
	      }
	
	      var xhr = new XMLHttpRequest()
	
	      function responseURL() {
	        if ('responseURL' in xhr) {
	          return xhr.responseURL
	        }
	
	        // Avoid security warnings on getResponseHeader when not allowed by CORS
	        if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
	          return xhr.getResponseHeader('X-Request-URL')
	        }
	
	        return;
	      }
	
	      xhr.onload = function() {
	        var status = (xhr.status === 1223) ? 204 : xhr.status
	        if (status < 100 || status > 599) {
	          reject(new TypeError('Network request failed'))
	          return
	        }
	        var options = {
	          status: status,
	          statusText: xhr.statusText,
	          headers: headers(xhr),
	          url: responseURL()
	        }
	        var body = 'response' in xhr ? xhr.response : xhr.responseText;
	        resolve(new Response(body, options))
	      }
	
	      xhr.onerror = function() {
	        reject(new TypeError('Network request failed'))
	      }
	
	      xhr.open(request.method, request.url, true)
	
	      if (request.credentials === 'include') {
	        xhr.withCredentials = true
	      }
	
	      if ('responseType' in xhr && support.blob) {
	        xhr.responseType = 'blob'
	      }
	
	      request.headers.forEach(function(value, name) {
	        xhr.setRequestHeader(name, value)
	      })
	
	      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
	    })
	  }
	  self.fetch.polyfill = true
	})();


/***/ },
/* 104 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/* global CustomEvent */
	
	/*
	 * The MIT License (MIT)
	 *
	 * Copyright (c) 2015 David Heidrich, BowlingX <me@bowlingx.com>
	 *
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:
	 *
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 *
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	 */
	
	// polyfill for custom events to make thinks work in IE
	// The needed polyfill is so small that I embedded it here
	(function poly() {
	    if (!global.CustomEvent || typeof global.CustomEvent !== 'function') {
	        var _CustomEvent = function CustomEvent(event, params) {
	            var evt = undefined;
	            var thisParams = params || {
	                bubbles: false,
	                cancelable: false,
	                detail: undefined
	            };
	            evt = document.createEvent("CustomEvent");
	            evt.initCustomEvent(event, thisParams.bubbles, thisParams.cancelable, thisParams.detail);
	            return evt;
	        };
	        _CustomEvent.prototype = global.Event.prototype;
	        global.CustomEvent = _CustomEvent;
	    }
	})();
	/**
	 * Simpler Event dispatching
	 */
	
	var EventHandler = (function () {
	
	    /**
	     * @param {HTMLElement} target
	     * @param {String} name
	     */
	
	    function EventHandler(target, name) {
	        _classCallCheck(this, EventHandler);
	
	        this.target = target;
	        this.defaultOptions = {
	            bubbles: true,
	            cancelable: true
	        };
	
	        this.name = name;
	    }
	
	    /**
	     * Set more options
	     * @param {Object} options
	     * @returns {EventHandler}
	     */
	
	    _createClass(EventHandler, [{
	        key: "withOptions",
	        value: function withOptions(options) {
	            Object.assign(this.defaultOptions, options || {});
	            return this;
	        }
	
	        /**
	         * Call with the originalEvent
	         * @param {Event} e
	         * @returns {EventHandler}
	         */
	
	    }, {
	        key: "withOriginal",
	        value: function withOriginal(e) {
	            return this.withDetail({
	                originalEvent: e
	            });
	        }
	
	        /**
	         * Extends the detail part of the event
	         * @param {Object} o
	         * @returns {EventHandler}
	         */
	
	    }, {
	        key: "withDetail",
	        value: function withDetail(o) {
	            if (!this.defaultOptions.detail) {
	                this.defaultOptions.detail = {};
	            }
	            Object.assign(this.defaultOptions.detail, o);
	            return this;
	        }
	
	        /**
	         * @returns {CustomEvent}
	         */
	
	    }, {
	        key: "fire",
	        value: function fire() {
	            var e = new CustomEvent(this.name, this.defaultOptions);
	            if (this.target) {
	                this.target.dispatchEvent(e);
	            }
	            return e;
	        }
	    }]);
	
	    return EventHandler;
	})();
	
	var Event = (function () {
	    function Event() {
	        _classCallCheck(this, Event);
	    }
	
	    _createClass(Event, null, [{
	        key: "dispatch",
	
	        /**
	         * Prepares to dispatch a custom event (without firing)
	         * @param {HTMLElement} target
	         * @param {String} name
	         * @returns {EventHandler}
	         */
	        value: function dispatch(target, name) {
	            return new EventHandler(target, name);
	        }
	
	        /**
	         * Dispatches a custom event and fires it directly
	         * @param {HTMLElement} target
	         * @param {String} name
	         * @param {Object} [options]
	         * @returns {CustomEvent}
	         */
	
	    }, {
	        key: "dispatchAndFire",
	        value: function dispatchAndFire(target, name, options) {
	            return new EventHandler(target, name).withOptions(options).fire();
	        }
	    }]);
	
	    return Event;
	})();
	
	exports.default = Event;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/*
	 * The MIT License (MIT)
	 *
	 * Copyright (c) 2015 David Heidrich, BowlingX <me@bowlingx.com>
	 *
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:
	 *
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 *
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	 */
	
	/*!
	 * FlexCss.Modal
	 * Licensed under the MIT License (MIT)
	 * Copyright (c) 2015 David Heidrich, BowlingX <me@bowlingx.com>
	 */
	
	'use strict';
	
	/*global KeyboardEvent*/
	
	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.EVENT_MODAL_ASYNC_TARGET_LOADED = exports.EVENT_MODAL_INIT = exports.EVENT_MODAL_OPENED = exports.EVENT_MODAL_BEFORE_CLOSED = exports.EVENT_MODAL_CLOSED = undefined;
	
	var _Settings = __webpack_require__(101);
	
	var _Settings2 = _interopRequireDefault(_Settings);
	
	var _Event = __webpack_require__(104);
	
	var _Event2 = _interopRequireDefault(_Event);
	
	var _Util = __webpack_require__(99);
	
	var _Util2 = _interopRequireDefault(_Util);
	
	var _Widget = __webpack_require__(106);
	
	var _Widget2 = _interopRequireDefault(_Widget);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var HTML_ELEMENT = global.document.documentElement;
	var KEY_ESC = 27;
	/* Attribute Names */
	var ATTR_CREATE_NEW = 'data-new-instance';
	var ATTR_CLOSE = 'data-close-modal';
	var ATTR_NAME = 'data-modal';
	
	/* Class names */
	var CLS_CONTAINER_CURRENT = 'front';
	var CLS_OPEN = 'open';
	var CLS_CURRENT = 'current';
	var CLS_PART_OF_STACK = 'part-of-stack';
	var CLS_MODAL_OPEN = 'modal-open';
	var CLS_MODAL_CONTAINER = 'modal-container';
	var CLS_ANIM_END = 'modal-anim-end';
	var CLS_LOADER_CONTAINER = 'loader-container';
	var CLS_LOADER = 'loader';
	
	/* Events */
	
	/**
	 * Event triggered when modal is closed
	 * @type {string}
	 */
	var EVENT_MODAL_CLOSED = exports.EVENT_MODAL_CLOSED = 'flexcss.modal.closed';
	/**
	 * Event triggered before a modal is closed, cancelable
	 * @type {string}
	 */
	var EVENT_MODAL_BEFORE_CLOSED = exports.EVENT_MODAL_BEFORE_CLOSED = 'flexcss.modal.beforeClose';
	/**
	 * Event triggered when a modal is opened
	 * @type {string}
	 */
	var EVENT_MODAL_OPENED = exports.EVENT_MODAL_OPENED = 'flexcss.modal.opened';
	
	/**
	 * Event triggered when modal is initilized, called on target
	 * @type {string}
	 */
	var EVENT_MODAL_INIT = exports.EVENT_MODAL_INIT = 'flexcss.modal.init';
	
	/**
	 * Triggered when the content of an async modal on a target is loaded, called on target
	 * @type {string}
	 */
	var EVENT_MODAL_ASYNC_TARGET_LOADED = exports.EVENT_MODAL_ASYNC_TARGET_LOADED = 'flexcss.modal.asyncTargetLoaded';
	
	/**
	 * A Modal Implementation
	 */
	
	var Modal = (function () {
	    function Modal(DelegateContainer, options) {
	        _classCallCheck(this, Modal);
	
	        var doc = global.document,
	            container = DelegateContainer instanceof HTMLElement ? DelegateContainer : doc.getElementById(DelegateContainer);
	
	        // Instance vars:
	        if (!container) {
	            throw new Error('Could not found container element by given ID/Element: ' + DelegateContainer);
	        }
	
	        this.currentOpen = null;
	
	        this.loading = false;
	
	        this.container = container;
	
	        /**
	         * Default Options
	         */
	        this.options = {
	            classNames: 'modal',
	            closeOnEscape: true,
	            closeOnBackgroundClick: true,
	            destroyOnFinish: false,
	            fixedContainer: true,
	            containerClassNames: ''
	        };
	
	        Object.assign(this.options, options);
	
	        // Container where events are delegated
	        this.eventContainer = null;
	        this.eventFunction = null;
	
	        this.dataMainPageContainer = global.document.body;
	
	        this.currentScrollTop = 0;
	
	        this.modalContainer = null;
	
	        // Destroy full modal instance when no dialogs are bind to?
	        // Otherwise container is recycled
	        this.destroyOnFinish = this.options.destroyOnFinish;
	    }
	
	    /**
	     * Removes this modal from global stack
	     * Will handle fixing main html element too
	     * @private
	     * @param n
	     */
	
	    _createClass(Modal, [{
	        key: '_removeModalFromStack',
	        value: function _removeModalFromStack(n) {
	            var t = Modal._modalInstances.indexOf(n),
	                self = this;
	            if (t > -1) {
	                Modal._modalInstances.splice(t, 1);
	                if (Modal._modalInstances.length === 0) {
	                    // restore scrollPosition:
	                    if (self.dataMainPageContainer) {
	                        setTimeout(function () {
	                            if (self.options.fixedContainer) {
	                                self.dataMainPageContainer.style.position = "static";
	                                self.dataMainPageContainer.style.top = "0px";
	                                // reset scrollTop
	                                document.documentElement.scrollTop = self.currentScrollTop;
	                                document.body.scrollTop = self.currentScrollTop;
	                            }
	                            _Settings2.default.get().scrollbarUpdateNodes.forEach(function (node) {
	                                if (node instanceof Array) {
	                                    var _node = _slicedToArray(node, 2);
	
	                                    var whatNode = _node[0];
	                                    var property = _node[1];
	
	                                    whatNode.style[property] = '';
	                                } else {
	                                    node.style.paddingRight = '';
	                                }
	                            });
	                            HTML_ELEMENT.classList.remove(CLS_MODAL_OPEN);
	                        }, 0);
	                    }
	                }
	            }
	        }
	
	        /**
	         * Modal container that contains all `stacked` modals for this instance
	         * @returns {HTMLElement}
	         */
	
	    }, {
	        key: 'getModalContainer',
	        value: function getModalContainer() {
	            return this.modalContainer;
	        }
	
	        /**
	         * Closes the current open modal of this stack
	         * @params [e], optional event
	         * @returns {*}
	         */
	
	    }, {
	        key: 'close',
	        value: function close(e) {
	            var self = this;
	
	            var options = self.currentOpen ? _Util2.default.applyOptionsFromElement(self.currentOpen, _Util2.default.copy(self.options)) : self.options;
	
	            // close only on keyboard if instance should
	            if (!options.closeOnEscape && e instanceof KeyboardEvent) {
	                return false;
	            }
	
	            // close only on background if instance should
	            if (!options.closeOnBackgroundClick && e && e.type === _Settings2.default.getTabEvent() && !e.target.hasAttribute(ATTR_CLOSE)) {
	                return false;
	            }
	
	            // if an instance is currently loading, prevent from closing
	            if (self.loading) {
	                return false;
	            }
	
	            if (e) {
	                e.preventDefault();
	            }
	
	            if (self.currentOpen) {
	                // dispatch beforeClose event, if prevented prevent modal from closing
	                var ev = _Event2.default.dispatchAndFire(self.currentOpen, EVENT_MODAL_BEFORE_CLOSED);
	                if (ev.defaultPrevented) {
	                    return false;
	                }
	
	                this._finishState(self.currentOpen);
	                // if there is an previous modal
	                if (self.currentOpen.prevModal) {
	                    // switch to the next modal
	                    return self.switchModals(self.currentOpen.prevModal, self.currentOpen.prevModal.prevModal || null);
	                }
	
	                // finally trigger closed event
	                _Event2.default.dispatch(self.currentOpen, EVENT_MODAL_CLOSED).withOriginal(e).fire();
	            }
	            self._removeModalFromStack(self.currentOpen);
	
	            // Full stack closed:
	            self.currentOpen = null;
	            if (self.modalContainer) {
	                // setup next open
	                var lastContainer = Modal._modalInstances[Modal._modalInstances.length - 1],
	                    classList = self.modalContainer.classList;
	                classList.remove(CLS_CONTAINER_CURRENT);
	                classList.remove(CLS_OPEN);
	                // Remove all current classes from child-nodes
	                for (var i = 0; i < self.modalContainer.childNodes.length; i++) {
	                    var node = self.modalContainer.childNodes[i],
	                        cl = node.classList;
	                    // remove applied styles
	                    self._finishState(node);
	                    cl.remove(CLS_CURRENT);
	                    cl.remove(CLS_PART_OF_STACK);
	                }
	                if (lastContainer) {
	                    lastContainer.parentNode.classList.add(CLS_CONTAINER_CURRENT);
	                }
	            }
	
	            if (self.destroyOnFinish) {
	                self.destroy();
	            }
	            return self;
	        }
	
	        /**
	         * Resets a target when newly initilizes
	         * @param target
	         * @private
	         */
	
	    }, {
	        key: '_finishState',
	        value: function _finishState(target) {
	            target.classList.remove(CLS_ANIM_END);
	        }
	
	        /**
	         * Handler called when a Modal has finished an animation
	         * @param e
	         * @param self
	         * @private
	         */
	
	    }, {
	        key: '_finishAnim',
	        value: function _finishAnim(e, self) {
	            e.target.classList.add(CLS_ANIM_END);
	            e.target.removeEventListener(e.type, self, true);
	        }
	
	        /**
	         * Brings the given modal to front
	         * @param co
	         * @param last
	         */
	
	    }, {
	        key: 'switchModals',
	        value: function switchModals(co, last) {
	            co.prevModal = last;
	            Modal._modalInstances.push(co);
	
	            if (last) {
	                this._finishState(last);
	                _Util2.default.prefixedAnimateEvent(last, 'AnimationEnd', this._finishAnim);
	                last.classList.add(CLS_PART_OF_STACK);
	            }
	            // set new currentOpen
	            this.currentOpen = co;
	
	            // bring current container to the front
	            var instances = Modal._modalInstances;
	
	            for (var m = 0; m < instances.length; m++) {
	                instances[m].parentNode.classList.remove(CLS_CONTAINER_CURRENT);
	            }
	            this.modalContainer.classList.add(CLS_CONTAINER_CURRENT);
	            // remove animations if animations has been completed, fixes various bugs:
	            // - fixes nested scrolling element issue in iOS Browsers / Mobile-Safari
	            _Util2.default.prefixedAnimateEvent(co, 'AnimationEnd', this._finishAnim);
	
	            for (var i = 0; i < this.modalContainer.childNodes.length; i++) {
	                var n = this.modalContainer.childNodes[i],
	                    isCurrent = n.classList.contains(CLS_CURRENT);
	                if (n === co) {
	                    co.classList.add(CLS_CURRENT);
	                    co.classList.remove(CLS_PART_OF_STACK);
	                    this._finishState(co);
	                } else {
	                    n.classList.remove(CLS_CURRENT);
	                    if (isCurrent) {
	                        this._removeModalFromStack(n);
	                        _Event2.default.dispatchAndFire(n, EVENT_MODAL_CLOSED);
	                    }
	                }
	            }
	        }
	    }, {
	        key: 'handleScrollbar',
	        value: function handleScrollbar() {
	            var self = this;
	            if (Modal._modalInstances.length === 0) {
	                // save current scrollTop:
	                var scrollTop = undefined,
	                    c = undefined;
	                if (self.options.fixedContainer) {
	                    scrollTop = global.pageYOffset;
	                    c = self.dataMainPageContainer;
	                    self.currentScrollTop = scrollTop;
	                }
	                // this causes reflow/paint and should be optimized
	                // At lest we write in a batch later
	                _Settings2.default.get().scrollbarUpdateNodes.map(function (n) {
	                    var foundProperty = 'paddingRight';
	                    var direction = 1;
	                    if (n instanceof Array) {
	                        var _n = n;
	
	                        var _n2 = _slicedToArray(_n, 3);
	
	                        var whatNode = _n2[0];
	                        var property = _n2[1];
	                        var d = _n2[2];
	
	                        foundProperty = property;
	                        n = whatNode;
	                        direction = d || 1;
	                    }
	                    return {
	                        n: n, property: foundProperty, value: parseInt(global.getComputedStyle(n)[foundProperty]) + _Settings2.default.getScrollbarWidth() * direction + 'px'
	                    };
	                }).forEach(function (d) {
	                    d.n.style[d.property] = d.value;
	                });
	                if (self.options.fixedContainer) {
	                    if (c) {
	                        c.style.cssText += 'top:' + (scrollTop * -1 + 'px') + ';position:fixed';
	                    }
	                }
	                HTML_ELEMENT.classList.add(CLS_MODAL_OPEN);
	            }
	        }
	
	        /**
	         * Creates a Modal and opens it (later)
	         * @param e
	         * @returns {Promise|boolean}
	         */
	
	    }, {
	        key: 'createWidget',
	        value: function createWidget(e) {
	            var self = this;
	            if (this.loading) {
	                return false;
	            }
	
	            // check if another modal has registered events on this dom path:
	            if (e && e.target) {
	                var foundInstance = _Util2.default.parentsUntil(e.target, function (node) {
	                    return node && node.flexModalInstance;
	                });
	
	                // if another instance has been found, abort
	                if (foundInstance !== this.container) {
	                    return false;
	                }
	            }
	            var targetContent,
	                future,
	                widget,
	                target,
	                hasTarget = true,
	                isHtmlElement = e instanceof HTMLElement,
	                isWidget = _Widget2.default.isWidget(e);
	            if (isHtmlElement || isWidget) {
	                if (isHtmlElement) {
	                    targetContent = e;
	                } else {
	                    widget = e;
	                    targetContent = widget.element;
	                }
	            } else {
	                target = e.target;
	                if (!target) {
	                    throw 'Could not find target, did you pass an event, a HTMLElement or an Widget?';
	                }
	                hasTarget = target.hasAttribute(ATTR_NAME);
	                targetContent = target.getAttribute(ATTR_NAME);
	                widget = _Widget2.default.findWidget(target);
	                if (target.hasAttribute(ATTR_CREATE_NEW) && !e.newInstance) {
	                    var newInstance = new Modal(this.container).setDestroyOnFinish(true);
	                    e.newInstance = true;
	                    newInstance.fromEvent(e).then(function () {
	                        newInstance.registerEvents(newInstance.getModalContainer());
	                    });
	                    return false;
	                }
	                if (hasTarget) {
	                    e.stopImmediatePropagation();
	                    e.preventDefault();
	                }
	            }
	
	            if (!hasTarget) {
	                return false;
	            }
	
	            var modalContainerClasses = this.modalContainer ? this.modalContainer.classList : [];
	
	            // lazy create modal container
	            if (!this.modalContainer) {
	                this.modalContainer = global.document.createElement('div');
	                this.modalContainer.className = CLS_MODAL_CONTAINER + ' ' + this.options.containerClassNames + ' ' + CLS_OPEN;
	                var closeModalFunction = function closeModalFunction(ce) {
	                    if (self.loading) {
	                        return false;
	                    }
	                    if (_Util2.default.isPartOfNode(ce.target, self.currentOpen)) {
	                        if (!ce.target.hasAttribute(ATTR_CLOSE)) {
	                            return false;
	                        }
	                    }
	                    self.close(ce);
	                };
	
	                this.modalContainer.addEventListener(_Settings2.default.getTabEvent(), closeModalFunction, false);
	
	                modalContainerClasses = this.modalContainer.classList;
	                this.container.appendChild(this.modalContainer);
	            } else {
	                modalContainerClasses.add(CLS_OPEN);
	            }
	
	            var loader = undefined,
	                doc = global.document,
	                toggleLoader = function toggleLoader(show) {
	                if (show) {
	                    loader = doc.createElement('div');
	                    loader.className = CLS_LOADER_CONTAINER;
	                    var loaderLoader = doc.createElement('div');
	                    loaderLoader.className = CLS_LOADER;
	                    loader.appendChild(loaderLoader);
	                    self.modalContainer.appendChild(loader);
	                } else {
	                    loader.parentNode.removeChild(loader);
	                }
	            };
	
	            this.handleScrollbar();
	
	            modalContainerClasses.add(CLS_CONTAINER_CURRENT);
	            modalContainerClasses.add('loading');
	            this.loading = true;
	            toggleLoader(true);
	            var async = widget ? widget.getAsync() : null;
	            if (_Widget2.default.isWidget(widget) && async) {
	                future = async.then(function (r) {
	                    var result;
	                    if (r instanceof HTMLElement || r instanceof DocumentFragment) {
	                        result = r;
	                    } else {
	                        // Create container Element:
	                        var element = doc.createElement('div');
	                        element.className = self.options.classNames;
	                        element.innerHTML = r;
	                        element.id = _Util2.default.guid();
	                        result = element;
	                    }
	                    widget.finalContent = result;
	                    _Event2.default.dispatchAndFire(target, EVENT_MODAL_ASYNC_TARGET_LOADED);
	                    return result;
	                });
	            } else {
	                var el = targetContent instanceof HTMLElement || targetContent instanceof DocumentFragment ? targetContent : doc.getElementById(targetContent);
	                if (el) {
	                    future = new Promise(function (resolve) {
	                        resolve(el);
	                    });
	                } else {
	                    throw 'Could not found given modal element (content) with ID: ' + targetContent;
	                }
	            }
	
	            _Event2.default.dispatchAndFire(target, EVENT_MODAL_INIT);
	
	            return future.then(function (thisEl) {
	                thisEl.hfWidgetInstance = self;
	                self.modalContainer.appendChild(thisEl);
	                modalContainerClasses.remove('loading');
	                self.loading = false;
	                toggleLoader(false);
	
	                self.open(thisEl, true, e);
	
	                return thisEl;
	            });
	        }
	
	        /**
	         * Open's an already rendered modal
	         * @param {HTMLElement} modal
	         * @param {Boolean} [internal], set to true to prevent container management
	         * @param {Boolean} [maybeEvent], optional event-object that triggered open
	         */
	
	    }, {
	        key: 'open',
	        value: function open(modal, internal, maybeEvent) {
	
	            if (!internal) {
	                this.modalContainer.classList.add('open');
	                this.handleScrollbar();
	            }
	            this.switchModals(modal, this.currentOpen);
	
	            _Event2.default.dispatch(modal, EVENT_MODAL_OPENED).withOriginal(maybeEvent).fire();
	        }
	    }, {
	        key: 'registerEvents',
	        value: function registerEvents(delegate) {
	            var delegateContainer = delegate || this.container,
	                self = this;
	
	            // register modal instance so we can detect multiple registrars
	            delegateContainer.flexModalInstance = self;
	            self.eventFunction = function () {
	                self.createWidget.apply(self, arguments);
	            };
	            delegateContainer.addEventListener(_Settings2.default.getTabEvent(), self.eventFunction, false);
	
	            self.eventContainer = delegateContainer;
	            return self;
	        }
	
	        /**
	         * Creates a new Dialog Instance either directly from HTML Element or a Widget instance
	         * @param {HTMLElement|Widget} widget instance or html element
	         * @returns {Promise}
	         */
	
	    }, {
	        key: 'fromWidget',
	        value: function fromWidget(widget) {
	            return this.createWidget(widget);
	        }
	
	        /**
	         * Creates a Widget from event
	         * @param e
	         * @returns {Promise}
	         */
	
	    }, {
	        key: 'fromEvent',
	        value: function fromEvent(e) {
	            return this.createWidget(e);
	        }
	    }, {
	        key: 'setDestroyOnFinish',
	        value: function setDestroyOnFinish(v) {
	            this.destroyOnFinish = v;
	            return this;
	        }
	
	        /**
	         * Destroy this widget instance, cleans empty DOM nodes
	         * Will use fast MutationObserver if available, otherwise falls back to DOMNodeRemoved event
	         */
	
	    }, {
	        key: 'destroy',
	        value: function destroy() {
	            var self = this,
	                modalContainer = this.modalContainer;
	            var isEmptyContainer = modalContainer.childNodes.length === 0;
	            // Remove event listener on destroy, do not remove DOM node
	            if (self.eventContainer) {
	                self.eventContainer.removeEventListener(_Settings2.default.getTabEvent(), self.eventFunction, true);
	            }
	
	            if (isEmptyContainer) {
	                if (modalContainer.parentNode) {
	                    modalContainer.parentNode.removeChild(modalContainer);
	                }
	            }
	            if (global.MutationObserver) {
	                var observer = new MutationObserver(function (mutations) {
	                    mutations.forEach(function () {
	                        if (isEmptyContainer) {
	                            modalContainer.parentNode.removeChild(modalContainer);
	                            observer.disconnect();
	                        }
	                    });
	                });
	                observer.observe(modalContainer, { childList: true });
	            } else {
	                modalContainer.addEventListener('DOMNodeRemoved', function (e) {
	                    if (e.target !== modalContainer && modalContainer.childNodes.length - 1 === 0) {
	                        modalContainer.parentNode.removeChild(modalContainer);
	                    }
	                });
	            }
	        }
	    }]);
	
	    return Modal;
	})();
	
	// Static variable that keeps track of all open modals
	
	Modal._modalInstances = [];
	
	// Global keydown listener for modal
	global.addEventListener('keydown', function (e) {
	    if (e.keyCode === KEY_ESC) {
	        var lastModal = Modal._modalInstances[Modal._modalInstances.length - 1];
	        if (lastModal) {
	            _Widget2.default.findWidget(lastModal).close(e);
	        }
	    }
	});
	
	exports.default = Modal;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 106 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/*
	 * The MIT License (MIT)
	 *
	 * Copyright (c) 2015 David Heidrich, BowlingX <me@bowlingx.com>
	 *
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:
	 *
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 *
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	 */
	
	/*!
	 * FlexCss.Widget
	 * Licensed under the MIT License (MIT)
	 * Copyright (c) 2015 David Heidrich, BowlingX <me@bowlingx.com>
	 */
	
	/**
	 * A Widget provides async content on a specific target (e.g. a modal link)
	 */
	
	var Widget = (function () {
	
	  /**
	   * Creates a new Widget
	   * @param [element], optional define the content of widget
	   */
	
	  function Widget(element) {
	    var _this = this;
	
	    _classCallCheck(this, Widget);
	
	    /**
	     *
	     * @type {Promise}
	     */
	    this.asyncContent = null;
	
	    /**
	     * @type {boolean}
	     */
	    this._isWidget = true;
	
	    if (element) {
	      /**
	       * @type {HTMLElement}
	       */
	      this.element = element instanceof HTMLElement ? element : global.document.getElementById(element);
	      if (this.element) {
	        this.element.hfWidgetInstance = this;
	        this.setAsync(function () {
	          return new Promise(function (s) {
	            s(_this.element);
	          });
	        });
	      } else {
	        throw new Error('Could not found element with ID: ' + element);
	      }
	    }
	    /**
	     * The final resulted content that a widget did create (e.g. a modal container)
	     * @type {HTMLElement}
	     */
	    this.finalContent = null;
	  }
	
	  /**
	   *
	   * @returns {Promise}
	   */
	
	  _createClass(Widget, [{
	    key: 'getAsync',
	    value: function getAsync() {
	      return this.asyncContent();
	    }
	
	    /**
	     * @param {Function.<Promise>} async
	     * @returns {Widget}
	     */
	
	  }, {
	    key: 'setAsync',
	    value: function setAsync(async) {
	      this.asyncContent = async;
	      return this;
	    }
	
	    /**
	     * @returns {HTMLElement}
	     */
	
	  }, {
	    key: 'getFinalContent',
	    value: function getFinalContent() {
	      return this.finalContent;
	    }
	
	    /**
	     * @param {HTMLElement} element
	     * @returns {Widget}
	     */
	
	  }, {
	    key: 'setElement',
	    value: function setElement(element) {
	      this.element = element;
	      return this;
	    }
	
	    /**
	     * Destroys the generated content of this widget
	     * @returns {boolean}
	     */
	
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      if (this.finalContent && this.finalContent.parentNode) {
	        this.finalContent.parentNode.removeChild(this.finalContent);
	        return true;
	      }
	
	      delete this.element;
	      delete this.asyncContent;
	      delete this.finalContent;
	
	      return false;
	    }
	
	    /**
	     * Will find a widget on an Element
	     * @param {HTMLElement} element
	     * @returns {Widget|undefined}
	     */
	
	  }], [{
	    key: 'findWidget',
	    value: function findWidget(element) {
	      return element ? element.hfWidgetInstance : undefined;
	    }
	
	    /**
	     * Checks if a given object is an instance
	     * @param {Object} self
	     * @returns {boolean}
	     */
	
	  }, {
	    key: 'isWidget',
	    value: function isWidget(self) {
	      return self instanceof Widget || (typeof self === 'undefined' ? 'undefined' : _typeof(self)) === 'object' && self.hasOwnProperty('_isWidget');
	    }
	  }]);
	
	  return Widget;
	})();
	
	exports.default = Widget;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })(); /*
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * The MIT License (MIT)
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * Copyright (c) 2015 David Heidrich, BowlingX <me@bowlingx.com>
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * Permission is hereby granted, free of charge, to any person obtaining a copy
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * of this software and associated documentation files (the "Software"), to deal
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * in the Software without restriction, including without limitation the rights
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * copies of the Software, and to permit persons to whom the Software is
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * furnished to do so, subject to the following conditions:
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * The above copyright notice and this permission notice shall be included in
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * all copies or substantial portions of the Software.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * THE SOFTWARE.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        */
	
	/*!
	 * FlexCss.Toggleable
	 * Licensed under the MIT License (MIT)
	 * Copyright (c) 2015 David Heidrich, BowlingX <me@bowlingx.com>
	 */
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.EVENT_TAB_OPENED = exports.EVENT_TAB_CLOSED = undefined;
	
	var _Settings = __webpack_require__(101);
	
	var _Settings2 = _interopRequireDefault(_Settings);
	
	var _Widget = __webpack_require__(106);
	
	var _Widget2 = _interopRequireDefault(_Widget);
	
	var _Util = __webpack_require__(99);
	
	var _Util2 = _interopRequireDefault(_Util);
	
	var _Event = __webpack_require__(104);
	
	var _Event2 = _interopRequireDefault(_Event);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Event that is fired when a tab is closed
	 * @type {string}
	 */
	
	var EVENT_TAB_CLOSED = exports.EVENT_TAB_CLOSED = 'flexcss.tab.closed';
	
	/**
	 * Event that is fired when a tab has been opened
	 * @type {string}
	 */
	var EVENT_TAB_OPENED = exports.EVENT_TAB_OPENED = 'flexcss.tab.opened';
	/**
	 * @type {string}
	 */
	var ATTR_NAME = 'data-toggle';
	/**
	 * @type {string}
	 */
	var ACTIVE_CLASS = 'active';
	/**
	 * @type {string}
	 */
	var LOADING_CLASS = 'loading';
	
	/**
	 * @type {string}
	 */
	var ATTR_TOGGLE_LIST = 'data-toggle-list';
	
	/**
	 * Creates a toggleable element, either for tabs or a single toggle
	 */
	
	var Toggleable = (function () {
	    function Toggleable(ContainerId) {
	        _classCallCheck(this, Toggleable);
	
	        var doc = global.document;
	
	        this.container = ContainerId instanceof HTMLElement ? ContainerId : doc.getElementById(ContainerId);
	
	        this.loading = false;
	
	        if (!this.container) {
	            throw 'Toggleable container with id "' + ContainerId + '" not found';
	        }
	    }
	
	    /**
	     * Listener
	     * @param {Event} e
	     * @private
	     */
	
	    _createClass(Toggleable, [{
	        key: '_listener',
	        value: function _listener(e) {
	            var target = e.target,
	                parent = target.parentNode,
	                doc = global.document;
	
	            // support target child element to clicked
	            if (!target.hasAttribute(ATTR_NAME)) {
	                if (parent && parent.hasAttribute(ATTR_NAME)) {
	                    target = parent;
	                } else {
	                    return;
	                }
	            }
	
	            if (!target.hasAttribute(ATTR_NAME)) {
	                return;
	            }
	
	            var refId = target.getAttribute(ATTR_NAME),
	                ref = doc.getElementById(refId);
	
	            e.preventDefault();
	
	            if (this.loading) {
	                return;
	            }
	
	            this.toggleTarget(ref, target);
	        }
	
	        /**
	         * Registers Events for this instance
	         * @returns {Toggleable}
	         */
	
	    }, {
	        key: 'registerEvents',
	        value: function registerEvents() {
	            this.container.addEventListener(_Settings2.default.getTabEvent(), this._listener.bind(this));
	            return this;
	        }
	
	        /**
	         * Toggles given `ref`
	         * @param {HTMLElement} ref
	         * @param {HTMLElement} [target] optional target node
	         */
	
	    }, {
	        key: 'toggleTarget',
	        value: function toggleTarget(ref, target) {
	            var _this = this;
	
	            if (!target && !ref) {
	                return;
	            }
	            if (!target) {
	                target = document.querySelector('[' + ATTR_NAME + '="' + ref.id + '"]');
	            }
	
	            var maybeToggleNode,
	                future,
	                elClassList = target.classList,
	                parentClassList,
	                parent = target.parentNode,
	                doc = global.document;
	
	            future = new Promise(function (resolve, failure) {
	                if (ref) {
	                    resolve(ref);
	                } else {
	                    var widget = _Widget2.default.findWidget(target),
	                        async = widget ? widget.getAsync() : null;
	                    if (_Widget2.default.isWidget(widget) && async) {
	                        future = async.then(function (r) {
	                            if (r instanceof HTMLElement) {
	                                var id = _Util2.default.guid();
	                                r.id = id;
	                                target.setAttribute(ATTR_NAME, id);
	                                resolve(r);
	                            } else {
	                                throw 'Dynamically creating toggle-content is not supported right now. ' + 'Return an HTMLElement instance';
	                            }
	                        });
	                    } else {
	                        failure('Target not given');
	                    }
	                }
	            });
	
	            if (parent) {
	                maybeToggleNode = _Util2.default.parentsUntil(target, function (node) {
	                    return node && node.hasAttribute && node.hasAttribute(ATTR_TOGGLE_LIST);
	                });
	
	                parentClassList = parent.classList;
	                // Abort if element is already active and if is part of a toggle list
	                if (maybeToggleNode) {
	                    if (!parentClassList.contains(ACTIVE_CLASS)) {
	                        parentClassList.toggle(ACTIVE_CLASS);
	                        parentClassList.add(LOADING_CLASS);
	                    } else {
	                        return;
	                    }
	                }
	
	                if (maybeToggleNode) {
	                    for (var i = 0; i < maybeToggleNode.children.length; i++) {
	                        var n = maybeToggleNode.children[i],
	                            targetRef = n.children[0];
	                        if (n !== parent) {
	                            n.classList.remove(ACTIVE_CLASS);
	                            if (targetRef) {
	                                var attr = targetRef.getAttribute(ATTR_NAME),
	                                    el = attr ? doc.getElementById(attr) : null;
	                                if (el) {
	                                    _Event2.default.dispatchAndFire(el, EVENT_TAB_CLOSED);
	                                    el.classList.remove(ACTIVE_CLASS);
	                                    targetRef.classList.remove(ACTIVE_CLASS);
	                                }
	                            }
	                        }
	                    }
	                }
	            }
	            if (elClassList) {
	                elClassList.toggle(ACTIVE_CLASS);
	                elClassList.add(LOADING_CLASS);
	            }
	            this.loading = true;
	            future.then((function (r) {
	                _Event2.default.dispatchAndFire(r, EVENT_TAB_OPENED);
	                Toggleable._handleLoaded(target);
	                r.classList.toggle(ACTIVE_CLASS);
	                this.loading = false;
	            }).bind(this)).catch(function (reason) {
	                _this.loading = false;
	                Toggleable._handleLoaded(target);
	                console.warn(reason);
	            });
	        }
	
	        /**
	         * @param el
	         * @private
	         */
	
	    }], [{
	        key: '_handleLoaded',
	        value: function _handleLoaded(el) {
	            var parentClassList = el.parentNode.classList;
	            el.classList.remove(LOADING_CLASS);
	            if (parentClassList) {
	                parentClassList.remove(LOADING_CLASS);
	            }
	        }
	    }]);
	
	    return Toggleable;
	})();
	
	exports.default = Toggleable;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })(); /*
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * The MIT License (MIT)
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * Copyright (c) 2015 David Heidrich, BowlingX <me@bowlingx.com>
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * Permission is hereby granted, free of charge, to any person obtaining a copy
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * of this software and associated documentation files (the "Software"), to deal
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * in the Software without restriction, including without limitation the rights
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * copies of the Software, and to permit persons to whom the Software is
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * furnished to do so, subject to the following conditions:
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * The above copyright notice and this permission notice shall be included in
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * all copies or substantial portions of the Software.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * THE SOFTWARE.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        */
	
	/*!
	 * FlexCss.OffCanvas
	 * Licensed under the MIT License (MIT)
	 * Copyright (c) 2015 David Heidrich, BowlingX <me@bowlingx.com>
	 */
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _Settings = __webpack_require__(101);
	
	var _Settings2 = _interopRequireDefault(_Settings);
	
	var _Util = __webpack_require__(99);
	
	var _Util2 = _interopRequireDefault(_Util);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * @type {string}
	 */
	var ATTR_CLOSE_SIDEBAR = 'data-close-offcanvas';
	
	/**
	 * @type {string}
	 */
	var ATTR_TARGET = 'data-offcanvas';
	/**
	 * @type {string}
	 */
	var TOGGLE_CLASS = 'toggled-canvas';
	/**
	 * @type {string}
	 */
	var INIT_CLASS = 'init';
	/**
	 * @type {string}
	 */
	var OPEN_CLASS = 'open';
	/**
	 * @type {number}
	 */
	var HIDE_FACTOR = 3;
	
	/**
	 * A OffCanvas Implementation
	 */
	
	var OffCanvas = (function () {
	
	    /**
	     * Creates an off-canvas navigation
	     * @param {HTMLElement|String} NavigationId
	     * @param {HTMLElement|String} Darkener
	     * @param {int} factor positive will expect right sidebar, positive left
	     * @param {bool} [disableTouch] if true all touch events are disabled
	     * @constructor
	     */
	
	    function OffCanvas(NavigationId, Darkener, factor, disableTouch) {
	        var _this = this;
	
	        _classCallCheck(this, OffCanvas);
	
	        var doc = global.document;
	        var touched = 0;
	        var navigationContainer = NavigationId instanceof HTMLElement ? NavigationId : doc.getElementById(NavigationId);
	        var darkener = Darkener instanceof HTMLElement ? Darkener : doc.getElementById(Darkener);
	        var DARKENER_CLASS_TOGGLE = 'toggle-' + darkener.id || 'darkener';
	        var DARKENER_CLASS_INSTANT_TOGGLE = DARKENER_CLASS_TOGGLE + '-open';
	        var resetStyles = function resetStyles(s) {
	            s.transform = '';
	            s.transition = '';
	            s.webkitTransform = '';
	            s.webkitTransition = '';
	        };
	        var shouldNotTouch = function shouldNotTouch() {
	            return window.innerWidth >= _Settings2.default.get().smallBreakpoint;
	        };
	
	        if (!darkener || !navigationContainer) {
	            throw new Error('Could not find needed elements (Darkener and/or NavigationId)');
	        }
	
	        this.darkener = darkener;
	        this.darkenerClassToggle = DARKENER_CLASS_TOGGLE;
	        this.darkenerClassToggleInstant = DARKENER_CLASS_INSTANT_TOGGLE;
	
	        this.navigationContainer = navigationContainer;
	        this.navigationContainerId = navigationContainer.id;
	
	        // create id if id does not exist
	        if (!this.navigationContainerId) {
	            this.navigationContainerId = _Util2.default.guid();
	            navigationContainer.id = this.navigationContainerId;
	        }
	
	        if (!disableTouch) {
	            navigationContainer.addEventListener('touchstart', function (e) {
	                requestAnimationFrame(function () {
	                    if (shouldNotTouch()) {
	                        return;
	                    }
	                    touched = e.touches[0].clientX;
	                    var target = navigationContainer;
	                    var style = target.style;
	                    target.mustHide = false;
	                    style.transition = 'transform 0s ease';
	                    style.webkitTransition = '-webkit-transform 0s ease';
	                });
	            });
	            navigationContainer.addEventListener('touchmove', function (e) {
	                if (shouldNotTouch()) {
	                    return;
	                }
	                var x = e.touches[0].clientX;
	                var target = navigationContainer;
	                var style = target.style;
	                var calc = touched - x;
	                var bounds = target.getBoundingClientRect();
	                var compare = factor > 0 ? calc <= 0 : calc >= 0;
	                if (compare) {
	                    target.mustHide = factor > 0 ? calc * -1 > bounds.width / HIDE_FACTOR : calc > bounds.width / HIDE_FACTOR;
	                    style.transform = 'translate3d(' + calc * -1 + 'px,0,0)';
	                    style.webkitTransform = 'translate3d(' + calc * -1 + 'px,0,0)';
	                }
	            });
	            navigationContainer.addEventListener('touchend', function () {
	                requestAnimationFrame(function () {
	                    if (shouldNotTouch()) {
	                        return;
	                    }
	                    var target = navigationContainer;
	                    var style = target.style;
	                    if (target.mustHide) {
	                        var width = target.getBoundingClientRect().width * factor;
	                        style.transition = 'transform .2s ease';
	                        style.webkitTransition = '-webkit-transform .2s ease';
	
	                        style.transform = 'translate3d(' + width + 'px,0,0)';
	                        style.webkitTransform = 'translate3d(' + width + 'px,0,0)';
	                        _this._remove(function () {
	                            resetStyles(style);
	                        });
	                        _this._removeInstant();
	                    } else {
	                        resetStyles(style);
	                    }
	                });
	            });
	        }
	    }
	
	    /**
	     * @private
	     */
	
	    _createClass(OffCanvas, [{
	        key: '_remove',
	        value: function _remove(callback) {
	            var _this2 = this;
	
	            _Util2.default.addEventOnce(_Settings2.default.getTransitionEvent(), this.navigationContainer, function () {
	                // add timeout because transition event fires a little to early
	                setTimeout(function () {
	                    requestAnimationFrame(function () {
	                        var body = global.document.body;
	                        OffCanvas.currentOpen = null;
	                        body.classList.remove(TOGGLE_CLASS);
	                        body.classList.remove(_this2.darkenerClassToggle);
	                        if (callback) {
	                            callback();
	                        }
	                    });
	                }, _Settings2.default.get().darkenerFadeDelay);
	            });
	        }
	
	        /**
	         * @private
	         */
	
	    }, {
	        key: '_removeInstant',
	        value: function _removeInstant() {
	            this.navigationContainer.classList.remove(OPEN_CLASS);
	            global.document.body.classList.remove(this.darkenerClassToggleInstant);
	            this.darkener.classList.remove(INIT_CLASS);
	        }
	
	        /**
	         * Toggles a an off-canvas element
	         * @param e
	         * @private
	         */
	
	    }, {
	        key: '_toggle',
	        value: function _toggle(e) {
	            e.preventDefault();
	            var bodyClass = global.document.body.classList;
	            var darkenerClass = this.darkener.classList;
	            var DARKENER_CLASS_TOGGLE = this.darkenerClassToggle;
	            var DARKENER_CLASS_INSTANT_TOGGLE = this.darkenerClassToggleInstant;
	            var navigationControllerClassList = this.navigationContainer.classList;
	            if (this.navigationContainer.classList.contains(OPEN_CLASS)) {
	                this._remove();
	                this._removeInstant(navigationControllerClassList);
	            } else if (!OffCanvas.currentOpen) {
	                OffCanvas.currentOpen = this;
	                bodyClass.add(DARKENER_CLASS_INSTANT_TOGGLE);
	                bodyClass.add(TOGGLE_CLASS);
	                bodyClass.add(DARKENER_CLASS_TOGGLE);
	                darkenerClass.add(INIT_CLASS);
	                navigationControllerClassList.add(OPEN_CLASS);
	            }
	        }
	
	        /**
	         * Register events
	         * @param [delegate]
	         */
	
	    }, {
	        key: 'registerEvents',
	        value: function registerEvents(delegate) {
	            var _this3 = this;
	
	            var thisDelegate = delegate || global.document;
	            thisDelegate.addEventListener(_Settings2.default.getTabEvent(), function (e) {
	                if (OffCanvas.currentOpen && OffCanvas.currentOpen !== _this3) {
	                    return;
	                }
	                var id = _this3.navigationContainerId;
	                var validTarget = e.target.getAttribute(ATTR_TARGET) === id;
	                if (!_Util2.default.isPartOfNode(e.target, _this3.navigationContainer)) {
	                    if (validTarget || OffCanvas.currentOpen === _this3 && e.target === _this3.darkener) {
	                        _this3._toggle(e);
	                    }
	                } else {
	                    if (e.target.hasAttribute(ATTR_CLOSE_SIDEBAR)) {
	                        _this3._toggle(e);
	                    }
	                }
	            });
	        }
	    }]);
	
	    return OffCanvas;
	})();
	
	OffCanvas.currentOpen = null;
	
	exports.default = OffCanvas;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/*
	 * The MIT License (MIT)
	 *
	 * Copyright (c) 2015 David Heidrich, BowlingX <me@bowlingx.com>
	 *
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:
	 *
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 *
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	 */
	
	/*!
	 * FlexCss.Dropdown
	 * Licensed under the MIT License (MIT)
	 * Copyright (c) 2015 David Heidrich, BowlingX <me@bowlingx.com>
	 */
	
	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.EVENT_DROPDOWN_CLOSED = undefined;
	
	var _Util = __webpack_require__(99);
	
	var _Util2 = _interopRequireDefault(_Util);
	
	var _Settings = __webpack_require__(101);
	
	var _Settings2 = _interopRequireDefault(_Settings);
	
	var _Event = __webpack_require__(104);
	
	var _Event2 = _interopRequireDefault(_Event);
	
	var _Widget = __webpack_require__(106);
	
	var _Widget2 = _interopRequireDefault(_Widget);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * @type {string}
	 */
	var ATTR_CC = 'data-collision-container';
	/**
	 * @type {string}
	 */
	var ATTR_DARKENER = 'data-darkener-container';
	/**
	 * @type {string}
	 */
	var DARKENER_INIT = 'init';
	/**
	 * @type {string}
	 */
	var ATTR_DATA_TARGET = 'data-target';
	/**
	 * @type {string}
	 */
	var ATTR_CLOSE_DROPDOWN = 'data-close-dropdown';
	/**
	 * @type {string}
	 */
	var ATTR_NAME = 'data-dropdown';
	/**
	 * @type {string}
	 */
	var STATE_LOADING = 'loading';
	
	var CLS_DARKENER_DROPDOWN = 'darkener-dropdown';
	/**
	 * @type {string}
	 */
	var CLS_OPEN = 'open';
	
	/**
	 * @type {string}
	 */
	var CLS_DROPDOWN = 'dropdown';
	
	/**
	 * @type {string}
	 */
	var EVENT_DROPDOWN_CLOSED = exports.EVENT_DROPDOWN_CLOSED = 'flexcss.dropdown.closed';
	
	/**
	 * A Dropdown
	 */
	
	var Dropdown = (function () {
	    function Dropdown(DelegateContainer, Darkener) {
	        _classCallCheck(this, Dropdown);
	
	        var doc = global.document;
	
	        /**
	         * Container Element
	         * @type {HTMLElement}
	         */
	        this.container = DelegateContainer instanceof HTMLElement ? DelegateContainer : doc.getElementById(DelegateContainer);
	
	        this.currentOpen = null;
	        this.currentTarget = null;
	        /**
	         * @type {HTMLElement}
	         */
	        this.darkener = Darkener instanceof HTMLElement ? Darkener : document.getElementById(Darkener);
	
	        this.destroyOnClose = false;
	
	        if (!this.darkener || !this.container) {
	            throw new Error('required elements not found (darkener and container element)');
	        }
	    }
	
	    /**
	     * Method that handles delegation events for dropdowns
	     * @param e
	     * @returns {boolean}
	     * @private
	     */
	
	    _createClass(Dropdown, [{
	        key: '_delegateFunction',
	        value: function _delegateFunction(e) {
	            var currentOpen = this.currentOpen;
	            var targetHas = e.target.hasAttribute(ATTR_NAME);
	            var parentHas = e.target.parentNode ? e.target.parentNode.hasAttribute(ATTR_NAME) : false;
	            var target = targetHas ? e.target : e.target.parentNode;
	            var targetIsCurrent = target === this.currentTarget;
	
	            if (currentOpen && !_Util2.default.isPartOfNode(e.target, currentOpen) || targetIsCurrent) {
	                this.close();
	                if (targetIsCurrent) {
	                    e.preventDefault();
	                }
	                return targetIsCurrent ? false : this._delegateFunction(e);
	            }
	
	            if (targetHas || parentHas && !currentOpen) {
	                e.preventDefault();
	                e.stopImmediatePropagation();
	
	                if (target.isLoading) {
	                    return false;
	                }
	                this.createDropdown(target);
	            } else {
	                if (currentOpen) {
	                    if (e.target.hasAttribute(ATTR_CLOSE_DROPDOWN)) {
	                        e.preventDefault();
	                        this.close();
	                    }
	                    if (!_Util2.default.isPartOfNode(e.target, currentOpen)) {
	                        this.close();
	                    }
	                }
	            }
	        }
	
	        /**
	         * Register Events for this dropdown container
	         * @returns {Dropdown}
	         */
	
	    }, {
	        key: 'registerEvents',
	        value: function registerEvents() {
	            this.container.addEventListener(_Settings2.default.getTabEvent(), this._delegateFunction.bind(this), true);
	            return this;
	        }
	
	        /**
	         * Destroys this instance, unbinds events
	         * @returns {Dropdown}
	         */
	
	    }, {
	        key: 'destroy',
	        value: function destroy() {
	            this.container.removeEventListener(_Settings2.default.getTabEvent(), this._delegateFunction.bind(this), true);
	            return this;
	        }
	
	        /**
	         * Destroys instance on close of dropdown
	         * @param v
	         * @returns {Dropdown}
	         */
	
	    }, {
	        key: 'setDestroyOnClose',
	        value: function setDestroyOnClose(v) {
	            this.destroyOnClose = v;
	            return this;
	        }
	
	        /**
	         * Will add the right class to container for specific darkener id
	         * @param instance
	         * @param show
	         */
	
	    }, {
	        key: 'toggleDarkenerToggler',
	        value: function toggleDarkenerToggler(instance, show) {
	            var cls = 'toggle-' + (instance.id || CLS_DARKENER_DROPDOWN);
	            var classList = this.container.classList;
	            if (show) {
	                classList.add(cls);
	            } else {
	                classList.remove(cls);
	            }
	        }
	
	        /**
	         * Closes Dropdown on current instance
	         * @return {Boolean|Promise}
	         */
	
	    }, {
	        key: 'close',
	        value: function close() {
	            var _this = this;
	
	            var currentOpen = this.currentOpen;
	            if (!currentOpen) {
	                return false;
	            }
	            var future = undefined;
	            var darkenerInstance = currentOpen.flexDarkenerInstance || this.darkener;
	            var thisCurrentOpen = currentOpen;
	
	            future = new Promise(function (resolve) {
	                if (window.getComputedStyle(currentOpen).position === 'fixed') {
	                    _Util2.default.addEventOnce(_Settings2.default.getTransitionEvent(), currentOpen, function () {
	                        setTimeout(function () {
	                            _Event2.default.dispatchAndFire(thisCurrentOpen, EVENT_DROPDOWN_CLOSED);
	                            // if a new dropdown has been opened in the meantime, do not remove darkener
	                            if (_this.currentOpen !== null) {
	                                return false;
	                            }
	                            _this.toggleDarkenerToggler(darkenerInstance, false);
	                            _this.container.classList.remove(_Settings2.default.get().canvasToggledClass);
	                            resolve(true);
	                        }, _Settings2.default.get().darkenerFadeDelay);
	                    });
	                } else {
	                    resolve(true);
	                    _Event2.default.dispatchAndFire(thisCurrentOpen, EVENT_DROPDOWN_CLOSED);
	                }
	            });
	
	            currentOpen.classList.remove(CLS_OPEN);
	
	            if (currentOpen.flexDarkenerInstance) {
	                currentOpen.flexDarkenerInstance.classList.remove(DARKENER_INIT);
	            } else {
	                this.darkener.classList.remove(DARKENER_INIT);
	            }
	
	            this.currentOpen = null;
	            this.currentTarget = null;
	
	            if (this.destroyOnClose) {
	                this.destroy();
	            }
	
	            return future;
	        }
	
	        /**
	         * Creates a dropdown on given target and opens it
	         * @param {HTMLElement} target target where this dropdown is placed
	         * @param {FlexCss.Widget} [thisWidget] if given will use widget instead of widget instance
	         * @return {FlexCss.Dropdown}
	         */
	
	    }, {
	        key: 'createDropdown',
	        value: function createDropdown(target, thisWidget) {
	            var _this2 = this;
	
	            var doc = global.document;
	
	            if (!target) {
	                throw new Error('Dropdown target not found');
	            }
	
	            var widget = thisWidget || _Widget2.default.findWidget(target);
	            var future = undefined;
	            var data = target.getAttribute(ATTR_NAME);
	            var dropdownContainerElement = doc.getElementById(data);
	            var async = !dropdownContainerElement && _Widget2.default.isWidget(widget) ? widget.getAsync() : false;
	
	            if (async) {
	                target.classList.add(STATE_LOADING);
	                target.isLoading = true;
	                future = async.then(function (r) {
	                    if (r instanceof HTMLElement) {
	                        if (r.id) {
	                            target.setAttribute(ATTR_NAME, r.id);
	                        }
	                        return r;
	                    }
	                    // Create container Element:
	                    var element = doc.createElement('div');
	                    element.className = CLS_DROPDOWN;
	                    element.innerHTML = r;
	                    element.id = _Util2.default.guid();
	                    // Cache target for later use:
	                    target.setAttribute(ATTR_NAME, element.id);
	                    _this2.container.appendChild(element);
	                    return element;
	                }).then(function (r) {
	                    target.isLoading = false;
	                    target.classList.remove(STATE_LOADING);
	                    return r;
	                });
	            } else {
	                if (!dropdownContainerElement) {
	                    throw new Error('Could not found Dropdown container with ID "' + data + '"');
	                }
	                future = new Promise(function (r) {
	                    r(dropdownContainerElement);
	                });
	            }
	
	            future.then(function (dropdownContent) {
	                if (_this2.currentOpen) {
	                    _this2.close();
	                }
	                // Skip one frame to show animation
	                target.dropdownContent = dropdownContent;
	                var isAbsolute = global.getComputedStyle(dropdownContent).position === 'absolute';
	                dropdownContent.hfWidgetInstance = _this2;
	
	                if (!target.flexCollisionContainer) {
	                    var collisionC = target.getAttribute(ATTR_CC);
	                    target.flexCollisionContainer = collisionC ? doc.getElementById(collisionC) || document.documentElement : document.documentElement;
	                }
	
	                dropdownContent.classList.toggle(CLS_OPEN);
	                if (dropdownContent.classList.contains(CLS_OPEN)) {
	                    _this2.currentOpen = dropdownContent;
	                    _this2.currentTarget = target;
	                }
	                if (isAbsolute) {
	                    // Check collision:
	                    var selfTarget = target.getAttribute(ATTR_DATA_TARGET);
	                    selfTarget = selfTarget ? doc.getElementById(selfTarget) : target;
	                    _Util2.default.setupPositionNearby(selfTarget, dropdownContent, target.flexCollisionContainer);
	                } else {
	                    _this2.container.classList.add(_Settings2.default.get().canvasToggledClass);
	                    // optionally get custom darkener container for target
	                    var d = target.getAttribute(ATTR_DARKENER);
	                    if (d) {
	                        dropdownContent.flexDarkenerInstance = doc.getElementById(d);
	                        (dropdownContent.flexDarkenerInstance || _this2.darkener).classList.toggle(DARKENER_INIT);
	                    } else {
	                        _this2.darkener.classList.toggle(DARKENER_INIT);
	                    }
	                    _this2.toggleDarkenerToggler(dropdownContent.flexDarkenerInstance || _this2.darkener, true);
	
	                    dropdownContent.style.left = '0';
	                    dropdownContent.style.top = 'auto';
	                }
	            });
	        }
	    }]);
	
	    return Dropdown;
	})();
	
	exports.default = Dropdown;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/*
	 * The MIT License (MIT)
	 *
	 * Copyright (c) 2015 David Heidrich, BowlingX <me@bowlingx.com>
	 *
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:
	 *
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 *
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	 */
	
	/*!
	 * FlexCss.LightBox
	 * Licensed under the MIT License (MIT)
	 * Copyright (c) 2015 David Heidrich, BowlingX <me@bowlingx.com>
	 */
	
	'use strict';
	
	/* global Image, TouchEvent*/
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _Modal = __webpack_require__(105);
	
	var _Modal2 = _interopRequireDefault(_Modal);
	
	var _Settings = __webpack_require__(101);
	
	var _Settings2 = _interopRequireDefault(_Settings);
	
	var _Widget = __webpack_require__(106);
	
	var _Widget2 = _interopRequireDefault(_Widget);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var ATTR_MAX_WIDTH = 'data-original-width';
	var ATTR_MAX_HEIGHT = 'data-original-height';
	var ATTR_SRC = 'data-src';
	
	var CLS_HAS_PREV = 'has-prev';
	var CLS_HAS_NEXT = 'has-next';
	var CLS_LOADING = 'loading';
	
	var ATTR_NO_THUMBNAIL = 'data-no-thumbnail';
	var ATTR_DATA_HREF = 'data-href';
	var ATTR_HREF = 'href';
	
	var KEY_NEXT = 39;
	var KEY_PREV = 37;
	var ATTR_CLOSE = 'data-close-modal';
	/**
	 * A Simple LightBox
	 */
	
	var LightBox = (function () {
	
	    /**
	     * Creates a new Lightbox
	     * @param DelegateContainer
	     * @param AttributeSelector
	     * @param ModalAppend
	     * @param [options]
	     */
	
	    function LightBox(DelegateContainer, AttributeSelector, ModalAppend, options) {
	        _classCallCheck(this, LightBox);
	
	        var thisDelegateContainer = DelegateContainer instanceof HTMLElement ? DelegateContainer : document.getElementById(DelegateContainer);
	
	        this._modalAppend = ModalAppend || DelegateContainer;
	        /**
	         * @type {Function}
	         */
	        this._resizeEvent = null;
	        /**
	         * @type {Function}
	         */
	        this._keyboardNextEvent = null;
	        /**
	         * @type {Promise}
	         */
	        this._future = null;
	        /**
	         * @type {Promise}
	         */
	        this._nextFuture = this._future;
	        /**
	         * @type {HTMLElement}
	         */
	        this._imageContainer = null;
	        /**
	         * @type {HTMLElement}
	         */
	        this._modalContainerDiv = null;
	        /**
	         * @type {HTMLElement}
	         */
	        this._contentContainer = null;
	        /**
	         * @type {HTMLElement}
	         */
	        this._closerContainerDiv = null;
	        /**
	         * @type {HTMLElement}
	         */
	        this._delegateContainer = thisDelegateContainer;
	        /**
	         * @type {HTMLElement}
	         */
	        this._attributeSelector = AttributeSelector;
	        /**
	         * @type {Widget}
	         */
	        this._widget = null;
	        /**
	         * @type {boolean}
	         */
	        this._isOpen = false;
	        /**
	         * @type {HTMLElement}
	         */
	        this.target = null;
	        /**
	         * @type {HTMLElement}
	         */
	        this.img = null;
	        /**
	         * @type {boolean}
	         */
	        this._isLoading = false;
	
	        /**
	         * Default options
	         */
	        this.options = {
	            // set if prev and next should be available
	            registerPrevNextEvents: true,
	            // set if modal should be closed after last image
	            closeOnLast: true,
	            // called when next image is requested (either by keyboard or click), return false to abort
	            onNext: function onNext() {
	                return true;
	            },
	            onClose: function onClose() {},
	            getNext: null,
	            getPrev: null,
	            // called when underlying target changed
	            onSwitchImage: function onSwitchImage() {}
	        };
	
	        Object.assign(this.options, options);
	    }
	
	    /**
	     * @param {HTMLElement} node
	     * @returns {HTMLElement|null}
	     */
	
	    _createClass(LightBox, [{
	        key: 'findImmediateNextTarget',
	        value: function findImmediateNextTarget(node) {
	            if (node && node.children[0].hasAttribute(this._attributeSelector)) {
	                return node.children[0];
	            }
	            return null;
	        }
	
	        /**
	         * Will fetch the next element of a lightBox
	         * @param {HTMLElement} target
	         * @returns {null|HTMLElement}
	         */
	
	    }, {
	        key: 'getNext',
	        value: function getNext(target) {
	            if (this.options.getNext) {
	                return this.options.getNext.apply(this, [target]);
	            }
	            return this.findImmediateNextTarget(target.parentNode.nextElementSibling);
	        }
	
	        /**
	         * Will fetch the previous element of a lightBox
	         * @param {HTMLElement} target
	         * @returns {null|HTMLElement}
	         */
	
	    }, {
	        key: 'getPrev',
	        value: function getPrev(target) {
	            if (this.options.getPrev) {
	                return this.options.getPrev.apply(this, [target]);
	            }
	            return this.findImmediateNextTarget(target.parentNode.previousElementSibling);
	        }
	
	        /**
	         * Registers events for delegate container
	         */
	
	    }, {
	        key: 'registerEvents',
	        value: function registerEvents(onOpen) {
	            var _this = this;
	
	            this._delegateContainer.addEventListener(_Settings2.default.getTabEvent(), function (e) {
	                var target = e.target;
	                var parent = target.parentNode;
	                var validTarget = target.hasAttribute(_this._attributeSelector);
	                var parentIsValid = parent && parent.hasAttribute(_this._attributeSelector);
	
	                if (!validTarget && parentIsValid) {
	                    validTarget = true;
	                    target = parent;
	                }
	                if (validTarget) {
	                    e.preventDefault();
	                    _this.open(target).then(function (r) {
	                        if (onOpen) {
	                            onOpen.apply(_this, [r, target]);
	                        }
	                    });
	                }
	            });
	        }
	
	        /**
	         * @returns {HTMLElement}
	         */
	
	    }, {
	        key: 'getContentContainer',
	        value: function getContentContainer() {
	            return this._contentContainer;
	        }
	
	        /**
	         * Setup max-width and max-height
	         * @param {HTMLElement} target
	         * @param {HTMLElement} img
	         * @param {HTMLElement} loadedImage
	         * @private
	         */
	
	    }, {
	        key: 'switchImageByDirection',
	
	        /**
	         * Switches to the next image
	         * @param {boolean} direction
	         */
	        value: function switchImageByDirection(direction) {
	            var next = direction ? this.getPrev(this.target) : this.getNext(this.target);
	            if (this.options.onNext.apply(this, [next])) {
	                return this.switchImage(next);
	            }
	            return new Promise(function (_, reject) {
	                return reject(next);
	            });
	        }
	
	        /**
	         * Checks if lightbox is currently loading
	         * @returns {boolean}
	         */
	
	    }, {
	        key: 'isLoading',
	        value: function isLoading() {
	            return this._isLoading;
	        }
	
	        /**
	         * Checks if modal should be closed
	         * @private
	         */
	
	    }, {
	        key: '_runOptionalClose',
	        value: function _runOptionalClose() {
	            if (this.options.closeOnLast) {
	                this.modal.close();
	            }
	        }
	    }, {
	        key: '_setupPrevNextStates',
	        value: function _setupPrevNextStates() {
	            var target = this.target;
	            var hasPrev = this.getPrev(target);
	            var hasNext = this.getNext(target);
	            var hasPrevClass = CLS_HAS_PREV;
	            var hasNextClass = CLS_HAS_NEXT;
	            // because IE does not support the second toggle parameter, we need to do this manually
	            if (hasPrev) {
	                this._imageContainer.classList.add(hasPrevClass);
	            } else {
	                this._imageContainer.classList.remove(hasPrevClass);
	            }
	            if (hasNext) {
	                this._imageContainer.classList.add(hasNextClass);
	            } else {
	                this._imageContainer.classList.remove(hasNextClass);
	            }
	        }
	
	        /**
	         * @param img
	         * @private
	         */
	
	    }, {
	        key: '_calculateContainer',
	        value: function _calculateContainer(img) {
	            var _this2 = this;
	
	            if (_Settings2.default.isIE()) {
	                setTimeout(function () {
	                    _this2._imageContainer.style.height = img.offsetHeight + 'px';
	                }, 0);
	            }
	        }
	
	        /**
	         * Switch to a specific image
	         * @param next
	         * @returns {*}
	         */
	
	    }, {
	        key: 'switchImage',
	        value: function switchImage(next) {
	            var _this3 = this;
	
	            var self = this;
	            var img = this.img;
	            this._isLoading = true;
	            self._nextFuture = new Promise(function (resolve, reject) {
	                // notify observers about image switching
	                self.options.onSwitchImage.apply(self, [self._nextFuture]);
	                if (next) {
	                    var _ret = (function () {
	                        var nextThumb = next.hasAttribute(ATTR_NO_THUMBNAIL) ? next : next.children[0] || next;
	                        var nextHighRes = next.getAttribute(ATTR_DATA_HREF) || next.getAttribute(ATTR_HREF);
	                        var nextSource = nextThumb.getAttribute(ATTR_SRC) || nextThumb.src || nextHighRes;
	                        var nextImgObject = new Image();
	
	                        if (!nextSource) {
	                            reject(next);
	                            return {
	                                v: undefined
	                            };
	                        }
	                        // set new target to next element
	                        _this3.target = next;
	                        nextImgObject.src = nextSource;
	                        self._imageContainer.classList.add(CLS_LOADING);
	                        nextImgObject.addEventListener('load', function () {
	                            img.src = nextSource;
	                            self._imageContainer.style.backgroundImage = 'url(' + nextSource + ')';
	                            LightBox._setupMaxWidthHeight(next, img, nextImgObject);
	                            self._calculateContainer(img);
	                            self.highRes(nextThumb, nextHighRes);
	                            self._setupPrevNextStates();
	                            self._imageContainer.classList.remove(CLS_LOADING);
	                            _this3._isLoading = false;
	                            resolve(nextSource, _this3.target);
	                        });
	                    })();
	
	                    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	                } else {
	                    reject(_this3);
	                }
	            });
	            return self._nextFuture;
	        }
	
	        /**
	         * Setup High-Resolution picture
	         * @param {HTMLElement} thisThumbnail
	         * @param {String} thisImgHighResolution
	         */
	
	    }, {
	        key: 'highRes',
	        value: function highRes(thisThumbnail, thisImgHighResolution) {
	            var _this4 = this;
	
	            if (thisImgHighResolution && thisThumbnail.src !== thisImgHighResolution) {
	                var highImageObj = new Image();
	                highImageObj.src = thisImgHighResolution;
	                highImageObj.addEventListener('load', function () {
	                    // if current image is still available
	                    if (_this4._getSrc(thisThumbnail) === _this4.img.src) {
	                        _this4.img.src = thisImgHighResolution;
	                        _this4._imageContainer.style.backgroundImage = 'url(' + thisImgHighResolution + ')';
	                    }
	                });
	            }
	        }
	
	        /**
	         * Extracts the source of an image
	         * @param target
	         * @returns {String|null}
	         * @private
	         */
	
	    }, {
	        key: '_getSrc',
	        value: function _getSrc(target) {
	            return target.getAttribute(ATTR_SRC) || target.src;
	        }
	
	        /**
	         * Will show a lightBox on given target
	         * @param {HTMLElement} target
	         * @returns {$.Deferred|*}
	         */
	
	    }, {
	        key: 'open',
	        value: function open(target) {
	            var _this5 = this;
	
	            var self = this;
	
	            if (!target) {
	                return false;
	            }
	
	            this.target = target;
	
	            // if lightBox is open, we just switch to the new target image
	            if (this._isOpen && target) {
	                return this.switchImage(target).then(function () {
	                    return _this5;
	                });
	            }
	
	            this._isOpen = true;
	
	            /**
	             * Setup Widget for modal
	             * @type {Widget}
	             */
	            this._widget = new _Widget2.default().setAsync(function () {
	                // thumbnail is either target itself or expected to be first childNode
	                var thumbnail = target.hasAttribute(ATTR_NO_THUMBNAIL) ? target : target.children[0] || target;
	
	                var imgHighResolution = target.getAttribute(ATTR_DATA_HREF) || target.getAttribute(ATTR_HREF);
	                var imgSrc = _this5._getSrc(thumbnail) || imgHighResolution;
	
	                var imageObj = new Image();
	                imageObj.src = imgSrc;
	                _this5._imageContainer = document.createElement('div');
	                _this5._modalContainerDiv = document.createElement('div');
	                _this5._closerContainerDiv = document.createElement('i');
	                _this5._contentContainer = document.createElement('div');
	
	                _this5._closerContainerDiv.className = 'modal-close modal-close-lightbox icon-cancel-1';
	                _this5._closerContainerDiv.setAttribute(ATTR_CLOSE, ATTR_CLOSE);
	
	                _this5._modalContainerDiv.className = 'modal image-modal';
	                _this5._modalContainerDiv.appendChild(_this5._imageContainer);
	                _this5._modalContainerDiv.appendChild(_this5._contentContainer);
	                _this5._modalContainerDiv.appendChild(_this5._closerContainerDiv);
	                _this5._contentContainer.className = 'content-container';
	                _this5._isLoading = true;
	                _this5._future = new Promise(function (resolve) {
	                    imageObj.addEventListener('load', function () {
	                        _this5._imageContainer.className = 'image-container';
	                        var img = document.createElement('img');
	                        // current image
	                        _this5.img = img;
	
	                        img.src = imgSrc;
	                        LightBox._setupMaxWidthHeight(target, img, imageObj);
	                        _this5._imageContainer.appendChild(img);
	                        _this5._imageContainer.style.backgroundImage = 'url(' + imgSrc + ')';
	
	                        resolve(self._modalContainerDiv);
	                        _this5._isLoading = false;
	
	                        if (_Settings2.default.isIE()) {
	                            self._resizeEvent = global.addEventListener('resize', function () {
	                                setTimeout(function () {
	                                    self._imageContainer.style.height = img.offsetHeight + 'px';
	                                }, 0);
	                            });
	                        }
	
	                        if (self.options.registerPrevNextEvents) {
	                            self._setupPrevNextStates();
	                            // prev or next on touch/click
	                            self._imageContainer.addEventListener(_Settings2.default.getTabEvent(), function (e) {
	                                if (self.isLoading()) {
	                                    return;
	                                }
	                                e.preventDefault();
	
	                                var ev = e;
	                                var pageX = global.TouchEvent && ev instanceof TouchEvent ? ev.changedTouches[0].pageX : ev.pageX;
	                                var rect = self._imageContainer.getBoundingClientRect();
	                                var imgX = rect.left;
	                                var wrapperWidth = rect.width;
	                                var posX = pageX - imgX;
	
	                                self.switchImageByDirection(wrapperWidth / 2 > posX).catch(function () {
	                                    self._runOptionalClose();
	                                });
	                            });
	
	                            // register keyboard events
	                            self._keyboardNextEvent = function (e) {
	                                if (e.keyCode === KEY_NEXT || e.keyCode === KEY_PREV) {
	                                    if (self.isLoading()) {
	                                        return;
	                                    }
	                                    self.switchImageByDirection(e.keyCode === KEY_PREV).catch(function () {
	                                        self._runOptionalClose();
	                                    });
	                                }
	                            };
	                            global.addEventListener('keydown', self._keyboardNextEvent);
	                        } else {
	                            self._imageContainer.addEventListener(_Settings2.default.getTabEvent(), function () {
	                                self._runOptionalClose();
	                            });
	                        }
	
	                        self.highRes(thumbnail, imgHighResolution);
	                    });
	                });
	
	                _this5._future.then(function () {
	                    self._calculateContainer(_this5.img);
	                });
	
	                self._modalContainerDiv.addEventListener(_Modal.EVENT_MODAL_CLOSED, function () {
	                    // cleanup:
	                    _this5._modalContainerDiv.parentNode.removeChild(_this5._modalContainerDiv);
	                    _this5.options.onClose.apply(self);
	                    _this5._isOpen = false;
	                    _this5.modal.destroy();
	                    // unbind events
	                    if (_this5._keyboardNextEvent) {
	                        global.removeEventListener('keydown', self._keyboardNextEvent);
	                    }
	                    if (_this5._resizeEvent) {
	                        global.removeEventListener('resize', self._resizeEvent);
	                    }
	                });
	
	                return _this5._future;
	            });
	
	            this._nextFuture = this._future;
	
	            if (self._widget) {
	                this.modal = new _Modal2.default(this._modalAppend);
	                // make sure we close stack before
	                return this.modal.close().fromWidget(self._widget).then(function () {
	                    return self._future.then(function () {
	                        return self;
	                    });
	                });
	            }
	            return false;
	        }
	    }], [{
	        key: '_setupMaxWidthHeight',
	        value: function _setupMaxWidthHeight(target, img, loadedImage) {
	            var nextMaxWidth = target.getAttribute(ATTR_MAX_WIDTH);
	            var nextMaxHeight = target.getAttribute(ATTR_MAX_HEIGHT);
	            if (nextMaxWidth && nextMaxHeight) {
	                img.style.maxWidth = nextMaxWidth + "px";
	                img.style.maxHeight = nextMaxHeight + "px";
	            } else {
	                img.style.maxWidth = loadedImage.width + "px";
	                img.style.maxHeight = loadedImage.height + "px";
	            }
	        }
	    }]);
	
	    return LightBox;
	})();
	
	exports.default = LightBox;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }
/******/ ])
});
;
//# sourceMappingURL=site.map