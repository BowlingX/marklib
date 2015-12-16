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

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _Rendering = __webpack_require__(2);
	
	var _Rendering2 = _interopRequireDefault(_Rendering);
	
	var _Util = __webpack_require__(3);
	
	var _Util2 = _interopRequireDefault(_Util);
	
	var _RenderResult = __webpack_require__(4);
	
	var _RenderResult2 = _interopRequireDefault(_RenderResult);
	
	var _RenderingEvents = __webpack_require__(5);
	
	var _RenderingEvents2 = _interopRequireDefault(_RenderingEvents);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	    Rendering: _Rendering2.default,
	    Util: _Util2.default,
	    RenderResult: _RenderResult2.default,
	    RenderingEvents: _RenderingEvents2.default
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.EVENT_WRAPPED_NODE = exports.ATTR_DATA_ORIGINAL_OFFSET_START = undefined;
	
	var _Util = __webpack_require__(3);
	
	var _Util2 = _interopRequireDefault(_Util);
	
	var _RenderResult = __webpack_require__(4);
	
	var _RenderResult2 = _interopRequireDefault(_RenderResult);
	
	var _RenderingEvents2 = __webpack_require__(5);
	
	var _RenderingEvents3 = _interopRequireDefault(_RenderingEvents2);
	
	var _Util3 = __webpack_require__(3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* global Node */
	
	/**
	 * @type {string}
	 */
	var TAG_NAME = 'x-marker';
	/**
	 * @type {string}
	 */
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
	    _inherits(Rendering, _RenderingEvents);
	
	    /**
	     * @param {Document} document
	     * @param {object} options
	     * @param {Node} context
	     */
	
	    function Rendering(document, options, context) {
	        _classCallCheck(this, Rendering);
	
	        /**
	         * ID of rendering, will be set on each element that is part of it
	         * @type {String}
	         */
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Rendering).call(this, options, document));
	
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
	            el.setAttribute(_Util3.DATA_IS_SELECTION, vTrue);
	
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
	            wrapper.setAttribute(_Util3.ATTR_DATA_ORIGINAL_INDEX, _Util2.default.getIndexParentIfHas(initialNode, index));
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
	            wrapper.setAttribute(_Util3.ATTR_DATA_ORIGINAL_INDEX, _Util2.default.getIndexParentIfHas(el, originalIndex));
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
	            wrapper.setAttribute(_Util3.DATA_IS_SELECTION, 'true');
	            wrapper.setAttribute(_Util3.ATTR_DATA_ORIGINAL_INDEX, _Util2.default.getIndexParentIfHas(originalElement, index));
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
	                var endContainerContents = _Util2.default.closest(toFindNode, ':not([' + _Util3.DATA_IS_SELECTION + '])').childNodes;
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

	/* global Node, NodeList, Element */
	
	'use strict';
	
	/**
	 * @type {string}
	 */
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.DATA_IS_SELECTION = exports.ATTR_DATA_ORIGINAL_INDEX = undefined;
	
	var _Rendering = __webpack_require__(2);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
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
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * A Render Result
	 */
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
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
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* global Set */
	
	'use strict';
	
	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.EVENT_PART_TREE_LEAVE = exports.EVENT_PART_TREE_ENTER = exports.EVENT_MOUSELEAVE = exports.EVENT_MOUSEENTER = exports.EVENT_CLICK = undefined;
	
	var _wolfy87Eventemitter = __webpack_require__(6);
	
	var _wolfy87Eventemitter2 = _interopRequireDefault(_wolfy87Eventemitter);
	
	var _Rendering = __webpack_require__(2);
	
	var _Rendering2 = _interopRequireDefault(_Rendering);
	
	var _Util = __webpack_require__(3);
	
	var _Util2 = _interopRequireDefault(_Util);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
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
	    _inherits(RenderingEvents, _EventEmitter);
	
	    /**
	     * @param {Object} options
	     * @param {Document} document
	     */
	
	    function RenderingEvents(options, document) {
	        _classCallCheck(this, RenderingEvents);
	
	        /**
	         * Options
	         * @type {Object}
	         */
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RenderingEvents).call(this));
	
	        _this.options = {
	            hoverClass: 'marklib--hover',
	            treeClass: 'marklib--tree',
	            className: ['marking']
	        };
	
	        _this.options = Object.assign(_this.options, options || {});
	
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
	
	    _createClass(RenderingEvents, [{
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
	                    var currentHoverInstances = new Set();
	                    var betweenInstances = new Set();
	
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
	                        if ((typeof closest === 'undefined' ? 'undefined' : _typeof(closest)) === 'object') {
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
/* 6 */
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


/***/ }
/******/ ])
});
;
//# sourceMappingURL=marklib.map