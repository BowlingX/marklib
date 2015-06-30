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

	module.exports = __webpack_require__(1);


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
	
	var _utilUtil = __webpack_require__(10);
	
	var _utilUtil2 = _interopRequireDefault(_utilUtil);
	
	exports['default'] = {
	    Rendering: _Rendering2['default'],
	    Util: _utilUtil2['default']
	};
	module.exports = exports['default'];
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9ib3dsaW5neC9Qcm9qZWt0ZS9tYXJrbGliL25vZGVfbW9kdWxlcy9lc2xpbnQtbG9hZGVyL2luZGV4LmpzIS9Vc2Vycy9ib3dsaW5neC9Qcm9qZWt0ZS9tYXJrbGliL3NyYy9tYWluL21vZHVsZXMvTWFya2xpYi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7Ozs7Ozs7O3lCQUVTLFdBQVc7Ozs7d0JBQ2hCLFdBQVc7Ozs7cUJBRWI7QUFDWCxhQUFTLHdCQUFXO0FBQ3BCLFFBQUksdUJBQU07Q0FDYiIsImZpbGUiOiIvVXNlcnMvYm93bGluZ3gvUHJvamVrdGUvbWFya2xpYi9ub2RlX21vZHVsZXMvZXNsaW50LWxvYWRlci9pbmRleC5qcyEvVXNlcnMvYm93bGluZ3gvUHJvamVrdGUvbWFya2xpYi9zcmMvbWFpbi9tb2R1bGVzL01hcmtsaWIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBSZW5kZXJpbmcgZnJvbSAnUmVuZGVyaW5nJztcbmltcG9ydCBVdGlsIGZyb20gJ3V0aWwvVXRpbCc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBSZW5kZXJpbmc6IFJlbmRlcmluZyxcbiAgICBVdGlsOiBVdGlsXG59O1xuIl19

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

	/* global Node, Document */
	
	'use strict';
	
	var _createClass = __webpack_require__(4)['default'];
	
	var _classCallCheck = __webpack_require__(9)['default'];
	
	var _interopRequireDefault = __webpack_require__(2)['default'];
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _utilUtil = __webpack_require__(10);
	
	var _utilUtil2 = _interopRequireDefault(_utilUtil);
	
	/**
	 * @type {string}
	 */
	var TAG_NAME = 'x-marker';
	/**
	 * @type {string}
	 */
	var ATTR_DATA_ORIGINAL_OFFSET_START = 'data-original-offset-start';
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
	
	var Rendering = (function () {
	    function Rendering(document, cssClass, context) {
	        _classCallCheck(this, Rendering);
	
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
	        this.id = _utilUtil2['default'].guid();
	
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
	
	    _createClass(Rendering, [{
	        key: 'getId',
	
	        /**
	         * @returns {string} id of this rendering
	         */
	        value: function getId() {
	            return this.id;
	        }
	    }, {
	        key: 'setId',
	
	        /**
	         * @param {string} id
	         * @returns {Rendering}
	         */
	        value: function setId(id) {
	            this.id = id;
	            return this;
	        }
	    }, {
	        key: 'onWrappedNode',
	
	        /**
	         * Listener that is called when a node is wrapped on this instance
	         * @param {Function} f
	         * @returns {Rendering}
	         */
	        value: function onWrappedNode(f) {
	            this._onWrappedNodeFunc = f;
	            return this;
	        }
	    }, {
	        key: '_callOnWrappedNode',
	
	        /**
	         * @private
	         */
	        value: function _callOnWrappedNode() {
	            if (typeof this._onWrappedNodeFunc === 'function') {
	                this._onWrappedNodeFunc.apply(this, arguments);
	            }
	        }
	    }, {
	        key: '_createWrapTemplate',
	
	        /**
	         * Creates a Template used as a wrapper
	         * @returns {Node}
	         * @private
	         */
	        value: function _createWrapTemplate() {
	            var el = this.document.createElement(TAG_NAME),
	                vTrue = 'true';
	            el.className = this.cssClass;
	            el.setAttribute(_utilUtil.DATA_IS_SELECTION, vTrue);
	            el.setAttribute(ATTR_DATA_ID, this.getId());
	            el.setAttribute(ATTR_DATA_IS_HIGHLIGHT_NODE, vTrue);
	
	            return el;
	        }
	    }, {
	        key: '_createStartEndWrapTemplate',
	
	        /**
	         * Creates a Template to use as start and end marks
	         * @param {String} text
	         * @returns {Node}
	         * @private
	         */
	        value: function _createStartEndWrapTemplate(text) {
	            var el = this._createWrapTemplate(),
	                vTrue = 'true';
	            el.setAttribute(ATTR_DATA_START_END, vTrue);
	            el.textContent = text;
	            return el;
	        }
	    }, {
	        key: '_createStartOrEndContainer',
	
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
	            var wrapper = this._createStartEndWrapTemplate(text);
	            wrapper.setAttribute(_utilUtil.ATTR_DATA_ORIGINAL_INDEX, Rendering._getIndexParentIfHas(initialNode, index));
	            wrapper.setAttribute(ATTR_DATA_ORIGINAL_OFFSET_START, offset);
	            wrapper.setAttribute(DATA_ORIGINAL_TEXT_NODE_INDEX, index);
	            wrapper.marklibInstance = this;
	            return wrapper;
	        }
	    }, {
	        key: '_createWrap',
	
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
	            var originalIndex = optionalIndex >= 0 ? optionalIndex : _utilUtil2['default'].calcIndex(el);
	            var wrapper = this._createWrapTemplate();
	            wrapper.setAttribute(_utilUtil.ATTR_DATA_ORIGINAL_INDEX, Rendering._getIndexParentIfHas(el, originalIndex));
	            var offsetLength = optionalLength >= 0 ? optionalLength : Rendering._getOffsetParentIfHas(el);
	            wrapper.setAttribute(ATTR_DATA_ORIGINAL_OFFSET_START, offsetLength);
	
	            // Save a reference to original text node in wrapper
	            wrapper.setAttribute(DATA_ORIGINAL_TEXT_NODE_INDEX, originalIndex);
	
	            // save this marker instance to given node
	            wrapper.marklibInstance = this;
	
	            if (optionalIsSameNode) {
	                wrapper.setAttribute(ATTR_DATA_START_END, ATTR_DATA_START_END);
	            }
	            var wrap = _utilUtil2['default'].wrap(el, wrapper);
	            this._callOnWrappedNode(el, wrap);
	            return wrap;
	        }
	    }, {
	        key: '_createSplitContainer',
	
	        /**
	         * Create split container element
	         * @param originalElement {Node} original text node element that is created a wrapper for
	         * @param index
	         * @param offset
	         * @returns {*|jQuery|Node}
	         */
	        value: function _createSplitContainer(originalElement, index, offset) {
	            var wrapper = this.document.createElement(TAG_NAME),
	                vTrue = 'true';
	            wrapper.setAttribute(_utilUtil.DATA_IS_SELECTION, vTrue);
	            wrapper.setAttribute(_utilUtil.ATTR_DATA_ORIGINAL_INDEX, Rendering._getIndexParentIfHas(originalElement, index));
	            wrapper.setAttribute(ATTR_DATA_ORIGINAL_OFFSET_START, offset);
	            wrapper.setAttribute(DATA_ORIGINAL_TEXT_NODE_INDEX, index);
	            return wrapper;
	        }
	    }, {
	        key: '_walkTextNodes',
	
	        /**
	         * Extracts all TextNodes inside a container
	         * @param {Node} el
	         * @returns {Array.<Text>}
	         */
	        value: function _walkTextNodes(el, func) {
	            this.walkDom(el, function (node) {
	                if (Node.TEXT_NODE === node.nodeType && !_utilUtil2['default'].nodeIsEmpty(node)) {
	                    func(node);
	                }
	                return true;
	            });
	        }
	    }, {
	        key: 'walk',
	
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
	    }, {
	        key: 'wrapSiblings',
	
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
	
	            var next = start,
	                found = false;
	
	            // Capsule some logic
	            var wrap = (function (n) {
	                if (n.parentNode.hasAttribute(ATTR_DATA_START_END) && n.parentNode.hasAttribute(ATTR_DATA_IS_HIGHLIGHT_NODE) && n.parentNode.getAttribute(ATTR_DATA_ID) === _this.getId()) {
	                    var thisNode = _this._createWrap(n).parentNode;
	                    thisNode.classList.remove(_this.cssClass);
	                    thisNode.removeAttribute(ATTR_DATA_IS_HIGHLIGHT_NODE);
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
	    }, {
	        key: 'walkDom',
	
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
	    }, {
	        key: '_markTextSameNode',
	
	        /**
	         * Marks text of the same node
	         * @param {Node} textNode
	         * @param {int} startIndex
	         * @param {int} endIndex
	         * @private
	         */
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
	                _utilUtil2['default'].wrap(textNode.previousSibling, this._createSplitContainer(textNode, initialIndex, Rendering._getOffsetParentIfHas(textNode)));
	            }
	            //If there is an unmarked part at the end of the text node,
	            //cut off that part and put it into it's own textnode.
	            if (endIndex < initialText.length) {
	                var textAfter = initialText.slice(endIndex, initialText.length);
	                textNode.parentNode.insertBefore(this.document.createTextNode(textAfter), textNode.nextSibling);
	                _utilUtil2['default'].wrap(textNode.nextSibling, this._createSplitContainer(textNode, initialIndex, Rendering._getOffsetParentIfHas(textNode) + endIndex));
	            }
	
	            //Cutoff the unmarked parts and wrap the textnode into a span.
	            textNode.nodeValue = initialText.slice(startIndex, endIndex);
	            this.startContainer = this._createWrap(textNode, Rendering._getOffsetParentIfHas(textNode) + startIndex, initialIndex, true).parentNode;
	            this.endContainer = this.startContainer;
	            return this.startContainer;
	        }
	    }, {
	        key: '_markTextDifferentNode',
	
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
	
	                var offsetStart = Rendering._getOffsetParentIfHas(startContainer);
	                // Create a new node for splitted text, offset is the length of new startContainer.nodeValue:
	                startT = this._createStartOrEndContainer(startContainer, this.markerPrefix, partTextStartValue, offsetStart === startOffset ? offsetStart : offsetStart + startOffset, startContainerIndex);
	                // Append this node after startContainer
	                startContainer.parentNode.insertBefore(startT, startContainer.nextSibling);
	                this.startContainer = startT;
	
	                if (startContainer.nodeValue) {
	                    // Wrap start container in detection node, offset is always 0 or parent offset.
	                    _utilUtil2['default'].wrap(startContainer, this._createSplitContainer(startContainer, startContainerIndex, Rendering._getOffsetParentIfHas(startContainer)));
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
	                _utilUtil2['default'].wrap(endContainer, this._createSplitContainer(endContainer, endContainerIndex, offsetParent === endOffset ? offsetParent : offsetParent + endOffset));
	            }
	
	            return { startT: startT, endT: endT };
	        }
	    }, {
	        key: '_findOriginalOffset',
	
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
	            var lengthElement = _utilUtil2['default'].parent(element, '[' + ATTR_DATA_ORIGINAL_OFFSET_START + ']');
	            return lengthElement ? parseInt(lengthElement.getAttribute(ATTR_DATA_ORIGINAL_OFFSET_START)) : 0;
	        }
	    }, {
	        key: '_renderWithElements',
	
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
	        value: function _renderWithElements(startContainer, endContainer, commonAncestor, startOffset, endOffset, withoutResult) {
	            var outer = _utilUtil2['default'].parents(startContainer, commonAncestor);
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
	
	            var result = withoutResult || {
	                // Real offset is calculated by relative length and absolute length
	                startOffset: originalStartOffset + startOffset,
	                endOffset: originalEndOffset + endOffset,
	                // get the path for this selection
	                startContainerPath: _utilUtil2['default'].getPath(startContainer, this.context),
	                endContainerPath: _utilUtil2['default'].getPath(endContainer, this.context)
	            };
	
	            this._renderSelection(startContainer, endContainer, startOffset, endOffset, contextContainer, outer);
	
	            return result;
	        }
	    }, {
	        key: '_renderSelection',
	
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
	    }, {
	        key: '_deserializePath',
	
	        /**
	         * Deserialize a specific path and finds the right textNodes
	         * This even works when DOM has been manipulated before by `marklib`
	         * @param {string} path the serialized path (including offsets)
	         * @return {Node}
	         * @private
	         */
	        value: function _deserializePath(path) {
	            var pSplit = path.split(';'),
	                p = pSplit[0],
	                objectIndex = parseInt(pSplit[1]),
	                charOffset = parseInt(pSplit[2]),
	                container = !p.trim() ? this.context : this.context.querySelector(p);
	            var maybeFoundNode = null;
	            this.walkDom(container, function (n) {
	                if (n.nodeType === Node.TEXT_NODE) {
	                    var atrOffsetStart = n.parentNode.getAttribute(ATTR_DATA_ORIGINAL_OFFSET_START);
	                    atrOffsetStart = atrOffsetStart === null ? 0 : atrOffsetStart;
	                    var atrIndex = n.parentNode.getAttribute(_utilUtil.ATTR_DATA_ORIGINAL_INDEX);
	                    atrIndex = atrIndex === null ? _utilUtil2['default'].calcIndex(n) : atrIndex;
	                    if (parseInt(atrIndex) === objectIndex && charOffset >= atrOffsetStart && parseInt(atrOffsetStart) + n.length >= charOffset) {
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
	    }, {
	        key: 'renderWithPath',
	
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
	        value: function renderWithPath(startPath, endPath) {
	            var startContainer = this._deserializePath(startPath);
	            var endContainer = this._deserializePath(endPath);
	            if (startContainer && endContainer && startContainer.node && endContainer.node) {
	                var range = document.createRange();
	                range.setStart(startContainer.node, startContainer.offset);
	                range.setEnd(endContainer.node, endContainer.offset);
	                var text = range.toString();
	                this.renderWithRange(range, true);
	                return text;
	            }
	            throw 'Could not find start- and/or end-container in document';
	        }
	    }, {
	        key: 'renderWithResult',
	
	        /**
	         * Renders a result (that returned from `renderWithRange`)
	         * @param result
	         * @returns {string}
	         */
	        value: function renderWithResult(result) {
	            return this.renderWithPath(result.startContainerPath + ';' + result.startOffset, result.endContainerPath + ';' + result.endOffset);
	        }
	    }, {
	        key: 'renderWithRange',
	
	        /**
	         * Prepares a selection with a range object
	         * @param {Range} range
	         * @param {boolean} [withoutResult] optional do calculate a result, the selection would not be serializable
	         * @returns {Object}
	         */
	        value: function renderWithRange(range, withoutResult) {
	            return this._renderWithElements(range.startContainer, range.endContainer, range.commonAncestorContainer, range.startOffset, range.endOffset, withoutResult);
	        }
	    }], [{
	        key: '_getIndexParentIfHas',
	
	        /**
	         * @param {Node} container
	         * @param {Number} thisIndex
	         * @returns {int} index of parent or original
	         * @private
	         */
	        value: function _getIndexParentIfHas(container, thisIndex) {
	            var p = container.parentNode;
	            var index = parseInt(p.getAttribute(_utilUtil.ATTR_DATA_ORIGINAL_INDEX));
	            return index > thisIndex ? index : thisIndex;
	        }
	    }, {
	        key: '_getOffsetParentIfHas',
	
	        /**
	         * @param container
	         * @returns {int} offset start of parent if has, else 0
	         */
	        value: function _getOffsetParentIfHas(container) {
	            var p = container.parentNode;
	            var offset = parseInt(p.getAttribute(ATTR_DATA_ORIGINAL_OFFSET_START));
	            return offset > 0 ? offset : 0;
	        }
	    }]);
	
	    return Rendering;
	})();
	
	exports['default'] = Rendering;
	module.exports = exports['default'];
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9ib3dsaW5neC9Qcm9qZWt0ZS9tYXJrbGliL25vZGVfbW9kdWxlcy9lc2xpbnQtbG9hZGVyL2luZGV4LmpzIS9Vc2Vycy9ib3dsaW5neC9Qcm9qZWt0ZS9tYXJrbGliL3NyYy9tYWluL1JlbmRlcmluZy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLFlBQVksQ0FBQzs7Ozs7Ozs7Ozs7O3dCQUVJLFdBQVc7Ozs7Ozs7QUFPNUIsSUFBTSxRQUFRLEdBQUcsVUFBVSxDQUFDOzs7O0FBSTVCLElBQU0sK0JBQStCLEdBQUcsNEJBQTRCLENBQUM7Ozs7QUFJckUsSUFBTSw2QkFBNkIsR0FBRywwQkFBMEIsQ0FBQzs7OztBQUlqRSxJQUFNLG1CQUFtQixHQUFHLG1CQUFtQixDQUFDOzs7O0FBSWhELElBQU0sMkJBQTJCLEdBQUcsd0JBQXdCLENBQUM7Ozs7QUFJN0QsSUFBTSxZQUFZLEdBQUcsbUJBQW1CLENBQUM7Ozs7OztBQU16QyxJQUFNLDhCQUE4QixHQUFHLEVBQUUsQ0FBQzs7SUFHcEMsU0FBUztBQUVBLGFBRlQsU0FBUyxDQUVDLFFBQVEsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFOzhCQUZ2QyxTQUFTOztBQUlQLFlBQUksRUFBRSxRQUFRLFlBQVksUUFBUSxDQUFBLEFBQUMsRUFBRTtBQUNqQyxrQkFBTSxtREFBbUQsQ0FBQztTQUM3RDs7OztBQUlELFlBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDOzs7Ozs7QUFNekIsWUFBSSxDQUFDLEVBQUUsR0FBRyxzQkFBSyxJQUFJLEVBQUUsQ0FBQzs7Ozs7O0FBTXRCLFlBQUksQ0FBQyxRQUFRLEdBQUcsU0FBUyxLQUFLLFFBQVEsR0FBRyxTQUFTLEdBQUcsUUFBUSxDQUFDOzs7Ozs7QUFNOUQsWUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7Ozs7OztBQU0zQixZQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQzs7Ozs7O0FBTXpCLFlBQUksQ0FBQyxZQUFZLEdBQUcs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QUFHLFNBQVMsQ0FBQyxVQUFVLENBQUM7QUFDN0IsZ0JBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLCtCQUErQixDQUFDLENBQUMsQ0FBQztBQUN2RSxtQkFBTyxNQUFNLEdBQUcsQ0FBQyxHQUFHLE1BQU0sR0FBRyxDQUFDLENBQUM7U0FDbEM7OztXQXBIQyxTQUFTOzs7cUJBQVQsU0FBUyIsImZpbGUiOiIvVXNlcnMvYm93bGluZ3gvUHJvamVrdGUvbWFya2xpYi9ub2RlX21vZHVsZXMvZXNsaW50LWxvYWRlci9pbmRleC5qcyEvVXNlcnMvYm93bGluZ3gvUHJvamVrdGUvbWFya2xpYi9zcmMvbWFpbi9SZW5kZXJpbmcuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBnbG9iYWwgTm9kZSwgRG9jdW1lbnQgKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgVXRpbCBmcm9tICd1dGlsL1V0aWwnO1xuXG5pbXBvcnQge0FUVFJfREFUQV9PUklHSU5BTF9JTkRFWCwgREFUQV9JU19TRUxFQ1RJT059IGZyb20gJ3V0aWwvVXRpbCc7XG5cbi8qKlxuICogQHR5cGUge3N0cmluZ31cbiAqL1xuY29uc3QgVEFHX05BTUUgPSAneC1tYXJrZXInO1xuLyoqXG4gKiBAdHlwZSB7c3RyaW5nfVxuICovXG5jb25zdCBBVFRSX0RBVEFfT1JJR0lOQUxfT0ZGU0VUX1NUQVJUID0gJ2RhdGEtb3JpZ2luYWwtb2Zmc2V0LXN0YXJ0Jztcbi8qKlxuICogQHR5cGUge3N0cmluZ31cbiAqL1xuY29uc3QgREFUQV9PUklHSU5BTF9URVhUX05PREVfSU5ERVggPSAnb3JpZ2luYWwtdGV4dC1ub2RlLWluZGV4Jztcbi8qKlxuICogQHR5cGUge3N0cmluZ31cbiAqL1xuY29uc3QgQVRUUl9EQVRBX1NUQVJUX0VORCA9ICdkYXRhLWlzLXN0YXJ0LWVuZCc7XG4vKipcbiAqIEB0eXBlIHtzdHJpbmd9XG4gKi9cbmNvbnN0IEFUVFJfREFUQV9JU19ISUdITElHSFRfTk9ERSA9ICdkYXRhLWlzLWhpZ2hsaWdodC1ub2RlJztcbi8qKlxuICogQHR5cGUge3N0cmluZ31cbiAqL1xuY29uc3QgQVRUUl9EQVRBX0lEID0gJ2RhdGEtc2VsZWN0aW9uLWlkJztcblxuLyoqXG4gKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2RlL2RvY3MvV2ViL0FQSS9Ob2RlL2NvbXBhcmVEb2N1bWVudFBvc2l0aW9uXG4gKiBAdHlwZSB7bnVtYmVyfVxuICovXG5jb25zdCBET0NVTUVOVF9QT1NJVElPTl9DT05UQUlORURfQlkgPSAxNjtcblxuZXhwb3J0IGRlZmF1bHRcbmNsYXNzIFJlbmRlcmluZyB7XG5cbiAgICBjb25zdHJ1Y3Rvcihkb2N1bWVudCwgY3NzQ2xhc3MsIGNvbnRleHQpIHtcblxuICAgICAgICBpZiAoIShkb2N1bWVudCBpbnN0YW5jZW9mIERvY3VtZW50KSkge1xuICAgICAgICAgICAgdGhyb3cgJ01hcmtsaWIgezB9IGlzIHJlcXVpcmVkIHRvIGJlIGEgZG9jdW1lbnQgaW5zdGFuY2UnO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAdHlwZSB7RG9jdW1lbnR9XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmRvY3VtZW50ID0gZG9jdW1lbnQ7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIElEIG9mIHJlbmRlcmluZywgd2lsbCBiZSBzZXQgb24gZWFjaCBlbGVtZW50IHRoYXQgaXMgcGFydCBvZiBpdFxuICAgICAgICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5pZCA9IFV0aWwuZ3VpZCgpO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDbGFzcyB0aGF0IGlzIHNldCBvbiBhbGwgaGlnaGxpZ2h0IG5vZGVzXG4gICAgICAgICAqIEB0eXBlIHtTdHJpbmd9XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmNzc0NsYXNzID0gdW5kZWZpbmVkID09PSBjc3NDbGFzcyA/ICdtYXJraW5nJyA6IGNzc0NsYXNzO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTdGFydENvbnRhaW5lclxuICAgICAgICAgKiBAdHlwZSB7Tm9kZX1cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuc3RhcnRDb250YWluZXIgPSBudWxsO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBFbmRDb250YWluZXJcbiAgICAgICAgICogQHR5cGUge05vZGV9XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmVuZENvbnRhaW5lciA9IG51bGw7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFByZWZpeCBiZWZvcmUgSURcbiAgICAgICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMubWFya2VyUHJlZml4ID0gJ21hcmtlci1zdGFydC0nO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTdWZmaXggYmVmb3JlIElEXG4gICAgICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLm1hcmtlclN1ZmZpeCA9ICdtYXJrZXItZW5kLSc7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEB0eXBlIHtOb2RlfVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5jb250ZXh0ID0gY29udGV4dCB8fCB0aGlzLmRvY3VtZW50O1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAdHlwZSB7RnVuY3Rpb259XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLl9vbldyYXBwZWROb2RlRnVuYyA9IG51bGw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMge3N0cmluZ30gaWQgb2YgdGhpcyByZW5kZXJpbmdcbiAgICAgKi9cbiAgICBnZXRJZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaWQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlkXG4gICAgICogQHJldHVybnMge1JlbmRlcmluZ31cbiAgICAgKi9cbiAgICBzZXRJZChpZCkge1xuICAgICAgICB0aGlzLmlkID0gaWQ7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExpc3RlbmVyIHRoYXQgaXMgY2FsbGVkIHdoZW4gYSBub2RlIGlzIHdyYXBwZWQgb24gdGhpcyBpbnN0YW5jZVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZcbiAgICAgKiBAcmV0dXJucyB7UmVuZGVyaW5nfVxuICAgICAqL1xuICAgIG9uV3JhcHBlZE5vZGUoZikge1xuICAgICAgICB0aGlzLl9vbldyYXBwZWROb2RlRnVuYyA9IGY7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2NhbGxPbldyYXBwZWROb2RlKCkge1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMuX29uV3JhcHBlZE5vZGVGdW5jID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aGlzLl9vbldyYXBwZWROb2RlRnVuYy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge05vZGV9IGNvbnRhaW5lclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB0aGlzSW5kZXhcbiAgICAgKiBAcmV0dXJucyB7aW50fSBpbmRleCBvZiBwYXJlbnQgb3Igb3JpZ2luYWxcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHN0YXRpYyBfZ2V0SW5kZXhQYXJlbnRJZkhhcyhjb250YWluZXIsIHRoaXNJbmRleCkge1xuICAgICAgICB2YXIgcCA9IGNvbnRhaW5lci5wYXJlbnROb2RlO1xuICAgICAgICB2YXIgaW5kZXggPSBwYXJzZUludChwLmdldEF0dHJpYnV0ZShBVFRSX0RBVEFfT1JJR0lOQUxfSU5ERVgpKTtcbiAgICAgICAgcmV0dXJuIGluZGV4ID4gdGhpc0luZGV4ID8gaW5kZXggOiB0aGlzSW5kZXg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGNvbnRhaW5lclxuICAgICAqIEByZXR1cm5zIHtpbnR9IG9mZnNldCBzdGFydCBvZiBwYXJlbnQgaWYgaGFzLCBlbHNlIDBcbiAgICAgKi9cbiAgICBzdGF0aWMgX2dldE9mZnNldFBhcmVudElmSGFzKGNvbnRhaW5lcikge1xuICAgICAgICB2YXIgcCA9IGNvbnRhaW5lci5wYXJlbnROb2RlO1xuICAgICAgICB2YXIgb2Zmc2V0ID0gcGFyc2VJbnQocC5nZXRBdHRyaWJ1dGUoQVRUUl9EQVRBX09SSUdJTkFMX09GRlNFVF9TVEFSVCkpO1xuICAgICAgICByZXR1cm4gb2Zmc2V0ID4gMCA/IG9mZnNldCA6IDA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIFRlbXBsYXRlIHVzZWQgYXMgYSB3cmFwcGVyXG4gICAgICogQHJldHVybnMge05vZGV9XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfY3JlYXRlV3JhcFRlbXBsYXRlKCkge1xuICAgICAgICB2YXIgZWwgPSB0aGlzLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoVEFHX05BTUUpLCB2VHJ1ZSA9IFwidHJ1ZVwiO1xuICAgICAgICBlbC5jbGFzc05hbWUgPSB0aGlzLmNzc0NsYXNzO1xuICAgICAgICBlbC5zZXRBdHRyaWJ1dGUoREFUQV9JU19TRUxFQ1RJT04sIHZUcnVlKTtcbiAgICAgICAgZWwuc2V0QXR0cmlidXRlKEFUVFJfREFUQV9JRCwgdGhpcy5nZXRJZCgpKTtcbiAgICAgICAgZWwuc2V0QXR0cmlidXRlKEFUVFJfREFUQV9JU19ISUdITElHSFRfTk9ERSwgdlRydWUpO1xuXG4gICAgICAgIHJldHVybiBlbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgVGVtcGxhdGUgdG8gdXNlIGFzIHN0YXJ0IGFuZCBlbmQgbWFya3NcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdGV4dFxuICAgICAqIEByZXR1cm5zIHtOb2RlfVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2NyZWF0ZVN0YXJ0RW5kV3JhcFRlbXBsYXRlKHRleHQpIHtcbiAgICAgICAgdmFyIGVsID0gdGhpcy5fY3JlYXRlV3JhcFRlbXBsYXRlKCksIHZUcnVlID0gXCJ0cnVlXCI7XG4gICAgICAgIGVsLnNldEF0dHJpYnV0ZShBVFRSX0RBVEFfU1RBUlRfRU5ELCB2VHJ1ZSk7XG4gICAgICAgIGVsLnRleHRDb250ZW50ID0gdGV4dDtcbiAgICAgICAgcmV0dXJuIGVsO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBTdGFydCBvciBFbmQgQ29udGFpbmVyIEVsZW1lbnRcbiAgICAgKiBAcGFyYW0gaW5pdGlhbE5vZGVcbiAgICAgKiBAcGFyYW0gcHJlZml4XG4gICAgICogQHBhcmFtIHRleHRcbiAgICAgKiBAcGFyYW0gb2Zmc2V0XG4gICAgICogQHBhcmFtIGluZGV4XG4gICAgICogQHJldHVybnMge05vZGV9XG4gICAgICovXG4gICAgX2NyZWF0ZVN0YXJ0T3JFbmRDb250YWluZXIoaW5pdGlhbE5vZGUsIHByZWZpeCwgdGV4dCwgb2Zmc2V0LCBpbmRleCkge1xuICAgICAgICBjb25zdCB3cmFwcGVyID0gdGhpcy5fY3JlYXRlU3RhcnRFbmRXcmFwVGVtcGxhdGUodGV4dCk7XG4gICAgICAgIHdyYXBwZXIuc2V0QXR0cmlidXRlKEFUVFJfREFUQV9PUklHSU5BTF9JTkRFWCwgUmVuZGVyaW5nLl9nZXRJbmRleFBhcmVudElmSGFzKGluaXRpYWxOb2RlLCBpbmRleCkpO1xuICAgICAgICB3cmFwcGVyLnNldEF0dHJpYnV0ZShBVFRSX0RBVEFfT1JJR0lOQUxfT0ZGU0VUX1NUQVJULCBvZmZzZXQpO1xuICAgICAgICB3cmFwcGVyLnNldEF0dHJpYnV0ZShEQVRBX09SSUdJTkFMX1RFWFRfTk9ERV9JTkRFWCwgaW5kZXgpO1xuICAgICAgICB3cmFwcGVyLm1hcmtsaWJJbnN0YW5jZSA9IHRoaXM7XG4gICAgICAgIHJldHVybiB3cmFwcGVyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFdyYXBzIGdpdmVuIGVsZW1lbnRcbiAgICAgKiBAcGFyYW0ge05vZGV9IGVsXG4gICAgICogQHBhcmFtIFtvcHRpb25hbExlbmd0aF1cbiAgICAgKiBAcGFyYW0gW29wdGlvbmFsSW5kZXhdXG4gICAgICogQHBhcmFtIFtvcHRpb25hbElzU2FtZU5vZGVdXG4gICAgICogQHJldHVybnMge05vZGV9XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfY3JlYXRlV3JhcChlbCwgb3B0aW9uYWxMZW5ndGgsIG9wdGlvbmFsSW5kZXgsIG9wdGlvbmFsSXNTYW1lTm9kZSkge1xuICAgICAgICBjb25zdCBvcmlnaW5hbEluZGV4ID0gb3B0aW9uYWxJbmRleCA+PSAwID8gb3B0aW9uYWxJbmRleCA6IFV0aWwuY2FsY0luZGV4KGVsKTtcbiAgICAgICAgY29uc3Qgd3JhcHBlciA9IHRoaXMuX2NyZWF0ZVdyYXBUZW1wbGF0ZSgpO1xuICAgICAgICB3cmFwcGVyLnNldEF0dHJpYnV0ZShBVFRSX0RBVEFfT1JJR0lOQUxfSU5ERVgsIFJlbmRlcmluZy5fZ2V0SW5kZXhQYXJlbnRJZkhhcyhlbCwgb3JpZ2luYWxJbmRleCkpO1xuICAgICAgICBjb25zdCBvZmZzZXRMZW5ndGggPSBvcHRpb25hbExlbmd0aCA+PSAwID8gb3B0aW9uYWxMZW5ndGggOiBSZW5kZXJpbmcuX2dldE9mZnNldFBhcmVudElmSGFzKGVsKTtcbiAgICAgICAgd3JhcHBlci5zZXRBdHRyaWJ1dGUoQVRUUl9EQVRBX09SSUdJTkFMX09GRlNFVF9TVEFSVCwgb2Zmc2V0TGVuZ3RoKTtcblxuICAgICAgICAvLyBTYXZlIGEgcmVmZXJlbmNlIHRvIG9yaWdpbmFsIHRleHQgbm9kZSBpbiB3cmFwcGVyXG4gICAgICAgIHdyYXBwZXIuc2V0QXR0cmlidXRlKERBVEFfT1JJR0lOQUxfVEVYVF9OT0RFX0lOREVYLCBvcmlnaW5hbEluZGV4KTtcblxuICAgICAgICAvLyBzYXZlIHRoaXMgbWFya2VyIGluc3RhbmNlIHRvIGdpdmVuIG5vZGVcbiAgICAgICAgd3JhcHBlci5tYXJrbGliSW5zdGFuY2UgPSB0aGlzO1xuXG4gICAgICAgIGlmIChvcHRpb25hbElzU2FtZU5vZGUpIHtcbiAgICAgICAgICAgIHdyYXBwZXIuc2V0QXR0cmlidXRlKEFUVFJfREFUQV9TVEFSVF9FTkQsIEFUVFJfREFUQV9TVEFSVF9FTkQpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHdyYXAgPSBVdGlsLndyYXAoZWwsIHdyYXBwZXIpO1xuICAgICAgICB0aGlzLl9jYWxsT25XcmFwcGVkTm9kZShlbCwgd3JhcCk7XG4gICAgICAgIHJldHVybiB3cmFwO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBzcGxpdCBjb250YWluZXIgZWxlbWVudFxuICAgICAqIEBwYXJhbSBvcmlnaW5hbEVsZW1lbnQge05vZGV9IG9yaWdpbmFsIHRleHQgbm9kZSBlbGVtZW50IHRoYXQgaXMgY3JlYXRlZCBhIHdyYXBwZXIgZm9yXG4gICAgICogQHBhcmFtIGluZGV4XG4gICAgICogQHBhcmFtIG9mZnNldFxuICAgICAqIEByZXR1cm5zIHsqfGpRdWVyeXxOb2RlfVxuICAgICAqL1xuICAgIF9jcmVhdGVTcGxpdENvbnRhaW5lcihvcmlnaW5hbEVsZW1lbnQsIGluZGV4LCBvZmZzZXQpIHtcbiAgICAgICAgY29uc3Qgd3JhcHBlciA9IHRoaXMuZG9jdW1lbnQuY3JlYXRlRWxlbWVudChUQUdfTkFNRSksIHZUcnVlID0gXCJ0cnVlXCI7XG4gICAgICAgIHdyYXBwZXIuc2V0QXR0cmlidXRlKERBVEFfSVNfU0VMRUNUSU9OLCB2VHJ1ZSk7XG4gICAgICAgIHdyYXBwZXIuc2V0QXR0cmlidXRlKEFUVFJfREFUQV9PUklHSU5BTF9JTkRFWCwgUmVuZGVyaW5nLl9nZXRJbmRleFBhcmVudElmSGFzKG9yaWdpbmFsRWxlbWVudCwgaW5kZXgpKTtcbiAgICAgICAgd3JhcHBlci5zZXRBdHRyaWJ1dGUoQVRUUl9EQVRBX09SSUdJTkFMX09GRlNFVF9TVEFSVCwgb2Zmc2V0KTtcbiAgICAgICAgd3JhcHBlci5zZXRBdHRyaWJ1dGUoREFUQV9PUklHSU5BTF9URVhUX05PREVfSU5ERVgsIGluZGV4KTtcbiAgICAgICAgcmV0dXJuIHdyYXBwZXI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRXh0cmFjdHMgYWxsIFRleHROb2RlcyBpbnNpZGUgYSBjb250YWluZXJcbiAgICAgKiBAcGFyYW0ge05vZGV9IGVsXG4gICAgICogQHJldHVybnMge0FycmF5LjxUZXh0Pn1cbiAgICAgKi9cbiAgICBfd2Fsa1RleHROb2RlcyhlbCwgZnVuYykge1xuICAgICAgICB0aGlzLndhbGtEb20oZWwsIGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgICAgICBpZiAoTm9kZS5URVhUX05PREUgPT09IG5vZGUubm9kZVR5cGUgJiYgIVV0aWwubm9kZUlzRW1wdHkobm9kZSkpIHtcbiAgICAgICAgICAgICAgICBmdW5jKG5vZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFdhbGtzIHRoZSB0cmVlXG4gICAgICogQHBhcmFtIHN0YXJ0XG4gICAgICogQHBhcmFtIGVuZENvbnRhaW5lclxuICAgICAqIEBwYXJhbSBuZXh0UGFyZW50XG4gICAgICovXG4gICAgd2FsayhzdGFydCwgZW5kQ29udGFpbmVyLCBuZXh0UGFyZW50KSB7XG4gICAgICAgIGxldCBuZXh0UGFyZW50Tm9kZSA9IHN0YXJ0O1xuICAgICAgICB3aGlsZSAobmV4dFBhcmVudE5vZGUgJiYgbmV4dFBhcmVudE5vZGUgIT09IG5leHRQYXJlbnQucGFyZW50Tm9kZSkge1xuICAgICAgICAgICAgdmFyIGN1cnJlbnRQYXJlbnROb2RlID0gbmV4dFBhcmVudE5vZGU7XG4gICAgICAgICAgICBuZXh0UGFyZW50Tm9kZSA9IG5leHRQYXJlbnROb2RlLnBhcmVudE5vZGU7XG4gICAgICAgICAgICBpZiAodGhpcy53cmFwU2libGluZ3MoY3VycmVudFBhcmVudE5vZGUubmV4dFNpYmxpbmcsIGVuZENvbnRhaW5lcikpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogV2lsbCBXcmFwIGFsbCB0ZXh0Tm9kZSBzaWJsaW5ncyBvZiBhIGNvbnRhaW5lciAoc3RhcnQpIGluc2lkZSBhIGRlZmluZWQgRWxlbWVudCAobGlrZSBhIHNwYW4pXG4gICAgICogSWYgYW4gRWxlbWVudCBub2RlIGlzIGZvdW5kLCBpdCB3aWxsIHdyYXAgYWxsIGNoaWxkcmVuIG9mIHRoaXMgbm9kZSBpbnNpZGUgYSBlbGVtZW50IGFzIHdlbGwuXG4gICAgICogSXQgd2lsbCBzdG9wIGlmIGVuZENvbnRhaW5lciBpcyBmb3VuZCBhcyBhIG5vZGVcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7Tm9kZX0gc3RhcnRcbiAgICAgKiBAcGFyYW0ge05vZGV9IGVuZENvbnRhaW5lclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSAodHJ1ZSBpZiBlbmRDb250YWluZXIgd2FzIGZvdW5kKVxuICAgICAqL1xuICAgIHdyYXBTaWJsaW5ncyhzdGFydCwgZW5kQ29udGFpbmVyKSB7XG4gICAgICAgIGxldCBuZXh0ID0gc3RhcnQsXG4gICAgICAgICAgICBmb3VuZCA9IGZhbHNlO1xuXG4gICAgICAgIC8vIENhcHN1bGUgc29tZSBsb2dpY1xuICAgICAgICBjb25zdCB3cmFwID0gKChuKSA9PiB7XG4gICAgICAgICAgICBpZiAobi5wYXJlbnROb2RlLmhhc0F0dHJpYnV0ZShBVFRSX0RBVEFfU1RBUlRfRU5EKSAmJlxuICAgICAgICAgICAgICAgIG4ucGFyZW50Tm9kZS5oYXNBdHRyaWJ1dGUoQVRUUl9EQVRBX0lTX0hJR0hMSUdIVF9OT0RFKSAmJlxuICAgICAgICAgICAgICAgIG4ucGFyZW50Tm9kZS5nZXRBdHRyaWJ1dGUoQVRUUl9EQVRBX0lEKSA9PT0gdGhpcy5nZXRJZCgpKSB7XG4gICAgICAgICAgICAgICAgbGV0IHRoaXNOb2RlID0gdGhpcy5fY3JlYXRlV3JhcChuKS5wYXJlbnROb2RlO1xuICAgICAgICAgICAgICAgIHRoaXNOb2RlLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5jc3NDbGFzcyk7XG4gICAgICAgICAgICAgICAgdGhpc05vZGUucmVtb3ZlQXR0cmlidXRlKEFUVFJfREFUQV9JU19ISUdITElHSFRfTk9ERSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX2NyZWF0ZVdyYXAobik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLmJpbmQodGhpcyk7XG5cbiAgICAgICAgLy8gaGVscGVyIGZ1bmN0aW9uc1xuXG4gICAgICAgIGNvbnN0IHdyYXBJZiA9IChuKSA9PiB7XG4gICAgICAgICAgICBpZiAoIVV0aWwubm9kZUlzRW1wdHkobikpIHtcbiAgICAgICAgICAgICAgICB3cmFwKG4pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IHdhbGtJZkNvbnRhaW5lZCA9IChlKSA9PiB7XG4gICAgICAgICAgICBpZiAoZSA9PT0gZW5kQ29udGFpbmVyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKE5vZGUuVEVYVF9OT0RFID09PSBlLm5vZGVUeXBlKSB7XG4gICAgICAgICAgICAgICAgd3JhcElmKGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3Qgd2Fsa0lmTm90Q29udGFpbmVkID0gKGVsKSA9PiB7XG4gICAgICAgICAgICB3cmFwSWYoZWwpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHdoaWxlIChuZXh0ICE9PSBudWxsICYmIG5leHQgIT09IGVuZENvbnRhaW5lcikge1xuICAgICAgICAgICAgdmFyIGN1cnJlbnROZXh0ID0gbmV4dDtcbiAgICAgICAgICAgIG5leHQgPSBuZXh0Lm5leHRTaWJsaW5nO1xuICAgICAgICAgICAgLy8gRm91bmQgYSB0ZXh0IG5vZGUsIGRpcmVjdGx5IHdyYXAgaW5zaWRlIGEgc3BhblxuICAgICAgICAgICAgaWYgKE5vZGUuVEVYVF9OT0RFID09PSBjdXJyZW50TmV4dC5ub2RlVHlwZSkge1xuICAgICAgICAgICAgICAgIHdyYXBJZihjdXJyZW50TmV4dCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICgoY3VycmVudE5leHQuY29tcGFyZURvY3VtZW50UG9zaXRpb24oZW5kQ29udGFpbmVyKSAmIERPQ1VNRU5UX1BPU0lUSU9OX0NPTlRBSU5FRF9CWSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53YWxrRG9tKGN1cnJlbnROZXh0LCB3YWxrSWZDb250YWluZWQpO1xuICAgICAgICAgICAgICAgICAgICBmb3VuZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fd2Fsa1RleHROb2RlcyhjdXJyZW50TmV4dCwgd2Fsa0lmTm90Q29udGFpbmVkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGZvdW5kKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZm91bmQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVjdXJzaXZlbHkgd2Fsa3MgdGhlIGRvbSB0cmVlIHVubGVzcyBmdW5jIHJldHVybnMgZmFsc2VcbiAgICAgKiBUaGlzIGlzIGEgbG90IG1vcmUgZWZmaWNpZW50IHRoZW4gdXNpbmcgYW55IGpRdWVyeSBvcGVyYXRpb25zXG4gICAgICpcbiAgICAgKiBBcHBsaWVzIG5vZGUgdG8gZnVuY3Rpb25cbiAgICAgKiBAcGFyYW0gbm9kZVxuICAgICAqIEBwYXJhbSBmdW5jXG4gICAgICogQHJldHVybnMgeyp9XG4gICAgICovXG4gICAgd2Fsa0RvbShub2RlLCBmdW5jKSB7XG4gICAgICAgIGlmICghbm9kZSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNoaWxkcmVuID0gbm9kZS5jaGlsZE5vZGVzO1xuICAgICAgICBpZiAoIWNoaWxkcmVuKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKCF0aGlzLndhbGtEb20oY2hpbGRyZW5baV0sIGZ1bmMpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmdW5jKG5vZGUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1hcmtzIHRleHQgb2YgdGhlIHNhbWUgbm9kZVxuICAgICAqIEBwYXJhbSB7Tm9kZX0gdGV4dE5vZGVcbiAgICAgKiBAcGFyYW0ge2ludH0gc3RhcnRJbmRleFxuICAgICAqIEBwYXJhbSB7aW50fSBlbmRJbmRleFxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX21hcmtUZXh0U2FtZU5vZGUodGV4dE5vZGUsIHN0YXJ0SW5kZXgsIGVuZEluZGV4KSB7XG5cbiAgICAgICAgY29uc3QgaW5pdGlhbFRleHQgPSB0ZXh0Tm9kZS5ub2RlVmFsdWUsXG4gICAgICAgICAgICBpbml0aWFsSW5kZXggPSBVdGlsLmNhbGNJbmRleCh0ZXh0Tm9kZSk7XG5cbiAgICAgICAgaWYgKCFpbml0aWFsVGV4dCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9JZiB0aGVyZSBpcyBhbiB1bm1hcmtlZCBwYXJ0IGluIHRoZSBiZWdpbm5pbmcgb2YgdGhlIHRleHQgbm9kZSxcbiAgICAgICAgLy9jdXQgb2ZmIHRoYXQgcGFydCBhbmQgcHV0IGl0IGludG8gaXQncyBvd24gdGV4dG5vZGUuXG4gICAgICAgIGlmIChzdGFydEluZGV4ID4gMCkge1xuICAgICAgICAgICAgY29uc3QgdGV4dEJlZm9yZSA9IGluaXRpYWxUZXh0LnNsaWNlKDAsIHN0YXJ0SW5kZXgpO1xuICAgICAgICAgICAgdGV4dE5vZGUucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUodGhpcy5kb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0ZXh0QmVmb3JlKSwgdGV4dE5vZGUpO1xuICAgICAgICAgICAgLy8gd3JhcCBjdXR0ZWQgdGV4dCBub2RlOlxuICAgICAgICAgICAgVXRpbC53cmFwKHRleHROb2RlLnByZXZpb3VzU2libGluZywgdGhpcy5fY3JlYXRlU3BsaXRDb250YWluZXIodGV4dE5vZGUsXG4gICAgICAgICAgICAgICAgaW5pdGlhbEluZGV4LCBSZW5kZXJpbmcuX2dldE9mZnNldFBhcmVudElmSGFzKHRleHROb2RlKSkpO1xuICAgICAgICB9XG4gICAgICAgIC8vSWYgdGhlcmUgaXMgYW4gdW5tYXJrZWQgcGFydCBhdCB0aGUgZW5kIG9mIHRoZSB0ZXh0IG5vZGUsXG4gICAgICAgIC8vY3V0IG9mZiB0aGF0IHBhcnQgYW5kIHB1dCBpdCBpbnRvIGl0J3Mgb3duIHRleHRub2RlLlxuICAgICAgICBpZiAoZW5kSW5kZXggPCBpbml0aWFsVGV4dC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnN0IHRleHRBZnRlciA9IGluaXRpYWxUZXh0LnNsaWNlKGVuZEluZGV4LCBpbml0aWFsVGV4dC5sZW5ndGgpO1xuICAgICAgICAgICAgdGV4dE5vZGUucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUodGhpcy5kb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0ZXh0QWZ0ZXIpLCB0ZXh0Tm9kZS5uZXh0U2libGluZyk7XG4gICAgICAgICAgICBVdGlsLndyYXAodGV4dE5vZGUubmV4dFNpYmxpbmcsIHRoaXMuX2NyZWF0ZVNwbGl0Q29udGFpbmVyKHRleHROb2RlLFxuICAgICAgICAgICAgICAgIGluaXRpYWxJbmRleCwgUmVuZGVyaW5nLl9nZXRPZmZzZXRQYXJlbnRJZkhhcyh0ZXh0Tm9kZSkgKyBlbmRJbmRleCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9DdXRvZmYgdGhlIHVubWFya2VkIHBhcnRzIGFuZCB3cmFwIHRoZSB0ZXh0bm9kZSBpbnRvIGEgc3Bhbi5cbiAgICAgICAgdGV4dE5vZGUubm9kZVZhbHVlID0gaW5pdGlhbFRleHQuc2xpY2Uoc3RhcnRJbmRleCwgZW5kSW5kZXgpO1xuICAgICAgICB0aGlzLnN0YXJ0Q29udGFpbmVyID0gdGhpcy5fY3JlYXRlV3JhcCh0ZXh0Tm9kZSxcbiAgICAgICAgICAgIFJlbmRlcmluZy5fZ2V0T2Zmc2V0UGFyZW50SWZIYXModGV4dE5vZGUpICsgc3RhcnRJbmRleCwgaW5pdGlhbEluZGV4LCB0cnVlKS5wYXJlbnROb2RlO1xuICAgICAgICB0aGlzLmVuZENvbnRhaW5lciA9IHRoaXMuc3RhcnRDb250YWluZXI7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXJ0Q29udGFpbmVyO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogTWFya3MgdGV4dCBvZiBlbmQgYW5kIHN0YXJ0IGNvbnRhaW5lcnMgaWYgc3RhcnQgYW5kIGVuZCBub2RlcyBhcmUgZGlmZmVyZW50XG4gICAgICogSW1wb3J0YW50OiBUaGVyZSBtaWdodCBiZSBubyBlbmQgY29udGFpbmVyIVxuICAgICAqXG4gICAgICogQHBhcmFtIHtOb2RlfSBzdGFydENvbnRhaW5lclxuICAgICAqIEBwYXJhbSB7Tm9kZX0gZW5kQ29udGFpbmVyXG4gICAgICogQHBhcmFtIHtpbnR9IHN0YXJ0T2Zmc2V0XG4gICAgICogQHBhcmFtIHtpbnR9IGVuZE9mZnNldFxuICAgICAqIEByZXR1cm5zIHt7c3RhcnRUOiAoTm9kZSksIGVuZFQ6IChOb2RlKX19XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfbWFya1RleHREaWZmZXJlbnROb2RlKHN0YXJ0Q29udGFpbmVyLCBlbmRDb250YWluZXIsIHN0YXJ0T2Zmc2V0LCBlbmRPZmZzZXQpIHtcbiAgICAgICAgLy8gR2V0IGN1cnJlbnQgZm9yIGJvdGggc3RhcnQgYW5kIGVuZDpcbiAgICAgICAgY29uc3Qgc3RhcnRDb250YWluZXJJbmRleCA9IFV0aWwuY2FsY0luZGV4KHN0YXJ0Q29udGFpbmVyKTtcbiAgICAgICAgY29uc3QgZW5kQ29udGFpbmVySW5kZXggPSBVdGlsLmNhbGNJbmRleChlbmRDb250YWluZXIpO1xuXG4gICAgICAgIC8vIFNwbGl0IHRleHRcbiAgICAgICAgY29uc3QgZnVsbFRleHRTdGFydFZhbHVlID0gc3RhcnRDb250YWluZXIubm9kZVZhbHVlO1xuICAgICAgICAvLyBpbml0IHdpdGggc3RhcnRDb250YWluZXIgYmVjYXVzZSB3ZSBtYXkgaGF2ZSBub3QgYSB0ZXh0IG5vZGUgaGVyZVxuICAgICAgICBsZXQgc3RhcnRUID0gc3RhcnRDb250YWluZXI7XG5cbiAgICAgICAgaWYgKHVuZGVmaW5lZCAhPT0gZnVsbFRleHRTdGFydFZhbHVlKSB7XG4gICAgICAgICAgICB2YXIgcGFydFRleHRTdGFydFZhbHVlID0gZnVsbFRleHRTdGFydFZhbHVlLnNsaWNlKHN0YXJ0T2Zmc2V0LCBmdWxsVGV4dFN0YXJ0VmFsdWUubGVuZ3RoKTtcbiAgICAgICAgICAgIC8vIFNldCBuZXcgdGV4dCB0byBzdGFydCBub2RlXG4gICAgICAgICAgICBzdGFydENvbnRhaW5lci5ub2RlVmFsdWUgPSBmdWxsVGV4dFN0YXJ0VmFsdWUuc2xpY2UoMCwgc3RhcnRPZmZzZXQpO1xuXG4gICAgICAgICAgICB2YXIgb2Zmc2V0U3RhcnQgPSBSZW5kZXJpbmcuX2dldE9mZnNldFBhcmVudElmSGFzKHN0YXJ0Q29udGFpbmVyKTtcbiAgICAgICAgICAgIC8vIENyZWF0ZSBhIG5ldyBub2RlIGZvciBzcGxpdHRlZCB0ZXh0LCBvZmZzZXQgaXMgdGhlIGxlbmd0aCBvZiBuZXcgc3RhcnRDb250YWluZXIubm9kZVZhbHVlOlxuICAgICAgICAgICAgc3RhcnRUID0gdGhpcy5fY3JlYXRlU3RhcnRPckVuZENvbnRhaW5lcihzdGFydENvbnRhaW5lciwgdGhpcy5tYXJrZXJQcmVmaXgsIHBhcnRUZXh0U3RhcnRWYWx1ZSxcbiAgICAgICAgICAgICAgICBvZmZzZXRTdGFydCA9PT0gc3RhcnRPZmZzZXQgPyBvZmZzZXRTdGFydCA6IG9mZnNldFN0YXJ0ICsgc3RhcnRPZmZzZXQsIHN0YXJ0Q29udGFpbmVySW5kZXgpO1xuICAgICAgICAgICAgLy8gQXBwZW5kIHRoaXMgbm9kZSBhZnRlciBzdGFydENvbnRhaW5lclxuICAgICAgICAgICAgc3RhcnRDb250YWluZXIucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoc3RhcnRULCBzdGFydENvbnRhaW5lci5uZXh0U2libGluZyk7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0Q29udGFpbmVyID0gc3RhcnRUO1xuXG4gICAgICAgICAgICBpZiAoc3RhcnRDb250YWluZXIubm9kZVZhbHVlKSB7XG4gICAgICAgICAgICAgICAgLy8gV3JhcCBzdGFydCBjb250YWluZXIgaW4gZGV0ZWN0aW9uIG5vZGUsIG9mZnNldCBpcyBhbHdheXMgMCBvciBwYXJlbnQgb2Zmc2V0LlxuICAgICAgICAgICAgICAgIFV0aWwud3JhcChzdGFydENvbnRhaW5lciwgdGhpcy5fY3JlYXRlU3BsaXRDb250YWluZXIoc3RhcnRDb250YWluZXIsIHN0YXJ0Q29udGFpbmVySW5kZXgsXG4gICAgICAgICAgICAgICAgICAgIFJlbmRlcmluZy5fZ2V0T2Zmc2V0UGFyZW50SWZIYXMoc3RhcnRDb250YWluZXIpKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpbml0IHdpdGggZW5kQ29udGFpbmVyIGJlY2F1c2Ugd2UgbWF5IGhhdmUgbm90IGEgdGV4dCBub2RlIGhlcmVcbiAgICAgICAgbGV0IGVuZFQgPSBlbmRDb250YWluZXI7XG5cbiAgICAgICAgLy8gMi4gRXh0cmFjdCBlbmQgVGV4dCBub2RlLFxuICAgICAgICBjb25zdCBmdWxsVGV4dEVuZFZhbHVlID0gZW5kQ29udGFpbmVyLm5vZGVWYWx1ZTtcbiAgICAgICAgLy8gSXQncyBwb3NzaWJsZSB0aGF0IGVuZCBjb250YWluZXIgdmFsdWUgaXMgbnVsbCAoaWYgYSB3aG9sZSBwYXJhZ3JhcGggaXMgbWFya2VkKVxuICAgICAgICBpZiAodW5kZWZpbmVkICE9PSBmdWxsVGV4dEVuZFZhbHVlKSB7XG4gICAgICAgICAgICAvLyBTcGxpdCB0ZXh0XG4gICAgICAgICAgICB2YXIgcGFydFRleHRFbmRWYWx1ZSA9IGZ1bGxUZXh0RW5kVmFsdWUuc2xpY2UoMCwgZW5kT2Zmc2V0KTtcbiAgICAgICAgICAgIGVuZENvbnRhaW5lci5ub2RlVmFsdWUgPSBmdWxsVGV4dEVuZFZhbHVlLnNsaWNlKGVuZE9mZnNldCwgZnVsbFRleHRFbmRWYWx1ZS5sZW5ndGgpO1xuICAgICAgICAgICAgLy8gRW5kIENvbnRhaW5lciBzdGFydCBvZmZzZXQgaXMgYWx3YXlzIDAgb3IgcGFyZW50IG9mZnNldC5cbiAgICAgICAgICAgIGVuZFQgPSB0aGlzLl9jcmVhdGVTdGFydE9yRW5kQ29udGFpbmVyKGVuZENvbnRhaW5lciwgdGhpcy5tYXJrZXJTdWZmaXgsIHBhcnRUZXh0RW5kVmFsdWUsXG4gICAgICAgICAgICAgICAgUmVuZGVyaW5nLl9nZXRPZmZzZXRQYXJlbnRJZkhhcyhlbmRDb250YWluZXIpLCBlbmRDb250YWluZXJJbmRleCk7XG5cbiAgICAgICAgICAgIGVuZENvbnRhaW5lci5wYXJlbnROb2RlLmluc2VydEJlZm9yZShlbmRULCBlbmRDb250YWluZXIpO1xuICAgICAgICAgICAgdGhpcy5lbmRDb250YWluZXIgPSBlbmRUO1xuICAgICAgICAgICAgdmFyIG9mZnNldFBhcmVudCA9IFJlbmRlcmluZy5fZ2V0T2Zmc2V0UGFyZW50SWZIYXMoZW5kQ29udGFpbmVyKTtcbiAgICAgICAgICAgIFV0aWwud3JhcChlbmRDb250YWluZXIsIHRoaXMuX2NyZWF0ZVNwbGl0Q29udGFpbmVyKGVuZENvbnRhaW5lciwgZW5kQ29udGFpbmVySW5kZXgsXG4gICAgICAgICAgICAgICAgb2Zmc2V0UGFyZW50ID09PSBlbmRPZmZzZXQgPyBvZmZzZXRQYXJlbnQgOiBvZmZzZXRQYXJlbnQgKyBlbmRPZmZzZXQpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7c3RhcnRUOiBzdGFydFQsIGVuZFQ6IGVuZFR9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFdpbGwgcmV0dXJuIHRoZSBvcmlnaW5hbCBmaXJzdCBvZmZzZXRcbiAgICAgKiBAcGFyYW0gZWxlbWVudFxuICAgICAqIEByZXR1cm5zIHtpbnR9XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfZmluZE9yaWdpbmFsT2Zmc2V0KGVsZW1lbnQpIHtcbiAgICAgICAgaWYgKCFlbGVtZW50LnBhcmVudE5vZGUuaGFzQXR0cmlidXRlKEFUVFJfREFUQV9PUklHSU5BTF9PRkZTRVRfU1RBUlQpKSB7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBsZW5ndGhFbGVtZW50ID0gVXRpbC5wYXJlbnQoZWxlbWVudCwgJ1snICsgQVRUUl9EQVRBX09SSUdJTkFMX09GRlNFVF9TVEFSVCArICddJyk7XG4gICAgICAgIHJldHVybiBsZW5ndGhFbGVtZW50ID8gcGFyc2VJbnQobGVuZ3RoRWxlbWVudC5nZXRBdHRyaWJ1dGUoQVRUUl9EQVRBX09SSUdJTkFMX09GRlNFVF9TVEFSVCkpIDogMDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW5kZXJzIGEgc2VsZWN0aW9uXG4gICAgICogQHBhcmFtIHtOb2RlfSBzdGFydENvbnRhaW5lclxuICAgICAqIEBwYXJhbSB7Tm9kZX0gZW5kQ29udGFpbmVyXG4gICAgICogQHBhcmFtIHtOb2RlfSBjb21tb25BbmNlc3RvclxuICAgICAqIEBwYXJhbSB7aW50fSBzdGFydE9mZnNldFxuICAgICAqIEBwYXJhbSB7aW50fSBlbmRPZmZzZXRcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFt3aXRob3V0UmVzdWx0XSBpZiB0cnVlIHJlc3VsdCB3aWxsIG5vdCBiZSBjYWxjdWxhdGVkXG4gICAgICogQHJldHVybnMge3tzdGFydE9mZnNldDogKGludCksIGVuZE9mZnNldDogKGludCl9fSB0aGUgb3JpZ2luYWwgb2Zmc2V0cyBmb3VuZFxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX3JlbmRlcldpdGhFbGVtZW50cyhzdGFydENvbnRhaW5lciwgZW5kQ29udGFpbmVyLCBjb21tb25BbmNlc3Rvciwgc3RhcnRPZmZzZXQsIGVuZE9mZnNldCwgd2l0aG91dFJlc3VsdCkge1xuICAgICAgICBsZXQgb3V0ZXIgPSBVdGlsLnBhcmVudHMoc3RhcnRDb250YWluZXIsIGNvbW1vbkFuY2VzdG9yKTtcbiAgICAgICAgb3V0ZXIgPSBvdXRlcltvdXRlci5sZW5ndGggLSAxXTtcbiAgICAgICAgY29uc3QgY29udGV4dENvbnRhaW5lciA9IG91dGVyID8gb3V0ZXIgOiBjb21tb25BbmNlc3RvcjtcblxuICAgICAgICAvLyBTYW1lIEVsZW1lbnQsIG1lYW5zIHRoZSBzZWxlY3Rpb24gaXMgZnVsbHkgY29udGFpbmVkIGluIGEgZGlzY3JldGUgYXJlYSwgc3RhcnQgYW5kIGVuZHBvaW50IGhhdmUgdGhlIHNhbWUgcGFyZW50XG4gICAgICAgIC8vIGJ1dCBhcmUgZGlmZmVyZW50IG5vZGVzOlxuXG4gICAgICAgIC8vIFN0YXJ0IGFuZCBFbmQgb2Zmc2V0IGhhdmUgdG8gYmUgcmVjYWxjdWxhdGVkIGJlY2F1c2UgZG9tIG1pZ2h0IGJlIGFscmVhZHkgY2hhbmdlZCBieSBoaWdobGlnaHRpbmcgaW4gZ2l2ZW4gbm9kZVxuICAgICAgICAvLyAxOiBGaXJzdCBkZXRlY3QgcmVhbCBzdGFydCBvZmZzZXQgaW4gc3RhcnRDb250YWluZXI6XG5cbiAgICAgICAgLy8gVGhhdCB3b3JrcyBieSBzZWxlY3RpbmcgdGhlIGhpZ2hlc3Qgd3JhcHBlciBhbmQgZ2V0IG9yaWdpbmFsLW9mZnNldC1zdGFydCBkYXRhIGVsZW1lbnQsIHNlZSBcImZpbmRPcmlnaW5hbE9mZnNldFwiXG4gICAgICAgIC8vIFNvIGZpcnN0IHNlbGVjdCB0aGF0IGNvbnRhaW5lcjpcbiAgICAgICAgY29uc3Qgb3JpZ2luYWxTdGFydE9mZnNldCA9IHRoaXMuX2ZpbmRPcmlnaW5hbE9mZnNldChzdGFydENvbnRhaW5lcik7XG4gICAgICAgIGNvbnN0IG9yaWdpbmFsRW5kT2Zmc2V0ID0gdGhpcy5fZmluZE9yaWdpbmFsT2Zmc2V0KGVuZENvbnRhaW5lcik7XG5cbiAgICAgICAgLy8gV2UgbWF5IHJ1biBpbnRvIEJyb3dzZXIgQnVnczpcblxuICAgICAgICAvLyBJZiBib3RoIGFyZSBub3QgdGV4dCBub2RlcywgdXNlIG5leHQgc2libGluZyBhcyBlbmRDb250YWluZXJcbiAgICAgICAgaWYgKHN0YXJ0Q29udGFpbmVyLm5vZGVUeXBlICE9PSBOb2RlLlRFWFRfTk9ERSAmJiBlbmRDb250YWluZXIubm9kZVR5cGUgIT09IE5vZGUuVEVYVF9OT0RFKSB7XG4gICAgICAgICAgICBpZiAoc3RhcnRDb250YWluZXIgPT09IGVuZENvbnRhaW5lcikge1xuICAgICAgICAgICAgICAgIGVuZENvbnRhaW5lciA9IGVuZENvbnRhaW5lci5uZXh0RWxlbWVudFNpYmxpbmcgfHwgZW5kQ29udGFpbmVyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIElGIHN0YXJ0L2VuZCBjb250YWluZXIgaXMgbm90IHR5cGUgb2YgdGV4dCwgc2VsZWN0IGZpcnN0IGNoaWxkIHRleHQgbm9kZTpcbiAgICAgICAgLy8gV2UgcnVuIGluIHNvbWUgYnVncyB3aXRoIGZpcmVmb3ggaGVyZSB0aGF0IHNlbGVjdHMgbm8gdGV4dC1ub2RlcyBzb21ldGltZXMsIHRyeWluZyB0byBmaXggdGhpcyBoZXJlXG4gICAgICAgIC8vIFNvbWV0aW1lcyBkb2VzIG5vdCB3b3JrIGNvcnJlY3RseS4uLiAoc3BlY2lhbGx5IHdoZW4gRE9NIHdhcyBtb2RpZmllZClcbiAgICAgICAgaWYgKHN0YXJ0Q29udGFpbmVyLm5vZGVUeXBlICE9PSBOb2RlLlRFWFRfTk9ERSkge1xuICAgICAgICAgICAgdGhpcy53YWxrRG9tKHN0YXJ0Q29udGFpbmVyLCBmdW5jdGlvbiAoZWwpIHtcbiAgICAgICAgICAgICAgICBpZiAoZWwubm9kZVR5cGUgPT09IE5vZGUuVEVYVF9OT0RFKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0Q29udGFpbmVyID0gZWw7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlbmRDb250YWluZXIubm9kZVR5cGUgIT09IE5vZGUuVEVYVF9OT0RFKSB7XG4gICAgICAgICAgICAvLyBHZXQgdGhlIGxhc3QgdGV4dCBub2RlOlxuICAgICAgICAgICAgY29uc3QgZW5kQ29udGFpbmVyQ29udGVudHMgPSBVdGlsLmNsb3Nlc3Qoc3RhcnRDb250YWluZXIsICc6bm90KFsnICsgREFUQV9JU19TRUxFQ1RJT04gKyAnXSknKS5jaGlsZE5vZGVzO1xuICAgICAgICAgICAgaWYgKGVuZENvbnRhaW5lckNvbnRlbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHIgPSBlbmRDb250YWluZXJDb250ZW50c1tlbmRDb250YWluZXJDb250ZW50cy5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgICAgICBpZiAoci5ub2RlVHlwZSA9PT0gTm9kZS5URVhUX05PREUpIHtcbiAgICAgICAgICAgICAgICAgICAgZW5kQ29udGFpbmVyID0gcjtcbiAgICAgICAgICAgICAgICAgICAgZW5kT2Zmc2V0ID0gci5sZW5ndGg7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGYgPSByLmxhc3RDaGlsZDtcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKGYgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmICYmIGYubm9kZVR5cGUgPT09IE5vZGUuVEVYVF9OT0RFKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5kQ29udGFpbmVyID0gZjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmRPZmZzZXQgPSBmLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZi5wYXJlbnROb2RlLmhhc0F0dHJpYnV0ZShBVFRSX0RBVEFfT1JJR0lOQUxfT0ZGU0VUX1NUQVJUKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmRPZmZzZXQgPSBwYXJzZUludChmLnBhcmVudE5vZGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0QXR0cmlidXRlKEFUVFJfREFUQV9PUklHSU5BTF9PRkZTRVRfU1RBUlQpKSArIGVuZE9mZnNldDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBmID0gZi5sYXN0Q2hpbGQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBzdGlsbCBubyB0ZXh0Tm9kZT9cbiAgICAgICAgICAgIGlmIChlbmRDb250YWluZXIubm9kZVR5cGUgIT09IE5vZGUuVEVYVF9OT0RFKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgJ0NvdWxkIG5vdCBmb3VuZCBlbmRDb250YWluZXIsIGhpZ2hsaWdodGluZyB3b3VsZCBiZSB1bnN0YWJsZSc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcmVzdWx0ID0gd2l0aG91dFJlc3VsdCB8fCB7XG4gICAgICAgICAgICAgICAgLy8gUmVhbCBvZmZzZXQgaXMgY2FsY3VsYXRlZCBieSByZWxhdGl2ZSBsZW5ndGggYW5kIGFic29sdXRlIGxlbmd0aFxuICAgICAgICAgICAgICAgIHN0YXJ0T2Zmc2V0OiBvcmlnaW5hbFN0YXJ0T2Zmc2V0ICsgc3RhcnRPZmZzZXQsXG4gICAgICAgICAgICAgICAgZW5kT2Zmc2V0OiBvcmlnaW5hbEVuZE9mZnNldCArIGVuZE9mZnNldCxcbiAgICAgICAgICAgICAgICAvLyBnZXQgdGhlIHBhdGggZm9yIHRoaXMgc2VsZWN0aW9uXG4gICAgICAgICAgICAgICAgc3RhcnRDb250YWluZXJQYXRoOiBVdGlsLmdldFBhdGgoc3RhcnRDb250YWluZXIsIHRoaXMuY29udGV4dCksXG4gICAgICAgICAgICAgICAgZW5kQ29udGFpbmVyUGF0aDogVXRpbC5nZXRQYXRoKGVuZENvbnRhaW5lciwgdGhpcy5jb250ZXh0KVxuICAgICAgICAgICAgfTtcblxuICAgICAgICB0aGlzLl9yZW5kZXJTZWxlY3Rpb24oc3RhcnRDb250YWluZXIsIGVuZENvbnRhaW5lciwgc3RhcnRPZmZzZXQsIGVuZE9mZnNldCwgY29udGV4dENvbnRhaW5lciwgb3V0ZXIpO1xuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVuZGVycyBhIGdpdmVuIHNlbGVjdGlvblxuICAgICAqXG4gICAgICogQHBhcmFtIHtOb2RlfSBzdGFydENvbnRhaW5lclxuICAgICAqIEBwYXJhbSB7Tm9kZX0gZW5kQ29udGFpbmVyXG4gICAgICogQHBhcmFtIHtpbnR9IHN0YXJ0T2Zmc2V0XG4gICAgICogQHBhcmFtIHtpbnR9IGVuZE9mZnNldFxuICAgICAqIEBwYXJhbSB7Tm9kZX0gY29udGV4dENvbnRhaW5lclxuICAgICAqIEBwYXJhbSB7Tm9kZX0gb3V0ZXJcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9yZW5kZXJTZWxlY3Rpb24oc3RhcnRDb250YWluZXIsIGVuZENvbnRhaW5lciwgc3RhcnRPZmZzZXQsIGVuZE9mZnNldCwgY29udGV4dENvbnRhaW5lciwgb3V0ZXIpIHtcblxuICAgICAgICAvLyBpZiBzdGFydCBhbmQgZW5kLWNvbnRhaW5lciBhcmUgdGhlIHNhbWUsIG1hcmsgdGV4dCBvbiB0aGUgc2FtZSBub2RlXG4gICAgICAgIGlmIChzdGFydENvbnRhaW5lciA9PT0gZW5kQ29udGFpbmVyKSB7XG4gICAgICAgICAgICB0aGlzLl9tYXJrVGV4dFNhbWVOb2RlKHN0YXJ0Q29udGFpbmVyLCBzdGFydE9mZnNldCwgZW5kT2Zmc2V0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSB0aGlzLl9tYXJrVGV4dERpZmZlcmVudE5vZGUoc3RhcnRDb250YWluZXIsIGVuZENvbnRhaW5lciwgc3RhcnRPZmZzZXQsIGVuZE9mZnNldCk7XG4gICAgICAgICAgICBpZiAoIW91dGVyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy53cmFwU2libGluZ3MocmVzdWx0LnN0YXJ0VC5uZXh0U2libGluZywgZW5kQ29udGFpbmVyKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy53YWxrKHJlc3VsdC5zdGFydFQsIGVuZENvbnRhaW5lciwgY29udGV4dENvbnRhaW5lcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIERlc2VyaWFsaXplIGEgc3BlY2lmaWMgcGF0aCBhbmQgZmluZHMgdGhlIHJpZ2h0IHRleHROb2Rlc1xuICAgICAqIFRoaXMgZXZlbiB3b3JrcyB3aGVuIERPTSBoYXMgYmVlbiBtYW5pcHVsYXRlZCBiZWZvcmUgYnkgYG1hcmtsaWJgXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhdGggdGhlIHNlcmlhbGl6ZWQgcGF0aCAoaW5jbHVkaW5nIG9mZnNldHMpXG4gICAgICogQHJldHVybiB7Tm9kZX1cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9kZXNlcmlhbGl6ZVBhdGgocGF0aCkge1xuICAgICAgICBjb25zdCBwU3BsaXQgPSBwYXRoLnNwbGl0KCc7JyksIHAgPSBwU3BsaXRbMF0sXG4gICAgICAgICAgICBvYmplY3RJbmRleCA9IHBhcnNlSW50KHBTcGxpdFsxXSksXG4gICAgICAgICAgICBjaGFyT2Zmc2V0ID0gcGFyc2VJbnQocFNwbGl0WzJdKSxcbiAgICAgICAgICAgIGNvbnRhaW5lciA9ICFwLnRyaW0oKSA/IHRoaXMuY29udGV4dCA6IHRoaXMuY29udGV4dC5xdWVyeVNlbGVjdG9yKHApO1xuICAgICAgICBsZXQgbWF5YmVGb3VuZE5vZGUgPSBudWxsO1xuICAgICAgICB0aGlzLndhbGtEb20oY29udGFpbmVyLCBmdW5jdGlvbiAobikge1xuICAgICAgICAgICAgaWYgKG4ubm9kZVR5cGUgPT09IE5vZGUuVEVYVF9OT0RFKSB7XG4gICAgICAgICAgICAgICAgdmFyIGF0ck9mZnNldFN0YXJ0ID0gbi5wYXJlbnROb2RlLmdldEF0dHJpYnV0ZShBVFRSX0RBVEFfT1JJR0lOQUxfT0ZGU0VUX1NUQVJUKTtcbiAgICAgICAgICAgICAgICBhdHJPZmZzZXRTdGFydCA9IGF0ck9mZnNldFN0YXJ0ID09PSBudWxsID8gMCA6IGF0ck9mZnNldFN0YXJ0O1xuICAgICAgICAgICAgICAgIHZhciBhdHJJbmRleCA9IG4ucGFyZW50Tm9kZS5nZXRBdHRyaWJ1dGUoQVRUUl9EQVRBX09SSUdJTkFMX0lOREVYKTtcbiAgICAgICAgICAgICAgICBhdHJJbmRleCA9IGF0ckluZGV4ID09PSBudWxsID8gVXRpbC5jYWxjSW5kZXgobikgOiBhdHJJbmRleDtcbiAgICAgICAgICAgICAgICBpZiAocGFyc2VJbnQoYXRySW5kZXgpID09PSBvYmplY3RJbmRleCAmJiBjaGFyT2Zmc2V0ID49IGF0ck9mZnNldFN0YXJ0ICYmXG4gICAgICAgICAgICAgICAgICAgICgocGFyc2VJbnQoYXRyT2Zmc2V0U3RhcnQpICsgbi5sZW5ndGgpID49IGNoYXJPZmZzZXQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0aGlzT2Zmc2V0ID0gbi5wYXJlbnROb2RlXG4gICAgICAgICAgICAgICAgICAgICAgICAuaGFzQXR0cmlidXRlKEFUVFJfREFUQV9PUklHSU5BTF9PRkZTRVRfU1RBUlQpID8gY2hhck9mZnNldCAtXG4gICAgICAgICAgICAgICAgICAgIHBhcnNlSW50KG4ucGFyZW50Tm9kZVxuICAgICAgICAgICAgICAgICAgICAgICAgLmdldEF0dHJpYnV0ZShBVFRSX0RBVEFfT1JJR0lOQUxfT0ZGU0VUX1NUQVJUKSkgOiBjaGFyT2Zmc2V0O1xuICAgICAgICAgICAgICAgICAgICBtYXliZUZvdW5kTm9kZSA9IHtub2RlOiBuLCBvZmZzZXQ6IHRoaXNPZmZzZXR9O1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gbWF5YmVGb3VuZE5vZGU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUHJlcGFyZXMgdG8gcmVuZGVyIGEgU2VsZWN0aW9uIHdpdGggcGF0aCBzZWxlY3RvcnNcbiAgICAgKiBgYGBcbiAgICAgKiBBIFBhdGggbG9va3MgbGlrZSB0aGlzOlxuICAgICAqXG4gICAgICogI3NlbGVjdG9yOyN0ZXh0bm9kZTsjb2Zmc2V0XG4gICAgICogYGBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc3RhcnRQYXRoXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGVuZFBhdGhcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAqL1xuICAgIHJlbmRlcldpdGhQYXRoKHN0YXJ0UGF0aCwgZW5kUGF0aCkge1xuICAgICAgICBjb25zdCBzdGFydENvbnRhaW5lciA9IHRoaXMuX2Rlc2VyaWFsaXplUGF0aChzdGFydFBhdGgpO1xuICAgICAgICBjb25zdCBlbmRDb250YWluZXIgPSB0aGlzLl9kZXNlcmlhbGl6ZVBhdGgoZW5kUGF0aCk7XG4gICAgICAgIGlmIChzdGFydENvbnRhaW5lciAmJiBlbmRDb250YWluZXIgJiYgc3RhcnRDb250YWluZXIubm9kZSAmJiBlbmRDb250YWluZXIubm9kZSkge1xuICAgICAgICAgICAgdmFyIHJhbmdlID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTtcbiAgICAgICAgICAgIHJhbmdlLnNldFN0YXJ0KHN0YXJ0Q29udGFpbmVyLm5vZGUsIHN0YXJ0Q29udGFpbmVyLm9mZnNldCk7XG4gICAgICAgICAgICByYW5nZS5zZXRFbmQoZW5kQ29udGFpbmVyLm5vZGUsIGVuZENvbnRhaW5lci5vZmZzZXQpO1xuICAgICAgICAgICAgY29uc3QgdGV4dCA9IHJhbmdlLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcldpdGhSYW5nZShyYW5nZSwgdHJ1ZSk7XG4gICAgICAgICAgICByZXR1cm4gdGV4dDtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyAnQ291bGQgbm90IGZpbmQgc3RhcnQtIGFuZC9vciBlbmQtY29udGFpbmVyIGluIGRvY3VtZW50JztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW5kZXJzIGEgcmVzdWx0ICh0aGF0IHJldHVybmVkIGZyb20gYHJlbmRlcldpdGhSYW5nZWApXG4gICAgICogQHBhcmFtIHJlc3VsdFxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICovXG4gICAgcmVuZGVyV2l0aFJlc3VsdChyZXN1bHQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyV2l0aFBhdGgoXG4gICAgICAgICAgICBgJHtyZXN1bHQuc3RhcnRDb250YWluZXJQYXRofTske3Jlc3VsdC5zdGFydE9mZnNldH1gLFxuICAgICAgICAgICAgYCR7cmVzdWx0LmVuZENvbnRhaW5lclBhdGh9OyR7cmVzdWx0LmVuZE9mZnNldH1gKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFByZXBhcmVzIGEgc2VsZWN0aW9uIHdpdGggYSByYW5nZSBvYmplY3RcbiAgICAgKiBAcGFyYW0ge1JhbmdlfSByYW5nZVxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW3dpdGhvdXRSZXN1bHRdIG9wdGlvbmFsIGRvIGNhbGN1bGF0ZSBhIHJlc3VsdCwgdGhlIHNlbGVjdGlvbiB3b3VsZCBub3QgYmUgc2VyaWFsaXphYmxlXG4gICAgICogQHJldHVybnMge09iamVjdH1cbiAgICAgKi9cbiAgICByZW5kZXJXaXRoUmFuZ2UocmFuZ2UsIHdpdGhvdXRSZXN1bHQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlbmRlcldpdGhFbGVtZW50cyhyYW5nZS5zdGFydENvbnRhaW5lciwgcmFuZ2UuZW5kQ29udGFpbmVyLFxuICAgICAgICAgICAgcmFuZ2UuY29tbW9uQW5jZXN0b3JDb250YWluZXIsIHJhbmdlLnN0YXJ0T2Zmc2V0LCByYW5nZS5lbmRPZmZzZXQsIHdpdGhvdXRSZXN1bHQpO1xuICAgIH1cbn1cblxuIl19

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _Object$defineProperty = __webpack_require__(5)["default"];
	
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
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(6), __esModule: true };

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(7);
	module.exports = function defineProperty(it, key, desc){
	  return $.setDesc(it, key, desc);
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global = typeof self != 'undefined' ? self : Function('return this')()
	  , core   = {}
	  , defineProperty = Object.defineProperty
	  , hasOwnProperty = {}.hasOwnProperty
	  , ceil  = Math.ceil
	  , floor = Math.floor
	  , max   = Math.max
	  , min   = Math.min;
	// The engine works fine with descriptors? Thank's IE8 for his funny defineProperty.
	var DESC = !!function(){
	  try {
	    return defineProperty({}, 'a', {get: function(){ return 2; }}).a == 2;
	  } catch(e){ /* empty */ }
	}();
	var hide = createDefiner(1);
	// 7.1.4 ToInteger
	function toInteger(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	}
	function desc(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	}
	function simpleSet(object, key, value){
	  object[key] = value;
	  return object;
	}
	function createDefiner(bitmap){
	  return DESC ? function(object, key, value){
	    return $.setDesc(object, key, desc(bitmap, value));
	  } : simpleSet;
	}
	
	function isObject(it){
	  return it !== null && (typeof it == 'object' || typeof it == 'function');
	}
	function isFunction(it){
	  return typeof it == 'function';
	}
	function assertDefined(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	}
	
	var $ = module.exports = __webpack_require__(8)({
	  g: global,
	  core: core,
	  html: global.document && document.documentElement,
	  // http://jsperf.com/core-js-isobject
	  isObject:   isObject,
	  isFunction: isFunction,
	  that: function(){
	    return this;
	  },
	  // 7.1.4 ToInteger
	  toInteger: toInteger,
	  // 7.1.15 ToLength
	  toLength: function(it){
	    return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	  },
	  toIndex: function(index, length){
	    index = toInteger(index);
	    return index < 0 ? max(index + length, 0) : min(index, length);
	  },
	  has: function(it, key){
	    return hasOwnProperty.call(it, key);
	  },
	  create:     Object.create,
	  getProto:   Object.getPrototypeOf,
	  DESC:       DESC,
	  desc:       desc,
	  getDesc:    Object.getOwnPropertyDescriptor,
	  setDesc:    defineProperty,
	  setDescs:   Object.defineProperties,
	  getKeys:    Object.keys,
	  getNames:   Object.getOwnPropertyNames,
	  getSymbols: Object.getOwnPropertySymbols,
	  assertDefined: assertDefined,
	  // Dummy, fix for not array-like ES3 string in es5 module
	  ES5Object: Object,
	  toObject: function(it){
	    return $.ES5Object(assertDefined(it));
	  },
	  hide: hide,
	  def: createDefiner(0),
	  set: global.Symbol ? simpleSet : hide,
	  each: [].forEach
	});
	/* eslint-disable no-undef */
	if(typeof __e != 'undefined')__e = core;
	if(typeof __g != 'undefined')__g = global;

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = function($){
	  $.FW   = false;
	  $.path = $.core;
	  return $;
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";
	
	exports["default"] = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};
	
	exports.__esModule = true;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/* global Node, NodeList, Element */
	
	'use strict';
	
	var _createClass = __webpack_require__(4)['default'];
	
	var _classCallCheck = __webpack_require__(9)['default'];
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	/**
	 * @type {string}
	 */
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
	var SERIALIZE_SEPARATOR = ';';
	
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
	         * @returns {Array.<HTMLElement>}
	         */
	        value: function nodeListFilter(nodes, func) {
	            return Array.prototype.filter.call(nodes || [], func);
	        }
	    }, {
	        key: 'guid',
	
	        /**
	         * Generates a unique id
	         * @return {String}
	         */
	        value: function guid() {
	            function s4() {
	                return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
	            }
	
	            return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
	        }
	    }, {
	        key: 'nodeIsEmpty',
	
	        /**
	         * Checks if a given node is empty
	         * @param {HTMLElement} node
	         * @returns {*}
	         */
	        value: function nodeIsEmpty(node) {
	            return node.nodeValue.match(/^[\s]*$/g);
	        }
	    }, {
	        key: 'index',
	
	        /**
	         * @param {HTMLElement} node
	         * @param [optionalList]
	         * @return {int} the index of this node in context to it's siblings
	         */
	        value: function index(node, optionalList) {
	            var children = optionalList || (node.nodeType === Node.TEXT_NODE ? node.parentNode.childNodes : node.parentNode.children);
	            return Array.prototype.indexOf.call(children || [], node);
	        }
	    }, {
	        key: 'wrap',
	
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
	    }, {
	        key: 'calcIndex',
	
	        /**
	         * Will calculate an index depending on an already modified dom by marklib
	         * @param {HTMLElement} node
	         * @returns {int|boolean}
	         */
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
	    }, {
	        key: 'parents',
	
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
	                if (optionalSelector && (element === optionalSelector || typeof optionalSelector === 'string' && element.matches && element.matches(optionalSelector))) {
	                    foundElements.push(element);
	                } else if (!optionalSelector) {
	                    foundElements.push(element);
	                }
	            }
	            return foundElements;
	        }
	    }, {
	        key: 'parent',
	
	        /**
	         * Finds a parent node (the closest) with a given selector
	         * @param {Node} el
	         * @param {String} selector
	         * @returns {Node|bool}
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
	    }, {
	        key: 'closest',
	
	        /**
	         * Finds the closest element including itself matching a given selector
	         * @param {Node} el
	         * @param selector
	         * @returns {Node|bool}
	         */
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
	    }, {
	        key: 'isMarkNode',
	
	        /**
	         * @param {HTMLElement} n
	         * @return {bool}
	         */
	        value: function isMarkNode(n) {
	            return n instanceof HTMLElement && n.hasAttribute(DATA_IS_SELECTION);
	        }
	    }, {
	        key: 'getPath',
	
	        /**
	         * Determines the correct paths and excludes all `marklib` generated content
	         * TODO: To improve performance we could shorten the path if an ID is present in it.
	         * @param {HTMLElement} el
	         * @param {HTMLElement} [context] if given extraction path is relative to this element
	         * @returns {string}
	         */
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
	
	            return path.replace('#document>', '').replace('>;', ';');
	        }
	    }]);
	
	    return Util;
	})();
	
	exports['default'] = Util;
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9ib3dsaW5neC9Qcm9qZWt0ZS9tYXJrbGliL25vZGVfbW9kdWxlcy9lc2xpbnQtbG9hZGVyL2luZGV4LmpzIS9Vc2Vycy9ib3dsaW5neC9Qcm9qZWt0ZS9tYXJrbGliL3NyYy9tYWluL3V0aWwvVXRpbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLFlBQVksQ0FBQzs7Ozs7Ozs7Ozs7O0FBS04sSUFBTSx3QkFBd0IsR0FBRyxxQkFBcUIsQ0FBQztRQUFqRCx3QkFBd0IsR0FBeEIsd0JBQXdCOzs7O0FBSTlCLElBQU0sV0FBVyxHQUFHLGdCQUFnQixDQUFDO1FBQS9CLFdBQVcsR0FBWCxXQUFXOzs7O0FBSWpCLElBQU0saUJBQWlCLEdBQUcsbUJBQW1CLENBQUM7UUFBeEMsaUJBQWlCLEdBQWpCLGlCQUFpQjs7OztBQUk5QixJQUFNLG1CQUFtQixHQUFHLEdBQUcsQ0FBQzs7O0FBR2hDLElBQUksT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUU7QUFDdkMsUUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQztBQUMxQixLQUFDLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxlQUFlLElBQ3pCLENBQUMsQ0FBQyxrQkFBa0IsSUFBSSxDQUFDLENBQUMsaUJBQWlCLElBQzNDLENBQUMsQ0FBQyxnQkFBZ0IsSUFBSSxDQUFDLENBQUMscUJBQXFCLENBQUM7Q0FDckQ7Ozs7Ozs7SUFPSyxJQUFJO2FBQUosSUFBSTs4QkFBSixJQUFJOzs7aUJBQUosSUFBSTs7Ozs7Ozs7O2VBT2Usd0JBQUMsS0FBSyxFQUFFLElBQUksRUFBRTtBQUMvQixtQkFBTyxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUN6RDs7Ozs7Ozs7ZUFPVSxnQkFBRztBQUNWLHFCQUFTLEVBQUUsR0FBRztBQUNWLHVCQUFPLElBQUksQ0FB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Q0FBQztpQkFDbkQ7O0FBRUQsb0JBQUksR0FBRyxJQUFJLElBQUksSUFBSSxHQUFHLEdBQUcsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFBLEFBQUMsQ0FBQzs7QUFHdkMsb0JBQUksTUFBTSxLQUFLLE9BQU8sRUFBRTtBQUNwQiwwQkFBTTtpQkFDVDs7QUFFRCxvQkFBSSxHQUFHLE1BQU0sQ0FBQzthQUNqQjs7QUFFRCxtQkFBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQzVEOzs7V0FyUEMsSUFBSTs7O3FCQUFKLElBQUkiLCJmaWxlIjoiL1VzZXJzL2Jvd2xpbmd4L1Byb2pla3RlL21hcmtsaWIvbm9kZV9tb2R1bGVzL2VzbGludC1sb2FkZXIvaW5kZXguanMhL1VzZXJzL2Jvd2xpbmd4L1Byb2pla3RlL21hcmtsaWIvc3JjL21haW4vdXRpbC9VdGlsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZ2xvYmFsIE5vZGUsIE5vZGVMaXN0LCBFbGVtZW50ICovXG5cbid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBAdHlwZSB7c3RyaW5nfVxuICovXG5leHBvcnQgY29uc3QgQVRUUl9EQVRBX09SSUdJTkFMX0lOREVYID0gJ2RhdGEtb3JpZ2luYWwtaW5kZXgnO1xuLyoqXG4gKiBAdHlwZSB7c3RyaW5nfVxuICovXG5leHBvcnQgY29uc3QgREFUQV9QU0VVRE8gPSAnZGF0YS1pcy1wc2V1ZG8nO1xuLyoqXG4gKiBAdHlwZSB7c3RyaW5nfVxuICovXG5leHBvcnQgY29uc3QgREFUQV9JU19TRUxFQ1RJT04gPSAnZGF0YS1pcy1zZWxlY3Rpb24nO1xuLyoqXG4gKiBAdHlwZSB7c3RyaW5nfVxuICovXG5jb25zdCBTRVJJQUxJWkVfU0VQQVJBVE9SID0gXCI7XCI7XG5cbi8vIHBvbHlmaWxsIGZvciBtYXRjaGVzU2VsZWN0b3IsIElFIDEwLzExIGRvZXMgbm90IHN1cHBvcnQgRWxlbWVudC5tYXRjaGVzXG5pZiAoRWxlbWVudCAmJiAhRWxlbWVudC5wcm90b3R5cGUubWF0Y2hlcykge1xuICAgIHZhciBwID0gRWxlbWVudC5wcm90b3R5cGU7XG4gICAgcC5tYXRjaGVzID0gcC5tYXRjaGVzU2VsZWN0b3IgfHxcbiAgICAgICAgcC5tb3pNYXRjaGVzU2VsZWN0b3IgfHwgcC5tc01hdGNoZXNTZWxlY3RvciB8fFxuICAgICAgICBwLm9NYXRjaGVzU2VsZWN0b3IgfHwgcC53ZWJraXRNYXRjaGVzU2VsZWN0b3I7XG59XG5cbi8qKlxuICogVXRpbGl0eSBjbGFzc1xuICogQ29udGFpbnMgRE9NL05vZGUgbWFuaXB1bGF0aW9uIGhlbHBlcnNcbiAqL1xuZXhwb3J0IGRlZmF1bHRcbmNsYXNzIFV0aWwge1xuICAgIC8qKlxuICAgICAqIEZpbHRlciBmb3IgYSBOb2RlTGlzdFxuICAgICAqIEBwYXJhbSB7Tm9kZUxpc3R9IG5vZGVzXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuY1xuICAgICAqIEByZXR1cm5zIHtBcnJheS48SFRNTEVsZW1lbnQ+fVxuICAgICAqL1xuICAgIHN0YXRpYyBub2RlTGlzdEZpbHRlcihub2RlcywgZnVuYykge1xuICAgICAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLmZpbHRlci5jYWxsKG5vZGVzIHx8IFtdLCBmdW5jKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEdlbmVyYXRlcyBhIHVuaXF1ZSBpZFxuICAgICAqIEByZXR1cm4ge1N0cmluZ31cbiAgICAgKi9cbiAgICBzdGF0aWMgZ3VpZCgpIHtcbiAgICAgICAgZnVuY3Rpb24gczQoKSB7XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5mbG9vcigoMSArIE1hdGgucmFuZG9tKCkpICogMHgxMDAwMClcbiAgICAgICAgICAgICAgICAudG9TdHJpbmcoMTYpXG4gICAgICAgICAgICAgICAgLnN1YnN0cmluZygxKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzNCgpICsgczQoKSArICctJyArIHM0KCkgKyAnLScgKyBzNCgpICsgJy0nICtcbiAgICAgICAgICAgIHM0KCkgKyAnLScgKyBzNCgpICsgczQoKSArIHM0KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIGEgZ2l2ZW4gbm9kZSBpcyBlbXB0eVxuICAgICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IG5vZGVcbiAgICAgKiBAcmV0dXJucyB7Kn1cbiAgICAgKi9cbiAgICBzdGF0aWMgbm9kZUlzRW1wdHkobm9kZSkge1xuICAgICAgICByZXR1cm4gbm9kZS5ub2RlVmFsdWUubWF0Y2goL15bXFxzXSokL2cpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gbm9kZVxuICAgICAqIEBwYXJhbSBbb3B0aW9uYWxMaXN0XVxuICAgICAqIEByZXR1cm4ge2ludH0gdGhlIGluZGV4IG9mIHRoaXMgbm9kZSBpbiBjb250ZXh0IHRvIGl0J3Mgc2libGluZ3NcbiAgICAgKi9cbiAgICBzdGF0aWMgaW5kZXgobm9kZSwgb3B0aW9uYWxMaXN0KSB7XG4gICAgICAgIGNvbnN0IGNoaWxkcmVuID0gb3B0aW9uYWxMaXN0IHx8IChub2RlLm5vZGVUeXBlID09PSBOb2RlLlRFWFRfTk9ERSA/XG4gICAgICAgICAgICAgICAgbm9kZS5wYXJlbnROb2RlLmNoaWxkTm9kZXMgOiBub2RlLnBhcmVudE5vZGUuY2hpbGRyZW4pO1xuICAgICAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLmluZGV4T2YuY2FsbChjaGlsZHJlbiB8fCBbXSwgbm9kZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogV3JhcHMgZ2l2ZW4gYGVsbXNgIGluIGdpdmVuIGB3cmFwcGVyYFxuICAgICAqXG4gICAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gd3JhcHBlclxuICAgICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR8QXJyYXkuPEhUTUxFbGVtZW50Pn0gZWxtc1xuICAgICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICAgICAqL1xuICAgIHN0YXRpYyB3cmFwKGVsbXMsIHdyYXBwZXIpIHtcbiAgICAgICAgaWYgKCFlbG1zKSB7XG4gICAgICAgICAgICByZXR1cm4gd3JhcHBlcjtcbiAgICAgICAgfVxuICAgICAgICAvLyBDb252ZXJ0IGBlbG1zYCB0byBhbiBhcnJheSwgaWYgbmVjZXNzYXJ5LlxuICAgICAgICBpZiAoIShlbG1zIGluc3RhbmNlb2YgTm9kZUxpc3QgfHwgZWxtcyBpbnN0YW5jZW9mIEFycmF5KSkge1xuICAgICAgICAgICAgZWxtcyA9IFtlbG1zXTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKHZhciBpID0gZWxtcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgY29uc3QgY2hpbGQgPSAoaSA+IDApID8gd3JhcHBlci5jbG9uZU5vZGUodHJ1ZSkgOiB3cmFwcGVyO1xuICAgICAgICAgICAgY29uc3QgZWwgPSBlbG1zW2ldO1xuICAgICAgICAgICAgLy8gQ2FjaGUgdGhlIGN1cnJlbnQgcGFyZW50IGFuZCBzaWJsaW5nLlxuICAgICAgICAgICAgY29uc3QgcGFyZW50ID0gZWwucGFyZW50Tm9kZSwgc2libGluZyA9IGVsLm5leHRTaWJsaW5nO1xuXG4gICAgICAgICAgICBjaGlsZC5hcHBlbmRDaGlsZChlbCk7XG4gICAgICAgICAgICBpZiAoc2libGluZykge1xuICAgICAgICAgICAgICAgIHBhcmVudC5pbnNlcnRCZWZvcmUoY2hpbGQsIHNpYmxpbmcpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBwYXJlbnQuYXBwZW5kQ2hpbGQoY2hpbGQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB3cmFwcGVyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFdpbGwgY2FsY3VsYXRlIGFuIGluZGV4IGRlcGVuZGluZyBvbiBhbiBhbHJlYWR5IG1vZGlmaWVkIGRvbSBieSBtYXJrbGliXG4gICAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gbm9kZVxuICAgICAqIEByZXR1cm5zIHtpbnR8Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBzdGF0aWMgY2FsY0luZGV4KG5vZGUpIHtcbiAgICAgICAgbGV0IGNhbGN1bGF0ZWRJbmRleCA9IDAsXG4gICAgICAgICAgICBmb3VuZFdyYXBwZXIgPSBmYWxzZTtcbiAgICAgICAgY29uc3Qgbm9kZXMgPSBub2RlLnBhcmVudE5vZGUuY2hpbGROb2RlcywgbGVuZ3RoID0gbm9kZXMubGVuZ3RoO1xuICAgICAgICBmb3IgKGxldCB0aGlzSW5kZXggPSAwOyB0aGlzSW5kZXggPCBsZW5ndGg7IHRoaXNJbmRleCsrKSB7XG4gICAgICAgICAgICBjb25zdCBlbCA9IG5vZGVzW3RoaXNJbmRleF07XG4gICAgICAgICAgICBpZiAoZWwgPT09IG5vZGUpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIHJlc2V0IGluZGV4IHdoZW4gb3JpZ2luYWwgaW5kZXggaXMgZm91bmRcbiAgICAgICAgICAgIGNvbnN0IG1heWJlSW5kZXhPZk9yaWdpbmFsID0gZWwuZ2V0QXR0cmlidXRlID8gZWwuZ2V0QXR0cmlidXRlKEFUVFJfREFUQV9PUklHSU5BTF9JTkRFWCkgOiBudWxsO1xuXG4gICAgICAgICAgICBpZiAobWF5YmVJbmRleE9mT3JpZ2luYWwpIHtcbiAgICAgICAgICAgICAgICBjYWxjdWxhdGVkSW5kZXggPSBwYXJzZUludChtYXliZUluZGV4T2ZPcmlnaW5hbCk7XG4gICAgICAgICAgICAgICAgZm91bmRXcmFwcGVyID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhbGN1bGF0ZWRJbmRleCsrO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmb3VuZFdyYXBwZXIgPyBjYWxjdWxhdGVkSW5kZXggOiBVdGlsLmluZGV4KG5vZGUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IFtvcHRpb25hbFNlbGVjdG9yXSB3aWxsIHRlc3QgZ2l2ZW4gZWxlbWVudCBhZ2FpbnN0IGEgc2VsZWN0b3JcbiAgICAgKiAgaWYgbWF0Y2hlcywgcmV0dXJucyB0aGlzIGVsZW1lbnQgaW1tZWRpYXRlbHlcbiAgICAgKiBAcmV0dXJuIHtBcnJheS48SFRNTEVsZW1lbnQ+fSBhbiBhcnJheSBvZiBhbGwgZm91bmQgcGFyZW50cyBvZiBnaXZlbiBlbGVtZW50IChhbmQgb3B0aW9uYWwgc2VsZWN0b3IpXG4gICAgICovXG4gICAgc3RhdGljIHBhcmVudHMoZWwsIG9wdGlvbmFsU2VsZWN0b3IpIHtcbiAgICAgICAgbGV0IGVsZW1lbnQgPSBlbDtcbiAgICAgICAgY29uc3QgZm91bmRFbGVtZW50cyA9IFtdO1xuICAgICAgICB3aGlsZSAoZWxlbWVudC5wYXJlbnROb2RlICE9PSBudWxsKSB7XG4gICAgICAgICAgICBlbGVtZW50ID0gZWxlbWVudC5wYXJlbnROb2RlO1xuICAgICAgICAgICAgaWYgKG9wdGlvbmFsU2VsZWN0b3IgJiYgKChlbGVtZW50ID09PSBvcHRpb25hbFNlbGVjdG9yKSB8fFxuICAgICAgICAgICAgICAgICggKHR5cGVvZiBvcHRpb25hbFNlbGVjdG9yID09PSAnc3RyaW5nJykgJiYgZWxlbWVudC5tYXRjaGVzICYmIGVsZW1lbnQubWF0Y2hlcyhvcHRpb25hbFNlbGVjdG9yKSkpKSB7XG4gICAgICAgICAgICAgICAgZm91bmRFbGVtZW50cy5wdXNoKGVsZW1lbnQpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICghb3B0aW9uYWxTZWxlY3Rvcikge1xuICAgICAgICAgICAgICAgIGZvdW5kRWxlbWVudHMucHVzaChlbGVtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZm91bmRFbGVtZW50cztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGaW5kcyBhIHBhcmVudCBub2RlICh0aGUgY2xvc2VzdCkgd2l0aCBhIGdpdmVuIHNlbGVjdG9yXG4gICAgICogQHBhcmFtIHtOb2RlfSBlbFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBzZWxlY3RvclxuICAgICAqIEByZXR1cm5zIHtOb2RlfGJvb2x9XG4gICAgICovXG4gICAgc3RhdGljIHBhcmVudChlbCwgc2VsZWN0b3IpIHtcbiAgICAgICAgbGV0IGVsZW1lbnQgPSBlbDtcbiAgICAgICAgd2hpbGUgKGVsZW1lbnQucGFyZW50Tm9kZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgZWxlbWVudCA9IGVsZW1lbnQucGFyZW50Tm9kZTtcbiAgICAgICAgICAgIGlmIChlbGVtZW50Lm1hdGNoZXMgJiYgZWxlbWVudC5tYXRjaGVzKHNlbGVjdG9yKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBlbGVtZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGaW5kcyB0aGUgY2xvc2VzdCBlbGVtZW50IGluY2x1ZGluZyBpdHNlbGYgbWF0Y2hpbmcgYSBnaXZlbiBzZWxlY3RvclxuICAgICAqIEBwYXJhbSB7Tm9kZX0gZWxcbiAgICAgKiBAcGFyYW0gc2VsZWN0b3JcbiAgICAgKiBAcmV0dXJucyB7Tm9kZXxib29sfVxuICAgICAqL1xuICAgIHN0YXRpYyBjbG9zZXN0KGVsLCBzZWxlY3Rvcikge1xuICAgICAgICBsZXQgZWxlbWVudCA9IGVsO1xuICAgICAgICB3aGlsZSAoZWxlbWVudCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKGVsZW1lbnQubWF0Y2hlcyAmJiBlbGVtZW50Lm1hdGNoZXMoc2VsZWN0b3IpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbGVtZW50ID0gZWxlbWVudC5wYXJlbnROb2RlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBuXG4gICAgICogQHJldHVybiB7Ym9vbH1cbiAgICAgKi9cbiAgICBzdGF0aWMgaXNNYXJrTm9kZShuKSB7XG4gICAgICAgIHJldHVybiBuIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgJiYgbi5oYXNBdHRyaWJ1dGUoREFUQV9JU19TRUxFQ1RJT04pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERldGVybWluZXMgdGhlIGNvcnJlY3QgcGF0aHMgYW5kIGV4Y2x1ZGVzIGFsbCBgbWFya2xpYmAgZ2VuZXJhdGVkIGNvbnRlbnRcbiAgICAgKiBUT0RPOiBUbyBpbXByb3ZlIHBlcmZvcm1hbmNlIHdlIGNvdWxkIHNob3J0ZW4gdGhlIHBhdGggaWYgYW4gSUQgaXMgcHJlc2VudCBpbiBpdC5cbiAgICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbFxuICAgICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IFtjb250ZXh0XSBpZiBnaXZlbiBleHRyYWN0aW9uIHBhdGggaXMgcmVsYXRpdmUgdG8gdGhpcyBlbGVtZW50XG4gICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0UGF0aChlbCwgY29udGV4dCkge1xuICAgICAgICB2YXIgcGF0aCA9IG51bGwsIG5vZGUgPSBlbDtcblxuICAgICAgICBjb25zdCBmaWx0ZXJTaWJsaW5ncyA9ICh0aGlzRWwpID0+IHtcbiAgICAgICAgICAgIHJldHVybiAhVXRpbC5pc01hcmtOb2RlKHRoaXNFbCkgJiYgdGhpc0VsLm5vZGVOYW1lID09PSBub2RlLm5vZGVOYW1lO1xuICAgICAgICB9O1xuXG4gICAgICAgIHdoaWxlIChub2RlKSB7XG4gICAgICAgICAgICB2YXIgbmFtZSA9IG51bGw7XG4gICAgICAgICAgICAvLyBJZiBub2RlIGlzIGEgdGV4dC1ub2RlLCBzYXZlIGluZGV4XG4gICAgICAgICAgICBpZiAoTm9kZS5URVhUX05PREUgPT09IG5vZGUubm9kZVR5cGUpIHtcblxuICAgICAgICAgICAgICAgIC8qIEJlY2F1c2Ugbm9kZXMgbWF5IHdyYXBwZWQgaW5zaWRlIGEgaGlnaGxpZ2h0aW5nIG5vZGUsIHdlIG5lZWQgdG8gZmluZCB0aGUgb3JpZ2luYWwgaW5kZXggdGhhdCB3YXNcbiAgICAgICAgICAgICAgICAgKiB2YWxpZCBiZWZvcmUgdGhlIGRvbSBjaGFuZ2VzLiBXZSBzdG9yZSB0aGUgbGFzdCBrbm93biBpbmRleCBwb3NpdGlvbiBpbnNpZGUgYWxsIHdyYXBwZXIgZWxlbWVudHNcbiAgICAgICAgICAgICAgICAgKiBXZSBzZWxlY3QgdGhlIG91dGVybW9zdFxuICAgICAgICAgICAgICAgICAqL1xuXG4gICAgICAgICAgICAgICAgLy8gRXh0cmFjdCBvcmlnaW5hbCBpbmRleCBvZiB0aGlzIG5vZGU6XG4gICAgICAgICAgICAgICAgLy8gT3V0ZXIgbW9zdCBkYXRhLW9yaWdpbmFsLWluZGV4IGlzIG9yaWdpbmFsIGluZGV4XG4gICAgICAgICAgICAgICAgY29uc3Qgb3V0ZXJNb3N0RWxlbWVudCA9IFV0aWwucGFyZW50cyhub2RlLCAnWycgKyBBVFRSX0RBVEFfT1JJR0lOQUxfSU5ERVggKyAnXScpLnJldmVyc2UoKVswXTtcbiAgICAgICAgICAgICAgICAvLyBpZiBlbGVtZW50IGlzIG5vdCB5ZXQgd3JhcHBlZCBpbiBzcGFuLCByZWNhbGN1bGF0ZSBpbmRleCBiYXNlZCBvbiBwYXJlbnQgY29udGFpbmVyOlxuICAgICAgICAgICAgICAgIC8vIFdlIGhhdmUgdG8gZG8gdGhpcyBiZWNhdXNlIHRleHQgbm9kZSBpbmRleGVzICE9IGVsZW1lbnQgaW5kZXhlcy4uLlxuICAgICAgICAgICAgICAgIGxldCBjYWxjdWxhdGVkSW5kZXggPSAwO1xuICAgICAgICAgICAgICAgIGlmICghb3V0ZXJNb3N0RWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICBjYWxjdWxhdGVkSW5kZXggPSBVdGlsLmNhbGNJbmRleChub2RlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgaW5kZXggPSBvdXRlck1vc3RFbGVtZW50ID8gcGFyc2VJbnQoXG4gICAgICAgICAgICAgICAgICAgIG91dGVyTW9zdEVsZW1lbnQuZ2V0QXR0cmlidXRlKEFUVFJfREFUQV9PUklHSU5BTF9JTkRFWCkpIDogY2FsY3VsYXRlZEluZGV4O1xuICAgICAgICAgICAgICAgIG5hbWUgPSBTRVJJQUxJWkVfU0VQQVJBVE9SICsgaW5kZXg7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG5hbWUgPSBub2RlLm5vZGVOYW1lO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIW5hbWUpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbmFtZSA9IG5hbWUudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICAgICAgdmFyIHBhcmVudCA9IG5vZGUucGFyZW50Tm9kZTtcblxuICAgICAgICAgICAgaWYgKFV0aWwuaXNNYXJrTm9kZShub2RlKSkge1xuICAgICAgICAgICAgICAgIGlmKHBhcmVudCAhPT0gY29udGV4dCkge1xuICAgICAgICAgICAgICAgICAgICBub2RlID0gcGFyZW50O1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFNlbGVjdCBvbmx5IHNpYmxpbmdzIHRoYXQgYXJlIG5vdCBwYXJ0IG9mIHNlbGVjdGlvbiBhbmQgYXJlIG9mIHRoZSBzYW1lIHR5cGVcbiAgICAgICAgICAgIC8vIChiZWNhdXNlIHdlIHVzZSBudGgtb2YtdHlwZSBzZWxlY3RvciBsYXRlcilcbiAgICAgICAgICAgIGNvbnN0IHNpYmxpbmdzID0gVXRpbC5ub2RlTGlzdEZpbHRlcihwYXJlbnQuY2hpbGRyZW4sIGZpbHRlclNpYmxpbmdzKSxcbiAgICAgICAgICAgICAgICBub2RlSW5kZXggPSBVdGlsLmluZGV4KG5vZGUsIHNpYmxpbmdzKTtcblxuICAgICAgICAgICAgaWYgKHNpYmxpbmdzLmxlbmd0aCA+IDEgJiYgbm9kZUluZGV4ID49IDApIHtcbiAgICAgICAgICAgICAgICBuYW1lICs9ICc6bnRoLW9mLXR5cGUoJyArIChub2RlSW5kZXggKyAxKSArICcpJztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcGF0aCA9IG5hbWUgKyAocGF0aCA/ICc+JyArIHBhdGggOiAnJyk7XG5cblxuICAgICAgICAgICAgaWYgKHBhcmVudCA9PT0gY29udGV4dCkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBub2RlID0gcGFyZW50O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHBhdGgucmVwbGFjZShcIiNkb2N1bWVudD5cIiwgXCJcIikucmVwbGFjZSgnPjsnLCAnOycpO1xuICAgIH1cblxufVxuIl19

/***/ }
/******/ ])
});
;
//# sourceMappingURL=marklib.map