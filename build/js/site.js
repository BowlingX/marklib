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

	module.exports = __webpack_require__(36);


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
	
	exports['default'] = {
	    Rendering: _Rendering2['default'],
	    Util: _utilUtil2['default']
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

	/* WEBPACK VAR INJECTION */(function(global) {/* global Node, MARKLIB_EVENTS */
	
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
	
	var _wolfy87Eventemitter = __webpack_require__(35);
	
	var _wolfy87Eventemitter2 = _interopRequireDefault(_wolfy87Eventemitter);
	
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
	 * Manages a single Render
	 */
	
	var Rendering = (function (_EventEmitter) {
	    _inherits(Rendering, _EventEmitter);
	
	    /**
	     * @param {Document} document
	     * @param {String|Array} cssClasses
	     * @param {Node} context
	     */
	
	    function Rendering(document, cssClasses, context) {
	        _classCallCheck(this, Rendering);
	
	        _get(Object.getPrototypeOf(Rendering.prototype), 'constructor', this).call(this);
	
	        /**
	         * @type {Document}
	         */
	        this.document = document;
	
	        /**
	         * ID of rendering, will be set on each element that is part of it
	         * @type {String}
	         */
	        this.id = _utilUtil2['default'].guid();
	
	        /**
	         * Class that is set on all highlight nodes
	         * @type {Array}
	         */
	        this.cssClass = ['marking'];
	
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
	
	        /**
	         * A collection of all nodes that are part of this marking
	         * @type {Array}
	         * @private
	         */
	        this._wrapperNodes = [];
	
	        /**
	         * @type {Function}
	         * @private
	         */
	        this._onWrappedNodeFunc = null;
	
	        if (cssClasses instanceof Array) {
	            this.cssClass = cssClasses;
	        } else if (typeof cssClasses === 'string') {
	            this.cssClass = cssClasses.split(' ');
	        }
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
	            this.id = id;
	            return this;
	        }
	
	        /**
	         * Creates a Template used as a wrapper and an indication that this is a highlight node
	         * @returns {Node}
	         * @private
	         */
	    }, {
	        key: '_createWrapTemplate',
	        value: function _createWrapTemplate() {
	            var el = this.document.createElement(TAG_NAME),
	                vTrue = "true";
	            el.className = this.cssClass.join(' ');
	            el.setAttribute(_utilUtil.DATA_IS_SELECTION, vTrue);
	            el.setAttribute(ATTR_DATA_ID, this.getId());
	            el.setAttribute(ATTR_DATA_IS_HIGHLIGHT_NODE, vTrue);
	            // save this marker instance to given node
	            el.marklibInstance = this;
	            // keep track of highlight nodes
	            this._wrapperNodes.push(el);
	
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
	         * @param {Node} el
	         * @param [optionalLength]
	         * @param [optionalIndex]
	         * @param [optionalIsSameNode]
	         * @returns {Node}
	         * @private
	         */
	    }, {
	        key: '_createWrap',
	        value: function _createWrap(el, optionalLength, optionalIndex, optionalIsSameNode) {
	            var originalIndex = optionalIndex >= 0 ? optionalIndex : _utilUtil2['default'].calcIndex(el);
	            var wrapper = this._createWrapTemplate();
	            wrapper.setAttribute(_utilUtil.ATTR_DATA_ORIGINAL_INDEX, _utilUtil2['default'].getIndexParentIfHas(el, originalIndex));
	            var offsetLength = optionalLength >= 0 ? optionalLength : _utilUtil2['default'].getOffsetParentIfHas(el);
	            wrapper.setAttribute(ATTR_DATA_ORIGINAL_OFFSET_START, offsetLength);
	
	            // Save a reference to original text node in wrapper
	            wrapper.setAttribute(DATA_ORIGINAL_TEXT_NODE_INDEX, originalIndex);
	
	            if (optionalIsSameNode) {
	                wrapper.setAttribute(ATTR_DATA_START_END, ATTR_DATA_START_END);
	            }
	            var wrap = _utilUtil2['default'].wrap(el, wrapper);
	
	            this.emit('wrapped-node', el, wrap);
	
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
	            var _this = this;
	
	            var next = start,
	                found = false;
	
	            // Capsule some logic
	            var wrap = (function (n) {
	                if (n.parentNode.hasAttribute(ATTR_DATA_START_END) && n.parentNode.hasAttribute(ATTR_DATA_IS_HIGHLIGHT_NODE) && n.parentNode.getAttribute(ATTR_DATA_ID) === _this.getId()) {
	                    (function () {
	                        var thisNode = _this._createWrap(n).parentNode;
	                        _this.cssClass.forEach(function (cssClass) {
	                            thisNode.classList.remove(cssClass);
	                        });
	                        thisNode.removeAttribute(ATTR_DATA_IS_HIGHLIGHT_NODE);
	                    })();
	                } else {
	                    _this._createWrap(n);
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
	
	            var result = new _RenderResult2['default'](
	            // Real offset is calculated by relative length and absolute length
	            originalStartOffset + startOffset, originalEndOffset + endOffset,
	            // get the path for this selection
	            _utilUtil2['default'].getPath(startContainer, this.context), _utilUtil2['default'].getPath(endContainer, this.context));
	
	            result.instance = this;
	
	            this._renderSelection(startContainer, endContainer, startOffset, endOffset, contextContainer, !!outer);
	
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
	                if (!outer) {
	                    this.wrapSiblings(result.startT.nextSibling, endContainer);
	                } else {
	                    this.walk(result.startT, endContainer, contextContainer);
	                }
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
	                this.renderWithRange(range);
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
	            return this._renderWithElements(range.startContainer, range.endContainer, range.commonAncestorContainer, range.startOffset, range.endOffset);
	        }
	
	        /**
	         * Removes bindings to nodes
	         */
	    }, {
	        key: 'destroy',
	        value: function destroy() {
	            this._wrapperNodes.forEach(function (node) {
	                delete node.marklibInstance;
	                node.className = '';
	            });
	        }
	    }, {
	        key: 'result',
	        get: function get() {
	            return this._renderResult;
	        }
	    }]);
	
	    return Rendering;
	})(_wolfy87Eventemitter2['default']);
	
	if (!global.MARKLIB_EVENTS) {
	    global.MARKLIB_EVENTS = true;
	
	    global.addEventListener('click', function (e) {
	        if (e.target && e.target.hasAttribute(ATTR_DATA_IS_HIGHLIGHT_NODE)) {
	            if (e.target.marklibInstance && e.target.marklibInstance instanceof Rendering) {
	                var instance = e.target.marklibInstance;
	                instance.emit('hover', e);
	            }
	        }
	    }, true);
	}
	
	exports['default'] = Rendering;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

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
	         * @param {HTMLElement} el
	         * @param {String} [optionalSelector] will test given element against a selector
	         *  if matches, returns this element immediately
	         *
	         * @return {Array.<HTMLElement>} an array of all found parents of given element (and optional selector)
	         */
	    }, {
	        key: 'parents',
	        value: function parents(el, optionalSelector) {
	            var element = el;
	            var foundElements = [];
	            while (element.parentNode !== null) {
	                element = element.parentNode;
	                if (optionalSelector && (element === optionalSelector || typeof optionalSelector === 'string' && element.matches && element.matches(optionalSelector))) {
	                    foundElements.push(element);
	                } else if (!optionalSelector) {
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
	            var element = el;
	            while (element !== null) {
	                if (element.matches && element.matches(selector)) {
	                    return element;
	                }
	                element = element.parentNode;
	            }
	            return false;
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
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/* global localStorage */
	
	var _interopRequireDefault = __webpack_require__(2)['default'];
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _modulesMarklib = __webpack_require__(1);
	
	var _modulesMarklib2 = _interopRequireDefault(_modulesMarklib);
	
	var KEY_ENTER = 13;
	
	/**
	 * Contains Module for the demonstration
	 */
	
	document.addEventListener("DOMContentLoaded", function () {
	    var STORAGE_KEY = 'savedRanges';
	
	    /**
	     * Creates an animated rendering
	     */
	    function presentRendering(selector, classNames, speed) {
	        var text = document.getElementById(selector).childNodes[0];
	        var thisLength = text.length;
	
	        var render = function render(autoMarkText, c, length) {
	            var r = new _modulesMarklib2['default'].Rendering(document, classNames);
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
	
	    savedRanges.forEach(function (range) {
	        var marker = new _modulesMarklib2['default'].Rendering(document);
	        try {
	            marker.renderWithResult(range);
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
	            selection.removeAllRanges();
	            console.info("stored:", result);
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
	
	exports['default'] = _modulesMarklib2['default'];
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;
//# sourceMappingURL=site.map