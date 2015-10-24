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

	module.exports = __webpack_require__(88);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _interopRequireDefault = __webpack_require__(2)['default'];
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _Rendering = __webpack_require__(3);
	
	var _Rendering2 = _interopRequireDefault(_Rendering);
	
	var _utilUtil = __webpack_require__(33);
	
	var _utilUtil2 = _interopRequireDefault(_utilUtil);
	
	var _RenderResult = __webpack_require__(34);
	
	var _RenderResult2 = _interopRequireDefault(_RenderResult);
	
	exports['default'] = {
	    Rendering: _Rendering2['default'],
	    Util: _utilUtil2['default'],
	    RenderResult: _RenderResult2['default']
	};
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	exports["default"] = function (obj) {
	  return obj && obj.__esModule ? obj : {
	    "default": obj
	  };
	};
	
	exports.__esModule = true;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/* global Node */
	
	'use strict';
	
	var _get = __webpack_require__(4)['default'];
	
	var _inherits = __webpack_require__(18)['default'];
	
	var _createClass = __webpack_require__(29)['default'];
	
	var _classCallCheck = __webpack_require__(32)['default'];
	
	var _interopRequireDefault = __webpack_require__(2)['default'];
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _utilUtil = __webpack_require__(33);
	
	var _utilUtil2 = _interopRequireDefault(_utilUtil);
	
	var _RenderResult = __webpack_require__(34);
	
	var _RenderResult2 = _interopRequireDefault(_RenderResult);
	
	var _RenderingEvents2 = __webpack_require__(35);
	
	var _RenderingEvents3 = _interopRequireDefault(_RenderingEvents2);
	
	/**
	 * @type {string}
	 */
	var TAG_NAME = 'x-marker';
	/**
	 * @type {string}
	 */
	var ATTR_DATA_ORIGINAL_OFFSET_START = 'data-original-offset-start';
	exports.ATTR_DATA_ORIGINAL_OFFSET_START = ATTR_DATA_ORIGINAL_OFFSET_START;
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
	var EVENT_WRAPPED_NODE = 'wrapped-node';
	
	exports.EVENT_WRAPPED_NODE = EVENT_WRAPPED_NODE;
	/**
	 * Manages a single Render
	 */
	
	var Rendering = (function (_RenderingEvents) {
	    _inherits(Rendering, _RenderingEvents);
	
	    /**
	     * @param {Document} document
	     * @param {object} options
	     * @param {Node} context
	     */
	
	    function Rendering(document, options, context) {
	        _classCallCheck(this, Rendering);
	
	        _get(Object.getPrototypeOf(Rendering.prototype), 'constructor', this).call(this, options, document);
	
	        /**
	         * ID of rendering, will be set on each element that is part of it
	         * @type {String}
	         */
	        this.id = _utilUtil2['default'].guid();
	
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
	
	    _createClass(Rendering, [{
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
	            var _this = this;
	
	            this.id = id;
	
	            if (this._renderResult) {
	                this.wrapperNodes.forEach(function (node) {
	                    return node.setAttribute(ATTR_DATA_ID, _this.id);
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
	            var el = this.document.createElement(TAG_NAME),
	                vTrue = "true";
	            if (!omitHighlight) {
	                el.className = this.options.className.join(' ');
	                // save this marker instance to given node
	                Rendering.setMarklibInstance(el, this);
	                // keep track of highlight nodes
	                this.wrapperNodes.push(el);
	                el.setAttribute(ATTR_DATA_IS_HIGHLIGHT_NODE, vTrue);
	                el.setAttribute(ATTR_DATA_ID, this.getId());
	            }
	            el.setAttribute(_utilUtil.DATA_IS_SELECTION, vTrue);
	
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
	            var el = this._createWrapTemplate(),
	                vTrue = "true";
	            el.setAttribute(ATTR_DATA_START_END, vTrue);
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
	            wrapper.setAttribute(_utilUtil.ATTR_DATA_ORIGINAL_INDEX, _utilUtil2['default'].getIndexParentIfHas(initialNode, index));
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
	            var originalIndex = optionalIndex >= 0 ? optionalIndex : _utilUtil2['default'].calcIndex(el);
	            var wrapper = this._createWrapTemplate(omitHighlight);
	            wrapper.setAttribute(_utilUtil.ATTR_DATA_ORIGINAL_INDEX, _utilUtil2['default'].getIndexParentIfHas(el, originalIndex));
	            var offsetLength = optionalLength >= 0 ? optionalLength : _utilUtil2['default'].getOffsetParentIfHas(el);
	            wrapper.setAttribute(ATTR_DATA_ORIGINAL_OFFSET_START, offsetLength);
	
	            // Save a reference to original text node in wrapper
	            wrapper.setAttribute(DATA_ORIGINAL_TEXT_NODE_INDEX, originalIndex);
	
	            if (optionalIsSameNode) {
	                wrapper.setAttribute(ATTR_DATA_START_END, ATTR_DATA_START_END);
	            }
	            var wrap = _utilUtil2['default'].wrap(el, wrapper);
	
	            this.emit(EVENT_WRAPPED_NODE, el, wrap);
	
	            return wrap;
	        }
	
	        /**
	         * Create split container element
	         * @param originalElement {Node} original text node element that is created a wrapper for
	         * @param index
	         * @param offset
	         * @returns {*|jQuery|Node}
	         */
	    }, {
	        key: '_createSplitContainer',
	        value: function _createSplitContainer(originalElement, index, offset) {
	            var wrapper = this.document.createElement(TAG_NAME),
	                vTrue = "true";
	            wrapper.setAttribute(_utilUtil.DATA_IS_SELECTION, vTrue);
	            wrapper.setAttribute(_utilUtil.ATTR_DATA_ORIGINAL_INDEX, _utilUtil2['default'].getIndexParentIfHas(originalElement, index));
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
	            var _this2 = this;
	
	            var next = start,
	                found = false;
	
	            // Capsule some logic
	            var wrap = (function (n) {
	                var instance = Rendering.getMarklibInstance(n.parentNode);
	                if (n.parentNode.hasAttribute(ATTR_DATA_START_END) && n.parentNode.hasAttribute(ATTR_DATA_IS_HIGHLIGHT_NODE) && instance === _this2) {
	                    _this2._createWrap(n, undefined, undefined, undefined, true);
	                } else {
	                    _this2._createWrap(n);
	                }
	            }).bind(this);
	
	            // helper functions
	
	            var wrapIf = function wrapIf(n) {
	                if (!_utilUtil2['default'].nodeIsEmpty(n)) {
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
	                        _utilUtil2['default'].walkDom(currentNext, walkIfContained);
	                        found = true;
	                    } else {
	                        _utilUtil2['default'].walkTextNodes(currentNext, walkIfNotContained);
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
	            var initialText = textNode.nodeValue,
	                initialIndex = _utilUtil2['default'].calcIndex(textNode);
	
	            if (!initialText) {
	                return false;
	            }
	            //If there is an unmarked part in the beginning of the text node,
	            //cut off that part and put it into it's own textnode.
	            if (startIndex > 0) {
	                var textBefore = initialText.slice(0, startIndex);
	                textNode.parentNode.insertBefore(this.document.createTextNode(textBefore), textNode);
	                // wrap cutted text node:
	                _utilUtil2['default'].wrap(textNode.previousSibling, this._createSplitContainer(textNode, initialIndex, _utilUtil2['default'].getOffsetParentIfHas(textNode)));
	            }
	            //If there is an unmarked part at the end of the text node,
	            //cut off that part and put it into it's own textnode.
	            if (endIndex < initialText.length) {
	                var textAfter = initialText.slice(endIndex, initialText.length);
	                textNode.parentNode.insertBefore(this.document.createTextNode(textAfter), textNode.nextSibling);
	                _utilUtil2['default'].wrap(textNode.nextSibling, this._createSplitContainer(textNode, initialIndex, _utilUtil2['default'].getOffsetParentIfHas(textNode) + endIndex));
	            }
	
	            //Cutoff the unmarked parts and wrap the textnode into a span.
	            textNode.nodeValue = initialText.slice(startIndex, endIndex);
	            this.startContainer = this._createWrap(textNode, _utilUtil2['default'].getOffsetParentIfHas(textNode) + startIndex, initialIndex, true).parentNode;
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
	            var startContainerIndex = _utilUtil2['default'].calcIndex(startContainer);
	            var endContainerIndex = _utilUtil2['default'].calcIndex(endContainer);
	
	            // Split text
	            var fullTextStartValue = startContainer.nodeValue;
	            // init with startContainer because we may have not a text node here
	            var startT = startContainer;
	
	            if (undefined !== fullTextStartValue) {
	                var partTextStartValue = fullTextStartValue.slice(startOffset, fullTextStartValue.length);
	                // Set new text to start node
	                startContainer.nodeValue = fullTextStartValue.slice(0, startOffset);
	
	                var offsetStart = _utilUtil2['default'].getOffsetParentIfHas(startContainer);
	                // Create a new node for splitted text, offset is the length of new startContainer.nodeValue:
	                startT = this._createStartOrEndContainer(startContainer, partTextStartValue, offsetStart === startOffset ? offsetStart : offsetStart + startOffset, startContainerIndex);
	                // Append this node after startContainer
	                startContainer.parentNode.insertBefore(startT, startContainer.nextSibling);
	                this.startContainer = startT;
	
	                if (startContainer.nodeValue) {
	                    // Wrap start container in detection node, offset is always 0 or parent offset.
	                    _utilUtil2['default'].wrap(startContainer, this._createSplitContainer(startContainer, startContainerIndex, _utilUtil2['default'].getOffsetParentIfHas(startContainer)));
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
	                endT = this._createStartOrEndContainer(endContainer, partTextEndValue, _utilUtil2['default'].getOffsetParentIfHas(endContainer), endContainerIndex);
	
	                endContainer.parentNode.insertBefore(endT, endContainer);
	                this.endContainer = endT;
	                var offsetParent = _utilUtil2['default'].getOffsetParentIfHas(endContainer);
	                _utilUtil2['default'].wrap(endContainer, this._createSplitContainer(endContainer, endContainerIndex, offsetParent === endOffset ? offsetParent : offsetParent + endOffset));
	            }
	
	            return { startT: startT, endT: endT };
	        }
	
	        /**
	         * Renders a selection
	         * @param {Node} startContainer
	         * @param {Node} endContainer
	         * @param {Node} commonAncestor
	         * @param {int} startOffset
	         * @param {int} endOffset
	         * @returns RenderResult
	         * @private
	         */
	    }, {
	        key: '_renderWithElements',
	        value: function _renderWithElements(startContainer, endContainer, commonAncestor, startOffset, endOffset) {
	
	            if (this._renderResult) {
	                return this._renderResult;
	            }
	
	            var outer = _utilUtil2['default'].parents(startContainer, commonAncestor);
	            outer = outer[outer.length - 1];
	            var contextContainer = outer ? outer : commonAncestor;
	
	            // Same Element, means the selection is fully contained in a discrete area, start and endpoint have the same parent
	            // but are different nodes:
	
	            // Start and End offset have to be recalculated because dom might be already changed by highlighting in given node
	            // 1: First detect real start offset in startContainer:
	
	            // That works by selecting the highest wrapper and get original-offset-start data element, see "findOriginalOffset"
	            // So first select that container:
	            var originalStartOffset = _utilUtil2['default'].findOriginalOffset(startContainer);
	            var originalEndOffset = _utilUtil2['default'].findOriginalOffset(endContainer);
	
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
	                _utilUtil2['default'].walkDom(startContainer, function (el) {
	                    if (el.nodeType === Node.TEXT_NODE) {
	                        startContainer = el;
	                        return false;
	                    }
	                    return true;
	                });
	            }
	
	            if (endContainer.nodeType !== Node.TEXT_NODE) {
	                // Get the last text node:
	                var endContainerContents = _utilUtil2['default'].closest(startContainer, ':not([' + _utilUtil.DATA_IS_SELECTION + '])').childNodes;
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
	                    throw 'Could not found endContainer, highlighting would be unstable';
	                }
	            }
	
	            this._renderResult = new _RenderResult2['default'](
	            // Real offset is calculated by relative length and absolute length
	            originalStartOffset + startOffset, originalEndOffset + endOffset,
	            // get the path for this selection
	            _utilUtil2['default'].getPath(startContainer, this.context), _utilUtil2['default'].getPath(endContainer, this.context));
	
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
	            var startContainer = _utilUtil2['default'].deserializePath(startPath, this.context);
	            var endContainer = _utilUtil2['default'].deserializePath(endPath, this.context);
	            if (startContainer && endContainer && startContainer.node && endContainer.node) {
	                var range = document.createRange();
	                range.setStart(startContainer.node, startContainer.offset);
	                range.setEnd(endContainer.node, endContainer.offset);
	                var text = range.toString();
	                var result = this.renderWithRange(range);
	                result.text = text;
	                return text;
	            }
	            throw 'Could not find start- and/or end-container in document';
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
	})(_RenderingEvents3['default']);
	
	exports['default'] = Rendering;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _Object$getOwnPropertyDescriptor = __webpack_require__(5)["default"];
	
	exports["default"] = function get(_x, _x2, _x3) {
	  var _again = true;
	
	  _function: while (_again) {
	    var object = _x,
	        property = _x2,
	        receiver = _x3;
	    desc = parent = getter = undefined;
	    _again = false;
	    if (object === null) object = Function.prototype;
	
	    var desc = _Object$getOwnPropertyDescriptor(object, property);
	
	    if (desc === undefined) {
	      var parent = Object.getPrototypeOf(object);
	
	      if (parent === null) {
	        return undefined;
	      } else {
	        _x = parent;
	        _x2 = property;
	        _x3 = receiver;
	        _again = true;
	        continue _function;
	      }
	    } else if ("value" in desc) {
	      return desc.value;
	    } else {
	      var getter = desc.get;
	
	      if (getter === undefined) {
	        return undefined;
	      }
	
	      return getter.call(receiver);
	    }
	  }
	};
	
	exports.__esModule = true;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(6), __esModule: true };

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(7);
	__webpack_require__(8);
	module.exports = function getOwnPropertyDescriptor(it, key){
	  return $.getDesc(it, key);
	};

/***/ },
/* 7 */
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
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	var toIObject = __webpack_require__(9);
	
	__webpack_require__(13)('getOwnPropertyDescriptor', function($getOwnPropertyDescriptor){
	  return function getOwnPropertyDescriptor(it, key){
	    return $getOwnPropertyDescriptor(toIObject(it), key);
	  };
	});

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(10)
	  , defined = __webpack_require__(12);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	// indexed object, fallback for non-array-like ES3 strings
	var cof = __webpack_require__(11);
	module.exports = 0 in Object('z') ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 11 */
/***/ function(module, exports) {

	var toString = {}.toString;
	
	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 12 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	module.exports = function(KEY, exec){
	  var $def = __webpack_require__(14)
	    , fn   = (__webpack_require__(16).Object || {})[KEY] || Object[KEY]
	    , exp  = {};
	  exp[KEY] = exec(fn);
	  $def($def.S + $def.F * __webpack_require__(17)(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(15)
	  , core      = __webpack_require__(16)
	  , PROTOTYPE = 'prototype';
	var ctx = function(fn, that){
	  return function(){
	    return fn.apply(that, arguments);
	  };
	};
	var $def = function(type, name, source){
	  var key, own, out, exp
	    , isGlobal = type & $def.G
	    , isProto  = type & $def.P
	    , target   = isGlobal ? global : type & $def.S
	        ? global[name] : (global[name] || {})[PROTOTYPE]
	    , exports  = isGlobal ? core : core[name] || (core[name] = {});
	  if(isGlobal)source = name;
	  for(key in source){
	    // contains in native
	    own = !(type & $def.F) && target && key in target;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    if(isGlobal && typeof target[key] != 'function')exp = source[key];
	    // bind timers to global for call from export context
	    else if(type & $def.B && own)exp = ctx(out, global);
	    // wrap global constructors for prevent change them in library
	    else if(type & $def.W && target[key] == out)!function(C){
	      exp = function(param){
	        return this instanceof C ? new C(param) : C(param);
	      };
	      exp[PROTOTYPE] = C[PROTOTYPE];
	    }(out);
	    else exp = isProto && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export
	    exports[key] = exp;
	    if(isProto)(exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
	  }
	};
	// type bitmap
	$def.F = 1;  // forced
	$def.G = 2;  // global
	$def.S = 4;  // static
	$def.P = 8;  // proto
	$def.B = 16; // bind
	$def.W = 32; // wrap
	module.exports = $def;

/***/ },
/* 15 */
/***/ function(module, exports) {

	var global = typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	module.exports = global;
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 16 */
/***/ function(module, exports) {

	var core = module.exports = {};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _Object$create = __webpack_require__(19)["default"];
	
	var _Object$setPrototypeOf = __webpack_require__(21)["default"];
	
	exports["default"] = function (subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	  }
	
	  subClass.prototype = _Object$create(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	};
	
	exports.__esModule = true;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(20), __esModule: true };

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(7);
	module.exports = function create(P, D){
	  return $.create(P, D);
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(22), __esModule: true };

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(23);
	module.exports = __webpack_require__(16).Object.setPrototypeOf;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $def = __webpack_require__(14);
	$def($def.S, 'Object', {setPrototypeOf: __webpack_require__(24).set});

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var getDesc  = __webpack_require__(7).getDesc
	  , isObject = __webpack_require__(25)
	  , anObject = __webpack_require__(26);
	var check = function(O, proto){
	  anObject(O);
	  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} // eslint-disable-line
	    ? function(buggy, set){
	        try {
	          set = __webpack_require__(27)(Function.call, getDesc(Object.prototype, '__proto__').set, 2);
	          set({}, []);
	        } catch(e){ buggy = true; }
	        return function setPrototypeOf(O, proto){
	          check(O, proto);
	          if(buggy)O.__proto__ = proto;
	          else set(O, proto);
	          return O;
	        };
	      }()
	    : undefined),
	  check: check
	};

/***/ },
/* 25 */
/***/ function(module, exports) {

	// http://jsperf.com/core-js-isobject
	module.exports = function(it){
	  return it !== null && (typeof it == 'object' || typeof it == 'function');
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(25);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(28);
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
	  } return function(/* ...args */){
	      return fn.apply(that, arguments);
	    };
	};

/***/ },
/* 28 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _Object$defineProperty = __webpack_require__(30)["default"];
	
	exports["default"] = (function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	
	      _Object$defineProperty(target, descriptor.key, descriptor);
	    }
	  }
	
	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	})();
	
	exports.__esModule = true;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(31), __esModule: true };

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(7);
	module.exports = function defineProperty(it, key, desc){
	  return $.setDesc(it, key, desc);
	};

/***/ },
/* 32 */
/***/ function(module, exports) {

	"use strict";
	
	exports["default"] = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};
	
	exports.__esModule = true;

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	/* global Node, NodeList, Element */
	
	'use strict';
	
	/**
	 * @type {string}
	 */
	
	var _createClass = __webpack_require__(29)['default'];
	
	var _classCallCheck = __webpack_require__(32)['default'];
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _Rendering = __webpack_require__(3);
	
	// polyfill for matchesSelector, IE 10/11 does not support Element.matches
	var ATTR_DATA_ORIGINAL_INDEX = 'data-original-index';
	exports.ATTR_DATA_ORIGINAL_INDEX = ATTR_DATA_ORIGINAL_INDEX;
	/**
	 * @type {string}
	 */
	var DATA_PSEUDO = 'data-is-pseudo';
	exports.DATA_PSEUDO = DATA_PSEUDO;
	/**
	 * @type {string}
	 */
	var DATA_IS_SELECTION = 'data-is-selection';
	exports.DATA_IS_SELECTION = DATA_IS_SELECTION;
	/**
	 * @type {string}
	 */
	var SERIALIZE_SEPARATOR = ";";
	
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
	        _classCallCheck(this, Util);
	    }
	
	    _createClass(Util, null, [{
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
	            function s4() {
	                return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
	            }
	
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
	            if (!elms) {
	                return wrapper;
	            }
	            // Convert `elms` to an array, if necessary.
	            if (!(elms instanceof NodeList || elms instanceof Array)) {
	                elms = [elms];
	            }
	            for (var i = elms.length - 1; i >= 0; i--) {
	                var child = i > 0 ? wrapper.cloneNode(true) : wrapper;
	                var el = elms[i];
	                // Cache the current parent and sibling.
	                var _parent = el.parentNode,
	                    sibling = el.nextSibling;
	
	                child.appendChild(el);
	                if (sibling) {
	                    _parent.insertBefore(child, sibling);
	                } else {
	                    _parent.appendChild(child);
	                }
	            }
	            return wrapper;
	        }
	
	        /**
	         * Will calculate an index depending on an already modified dom by marklib
	         * @param {HTMLElement} node
	         *
	         * @returns {int|boolean}
	         */
	    }, {
	        key: 'calcIndex',
	        value: function calcIndex(node) {
	            var calculatedIndex = 0,
	                foundWrapper = false;
	            var nodes = node.parentNode.childNodes,
	                length = nodes.length;
	            for (var thisIndex = 0; thisIndex < length; thisIndex++) {
	                var el = nodes[thisIndex];
	                if (el === node) {
	                    break;
	                }
	                // reset index when original index is found
	                var maybeIndexOfOriginal = el.getAttribute ? el.getAttribute(ATTR_DATA_ORIGINAL_INDEX) : null;
	
	                if (maybeIndexOfOriginal) {
	                    calculatedIndex = parseInt(maybeIndexOfOriginal);
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
	         * @returns {Node|bool}
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
	         * @returns {Node|bool}
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
	         * @returns {Node|bool}
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
	         * @returns {Node|bool}
	         */
	    }, {
	        key: 'outerMostCallback',
	        value: function outerMostCallback(el, callback) {
	            var element = el,
	                lastValid = false;
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
	         * @return {bool}
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
	            var path = null,
	                node = el;
	
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
	                    var index = outerMostElement ? parseInt(outerMostElement.getAttribute(ATTR_DATA_ORIGINAL_INDEX)) : calculatedIndex;
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
	                var siblings = Util.nodeListFilter(parent.children, filterSiblings),
	                    nodeIndex = Util.index(node, siblings);
	
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
	            return lengthElement ? parseInt(lengthElement.getAttribute(_Rendering.ATTR_DATA_ORIGINAL_OFFSET_START)) : 0;
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
	            var pSplit = path.split(';'),
	                p = pSplit[0],
	                objectIndex = parseInt(pSplit[1]),
	                charOffset = parseInt(pSplit[2]),
	                container = !p.trim() ? context : context.querySelector(p);
	            var maybeFoundNode = null;
	            Util.walkDom(container, function (n) {
	                if (n.nodeType === Node.TEXT_NODE) {
	                    var atrOffsetStart = n.parentNode.getAttribute(_Rendering.ATTR_DATA_ORIGINAL_OFFSET_START);
	                    atrOffsetStart = atrOffsetStart === null ? 0 : atrOffsetStart;
	                    var atrIndex = n.parentNode.getAttribute(ATTR_DATA_ORIGINAL_INDEX);
	                    atrIndex = atrIndex === null ? Util.calcIndex(n) : atrIndex;
	                    if (parseInt(atrIndex) === objectIndex && charOffset >= atrOffsetStart && parseInt(atrOffsetStart) + n.length >= charOffset) {
	                        var thisOffset = n.parentNode.hasAttribute(_Rendering.ATTR_DATA_ORIGINAL_OFFSET_START) ? charOffset - parseInt(n.parentNode.getAttribute(_Rendering.ATTR_DATA_ORIGINAL_OFFSET_START)) : charOffset;
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
	
	        /**
	         * Recursively walks the dom tree unless func returns false
	         * This is a lot more efficient then using any jQuery operations
	         *
	         * Applies node to function
	         * @param {Node} node
	         * @param {Function} func
	         *
	         * @returns {*}
	         */
	    }, {
	        key: 'walkDom',
	        value: function walkDom(node, func) {
	            if (!node) {
	                return false;
	            }
	            var children = node.childNodes;
	            if (!children) {
	                return false;
	            }
	            for (var i = 0; i < children.length; i++) {
	                if (!Util.walkDom(children[i], func)) {
	                    return false;
	                }
	            }
	            return func(node);
	        }
	
	        /**
	         * Extracts all TextNodes inside a container
	         * @param {Node} el
	         * @param {Function} func
	         * @returns {Array.<Text>}
	         */
	    }, {
	        key: 'walkTextNodes',
	        value: function walkTextNodes(el, func) {
	            Util.walkDom(el, function (node) {
	                if (Node.TEXT_NODE === node.nodeType && !Util.nodeIsEmpty(node)) {
	                    func(node);
	                }
	                return true;
	            });
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
	            var index = parseInt(p.getAttribute(ATTR_DATA_ORIGINAL_INDEX));
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
	            var offset = parseInt(p.getAttribute(_Rendering.ATTR_DATA_ORIGINAL_OFFSET_START));
	            return offset > 0 ? offset : 0;
	        }
	    }]);
	
	    return Util;
	})();
	
	exports['default'] = Util;

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/**
	 * A Render Result
	 */
	
	var _createClass = __webpack_require__(29)['default'];
	
	var _classCallCheck = __webpack_require__(32)['default'];
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var RenderResult = (function () {
	    /**
	     * @param {int} startOffset
	     * @param {int} endOffset
	     * @param {String} startContainerPath
	     * @param {String} endContainerPath
	     */
	
	    function RenderResult(startOffset, endOffset, startContainerPath, endContainerPath) {
	        _classCallCheck(this, RenderResult);
	
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
	
	    _createClass(RenderResult, [{
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
	        },
	
	        /**
	         * @returns {String}
	         */
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
	        },
	
	        /**
	         * @param {null|Rendering} instance
	         */
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
	
	exports['default'] = RenderResult;
	module.exports = exports['default'];

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	/* global Set */
	
	'use strict';
	
	var _get = __webpack_require__(4)['default'];
	
	var _inherits = __webpack_require__(18)['default'];
	
	var _createClass = __webpack_require__(29)['default'];
	
	var _classCallCheck = __webpack_require__(32)['default'];
	
	var _slicedToArray = __webpack_require__(36)['default'];
	
	var _Object$assign = __webpack_require__(66)['default'];
	
	var _Set = __webpack_require__(72)['default'];
	
	var _interopRequireDefault = __webpack_require__(2)['default'];
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _wolfy87Eventemitter = __webpack_require__(87);
	
	var _wolfy87Eventemitter2 = _interopRequireDefault(_wolfy87Eventemitter);
	
	var _Rendering = __webpack_require__(3);
	
	var _Rendering2 = _interopRequireDefault(_Rendering);
	
	var _utilUtil = __webpack_require__(33);
	
	var _utilUtil2 = _interopRequireDefault(_utilUtil);
	
	/**
	 * @type {string}
	 */
	var EVENT_CLICK = 'click';
	
	exports.EVENT_CLICK = EVENT_CLICK;
	/**
	 * @type {string}
	 */
	var EVENT_MOUSEENTER = 'hover-enter';
	
	exports.EVENT_MOUSEENTER = EVENT_MOUSEENTER;
	/**
	 * @type {string}
	 */
	var EVENT_MOUSELEAVE = 'hover-leave';
	
	exports.EVENT_MOUSELEAVE = EVENT_MOUSELEAVE;
	/**
	 * @type {string}
	 */
	var EVENT_PART_TREE_ENTER = 'tree-enter';
	
	exports.EVENT_PART_TREE_ENTER = EVENT_PART_TREE_ENTER;
	/**
	 * @type {string}
	 */
	var EVENT_PART_TREE_LEAVE = 'tree-leave';
	
	exports.EVENT_PART_TREE_LEAVE = EVENT_PART_TREE_LEAVE;
	/**
	 * Generic Event Handlings for Renderer
	 */
	
	var RenderingEvents = (function (_EventEmitter) {
	    _inherits(RenderingEvents, _EventEmitter);
	
	    /**
	     * @param {Object} options
	     * @param {Document} document
	     */
	
	    function RenderingEvents(options, document) {
	        _classCallCheck(this, RenderingEvents);
	
	        _get(Object.getPrototypeOf(RenderingEvents.prototype), 'constructor', this).call(this);
	
	        /**
	         * Options
	         * @type {Object}
	         */
	        this.options = {
	            hoverClass: 'marklib--hover',
	            treeClass: 'marklib--tree',
	            className: ['marking']
	        };
	
	        this.options = _Object$assign(this.options, options || {});
	
	        if (typeof this.options.className === 'string') {
	            this.options.className = this.options.className.split(' ');
	        }
	
	        /**
	         * A collection of all nodes that are part of all events
	         * @type {Array}
	         */
	        this.wrapperNodes = [];
	
	        this._registerEvents(document);
	
	        /**
	         * @type {Document}
	         */
	        this.document = document;
	    }
	
	    /**
	     * Constructs a new Range from rendered result
	     * @returns {Range}
	     */
	
	    _createClass(RenderingEvents, [{
	        key: '_registerEvents',
	
	        /**
	         * Will register events if not already bind.
	         * @param {Document} document
	         * @private
	         */
	        value: function _registerEvents(document) {
	            var _this = this;
	
	            this.on(EVENT_MOUSEENTER, function () {
	                _this.wrapperNodes.forEach(function (node) {
	                    node.classList.add(_this.options.hoverClass);
	                });
	            });
	
	            this.on(EVENT_MOUSELEAVE, function () {
	                _this.wrapperNodes.forEach(function (node) {
	                    node.classList.remove(_this.options.hoverClass);
	                });
	            });
	
	            this.on(EVENT_PART_TREE_ENTER, function () {
	                _this.wrapperNodes.forEach(function (node) {
	                    node.classList.add(_this.options.treeClass);
	                });
	            });
	
	            this.on(EVENT_PART_TREE_LEAVE, function () {
	                _this.wrapperNodes.forEach(function (node) {
	                    node.classList.remove(_this.options.treeClass);
	                });
	            });
	
	            if (!document.MARKLIB_EVENTS) {
	                document.MARKLIB_EVENTS = true;
	                (function () {
	                    var currentHoverInstances = new _Set(),
	                        betweenInstances = new _Set();
	
	                    function checkMarklibInstance(e) {
	                        var instance = _Rendering2['default'].getMarklibInstance(e);
	                        // instanceof check will fail if used in test scenario where different DOMs are used
	                        // see also http://perfectionkills.com/instanceof-considered-harmful-or-how-to-write-a-robust-isarray/
	                        return instance && (instance instanceof _Rendering2['default'] || 'wrapperNodes' in instance);
	                    }
	
	                    function closestInstance(e) {
	                        var closest = _utilUtil2['default'].closestCallback(e.target, function (e) {
	                            return checkMarklibInstance(e);
	                        });
	                        if (typeof closest === 'object') {
	                            return _Rendering2['default'].getMarklibInstance(closest);
	                        }
	                        return false;
	                    }
	
	                    function getInstancesBetween(e, instance) {
	                        return _utilUtil2['default'].parentsCallback(e.target, function (el) {
	                            return checkMarklibInstance(el) && _Rendering2['default'].getMarklibInstance(el) !== instance;
	                        }).map(function (el) {
	                            return _Rendering2['default'].getMarklibInstance(el);
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
	                                var _target = _slicedToArray(target, 2);
	
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
	                _utilUtil2['default'].walkTextNodes(wrapper, function (node) {
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
	})(_wolfy87Eventemitter2['default']);
	
	exports['default'] = RenderingEvents;

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _getIterator = __webpack_require__(37)["default"];
	
	var _isIterable = __webpack_require__(63)["default"];
	
	exports["default"] = (function () {
	  function sliceIterator(arr, i) {
	    var _arr = [];
	    var _n = true;
	    var _d = false;
	    var _e = undefined;
	
	    try {
	      for (var _i = _getIterator(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
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
	    } else if (_isIterable(Object(arr))) {
	      return sliceIterator(arr, i);
	    } else {
	      throw new TypeError("Invalid attempt to destructure non-iterable instance");
	    }
	  };
	})();
	
	exports.__esModule = true;

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(38), __esModule: true };

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(39);
	__webpack_require__(57);
	module.exports = __webpack_require__(60);

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(40);
	var Iterators = __webpack_require__(43);
	Iterators.NodeList = Iterators.HTMLCollection = Iterators.Array;

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var setUnscope = __webpack_require__(41)
	  , step       = __webpack_require__(42)
	  , Iterators  = __webpack_require__(43)
	  , toIObject  = __webpack_require__(9);
	
	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	__webpack_require__(44)(Array, 'Array', function(iterated, kind){
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
	
	setUnscope('keys');
	setUnscope('values');
	setUnscope('entries');

/***/ },
/* 41 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 42 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 43 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY         = __webpack_require__(45)
	  , $def            = __webpack_require__(14)
	  , $redef          = __webpack_require__(46)
	  , hide            = __webpack_require__(47)
	  , has             = __webpack_require__(50)
	  , SYMBOL_ITERATOR = __webpack_require__(51)('iterator')
	  , Iterators       = __webpack_require__(43)
	  , FF_ITERATOR     = '@@iterator'
	  , KEYS            = 'keys'
	  , VALUES          = 'values';
	var returnThis = function(){ return this; };
	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCE){
	  __webpack_require__(54)(Constructor, NAME, next);
	  var createMethod = function(kind){
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG      = NAME + ' Iterator'
	    , proto    = Base.prototype
	    , _native  = proto[SYMBOL_ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , _default = _native || createMethod(DEFAULT)
	    , methods, key;
	  // Fix native
	  if(_native){
	    var IteratorPrototype = __webpack_require__(7).getProto(_default.call(new Base));
	    // Set @@toStringTag to native iterators
	    __webpack_require__(55)(IteratorPrototype, TAG, true);
	    // FF fix
	    if(!LIBRARY && has(proto, FF_ITERATOR))hide(IteratorPrototype, SYMBOL_ITERATOR, returnThis);
	  }
	  // Define iterator
	  if(!LIBRARY || FORCE)hide(proto, SYMBOL_ITERATOR, _default);
	  // Plug for library
	  Iterators[NAME] = _default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      keys:    IS_SET            ? _default : createMethod(KEYS),
	      values:  DEFAULT == VALUES ? _default : createMethod(VALUES),
	      entries: DEFAULT != VALUES ? _default : createMethod('entries')
	    };
	    if(FORCE)for(key in methods){
	      if(!(key in proto))$redef(proto, key, methods[key]);
	    } else $def($def.P + $def.F * __webpack_require__(56), NAME, methods);
	  }
	};

/***/ },
/* 45 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(47);

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var $          = __webpack_require__(7)
	  , createDesc = __webpack_require__(48);
	module.exports = __webpack_require__(49) ? function(object, key, value){
	  return $.setDesc(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 48 */
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
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(17)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 50 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var store  = __webpack_require__(52)('wks')
	  , Symbol = __webpack_require__(15).Symbol;
	module.exports = function(name){
	  return store[name] || (store[name] =
	    Symbol && Symbol[name] || (Symbol || __webpack_require__(53))('Symbol.' + name));
	};

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(15)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 53 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $ = __webpack_require__(7)
	  , IteratorPrototype = {};
	
	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(47)(IteratorPrototype, __webpack_require__(51)('iterator'), function(){ return this; });
	
	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = $.create(IteratorPrototype, {next: __webpack_require__(48)(1,next)});
	  __webpack_require__(55)(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	var has  = __webpack_require__(50)
	  , hide = __webpack_require__(47)
	  , TAG  = __webpack_require__(51)('toStringTag');
	
	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))hide(it, TAG, tag);
	};

/***/ },
/* 56 */
/***/ function(module, exports) {

	// Safari has buggy iterators w/o `next`
	module.exports = 'keys' in [] && !('next' in [].keys());

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(58)(true);
	
	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(44)(String, 'String', function(iterated){
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
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	// true  -> String#at
	// false -> String#codePointAt
	var toInteger = __webpack_require__(59)
	  , defined   = __webpack_require__(12);
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l
	      || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	        ? TO_STRING ? s.charAt(i) : a
	        : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 59 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(26)
	  , get      = __webpack_require__(61);
	module.exports = __webpack_require__(16).getIterator = function(it){
	  var iterFn = get(it);
	  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
	  return anObject(iterFn.call(it));
	};

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(62)
	  , ITERATOR  = __webpack_require__(51)('iterator')
	  , Iterators = __webpack_require__(43);
	module.exports = __webpack_require__(16).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR] || it['@@iterator'] || Iterators[classof(it)];
	};

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(11)
	  , TAG = __webpack_require__(51)('toStringTag')
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
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(64), __esModule: true };

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(39);
	__webpack_require__(57);
	module.exports = __webpack_require__(65);

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(62)
	  , ITERATOR  = __webpack_require__(51)('iterator')
	  , Iterators = __webpack_require__(43);
	module.exports = __webpack_require__(16).isIterable = function(it){
	  var O = Object(it);
	  return ITERATOR in O || '@@iterator' in O || Iterators.hasOwnProperty(classof(O));
	};

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(67), __esModule: true };

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(68);
	module.exports = __webpack_require__(16).Object.assign;

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $def = __webpack_require__(14);
	$def($def.S, 'Object', {assign: __webpack_require__(69)});

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.1 Object.assign(target, source, ...)
	var toObject = __webpack_require__(70)
	  , IObject  = __webpack_require__(10)
	  , enumKeys = __webpack_require__(71);
	/* eslint-disable no-unused-vars */
	module.exports = Object.assign || function assign(target, source){
	/* eslint-enable no-unused-vars */
	  var T = toObject(target)
	    , l = arguments.length
	    , i = 1;
	  while(l > i){
	    var S      = IObject(arguments[i++])
	      , keys   = enumKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)T[key = keys[j++]] = S[key];
	  }
	  return T;
	};

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(12);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var $ = __webpack_require__(7);
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
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(73), __esModule: true };

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(74);
	__webpack_require__(57);
	__webpack_require__(39);
	__webpack_require__(75);
	__webpack_require__(85);
	module.exports = __webpack_require__(16).Set;

/***/ },
/* 74 */
/***/ function(module, exports) {



/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var strong = __webpack_require__(76);
	
	// 23.2 Set Objects
	__webpack_require__(84)('Set', function(get){
	  return function Set(){ return get(this, arguments[0]); };
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
	var $            = __webpack_require__(7)
	  , hide         = __webpack_require__(47)
	  , ctx          = __webpack_require__(27)
	  , species      = __webpack_require__(77)
	  , strictNew    = __webpack_require__(78)
	  , defined      = __webpack_require__(12)
	  , forOf        = __webpack_require__(79)
	  , step         = __webpack_require__(42)
	  , ID           = __webpack_require__(53)('id')
	  , $has         = __webpack_require__(50)
	  , isObject     = __webpack_require__(25)
	  , isExtensible = Object.isExtensible || isObject
	  , SUPPORT_DESC = __webpack_require__(49)
	  , SIZE         = SUPPORT_DESC ? '_s' : 'size'
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
	    __webpack_require__(83)(C.prototype, {
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
	        var f = ctx(callbackfn, arguments[1], 3)
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
	    if(SUPPORT_DESC)$.setDesc(C.prototype, 'size', {
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
	    __webpack_require__(44)(C, NAME, function(iterated, kind){
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
	    species(C);
	    species(__webpack_require__(16)[NAME]); // for wrapper
	  }
	};

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $       = __webpack_require__(7)
	  , SPECIES = __webpack_require__(51)('species');
	module.exports = function(C){
	  if(__webpack_require__(49) && !(SPECIES in C))$.setDesc(C, SPECIES, {
	    configurable: true,
	    get: function(){ return this; }
	  });
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

	var ctx         = __webpack_require__(27)
	  , call        = __webpack_require__(80)
	  , isArrayIter = __webpack_require__(81)
	  , anObject    = __webpack_require__(26)
	  , toLength    = __webpack_require__(82)
	  , getIterFn   = __webpack_require__(61);
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
	var anObject = __webpack_require__(26);
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
	var Iterators = __webpack_require__(43)
	  , ITERATOR  = __webpack_require__(51)('iterator');
	module.exports = function(it){
	  return (Iterators.Array || Array.prototype[ITERATOR]) === it;
	};

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(59)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	var $redef = __webpack_require__(46);
	module.exports = function(target, src){
	  for(var key in src)$redef(target, key, src[key]);
	  return target;
	};

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $          = __webpack_require__(7)
	  , $def       = __webpack_require__(14)
	  , hide       = __webpack_require__(47)
	  , BUGGY      = __webpack_require__(56)
	  , forOf      = __webpack_require__(79)
	  , strictNew  = __webpack_require__(78);
	
	module.exports = function(NAME, wrapper, methods, common, IS_MAP, IS_WEAK){
	  var Base  = __webpack_require__(15)[NAME]
	    , C     = Base
	    , ADDER = IS_MAP ? 'set' : 'add'
	    , proto = C && C.prototype
	    , O     = {};
	  if(!__webpack_require__(49) || typeof C != 'function'
	    || !(IS_WEAK || !BUGGY && proto.forEach && proto.entries)){
	    // create collection constructor
	    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
	    __webpack_require__(83)(C.prototype, methods);
	  } else {
	    C = wrapper(function(target, iterable){
	      strictNew(target, C, NAME);
	      target._c = new Base;
	      if(iterable != undefined)forOf(iterable, IS_MAP, target[ADDER], target);
	    });
	    $.each.call('add,clear,delete,forEach,get,has,set,keys,values,entries'.split(','),function(KEY){
	      var chain = KEY == 'add' || KEY == 'set';
	      if(KEY in proto && !(IS_WEAK && KEY == 'clear'))hide(C.prototype, KEY, function(a, b){
	        var result = this._c[KEY](a === 0 ? 0 : a, b);
	        return chain ? this : result;
	      });
	    });
	    if('size' in proto)$.setDesc(C.prototype, 'size', {
	      get: function(){
	        return this._c.size;
	      }
	    });
	  }
	
	  __webpack_require__(55)(C, NAME);
	
	  O[NAME] = C;
	  $def($def.G + $def.W + $def.F, O);
	
	  if(!IS_WEAK)common.setStrong(C, NAME, IS_MAP);
	
	  return C;
	};

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var $def  = __webpack_require__(14);
	
	$def($def.P, 'Set', {toJSON: __webpack_require__(86)('Set')});

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var forOf   = __webpack_require__(79)
	  , classof = __webpack_require__(62);
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
	        var listeners = this.getListenersAsObject(evt);
	        var listener;
	        var i;
	        var key;
	        var response;
	
	        for (key in listeners) {
	            if (listeners.hasOwnProperty(key)) {
	                i = listeners[key].length;
	
	                while (i--) {
	                    // If the listener returns true then it shall be removed from the event
	                    // The function is executed either with a basic call or an apply if there is an args array
	                    listener = listeners[key][i];
	
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
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/* global localStorage, document */
	
	var _interopRequireDefault = __webpack_require__(2)['default'];
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _modulesMarklib = __webpack_require__(1);
	
	var _modulesMarklib2 = _interopRequireDefault(_modulesMarklib);
	
	var _flexcss = __webpack_require__(89);
	
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
	
	        var render = function render(autoMarkText, c, length) {
	            var r = new _modulesMarklib2['default'].Rendering(document, { className: classNames });
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
	
	    var savedRanges = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [],
	        animated = false;
	
	    /**
	     * OnClick event for renderings
	     */
	    var onClick = function onClick() {
	        var self = this;
	        this.wrapperNodes.forEach(function (n) {
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
	                    if (tooltip.getCurrentTarget() && tooltip.getCurrentTarget() === self.wrapperNodes[0]) {
	                        tooltip.removeTooltip();
	                    }
	                    document.removeEventListener('click', thisFunction);
	                });
	            }
	        }, 0);
	    };
	
	    savedRanges.forEach(function (range) {
	        var marker = new _modulesMarklib2['default'].Rendering(document);
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
	        var el = document.getElementById('secondParagraph'),
	            r = el.getBoundingClientRect(),
	            html = document.documentElement;
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
	            var selection = document.getSelection(),
	                renderer = new _modulesMarklib2['default'].Rendering(document),
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
	            allRanges.forEach(function (range) {
	                return range.destroy();
	            });
	            savedRanges = [];
	            allRanges = [];
	            localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
	        }
	    });
	});
	
	exports['default'] = _modulesMarklib2['default'];
	module.exports = exports['default'];

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _interopRequireDefault = __webpack_require__(2)['default'];
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _Form = __webpack_require__(90);
	
	var _Form2 = _interopRequireDefault(_Form);
	
	var _Tooltip = __webpack_require__(113);
	
	var _Tooltip2 = _interopRequireDefault(_Tooltip);
	
	var _Modal = __webpack_require__(120);
	
	var _Modal2 = _interopRequireDefault(_Modal);
	
	var _Widget = __webpack_require__(121);
	
	var _Widget2 = _interopRequireDefault(_Widget);
	
	var _utilSettings = __webpack_require__(117);
	
	var _utilSettings2 = _interopRequireDefault(_utilSettings);
	
	var _Toggleable = __webpack_require__(122);
	
	var _Toggleable2 = _interopRequireDefault(_Toggleable);
	
	var _OffCanvas = __webpack_require__(123);
	
	var _OffCanvas2 = _interopRequireDefault(_OffCanvas);
	
	var _Dropdown = __webpack_require__(124);
	
	var _Dropdown2 = _interopRequireDefault(_Dropdown);
	
	var _LightBox = __webpack_require__(125);
	
	var _LightBox2 = _interopRequireDefault(_LightBox);
	
	var _Showcase = __webpack_require__(126);
	
	var _Showcase2 = _interopRequireDefault(_Showcase);
	
	// default export as component object
	exports['default'] = {
	    Form: _Form2['default'],
	    Tooltip: _Tooltip2['default'],
	    Modal: _Modal2['default'],
	    Widget: _Widget2['default'],
	    Settings: _utilSettings2['default'],
	    Toggleable: _Toggleable2['default'],
	    OffCanvas: _OffCanvas2['default'],
	    Dropdown: _Dropdown2['default'],
	    LightBox: _LightBox2['default'],
	    Showcase: _Showcase2['default']
	};
	module.exports = exports['default'];

/***/ },
/* 90 */
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
	 * FlexCss.Form
	 * Licensed under the MIT License (MIT)
	 * Copyright (c) 2015 David Heidrich, BowlingX <me@bowlingx.com>
	 */
	
	'use strict';
	
	/*global HTMLFormElement, fetch, FormData, clearTimeout, NodeList*/
	
	var _get = __webpack_require__(4)['default'];
	
	var _inherits = __webpack_require__(18)['default'];
	
	var _createClass = __webpack_require__(29)['default'];
	
	var _classCallCheck = __webpack_require__(32)['default'];
	
	var _Promise = __webpack_require__(91)['default'];
	
	var _Object$assign = __webpack_require__(66)['default'];
	
	var _Array$from = __webpack_require__(101)['default'];
	
	var _Object$keys = __webpack_require__(104)['default'];
	
	var _interopRequireDefault = __webpack_require__(2)['default'];
	
	var _defaults = __webpack_require__(107)['default'];
	
	var _interopExportWildcard = __webpack_require__(112)['default'];
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _Tooltip = __webpack_require__(113);
	
	var _Tooltip2 = _interopRequireDefault(_Tooltip);
	
	var _utilEvent = __webpack_require__(116);
	
	var _utilEvent2 = _interopRequireDefault(_utilEvent);
	
	var _utilUtil = __webpack_require__(114);
	
	var _utilUtil2 = _interopRequireDefault(_utilUtil);
	
	var _utilSettings = __webpack_require__(117);
	
	var _utilSettings2 = _interopRequireDefault(_utilSettings);
	
	var _DestroyableWidget2 = __webpack_require__(115);
	
	var _DestroyableWidget3 = _interopRequireDefault(_DestroyableWidget2);
	
	var _isomorphicFetch = __webpack_require__(118);
	
	_defaults(exports, _interopExportWildcard(_isomorphicFetch, _defaults));
	
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
	var EVENT_FORM_READY = 'flexcss.form.ready';
	exports.EVENT_FORM_READY = EVENT_FORM_READY;
	/**
	 * Fires when a form is submitted, cancelable
	 * @type {string}
	 */
	var EVENT_FORM_SUBMIT = 'flexcss.form.submit';
	exports.EVENT_FORM_SUBMIT = EVENT_FORM_SUBMIT;
	/**
	 * Fired directly after the form has been submitted via ajax
	 * @type {string}
	 */
	var EVENT_FORM_AFTER_AJAX_SUBMIT = 'flexcss.form.afterAjaxSubmit';
	exports.EVENT_FORM_AFTER_AJAX_SUBMIT = EVENT_FORM_AFTER_AJAX_SUBMIT;
	/**
	 * Fired when ajax events did complete
	 * @type {string}
	 */
	var EVENT_FORM_AJAX_COMPLETED = 'flexcss.form.ajaxCompleted';
	
	exports.EVENT_FORM_AJAX_COMPLETED = EVENT_FORM_AJAX_COMPLETED;
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
	
	        _get(Object.getPrototypeOf(Form.prototype), 'constructor', this).call(this);
	
	        if (!(form instanceof HTMLFormElement)) {
	            throw 'argument {0} form needs to be an form element';
	        }
	
	        /**
	         * The Form
	         * @type {HTMLElement}
	         */
	        this.form = form;
	
	        /**
	         * @type {Tooltip}
	         */
	        this.tooltips = null;
	
	        /**
	         * @type {Promise}
	         */
	        this.currentValidationFuture = new _Promise(function () {});
	
	        /**
	         * Default options
	         * @type {Object}
	         */
	        this.options = {
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
	            // if you have a fixed header, either set a number or function here
	            scrollToElementDiff: 0
	        };
	
	        // overwrite default options
	        _Object$assign(this.options, options);
	
	        // apply settings from attributes
	        _utilUtil2['default'].applyOptionsFromElement(form, this.options);
	
	        // set form class as widget
	        // Forms are very different to classical widgets,
	        // we will not use our base widget class for this but just self
	        form.hfWidgetInstance = this;
	
	        /**
	         * A List of Validators
	         * @type {Object}
	         * @private
	         */
	        this._validators = Form.globalValidators;
	
	        /**
	         * @type {Function}
	         * @private
	         */
	        this._remoteValidationFunction = null;
	
	        this.initFormValidation();
	    }
	
	    /**
	     * Global validators
	     * @type {Array}
	     */
	
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
	
	            var ev = _utilEvent2['default'].dispatch(thisForm, EVENT_FORM_SUBMIT).withOriginal(e).fire();
	
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
	                _Object$assign(defaultHeaders, {
	                    'Content-Type': this.options.ajaxJsonContentType
	                });
	            }
	            var defaultOptions = _Object$assign(this.options.fetchOptions, {
	                headers: defaultHeaders,
	                method: this.options.ajaxSubmitType
	            });
	
	            // support either JSON request payload or normal payload submission
	            var serverCall = useJson ? fetch(ajaxPostUrl, _Object$assign(defaultOptions, {
	                body: JSON.stringify(this.serialize())
	            })) : fetch(ajaxPostUrl, _Object$assign(defaultOptions, {
	                body: new FormData(thisForm)
	            }));
	
	            _utilEvent2['default'].dispatch(thisForm, EVENT_FORM_AFTER_AJAX_SUBMIT).withOriginal(e).fire();
	
	            return serverCall.then(function (r) {
	                (self._remoteValidationFunction || Form.globalRemoteValidationFunction).apply(self, [r]);
	
	                _utilEvent2['default'].dispatch(thisForm, EVENT_FORM_AJAX_COMPLETED).withOriginal(e).withDetail({ response: r }).fire();
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
	            var _this = this;
	
	            var fields = field instanceof Array || field instanceof NodeList ? field : [field];
	            return this._handleValidation(fields, focus, true).then((function (r) {
	                if (!r.foundAnyError) {
	                    // remove tooltips
	                    if (_this.tooltips) {
	                        _this.tooltips.removeTooltip();
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
	                var thisToValidateFields = scoped ? toValidateFields : _Array$from(arr).concat(r.checkedFields);
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
	            _Object$keys(fields).forEach((function (id) {
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
	            return _Promise.all(futures).then(function (allFutures) {
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
	                    _parent = errorTarget.parentNode,
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
	                        this._removeElementErrors(_parent);
	                    }
	                    // setup custom error messages:
	                    this._setupErrorMessages(field, validity);
	                    var msg = field.validationMessage;
	
	                    // mark fields as invalid
	                    this._markElementInvalid(errorTarget);
	                    this._markElementInvalid(field);
	
	                    if (this.options.appendError) {
	                        _parent.insertAdjacentHTML("beforeend", '<div class="' + this.options.containerErrorClass + '">' + msg + '</div>');
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
	                    this._removeElementErrors(_parent);
	                }
	                // We have to reset the custom validity here to allow native validations work again
	                field.setCustomValidity('');
	            }
	            // if validates a single field we need to check the linked fields to a label:
	            if (fields.length === 1) {
	                var field = fields[0];
	                var id = field.getAttribute(ATTR_DATA_CUSTOM_LABEL) || field.id;
	                if (id) {
	                    var linkedFields = _Array$from(this.getForm().querySelectorAll('[' + ATTR_DATA_CUSTOM_LABEL + '="' + id + '"], #' + id));
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
	                this.tooltips = new _Tooltip2['default'](this.options.tooltipContainer, {
	                    containerClass: 'error-tooltip'
	                });
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
	            var _this2 = this;
	
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
	
	            _utilUtil2['default'].addEventOnce(invalidEvent, form, function handleInvalid(e) {
	                self._formLoading();
	                var result = self._checkIsInvalid(e);
	                if (result) {
	                    self.currentValidationFuture = new _Promise(function (resolve) {
	                        result.then(function (r) {
	                            setTimeout(function () {
	                                _utilUtil2['default'].addEventOnce(invalidEvent, form, handleInvalid, true);
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
	                _this2.removeErrors();
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
	
	            _utilEvent2['default'].dispatchAndFire(form, EVENT_FORM_READY);
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
	                    _utilUtil2['default'].addEventOnce(_utilSettings2['default'].getTabEvent(), global.document.body, function (t) {
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
	            _utilUtil2['default'].scrollToElement(el, this.options.scrollToElementDiff);
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
	                self.currentValidationFuture = new _Promise(function (resolve) {
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
	            return target instanceof HTMLFieldSetElement || target.hasAttribute(ATTR_VALIDATE_VISIBILITY) && !_utilUtil2['default'].isVisible(target);
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
	})(_DestroyableWidget3['default']);
	
	exports['default'] = Form;
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
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(92), __esModule: true };

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(74);
	__webpack_require__(57);
	__webpack_require__(39);
	__webpack_require__(93);
	module.exports = __webpack_require__(16).Promise;

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $          = __webpack_require__(7)
	  , LIBRARY    = __webpack_require__(45)
	  , global     = __webpack_require__(15)
	  , ctx        = __webpack_require__(27)
	  , classof    = __webpack_require__(62)
	  , $def       = __webpack_require__(14)
	  , isObject   = __webpack_require__(25)
	  , anObject   = __webpack_require__(26)
	  , aFunction  = __webpack_require__(28)
	  , strictNew  = __webpack_require__(78)
	  , forOf      = __webpack_require__(79)
	  , setProto   = __webpack_require__(24).set
	  , same       = __webpack_require__(94)
	  , species    = __webpack_require__(77)
	  , SPECIES    = __webpack_require__(51)('species')
	  , RECORD     = __webpack_require__(53)('record')
	  , asap       = __webpack_require__(95)
	  , PROMISE    = 'Promise'
	  , process    = global.process
	  , isNode     = classof(process) == 'process'
	  , P          = global[PROMISE]
	  , Wrapper;
	
	var testResolve = function(sub){
	  var test = new P(function(){});
	  if(sub)test.constructor = Object;
	  return P.resolve(test) === test;
	};
	
	var useNative = function(){
	  var works = false;
	  function P2(x){
	    var self = new P(x);
	    setProto(self, P2.prototype);
	    return self;
	  }
	  try {
	    works = P && P.resolve && testResolve();
	    setProto(P2, P);
	    P2.prototype = $.create(P.prototype, {constructor: {value: P2}});
	    // actual Firefox has broken subclass support, test that
	    if(!(P2.resolve(5).then(function(){}) instanceof P2)){
	      works = false;
	    }
	    // actual V8 bug, https://code.google.com/p/v8/issues/detail?id=4162
	    if(works && __webpack_require__(49)){
	      var thenableThenGotten = false;
	      P.resolve($.setDesc({}, 'then', {
	        get: function(){ thenableThenGotten = true; }
	      }));
	      works = thenableThenGotten;
	    }
	  } catch(e){ works = false; }
	  return works;
	}();
	
	// helpers
	var isPromise = function(it){
	  return isObject(it) && (useNative ? classof(it) == 'Promise' : RECORD in it);
	};
	var sameConstructor = function(a, b){
	  // library wrapper special case
	  if(LIBRARY && a === P && b === Wrapper)return true;
	  return same(a, b);
	};
	var getConstructor = function(C){
	  var S = anObject(C)[SPECIES];
	  return S != undefined ? S : C;
	};
	var isThenable = function(it){
	  var then;
	  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};
	var notify = function(record, isReject){
	  if(record.n)return;
	  record.n = true;
	  var chain = record.c;
	  asap(function(){
	    var value = record.v
	      , ok    = record.s == 1
	      , i     = 0;
	    var run = function(react){
	      var cb = ok ? react.ok : react.fail
	        , ret, then;
	      try {
	        if(cb){
	          if(!ok)record.h = true;
	          ret = cb === true ? value : cb(value);
	          if(ret === react.P){
	            react.rej(TypeError('Promise-chain cycle'));
	          } else if(then = isThenable(ret)){
	            then.call(ret, react.res, react.rej);
	          } else react.res(ret);
	        } else react.rej(value);
	      } catch(err){
	        react.rej(err);
	      }
	    };
	    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
	    chain.length = 0;
	    record.n = false;
	    if(isReject)setTimeout(function(){
	      asap(function(){
	        if(isUnhandled(record.p)){
	          if(isNode){
	            process.emit('unhandledRejection', value, record.p);
	          } else if(global.console && console.error){
	            console.error('Unhandled promise rejection', value);
	          }
	        }
	        record.a = undefined;
	      });
	    }, 1);
	  });
	};
	var isUnhandled = function(promise){
	  var record = promise[RECORD]
	    , chain  = record.a || record.c
	    , i      = 0
	    , react;
	  if(record.h)return false;
	  while(chain.length > i){
	    react = chain[i++];
	    if(react.fail || !isUnhandled(react.P))return false;
	  } return true;
	};
	var $reject = function(value){
	  var record = this;
	  if(record.d)return;
	  record.d = true;
	  record = record.r || record; // unwrap
	  record.v = value;
	  record.s = 2;
	  record.a = record.c.slice();
	  notify(record, true);
	};
	var $resolve = function(value){
	  var record = this
	    , then;
	  if(record.d)return;
	  record.d = true;
	  record = record.r || record; // unwrap
	  try {
	    if(then = isThenable(value)){
	      asap(function(){
	        var wrapper = {r: record, d: false}; // wrap
	        try {
	          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
	        } catch(e){
	          $reject.call(wrapper, e);
	        }
	      });
	    } else {
	      record.v = value;
	      record.s = 1;
	      notify(record, false);
	    }
	  } catch(e){
	    $reject.call({r: record, d: false}, e); // wrap
	  }
	};
	
	// constructor polyfill
	if(!useNative){
	  // 25.4.3.1 Promise(executor)
	  P = function Promise(executor){
	    aFunction(executor);
	    var record = {
	      p: strictNew(this, P, PROMISE),         // <- promise
	      c: [],                                  // <- awaiting reactions
	      a: undefined,                           // <- checked in isUnhandled reactions
	      s: 0,                                   // <- state
	      d: false,                               // <- done
	      v: undefined,                           // <- value
	      h: false,                               // <- handled rejection
	      n: false                                // <- notify
	    };
	    this[RECORD] = record;
	    try {
	      executor(ctx($resolve, record, 1), ctx($reject, record, 1));
	    } catch(err){
	      $reject.call(record, err);
	    }
	  };
	  __webpack_require__(83)(P.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected){
	      var S = anObject(anObject(this).constructor)[SPECIES];
	      var react = {
	        ok:   typeof onFulfilled == 'function' ? onFulfilled : true,
	        fail: typeof onRejected == 'function'  ? onRejected  : false
	      };
	      var promise = react.P = new (S != undefined ? S : P)(function(res, rej){
	        react.res = aFunction(res);
	        react.rej = aFunction(rej);
	      });
	      var record = this[RECORD];
	      record.c.push(react);
	      if(record.a)record.a.push(react);
	      if(record.s)notify(record, false);
	      return promise;
	    },
	    // 25.4.5.1 Promise.prototype.catch(onRejected)
	    'catch': function(onRejected){
	      return this.then(undefined, onRejected);
	    }
	  });
	}
	
	// export
	$def($def.G + $def.W + $def.F * !useNative, {Promise: P});
	__webpack_require__(55)(P, PROMISE);
	species(P);
	species(Wrapper = __webpack_require__(16)[PROMISE]);
	
	// statics
	$def($def.S + $def.F * !useNative, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r){
	    return new this(function(res, rej){ rej(r); });
	  }
	});
	$def($def.S + $def.F * (!useNative || testResolve(true)), PROMISE, {
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x){
	    return isPromise(x) && sameConstructor(x.constructor, this)
	      ? x : new this(function(res){ res(x); });
	  }
	});
	$def($def.S + $def.F * !(useNative && __webpack_require__(100)(function(iter){
	  P.all(iter)['catch'](function(){});
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable){
	    var C      = getConstructor(this)
	      , values = [];
	    return new C(function(res, rej){
	      forOf(iterable, false, values.push, values);
	      var remaining = values.length
	        , results   = Array(remaining);
	      if(remaining)$.each.call(values, function(promise, index){
	        C.resolve(promise).then(function(value){
	          results[index] = value;
	          --remaining || res(results);
	        }, rej);
	      });
	      else res(results);
	    });
	  },
	  // 25.4.4.4 Promise.race(iterable)
	  race: function race(iterable){
	    var C = getConstructor(this);
	    return new C(function(res, rej){
	      forOf(iterable, false, function(promise){
	        C.resolve(promise).then(res, rej);
	      });
	    });
	  }
	});

/***/ },
/* 94 */
/***/ function(module, exports) {

	module.exports = Object.is || function is(x, y){
	  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
	};

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(15)
	  , macrotask = __webpack_require__(96).set
	  , Observer  = global.MutationObserver || global.WebKitMutationObserver
	  , process   = global.process
	  , head, last, notify;
	
	function flush(){
	  while(head){
	    head.fn.call(); // <- currently we use it only for Promise - try / catch not required
	    head = head.next;
	  } last = undefined;
	}
	
	// Node.js
	if(__webpack_require__(11)(process) == 'process'){
	  notify = function(){
	    process.nextTick(flush);
	  };
	// browsers with MutationObserver
	} else if(Observer){
	  var toggle = 1
	    , node   = document.createTextNode('');
	  new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
	  notify = function(){
	    node.data = toggle = -toggle;
	  };
	// for other environments - macrotask based on:
	// - setImmediate
	// - MessageChannel
	// - window.postMessag
	// - onreadystatechange
	// - setTimeout
	} else {
	  notify = function(){
	    // strange IE + webpack dev server bug - use .call(global)
	    macrotask.call(global, flush);
	  };
	}
	
	module.exports = function asap(fn){
	  var task = {fn: fn, next: undefined};
	  if(last)last.next = task;
	  if(!head){
	    head = task;
	    notify();
	  } last = task;
	};

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ctx                = __webpack_require__(27)
	  , invoke             = __webpack_require__(97)
	  , html               = __webpack_require__(98)
	  , cel                = __webpack_require__(99)
	  , global             = __webpack_require__(15)
	  , process            = global.process
	  , setTask            = global.setImmediate
	  , clearTask          = global.clearImmediate
	  , MessageChannel     = global.MessageChannel
	  , counter            = 0
	  , queue              = {}
	  , ONREADYSTATECHANGE = 'onreadystatechange'
	  , defer, channel, port;
	var run = function(){
	  var id = +this;
	  if(queue.hasOwnProperty(id)){
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};
	var listner = function(event){
	  run.call(event.data);
	};
	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if(!setTask || !clearTask){
	  setTask = function setImmediate(fn){
	    var args = [], i = 1;
	    while(arguments.length > i)args.push(arguments[i++]);
	    queue[++counter] = function(){
	      invoke(typeof fn == 'function' ? fn : Function(fn), args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clearTask = function clearImmediate(id){
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if(__webpack_require__(11)(process) == 'process'){
	    defer = function(id){
	      process.nextTick(ctx(run, id, 1));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  } else if(MessageChannel){
	    channel = new MessageChannel;
	    port    = channel.port2;
	    channel.port1.onmessage = listner;
	    defer = ctx(port.postMessage, port, 1);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScript){
	    defer = function(id){
	      global.postMessage(id + '', '*');
	    };
	    global.addEventListener('message', listner, false);
	  // IE8-
	  } else if(ONREADYSTATECHANGE in cel('script')){
	    defer = function(id){
	      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
	        html.removeChild(this);
	        run.call(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function(id){
	      setTimeout(ctx(run, id, 1), 0);
	    };
	  }
	}
	module.exports = {
	  set:   setTask,
	  clear: clearTask
	};

/***/ },
/* 97 */
/***/ function(module, exports) {

	// fast apply, http://jsperf.lnkit.com/fast-apply/5
	module.exports = function(fn, args, that){
	  var un = that === undefined;
	  switch(args.length){
	    case 0: return un ? fn()
	                      : fn.call(that);
	    case 1: return un ? fn(args[0])
	                      : fn.call(that, args[0]);
	    case 2: return un ? fn(args[0], args[1])
	                      : fn.call(that, args[0], args[1]);
	    case 3: return un ? fn(args[0], args[1], args[2])
	                      : fn.call(that, args[0], args[1], args[2]);
	    case 4: return un ? fn(args[0], args[1], args[2], args[3])
	                      : fn.call(that, args[0], args[1], args[2], args[3]);
	  } return              fn.apply(that, args);
	};

/***/ },
/* 98 */
/***/ function(module, exports) {

	module.exports = "module.exports = require('./$.global').document && document.documentElement;";

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(25)
	  , document = __webpack_require__(15).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	var SYMBOL_ITERATOR = __webpack_require__(51)('iterator')
	  , SAFE_CLOSING    = false;
	try {
	  var riter = [7][SYMBOL_ITERATOR]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	  Array.from(riter, function(){ throw 2; });
	} catch(e){ /* empty */ }
	module.exports = function(exec){
	  if(!SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[SYMBOL_ITERATOR]();
	    iter.next = function(){ safe = true; };
	    arr[SYMBOL_ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(102), __esModule: true };

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(57);
	__webpack_require__(103);
	module.exports = __webpack_require__(16).Array.from;

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ctx         = __webpack_require__(27)
	  , $def        = __webpack_require__(14)
	  , toObject    = __webpack_require__(70)
	  , call        = __webpack_require__(80)
	  , isArrayIter = __webpack_require__(81)
	  , toLength    = __webpack_require__(82)
	  , getIterFn   = __webpack_require__(61);
	$def($def.S + $def.F * !__webpack_require__(100)(function(iter){ Array.from(iter); }), 'Array', {
	  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
	    var O       = toObject(arrayLike)
	      , C       = typeof this == 'function' ? this : Array
	      , mapfn   = arguments[1]
	      , mapping = mapfn !== undefined
	      , index   = 0
	      , iterFn  = getIterFn(O)
	      , length, result, step, iterator;
	    if(mapping)mapfn = ctx(mapfn, arguments[2], 2);
	    // if object isn't iterable or it's array with default iterator - use simple case
	    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
	      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
	        result[index] = mapping ? call(iterator, mapfn, [step.value, index], true) : step.value;
	      }
	    } else {
	      for(result = new C(length = toLength(O.length)); length > index; index++){
	        result[index] = mapping ? mapfn(O[index], index) : O[index];
	      }
	    }
	    result.length = index;
	    return result;
	  }
	});

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(105), __esModule: true };

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(106);
	module.exports = __webpack_require__(16).Object.keys;

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(70);
	
	__webpack_require__(13)('keys', function($keys){
	  return function keys(it){
	    return $keys(toObject(it));
	  };
	});

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _Object$getOwnPropertyNames = __webpack_require__(108)["default"];
	
	var _Object$getOwnPropertyDescriptor = __webpack_require__(5)["default"];
	
	var _Object$defineProperty = __webpack_require__(30)["default"];
	
	exports["default"] = function (obj, defaults) {
	  var keys = _Object$getOwnPropertyNames(defaults);
	
	  for (var i = 0; i < keys.length; i++) {
	    var key = keys[i];
	
	    var value = _Object$getOwnPropertyDescriptor(defaults, key);
	
	    if (value && value.configurable && obj[key] === undefined) {
	      _Object$defineProperty(obj, key, value);
	    }
	  }
	
	  return obj;
	};
	
	exports.__esModule = true;

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(109), __esModule: true };

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(7);
	__webpack_require__(110);
	module.exports = function getOwnPropertyNames(it){
	  return $.getNames(it);
	};

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 Object.getOwnPropertyNames(O)
	__webpack_require__(13)('getOwnPropertyNames', function(){
	  return __webpack_require__(111).get;
	});

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toString  = {}.toString
	  , toIObject = __webpack_require__(9)
	  , getNames  = __webpack_require__(7).getNames;
	
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
/* 112 */
/***/ function(module, exports) {

	"use strict";
	
	exports["default"] = function (obj, defaults) {
	  var newObj = defaults({}, obj);
	  delete newObj["default"];
	  return newObj;
	};
	
	exports.__esModule = true;

/***/ },
/* 113 */
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
	 * FlexCss.Tooltip
	 * Licensed under the MIT License (MIT)
	 * Copyright (c) 2015 David Heidrich, BowlingX <me@bowlingx.com>
	 */
	
	'use strict';
	
	var _get = __webpack_require__(4)['default'];
	
	var _inherits = __webpack_require__(18)['default'];
	
	var _createClass = __webpack_require__(29)['default'];
	
	var _classCallCheck = __webpack_require__(32)['default'];
	
	var _Object$assign = __webpack_require__(66)['default'];
	
	var _interopRequireDefault = __webpack_require__(2)['default'];
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _utilUtil = __webpack_require__(114);
	
	var _utilUtil2 = _interopRequireDefault(_utilUtil);
	
	var _DestroyableWidget2 = __webpack_require__(115);
	
	var _DestroyableWidget3 = _interopRequireDefault(_DestroyableWidget2);
	
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
	
	        _get(Object.getPrototypeOf(Tooltip.prototype), 'constructor', this).call(this);
	        /**
	         * The Container where possible events are captured
	         */
	        this.container = DelegateContainer instanceof HTMLElement ? DelegateContainer : doc.getElementById(DelegateContainer);
	
	        if (!this.container) {
	            throw 'Could not create Tooltip, DelegateContainer not found';
	        }
	
	        /**
	         * The Container where tooltips are stored for this instance
	         * @type {HTMLElement}
	         */
	        this.tooltipContainer = null;
	
	        /**
	         * Default Options
	         */
	        this.options = {
	            containerClass: '',
	            selectorAttribute: 'data-tooltip'
	        };
	
	        _Object$assign(this.options, options || {});
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
	
	            _utilUtil2['default'].setupPositionNearby(positionRelative || target, tooltipContainer, this.container, true, true);
	
	            tooltipContainer.classList.add(CLASS_NAMES_OPEN);
	        }
	    }, {
	        key: '_restoreClassNames',
	        value: function _restoreClassNames(container, target) {
	            // allow additional classname per tooltip on target element
	            var classNames = [CLASS_NAMES_TOOLTIP, this.options.containerClass],
	                maybeTargetClass = target.getAttribute(ATTR_DATA_CLASSNAME);
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
	            if (!target && this.tooltipContainer) {
	                target = this.tooltipContainer.flexTooltipCurrentTarget;
	            }
	            if (this.tooltipContainer) {
	                if (this.tooltipContainer.flexTooltipCurrentTarget !== target) {
	                    return;
	                }
	                this.tooltipContainer.classList.remove(CLASS_NAMES_OPEN);
	                delete this.tooltipContainer.flexTooltipCurrentTarget;
	            }
	            if (target && target.oldTitle) {
	                target.setAttribute('title', target.oldTitle);
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
	})(_DestroyableWidget3['default']);
	
	exports['default'] = Tooltip;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 114 */
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
	
	'use strict';
	
	var _createClass = __webpack_require__(29)["default"];
	
	var _classCallCheck = __webpack_require__(32)["default"];
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
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
	                if (!PFX[p]) {
	                    type = type.toLowerCase();
	                }
	                var name = PFX[p] + type;
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
	
	            var doc = global.document,
	                inner = doc.createElement('p');
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
	         */
	    }, {
	        key: "addEventOnce",
	        value: function addEventOnce(ev, target, func, capture) {
	            var thisFunction = function thisFunction(event) {
	                func(event, func);
	                target.removeEventListener(ev, thisFunction, capture);
	            };
	            return target.addEventListener(ev, thisFunction, capture);
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
	                    var s = Util.dashToCamelCase(attr.nodeName.replace('data-', '')),
	                        val = attr.nodeValue;
	                    if (base.hasOwnProperty(s)) {
	                        // skip functions
	                        if (typeof base[s] === 'function') {
	                            continue;
	                        }
	                        if (typeof base[s] === 'boolean') {
	                            base[s] = parseInt(val || 1) === 1;
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
	            var amountTop = 0,
	                amountLeft = 0;
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
	                } else {
	                    return true;
	                }
	            });
	
	            var targetPosition = target instanceof HTMLElement ? target.getBoundingClientRect() : target,
	                elementRect = elementToPosition.getBoundingClientRect(),
	                colRect = collisionContainer.getBoundingClientRect(),
	                targetTop = targetPosition.top - amountTop,
	                targetRight = targetPosition.right,
	                isCollisionTop = targetTop - elementRect.height <= 0,
	                isCollisionBottom = window.innerHeight < targetTop + amountTop + targetPosition.height + elementRect.height,
	                isCollisionLeft = targetRight < elementRect.width,
	                targetLeft = targetPosition.left,
	                isCollisionRight = targetLeft + elementRect.width > colRect.width,
	                classList = elementToPosition.classList;
	
	            classList.remove(COL_RIGHT_CLASS);
	            classList.remove(COL_LEFT_CLASS);
	            classList.remove(COL_BOTTOM_CLASS);
	
	            var calcTop = undefined,
	                calcLeft = undefined;
	            if (isCollisionLeft && !isCollisionRight) {
	                // put element to left if collision with left
	                calcLeft = targetPosition.left - colRect.left - amountLeft + 'px';
	                classList.add(COL_LEFT_CLASS);
	            } else {
	                // maybe center if no collision with either side
	                var rightPosition = targetRight - elementRect.width - colRect.left - amountLeft + 'px',
	                    leftCentered = (targetLeft + targetPosition.width / 2 - elementRect.width / 2 || 0) - colRect.left,
	                    collisionCentered = leftCentered + elementRect.width > colRect.width;
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
	            // optionally use a additional scrollDif
	            if (optionalOffset) {
	                if (typeof optionalOffset === 'function') {
	                    optionalOffset = optionalOffset();
	                }
	                if (optionalOffset > 0) {
	                    var scrolledY = window.scrollY || window.pageYOffset;
	                    if (scrolledY) {
	                        window.scroll(0, scrolledY - optionalOffset);
	                    }
	                }
	            }
	        }
	    }]);
	
	    return Util;
	})();
	
	exports["default"] = Util;
	module.exports = exports["default"];
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

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
	
	var _createClass = __webpack_require__(29)['default'];
	
	var _classCallCheck = __webpack_require__(32)['default'];
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
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
	
	exports['default'] = DestroyableWidget;
	module.exports = exports['default'];

/***/ },
/* 116 */
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
	/*global CustomEvent*/
	
	'use strict';
	
	// polyfill for custom events to make thinks work in IE
	// The needed polyfill is so small that I embedded it here
	
	var _createClass = __webpack_require__(29)['default'];
	
	var _classCallCheck = __webpack_require__(32)['default'];
	
	var _Object$assign = __webpack_require__(66)['default'];
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	void (function () {
	    if (!global.CustomEvent || typeof global.CustomEvent !== 'function') {
	        var CustomEvent;
	        CustomEvent = function (event, params) {
	            var evt;
	            params = params || {
	                bubbles: false,
	                cancelable: false,
	                detail: undefined
	            };
	            evt = document.createEvent("CustomEvent");
	            evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
	            return evt;
	        };
	        CustomEvent.prototype = global.Event.prototype;
	        global.CustomEvent = CustomEvent;
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
	        key: 'withOptions',
	        value: function withOptions(options) {
	            _Object$assign(this.defaultOptions, options || {});
	            return this;
	        }
	
	        /**
	         * Call with the originalEvent
	         * @param {Event} e
	         * @returns {EventHandler}
	         */
	    }, {
	        key: 'withOriginal',
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
	        key: 'withDetail',
	        value: function withDetail(o) {
	            if (!this.defaultOptions.detail) {
	                this.defaultOptions.detail = {};
	            }
	            _Object$assign(this.defaultOptions.detail, o);
	            return this;
	        }
	
	        /**
	         * @returns {Window.CustomEvent}
	         */
	    }, {
	        key: 'fire',
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
	        key: 'dispatch',
	
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
	         * @returns {Window.CustomEvent}
	         */
	    }, {
	        key: 'dispatchAndFire',
	        value: function dispatchAndFire(target, name, options) {
	            return new EventHandler(target, name).withOptions(options).fire();
	        }
	    }]);
	
	    return Event;
	})();
	
	exports['default'] = Event;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 117 */
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
	'use strict';
	
	var _createClass = __webpack_require__(29)['default'];
	
	var _classCallCheck = __webpack_require__(32)['default'];
	
	var _Object$assign = __webpack_require__(66)['default'];
	
	var _interopRequireDefault = __webpack_require__(2)['default'];
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _utilUtil = __webpack_require__(114);
	
	var _utilUtil2 = _interopRequireDefault(_utilUtil);
	
	var DOM_COMPLETE = 'complete';
	
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
	            global.FLEXCSS_CONST_SCROLLBAR_WIDTH = _utilUtil2['default'].getScrollBarWidth();
	            // detect right transition end event
	            global.FLEXCSS_CONST_TRANSITION_EVENT = _utilUtil2['default'].whichTransitionEndEvent();
	        };
	
	        if (global.document.readyState === DOM_COMPLETE) {
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
	            _Object$assign(global.FLEXCSS_GLOBAL_SETTINGS, settings);
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
	
	exports['default'] = Settings;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	// the whatwg-fetch polyfill installs the fetch() function
	// on the global object (window or self)
	//
	// Return that as the export for use in Webpack, Browserify etc.
	'use strict';
	
	__webpack_require__(119);
	module.exports = self.fetch.bind(self);

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _Object$getOwnPropertyNames = __webpack_require__(108)['default'];
	
	var _Promise = __webpack_require__(91)['default'];
	
	(function () {
	  'use strict';
	
	  if (self.fetch) {
	    return;
	  }
	
	  function normalizeName(name) {
	    if (typeof name !== 'string') {
	      name = String(name);
	    }
	    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
	      throw new TypeError('Invalid character in header field name');
	    }
	    return name.toLowerCase();
	  }
	
	  function normalizeValue(value) {
	    if (typeof value !== 'string') {
	      value = String(value);
	    }
	    return value;
	  }
	
	  function Headers(headers) {
	    this.map = {};
	
	    if (headers instanceof Headers) {
	      headers.forEach(function (value, name) {
	        this.append(name, value);
	      }, this);
	    } else if (headers) {
	      _Object$getOwnPropertyNames(headers).forEach(function (name) {
	        this.append(name, headers[name]);
	      }, this);
	    }
	  }
	
	  Headers.prototype.append = function (name, value) {
	    name = normalizeName(name);
	    value = normalizeValue(value);
	    var list = this.map[name];
	    if (!list) {
	      list = [];
	      this.map[name] = list;
	    }
	    list.push(value);
	  };
	
	  Headers.prototype['delete'] = function (name) {
	    delete this.map[normalizeName(name)];
	  };
	
	  Headers.prototype.get = function (name) {
	    var values = this.map[normalizeName(name)];
	    return values ? values[0] : null;
	  };
	
	  Headers.prototype.getAll = function (name) {
	    return this.map[normalizeName(name)] || [];
	  };
	
	  Headers.prototype.has = function (name) {
	    return this.map.hasOwnProperty(normalizeName(name));
	  };
	
	  Headers.prototype.set = function (name, value) {
	    this.map[normalizeName(name)] = [normalizeValue(value)];
	  };
	
	  Headers.prototype.forEach = function (callback, thisArg) {
	    _Object$getOwnPropertyNames(this.map).forEach(function (name) {
	      this.map[name].forEach(function (value) {
	        callback.call(thisArg, value, name, this);
	      }, this);
	    }, this);
	  };
	
	  function consumed(body) {
	    if (body.bodyUsed) {
	      return _Promise.reject(new TypeError('Already read'));
	    }
	    body.bodyUsed = true;
	  }
	
	  function fileReaderReady(reader) {
	    return new _Promise(function (resolve, reject) {
	      reader.onload = function () {
	        resolve(reader.result);
	      };
	      reader.onerror = function () {
	        reject(reader.error);
	      };
	    });
	  }
	
	  function readBlobAsArrayBuffer(blob) {
	    var reader = new FileReader();
	    reader.readAsArrayBuffer(blob);
	    return fileReaderReady(reader);
	  }
	
	  function readBlobAsText(blob) {
	    var reader = new FileReader();
	    reader.readAsText(blob);
	    return fileReaderReady(reader);
	  }
	
	  var support = {
	    blob: 'FileReader' in self && 'Blob' in self && (function () {
	      try {
	        new Blob();
	        return true;
	      } catch (e) {
	        return false;
	      }
	    })(),
	    formData: 'FormData' in self
	  };
	
	  function Body() {
	    this.bodyUsed = false;
	
	    this._initBody = function (body) {
	      this._bodyInit = body;
	      if (typeof body === 'string') {
	        this._bodyText = body;
	      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
	        this._bodyBlob = body;
	      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
	        this._bodyFormData = body;
	      } else if (!body) {
	        this._bodyText = '';
	      } else {
	        throw new Error('unsupported BodyInit type');
	      }
	    };
	
	    if (support.blob) {
	      this.blob = function () {
	        var rejected = consumed(this);
	        if (rejected) {
	          return rejected;
	        }
	
	        if (this._bodyBlob) {
	          return _Promise.resolve(this._bodyBlob);
	        } else if (this._bodyFormData) {
	          throw new Error('could not read FormData body as blob');
	        } else {
	          return _Promise.resolve(new Blob([this._bodyText]));
	        }
	      };
	
	      this.arrayBuffer = function () {
	        return this.blob().then(readBlobAsArrayBuffer);
	      };
	
	      this.text = function () {
	        var rejected = consumed(this);
	        if (rejected) {
	          return rejected;
	        }
	
	        if (this._bodyBlob) {
	          return readBlobAsText(this._bodyBlob);
	        } else if (this._bodyFormData) {
	          throw new Error('could not read FormData body as text');
	        } else {
	          return _Promise.resolve(this._bodyText);
	        }
	      };
	    } else {
	      this.text = function () {
	        var rejected = consumed(this);
	        return rejected ? rejected : _Promise.resolve(this._bodyText);
	      };
	    }
	
	    if (support.formData) {
	      this.formData = function () {
	        return this.text().then(decode);
	      };
	    }
	
	    this.json = function () {
	      return this.text().then(JSON.parse);
	    };
	
	    return this;
	  }
	
	  // HTTP methods whose capitalization should be normalized
	  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];
	
	  function normalizeMethod(method) {
	    var upcased = method.toUpperCase();
	    return methods.indexOf(upcased) > -1 ? upcased : method;
	  }
	
	  function Request(input, options) {
	    options = options || {};
	    var body = options.body;
	    if (Request.prototype.isPrototypeOf(input)) {
	      if (input.bodyUsed) {
	        throw new TypeError('Already read');
	      }
	      this.url = input.url;
	      this.credentials = input.credentials;
	      if (!options.headers) {
	        this.headers = new Headers(input.headers);
	      }
	      this.method = input.method;
	      this.mode = input.mode;
	      if (!body) {
	        body = input._bodyInit;
	        input.bodyUsed = true;
	      }
	    } else {
	      this.url = input;
	    }
	
	    this.credentials = options.credentials || this.credentials || 'omit';
	    if (options.headers || !this.headers) {
	      this.headers = new Headers(options.headers);
	    }
	    this.method = normalizeMethod(options.method || this.method || 'GET');
	    this.mode = options.mode || this.mode || null;
	    this.referrer = null;
	
	    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
	      throw new TypeError('Body not allowed for GET or HEAD requests');
	    }
	    this._initBody(body);
	  }
	
	  Request.prototype.clone = function () {
	    return new Request(this);
	  };
	
	  function decode(body) {
	    var form = new FormData();
	    body.trim().split('&').forEach(function (bytes) {
	      if (bytes) {
	        var split = bytes.split('=');
	        var name = split.shift().replace(/\+/g, ' ');
	        var value = split.join('=').replace(/\+/g, ' ');
	        form.append(decodeURIComponent(name), decodeURIComponent(value));
	      }
	    });
	    return form;
	  }
	
	  function headers(xhr) {
	    var head = new Headers();
	    var pairs = xhr.getAllResponseHeaders().trim().split('\n');
	    pairs.forEach(function (header) {
	      var split = header.trim().split(':');
	      var key = split.shift().trim();
	      var value = split.join(':').trim();
	      head.append(key, value);
	    });
	    return head;
	  }
	
	  Body.call(Request.prototype);
	
	  function Response(bodyInit, options) {
	    if (!options) {
	      options = {};
	    }
	
	    this._initBody(bodyInit);
	    this.type = 'default';
	    this.status = options.status;
	    this.ok = this.status >= 200 && this.status < 300;
	    this.statusText = options.statusText;
	    this.headers = options.headers instanceof Headers ? options.headers : new Headers(options.headers);
	    this.url = options.url || '';
	  }
	
	  Body.call(Response.prototype);
	
	  Response.prototype.clone = function () {
	    return new Response(this._bodyInit, {
	      status: this.status,
	      statusText: this.statusText,
	      headers: new Headers(this.headers),
	      url: this.url
	    });
	  };
	
	  Response.error = function () {
	    var response = new Response(null, { status: 0, statusText: '' });
	    response.type = 'error';
	    return response;
	  };
	
	  var redirectStatuses = [301, 302, 303, 307, 308];
	
	  Response.redirect = function (url, status) {
	    if (redirectStatuses.indexOf(status) === -1) {
	      throw new RangeError('Invalid status code');
	    }
	
	    return new Response(null, { status: status, headers: { location: url } });
	  };
	
	  self.Headers = Headers;
	  self.Request = Request;
	  self.Response = Response;
	
	  self.fetch = function (input, init) {
	    return new _Promise(function (resolve, reject) {
	      var request;
	      if (Request.prototype.isPrototypeOf(input) && !init) {
	        request = input;
	      } else {
	        request = new Request(input, init);
	      }
	
	      var xhr = new XMLHttpRequest();
	
	      function responseURL() {
	        if ('responseURL' in xhr) {
	          return xhr.responseURL;
	        }
	
	        // Avoid security warnings on getResponseHeader when not allowed by CORS
	        if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
	          return xhr.getResponseHeader('X-Request-URL');
	        }
	
	        return;
	      }
	
	      xhr.onload = function () {
	        var status = xhr.status === 1223 ? 204 : xhr.status;
	        if (status < 100 || status > 599) {
	          reject(new TypeError('Network request failed'));
	          return;
	        }
	        var options = {
	          status: status,
	          statusText: xhr.statusText,
	          headers: headers(xhr),
	          url: responseURL()
	        };
	        var body = 'response' in xhr ? xhr.response : xhr.responseText;
	        resolve(new Response(body, options));
	      };
	
	      xhr.onerror = function () {
	        reject(new TypeError('Network request failed'));
	      };
	
	      xhr.open(request.method, request.url, true);
	
	      if (request.credentials === 'include') {
	        xhr.withCredentials = true;
	      }
	
	      if ('responseType' in xhr && support.blob) {
	        xhr.responseType = 'blob';
	      }
	
	      request.headers.forEach(function (value, name) {
	        xhr.setRequestHeader(name, value);
	      });
	
	      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
	    });
	  };
	  self.fetch.polyfill = true;
	})();

/***/ },
/* 120 */
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
	
	var _createClass = __webpack_require__(29)['default'];
	
	var _classCallCheck = __webpack_require__(32)['default'];
	
	var _Object$assign = __webpack_require__(66)['default'];
	
	var _Promise = __webpack_require__(91)['default'];
	
	var _interopRequireDefault = __webpack_require__(2)['default'];
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _utilSettings = __webpack_require__(117);
	
	var _utilSettings2 = _interopRequireDefault(_utilSettings);
	
	var _utilEvent = __webpack_require__(116);
	
	var _utilEvent2 = _interopRequireDefault(_utilEvent);
	
	var _utilUtil = __webpack_require__(114);
	
	var _utilUtil2 = _interopRequireDefault(_utilUtil);
	
	var _Widget = __webpack_require__(121);
	
	var _Widget2 = _interopRequireDefault(_Widget);
	
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
	var EVENT_MODAL_CLOSED = 'flexcss.modal.closed';
	exports.EVENT_MODAL_CLOSED = EVENT_MODAL_CLOSED;
	/**
	 * Event triggered before a modal is closed, cancelable
	 * @type {string}
	 */
	var EVENT_MODAL_BEFORE_CLOSED = 'flexcss.modal.beforeClose';
	exports.EVENT_MODAL_BEFORE_CLOSED = EVENT_MODAL_BEFORE_CLOSED;
	/**
	 * Event triggered when a modal is opened
	 * @type {string}
	 */
	var EVENT_MODAL_OPENED = 'flexcss.modal.opened';
	
	exports.EVENT_MODAL_OPENED = EVENT_MODAL_OPENED;
	/**
	 * Event triggered when modal is initilized, called on target
	 * @type {string}
	 */
	var EVENT_MODAL_INIT = 'flexcss.modal.init';
	
	exports.EVENT_MODAL_INIT = EVENT_MODAL_INIT;
	/**
	 * Triggered when the content of an async modal on a target is loaded, called on target
	 * @type {string}
	 */
	var EVENT_MODAL_ASYNC_TARGET_LOADED = 'flexcss.modal.asyncTargetLoaded';
	
	exports.EVENT_MODAL_ASYNC_TARGET_LOADED = EVENT_MODAL_ASYNC_TARGET_LOADED;
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
	            throw 'Could not found container element by given ID/Element: ' + DelegateContainer;
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
	
	        _Object$assign(this.options, options);
	
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
	
	    // Static variable that keeps track of all open modals
	
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
	                            _utilSettings2['default'].get().scrollbarUpdateNodes.forEach(function (node) {
	                                node.style.paddingRight = '';
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
	
	            var options = self.currentOpen ? _utilUtil2['default'].applyOptionsFromElement(self.currentOpen, _utilUtil2['default'].copy(self.options)) : self.options;
	
	            // close only on keyboard if instance should
	            if (!options.closeOnEscape && e instanceof KeyboardEvent) {
	                return false;
	            }
	
	            // close only on background if instance should
	            if (!options.closeOnBackgroundClick && e && e.type === _utilSettings2['default'].getTabEvent() && !e.target.hasAttribute(ATTR_CLOSE)) {
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
	                var ev = _utilEvent2['default'].dispatchAndFire(self.currentOpen, EVENT_MODAL_BEFORE_CLOSED);
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
	                _utilEvent2['default'].dispatch(self.currentOpen, EVENT_MODAL_CLOSED).withOriginal(e).fire();
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
	                _utilUtil2['default'].prefixedAnimateEvent(last, 'AnimationEnd', this._finishAnim);
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
	            _utilUtil2['default'].prefixedAnimateEvent(co, 'AnimationEnd', this._finishAnim);
	
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
	                        _utilEvent2['default'].dispatchAndFire(n, EVENT_MODAL_CLOSED);
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
	                _utilSettings2['default'].get().scrollbarUpdateNodes.map(function (n) {
	                    return {
	                        n: n, padding: parseInt(global.getComputedStyle(n).paddingRight) + _utilSettings2['default'].getScrollbarWidth() + 'px'
	                    };
	                }).forEach(function (d) {
	                    d.n.style.paddingRight = d.padding;
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
	                var foundInstance = _utilUtil2['default'].parentsUntil(e.target, function (node) {
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
	                isWidget = _Widget2['default'].isWidget(e);
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
	                widget = _Widget2['default'].findWidget(target);
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
	                    if (_utilUtil2['default'].isPartOfNode(ce.target, self.currentOpen)) {
	                        if (!ce.target.hasAttribute(ATTR_CLOSE)) {
	                            return false;
	                        }
	                    }
	                    self.close(ce);
	                };
	
	                this.modalContainer.addEventListener(_utilSettings2['default'].getTabEvent(), closeModalFunction, false);
	
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
	            if (_Widget2['default'].isWidget(widget) && async) {
	                future = async.then(function (r) {
	                    var result;
	                    if (r instanceof HTMLElement || r instanceof DocumentFragment) {
	                        result = r;
	                    } else {
	                        // Create container Element:
	                        var element = doc.createElement('div');
	                        element.className = self.options.classNames;
	                        element.innerHTML = r;
	                        element.id = _utilUtil2['default'].guid();
	                        result = element;
	                    }
	                    widget.finalContent = result;
	                    _utilEvent2['default'].dispatchAndFire(target, EVENT_MODAL_ASYNC_TARGET_LOADED);
	                    return result;
	                });
	            } else {
	                var el = targetContent instanceof HTMLElement || targetContent instanceof DocumentFragment ? targetContent : doc.getElementById(targetContent);
	                if (el) {
	                    future = new _Promise(function (resolve) {
	                        resolve(el);
	                    });
	                } else {
	                    throw 'Could not found given modal element (content) with ID: ' + targetContent;
	                }
	            }
	
	            _utilEvent2['default'].dispatchAndFire(target, EVENT_MODAL_INIT);
	
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
	
	            _utilEvent2['default'].dispatch(modal, EVENT_MODAL_OPENED).withOriginal(maybeEvent).fire();
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
	            delegateContainer.addEventListener(_utilSettings2['default'].getTabEvent(), self.eventFunction, false);
	
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
	                self.eventContainer.removeEventListener(_utilSettings2['default'].getTabEvent(), self.eventFunction, true);
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
	
	exports['default'] = Modal;
	Modal._modalInstances = [];
	
	// Global keydown listener for modal
	global.addEventListener('keydown', function (e) {
	    if (e.keyCode === KEY_ESC) {
	        var lastModal = Modal._modalInstances[Modal._modalInstances.length - 1];
	        if (lastModal) {
	            _Widget2['default'].findWidget(lastModal).close(e);
	        }
	    }
	});
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 121 */
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
	 * FlexCss.Widget
	 * Licensed under the MIT License (MIT)
	 * Copyright (c) 2015 David Heidrich, BowlingX <me@bowlingx.com>
	 */
	
	'use strict';
	
	/**
	 * A Widget provides async content on a specific target (e.g. a modal link)
	 */
	
	var _createClass = __webpack_require__(29)['default'];
	
	var _classCallCheck = __webpack_require__(32)['default'];
	
	var _Promise = __webpack_require__(91)['default'];
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
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
	        this.setAsync((function () {
	          return new _Promise((function (s) {
	            s(_this.element);
	          }).bind(_this));
	        }).bind(this));
	      } else {
	        throw 'Could not found element with ID: ' + element;
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
	      return self instanceof Widget || typeof self === 'object' && self.hasOwnProperty('_isWidget');
	    }
	  }]);
	
	  return Widget;
	})();
	
	exports['default'] = Widget;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 122 */
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
	 * FlexCss.Toggleable
	 * Licensed under the MIT License (MIT)
	 * Copyright (c) 2015 David Heidrich, BowlingX <me@bowlingx.com>
	 */
	
	'use strict';
	
	var _createClass = __webpack_require__(29)['default'];
	
	var _classCallCheck = __webpack_require__(32)['default'];
	
	var _Promise = __webpack_require__(91)['default'];
	
	var _interopRequireDefault = __webpack_require__(2)['default'];
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _utilSettings = __webpack_require__(117);
	
	var _utilSettings2 = _interopRequireDefault(_utilSettings);
	
	var _Widget = __webpack_require__(121);
	
	var _Widget2 = _interopRequireDefault(_Widget);
	
	var _utilUtil = __webpack_require__(114);
	
	var _utilUtil2 = _interopRequireDefault(_utilUtil);
	
	var _utilEvent = __webpack_require__(116);
	
	var _utilEvent2 = _interopRequireDefault(_utilEvent);
	
	/**
	 * Event that is fired when a tab is closed
	 * @type {string}
	 */
	
	var EVENT_TAB_CLOSED = 'flexcss.tab.closed';
	
	exports.EVENT_TAB_CLOSED = EVENT_TAB_CLOSED;
	/**
	 * Event that is fired when a tab has been opened
	 * @type {string}
	 */
	var EVENT_TAB_OPENED = 'flexcss.tab.opened';
	exports.EVENT_TAB_OPENED = EVENT_TAB_OPENED;
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
	            this.container.addEventListener(_utilSettings2['default'].getTabEvent(), this._listener.bind(this));
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
	
	            future = new _Promise(function (resolve, failure) {
	                if (ref) {
	                    resolve(ref);
	                } else {
	                    var widget = _Widget2['default'].findWidget(target),
	                        async = widget ? widget.getAsync() : null;
	                    if (_Widget2['default'].isWidget(widget) && async) {
	                        future = async.then(function (r) {
	                            if (r instanceof HTMLElement) {
	                                var id = _utilUtil2['default'].guid();
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
	                maybeToggleNode = _utilUtil2['default'].parentsUntil(target, function (node) {
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
	                                    _utilEvent2['default'].dispatchAndFire(el, EVENT_TAB_CLOSED);
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
	                _utilEvent2['default'].dispatchAndFire(r, EVENT_TAB_OPENED);
	                Toggleable._handleLoaded(target);
	                r.classList.toggle(ACTIVE_CLASS);
	                this.loading = false;
	            }).bind(this))['catch'](function (reason) {
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
	
	exports['default'] = Toggleable;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 123 */
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
	 * FlexCss.OffCanvas
	 * Licensed under the MIT License (MIT)
	 * Copyright (c) 2015 David Heidrich, BowlingX <me@bowlingx.com>
	 */
	
	'use strict';
	
	var _createClass = __webpack_require__(29)['default'];
	
	var _classCallCheck = __webpack_require__(32)['default'];
	
	var _interopRequireDefault = __webpack_require__(2)['default'];
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _utilSettings = __webpack_require__(117);
	
	var _utilSettings2 = _interopRequireDefault(_utilSettings);
	
	var _utilUtil = __webpack_require__(114);
	
	var _utilUtil2 = _interopRequireDefault(_utilUtil);
	
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
	        _classCallCheck(this, OffCanvas);
	
	        var doc = global.document,
	            touched = 0,
	            navigationContainer = NavigationId instanceof HTMLElement ? NavigationId : doc.getElementById(NavigationId),
	            darkener = Darkener instanceof HTMLElement ? Darkener : doc.getElementById(Darkener),
	            DARKENER_CLASS_TOGGLE = 'toggle-' + darkener.id || 'darkener',
	            DARKENER_CLASS_INSTANT_TOGGLE = DARKENER_CLASS_TOGGLE + '-open',
	            resetStyles = function resetStyles(s) {
	            s.transform = '';
	            s.transition = '';
	            s.webkitTransform = '';
	            s.webkitTransition = '';
	        },
	            shouldNotTouch = function shouldNotTouch() {
	            return window.innerWidth >= _utilSettings2['default'].get().smallBreakpoint;
	        };
	
	        if (!darkener || !navigationContainer) {
	            throw 'Could not find needed elements (Darkener and/or NavigationId)';
	        }
	
	        this.darkener = darkener;
	        this.darkenerClassToggle = DARKENER_CLASS_TOGGLE;
	        this.darkenerClassToggleInstant = DARKENER_CLASS_INSTANT_TOGGLE;
	
	        this.navigationContainer = navigationContainer;
	        this.navigationContainerId = navigationContainer.id;
	
	        // create id if id does not exist
	        if (!this.navigationContainerId) {
	            this.navigationContainerId = _utilUtil2['default'].guid();
	            navigationContainer.id = this.navigationContainerId;
	        }
	
	        if (!disableTouch) {
	            navigationContainer.addEventListener('touchstart', function (e) {
	                requestAnimationFrame(function () {
	                    if (shouldNotTouch()) {
	                        return;
	                    }
	                    touched = e.touches[0].clientX;
	                    var target = navigationContainer,
	                        style = target.style;
	                    target.mustHide = false;
	                    style.transition = 'transform 0s ease';
	                    style.webkitTransition = '-webkit-transform 0s ease';
	                });
	            });
	            navigationContainer.addEventListener('touchmove', function (e) {
	
	                if (shouldNotTouch()) {
	                    return;
	                }
	                var x = e.touches[0].clientX,
	                    target = navigationContainer,
	                    style = target.style,
	                    calc = touched - x,
	                    bounds = target.getBoundingClientRect(),
	                    compare = factor > 0 ? calc <= 0 : calc >= 0;
	                if (compare) {
	                    target.mustHide = factor > 0 ? calc * -1 > bounds.width / HIDE_FACTOR : calc > bounds.width / HIDE_FACTOR;
	                    style.transform = 'translate3d(' + calc * -1 + 'px,0,0)';
	                    style.webkitTransform = 'translate3d(' + calc * -1 + 'px,0,0)';
	                }
	            });
	            navigationContainer.addEventListener('touchend', (function () {
	                requestAnimationFrame((function () {
	                    if (shouldNotTouch()) {
	                        return;
	                    }
	                    var target = navigationContainer,
	                        style = target.style;
	                    if (target.mustHide) {
	                        var width = target.getBoundingClientRect().width * factor;
	                        style.transition = 'transform .2s ease';
	                        style.webkitTransition = '-webkit-transform .2s ease';
	
	                        style.transform = 'translate3d(' + width + 'px,0,0)';
	                        style.webkitTransform = 'translate3d(' + width + 'px,0,0)';
	                        this._remove(function () {
	                            resetStyles(style);
	                        });
	                        this._removeInstant();
	                    } else {
	                        resetStyles(style);
	                    }
	                }).bind(this));
	            }).bind(this));
	        }
	    }
	
	    /**
	     * @private
	     */
	
	    _createClass(OffCanvas, [{
	        key: '_remove',
	        value: function _remove(callback) {
	            _utilUtil2['default'].addEventOnce(_utilSettings2['default'].getTransitionEvent(), this.navigationContainer, (function () {
	                // add timeout because transition event fires a little to early
	                setTimeout((function () {
	                    requestAnimationFrame((function () {
	                        var body = global.document.body;
	                        OffCanvas.currentOpen = null;
	                        body.classList.remove(TOGGLE_CLASS);
	                        body.classList.remove(this.darkenerClassToggle);
	                        if (callback) {
	                            callback();
	                        }
	                    }).bind(this));
	                }).bind(this), _utilSettings2['default'].get().darkenerFadeDelay);
	            }).bind(this));
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
	            var bodyClass = global.document.body.classList,
	                darkenerClass = this.darkener.classList,
	                DARKENER_CLASS_TOGGLE = this.darkenerClassToggle,
	                DARKENER_CLASS_INSTANT_TOGGLE = this.darkenerClassToggleInstant,
	                navigationControllerClassList = this.navigationContainer.classList;
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
	            delegate = delegate || global.document;
	            delegate.addEventListener(_utilSettings2['default'].getTabEvent(), (function (e) {
	                if (OffCanvas.currentOpen && OffCanvas.currentOpen !== this) {
	                    return;
	                }
	                var id = this.navigationContainerId,
	                    validTarget = e.target.getAttribute(ATTR_TARGET) === id;
	                if (!_utilUtil2['default'].isPartOfNode(e.target, this.navigationContainer)) {
	                    if (validTarget || OffCanvas.currentOpen === this && e.target === this.darkener) {
	                        this._toggle(e);
	                    }
	                } else {
	                    if (e.target.hasAttribute(ATTR_CLOSE_SIDEBAR)) {
	                        this._toggle(e);
	                    }
	                }
	            }).bind(this));
	        }
	    }]);
	
	    return OffCanvas;
	})();
	
	exports['default'] = OffCanvas;
	
	OffCanvas.currentOpen = null;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 124 */
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
	
	var _createClass = __webpack_require__(29)['default'];
	
	var _classCallCheck = __webpack_require__(32)['default'];
	
	var _Promise = __webpack_require__(91)['default'];
	
	var _interopRequireDefault = __webpack_require__(2)['default'];
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _utilUtil = __webpack_require__(114);
	
	var _utilUtil2 = _interopRequireDefault(_utilUtil);
	
	var _utilSettings = __webpack_require__(117);
	
	var _utilSettings2 = _interopRequireDefault(_utilSettings);
	
	var _utilEvent = __webpack_require__(116);
	
	var _utilEvent2 = _interopRequireDefault(_utilEvent);
	
	var _Widget = __webpack_require__(121);
	
	var _Widget2 = _interopRequireDefault(_Widget);
	
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
	var EVENT_DROPDOWN_CLOSED = 'flexcss.dropdown.closed';
	
	exports.EVENT_DROPDOWN_CLOSED = EVENT_DROPDOWN_CLOSED;
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
	            throw 'required elements not found (darkener and container element)';
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
	            var currentOpen = this.currentOpen,
	                targetHas = e.target.hasAttribute(ATTR_NAME),
	                parentHas = e.target.parentNode ? e.target.parentNode.hasAttribute(ATTR_NAME) : false,
	                target = targetHas ? e.target : e.target.parentNode,
	                targetIsCurrent = target === this.currentTarget;
	
	            if (currentOpen && !_utilUtil2['default'].isPartOfNode(e.target, currentOpen) || targetIsCurrent) {
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
	                    if (!_utilUtil2['default'].isPartOfNode(e.target, currentOpen)) {
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
	            this.container.addEventListener(_utilSettings2['default'].getTabEvent(), this._delegateFunction.bind(this), true);
	            return this;
	        }
	
	        /**
	         * Destroys this instance, unbinds events
	         * @returns {Dropdown}
	         */
	    }, {
	        key: 'destroy',
	        value: function destroy() {
	            this.container.removeEventListener(_utilSettings2['default'].getTabEvent(), this._delegateFunction.bind(this), true);
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
	            var cls = 'toggle-' + (instance.id || CLS_DARKENER_DROPDOWN),
	                classList = this.container.classList;
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
	            var future,
	                darkenerInstance = currentOpen.flexDarkenerInstance || this.darkener,
	                thisCurrentOpen = currentOpen;
	
	            future = new _Promise(function (resolve) {
	                if (window.getComputedStyle(currentOpen).position === 'fixed') {
	                    _utilUtil2['default'].addEventOnce(_utilSettings2['default'].getTransitionEvent(), currentOpen, (function () {
	                        setTimeout((function () {
	                            _utilEvent2['default'].dispatchAndFire(thisCurrentOpen, EVENT_DROPDOWN_CLOSED);
	                            // if a new dropdown has been opened in the meantime, do not remove darkener
	                            if (this.currentOpen !== null) {
	                                return false;
	                            }
	                            this.toggleDarkenerToggler(darkenerInstance, false);
	                            this.container.classList.remove(_utilSettings2['default'].get().canvasToggledClass);
	                            resolve(true);
	                        }).bind(this), _utilSettings2['default'].get().darkenerFadeDelay);
	                    }).bind(_this));
	                } else {
	                    resolve(true);
	                    _utilEvent2['default'].dispatchAndFire(thisCurrentOpen, EVENT_DROPDOWN_CLOSED);
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
	            var doc = global.document;
	
	            if (!target) {
	                throw 'Dropdown target not found';
	            }
	
	            var widget = thisWidget || _Widget2['default'].findWidget(target),
	                future,
	                data = target.getAttribute(ATTR_NAME),
	                dropdownContainerElement = doc.getElementById(data),
	                async = !dropdownContainerElement && _Widget2['default'].isWidget(widget) ? widget.getAsync() : false;
	
	            if (async) {
	                target.classList.add(STATE_LOADING);
	                target.isLoading = true;
	                future = async.then(function (r) {
	                    if (r instanceof HTMLElement) {
	                        if (r.id) {
	                            target.setAttribute(ATTR_NAME, r.id);
	                        }
	                        return r;
	                    } else {
	                        // Create container Element:
	                        var element = doc.createElement('div');
	                        element.className = CLS_DROPDOWN;
	                        element.innerHTML = r;
	                        element.id = _utilUtil2['default'].guid();
	                        // Cache target for later use:
	                        target.setAttribute(ATTR_NAME, element.id);
	                        this.container.appendChild(element);
	                        return element;
	                    }
	                }).then(function (r) {
	                    target.isLoading = false;
	                    target.classList.remove(STATE_LOADING);
	                    return r;
	                });
	            } else {
	                if (!dropdownContainerElement) {
	                    throw 'Could not found Dropdown container with ID "' + data + '"';
	                }
	                future = new _Promise(function (r) {
	                    r(dropdownContainerElement);
	                });
	            }
	
	            future.then((function (dropdownContent) {
	                if (this.currentOpen) {
	                    this.close();
	                }
	                // Skip one frame to show animation
	                target.dropdownContent = dropdownContent;
	                var isAbsolute = global.getComputedStyle(dropdownContent).position === 'absolute';
	
	                if (!target.flexCollisionContainer) {
	                    var collisionC = target.getAttribute(ATTR_CC);
	                    target.flexCollisionContainer = collisionC ? doc.getElementById(collisionC) || document.documentElement : document.documentElement;
	                }
	
	                dropdownContent.classList.toggle(CLS_OPEN);
	                if (dropdownContent.classList.contains(CLS_OPEN)) {
	                    this.currentOpen = dropdownContent;
	                    this.currentTarget = target;
	                }
	                if (isAbsolute) {
	                    // Check collision:
	                    var selfTarget = target.getAttribute(ATTR_DATA_TARGET);
	                    selfTarget = selfTarget ? doc.getElementById(selfTarget) : target;
	                    _utilUtil2['default'].setupPositionNearby(selfTarget, dropdownContent, target.flexCollisionContainer);
	                } else {
	                    this.container.classList.add(_utilSettings2['default'].get().canvasToggledClass);
	                    // optionally get custom darkener container for target
	                    var d = target.getAttribute(ATTR_DARKENER);
	                    if (d) {
	                        dropdownContent.flexDarkenerInstance = doc.getElementById(d);
	                        (dropdownContent.flexDarkenerInstance || this.darkener).classList.toggle(DARKENER_INIT);
	                    } else {
	                        this.darkener.classList.toggle(DARKENER_INIT);
	                    }
	
	                    this.toggleDarkenerToggler(dropdownContent.flexDarkenerInstance || this.darkener, true);
	
	                    dropdownContent.style.left = '0';
	                    dropdownContent.style.top = 'auto';
	                }
	            }).bind(this));
	        }
	    }]);
	
	    return Dropdown;
	})();
	
	exports['default'] = Dropdown;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 125 */
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
	
	var _createClass = __webpack_require__(29)['default'];
	
	var _classCallCheck = __webpack_require__(32)['default'];
	
	var _Object$assign = __webpack_require__(66)['default'];
	
	var _Promise = __webpack_require__(91)['default'];
	
	var _interopRequireDefault = __webpack_require__(2)['default'];
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _Modal = __webpack_require__(120);
	
	var _Modal2 = _interopRequireDefault(_Modal);
	
	var _utilSettings = __webpack_require__(117);
	
	var _utilSettings2 = _interopRequireDefault(_utilSettings);
	
	var _Widget = __webpack_require__(121);
	
	var _Widget2 = _interopRequireDefault(_Widget);
	
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
	
	        _Object$assign(this.options, options);
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
	
	            this._delegateContainer.addEventListener(_utilSettings2['default'].getTabEvent(), function (e) {
	                var target = e.target,
	                    parent = target.parentNode,
	                    validTarget = target.hasAttribute(_this._attributeSelector),
	                    parentIsValid = parent && parent.hasAttribute(_this._attributeSelector);
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
	            return new _Promise(function (_, reject) {
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
	            var target = this.target,
	                hasPrev = this.getPrev(target),
	                hasNext = this.getNext(target),
	                hasPrevClass = CLS_HAS_PREV,
	                hasNextClass = CLS_HAS_NEXT;
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
	            if (_utilSettings2['default'].isIE()) {
	                setTimeout((function () {
	                    this._imageContainer.style.height = img.offsetHeight + 'px';
	                }).bind(this), 0);
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
	            var _this2 = this;
	
	            var self = this,
	                img = this.img;
	            this._isLoading = true;
	            self._nextFuture = new _Promise((function (resolve, reject) {
	                // notify observers about image switching
	                self.options.onSwitchImage.apply(self, [self._nextFuture]);
	                if (next) {
	                    var nextThumb = next.hasAttribute(ATTR_NO_THUMBNAIL) ? next : next.children[0] || next,
	                        nextHighRes = next.getAttribute(ATTR_DATA_HREF) || next.getAttribute(ATTR_HREF),
	                        nextSource = nextThumb.getAttribute(ATTR_SRC) || nextThumb.src || nextHighRes,
	                        nextImgObject = new Image();
	
	                    if (!nextSource) {
	                        reject(next);
	                        return;
	                    }
	                    // set new target to next element
	                    _this2.target = next;
	                    nextImgObject.src = nextSource;
	                    self._imageContainer.classList.add(CLS_LOADING);
	                    nextImgObject.addEventListener('load', (function () {
	                        img.src = nextSource;
	                        self._imageContainer.style.backgroundImage = 'url(' + nextSource + ')';
	                        LightBox._setupMaxWidthHeight(next, img, nextImgObject);
	                        self._calculateContainer(img);
	                        self.highRes(nextThumb, nextHighRes);
	                        self._setupPrevNextStates();
	                        self._imageContainer.classList.remove(CLS_LOADING);
	                        this._isLoading = false;
	                        resolve(nextSource, this.target);
	                    }).bind(_this2));
	                } else {
	                    reject(_this2);
	                }
	            }).bind(this));
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
	
	            if (thisImgHighResolution && thisThumbnail.src !== thisImgHighResolution) {
	                var highImageObj = new Image();
	                highImageObj.src = thisImgHighResolution;
	                highImageObj.addEventListener('load', (function () {
	                    // if current image is still available
	                    if (this._getSrc(thisThumbnail) === this.img.src) {
	                        this.img.src = thisImgHighResolution;
	                        this._imageContainer.style.backgroundImage = 'url(' + thisImgHighResolution + ')';
	                    }
	                }).bind(this));
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
	            var self = this;
	
	            if (!target) {
	                return false;
	            }
	
	            this.target = target;
	
	            // if lightBox is open, we just switch to the new target image
	            if (this._isOpen && target) {
	                return this.switchImage(target).then((function () {
	                    return this;
	                }).bind(this));
	            }
	
	            this._isOpen = true;
	
	            /**
	             * Setup Widget for modal
	             * @type {Widget}
	             */
	            this._widget = new _Widget2['default']().setAsync((function () {
	                var _this3 = this;
	
	                // thumbnail is either target itself or expected to be first childNode
	                var thumbnail = target.hasAttribute(ATTR_NO_THUMBNAIL) ? target : target.children[0] || target;
	
	                var imgHighResolution = target.getAttribute(ATTR_DATA_HREF) || target.getAttribute(ATTR_HREF),
	                    imgSrc = this._getSrc(thumbnail) || imgHighResolution;
	
	                var imageObj = new Image();
	                imageObj.src = imgSrc;
	                this._imageContainer = document.createElement('div');
	                this._modalContainerDiv = document.createElement('div');
	                this._closerContainerDiv = document.createElement('i');
	                this._contentContainer = document.createElement('div');
	
	                this._closerContainerDiv.className = 'modal-close modal-close-lightbox icon-cancel-1';
	                this._closerContainerDiv.setAttribute(ATTR_CLOSE, ATTR_CLOSE);
	
	                this._modalContainerDiv.className = 'modal image-modal';
	                this._modalContainerDiv.appendChild(this._imageContainer);
	                this._modalContainerDiv.appendChild(this._contentContainer);
	                this._modalContainerDiv.appendChild(this._closerContainerDiv);
	                this._contentContainer.className = 'content-container';
	                this._isLoading = true;
	                this._future = new _Promise((function (resolve) {
	                    imageObj.addEventListener('load', (function () {
	                        this._imageContainer.className = 'image-container';
	                        var img = document.createElement('img');
	                        // current image
	                        this.img = img;
	
	                        img.src = imgSrc;
	                        LightBox._setupMaxWidthHeight(target, img, imageObj);
	                        this._imageContainer.appendChild(img);
	                        this._imageContainer.style.backgroundImage = 'url(' + imgSrc + ')';
	
	                        resolve(self._modalContainerDiv);
	                        this._isLoading = false;
	
	                        if (_utilSettings2['default'].isIE()) {
	                            self._resizeEvent = global.addEventListener('resize', function () {
	                                setTimeout(function () {
	                                    self._imageContainer.style.height = img.offsetHeight + 'px';
	                                }, 0);
	                            });
	                        }
	
	                        if (self.options.registerPrevNextEvents) {
	                            self._setupPrevNextStates();
	                            // prev or next on touch/click
	                            self._imageContainer.addEventListener(_utilSettings2['default'].getTabEvent(), function (e) {
	                                if (self.isLoading()) {
	                                    return;
	                                }
	                                e.preventDefault();
	
	                                var ev = e;
	                                var pageX = global.TouchEvent && ev instanceof TouchEvent ? ev.changedTouches[0].pageX : ev.pageX;
	                                var rect = self._imageContainer.getBoundingClientRect(),
	                                    imgX = rect.left,
	                                    wrapperWidth = rect.width,
	                                    posX = pageX - imgX;
	
	                                self.switchImageByDirection(wrapperWidth / 2 > posX)['catch'](function () {
	                                    self._runOptionalClose();
	                                });
	                            });
	
	                            // register keyboard events
	                            self._keyboardNextEvent = function (e) {
	                                if (e.keyCode === KEY_NEXT || e.keyCode === KEY_PREV) {
	                                    if (self.isLoading()) {
	                                        return;
	                                    }
	                                    self.switchImageByDirection(e.keyCode === KEY_PREV)['catch'](function () {
	                                        self._runOptionalClose();
	                                    });
	                                }
	                            };
	                            global.addEventListener('keydown', self._keyboardNextEvent);
	                        } else {
	                            self._imageContainer.addEventListener(_utilSettings2['default'].getTabEvent(), function () {
	                                self._runOptionalClose();
	                            });
	                        }
	
	                        self.highRes(thumbnail, imgHighResolution);
	                    }).bind(_this3));
	                }).bind(this));
	                this._future.then((function () {
	                    self._calculateContainer(this.img);
	                }).bind(this));
	                self._modalContainerDiv.addEventListener(_Modal.EVENT_MODAL_CLOSED, (function () {
	                    // cleanup:
	                    this._modalContainerDiv.parentNode.removeChild(this._modalContainerDiv);
	                    this.options.onClose.apply(self);
	                    this._isOpen = false;
	                    this.modal.destroy();
	                    // unbind events
	                    if (this._keyboardNextEvent) {
	                        global.removeEventListener('keydown', self._keyboardNextEvent);
	                    }
	                    if (this._resizeEvent) {
	                        global.removeEventListener('resize', self._resizeEvent);
	                    }
	                }).bind(this));
	
	                return this._future;
	            }).bind(this));
	
	            this._nextFuture = this._future;
	
	            if (self._widget) {
	                this.modal = new _Modal2['default'](this._modalAppend);
	                // make sure we close stack before
	                return this.modal.close().fromWidget(self._widget).then(function () {
	                    return self._future.then(function () {
	                        return self;
	                    });
	                });
	            } else {
	                return false;
	            }
	        }
	    }], [{
	        key: '_setupMaxWidthHeight',
	        value: function _setupMaxWidthHeight(target, img, loadedImage) {
	            var nextMaxWidth = target.getAttribute(ATTR_MAX_WIDTH),
	                nextMaxHeight = target.getAttribute(ATTR_MAX_HEIGHT);
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
	
	exports['default'] = LightBox;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
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
	
	var _get = __webpack_require__(4)['default'];
	
	var _inherits = __webpack_require__(18)['default'];
	
	var _createClass = __webpack_require__(29)['default'];
	
	var _classCallCheck = __webpack_require__(32)['default'];
	
	var _interopRequireDefault = __webpack_require__(2)['default'];
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _DestroyableWidget2 = __webpack_require__(115);
	
	var _DestroyableWidget3 = _interopRequireDefault(_DestroyableWidget2);
	
	var Showcase = (function (_DestroyableWidget) {
	    _inherits(Showcase, _DestroyableWidget);
	
	    function Showcase(container) {
	        _classCallCheck(this, Showcase);
	
	        _get(Object.getPrototypeOf(Showcase.prototype), 'constructor', this).call(this);
	
	        this.container = container;
	
	        this.registerEvents();
	    }
	
	    _createClass(Showcase, [{
	        key: 'registerEvents',
	        value: function registerEvents() {
	            var _this = this;
	
	            var innerContainer = this.container.children[0],
	                containerWidth = innerContainer.getBoundingClientRect().width,
	                parentContainerWidth = this.container.getBoundingClientRect().width;
	            var diff = containerWidth - parentContainerWidth;
	
	            var lastX = 0,
	                lastMove = undefined;
	
	            this.container.addEventListener('mouseenter', function (e) {
	                var rect = _this.container.getBoundingClientRect();
	
	                lastX = e.clientX;
	            });
	
	            this.container.addEventListener('mousemove', function (e) {
	                var rect = _this.container.getBoundingClientRect();
	                var nextX = e.clientX;
	                var normalizedRight = Math.abs(nextX - rect.left) / (rect.width / 2);
	                requestAnimationFrame(function () {
	                    var moveX = (1 - normalizedRight) * diff;
	                    innerContainer.style.webkitTransform = 'translate3d(' + moveX + 'px,0,0)';
	                    innerContainer.style.transform = 'translate3d(' + moveX + 'px,0,0)';
	                    lastMove = moveX;
	                });
	            });
	        }
	    }], [{
	        key: 'init',
	        value: function init(selector) {
	            var elements = document.querySelectorAll(selector);
	            return Array.prototype.slice.call(elements).map(function (el) {
	                return new Showcase(el);
	            });
	        }
	    }]);
	
	    return Showcase;
	})(_DestroyableWidget3['default']);
	
	exports['default'] = Showcase;
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;
//# sourceMappingURL=site.map