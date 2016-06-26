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

	module.exports = __webpack_require__(119);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.registerEvents = exports.RenderingEvents = exports.RenderResult = exports.Util = exports.Rendering = undefined;
	
	var _Rendering = __webpack_require__(2);
	
	var _Rendering2 = _interopRequireDefault(_Rendering);
	
	var _Util = __webpack_require__(118);
	
	var _Util2 = _interopRequireDefault(_Util);
	
	var _RenderResult = __webpack_require__(85);
	
	var _RenderResult2 = _interopRequireDefault(_RenderResult);
	
	var _RenderingEvents = __webpack_require__(86);
	
	var _RenderingEvents2 = _interopRequireDefault(_RenderingEvents);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.Rendering = _Rendering2.default;
	exports.Util = _Util2.default;
	exports.RenderResult = _RenderResult2.default;
	exports.RenderingEvents = _RenderingEvents2.default;
	exports.registerEvents = _RenderingEvents.registerEvents;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.EVENT_WRAPPED_NODE = exports.ATTR_DATA_ORIGINAL_OFFSET_START = undefined;
	
	var _classCallCheck2 = __webpack_require__(3);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(4);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(23);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(77);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _RenderResult = __webpack_require__(85);
	
	var _RenderResult2 = _interopRequireDefault(_RenderResult);
	
	var _RenderingEvents2 = __webpack_require__(86);
	
	var _RenderingEvents3 = _interopRequireDefault(_RenderingEvents2);
	
	var _Util = __webpack_require__(118);
	
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
	
	var Rendering = function (_RenderingEvents) {
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
	
	    var _this = (0, _possibleConstructorReturn3.default)(this, _RenderingEvents.call(this, options, document));
	
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
	
	
	  Rendering.prototype.getId = function getId() {
	    return this.id;
	  };
	
	  /**
	   * @param {string} id
	   * @returns {Rendering}
	   */
	
	
	  Rendering.prototype.setId = function setId(id) {
	    var _this2 = this;
	
	    this.id = id;
	
	    if (this._renderResult) {
	      this.wrapperNodes.forEach(function (node) {
	        return node.setAttribute(ATTR_DATA_ID, _this2.id);
	      });
	    }
	
	    return this;
	  };
	
	  /**
	   * Creates a Template used as a wrapper and an indication that this is a highlight node
	   * @param {Boolean} [omitHighlight]
	   * @returns {Node}
	   * @private
	   */
	
	
	  Rendering.prototype._createWrapTemplate = function _createWrapTemplate(omitHighlight) {
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
	  };
	
	  /**
	   * Creates a Template to use as start and end marks
	   * @param {String} text
	   * @returns {Node}
	   * @private
	   */
	
	
	  Rendering.prototype._createStartEndWrapTemplate = function _createStartEndWrapTemplate(text) {
	    var el = this._createWrapTemplate();
	    el.setAttribute(ATTR_DATA_START_END, 'true');
	    el.textContent = text;
	    return el;
	  };
	
	  /**
	   * Creates Start or End Container Element
	   * @param initialNode
	   * @param text
	   * @param offset
	   * @param index
	   * @returns {Node}
	   */
	
	
	  Rendering.prototype._createStartOrEndContainer = function _createStartOrEndContainer(initialNode, text, offset, index) {
	    var wrapper = this._createStartEndWrapTemplate(text);
	    wrapper.setAttribute(_Util.ATTR_DATA_ORIGINAL_INDEX, _Util2.default.getIndexParentIfHas(initialNode, index));
	    wrapper.setAttribute(ATTR_DATA_ORIGINAL_OFFSET_START, offset);
	    wrapper.setAttribute(DATA_ORIGINAL_TEXT_NODE_INDEX, index);
	
	    return wrapper;
	  };
	
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
	
	
	  Rendering.prototype._createWrap = function _createWrap(el, optionalLength, optionalIndex, optionalIsSameNode, omitHighlight) {
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
	  };
	
	  /**
	   * Create split container element
	   * @param originalElement {Node} original text node element that is created a wrapper for
	   * @param index
	   * @param offset
	   * @returns {Node}
	   */
	
	
	  Rendering.prototype._createSplitContainer = function _createSplitContainer(originalElement, index, offset) {
	    var wrapper = this.document.createElement(TAG_NAME);
	    wrapper.setAttribute(_Util.DATA_IS_SELECTION, 'true');
	    wrapper.setAttribute(_Util.ATTR_DATA_ORIGINAL_INDEX, _Util2.default.getIndexParentIfHas(originalElement, index));
	    wrapper.setAttribute(ATTR_DATA_ORIGINAL_OFFSET_START, offset);
	    wrapper.setAttribute(DATA_ORIGINAL_TEXT_NODE_INDEX, index);
	    return wrapper;
	  };
	
	  /**
	   * Walks the tree
	   * @param start
	   * @param endContainer
	   * @param nextParent
	   */
	
	
	  Rendering.prototype.walk = function walk(start, endContainer, nextParent) {
	    var nextParentNode = start;
	    while (nextParentNode && nextParentNode !== nextParent.parentNode) {
	      var currentParentNode = nextParentNode;
	      nextParentNode = nextParentNode.parentNode;
	      if (this.wrapSiblings(currentParentNode.nextSibling, endContainer)) {
	        break;
	      }
	    }
	  };
	
	  /**
	   * Will Wrap all textNode siblings of a container (start) inside a defined Element (like a span)
	   * If an Element node is found, it will wrap all children of this node inside a element as well.
	   * It will stop if endContainer is found as a node
	   *
	   * @param {Node} start
	   * @param {Node} endContainer
	   * @returns {boolean} (true if endContainer was found)
	   */
	
	
	  Rendering.prototype.wrapSiblings = function wrapSiblings(start, endContainer) {
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
	  };
	
	  /**
	   * Marks text of the same node
	   * @param {Node} textNode
	   * @param {int} startIndex
	   * @param {int} endIndex
	   * @private
	   */
	
	
	  Rendering.prototype._markTextSameNode = function _markTextSameNode(textNode, startIndex, endIndex) {
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
	  };
	
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
	
	
	  Rendering.prototype._markTextDifferentNode = function _markTextDifferentNode(startContainer, endContainer, startOffset, endOffset) {
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
	  };
	
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
	
	
	  Rendering.prototype._renderWithElements = function _renderWithElements(startContainerP, endContainerP, commonAncestor, startOffset, endOffsetP) {
	    if (this._renderResult) {
	      return this._renderResult;
	    }
	    var startContainer = startContainerP;
	    var endContainer = endContainerP;
	    var endOffset = endOffsetP;
	    var outer = _Util2.default.parents(startContainer, commonAncestor);
	    outer = outer[outer.length - 1];
	    var contextContainer = outer || commonAncestor;
	
	    // Same Element, means the selection is fully contained in a discrete area,
	    // start and endpoint have the same parent
	    // but are different nodes:
	
	    // Start and End offset have to be recalculated because dom might be already changed by
	    // highlighting in given node
	    // 1: First detect real start offset in startContainer:
	
	    // That works by selecting the highest wrapper and get original-offset-start data element,
	    // see "findOriginalOffset"
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
	  };
	
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
	
	
	  Rendering.prototype._renderSelection = function _renderSelection(startContainer, endContainer, startOffset, endOffset, contextContainer, outer) {
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
	  };
	
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
	
	
	  Rendering.prototype.renderWithPath = function renderWithPath(startPath, endPath) {
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
	  };
	
	  /**
	   * @returns {RenderResult}
	   */
	
	
	  /**
	   * Renders a result (that returned from `renderWithRange`)
	   * @param {RenderResult|Object} result
	   * @returns {string}
	   */
	
	  Rendering.prototype.renderWithResult = function renderWithResult(result) {
	    return this.renderWithPath(result.startContainerPath + ';' + result.startOffset, result.endContainerPath + ';' + result.endOffset);
	  };
	
	  /**
	   * Prepares a selection with a range object
	   * @param {Range} range
	   * @returns {Object}
	   */
	
	
	  Rendering.prototype.renderWithRange = function renderWithRange(range) {
	    var text = range.toString();
	    var result = this._renderWithElements(range.startContainer, range.endContainer, range.commonAncestorContainer, range.startOffset, range.endOffset);
	    result.text = text;
	    return result;
	  };
	
	  /**
	   * Removes bindings and classNames to nodes
	   */
	
	
	  Rendering.prototype.destroy = function destroy() {
	    this.wrapperNodes.forEach(function (node) {
	      delete node.marklibInstance;
	      node.className = '';
	    });
	    this.removeEvent();
	  };
	
	  /**
	   * @param {Node} el
	   * @param {Rendering} instance
	   * @returns {Node}
	   */
	
	
	  Rendering.setMarklibInstance = function setMarklibInstance(el, instance) {
	    el.marklibInstance = instance;
	    return el;
	  };
	
	  /**
	   * @param {Node} el
	   * @returns {Rendering|null|undefined}
	   */
	
	
	  Rendering.getMarklibInstance = function getMarklibInstance(el) {
	    return el ? el.marklibInstance : null;
	  };
	
	  (0, _createClass3.default)(Rendering, [{
	    key: 'result',
	    get: function get() {
	      return this._renderResult;
	    }
	  }]);
	  return Rendering;
	}(_RenderingEvents3.default);
	
	exports.default = Rendering;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	
	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _defineProperty = __webpack_require__(5);
	
	var _defineProperty2 = _interopRequireDefault(_defineProperty);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function () {
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
	}();

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(6), __esModule: true };

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(7);
	var $Object = __webpack_require__(10).Object;
	module.exports = function defineProperty(it, key, desc){
	  return $Object.defineProperty(it, key, desc);
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(8);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(18), 'Object', {defineProperty: __webpack_require__(14).f});

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(9)
	  , core      = __webpack_require__(10)
	  , ctx       = __webpack_require__(11)
	  , hide      = __webpack_require__(13)
	  , PROTOTYPE = 'prototype';
	
	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE]
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(a, b, c){
	        if(this instanceof C){
	          switch(arguments.length){
	            case 0: return new C;
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if(IS_PROTO){
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 9 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 10 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(12);
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
/* 12 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(14)
	  , createDesc = __webpack_require__(22);
	module.exports = __webpack_require__(18) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(15)
	  , IE8_DOM_DEFINE = __webpack_require__(17)
	  , toPrimitive    = __webpack_require__(21)
	  , dP             = Object.defineProperty;
	
	exports.f = __webpack_require__(18) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(16);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(18) && !__webpack_require__(19)(function(){
	  return Object.defineProperty(__webpack_require__(20)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(19)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(16)
	  , document = __webpack_require__(9).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(16);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 22 */
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
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _typeof2 = __webpack_require__(24);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function (self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }
	
	  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _iterator = __webpack_require__(25);
	
	var _iterator2 = _interopRequireDefault(_iterator);
	
	var _symbol = __webpack_require__(61);
	
	var _symbol2 = _interopRequireDefault(_symbol);
	
	var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default ? "symbol" : typeof obj; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
	} : function (obj) {
	  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(26), __esModule: true };

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(27);
	__webpack_require__(56);
	module.exports = __webpack_require__(60).f('iterator');

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(28)(true);
	
	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(31)(String, 'String', function(iterated){
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
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(29)
	  , defined   = __webpack_require__(30);
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
/* 29 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 30 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(32)
	  , $export        = __webpack_require__(8)
	  , redefine       = __webpack_require__(33)
	  , hide           = __webpack_require__(13)
	  , has            = __webpack_require__(34)
	  , Iterators      = __webpack_require__(35)
	  , $iterCreate    = __webpack_require__(36)
	  , setToStringTag = __webpack_require__(52)
	  , getPrototypeOf = __webpack_require__(54)
	  , ITERATOR       = __webpack_require__(53)('iterator')
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
	    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
	    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
	    , methods, key, IteratorPrototype;
	  // Fix native
	  if($anyNative){
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
	    if(IteratorPrototype !== Object.prototype){
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if(DEF_VALUES && $native && $native.name !== VALUES){
	    VALUES_BUG = true;
	    $default = function values(){ return $native.call(this); };
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
	      values:  DEF_VALUES ? $default : getMethod(VALUES),
	      keys:    IS_SET     ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 32 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(13);

/***/ },
/* 34 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 35 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(37)
	  , descriptor     = __webpack_require__(22)
	  , setToStringTag = __webpack_require__(52)
	  , IteratorPrototype = {};
	
	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(13)(IteratorPrototype, __webpack_require__(53)('iterator'), function(){ return this; });
	
	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(15)
	  , dPs         = __webpack_require__(38)
	  , enumBugKeys = __webpack_require__(50)
	  , IE_PROTO    = __webpack_require__(47)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';
	
	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(20)('iframe')
	    , i      = enumBugKeys.length
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(51).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write('<script>document.F=Object</script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};
	
	module.exports = Object.create || function create(O, Properties){
	  var result;
	  if(O !== null){
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty;
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(14)
	  , anObject = __webpack_require__(15)
	  , getKeys  = __webpack_require__(39);
	
	module.exports = __webpack_require__(18) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(40)
	  , enumBugKeys = __webpack_require__(50);
	
	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(34)
	  , toIObject    = __webpack_require__(41)
	  , arrayIndexOf = __webpack_require__(44)(false)
	  , IE_PROTO     = __webpack_require__(47)('IE_PROTO');
	
	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(42)
	  , defined = __webpack_require__(30);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(43);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 43 */
/***/ function(module, exports) {

	var toString = {}.toString;
	
	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(41)
	  , toLength  = __webpack_require__(45)
	  , toIndex   = __webpack_require__(46);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(29)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(29)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(48)('keys')
	  , uid    = __webpack_require__(49);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(9)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 49 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 50 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(9).document && document.documentElement;

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(14).f
	  , has = __webpack_require__(34)
	  , TAG = __webpack_require__(53)('toStringTag');
	
	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(48)('wks')
	  , uid        = __webpack_require__(49)
	  , Symbol     = __webpack_require__(9).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';
	
	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};
	
	$exports.store = store;

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(34)
	  , toObject    = __webpack_require__(55)
	  , IE_PROTO    = __webpack_require__(47)('IE_PROTO')
	  , ObjectProto = Object.prototype;
	
	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(30);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(57);
	var global        = __webpack_require__(9)
	  , hide          = __webpack_require__(13)
	  , Iterators     = __webpack_require__(35)
	  , TO_STRING_TAG = __webpack_require__(53)('toStringTag');
	
	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype;
	  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(58)
	  , step             = __webpack_require__(59)
	  , Iterators        = __webpack_require__(35)
	  , toIObject        = __webpack_require__(41);
	
	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(31)(Array, 'Array', function(iterated, kind){
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
/* 58 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 59 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	exports.f = __webpack_require__(53);

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(62), __esModule: true };

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(63);
	__webpack_require__(74);
	__webpack_require__(75);
	__webpack_require__(76);
	module.exports = __webpack_require__(10).Symbol;

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var global         = __webpack_require__(9)
	  , has            = __webpack_require__(34)
	  , DESCRIPTORS    = __webpack_require__(18)
	  , $export        = __webpack_require__(8)
	  , redefine       = __webpack_require__(33)
	  , META           = __webpack_require__(64).KEY
	  , $fails         = __webpack_require__(19)
	  , shared         = __webpack_require__(48)
	  , setToStringTag = __webpack_require__(52)
	  , uid            = __webpack_require__(49)
	  , wks            = __webpack_require__(53)
	  , wksExt         = __webpack_require__(60)
	  , wksDefine      = __webpack_require__(65)
	  , keyOf          = __webpack_require__(66)
	  , enumKeys       = __webpack_require__(67)
	  , isArray        = __webpack_require__(70)
	  , anObject       = __webpack_require__(15)
	  , toIObject      = __webpack_require__(41)
	  , toPrimitive    = __webpack_require__(21)
	  , createDesc     = __webpack_require__(22)
	  , _create        = __webpack_require__(37)
	  , gOPNExt        = __webpack_require__(71)
	  , $GOPD          = __webpack_require__(73)
	  , $DP            = __webpack_require__(14)
	  , $keys          = __webpack_require__(39)
	  , gOPD           = $GOPD.f
	  , dP             = $DP.f
	  , gOPN           = gOPNExt.f
	  , $Symbol        = global.Symbol
	  , $JSON          = global.JSON
	  , _stringify     = $JSON && $JSON.stringify
	  , PROTOTYPE      = 'prototype'
	  , HIDDEN         = wks('_hidden')
	  , TO_PRIMITIVE   = wks('toPrimitive')
	  , isEnum         = {}.propertyIsEnumerable
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols     = shared('symbols')
	  , OPSymbols      = shared('op-symbols')
	  , ObjectProto    = Object[PROTOTYPE]
	  , USE_NATIVE     = typeof $Symbol == 'function'
	  , QObject        = global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;
	
	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function(){
	  return _create(dP({}, 'a', {
	    get: function(){ return dP(this, 'a', {value: 7}).a; }
	  })).a != 7;
	}) ? function(it, key, D){
	  var protoDesc = gOPD(ObjectProto, key);
	  if(protoDesc)delete ObjectProto[key];
	  dP(it, key, D);
	  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
	} : dP;
	
	var wrap = function(tag){
	  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
	  sym._k = tag;
	  return sym;
	};
	
	var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
	  return typeof it == 'symbol';
	} : function(it){
	  return it instanceof $Symbol;
	};
	
	var $defineProperty = function defineProperty(it, key, D){
	  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
	  anObject(it);
	  key = toPrimitive(key, true);
	  anObject(D);
	  if(has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = _create(D, {enumerable: createDesc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return dP(it, key, D);
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
	  var E = isEnum.call(this, key = toPrimitive(key, true));
	  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
	  it  = toIObject(it);
	  key = toPrimitive(key, true);
	  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
	  var D = gOPD(it, key);
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it){
	  var names  = gOPN(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
	  var IS_OP  = it === ObjectProto
	    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
	  } return result;
	};
	
	// 19.4.1.1 Symbol([description])
	if(!USE_NATIVE){
	  $Symbol = function Symbol(){
	    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
	    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function(value){
	      if(this === ObjectProto)$set.call(OPSymbols, value);
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    };
	    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
	    return wrap(tag);
	  };
	  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
	    return this._k;
	  });
	
	  $GOPD.f = $getOwnPropertyDescriptor;
	  $DP.f   = $defineProperty;
	  __webpack_require__(72).f = gOPNExt.f = $getOwnPropertyNames;
	  __webpack_require__(69).f  = $propertyIsEnumerable;
	  __webpack_require__(68).f = $getOwnPropertySymbols;
	
	  if(DESCRIPTORS && !__webpack_require__(32)){
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }
	
	  wksExt.f = function(name){
	    return wrap(wks(name));
	  }
	}
	
	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});
	
	for(var symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);
	
	for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);
	
	$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    if(isSymbol(key))return keyOf(SymbolRegistry, key);
	    throw TypeError(key + ' is not a symbol!');
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	});
	
	$export($export.S + $export.F * !USE_NATIVE, 'Object', {
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
	$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it){
	    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
	    var args = [it]
	      , i    = 1
	      , replacer, $replacer;
	    while(arguments.length > i)args.push(arguments[i++]);
	    replacer = args[1];
	    if(typeof replacer == 'function')$replacer = replacer;
	    if($replacer || !isArray(replacer))replacer = function(key, value){
	      if($replacer)value = $replacer.call(this, key, value);
	      if(!isSymbol(value))return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});
	
	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(13)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	var META     = __webpack_require__(49)('meta')
	  , isObject = __webpack_require__(16)
	  , has      = __webpack_require__(34)
	  , setDesc  = __webpack_require__(14).f
	  , id       = 0;
	var isExtensible = Object.isExtensible || function(){
	  return true;
	};
	var FREEZE = !__webpack_require__(19)(function(){
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function(it){
	  setDesc(it, META, {value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  }});
	};
	var fastKey = function(it, create){
	  // return primitive with prefix
	  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return 'F';
	    // not necessary to add metadata
	    if(!create)return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function(it, create){
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return true;
	    // not necessary to add metadata
	    if(!create)return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function(it){
	  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY:      META,
	  NEED:     false,
	  fastKey:  fastKey,
	  getWeak:  getWeak,
	  onFreeze: onFreeze
	};

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	var global         = __webpack_require__(9)
	  , core           = __webpack_require__(10)
	  , LIBRARY        = __webpack_require__(32)
	  , wksExt         = __webpack_require__(60)
	  , defineProperty = __webpack_require__(14).f;
	module.exports = function(name){
	  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
	  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
	};

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	var getKeys   = __webpack_require__(39)
	  , toIObject = __webpack_require__(41);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var getKeys = __webpack_require__(39)
	  , gOPS    = __webpack_require__(68)
	  , pIE     = __webpack_require__(69);
	module.exports = function(it){
	  var result     = getKeys(it)
	    , getSymbols = gOPS.f;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = pIE.f
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
	  } return result;
	};

/***/ },
/* 68 */
/***/ function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 69 */
/***/ function(module, exports) {

	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(43);
	module.exports = Array.isArray || function isArray(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(41)
	  , gOPN      = __webpack_require__(72).f
	  , toString  = {}.toString;
	
	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];
	
	var getWindowNames = function(it){
	  try {
	    return gOPN(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	};
	
	module.exports.f = function getOwnPropertyNames(it){
	  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
	};


/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys      = __webpack_require__(40)
	  , hiddenKeys = __webpack_require__(50).concat('length', 'prototype');
	
	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
	  return $keys(O, hiddenKeys);
	};

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	var pIE            = __webpack_require__(69)
	  , createDesc     = __webpack_require__(22)
	  , toIObject      = __webpack_require__(41)
	  , toPrimitive    = __webpack_require__(21)
	  , has            = __webpack_require__(34)
	  , IE8_DOM_DEFINE = __webpack_require__(17)
	  , gOPD           = Object.getOwnPropertyDescriptor;
	
	exports.f = __webpack_require__(18) ? gOPD : function getOwnPropertyDescriptor(O, P){
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if(IE8_DOM_DEFINE)try {
	    return gOPD(O, P);
	  } catch(e){ /* empty */ }
	  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
	};

/***/ },
/* 74 */
/***/ function(module, exports) {



/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(65)('asyncIterator');

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(65)('observable');

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _setPrototypeOf = __webpack_require__(78);
	
	var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);
	
	var _create = __webpack_require__(82);
	
	var _create2 = _interopRequireDefault(_create);
	
	var _typeof2 = __webpack_require__(24);
	
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
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(79), __esModule: true };

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(80);
	module.exports = __webpack_require__(10).Object.setPrototypeOf;

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export = __webpack_require__(8);
	$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(81).set});

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var isObject = __webpack_require__(16)
	  , anObject = __webpack_require__(15);
	var check = function(O, proto){
	  anObject(O);
	  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function(test, buggy, set){
	      try {
	        set = __webpack_require__(11)(Function.call, __webpack_require__(73).f(Object.prototype, '__proto__').set, 2);
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
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(83), __esModule: true };

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(84);
	var $Object = __webpack_require__(10).Object;
	module.exports = function create(P, D){
	  return $Object.create(P, D);
	};

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(8)
	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	$export($export.S, 'Object', {create: __webpack_require__(37)});

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _classCallCheck2 = __webpack_require__(3);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(4);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * A Render Result
	 */
	
	var RenderResult = function () {
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
	
	
	  RenderResult.fromObject = function fromObject(result) {
	    return new RenderResult(result.startOffset, result.endOffset, result.startContainerPath, result.endContainerPath);
	  };
	
	  /**
	   * @returns {Object}
	   */
	
	
	  RenderResult.prototype.serialize = function serialize() {
	    return {
	      startOffset: this.startOffset,
	      endOffset: this.endOffset,
	      startContainerPath: this.startContainerPath,
	      endContainerPath: this.endContainerPath
	    };
	  };
	
	  /**
	   * @param {String} text
	   */
	
	
	  (0, _createClass3.default)(RenderResult, [{
	    key: "text",
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
	    key: "instance",
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
	  }]);
	  return RenderResult;
	}();
	
	exports.default = RenderResult;

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.registerEvents = exports.EVENT_PART_TREE_LEAVE = exports.EVENT_PART_TREE_ENTER = exports.EVENT_MOUSELEAVE = exports.EVENT_MOUSEENTER = exports.EVENT_CLICK = undefined;
	
	var _slicedToArray2 = __webpack_require__(87);
	
	var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);
	
	var _typeof2 = __webpack_require__(24);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	var _set = __webpack_require__(96);
	
	var _set2 = _interopRequireDefault(_set);
	
	var _assign = __webpack_require__(113);
	
	var _assign2 = _interopRequireDefault(_assign);
	
	var _classCallCheck2 = __webpack_require__(3);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(4);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(23);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(77);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _wolfy87Eventemitter = __webpack_require__(117);
	
	var _wolfy87Eventemitter2 = _interopRequireDefault(_wolfy87Eventemitter);
	
	var _Rendering = __webpack_require__(2);
	
	var _Rendering2 = _interopRequireDefault(_Rendering);
	
	var _Util = __webpack_require__(118);
	
	var _Util2 = _interopRequireDefault(_Util);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * @type {string}
	 */
	var EVENT_CLICK = exports.EVENT_CLICK = 'click';
	
	/**
	 * @type {string}
	 */
	/* global Set */
	
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
	
	var RenderingEvents = function (_EventEmitter) {
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
	
	    var _this = (0, _possibleConstructorReturn3.default)(this, _EventEmitter.call(this));
	
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
	
	
	  RenderingEvents.globalEmitter = function globalEmitter() {
	    return RenderingEvents.staticEventListener;
	  };
	
	  (0, _createClass3.default)(RenderingEvents, [{
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
	}(_wolfy87Eventemitter2.default);
	
	RenderingEvents.staticEventListener = new _wolfy87Eventemitter2.default();
	exports.default = RenderingEvents;
	
	
	var HAS_EVENTS = false;
	
	var registerEvents = exports.registerEvents = function registerEvents() {
	  if (HAS_EVENTS) {
	    return;
	  }
	
	  HAS_EVENTS = true;
	
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
	      _Rendering2.default.globalEmitter().emit(EVENT_MOUSELEAVE, thisInstance);
	      thisInstance.emit(EVENT_MOUSELEAVE);
	    });
	    currentHoverInstances.clear();
	
	    betweenInstances.forEach(function (thisInstance) {
	      _Rendering2.default.globalEmitter().emit(EVENT_PART_TREE_LEAVE, thisInstance);
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
	
	  RenderingEvents.globalEmitter().on(EVENT_MOUSEENTER, function (instance) {
	    instance.wrapperNodes.forEach(function (node) {
	      node.classList.add(instance.options.hoverClass);
	    });
	  });
	
	  RenderingEvents.globalEmitter().on(EVENT_MOUSELEAVE, function (instance) {
	    instance.wrapperNodes.forEach(function (node) {
	      node.classList.remove(instance.options.hoverClass);
	    });
	  });
	
	  RenderingEvents.globalEmitter().on(EVENT_PART_TREE_ENTER, function (instance) {
	    instance.wrapperNodes.forEach(function (node) {
	      node.classList.add(instance.options.treeClass);
	    });
	  });
	
	  RenderingEvents.globalEmitter().on(EVENT_PART_TREE_LEAVE, function (instance) {
	    instance.wrapperNodes.forEach(function (node) {
	      node.classList.remove(instance.options.treeClass);
	    });
	  });
	
	  global.addEventListener('click', function (e) {
	    var target = findTarget(e);
	    if (target) {
	      var _target = (0, _slicedToArray3.default)(target, 2);
	
	      var instance = _target[0];
	      var between = _target[1];
	
	      _Rendering2.default.globalEmitter().emit(EVENT_CLICK, instance, e, between);
	      instance.emit(EVENT_CLICK, e, between);
	    }
	  }, true);
	
	  global.addEventListener('mouseover', function (e) {
	    var target = findTarget(e);
	    if (target) {
	      (function () {
	        var _target2 = (0, _slicedToArray3.default)(target, 2);
	
	        var instance = _target2[0];
	        var between = _target2[1];
	
	        // find instances that lay in between the node
	
	        mouseOutClear();
	        between.forEach(function (instanceBetween) {
	          betweenInstances.add(instanceBetween);
	          instanceBetween.emit(EVENT_PART_TREE_ENTER, e, between);
	          _Rendering2.default.globalEmitter().emit(EVENT_PART_TREE_ENTER, instanceBetween, e, between);
	        });
	        instance.emit(EVENT_MOUSEENTER, e, between);
	        _Rendering2.default.globalEmitter().emit(EVENT_MOUSEENTER, instance, e, between);
	        currentHoverInstances.add(instance);
	      })();
	    } else {
	      mouseOutClear();
	    }
	  }, true);
	};
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _isIterable2 = __webpack_require__(88);
	
	var _isIterable3 = _interopRequireDefault(_isIterable2);
	
	var _getIterator2 = __webpack_require__(92);
	
	var _getIterator3 = _interopRequireDefault(_getIterator2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function () {
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
	}();

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(89), __esModule: true };

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(56);
	__webpack_require__(27);
	module.exports = __webpack_require__(90);

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(91)
	  , ITERATOR  = __webpack_require__(53)('iterator')
	  , Iterators = __webpack_require__(35);
	module.exports = __webpack_require__(10).isIterable = function(it){
	  var O = Object(it);
	  return O[ITERATOR] !== undefined
	    || '@@iterator' in O
	    || Iterators.hasOwnProperty(classof(O));
	};

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(43)
	  , TAG = __webpack_require__(53)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';
	
	// fallback for IE11 Script Access Denied error
	var tryGet = function(it, key){
	  try {
	    return it[key];
	  } catch(e){ /* empty */ }
	};
	
	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(93), __esModule: true };

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(56);
	__webpack_require__(27);
	module.exports = __webpack_require__(94);

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(15)
	  , get      = __webpack_require__(95);
	module.exports = __webpack_require__(10).getIterator = function(it){
	  var iterFn = get(it);
	  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
	  return anObject(iterFn.call(it));
	};

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(91)
	  , ITERATOR  = __webpack_require__(53)('iterator')
	  , Iterators = __webpack_require__(35);
	module.exports = __webpack_require__(10).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(97), __esModule: true };

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(74);
	__webpack_require__(27);
	__webpack_require__(56);
	__webpack_require__(98);
	__webpack_require__(110);
	module.exports = __webpack_require__(10).Set;

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var strong = __webpack_require__(99);
	
	// 23.2 Set Objects
	module.exports = __webpack_require__(106)('Set', function(get){
	  return function Set(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.2.3.1 Set.prototype.add(value)
	  add: function add(value){
	    return strong.def(this, value = value === 0 ? 0 : value, value);
	  }
	}, strong);

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var dP          = __webpack_require__(14).f
	  , create      = __webpack_require__(37)
	  , hide        = __webpack_require__(13)
	  , redefineAll = __webpack_require__(100)
	  , ctx         = __webpack_require__(11)
	  , anInstance  = __webpack_require__(101)
	  , defined     = __webpack_require__(30)
	  , forOf       = __webpack_require__(102)
	  , $iterDefine = __webpack_require__(31)
	  , step        = __webpack_require__(59)
	  , setSpecies  = __webpack_require__(105)
	  , DESCRIPTORS = __webpack_require__(18)
	  , fastKey     = __webpack_require__(64).fastKey
	  , SIZE        = DESCRIPTORS ? '_s' : 'size';
	
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
	      anInstance(that, C, NAME, '_i');
	      that._i = create(null); // index
	      that._f = undefined;    // first entry
	      that._l = undefined;    // last entry
	      that[SIZE] = 0;         // size
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
	        anInstance(this, C, 'forEach');
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
	    if(DESCRIPTORS)dP(C.prototype, 'size', {
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
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	var hide = __webpack_require__(13);
	module.exports = function(target, src, safe){
	  for(var key in src){
	    if(safe && target[key])target[key] = src[key];
	    else hide(target, key, src[key]);
	  } return target;
	};

/***/ },
/* 101 */
/***/ function(module, exports) {

	module.exports = function(it, Constructor, name, forbiddenField){
	  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
	    throw TypeError(name + ': incorrect invocation!');
	  } return it;
	};

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	var ctx         = __webpack_require__(11)
	  , call        = __webpack_require__(103)
	  , isArrayIter = __webpack_require__(104)
	  , anObject    = __webpack_require__(15)
	  , toLength    = __webpack_require__(45)
	  , getIterFn   = __webpack_require__(95)
	  , BREAK       = {}
	  , RETURN      = {};
	var exports = module.exports = function(iterable, entries, fn, that, ITERATOR){
	  var iterFn = ITERATOR ? function(){ return iterable; } : getIterFn(iterable)
	    , f      = ctx(fn, that, entries ? 2 : 1)
	    , index  = 0
	    , length, step, iterator, result;
	  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
	    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	    if(result === BREAK || result === RETURN)return result;
	  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
	    result = call(iterator, f, step.value, entries);
	    if(result === BREAK || result === RETURN)return result;
	  }
	};
	exports.BREAK  = BREAK;
	exports.RETURN = RETURN;

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(15);
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
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(35)
	  , ITERATOR   = __webpack_require__(53)('iterator')
	  , ArrayProto = Array.prototype;
	
	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global      = __webpack_require__(9)
	  , core        = __webpack_require__(10)
	  , dP          = __webpack_require__(14)
	  , DESCRIPTORS = __webpack_require__(18)
	  , SPECIES     = __webpack_require__(53)('species');
	
	module.exports = function(KEY){
	  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
	  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
	    configurable: true,
	    get: function(){ return this; }
	  });
	};

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global         = __webpack_require__(9)
	  , $export        = __webpack_require__(8)
	  , meta           = __webpack_require__(64)
	  , fails          = __webpack_require__(19)
	  , hide           = __webpack_require__(13)
	  , redefineAll    = __webpack_require__(100)
	  , forOf          = __webpack_require__(102)
	  , anInstance     = __webpack_require__(101)
	  , isObject       = __webpack_require__(16)
	  , setToStringTag = __webpack_require__(52)
	  , dP             = __webpack_require__(14).f
	  , each           = __webpack_require__(107)(0)
	  , DESCRIPTORS    = __webpack_require__(18);
	
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
	    meta.NEED = true;
	  } else {
	    C = wrapper(function(target, iterable){
	      anInstance(target, C, NAME, '_c');
	      target._c = new Base;
	      if(iterable != undefined)forOf(iterable, IS_MAP, target[ADDER], target);
	    });
	    each('add,clear,delete,forEach,get,has,set,keys,values,entries,toJSON'.split(','),function(KEY){
	      var IS_ADDER = KEY == 'add' || KEY == 'set';
	      if(KEY in proto && !(IS_WEAK && KEY == 'clear'))hide(C.prototype, KEY, function(a, b){
	        anInstance(this, C, KEY);
	        if(!IS_ADDER && IS_WEAK && !isObject(a))return KEY == 'get' ? undefined : false;
	        var result = this._c[KEY](a === 0 ? 0 : a, b);
	        return IS_ADDER ? this : result;
	      });
	    });
	    if('size' in proto)dP(C.prototype, 'size', {
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
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	// 0 -> Array#forEach
	// 1 -> Array#map
	// 2 -> Array#filter
	// 3 -> Array#some
	// 4 -> Array#every
	// 5 -> Array#find
	// 6 -> Array#findIndex
	var ctx      = __webpack_require__(11)
	  , IObject  = __webpack_require__(42)
	  , toObject = __webpack_require__(55)
	  , toLength = __webpack_require__(45)
	  , asc      = __webpack_require__(108);
	module.exports = function(TYPE, $create){
	  var IS_MAP        = TYPE == 1
	    , IS_FILTER     = TYPE == 2
	    , IS_SOME       = TYPE == 3
	    , IS_EVERY      = TYPE == 4
	    , IS_FIND_INDEX = TYPE == 6
	    , NO_HOLES      = TYPE == 5 || IS_FIND_INDEX
	    , create        = $create || asc;
	  return function($this, callbackfn, that){
	    var O      = toObject($this)
	      , self   = IObject(O)
	      , f      = ctx(callbackfn, that, 3)
	      , length = toLength(self.length)
	      , index  = 0
	      , result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined
	      , val, res;
	    for(;length > index; index++)if(NO_HOLES || index in self){
	      val = self[index];
	      res = f(val, index, O);
	      if(TYPE){
	        if(IS_MAP)result[index] = res;            // map
	        else if(res)switch(TYPE){
	          case 3: return true;                    // some
	          case 5: return val;                     // find
	          case 6: return index;                   // findIndex
	          case 2: result.push(val);               // filter
	        } else if(IS_EVERY)return false;          // every
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
	  };
	};

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
	var speciesConstructor = __webpack_require__(109);
	
	module.exports = function(original, length){
	  return new (speciesConstructor(original))(length);
	};

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(16)
	  , isArray  = __webpack_require__(70)
	  , SPECIES  = __webpack_require__(53)('species');
	
	module.exports = function(original){
	  var C;
	  if(isArray(original)){
	    C = original.constructor;
	    // cross-realm fallback
	    if(typeof C == 'function' && (C === Array || isArray(C.prototype)))C = undefined;
	    if(isObject(C)){
	      C = C[SPECIES];
	      if(C === null)C = undefined;
	    }
	  } return C === undefined ? Array : C;
	};

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var $export  = __webpack_require__(8);
	
	$export($export.P + $export.R, 'Set', {toJSON: __webpack_require__(111)('Set')});

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var classof = __webpack_require__(91)
	  , from    = __webpack_require__(112);
	module.exports = function(NAME){
	  return function toJSON(){
	    if(classof(this) != NAME)throw TypeError(NAME + "#toJSON isn't generic");
	    return from(this);
	  };
	};

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	var forOf = __webpack_require__(102);
	
	module.exports = function(iter, ITERATOR){
	  var result = [];
	  forOf(iter, false, result.push, result, ITERATOR);
	  return result;
	};


/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(114), __esModule: true };

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(115);
	module.exports = __webpack_require__(10).Object.assign;

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $export = __webpack_require__(8);
	
	$export($export.S + $export.F, 'Object', {assign: __webpack_require__(116)});

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.2.1 Object.assign(target, source, ...)
	var getKeys  = __webpack_require__(39)
	  , gOPS     = __webpack_require__(68)
	  , pIE      = __webpack_require__(69)
	  , toObject = __webpack_require__(55)
	  , IObject  = __webpack_require__(42)
	  , $assign  = Object.assign;
	
	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = !$assign || __webpack_require__(19)(function(){
	  var A = {}
	    , B = {}
	    , S = Symbol()
	    , K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function(k){ B[k] = k; });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
	  var T     = toObject(target)
	    , aLen  = arguments.length
	    , index = 1
	    , getSymbols = gOPS.f
	    , isEnum     = pIE.f;
	  while(aLen > index){
	    var S      = IObject(arguments[index++])
	      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
	  } return T;
	} : $assign;

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * EventEmitter v5.0.0 - git.io/ee
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
	
	                for (i = 0; i < listeners.length; i++) {
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
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.DATA_IS_SELECTION = exports.ATTR_DATA_ORIGINAL_INDEX = undefined;
	
	var _classCallCheck2 = __webpack_require__(3);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _Rendering = __webpack_require__(2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/* global Node, NodeList, Element */
	
	/**
	 * @type {string}
	 */
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
	
	var Util = function () {
	  function Util() {
	    (0, _classCallCheck3.default)(this, Util);
	  }
	
	  /**
	   * Filter for a NodeList
	   * @param {NodeList} nodes
	   * @param {Function} func
	   *
	   * @returns {Array.<HTMLElement>}
	   */
	
	  Util.nodeListFilter = function nodeListFilter(nodes, func) {
	    return Array.prototype.filter.call(nodes || [], func);
	  };
	
	  /**
	   * Generates a unique id
	   * @return {String}
	   */
	
	
	  Util.guid = function guid() {
	    function s4() {
	      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
	    }
	
	    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + (s4() + s4() + s4());
	  };
	
	  /**
	   * Checks if a given node is empty
	   * @param {HTMLElement} node
	   *
	   * @returns {*}
	   */
	
	
	  Util.nodeIsEmpty = function nodeIsEmpty(node) {
	    return node.nodeValue.match(/^[\s]*$/g);
	  };
	
	  /**
	   * @param {HTMLElement} node
	   * @param [optionalList]
	   *
	   * @return {int} the index of this node in context to it's siblings
	   */
	
	
	  Util.index = function index(node, optionalList) {
	    var children = optionalList || (node.nodeType === Node.TEXT_NODE ? node.parentNode.childNodes : node.parentNode.children);
	    return Array.prototype.indexOf.call(children || [], node);
	  };
	
	  /**
	   * Wraps given `elms` in given `wrapper`
	   *
	   * @param {HTMLElement|Array.<HTMLElement>|Node} elms
	   * @param {HTMLElement|Node} wrapper
	   *
	   * @return {HTMLElement}
	   */
	
	
	  Util.wrap = function wrap(elms, wrapper) {
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
	  };
	
	  /**
	   * Will calculate an index depending on an already modified dom by marklib
	   * @param {HTMLElement|Node} node
	   *
	   * @returns {int|boolean}
	   */
	
	
	  Util.calcIndex = function calcIndex(node) {
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
	  };
	
	  /**
	   * @param {HTMLElement|Node} el
	   * @param {String} [optionalSelector] will test given element against a selector
	   *  if matches, returns this element immediately
	   *
	   * @return {Array.<HTMLElement>} an array of all found parents of given element (and optional selector)
	   */
	
	
	  Util.parents = function parents(el, optionalSelector) {
	    return Util.parentsCallback(el, function (element) {
	      if (optionalSelector && (element === optionalSelector || typeof optionalSelector === 'string' && element.matches && element.matches(optionalSelector))) {
	        return true;
	      } else if (!optionalSelector) {
	        return true;
	      }
	      return false;
	    });
	  };
	
	  /**
	   * @param {HTMLElement|Node} el
	   * @param {Function} callback
	   * @return {Array.<HTMLElement>} an array of all found parents of given element (and optional selector)
	   */
	
	
	  Util.parentsCallback = function parentsCallback(el, callback) {
	    var element = el;
	    var foundElements = [];
	    while (element.parentNode !== null) {
	      element = element.parentNode;
	      if (callback(element)) {
	        foundElements.push(element);
	      }
	    }
	    return foundElements;
	  };
	
	  /**
	   * Finds a parent node (the closest) with a given selector
	   * @param {Node} el
	   * @param {String} selector
	   *
	   * @returns {Node|boolean}
	   */
	
	
	  Util.parent = function parent(el, selector) {
	    var element = el;
	    while (element.parentNode !== null) {
	      element = element.parentNode;
	      if (element.matches && element.matches(selector)) {
	        return element;
	      }
	    }
	    return false;
	  };
	
	  /**
	   * Finds the closest element including itself matching a given selector
	   * @param {Node} el
	   * @param selector
	   *
	   * @returns {Node|boolean}
	   */
	
	
	  Util.closest = function closest(el, selector) {
	    return Util.closestCallback(el, function (element) {
	      return element.matches && element.matches(selector);
	    });
	  };
	
	  /**
	   * Finds the closest element including itself matching a callback
	   * @param {Node} el
	   * @param {Function} callback
	   * @returns {Node|boolean}
	   */
	
	
	  Util.closestCallback = function closestCallback(el, callback) {
	    var element = el;
	    while (element !== null) {
	      if (callback(element)) {
	        return element;
	      }
	      element = element.parentNode;
	    }
	    return false;
	  };
	
	  /**
	   * Finds the outermost fitting element that matches callback
	   * @param {Node} el
	   * @param {Function} callback
	   * @returns {Node|boolean}
	   */
	
	
	  Util.outerMostCallback = function outerMostCallback(el, callback) {
	    var element = el;
	    var lastValid = false;
	    while (element !== null) {
	      if (callback(element)) {
	        lastValid = element;
	      }
	      element = element.parentNode;
	    }
	    return lastValid;
	  };
	
	  /**
	   * @param {HTMLElement} n
	   *
	   * @return {boolean}
	   */
	
	
	  Util.isMarkNode = function isMarkNode(n) {
	    return n instanceof HTMLElement && n.hasAttribute(DATA_IS_SELECTION);
	  };
	
	  /**
	   * Determines the correct paths and excludes all `marklib` generated content
	   * TODO: To improve performance we could shorten the path if an ID is present in it.
	   * @param {HTMLElement|Node} el
	   * @param {HTMLElement|Node} [context] if given extraction path is relative to this element
	   * @returns {string}
	   */
	
	
	  Util.getPath = function getPath(el, context) {
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
	  };
	
	  /**
	   * Will return the first original offset value that is found
	   * @param {Node} element
	   *
	   * @returns {int}
	   */
	
	
	  Util.findOriginalOffset = function findOriginalOffset(element) {
	    if (!element.parentNode.hasAttribute(_Rendering.ATTR_DATA_ORIGINAL_OFFSET_START)) {
	      return 0;
	    }
	    var lengthElement = Util.parent(element, '[' + _Rendering.ATTR_DATA_ORIGINAL_OFFSET_START + ']');
	    return lengthElement ? parseInt(lengthElement.getAttribute(_Rendering.ATTR_DATA_ORIGINAL_OFFSET_START), 10) : 0;
	  };
	
	  /**
	   * Deserialize a specific path and finds the right textNodes
	   * This even works when DOM has been manipulated before by `marklib`
	   * @param {string} path the serialized path (including offsets)
	   * @param {Node|HTMLElement} context
	   *
	   * @return {Node}
	   */
	
	
	  Util.deserializePath = function deserializePath(path, context) {
	    var pSplit = path.split(';');
	    var p = pSplit[0];
	    var objectIndex = parseInt(pSplit[1], 10);
	    var charOffset = parseInt(pSplit[2], 10);
	    var container = !p.trim() ? context : context.querySelector(p);
	
	    var maybeFoundNode = null;
	
	    Util.walkDom(container, function (n) {
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
	    });
	
	    return maybeFoundNode;
	  };
	
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
	
	
	  Util.walkDom = function walkDom(node, func) {
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
	  };
	
	  /**
	   * Extracts all TextNodes inside a container
	   * @param {Node} el
	   * @param {Function} func
	   * @returns {Array.<Text>}
	   */
	
	
	  Util.walkTextNodes = function walkTextNodes(el, func) {
	    Util.walkDom(el, function (node) {
	      if (Node.TEXT_NODE === node.nodeType && !Util.nodeIsEmpty(node)) {
	        func(node);
	      }
	      return true;
	    });
	  };
	
	  /**
	   * @param {Node} container
	   * @param {Number} thisIndex
	   * @returns {int|string} index of parent or original
	   */
	
	
	  Util.getIndexParentIfHas = function getIndexParentIfHas(container, thisIndex) {
	    var p = container.parentNode;
	    var index = parseInt(p.getAttribute(ATTR_DATA_ORIGINAL_INDEX), 10);
	    return index > thisIndex ? index : thisIndex;
	  };
	
	  /**
	   * @param container
	   * @returns {int} offset start of parent if has, else 0
	   */
	
	
	  Util.getOffsetParentIfHas = function getOffsetParentIfHas(container) {
	    var p = container.parentNode;
	    var offset = parseInt(p.getAttribute(_Rendering.ATTR_DATA_ORIGINAL_OFFSET_START), 10);
	    return offset > 0 ? offset : 0;
	  };
	
	  return Util;
	}();
	
	exports.default = Util;

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _stringify = __webpack_require__(120);
	
	var _stringify2 = _interopRequireDefault(_stringify);
	
	__webpack_require__(122);
	
	var _Marklib = __webpack_require__(1);
	
	var _flexcss = __webpack_require__(420);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var KEY_ENTER = 13;
	
	/**
	 * Contains Module for the demonstration
	 */
	
	/* global localStorage, document */
	
	document.addEventListener("DOMContentLoaded", function () {
	  (0, _Marklib.registerEvents)();
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
	      var r = new _Marklib.Rendering(document, {
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
	  function onClick(instance) {
	    var self = instance;
	    self.wrapperNodes.forEach(function (n) {
	      n.addEventListener(ANIMATIONEND, function thisFunction(e) {
	        e.target.classList.remove('bubble');
	        e.target.removeEventListener(ANIMATIONEND, thisFunction);
	      });
	      n.classList.add('bubble');
	    });
	
	    if (tooltip.getCurrentTarget() === self.wrapperNodes[0]) {
	      return;
	    }
	
	    tooltip.createTooltip(self.wrapperNodes[0], self.result.text, false);
	
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
	
	  _Marklib.Rendering.globalEmitter().on('click', onClick);
	
	  savedRanges.forEach(function (range) {
	    var marker = new _Marklib.Rendering(document);
	    try {
	      marker.renderWithResult(range);
	      allRanges.push(marker);
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
	      var renderer = new _Marklib.Rendering(document);
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
	      actionMark();
	      return;
	    }
	    if (e.target.id === 'action-clear') {
	      allRanges.forEach(function (range) {
	        return range.destroy();
	      });
	      savedRanges = [];
	      allRanges = [];
	      localStorage.setItem(STORAGE_KEY, (0, _stringify2.default)([]));
	    }
	  });
	});
	
	exports.default = _Marklib.Rendering;

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(121), __esModule: true };

/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	var core  = __webpack_require__(10)
	  , $JSON = core.JSON || (core.JSON = {stringify: JSON.stringify});
	module.exports = function stringify(it){ // eslint-disable-line no-unused-vars
	  return $JSON.stringify.apply($JSON, arguments);
	};

/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";
	
	__webpack_require__(123);
	
	__webpack_require__(415);
	
	__webpack_require__(417);
	
	/* eslint max-len: 0 */
	
	if (global._babelPolyfill) {
	  throw new Error("only one instance of babel-polyfill is allowed");
	}
	global._babelPolyfill = true;
	
	// Should be removed in the next major release:
	
	var DEFINE_PROPERTY = "defineProperty";
	function define(O, key, value) {
	  O[key] || Object[DEFINE_PROPERTY](O, key, {
	    writable: true,
	    configurable: true,
	    value: value
	  });
	}
	
	define(String.prototype, "padLeft", "".padStart);
	define(String.prototype, "padRight", "".padEnd);
	
	"pop,reverse,shift,keys,values,entries,indexOf,every,some,forEach,map,filter,find,findIndex,includes,join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill".split(",").forEach(function (key) {
	  [][key] && define(Array, key, Function.call.bind([][key]));
	});
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(124);
	__webpack_require__(173);
	__webpack_require__(174);
	__webpack_require__(175);
	__webpack_require__(176);
	__webpack_require__(178);
	__webpack_require__(181);
	__webpack_require__(182);
	__webpack_require__(183);
	__webpack_require__(184);
	__webpack_require__(185);
	__webpack_require__(186);
	__webpack_require__(187);
	__webpack_require__(188);
	__webpack_require__(189);
	__webpack_require__(191);
	__webpack_require__(193);
	__webpack_require__(195);
	__webpack_require__(197);
	__webpack_require__(200);
	__webpack_require__(201);
	__webpack_require__(202);
	__webpack_require__(206);
	__webpack_require__(208);
	__webpack_require__(210);
	__webpack_require__(214);
	__webpack_require__(215);
	__webpack_require__(216);
	__webpack_require__(217);
	__webpack_require__(219);
	__webpack_require__(220);
	__webpack_require__(221);
	__webpack_require__(222);
	__webpack_require__(223);
	__webpack_require__(224);
	__webpack_require__(225);
	__webpack_require__(227);
	__webpack_require__(228);
	__webpack_require__(229);
	__webpack_require__(231);
	__webpack_require__(232);
	__webpack_require__(233);
	__webpack_require__(235);
	__webpack_require__(236);
	__webpack_require__(237);
	__webpack_require__(238);
	__webpack_require__(239);
	__webpack_require__(240);
	__webpack_require__(241);
	__webpack_require__(242);
	__webpack_require__(243);
	__webpack_require__(244);
	__webpack_require__(245);
	__webpack_require__(246);
	__webpack_require__(247);
	__webpack_require__(248);
	__webpack_require__(253);
	__webpack_require__(254);
	__webpack_require__(258);
	__webpack_require__(259);
	__webpack_require__(260);
	__webpack_require__(261);
	__webpack_require__(263);
	__webpack_require__(264);
	__webpack_require__(265);
	__webpack_require__(266);
	__webpack_require__(267);
	__webpack_require__(268);
	__webpack_require__(269);
	__webpack_require__(270);
	__webpack_require__(271);
	__webpack_require__(272);
	__webpack_require__(273);
	__webpack_require__(274);
	__webpack_require__(275);
	__webpack_require__(276);
	__webpack_require__(277);
	__webpack_require__(278);
	__webpack_require__(279);
	__webpack_require__(281);
	__webpack_require__(282);
	__webpack_require__(288);
	__webpack_require__(289);
	__webpack_require__(291);
	__webpack_require__(292);
	__webpack_require__(293);
	__webpack_require__(297);
	__webpack_require__(298);
	__webpack_require__(299);
	__webpack_require__(300);
	__webpack_require__(301);
	__webpack_require__(303);
	__webpack_require__(304);
	__webpack_require__(305);
	__webpack_require__(306);
	__webpack_require__(309);
	__webpack_require__(311);
	__webpack_require__(312);
	__webpack_require__(313);
	__webpack_require__(315);
	__webpack_require__(317);
	__webpack_require__(319);
	__webpack_require__(320);
	__webpack_require__(321);
	__webpack_require__(323);
	__webpack_require__(324);
	__webpack_require__(325);
	__webpack_require__(326);
	__webpack_require__(332);
	__webpack_require__(335);
	__webpack_require__(336);
	__webpack_require__(338);
	__webpack_require__(339);
	__webpack_require__(342);
	__webpack_require__(343);
	__webpack_require__(346);
	__webpack_require__(347);
	__webpack_require__(348);
	__webpack_require__(349);
	__webpack_require__(350);
	__webpack_require__(351);
	__webpack_require__(352);
	__webpack_require__(353);
	__webpack_require__(354);
	__webpack_require__(355);
	__webpack_require__(356);
	__webpack_require__(357);
	__webpack_require__(358);
	__webpack_require__(359);
	__webpack_require__(360);
	__webpack_require__(361);
	__webpack_require__(362);
	__webpack_require__(363);
	__webpack_require__(364);
	__webpack_require__(366);
	__webpack_require__(367);
	__webpack_require__(368);
	__webpack_require__(369);
	__webpack_require__(370);
	__webpack_require__(371);
	__webpack_require__(373);
	__webpack_require__(374);
	__webpack_require__(375);
	__webpack_require__(376);
	__webpack_require__(377);
	__webpack_require__(378);
	__webpack_require__(379);
	__webpack_require__(380);
	__webpack_require__(382);
	__webpack_require__(383);
	__webpack_require__(385);
	__webpack_require__(386);
	__webpack_require__(387);
	__webpack_require__(388);
	__webpack_require__(391);
	__webpack_require__(392);
	__webpack_require__(393);
	__webpack_require__(394);
	__webpack_require__(395);
	__webpack_require__(396);
	__webpack_require__(397);
	__webpack_require__(398);
	__webpack_require__(400);
	__webpack_require__(401);
	__webpack_require__(402);
	__webpack_require__(403);
	__webpack_require__(404);
	__webpack_require__(405);
	__webpack_require__(406);
	__webpack_require__(407);
	__webpack_require__(408);
	__webpack_require__(409);
	__webpack_require__(410);
	__webpack_require__(413);
	__webpack_require__(414);
	module.exports = __webpack_require__(130);

/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var global         = __webpack_require__(125)
	  , has            = __webpack_require__(126)
	  , DESCRIPTORS    = __webpack_require__(127)
	  , $export        = __webpack_require__(129)
	  , redefine       = __webpack_require__(139)
	  , META           = __webpack_require__(143).KEY
	  , $fails         = __webpack_require__(128)
	  , shared         = __webpack_require__(144)
	  , setToStringTag = __webpack_require__(145)
	  , uid            = __webpack_require__(140)
	  , wks            = __webpack_require__(146)
	  , wksExt         = __webpack_require__(147)
	  , wksDefine      = __webpack_require__(148)
	  , keyOf          = __webpack_require__(150)
	  , enumKeys       = __webpack_require__(163)
	  , isArray        = __webpack_require__(166)
	  , anObject       = __webpack_require__(133)
	  , toIObject      = __webpack_require__(153)
	  , toPrimitive    = __webpack_require__(137)
	  , createDesc     = __webpack_require__(138)
	  , _create        = __webpack_require__(167)
	  , gOPNExt        = __webpack_require__(170)
	  , $GOPD          = __webpack_require__(172)
	  , $DP            = __webpack_require__(132)
	  , $keys          = __webpack_require__(151)
	  , gOPD           = $GOPD.f
	  , dP             = $DP.f
	  , gOPN           = gOPNExt.f
	  , $Symbol        = global.Symbol
	  , $JSON          = global.JSON
	  , _stringify     = $JSON && $JSON.stringify
	  , PROTOTYPE      = 'prototype'
	  , HIDDEN         = wks('_hidden')
	  , TO_PRIMITIVE   = wks('toPrimitive')
	  , isEnum         = {}.propertyIsEnumerable
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols     = shared('symbols')
	  , OPSymbols      = shared('op-symbols')
	  , ObjectProto    = Object[PROTOTYPE]
	  , USE_NATIVE     = typeof $Symbol == 'function'
	  , QObject        = global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;
	
	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function(){
	  return _create(dP({}, 'a', {
	    get: function(){ return dP(this, 'a', {value: 7}).a; }
	  })).a != 7;
	}) ? function(it, key, D){
	  var protoDesc = gOPD(ObjectProto, key);
	  if(protoDesc)delete ObjectProto[key];
	  dP(it, key, D);
	  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
	} : dP;
	
	var wrap = function(tag){
	  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
	  sym._k = tag;
	  return sym;
	};
	
	var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
	  return typeof it == 'symbol';
	} : function(it){
	  return it instanceof $Symbol;
	};
	
	var $defineProperty = function defineProperty(it, key, D){
	  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
	  anObject(it);
	  key = toPrimitive(key, true);
	  anObject(D);
	  if(has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = _create(D, {enumerable: createDesc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return dP(it, key, D);
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
	  var E = isEnum.call(this, key = toPrimitive(key, true));
	  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
	  it  = toIObject(it);
	  key = toPrimitive(key, true);
	  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
	  var D = gOPD(it, key);
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it){
	  var names  = gOPN(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
	  var IS_OP  = it === ObjectProto
	    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
	  } return result;
	};
	
	// 19.4.1.1 Symbol([description])
	if(!USE_NATIVE){
	  $Symbol = function Symbol(){
	    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
	    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function(value){
	      if(this === ObjectProto)$set.call(OPSymbols, value);
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    };
	    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
	    return wrap(tag);
	  };
	  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
	    return this._k;
	  });
	
	  $GOPD.f = $getOwnPropertyDescriptor;
	  $DP.f   = $defineProperty;
	  __webpack_require__(171).f = gOPNExt.f = $getOwnPropertyNames;
	  __webpack_require__(165).f  = $propertyIsEnumerable;
	  __webpack_require__(164).f = $getOwnPropertySymbols;
	
	  if(DESCRIPTORS && !__webpack_require__(149)){
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }
	
	  wksExt.f = function(name){
	    return wrap(wks(name));
	  }
	}
	
	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});
	
	for(var symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);
	
	for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);
	
	$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    if(isSymbol(key))return keyOf(SymbolRegistry, key);
	    throw TypeError(key + ' is not a symbol!');
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	});
	
	$export($export.S + $export.F * !USE_NATIVE, 'Object', {
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
	$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it){
	    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
	    var args = [it]
	      , i    = 1
	      , replacer, $replacer;
	    while(arguments.length > i)args.push(arguments[i++]);
	    replacer = args[1];
	    if(typeof replacer == 'function')$replacer = replacer;
	    if($replacer || !isArray(replacer))replacer = function(key, value){
	      if($replacer)value = $replacer.call(this, key, value);
	      if(!isSymbol(value))return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});
	
	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(131)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 125 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 126 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(128)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 128 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(125)
	  , core      = __webpack_require__(130)
	  , hide      = __webpack_require__(131)
	  , redefine  = __webpack_require__(139)
	  , ctx       = __webpack_require__(141)
	  , PROTOTYPE = 'prototype';
	
	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE]
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE] || (exports[PROTOTYPE] = {})
	    , key, own, out, exp;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    // export native or passed
	    out = (own ? target : source)[key];
	    // bind timers to global for call from export context
	    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // extend global
	    if(target)redefine(target, key, out, type & $export.U);
	    // export
	    if(exports[key] != out)hide(exports, key, exp);
	    if(IS_PROTO && expProto[key] != out)expProto[key] = out;
	  }
	};
	global.core = core;
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 130 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(132)
	  , createDesc = __webpack_require__(138);
	module.exports = __webpack_require__(127) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(133)
	  , IE8_DOM_DEFINE = __webpack_require__(135)
	  , toPrimitive    = __webpack_require__(137)
	  , dP             = Object.defineProperty;
	
	exports.f = __webpack_require__(127) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(134);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 134 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(127) && !__webpack_require__(128)(function(){
	  return Object.defineProperty(__webpack_require__(136)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(134)
	  , document = __webpack_require__(125).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(134);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 138 */
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
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(125)
	  , hide      = __webpack_require__(131)
	  , has       = __webpack_require__(126)
	  , SRC       = __webpack_require__(140)('src')
	  , TO_STRING = 'toString'
	  , $toString = Function[TO_STRING]
	  , TPL       = ('' + $toString).split(TO_STRING);
	
	__webpack_require__(130).inspectSource = function(it){
	  return $toString.call(it);
	};
	
	(module.exports = function(O, key, val, safe){
	  var isFunction = typeof val == 'function';
	  if(isFunction)has(val, 'name') || hide(val, 'name', key);
	  if(O[key] === val)return;
	  if(isFunction)has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
	  if(O === global){
	    O[key] = val;
	  } else {
	    if(!safe){
	      delete O[key];
	      hide(O, key, val);
	    } else {
	      if(O[key])O[key] = val;
	      else hide(O, key, val);
	    }
	  }
	// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	})(Function.prototype, TO_STRING, function toString(){
	  return typeof this == 'function' && this[SRC] || $toString.call(this);
	});

/***/ },
/* 140 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(142);
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
/* 142 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	var META     = __webpack_require__(140)('meta')
	  , isObject = __webpack_require__(134)
	  , has      = __webpack_require__(126)
	  , setDesc  = __webpack_require__(132).f
	  , id       = 0;
	var isExtensible = Object.isExtensible || function(){
	  return true;
	};
	var FREEZE = !__webpack_require__(128)(function(){
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function(it){
	  setDesc(it, META, {value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  }});
	};
	var fastKey = function(it, create){
	  // return primitive with prefix
	  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return 'F';
	    // not necessary to add metadata
	    if(!create)return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function(it, create){
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return true;
	    // not necessary to add metadata
	    if(!create)return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function(it){
	  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY:      META,
	  NEED:     false,
	  fastKey:  fastKey,
	  getWeak:  getWeak,
	  onFreeze: onFreeze
	};

/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(125)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(132).f
	  , has = __webpack_require__(126)
	  , TAG = __webpack_require__(146)('toStringTag');
	
	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(144)('wks')
	  , uid        = __webpack_require__(140)
	  , Symbol     = __webpack_require__(125).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';
	
	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};
	
	$exports.store = store;

/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	exports.f = __webpack_require__(146);

/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	var global         = __webpack_require__(125)
	  , core           = __webpack_require__(130)
	  , LIBRARY        = __webpack_require__(149)
	  , wksExt         = __webpack_require__(147)
	  , defineProperty = __webpack_require__(132).f;
	module.exports = function(name){
	  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
	  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
	};

/***/ },
/* 149 */
/***/ function(module, exports) {

	module.exports = false;

/***/ },
/* 150 */
/***/ function(module, exports, __webpack_require__) {

	var getKeys   = __webpack_require__(151)
	  , toIObject = __webpack_require__(153);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(152)
	  , enumBugKeys = __webpack_require__(162);
	
	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(126)
	  , toIObject    = __webpack_require__(153)
	  , arrayIndexOf = __webpack_require__(157)(false)
	  , IE_PROTO     = __webpack_require__(161)('IE_PROTO');
	
	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(154)
	  , defined = __webpack_require__(156);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(155);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 155 */
/***/ function(module, exports) {

	var toString = {}.toString;
	
	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 156 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 157 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(153)
	  , toLength  = __webpack_require__(158)
	  , toIndex   = __webpack_require__(160);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 158 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(159)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 159 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(159)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 161 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(144)('keys')
	  , uid    = __webpack_require__(140);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 162 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 163 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var getKeys = __webpack_require__(151)
	  , gOPS    = __webpack_require__(164)
	  , pIE     = __webpack_require__(165);
	module.exports = function(it){
	  var result     = getKeys(it)
	    , getSymbols = gOPS.f;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = pIE.f
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
	  } return result;
	};

/***/ },
/* 164 */
/***/ function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 165 */
/***/ function(module, exports) {

	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 166 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(155);
	module.exports = Array.isArray || function isArray(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 167 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(133)
	  , dPs         = __webpack_require__(168)
	  , enumBugKeys = __webpack_require__(162)
	  , IE_PROTO    = __webpack_require__(161)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';
	
	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(136)('iframe')
	    , i      = enumBugKeys.length
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(169).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write('<script>document.F=Object</script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};
	
	module.exports = Object.create || function create(O, Properties){
	  var result;
	  if(O !== null){
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty;
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};

/***/ },
/* 168 */
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(132)
	  , anObject = __webpack_require__(133)
	  , getKeys  = __webpack_require__(151);
	
	module.exports = __webpack_require__(127) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 169 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(125).document && document.documentElement;

/***/ },
/* 170 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(153)
	  , gOPN      = __webpack_require__(171).f
	  , toString  = {}.toString;
	
	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];
	
	var getWindowNames = function(it){
	  try {
	    return gOPN(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	};
	
	module.exports.f = function getOwnPropertyNames(it){
	  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
	};


/***/ },
/* 171 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys      = __webpack_require__(152)
	  , hiddenKeys = __webpack_require__(162).concat('length', 'prototype');
	
	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
	  return $keys(O, hiddenKeys);
	};

/***/ },
/* 172 */
/***/ function(module, exports, __webpack_require__) {

	var pIE            = __webpack_require__(165)
	  , createDesc     = __webpack_require__(138)
	  , toIObject      = __webpack_require__(153)
	  , toPrimitive    = __webpack_require__(137)
	  , has            = __webpack_require__(126)
	  , IE8_DOM_DEFINE = __webpack_require__(135)
	  , gOPD           = Object.getOwnPropertyDescriptor;
	
	exports.f = __webpack_require__(127) ? gOPD : function getOwnPropertyDescriptor(O, P){
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if(IE8_DOM_DEFINE)try {
	    return gOPD(O, P);
	  } catch(e){ /* empty */ }
	  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
	};

/***/ },
/* 173 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(129)
	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	$export($export.S, 'Object', {create: __webpack_require__(167)});

/***/ },
/* 174 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(129);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(127), 'Object', {defineProperty: __webpack_require__(132).f});

/***/ },
/* 175 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(129);
	// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
	$export($export.S + $export.F * !__webpack_require__(127), 'Object', {defineProperties: __webpack_require__(168)});

/***/ },
/* 176 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	var toIObject                 = __webpack_require__(153)
	  , $getOwnPropertyDescriptor = __webpack_require__(172).f;
	
	__webpack_require__(177)('getOwnPropertyDescriptor', function(){
	  return function getOwnPropertyDescriptor(it, key){
	    return $getOwnPropertyDescriptor(toIObject(it), key);
	  };
	});

/***/ },
/* 177 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(129)
	  , core    = __webpack_require__(130)
	  , fails   = __webpack_require__(128);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 178 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 Object.getPrototypeOf(O)
	var toObject        = __webpack_require__(179)
	  , $getPrototypeOf = __webpack_require__(180);
	
	__webpack_require__(177)('getPrototypeOf', function(){
	  return function getPrototypeOf(it){
	    return $getPrototypeOf(toObject(it));
	  };
	});

/***/ },
/* 179 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(156);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 180 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(126)
	  , toObject    = __webpack_require__(179)
	  , IE_PROTO    = __webpack_require__(161)('IE_PROTO')
	  , ObjectProto = Object.prototype;
	
	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 181 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(179)
	  , $keys    = __webpack_require__(151);
	
	__webpack_require__(177)('keys', function(){
	  return function keys(it){
	    return $keys(toObject(it));
	  };
	});

/***/ },
/* 182 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 Object.getOwnPropertyNames(O)
	__webpack_require__(177)('getOwnPropertyNames', function(){
	  return __webpack_require__(170).f;
	});

/***/ },
/* 183 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.5 Object.freeze(O)
	var isObject = __webpack_require__(134)
	  , meta     = __webpack_require__(143).onFreeze;
	
	__webpack_require__(177)('freeze', function($freeze){
	  return function freeze(it){
	    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
	  };
	});

/***/ },
/* 184 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.17 Object.seal(O)
	var isObject = __webpack_require__(134)
	  , meta     = __webpack_require__(143).onFreeze;
	
	__webpack_require__(177)('seal', function($seal){
	  return function seal(it){
	    return $seal && isObject(it) ? $seal(meta(it)) : it;
	  };
	});

/***/ },
/* 185 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.15 Object.preventExtensions(O)
	var isObject = __webpack_require__(134)
	  , meta     = __webpack_require__(143).onFreeze;
	
	__webpack_require__(177)('preventExtensions', function($preventExtensions){
	  return function preventExtensions(it){
	    return $preventExtensions && isObject(it) ? $preventExtensions(meta(it)) : it;
	  };
	});

/***/ },
/* 186 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.12 Object.isFrozen(O)
	var isObject = __webpack_require__(134);
	
	__webpack_require__(177)('isFrozen', function($isFrozen){
	  return function isFrozen(it){
	    return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
	  };
	});

/***/ },
/* 187 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.13 Object.isSealed(O)
	var isObject = __webpack_require__(134);
	
	__webpack_require__(177)('isSealed', function($isSealed){
	  return function isSealed(it){
	    return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
	  };
	});

/***/ },
/* 188 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.11 Object.isExtensible(O)
	var isObject = __webpack_require__(134);
	
	__webpack_require__(177)('isExtensible', function($isExtensible){
	  return function isExtensible(it){
	    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
	  };
	});

/***/ },
/* 189 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $export = __webpack_require__(129);
	
	$export($export.S + $export.F, 'Object', {assign: __webpack_require__(190)});

/***/ },
/* 190 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.2.1 Object.assign(target, source, ...)
	var getKeys  = __webpack_require__(151)
	  , gOPS     = __webpack_require__(164)
	  , pIE      = __webpack_require__(165)
	  , toObject = __webpack_require__(179)
	  , IObject  = __webpack_require__(154)
	  , $assign  = Object.assign;
	
	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = !$assign || __webpack_require__(128)(function(){
	  var A = {}
	    , B = {}
	    , S = Symbol()
	    , K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function(k){ B[k] = k; });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
	  var T     = toObject(target)
	    , aLen  = arguments.length
	    , index = 1
	    , getSymbols = gOPS.f
	    , isEnum     = pIE.f;
	  while(aLen > index){
	    var S      = IObject(arguments[index++])
	      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
	  } return T;
	} : $assign;

/***/ },
/* 191 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.10 Object.is(value1, value2)
	var $export = __webpack_require__(129);
	$export($export.S, 'Object', {is: __webpack_require__(192)});

/***/ },
/* 192 */
/***/ function(module, exports) {

	// 7.2.9 SameValue(x, y)
	module.exports = Object.is || function is(x, y){
	  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
	};

/***/ },
/* 193 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export = __webpack_require__(129);
	$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(194).set});

/***/ },
/* 194 */
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var isObject = __webpack_require__(134)
	  , anObject = __webpack_require__(133);
	var check = function(O, proto){
	  anObject(O);
	  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function(test, buggy, set){
	      try {
	        set = __webpack_require__(141)(Function.call, __webpack_require__(172).f(Object.prototype, '__proto__').set, 2);
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
/* 195 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.3.6 Object.prototype.toString()
	var classof = __webpack_require__(196)
	  , test    = {};
	test[__webpack_require__(146)('toStringTag')] = 'z';
	if(test + '' != '[object z]'){
	  __webpack_require__(139)(Object.prototype, 'toString', function toString(){
	    return '[object ' + classof(this) + ']';
	  }, true);
	}

/***/ },
/* 196 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(155)
	  , TAG = __webpack_require__(146)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';
	
	// fallback for IE11 Script Access Denied error
	var tryGet = function(it, key){
	  try {
	    return it[key];
	  } catch(e){ /* empty */ }
	};
	
	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 197 */
/***/ function(module, exports, __webpack_require__) {

	// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
	var $export = __webpack_require__(129);
	
	$export($export.P, 'Function', {bind: __webpack_require__(198)});

/***/ },
/* 198 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var aFunction  = __webpack_require__(142)
	  , isObject   = __webpack_require__(134)
	  , invoke     = __webpack_require__(199)
	  , arraySlice = [].slice
	  , factories  = {};
	
	var construct = function(F, len, args){
	  if(!(len in factories)){
	    for(var n = [], i = 0; i < len; i++)n[i] = 'a[' + i + ']';
	    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
	  } return factories[len](F, args);
	};
	
	module.exports = Function.bind || function bind(that /*, args... */){
	  var fn       = aFunction(this)
	    , partArgs = arraySlice.call(arguments, 1);
	  var bound = function(/* args... */){
	    var args = partArgs.concat(arraySlice.call(arguments));
	    return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
	  };
	  if(isObject(fn.prototype))bound.prototype = fn.prototype;
	  return bound;
	};

/***/ },
/* 199 */
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
/* 200 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(132).f
	  , createDesc = __webpack_require__(138)
	  , has        = __webpack_require__(126)
	  , FProto     = Function.prototype
	  , nameRE     = /^\s*function ([^ (]*)/
	  , NAME       = 'name';
	
	var isExtensible = Object.isExtensible || function(){
	  return true;
	};
	
	// 19.2.4.2 name
	NAME in FProto || __webpack_require__(127) && dP(FProto, NAME, {
	  configurable: true,
	  get: function(){
	    try {
	      var that = this
	        , name = ('' + that).match(nameRE)[1];
	      has(that, NAME) || !isExtensible(that) || dP(that, NAME, createDesc(5, name));
	      return name;
	    } catch(e){
	      return '';
	    }
	  }
	});

/***/ },
/* 201 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var isObject       = __webpack_require__(134)
	  , getPrototypeOf = __webpack_require__(180)
	  , HAS_INSTANCE   = __webpack_require__(146)('hasInstance')
	  , FunctionProto  = Function.prototype;
	// 19.2.3.6 Function.prototype[@@hasInstance](V)
	if(!(HAS_INSTANCE in FunctionProto))__webpack_require__(132).f(FunctionProto, HAS_INSTANCE, {value: function(O){
	  if(typeof this != 'function' || !isObject(O))return false;
	  if(!isObject(this.prototype))return O instanceof this;
	  // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
	  while(O = getPrototypeOf(O))if(this.prototype === O)return true;
	  return false;
	}});

/***/ },
/* 202 */
/***/ function(module, exports, __webpack_require__) {

	var $export   = __webpack_require__(129)
	  , $parseInt = __webpack_require__(203);
	// 18.2.5 parseInt(string, radix)
	$export($export.G + $export.F * (parseInt != $parseInt), {parseInt: $parseInt});

/***/ },
/* 203 */
/***/ function(module, exports, __webpack_require__) {

	var $parseInt = __webpack_require__(125).parseInt
	  , $trim     = __webpack_require__(204).trim
	  , ws        = __webpack_require__(205)
	  , hex       = /^[\-+]?0[xX]/;
	
	module.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix){
	  var string = $trim(String(str), 3);
	  return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
	} : $parseInt;

/***/ },
/* 204 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(129)
	  , defined = __webpack_require__(156)
	  , fails   = __webpack_require__(128)
	  , spaces  = __webpack_require__(205)
	  , space   = '[' + spaces + ']'
	  , non     = '\u200b\u0085'
	  , ltrim   = RegExp('^' + space + space + '*')
	  , rtrim   = RegExp(space + space + '*$');
	
	var exporter = function(KEY, exec, ALIAS){
	  var exp   = {};
	  var FORCE = fails(function(){
	    return !!spaces[KEY]() || non[KEY]() != non;
	  });
	  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
	  if(ALIAS)exp[ALIAS] = fn;
	  $export($export.P + $export.F * FORCE, 'String', exp);
	};
	
	// 1 -> String#trimLeft
	// 2 -> String#trimRight
	// 3 -> String#trim
	var trim = exporter.trim = function(string, TYPE){
	  string = String(defined(string));
	  if(TYPE & 1)string = string.replace(ltrim, '');
	  if(TYPE & 2)string = string.replace(rtrim, '');
	  return string;
	};
	
	module.exports = exporter;

/***/ },
/* 205 */
/***/ function(module, exports) {

	module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
	  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

/***/ },
/* 206 */
/***/ function(module, exports, __webpack_require__) {

	var $export     = __webpack_require__(129)
	  , $parseFloat = __webpack_require__(207);
	// 18.2.4 parseFloat(string)
	$export($export.G + $export.F * (parseFloat != $parseFloat), {parseFloat: $parseFloat});

/***/ },
/* 207 */
/***/ function(module, exports, __webpack_require__) {

	var $parseFloat = __webpack_require__(125).parseFloat
	  , $trim       = __webpack_require__(204).trim;
	
	module.exports = 1 / $parseFloat(__webpack_require__(205) + '-0') !== -Infinity ? function parseFloat(str){
	  var string = $trim(String(str), 3)
	    , result = $parseFloat(string);
	  return result === 0 && string.charAt(0) == '-' ? -0 : result;
	} : $parseFloat;

/***/ },
/* 208 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global            = __webpack_require__(125)
	  , has               = __webpack_require__(126)
	  , cof               = __webpack_require__(155)
	  , inheritIfRequired = __webpack_require__(209)
	  , toPrimitive       = __webpack_require__(137)
	  , fails             = __webpack_require__(128)
	  , gOPN              = __webpack_require__(171).f
	  , gOPD              = __webpack_require__(172).f
	  , dP                = __webpack_require__(132).f
	  , $trim             = __webpack_require__(204).trim
	  , NUMBER            = 'Number'
	  , $Number           = global[NUMBER]
	  , Base              = $Number
	  , proto             = $Number.prototype
	  // Opera ~12 has broken Object#toString
	  , BROKEN_COF        = cof(__webpack_require__(167)(proto)) == NUMBER
	  , TRIM              = 'trim' in String.prototype;
	
	// 7.1.3 ToNumber(argument)
	var toNumber = function(argument){
	  var it = toPrimitive(argument, false);
	  if(typeof it == 'string' && it.length > 2){
	    it = TRIM ? it.trim() : $trim(it, 3);
	    var first = it.charCodeAt(0)
	      , third, radix, maxCode;
	    if(first === 43 || first === 45){
	      third = it.charCodeAt(2);
	      if(third === 88 || third === 120)return NaN; // Number('+0x1') should be NaN, old V8 fix
	    } else if(first === 48){
	      switch(it.charCodeAt(1)){
	        case 66 : case 98  : radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
	        case 79 : case 111 : radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
	        default : return +it;
	      }
	      for(var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++){
	        code = digits.charCodeAt(i);
	        // parseInt parses a string to a first unavailable symbol
	        // but ToNumber should return NaN if a string contains unavailable symbols
	        if(code < 48 || code > maxCode)return NaN;
	      } return parseInt(digits, radix);
	    }
	  } return +it;
	};
	
	if(!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')){
	  $Number = function Number(value){
	    var it = arguments.length < 1 ? 0 : value
	      , that = this;
	    return that instanceof $Number
	      // check on 1..constructor(foo) case
	      && (BROKEN_COF ? fails(function(){ proto.valueOf.call(that); }) : cof(that) != NUMBER)
	        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
	  };
	  for(var keys = __webpack_require__(127) ? gOPN(Base) : (
	    // ES3:
	    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
	    // ES6 (in case, if modules with ES6 Number statics required before):
	    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
	    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
	  ).split(','), j = 0, key; keys.length > j; j++){
	    if(has(Base, key = keys[j]) && !has($Number, key)){
	      dP($Number, key, gOPD(Base, key));
	    }
	  }
	  $Number.prototype = proto;
	  proto.constructor = $Number;
	  __webpack_require__(139)(global, NUMBER, $Number);
	}

/***/ },
/* 209 */
/***/ function(module, exports, __webpack_require__) {

	var isObject       = __webpack_require__(134)
	  , setPrototypeOf = __webpack_require__(194).set;
	module.exports = function(that, target, C){
	  var P, S = target.constructor;
	  if(S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf){
	    setPrototypeOf(that, P);
	  } return that;
	};

/***/ },
/* 210 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export      = __webpack_require__(129)
	  , anInstance   = __webpack_require__(211)
	  , toInteger    = __webpack_require__(159)
	  , aNumberValue = __webpack_require__(212)
	  , repeat       = __webpack_require__(213)
	  , $toFixed     = 1..toFixed
	  , floor        = Math.floor
	  , data         = [0, 0, 0, 0, 0, 0]
	  , ERROR        = 'Number.toFixed: incorrect invocation!'
	  , ZERO         = '0';
	
	var multiply = function(n, c){
	  var i  = -1
	    , c2 = c;
	  while(++i < 6){
	    c2 += n * data[i];
	    data[i] = c2 % 1e7;
	    c2 = floor(c2 / 1e7);
	  }
	};
	var divide = function(n){
	  var i = 6
	    , c = 0;
	  while(--i >= 0){
	    c += data[i];
	    data[i] = floor(c / n);
	    c = (c % n) * 1e7;
	  }
	};
	var numToString = function(){
	  var i = 6
	    , s = '';
	  while(--i >= 0){
	    if(s !== '' || i === 0 || data[i] !== 0){
	      var t = String(data[i]);
	      s = s === '' ? t : s + repeat.call(ZERO, 7 - t.length) + t;
	    }
	  } return s;
	};
	var pow = function(x, n, acc){
	  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
	};
	var log = function(x){
	  var n  = 0
	    , x2 = x;
	  while(x2 >= 4096){
	    n += 12;
	    x2 /= 4096;
	  }
	  while(x2 >= 2){
	    n  += 1;
	    x2 /= 2;
	  } return n;
	};
	
	$export($export.P + $export.F * (!!$toFixed && (
	  0.00008.toFixed(3) !== '0.000' ||
	  0.9.toFixed(0) !== '1' ||
	  1.255.toFixed(2) !== '1.25' ||
	  1000000000000000128..toFixed(0) !== '1000000000000000128'
	) || !__webpack_require__(128)(function(){
	  // V8 ~ Android 4.3-
	  $toFixed.call({});
	})), 'Number', {
	  toFixed: function toFixed(fractionDigits){
	    var x = aNumberValue(this, ERROR)
	      , f = toInteger(fractionDigits)
	      , s = ''
	      , m = ZERO
	      , e, z, j, k;
	    if(f < 0 || f > 20)throw RangeError(ERROR);
	    if(x != x)return 'NaN';
	    if(x <= -1e21 || x >= 1e21)return String(x);
	    if(x < 0){
	      s = '-';
	      x = -x;
	    }
	    if(x > 1e-21){
	      e = log(x * pow(2, 69, 1)) - 69;
	      z = e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1);
	      z *= 0x10000000000000;
	      e = 52 - e;
	      if(e > 0){
	        multiply(0, z);
	        j = f;
	        while(j >= 7){
	          multiply(1e7, 0);
	          j -= 7;
	        }
	        multiply(pow(10, j, 1), 0);
	        j = e - 1;
	        while(j >= 23){
	          divide(1 << 23);
	          j -= 23;
	        }
	        divide(1 << j);
	        multiply(1, 1);
	        divide(2);
	        m = numToString();
	      } else {
	        multiply(0, z);
	        multiply(1 << -e, 0);
	        m = numToString() + repeat.call(ZERO, f);
	      }
	    }
	    if(f > 0){
	      k = m.length;
	      m = s + (k <= f ? '0.' + repeat.call(ZERO, f - k) + m : m.slice(0, k - f) + '.' + m.slice(k - f));
	    } else {
	      m = s + m;
	    } return m;
	  }
	});

/***/ },
/* 211 */
/***/ function(module, exports) {

	module.exports = function(it, Constructor, name, forbiddenField){
	  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
	    throw TypeError(name + ': incorrect invocation!');
	  } return it;
	};

/***/ },
/* 212 */
/***/ function(module, exports, __webpack_require__) {

	var cof = __webpack_require__(155);
	module.exports = function(it, msg){
	  if(typeof it != 'number' && cof(it) != 'Number')throw TypeError(msg);
	  return +it;
	};

/***/ },
/* 213 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var toInteger = __webpack_require__(159)
	  , defined   = __webpack_require__(156);
	
	module.exports = function repeat(count){
	  var str = String(defined(this))
	    , res = ''
	    , n   = toInteger(count);
	  if(n < 0 || n == Infinity)throw RangeError("Count can't be negative");
	  for(;n > 0; (n >>>= 1) && (str += str))if(n & 1)res += str;
	  return res;
	};

/***/ },
/* 214 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export      = __webpack_require__(129)
	  , $fails       = __webpack_require__(128)
	  , aNumberValue = __webpack_require__(212)
	  , $toPrecision = 1..toPrecision;
	
	$export($export.P + $export.F * ($fails(function(){
	  // IE7-
	  return $toPrecision.call(1, undefined) !== '1';
	}) || !$fails(function(){
	  // V8 ~ Android 4.3-
	  $toPrecision.call({});
	})), 'Number', {
	  toPrecision: function toPrecision(precision){
	    var that = aNumberValue(this, 'Number#toPrecision: incorrect invocation!');
	    return precision === undefined ? $toPrecision.call(that) : $toPrecision.call(that, precision); 
	  }
	});

/***/ },
/* 215 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.1 Number.EPSILON
	var $export = __webpack_require__(129);
	
	$export($export.S, 'Number', {EPSILON: Math.pow(2, -52)});

/***/ },
/* 216 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.2 Number.isFinite(number)
	var $export   = __webpack_require__(129)
	  , _isFinite = __webpack_require__(125).isFinite;
	
	$export($export.S, 'Number', {
	  isFinite: function isFinite(it){
	    return typeof it == 'number' && _isFinite(it);
	  }
	});

/***/ },
/* 217 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.3 Number.isInteger(number)
	var $export = __webpack_require__(129);
	
	$export($export.S, 'Number', {isInteger: __webpack_require__(218)});

/***/ },
/* 218 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.3 Number.isInteger(number)
	var isObject = __webpack_require__(134)
	  , floor    = Math.floor;
	module.exports = function isInteger(it){
	  return !isObject(it) && isFinite(it) && floor(it) === it;
	};

/***/ },
/* 219 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.4 Number.isNaN(number)
	var $export = __webpack_require__(129);
	
	$export($export.S, 'Number', {
	  isNaN: function isNaN(number){
	    return number != number;
	  }
	});

/***/ },
/* 220 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.5 Number.isSafeInteger(number)
	var $export   = __webpack_require__(129)
	  , isInteger = __webpack_require__(218)
	  , abs       = Math.abs;
	
	$export($export.S, 'Number', {
	  isSafeInteger: function isSafeInteger(number){
	    return isInteger(number) && abs(number) <= 0x1fffffffffffff;
	  }
	});

/***/ },
/* 221 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.6 Number.MAX_SAFE_INTEGER
	var $export = __webpack_require__(129);
	
	$export($export.S, 'Number', {MAX_SAFE_INTEGER: 0x1fffffffffffff});

/***/ },
/* 222 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.10 Number.MIN_SAFE_INTEGER
	var $export = __webpack_require__(129);
	
	$export($export.S, 'Number', {MIN_SAFE_INTEGER: -0x1fffffffffffff});

/***/ },
/* 223 */
/***/ function(module, exports, __webpack_require__) {

	var $export     = __webpack_require__(129)
	  , $parseFloat = __webpack_require__(207);
	// 20.1.2.12 Number.parseFloat(string)
	$export($export.S + $export.F * (Number.parseFloat != $parseFloat), 'Number', {parseFloat: $parseFloat});

/***/ },
/* 224 */
/***/ function(module, exports, __webpack_require__) {

	var $export   = __webpack_require__(129)
	  , $parseInt = __webpack_require__(203);
	// 20.1.2.13 Number.parseInt(string, radix)
	$export($export.S + $export.F * (Number.parseInt != $parseInt), 'Number', {parseInt: $parseInt});

/***/ },
/* 225 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.3 Math.acosh(x)
	var $export = __webpack_require__(129)
	  , log1p   = __webpack_require__(226)
	  , sqrt    = Math.sqrt
	  , $acosh  = Math.acosh;
	
	$export($export.S + $export.F * !($acosh
	  // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
	  && Math.floor($acosh(Number.MAX_VALUE)) == 710
	  // Tor Browser bug: Math.acosh(Infinity) -> NaN 
	  && $acosh(Infinity) == Infinity
	), 'Math', {
	  acosh: function acosh(x){
	    return (x = +x) < 1 ? NaN : x > 94906265.62425156
	      ? Math.log(x) + Math.LN2
	      : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
	  }
	});

/***/ },
/* 226 */
/***/ function(module, exports) {

	// 20.2.2.20 Math.log1p(x)
	module.exports = Math.log1p || function log1p(x){
	  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
	};

/***/ },
/* 227 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.5 Math.asinh(x)
	var $export = __webpack_require__(129)
	  , $asinh  = Math.asinh;
	
	function asinh(x){
	  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
	}
	
	// Tor Browser bug: Math.asinh(0) -> -0 
	$export($export.S + $export.F * !($asinh && 1 / $asinh(0) > 0), 'Math', {asinh: asinh});

/***/ },
/* 228 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.7 Math.atanh(x)
	var $export = __webpack_require__(129)
	  , $atanh  = Math.atanh;
	
	// Tor Browser bug: Math.atanh(-0) -> 0 
	$export($export.S + $export.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
	  atanh: function atanh(x){
	    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
	  }
	});

/***/ },
/* 229 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.9 Math.cbrt(x)
	var $export = __webpack_require__(129)
	  , sign    = __webpack_require__(230);
	
	$export($export.S, 'Math', {
	  cbrt: function cbrt(x){
	    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
	  }
	});

/***/ },
/* 230 */
/***/ function(module, exports) {

	// 20.2.2.28 Math.sign(x)
	module.exports = Math.sign || function sign(x){
	  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
	};

/***/ },
/* 231 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.11 Math.clz32(x)
	var $export = __webpack_require__(129);
	
	$export($export.S, 'Math', {
	  clz32: function clz32(x){
	    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
	  }
	});

/***/ },
/* 232 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.12 Math.cosh(x)
	var $export = __webpack_require__(129)
	  , exp     = Math.exp;
	
	$export($export.S, 'Math', {
	  cosh: function cosh(x){
	    return (exp(x = +x) + exp(-x)) / 2;
	  }
	});

/***/ },
/* 233 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.14 Math.expm1(x)
	var $export = __webpack_require__(129)
	  , $expm1  = __webpack_require__(234);
	
	$export($export.S + $export.F * ($expm1 != Math.expm1), 'Math', {expm1: $expm1});

/***/ },
/* 234 */
/***/ function(module, exports) {

	// 20.2.2.14 Math.expm1(x)
	var $expm1 = Math.expm1;
	module.exports = (!$expm1
	  // Old FF bug
	  || $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168
	  // Tor Browser bug
	  || $expm1(-2e-17) != -2e-17
	) ? function expm1(x){
	  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
	} : $expm1;

/***/ },
/* 235 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.16 Math.fround(x)
	var $export   = __webpack_require__(129)
	  , sign      = __webpack_require__(230)
	  , pow       = Math.pow
	  , EPSILON   = pow(2, -52)
	  , EPSILON32 = pow(2, -23)
	  , MAX32     = pow(2, 127) * (2 - EPSILON32)
	  , MIN32     = pow(2, -126);
	
	var roundTiesToEven = function(n){
	  return n + 1 / EPSILON - 1 / EPSILON;
	};
	
	
	$export($export.S, 'Math', {
	  fround: function fround(x){
	    var $abs  = Math.abs(x)
	      , $sign = sign(x)
	      , a, result;
	    if($abs < MIN32)return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
	    a = (1 + EPSILON32 / EPSILON) * $abs;
	    result = a - (a - $abs);
	    if(result > MAX32 || result != result)return $sign * Infinity;
	    return $sign * result;
	  }
	});

/***/ },
/* 236 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
	var $export = __webpack_require__(129)
	  , abs     = Math.abs;
	
	$export($export.S, 'Math', {
	  hypot: function hypot(value1, value2){ // eslint-disable-line no-unused-vars
	    var sum  = 0
	      , i    = 0
	      , aLen = arguments.length
	      , larg = 0
	      , arg, div;
	    while(i < aLen){
	      arg = abs(arguments[i++]);
	      if(larg < arg){
	        div  = larg / arg;
	        sum  = sum * div * div + 1;
	        larg = arg;
	      } else if(arg > 0){
	        div  = arg / larg;
	        sum += div * div;
	      } else sum += arg;
	    }
	    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
	  }
	});

/***/ },
/* 237 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.18 Math.imul(x, y)
	var $export = __webpack_require__(129)
	  , $imul   = Math.imul;
	
	// some WebKit versions fails with big numbers, some has wrong arity
	$export($export.S + $export.F * __webpack_require__(128)(function(){
	  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
	}), 'Math', {
	  imul: function imul(x, y){
	    var UINT16 = 0xffff
	      , xn = +x
	      , yn = +y
	      , xl = UINT16 & xn
	      , yl = UINT16 & yn;
	    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
	  }
	});

/***/ },
/* 238 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.21 Math.log10(x)
	var $export = __webpack_require__(129);
	
	$export($export.S, 'Math', {
	  log10: function log10(x){
	    return Math.log(x) / Math.LN10;
	  }
	});

/***/ },
/* 239 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.20 Math.log1p(x)
	var $export = __webpack_require__(129);
	
	$export($export.S, 'Math', {log1p: __webpack_require__(226)});

/***/ },
/* 240 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.22 Math.log2(x)
	var $export = __webpack_require__(129);
	
	$export($export.S, 'Math', {
	  log2: function log2(x){
	    return Math.log(x) / Math.LN2;
	  }
	});

/***/ },
/* 241 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.28 Math.sign(x)
	var $export = __webpack_require__(129);
	
	$export($export.S, 'Math', {sign: __webpack_require__(230)});

/***/ },
/* 242 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.30 Math.sinh(x)
	var $export = __webpack_require__(129)
	  , expm1   = __webpack_require__(234)
	  , exp     = Math.exp;
	
	// V8 near Chromium 38 has a problem with very small numbers
	$export($export.S + $export.F * __webpack_require__(128)(function(){
	  return !Math.sinh(-2e-17) != -2e-17;
	}), 'Math', {
	  sinh: function sinh(x){
	    return Math.abs(x = +x) < 1
	      ? (expm1(x) - expm1(-x)) / 2
	      : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
	  }
	});

/***/ },
/* 243 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.33 Math.tanh(x)
	var $export = __webpack_require__(129)
	  , expm1   = __webpack_require__(234)
	  , exp     = Math.exp;
	
	$export($export.S, 'Math', {
	  tanh: function tanh(x){
	    var a = expm1(x = +x)
	      , b = expm1(-x);
	    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
	  }
	});

/***/ },
/* 244 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.34 Math.trunc(x)
	var $export = __webpack_require__(129);
	
	$export($export.S, 'Math', {
	  trunc: function trunc(it){
	    return (it > 0 ? Math.floor : Math.ceil)(it);
	  }
	});

/***/ },
/* 245 */
/***/ function(module, exports, __webpack_require__) {

	var $export        = __webpack_require__(129)
	  , toIndex        = __webpack_require__(160)
	  , fromCharCode   = String.fromCharCode
	  , $fromCodePoint = String.fromCodePoint;
	
	// length should be 1, old FF problem
	$export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
	  // 21.1.2.2 String.fromCodePoint(...codePoints)
	  fromCodePoint: function fromCodePoint(x){ // eslint-disable-line no-unused-vars
	    var res  = []
	      , aLen = arguments.length
	      , i    = 0
	      , code;
	    while(aLen > i){
	      code = +arguments[i++];
	      if(toIndex(code, 0x10ffff) !== code)throw RangeError(code + ' is not a valid code point');
	      res.push(code < 0x10000
	        ? fromCharCode(code)
	        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
	      );
	    } return res.join('');
	  }
	});

/***/ },
/* 246 */
/***/ function(module, exports, __webpack_require__) {

	var $export   = __webpack_require__(129)
	  , toIObject = __webpack_require__(153)
	  , toLength  = __webpack_require__(158);
	
	$export($export.S, 'String', {
	  // 21.1.2.4 String.raw(callSite, ...substitutions)
	  raw: function raw(callSite){
	    var tpl  = toIObject(callSite.raw)
	      , len  = toLength(tpl.length)
	      , aLen = arguments.length
	      , res  = []
	      , i    = 0;
	    while(len > i){
	      res.push(String(tpl[i++]));
	      if(i < aLen)res.push(String(arguments[i]));
	    } return res.join('');
	  }
	});

/***/ },
/* 247 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 21.1.3.25 String.prototype.trim()
	__webpack_require__(204)('trim', function($trim){
	  return function trim(){
	    return $trim(this, 3);
	  };
	});

/***/ },
/* 248 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(249)(true);
	
	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(250)(String, 'String', function(iterated){
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
/* 249 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(159)
	  , defined   = __webpack_require__(156);
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
/* 250 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(149)
	  , $export        = __webpack_require__(129)
	  , redefine       = __webpack_require__(139)
	  , hide           = __webpack_require__(131)
	  , has            = __webpack_require__(126)
	  , Iterators      = __webpack_require__(251)
	  , $iterCreate    = __webpack_require__(252)
	  , setToStringTag = __webpack_require__(145)
	  , getPrototypeOf = __webpack_require__(180)
	  , ITERATOR       = __webpack_require__(146)('iterator')
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
	    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
	    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
	    , methods, key, IteratorPrototype;
	  // Fix native
	  if($anyNative){
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
	    if(IteratorPrototype !== Object.prototype){
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if(DEF_VALUES && $native && $native.name !== VALUES){
	    VALUES_BUG = true;
	    $default = function values(){ return $native.call(this); };
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
	      values:  DEF_VALUES ? $default : getMethod(VALUES),
	      keys:    IS_SET     ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 251 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 252 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(167)
	  , descriptor     = __webpack_require__(138)
	  , setToStringTag = __webpack_require__(145)
	  , IteratorPrototype = {};
	
	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(131)(IteratorPrototype, __webpack_require__(146)('iterator'), function(){ return this; });
	
	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 253 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export = __webpack_require__(129)
	  , $at     = __webpack_require__(249)(false);
	$export($export.P, 'String', {
	  // 21.1.3.3 String.prototype.codePointAt(pos)
	  codePointAt: function codePointAt(pos){
	    return $at(this, pos);
	  }
	});

/***/ },
/* 254 */
/***/ function(module, exports, __webpack_require__) {

	// 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])
	'use strict';
	var $export   = __webpack_require__(129)
	  , toLength  = __webpack_require__(158)
	  , context   = __webpack_require__(255)
	  , ENDS_WITH = 'endsWith'
	  , $endsWith = ''[ENDS_WITH];
	
	$export($export.P + $export.F * __webpack_require__(257)(ENDS_WITH), 'String', {
	  endsWith: function endsWith(searchString /*, endPosition = @length */){
	    var that = context(this, searchString, ENDS_WITH)
	      , endPosition = arguments.length > 1 ? arguments[1] : undefined
	      , len    = toLength(that.length)
	      , end    = endPosition === undefined ? len : Math.min(toLength(endPosition), len)
	      , search = String(searchString);
	    return $endsWith
	      ? $endsWith.call(that, search, end)
	      : that.slice(end - search.length, end) === search;
	  }
	});

/***/ },
/* 255 */
/***/ function(module, exports, __webpack_require__) {

	// helper for String#{startsWith, endsWith, includes}
	var isRegExp = __webpack_require__(256)
	  , defined  = __webpack_require__(156);
	
	module.exports = function(that, searchString, NAME){
	  if(isRegExp(searchString))throw TypeError('String#' + NAME + " doesn't accept regex!");
	  return String(defined(that));
	};

/***/ },
/* 256 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.8 IsRegExp(argument)
	var isObject = __webpack_require__(134)
	  , cof      = __webpack_require__(155)
	  , MATCH    = __webpack_require__(146)('match');
	module.exports = function(it){
	  var isRegExp;
	  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
	};

/***/ },
/* 257 */
/***/ function(module, exports, __webpack_require__) {

	var MATCH = __webpack_require__(146)('match');
	module.exports = function(KEY){
	  var re = /./;
	  try {
	    '/./'[KEY](re);
	  } catch(e){
	    try {
	      re[MATCH] = false;
	      return !'/./'[KEY](re);
	    } catch(f){ /* empty */ }
	  } return true;
	};

/***/ },
/* 258 */
/***/ function(module, exports, __webpack_require__) {

	// 21.1.3.7 String.prototype.includes(searchString, position = 0)
	'use strict';
	var $export  = __webpack_require__(129)
	  , context  = __webpack_require__(255)
	  , INCLUDES = 'includes';
	
	$export($export.P + $export.F * __webpack_require__(257)(INCLUDES), 'String', {
	  includes: function includes(searchString /*, position = 0 */){
	    return !!~context(this, searchString, INCLUDES)
	      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

/***/ },
/* 259 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(129);
	
	$export($export.P, 'String', {
	  // 21.1.3.13 String.prototype.repeat(count)
	  repeat: __webpack_require__(213)
	});

/***/ },
/* 260 */
/***/ function(module, exports, __webpack_require__) {

	// 21.1.3.18 String.prototype.startsWith(searchString [, position ])
	'use strict';
	var $export     = __webpack_require__(129)
	  , toLength    = __webpack_require__(158)
	  , context     = __webpack_require__(255)
	  , STARTS_WITH = 'startsWith'
	  , $startsWith = ''[STARTS_WITH];
	
	$export($export.P + $export.F * __webpack_require__(257)(STARTS_WITH), 'String', {
	  startsWith: function startsWith(searchString /*, position = 0 */){
	    var that   = context(this, searchString, STARTS_WITH)
	      , index  = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length))
	      , search = String(searchString);
	    return $startsWith
	      ? $startsWith.call(that, search, index)
	      : that.slice(index, index + search.length) === search;
	  }
	});

/***/ },
/* 261 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.2 String.prototype.anchor(name)
	__webpack_require__(262)('anchor', function(createHTML){
	  return function anchor(name){
	    return createHTML(this, 'a', 'name', name);
	  }
	});

/***/ },
/* 262 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(129)
	  , fails   = __webpack_require__(128)
	  , defined = __webpack_require__(156)
	  , quot    = /"/g;
	// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
	var createHTML = function(string, tag, attribute, value) {
	  var S  = String(defined(string))
	    , p1 = '<' + tag;
	  if(attribute !== '')p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
	  return p1 + '>' + S + '</' + tag + '>';
	};
	module.exports = function(NAME, exec){
	  var O = {};
	  O[NAME] = exec(createHTML);
	  $export($export.P + $export.F * fails(function(){
	    var test = ''[NAME]('"');
	    return test !== test.toLowerCase() || test.split('"').length > 3;
	  }), 'String', O);
	};

/***/ },
/* 263 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.3 String.prototype.big()
	__webpack_require__(262)('big', function(createHTML){
	  return function big(){
	    return createHTML(this, 'big', '', '');
	  }
	});

/***/ },
/* 264 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.4 String.prototype.blink()
	__webpack_require__(262)('blink', function(createHTML){
	  return function blink(){
	    return createHTML(this, 'blink', '', '');
	  }
	});

/***/ },
/* 265 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.5 String.prototype.bold()
	__webpack_require__(262)('bold', function(createHTML){
	  return function bold(){
	    return createHTML(this, 'b', '', '');
	  }
	});

/***/ },
/* 266 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.6 String.prototype.fixed()
	__webpack_require__(262)('fixed', function(createHTML){
	  return function fixed(){
	    return createHTML(this, 'tt', '', '');
	  }
	});

/***/ },
/* 267 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.7 String.prototype.fontcolor(color)
	__webpack_require__(262)('fontcolor', function(createHTML){
	  return function fontcolor(color){
	    return createHTML(this, 'font', 'color', color);
	  }
	});

/***/ },
/* 268 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.8 String.prototype.fontsize(size)
	__webpack_require__(262)('fontsize', function(createHTML){
	  return function fontsize(size){
	    return createHTML(this, 'font', 'size', size);
	  }
	});

/***/ },
/* 269 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.9 String.prototype.italics()
	__webpack_require__(262)('italics', function(createHTML){
	  return function italics(){
	    return createHTML(this, 'i', '', '');
	  }
	});

/***/ },
/* 270 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.10 String.prototype.link(url)
	__webpack_require__(262)('link', function(createHTML){
	  return function link(url){
	    return createHTML(this, 'a', 'href', url);
	  }
	});

/***/ },
/* 271 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.11 String.prototype.small()
	__webpack_require__(262)('small', function(createHTML){
	  return function small(){
	    return createHTML(this, 'small', '', '');
	  }
	});

/***/ },
/* 272 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.12 String.prototype.strike()
	__webpack_require__(262)('strike', function(createHTML){
	  return function strike(){
	    return createHTML(this, 'strike', '', '');
	  }
	});

/***/ },
/* 273 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.13 String.prototype.sub()
	__webpack_require__(262)('sub', function(createHTML){
	  return function sub(){
	    return createHTML(this, 'sub', '', '');
	  }
	});

/***/ },
/* 274 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.14 String.prototype.sup()
	__webpack_require__(262)('sup', function(createHTML){
	  return function sup(){
	    return createHTML(this, 'sup', '', '');
	  }
	});

/***/ },
/* 275 */
/***/ function(module, exports, __webpack_require__) {

	// 20.3.3.1 / 15.9.4.4 Date.now()
	var $export = __webpack_require__(129);
	
	$export($export.S, 'Date', {now: function(){ return new Date().getTime(); }});

/***/ },
/* 276 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export     = __webpack_require__(129)
	  , toObject    = __webpack_require__(179)
	  , toPrimitive = __webpack_require__(137);
	
	$export($export.P + $export.F * __webpack_require__(128)(function(){
	  return new Date(NaN).toJSON() !== null || Date.prototype.toJSON.call({toISOString: function(){ return 1; }}) !== 1;
	}), 'Date', {
	  toJSON: function toJSON(key){
	    var O  = toObject(this)
	      , pv = toPrimitive(O);
	    return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
	  }
	});

/***/ },
/* 277 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
	var $export = __webpack_require__(129)
	  , fails   = __webpack_require__(128)
	  , getTime = Date.prototype.getTime;
	
	var lz = function(num){
	  return num > 9 ? num : '0' + num;
	};
	
	// PhantomJS / old WebKit has a broken implementations
	$export($export.P + $export.F * (fails(function(){
	  return new Date(-5e13 - 1).toISOString() != '0385-07-25T07:06:39.999Z';
	}) || !fails(function(){
	  new Date(NaN).toISOString();
	})), 'Date', {
	  toISOString: function toISOString(){
	    if(!isFinite(getTime.call(this)))throw RangeError('Invalid time value');
	    var d = this
	      , y = d.getUTCFullYear()
	      , m = d.getUTCMilliseconds()
	      , s = y < 0 ? '-' : y > 9999 ? '+' : '';
	    return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) +
	      '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) +
	      'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) +
	      ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
	  }
	});

/***/ },
/* 278 */
/***/ function(module, exports, __webpack_require__) {

	var DateProto    = Date.prototype
	  , INVALID_DATE = 'Invalid Date'
	  , TO_STRING    = 'toString'
	  , $toString    = DateProto[TO_STRING]
	  , getTime      = DateProto.getTime;
	if(new Date(NaN) + '' != INVALID_DATE){
	  __webpack_require__(139)(DateProto, TO_STRING, function toString(){
	    var value = getTime.call(this);
	    return value === value ? $toString.call(this) : INVALID_DATE;
	  });
	}

/***/ },
/* 279 */
/***/ function(module, exports, __webpack_require__) {

	var TO_PRIMITIVE = __webpack_require__(146)('toPrimitive')
	  , proto        = Date.prototype;
	
	if(!(TO_PRIMITIVE in proto))__webpack_require__(131)(proto, TO_PRIMITIVE, __webpack_require__(280));

/***/ },
/* 280 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var anObject    = __webpack_require__(133)
	  , toPrimitive = __webpack_require__(137)
	  , NUMBER      = 'number';
	
	module.exports = function(hint){
	  if(hint !== 'string' && hint !== NUMBER && hint !== 'default')throw TypeError('Incorrect hint');
	  return toPrimitive(anObject(this), hint != NUMBER);
	};

/***/ },
/* 281 */
/***/ function(module, exports, __webpack_require__) {

	// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
	var $export = __webpack_require__(129);
	
	$export($export.S, 'Array', {isArray: __webpack_require__(166)});

/***/ },
/* 282 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ctx            = __webpack_require__(141)
	  , $export        = __webpack_require__(129)
	  , toObject       = __webpack_require__(179)
	  , call           = __webpack_require__(283)
	  , isArrayIter    = __webpack_require__(284)
	  , toLength       = __webpack_require__(158)
	  , createProperty = __webpack_require__(285)
	  , getIterFn      = __webpack_require__(286);
	
	$export($export.S + $export.F * !__webpack_require__(287)(function(iter){ Array.from(iter); }), 'Array', {
	  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
	    var O       = toObject(arrayLike)
	      , C       = typeof this == 'function' ? this : Array
	      , aLen    = arguments.length
	      , mapfn   = aLen > 1 ? arguments[1] : undefined
	      , mapping = mapfn !== undefined
	      , index   = 0
	      , iterFn  = getIterFn(O)
	      , length, result, step, iterator;
	    if(mapping)mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
	    // if object isn't iterable or it's array with default iterator - use simple case
	    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
	      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
	        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
	      }
	    } else {
	      length = toLength(O.length);
	      for(result = new C(length); length > index; index++){
	        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
	      }
	    }
	    result.length = index;
	    return result;
	  }
	});


/***/ },
/* 283 */
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(133);
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
/* 284 */
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(251)
	  , ITERATOR   = __webpack_require__(146)('iterator')
	  , ArrayProto = Array.prototype;
	
	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },
/* 285 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $defineProperty = __webpack_require__(132)
	  , createDesc      = __webpack_require__(138);
	
	module.exports = function(object, index, value){
	  if(index in object)$defineProperty.f(object, index, createDesc(0, value));
	  else object[index] = value;
	};

/***/ },
/* 286 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(196)
	  , ITERATOR  = __webpack_require__(146)('iterator')
	  , Iterators = __webpack_require__(251);
	module.exports = __webpack_require__(130).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 287 */
/***/ function(module, exports, __webpack_require__) {

	var ITERATOR     = __webpack_require__(146)('iterator')
	  , SAFE_CLOSING = false;
	
	try {
	  var riter = [7][ITERATOR]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	  Array.from(riter, function(){ throw 2; });
	} catch(e){ /* empty */ }
	
	module.exports = function(exec, skipClosing){
	  if(!skipClosing && !SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[ITERATOR]();
	    iter.next = function(){ return {done: safe = true}; };
	    arr[ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

/***/ },
/* 288 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export        = __webpack_require__(129)
	  , createProperty = __webpack_require__(285);
	
	// WebKit Array.of isn't generic
	$export($export.S + $export.F * __webpack_require__(128)(function(){
	  function F(){}
	  return !(Array.of.call(F) instanceof F);
	}), 'Array', {
	  // 22.1.2.3 Array.of( ...items)
	  of: function of(/* ...args */){
	    var index  = 0
	      , aLen   = arguments.length
	      , result = new (typeof this == 'function' ? this : Array)(aLen);
	    while(aLen > index)createProperty(result, index, arguments[index++]);
	    result.length = aLen;
	    return result;
	  }
	});

/***/ },
/* 289 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 22.1.3.13 Array.prototype.join(separator)
	var $export   = __webpack_require__(129)
	  , toIObject = __webpack_require__(153)
	  , arrayJoin = [].join;
	
	// fallback for not array-like strings
	$export($export.P + $export.F * (__webpack_require__(154) != Object || !__webpack_require__(290)(arrayJoin)), 'Array', {
	  join: function join(separator){
	    return arrayJoin.call(toIObject(this), separator === undefined ? ',' : separator);
	  }
	});

/***/ },
/* 290 */
/***/ function(module, exports, __webpack_require__) {

	var fails = __webpack_require__(128);
	
	module.exports = function(method, arg){
	  return !!method && fails(function(){
	    arg ? method.call(null, function(){}, 1) : method.call(null);
	  });
	};

/***/ },
/* 291 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export    = __webpack_require__(129)
	  , html       = __webpack_require__(169)
	  , cof        = __webpack_require__(155)
	  , toIndex    = __webpack_require__(160)
	  , toLength   = __webpack_require__(158)
	  , arraySlice = [].slice;
	
	// fallback for not array-like ES3 strings and DOM objects
	$export($export.P + $export.F * __webpack_require__(128)(function(){
	  if(html)arraySlice.call(html);
	}), 'Array', {
	  slice: function slice(begin, end){
	    var len   = toLength(this.length)
	      , klass = cof(this);
	    end = end === undefined ? len : end;
	    if(klass == 'Array')return arraySlice.call(this, begin, end);
	    var start  = toIndex(begin, len)
	      , upTo   = toIndex(end, len)
	      , size   = toLength(upTo - start)
	      , cloned = Array(size)
	      , i      = 0;
	    for(; i < size; i++)cloned[i] = klass == 'String'
	      ? this.charAt(start + i)
	      : this[start + i];
	    return cloned;
	  }
	});

/***/ },
/* 292 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export   = __webpack_require__(129)
	  , aFunction = __webpack_require__(142)
	  , toObject  = __webpack_require__(179)
	  , fails     = __webpack_require__(128)
	  , $sort     = [].sort
	  , test      = [1, 2, 3];
	
	$export($export.P + $export.F * (fails(function(){
	  // IE8-
	  test.sort(undefined);
	}) || !fails(function(){
	  // V8 bug
	  test.sort(null);
	  // Old WebKit
	}) || !__webpack_require__(290)($sort)), 'Array', {
	  // 22.1.3.25 Array.prototype.sort(comparefn)
	  sort: function sort(comparefn){
	    return comparefn === undefined
	      ? $sort.call(toObject(this))
	      : $sort.call(toObject(this), aFunction(comparefn));
	  }
	});

/***/ },
/* 293 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export  = __webpack_require__(129)
	  , $forEach = __webpack_require__(294)(0)
	  , STRICT   = __webpack_require__(290)([].forEach, true);
	
	$export($export.P + $export.F * !STRICT, 'Array', {
	  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
	  forEach: function forEach(callbackfn /* , thisArg */){
	    return $forEach(this, callbackfn, arguments[1]);
	  }
	});

/***/ },
/* 294 */
/***/ function(module, exports, __webpack_require__) {

	// 0 -> Array#forEach
	// 1 -> Array#map
	// 2 -> Array#filter
	// 3 -> Array#some
	// 4 -> Array#every
	// 5 -> Array#find
	// 6 -> Array#findIndex
	var ctx      = __webpack_require__(141)
	  , IObject  = __webpack_require__(154)
	  , toObject = __webpack_require__(179)
	  , toLength = __webpack_require__(158)
	  , asc      = __webpack_require__(295);
	module.exports = function(TYPE, $create){
	  var IS_MAP        = TYPE == 1
	    , IS_FILTER     = TYPE == 2
	    , IS_SOME       = TYPE == 3
	    , IS_EVERY      = TYPE == 4
	    , IS_FIND_INDEX = TYPE == 6
	    , NO_HOLES      = TYPE == 5 || IS_FIND_INDEX
	    , create        = $create || asc;
	  return function($this, callbackfn, that){
	    var O      = toObject($this)
	      , self   = IObject(O)
	      , f      = ctx(callbackfn, that, 3)
	      , length = toLength(self.length)
	      , index  = 0
	      , result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined
	      , val, res;
	    for(;length > index; index++)if(NO_HOLES || index in self){
	      val = self[index];
	      res = f(val, index, O);
	      if(TYPE){
	        if(IS_MAP)result[index] = res;            // map
	        else if(res)switch(TYPE){
	          case 3: return true;                    // some
	          case 5: return val;                     // find
	          case 6: return index;                   // findIndex
	          case 2: result.push(val);               // filter
	        } else if(IS_EVERY)return false;          // every
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
	  };
	};

/***/ },
/* 295 */
/***/ function(module, exports, __webpack_require__) {

	// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
	var speciesConstructor = __webpack_require__(296);
	
	module.exports = function(original, length){
	  return new (speciesConstructor(original))(length);
	};

/***/ },
/* 296 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(134)
	  , isArray  = __webpack_require__(166)
	  , SPECIES  = __webpack_require__(146)('species');
	
	module.exports = function(original){
	  var C;
	  if(isArray(original)){
	    C = original.constructor;
	    // cross-realm fallback
	    if(typeof C == 'function' && (C === Array || isArray(C.prototype)))C = undefined;
	    if(isObject(C)){
	      C = C[SPECIES];
	      if(C === null)C = undefined;
	    }
	  } return C === undefined ? Array : C;
	};

/***/ },
/* 297 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export = __webpack_require__(129)
	  , $map    = __webpack_require__(294)(1);
	
	$export($export.P + $export.F * !__webpack_require__(290)([].map, true), 'Array', {
	  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
	  map: function map(callbackfn /* , thisArg */){
	    return $map(this, callbackfn, arguments[1]);
	  }
	});

/***/ },
/* 298 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export = __webpack_require__(129)
	  , $filter = __webpack_require__(294)(2);
	
	$export($export.P + $export.F * !__webpack_require__(290)([].filter, true), 'Array', {
	  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
	  filter: function filter(callbackfn /* , thisArg */){
	    return $filter(this, callbackfn, arguments[1]);
	  }
	});

/***/ },
/* 299 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export = __webpack_require__(129)
	  , $some   = __webpack_require__(294)(3);
	
	$export($export.P + $export.F * !__webpack_require__(290)([].some, true), 'Array', {
	  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
	  some: function some(callbackfn /* , thisArg */){
	    return $some(this, callbackfn, arguments[1]);
	  }
	});

/***/ },
/* 300 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export = __webpack_require__(129)
	  , $every  = __webpack_require__(294)(4);
	
	$export($export.P + $export.F * !__webpack_require__(290)([].every, true), 'Array', {
	  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
	  every: function every(callbackfn /* , thisArg */){
	    return $every(this, callbackfn, arguments[1]);
	  }
	});

/***/ },
/* 301 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export = __webpack_require__(129)
	  , $reduce = __webpack_require__(302);
	
	$export($export.P + $export.F * !__webpack_require__(290)([].reduce, true), 'Array', {
	  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
	  reduce: function reduce(callbackfn /* , initialValue */){
	    return $reduce(this, callbackfn, arguments.length, arguments[1], false);
	  }
	});

/***/ },
/* 302 */
/***/ function(module, exports, __webpack_require__) {

	var aFunction = __webpack_require__(142)
	  , toObject  = __webpack_require__(179)
	  , IObject   = __webpack_require__(154)
	  , toLength  = __webpack_require__(158);
	
	module.exports = function(that, callbackfn, aLen, memo, isRight){
	  aFunction(callbackfn);
	  var O      = toObject(that)
	    , self   = IObject(O)
	    , length = toLength(O.length)
	    , index  = isRight ? length - 1 : 0
	    , i      = isRight ? -1 : 1;
	  if(aLen < 2)for(;;){
	    if(index in self){
	      memo = self[index];
	      index += i;
	      break;
	    }
	    index += i;
	    if(isRight ? index < 0 : length <= index){
	      throw TypeError('Reduce of empty array with no initial value');
	    }
	  }
	  for(;isRight ? index >= 0 : length > index; index += i)if(index in self){
	    memo = callbackfn(memo, self[index], index, O);
	  }
	  return memo;
	};

/***/ },
/* 303 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export = __webpack_require__(129)
	  , $reduce = __webpack_require__(302);
	
	$export($export.P + $export.F * !__webpack_require__(290)([].reduceRight, true), 'Array', {
	  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
	  reduceRight: function reduceRight(callbackfn /* , initialValue */){
	    return $reduce(this, callbackfn, arguments.length, arguments[1], true);
	  }
	});

/***/ },
/* 304 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export       = __webpack_require__(129)
	  , $indexOf      = __webpack_require__(157)(false)
	  , $native       = [].indexOf
	  , NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;
	
	$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(290)($native)), 'Array', {
	  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
	  indexOf: function indexOf(searchElement /*, fromIndex = 0 */){
	    return NEGATIVE_ZERO
	      // convert -0 to +0
	      ? $native.apply(this, arguments) || 0
	      : $indexOf(this, searchElement, arguments[1]);
	  }
	});

/***/ },
/* 305 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export       = __webpack_require__(129)
	  , toIObject     = __webpack_require__(153)
	  , toInteger     = __webpack_require__(159)
	  , toLength      = __webpack_require__(158)
	  , $native       = [].lastIndexOf
	  , NEGATIVE_ZERO = !!$native && 1 / [1].lastIndexOf(1, -0) < 0;
	
	$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(290)($native)), 'Array', {
	  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
	  lastIndexOf: function lastIndexOf(searchElement /*, fromIndex = @[*-1] */){
	    // convert -0 to +0
	    if(NEGATIVE_ZERO)return $native.apply(this, arguments) || 0;
	    var O      = toIObject(this)
	      , length = toLength(O.length)
	      , index  = length - 1;
	    if(arguments.length > 1)index = Math.min(index, toInteger(arguments[1]));
	    if(index < 0)index = length + index;
	    for(;index >= 0; index--)if(index in O)if(O[index] === searchElement)return index || 0;
	    return -1;
	  }
	});

/***/ },
/* 306 */
/***/ function(module, exports, __webpack_require__) {

	// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
	var $export = __webpack_require__(129);
	
	$export($export.P, 'Array', {copyWithin: __webpack_require__(307)});
	
	__webpack_require__(308)('copyWithin');

/***/ },
/* 307 */
/***/ function(module, exports, __webpack_require__) {

	// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
	'use strict';
	var toObject = __webpack_require__(179)
	  , toIndex  = __webpack_require__(160)
	  , toLength = __webpack_require__(158);
	
	module.exports = [].copyWithin || function copyWithin(target/*= 0*/, start/*= 0, end = @length*/){
	  var O     = toObject(this)
	    , len   = toLength(O.length)
	    , to    = toIndex(target, len)
	    , from  = toIndex(start, len)
	    , end   = arguments.length > 2 ? arguments[2] : undefined
	    , count = Math.min((end === undefined ? len : toIndex(end, len)) - from, len - to)
	    , inc   = 1;
	  if(from < to && to < from + count){
	    inc  = -1;
	    from += count - 1;
	    to   += count - 1;
	  }
	  while(count-- > 0){
	    if(from in O)O[to] = O[from];
	    else delete O[to];
	    to   += inc;
	    from += inc;
	  } return O;
	};

/***/ },
/* 308 */
/***/ function(module, exports, __webpack_require__) {

	// 22.1.3.31 Array.prototype[@@unscopables]
	var UNSCOPABLES = __webpack_require__(146)('unscopables')
	  , ArrayProto  = Array.prototype;
	if(ArrayProto[UNSCOPABLES] == undefined)__webpack_require__(131)(ArrayProto, UNSCOPABLES, {});
	module.exports = function(key){
	  ArrayProto[UNSCOPABLES][key] = true;
	};

/***/ },
/* 309 */
/***/ function(module, exports, __webpack_require__) {

	// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
	var $export = __webpack_require__(129);
	
	$export($export.P, 'Array', {fill: __webpack_require__(310)});
	
	__webpack_require__(308)('fill');

/***/ },
/* 310 */
/***/ function(module, exports, __webpack_require__) {

	// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
	'use strict';
	var toObject = __webpack_require__(179)
	  , toIndex  = __webpack_require__(160)
	  , toLength = __webpack_require__(158);
	module.exports = function fill(value /*, start = 0, end = @length */){
	  var O      = toObject(this)
	    , length = toLength(O.length)
	    , aLen   = arguments.length
	    , index  = toIndex(aLen > 1 ? arguments[1] : undefined, length)
	    , end    = aLen > 2 ? arguments[2] : undefined
	    , endPos = end === undefined ? length : toIndex(end, length);
	  while(endPos > index)O[index++] = value;
	  return O;
	};

/***/ },
/* 311 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
	var $export = __webpack_require__(129)
	  , $find   = __webpack_require__(294)(5)
	  , KEY     = 'find'
	  , forced  = true;
	// Shouldn't skip holes
	if(KEY in [])Array(1)[KEY](function(){ forced = false; });
	$export($export.P + $export.F * forced, 'Array', {
	  find: function find(callbackfn/*, that = undefined */){
	    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});
	__webpack_require__(308)(KEY);

/***/ },
/* 312 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
	var $export = __webpack_require__(129)
	  , $find   = __webpack_require__(294)(6)
	  , KEY     = 'findIndex'
	  , forced  = true;
	// Shouldn't skip holes
	if(KEY in [])Array(1)[KEY](function(){ forced = false; });
	$export($export.P + $export.F * forced, 'Array', {
	  findIndex: function findIndex(callbackfn/*, that = undefined */){
	    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});
	__webpack_require__(308)(KEY);

/***/ },
/* 313 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(314)('Array');

/***/ },
/* 314 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global      = __webpack_require__(125)
	  , dP          = __webpack_require__(132)
	  , DESCRIPTORS = __webpack_require__(127)
	  , SPECIES     = __webpack_require__(146)('species');
	
	module.exports = function(KEY){
	  var C = global[KEY];
	  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
	    configurable: true,
	    get: function(){ return this; }
	  });
	};

/***/ },
/* 315 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(308)
	  , step             = __webpack_require__(316)
	  , Iterators        = __webpack_require__(251)
	  , toIObject        = __webpack_require__(153);
	
	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(250)(Array, 'Array', function(iterated, kind){
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
/* 316 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 317 */
/***/ function(module, exports, __webpack_require__) {

	var global            = __webpack_require__(125)
	  , inheritIfRequired = __webpack_require__(209)
	  , dP                = __webpack_require__(132).f
	  , gOPN              = __webpack_require__(171).f
	  , isRegExp          = __webpack_require__(256)
	  , $flags            = __webpack_require__(318)
	  , $RegExp           = global.RegExp
	  , Base              = $RegExp
	  , proto             = $RegExp.prototype
	  , re1               = /a/g
	  , re2               = /a/g
	  // "new" creates a new object, old webkit buggy here
	  , CORRECT_NEW       = new $RegExp(re1) !== re1;
	
	if(__webpack_require__(127) && (!CORRECT_NEW || __webpack_require__(128)(function(){
	  re2[__webpack_require__(146)('match')] = false;
	  // RegExp constructor can alter flags and IsRegExp works correct with @@match
	  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
	}))){
	  $RegExp = function RegExp(p, f){
	    var tiRE = this instanceof $RegExp
	      , piRE = isRegExp(p)
	      , fiU  = f === undefined;
	    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p
	      : inheritIfRequired(CORRECT_NEW
	        ? new Base(piRE && !fiU ? p.source : p, f)
	        : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f)
	      , tiRE ? this : proto, $RegExp);
	  };
	  var proxy = function(key){
	    key in $RegExp || dP($RegExp, key, {
	      configurable: true,
	      get: function(){ return Base[key]; },
	      set: function(it){ Base[key] = it; }
	    });
	  };
	  for(var keys = gOPN(Base), i = 0; keys.length > i; )proxy(keys[i++]);
	  proto.constructor = $RegExp;
	  $RegExp.prototype = proto;
	  __webpack_require__(139)(global, 'RegExp', $RegExp);
	}
	
	__webpack_require__(314)('RegExp');

/***/ },
/* 318 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 21.2.5.3 get RegExp.prototype.flags
	var anObject = __webpack_require__(133);
	module.exports = function(){
	  var that   = anObject(this)
	    , result = '';
	  if(that.global)     result += 'g';
	  if(that.ignoreCase) result += 'i';
	  if(that.multiline)  result += 'm';
	  if(that.unicode)    result += 'u';
	  if(that.sticky)     result += 'y';
	  return result;
	};

/***/ },
/* 319 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	__webpack_require__(320);
	var anObject    = __webpack_require__(133)
	  , $flags      = __webpack_require__(318)
	  , DESCRIPTORS = __webpack_require__(127)
	  , TO_STRING   = 'toString'
	  , $toString   = /./[TO_STRING];
	
	var define = function(fn){
	  __webpack_require__(139)(RegExp.prototype, TO_STRING, fn, true);
	};
	
	// 21.2.5.14 RegExp.prototype.toString()
	if(__webpack_require__(128)(function(){ return $toString.call({source: 'a', flags: 'b'}) != '/a/b'; })){
	  define(function toString(){
	    var R = anObject(this);
	    return '/'.concat(R.source, '/',
	      'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
	  });
	// FF44- RegExp#toString has a wrong name
	} else if($toString.name != TO_STRING){
	  define(function toString(){
	    return $toString.call(this);
	  });
	}

/***/ },
/* 320 */
/***/ function(module, exports, __webpack_require__) {

	// 21.2.5.3 get RegExp.prototype.flags()
	if(__webpack_require__(127) && /./g.flags != 'g')__webpack_require__(132).f(RegExp.prototype, 'flags', {
	  configurable: true,
	  get: __webpack_require__(318)
	});

/***/ },
/* 321 */
/***/ function(module, exports, __webpack_require__) {

	// @@match logic
	__webpack_require__(322)('match', 1, function(defined, MATCH, $match){
	  // 21.1.3.11 String.prototype.match(regexp)
	  return [function match(regexp){
	    'use strict';
	    var O  = defined(this)
	      , fn = regexp == undefined ? undefined : regexp[MATCH];
	    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
	  }, $match];
	});

/***/ },
/* 322 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var hide     = __webpack_require__(131)
	  , redefine = __webpack_require__(139)
	  , fails    = __webpack_require__(128)
	  , defined  = __webpack_require__(156)
	  , wks      = __webpack_require__(146);
	
	module.exports = function(KEY, length, exec){
	  var SYMBOL   = wks(KEY)
	    , fns      = exec(defined, SYMBOL, ''[KEY])
	    , strfn    = fns[0]
	    , rxfn     = fns[1];
	  if(fails(function(){
	    var O = {};
	    O[SYMBOL] = function(){ return 7; };
	    return ''[KEY](O) != 7;
	  })){
	    redefine(String.prototype, KEY, strfn);
	    hide(RegExp.prototype, SYMBOL, length == 2
	      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
	      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
	      ? function(string, arg){ return rxfn.call(string, this, arg); }
	      // 21.2.5.6 RegExp.prototype[@@match](string)
	      // 21.2.5.9 RegExp.prototype[@@search](string)
	      : function(string){ return rxfn.call(string, this); }
	    );
	  }
	};

/***/ },
/* 323 */
/***/ function(module, exports, __webpack_require__) {

	// @@replace logic
	__webpack_require__(322)('replace', 2, function(defined, REPLACE, $replace){
	  // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
	  return [function replace(searchValue, replaceValue){
	    'use strict';
	    var O  = defined(this)
	      , fn = searchValue == undefined ? undefined : searchValue[REPLACE];
	    return fn !== undefined
	      ? fn.call(searchValue, O, replaceValue)
	      : $replace.call(String(O), searchValue, replaceValue);
	  }, $replace];
	});

/***/ },
/* 324 */
/***/ function(module, exports, __webpack_require__) {

	// @@search logic
	__webpack_require__(322)('search', 1, function(defined, SEARCH, $search){
	  // 21.1.3.15 String.prototype.search(regexp)
	  return [function search(regexp){
	    'use strict';
	    var O  = defined(this)
	      , fn = regexp == undefined ? undefined : regexp[SEARCH];
	    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
	  }, $search];
	});

/***/ },
/* 325 */
/***/ function(module, exports, __webpack_require__) {

	// @@split logic
	__webpack_require__(322)('split', 2, function(defined, SPLIT, $split){
	  'use strict';
	  var isRegExp   = __webpack_require__(256)
	    , _split     = $split
	    , $push      = [].push
	    , $SPLIT     = 'split'
	    , LENGTH     = 'length'
	    , LAST_INDEX = 'lastIndex';
	  if(
	    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
	    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
	    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
	    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
	    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
	    ''[$SPLIT](/.?/)[LENGTH]
	  ){
	    var NPCG = /()??/.exec('')[1] === undefined; // nonparticipating capturing group
	    // based on es5-shim implementation, need to rework it
	    $split = function(separator, limit){
	      var string = String(this);
	      if(separator === undefined && limit === 0)return [];
	      // If `separator` is not a regex, use native split
	      if(!isRegExp(separator))return _split.call(string, separator, limit);
	      var output = [];
	      var flags = (separator.ignoreCase ? 'i' : '') +
	                  (separator.multiline ? 'm' : '') +
	                  (separator.unicode ? 'u' : '') +
	                  (separator.sticky ? 'y' : '');
	      var lastLastIndex = 0;
	      var splitLimit = limit === undefined ? 4294967295 : limit >>> 0;
	      // Make `global` and avoid `lastIndex` issues by working with a copy
	      var separatorCopy = new RegExp(separator.source, flags + 'g');
	      var separator2, match, lastIndex, lastLength, i;
	      // Doesn't need flags gy, but they don't hurt
	      if(!NPCG)separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags);
	      while(match = separatorCopy.exec(string)){
	        // `separatorCopy.lastIndex` is not reliable cross-browser
	        lastIndex = match.index + match[0][LENGTH];
	        if(lastIndex > lastLastIndex){
	          output.push(string.slice(lastLastIndex, match.index));
	          // Fix browsers whose `exec` methods don't consistently return `undefined` for NPCG
	          if(!NPCG && match[LENGTH] > 1)match[0].replace(separator2, function(){
	            for(i = 1; i < arguments[LENGTH] - 2; i++)if(arguments[i] === undefined)match[i] = undefined;
	          });
	          if(match[LENGTH] > 1 && match.index < string[LENGTH])$push.apply(output, match.slice(1));
	          lastLength = match[0][LENGTH];
	          lastLastIndex = lastIndex;
	          if(output[LENGTH] >= splitLimit)break;
	        }
	        if(separatorCopy[LAST_INDEX] === match.index)separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
	      }
	      if(lastLastIndex === string[LENGTH]){
	        if(lastLength || !separatorCopy.test(''))output.push('');
	      } else output.push(string.slice(lastLastIndex));
	      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
	    };
	  // Chakra, V8
	  } else if('0'[$SPLIT](undefined, 0)[LENGTH]){
	    $split = function(separator, limit){
	      return separator === undefined && limit === 0 ? [] : _split.call(this, separator, limit);
	    };
	  }
	  // 21.1.3.17 String.prototype.split(separator, limit)
	  return [function split(separator, limit){
	    var O  = defined(this)
	      , fn = separator == undefined ? undefined : separator[SPLIT];
	    return fn !== undefined ? fn.call(separator, O, limit) : $split.call(String(O), separator, limit);
	  }, $split];
	});

/***/ },
/* 326 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY            = __webpack_require__(149)
	  , global             = __webpack_require__(125)
	  , ctx                = __webpack_require__(141)
	  , classof            = __webpack_require__(196)
	  , $export            = __webpack_require__(129)
	  , isObject           = __webpack_require__(134)
	  , anObject           = __webpack_require__(133)
	  , aFunction          = __webpack_require__(142)
	  , anInstance         = __webpack_require__(211)
	  , forOf              = __webpack_require__(327)
	  , setProto           = __webpack_require__(194).set
	  , speciesConstructor = __webpack_require__(328)
	  , task               = __webpack_require__(329).set
	  , microtask          = __webpack_require__(330)()
	  , PROMISE            = 'Promise'
	  , TypeError          = global.TypeError
	  , process            = global.process
	  , $Promise           = global[PROMISE]
	  , process            = global.process
	  , isNode             = classof(process) == 'process'
	  , empty              = function(){ /* empty */ }
	  , Internal, GenericPromiseCapability, Wrapper;
	
	var USE_NATIVE = !!function(){
	  try {
	    // correct subclassing with @@species support
	    var promise     = $Promise.resolve(1)
	      , FakePromise = (promise.constructor = {})[__webpack_require__(146)('species')] = function(exec){ exec(empty, empty); };
	    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
	  } catch(e){ /* empty */ }
	}();
	
	// helpers
	var sameConstructor = function(a, b){
	  // with library wrapper special case
	  return a === b || a === $Promise && b === Wrapper;
	};
	var isThenable = function(it){
	  var then;
	  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};
	var newPromiseCapability = function(C){
	  return sameConstructor($Promise, C)
	    ? new PromiseCapability(C)
	    : new GenericPromiseCapability(C);
	};
	var PromiseCapability = GenericPromiseCapability = function(C){
	  var resolve, reject;
	  this.promise = new C(function($$resolve, $$reject){
	    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject  = $$reject;
	  });
	  this.resolve = aFunction(resolve);
	  this.reject  = aFunction(reject);
	};
	var perform = function(exec){
	  try {
	    exec();
	  } catch(e){
	    return {error: e};
	  }
	};
	var notify = function(promise, isReject){
	  if(promise._n)return;
	  promise._n = true;
	  var chain = promise._c;
	  microtask(function(){
	    var value = promise._v
	      , ok    = promise._s == 1
	      , i     = 0;
	    var run = function(reaction){
	      var handler = ok ? reaction.ok : reaction.fail
	        , resolve = reaction.resolve
	        , reject  = reaction.reject
	        , domain  = reaction.domain
	        , result, then;
	      try {
	        if(handler){
	          if(!ok){
	            if(promise._h == 2)onHandleUnhandled(promise);
	            promise._h = 1;
	          }
	          if(handler === true)result = value;
	          else {
	            if(domain)domain.enter();
	            result = handler(value);
	            if(domain)domain.exit();
	          }
	          if(result === reaction.promise){
	            reject(TypeError('Promise-chain cycle'));
	          } else if(then = isThenable(result)){
	            then.call(result, resolve, reject);
	          } else resolve(result);
	        } else reject(value);
	      } catch(e){
	        reject(e);
	      }
	    };
	    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
	    promise._c = [];
	    promise._n = false;
	    if(isReject && !promise._h)onUnhandled(promise);
	  });
	};
	var onUnhandled = function(promise){
	  task.call(global, function(){
	    var value = promise._v
	      , abrupt, handler, console;
	    if(isUnhandled(promise)){
	      abrupt = perform(function(){
	        if(isNode){
	          process.emit('unhandledRejection', value, promise);
	        } else if(handler = global.onunhandledrejection){
	          handler({promise: promise, reason: value});
	        } else if((console = global.console) && console.error){
	          console.error('Unhandled promise rejection', value);
	        }
	      });
	      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
	      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
	    } promise._a = undefined;
	    if(abrupt)throw abrupt.error;
	  });
	};
	var isUnhandled = function(promise){
	  if(promise._h == 1)return false;
	  var chain = promise._a || promise._c
	    , i     = 0
	    , reaction;
	  while(chain.length > i){
	    reaction = chain[i++];
	    if(reaction.fail || !isUnhandled(reaction.promise))return false;
	  } return true;
	};
	var onHandleUnhandled = function(promise){
	  task.call(global, function(){
	    var handler;
	    if(isNode){
	      process.emit('rejectionHandled', promise);
	    } else if(handler = global.onrejectionhandled){
	      handler({promise: promise, reason: promise._v});
	    }
	  });
	};
	var $reject = function(value){
	  var promise = this;
	  if(promise._d)return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  promise._v = value;
	  promise._s = 2;
	  if(!promise._a)promise._a = promise._c.slice();
	  notify(promise, true);
	};
	var $resolve = function(value){
	  var promise = this
	    , then;
	  if(promise._d)return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  try {
	    if(promise === value)throw TypeError("Promise can't be resolved itself");
	    if(then = isThenable(value)){
	      microtask(function(){
	        var wrapper = {_w: promise, _d: false}; // wrap
	        try {
	          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
	        } catch(e){
	          $reject.call(wrapper, e);
	        }
	      });
	    } else {
	      promise._v = value;
	      promise._s = 1;
	      notify(promise, false);
	    }
	  } catch(e){
	    $reject.call({_w: promise, _d: false}, e); // wrap
	  }
	};
	
	// constructor polyfill
	if(!USE_NATIVE){
	  // 25.4.3.1 Promise(executor)
	  $Promise = function Promise(executor){
	    anInstance(this, $Promise, PROMISE, '_h');
	    aFunction(executor);
	    Internal.call(this);
	    try {
	      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
	    } catch(err){
	      $reject.call(this, err);
	    }
	  };
	  Internal = function Promise(executor){
	    this._c = [];             // <- awaiting reactions
	    this._a = undefined;      // <- checked in isUnhandled reactions
	    this._s = 0;              // <- state
	    this._d = false;          // <- done
	    this._v = undefined;      // <- value
	    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
	    this._n = false;          // <- notify
	  };
	  Internal.prototype = __webpack_require__(331)($Promise.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected){
	      var reaction    = newPromiseCapability(speciesConstructor(this, $Promise));
	      reaction.ok     = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail   = typeof onRejected == 'function' && onRejected;
	      reaction.domain = isNode ? process.domain : undefined;
	      this._c.push(reaction);
	      if(this._a)this._a.push(reaction);
	      if(this._s)notify(this, false);
	      return reaction.promise;
	    },
	    // 25.4.5.1 Promise.prototype.catch(onRejected)
	    'catch': function(onRejected){
	      return this.then(undefined, onRejected);
	    }
	  });
	  PromiseCapability = function(){
	    var promise  = new Internal;
	    this.promise = promise;
	    this.resolve = ctx($resolve, promise, 1);
	    this.reject  = ctx($reject, promise, 1);
	  };
	}
	
	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: $Promise});
	__webpack_require__(145)($Promise, PROMISE);
	__webpack_require__(314)(PROMISE);
	Wrapper = __webpack_require__(130)[PROMISE];
	
	// statics
	$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r){
	    var capability = newPromiseCapability(this)
	      , $$reject   = capability.reject;
	    $$reject(r);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x){
	    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
	    if(x instanceof $Promise && sameConstructor(x.constructor, this))return x;
	    var capability = newPromiseCapability(this)
	      , $$resolve  = capability.resolve;
	    $$resolve(x);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(287)(function(iter){
	  $Promise.all(iter)['catch'](empty);
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable){
	    var C          = this
	      , capability = newPromiseCapability(C)
	      , resolve    = capability.resolve
	      , reject     = capability.reject;
	    var abrupt = perform(function(){
	      var values    = []
	        , index     = 0
	        , remaining = 1;
	      forOf(iterable, false, function(promise){
	        var $index        = index++
	          , alreadyCalled = false;
	        values.push(undefined);
	        remaining++;
	        C.resolve(promise).then(function(value){
	          if(alreadyCalled)return;
	          alreadyCalled  = true;
	          values[$index] = value;
	          --remaining || resolve(values);
	        }, reject);
	      });
	      --remaining || resolve(values);
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  },
	  // 25.4.4.4 Promise.race(iterable)
	  race: function race(iterable){
	    var C          = this
	      , capability = newPromiseCapability(C)
	      , reject     = capability.reject;
	    var abrupt = perform(function(){
	      forOf(iterable, false, function(promise){
	        C.resolve(promise).then(capability.resolve, reject);
	      });
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  }
	});

/***/ },
/* 327 */
/***/ function(module, exports, __webpack_require__) {

	var ctx         = __webpack_require__(141)
	  , call        = __webpack_require__(283)
	  , isArrayIter = __webpack_require__(284)
	  , anObject    = __webpack_require__(133)
	  , toLength    = __webpack_require__(158)
	  , getIterFn   = __webpack_require__(286)
	  , BREAK       = {}
	  , RETURN      = {};
	var exports = module.exports = function(iterable, entries, fn, that, ITERATOR){
	  var iterFn = ITERATOR ? function(){ return iterable; } : getIterFn(iterable)
	    , f      = ctx(fn, that, entries ? 2 : 1)
	    , index  = 0
	    , length, step, iterator, result;
	  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
	    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	    if(result === BREAK || result === RETURN)return result;
	  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
	    result = call(iterator, f, step.value, entries);
	    if(result === BREAK || result === RETURN)return result;
	  }
	};
	exports.BREAK  = BREAK;
	exports.RETURN = RETURN;

/***/ },
/* 328 */
/***/ function(module, exports, __webpack_require__) {

	// 7.3.20 SpeciesConstructor(O, defaultConstructor)
	var anObject  = __webpack_require__(133)
	  , aFunction = __webpack_require__(142)
	  , SPECIES   = __webpack_require__(146)('species');
	module.exports = function(O, D){
	  var C = anObject(O).constructor, S;
	  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
	};

/***/ },
/* 329 */
/***/ function(module, exports, __webpack_require__) {

	var ctx                = __webpack_require__(141)
	  , invoke             = __webpack_require__(199)
	  , html               = __webpack_require__(169)
	  , cel                = __webpack_require__(136)
	  , global             = __webpack_require__(125)
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
	var listener = function(event){
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
	  if(__webpack_require__(155)(process) == 'process'){
	    defer = function(id){
	      process.nextTick(ctx(run, id, 1));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  } else if(MessageChannel){
	    channel = new MessageChannel;
	    port    = channel.port2;
	    channel.port1.onmessage = listener;
	    defer = ctx(port.postMessage, port, 1);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
	    defer = function(id){
	      global.postMessage(id + '', '*');
	    };
	    global.addEventListener('message', listener, false);
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
/* 330 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(125)
	  , macrotask = __webpack_require__(329).set
	  , Observer  = global.MutationObserver || global.WebKitMutationObserver
	  , process   = global.process
	  , Promise   = global.Promise
	  , isNode    = __webpack_require__(155)(process) == 'process';
	
	module.exports = function(){
	  var head, last, notify;
	
	  var flush = function(){
	    var parent, fn;
	    if(isNode && (parent = process.domain))parent.exit();
	    while(head){
	      fn   = head.fn;
	      head = head.next;
	      try {
	        fn();
	      } catch(e){
	        if(head)notify();
	        else last = undefined;
	        throw e;
	      }
	    } last = undefined;
	    if(parent)parent.enter();
	  };
	
	  // Node.js
	  if(isNode){
	    notify = function(){
	      process.nextTick(flush);
	    };
	  // browsers with MutationObserver
	  } else if(Observer){
	    var toggle = true
	      , node   = document.createTextNode('');
	    new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
	    notify = function(){
	      node.data = toggle = !toggle;
	    };
	  // environments with maybe non-completely correct, but existent Promise
	  } else if(Promise && Promise.resolve){
	    var promise = Promise.resolve();
	    notify = function(){
	      promise.then(flush);
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
	
	  return function(fn){
	    var task = {fn: fn, next: undefined};
	    if(last)last.next = task;
	    if(!head){
	      head = task;
	      notify();
	    } last = task;
	  };
	};

/***/ },
/* 331 */
/***/ function(module, exports, __webpack_require__) {

	var redefine = __webpack_require__(139);
	module.exports = function(target, src, safe){
	  for(var key in src)redefine(target, key, src[key], safe);
	  return target;
	};

/***/ },
/* 332 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var strong = __webpack_require__(333);
	
	// 23.1 Map Objects
	module.exports = __webpack_require__(334)('Map', function(get){
	  return function Map(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.1.3.6 Map.prototype.get(key)
	  get: function get(key){
	    var entry = strong.getEntry(this, key);
	    return entry && entry.v;
	  },
	  // 23.1.3.9 Map.prototype.set(key, value)
	  set: function set(key, value){
	    return strong.def(this, key === 0 ? 0 : key, value);
	  }
	}, strong, true);

/***/ },
/* 333 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var dP          = __webpack_require__(132).f
	  , create      = __webpack_require__(167)
	  , hide        = __webpack_require__(131)
	  , redefineAll = __webpack_require__(331)
	  , ctx         = __webpack_require__(141)
	  , anInstance  = __webpack_require__(211)
	  , defined     = __webpack_require__(156)
	  , forOf       = __webpack_require__(327)
	  , $iterDefine = __webpack_require__(250)
	  , step        = __webpack_require__(316)
	  , setSpecies  = __webpack_require__(314)
	  , DESCRIPTORS = __webpack_require__(127)
	  , fastKey     = __webpack_require__(143).fastKey
	  , SIZE        = DESCRIPTORS ? '_s' : 'size';
	
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
	      anInstance(that, C, NAME, '_i');
	      that._i = create(null); // index
	      that._f = undefined;    // first entry
	      that._l = undefined;    // last entry
	      that[SIZE] = 0;         // size
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
	        anInstance(this, C, 'forEach');
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
	    if(DESCRIPTORS)dP(C.prototype, 'size', {
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
/* 334 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global            = __webpack_require__(125)
	  , $export           = __webpack_require__(129)
	  , redefine          = __webpack_require__(139)
	  , redefineAll       = __webpack_require__(331)
	  , meta              = __webpack_require__(143)
	  , forOf             = __webpack_require__(327)
	  , anInstance        = __webpack_require__(211)
	  , isObject          = __webpack_require__(134)
	  , fails             = __webpack_require__(128)
	  , $iterDetect       = __webpack_require__(287)
	  , setToStringTag    = __webpack_require__(145)
	  , inheritIfRequired = __webpack_require__(209);
	
	module.exports = function(NAME, wrapper, methods, common, IS_MAP, IS_WEAK){
	  var Base  = global[NAME]
	    , C     = Base
	    , ADDER = IS_MAP ? 'set' : 'add'
	    , proto = C && C.prototype
	    , O     = {};
	  var fixMethod = function(KEY){
	    var fn = proto[KEY];
	    redefine(proto, KEY,
	      KEY == 'delete' ? function(a){
	        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
	      } : KEY == 'has' ? function has(a){
	        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
	      } : KEY == 'get' ? function get(a){
	        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
	      } : KEY == 'add' ? function add(a){ fn.call(this, a === 0 ? 0 : a); return this; }
	        : function set(a, b){ fn.call(this, a === 0 ? 0 : a, b); return this; }
	    );
	  };
	  if(typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function(){
	    new C().entries().next();
	  }))){
	    // create collection constructor
	    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
	    redefineAll(C.prototype, methods);
	    meta.NEED = true;
	  } else {
	    var instance             = new C
	      // early implementations not supports chaining
	      , HASNT_CHAINING       = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance
	      // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
	      , THROWS_ON_PRIMITIVES = fails(function(){ instance.has(1); })
	      // most early implementations doesn't supports iterables, most modern - not close it correctly
	      , ACCEPT_ITERABLES     = $iterDetect(function(iter){ new C(iter); }) // eslint-disable-line no-new
	      // for early implementations -0 and +0 not the same
	      , BUGGY_ZERO = !IS_WEAK && fails(function(){
	        // V8 ~ Chromium 42- fails only with 5+ elements
	        var $instance = new C()
	          , index     = 5;
	        while(index--)$instance[ADDER](index, index);
	        return !$instance.has(-0);
	      });
	    if(!ACCEPT_ITERABLES){ 
	      C = wrapper(function(target, iterable){
	        anInstance(target, C, NAME);
	        var that = inheritIfRequired(new Base, target, C);
	        if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
	        return that;
	      });
	      C.prototype = proto;
	      proto.constructor = C;
	    }
	    if(THROWS_ON_PRIMITIVES || BUGGY_ZERO){
	      fixMethod('delete');
	      fixMethod('has');
	      IS_MAP && fixMethod('get');
	    }
	    if(BUGGY_ZERO || HASNT_CHAINING)fixMethod(ADDER);
	    // weak collections should not contains .clear method
	    if(IS_WEAK && proto.clear)delete proto.clear;
	  }
	
	  setToStringTag(C, NAME);
	
	  O[NAME] = C;
	  $export($export.G + $export.W + $export.F * (C != Base), O);
	
	  if(!IS_WEAK)common.setStrong(C, NAME, IS_MAP);
	
	  return C;
	};

/***/ },
/* 335 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var strong = __webpack_require__(333);
	
	// 23.2 Set Objects
	module.exports = __webpack_require__(334)('Set', function(get){
	  return function Set(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.2.3.1 Set.prototype.add(value)
	  add: function add(value){
	    return strong.def(this, value = value === 0 ? 0 : value, value);
	  }
	}, strong);

/***/ },
/* 336 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var each         = __webpack_require__(294)(0)
	  , redefine     = __webpack_require__(139)
	  , meta         = __webpack_require__(143)
	  , assign       = __webpack_require__(190)
	  , weak         = __webpack_require__(337)
	  , isObject     = __webpack_require__(134)
	  , has          = __webpack_require__(126)
	  , getWeak      = meta.getWeak
	  , isExtensible = Object.isExtensible
	  , uncaughtFrozenStore = weak.ufstore
	  , tmp          = {}
	  , InternalMap;
	
	var wrapper = function(get){
	  return function WeakMap(){
	    return get(this, arguments.length > 0 ? arguments[0] : undefined);
	  };
	};
	
	var methods = {
	  // 23.3.3.3 WeakMap.prototype.get(key)
	  get: function get(key){
	    if(isObject(key)){
	      var data = getWeak(key);
	      if(data === true)return uncaughtFrozenStore(this).get(key);
	      return data ? data[this._i] : undefined;
	    }
	  },
	  // 23.3.3.5 WeakMap.prototype.set(key, value)
	  set: function set(key, value){
	    return weak.def(this, key, value);
	  }
	};
	
	// 23.3 WeakMap Objects
	var $WeakMap = module.exports = __webpack_require__(334)('WeakMap', wrapper, methods, weak, true, true);
	
	// IE11 WeakMap frozen keys fix
	if(new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7){
	  InternalMap = weak.getConstructor(wrapper);
	  assign(InternalMap.prototype, methods);
	  meta.NEED = true;
	  each(['delete', 'has', 'get', 'set'], function(key){
	    var proto  = $WeakMap.prototype
	      , method = proto[key];
	    redefine(proto, key, function(a, b){
	      // store frozen objects on internal weakmap shim
	      if(isObject(a) && !isExtensible(a)){
	        if(!this._f)this._f = new InternalMap;
	        var result = this._f[key](a, b);
	        return key == 'set' ? this : result;
	      // store all the rest on native weakmap
	      } return method.call(this, a, b);
	    });
	  });
	}

/***/ },
/* 337 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var redefineAll       = __webpack_require__(331)
	  , getWeak           = __webpack_require__(143).getWeak
	  , anObject          = __webpack_require__(133)
	  , isObject          = __webpack_require__(134)
	  , anInstance        = __webpack_require__(211)
	  , forOf             = __webpack_require__(327)
	  , createArrayMethod = __webpack_require__(294)
	  , $has              = __webpack_require__(126)
	  , arrayFind         = createArrayMethod(5)
	  , arrayFindIndex    = createArrayMethod(6)
	  , id                = 0;
	
	// fallback for uncaught frozen keys
	var uncaughtFrozenStore = function(that){
	  return that._l || (that._l = new UncaughtFrozenStore);
	};
	var UncaughtFrozenStore = function(){
	  this.a = [];
	};
	var findUncaughtFrozen = function(store, key){
	  return arrayFind(store.a, function(it){
	    return it[0] === key;
	  });
	};
	UncaughtFrozenStore.prototype = {
	  get: function(key){
	    var entry = findUncaughtFrozen(this, key);
	    if(entry)return entry[1];
	  },
	  has: function(key){
	    return !!findUncaughtFrozen(this, key);
	  },
	  set: function(key, value){
	    var entry = findUncaughtFrozen(this, key);
	    if(entry)entry[1] = value;
	    else this.a.push([key, value]);
	  },
	  'delete': function(key){
	    var index = arrayFindIndex(this.a, function(it){
	      return it[0] === key;
	    });
	    if(~index)this.a.splice(index, 1);
	    return !!~index;
	  }
	};
	
	module.exports = {
	  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
	    var C = wrapper(function(that, iterable){
	      anInstance(that, C, NAME, '_i');
	      that._i = id++;      // collection id
	      that._l = undefined; // leak store for uncaught frozen objects
	      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
	    });
	    redefineAll(C.prototype, {
	      // 23.3.3.2 WeakMap.prototype.delete(key)
	      // 23.4.3.3 WeakSet.prototype.delete(value)
	      'delete': function(key){
	        if(!isObject(key))return false;
	        var data = getWeak(key);
	        if(data === true)return uncaughtFrozenStore(this)['delete'](key);
	        return data && $has(data, this._i) && delete data[this._i];
	      },
	      // 23.3.3.4 WeakMap.prototype.has(key)
	      // 23.4.3.4 WeakSet.prototype.has(value)
	      has: function has(key){
	        if(!isObject(key))return false;
	        var data = getWeak(key);
	        if(data === true)return uncaughtFrozenStore(this).has(key);
	        return data && $has(data, this._i);
	      }
	    });
	    return C;
	  },
	  def: function(that, key, value){
	    var data = getWeak(anObject(key), true);
	    if(data === true)uncaughtFrozenStore(that).set(key, value);
	    else data[that._i] = value;
	    return that;
	  },
	  ufstore: uncaughtFrozenStore
	};

/***/ },
/* 338 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var weak = __webpack_require__(337);
	
	// 23.4 WeakSet Objects
	__webpack_require__(334)('WeakSet', function(get){
	  return function WeakSet(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.4.3.1 WeakSet.prototype.add(value)
	  add: function add(value){
	    return weak.def(this, value, true);
	  }
	}, weak, false, true);

/***/ },
/* 339 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export      = __webpack_require__(129)
	  , $typed       = __webpack_require__(340)
	  , buffer       = __webpack_require__(341)
	  , anObject     = __webpack_require__(133)
	  , toIndex      = __webpack_require__(160)
	  , toLength     = __webpack_require__(158)
	  , isObject     = __webpack_require__(134)
	  , TYPED_ARRAY  = __webpack_require__(146)('typed_array')
	  , ArrayBuffer  = __webpack_require__(125).ArrayBuffer
	  , speciesConstructor = __webpack_require__(328)
	  , $ArrayBuffer = buffer.ArrayBuffer
	  , $DataView    = buffer.DataView
	  , $isView      = $typed.ABV && ArrayBuffer.isView
	  , $slice       = $ArrayBuffer.prototype.slice
	  , VIEW         = $typed.VIEW
	  , ARRAY_BUFFER = 'ArrayBuffer';
	
	$export($export.G + $export.W + $export.F * (ArrayBuffer !== $ArrayBuffer), {ArrayBuffer: $ArrayBuffer});
	
	$export($export.S + $export.F * !$typed.CONSTR, ARRAY_BUFFER, {
	  // 24.1.3.1 ArrayBuffer.isView(arg)
	  isView: function isView(it){
	    return $isView && $isView(it) || isObject(it) && VIEW in it;
	  }
	});
	
	$export($export.P + $export.U + $export.F * __webpack_require__(128)(function(){
	  return !new $ArrayBuffer(2).slice(1, undefined).byteLength;
	}), ARRAY_BUFFER, {
	  // 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
	  slice: function slice(start, end){
	    if($slice !== undefined && end === undefined)return $slice.call(anObject(this), start); // FF fix
	    var len    = anObject(this).byteLength
	      , first  = toIndex(start, len)
	      , final  = toIndex(end === undefined ? len : end, len)
	      , result = new (speciesConstructor(this, $ArrayBuffer))(toLength(final - first))
	      , viewS  = new $DataView(this)
	      , viewT  = new $DataView(result)
	      , index  = 0;
	    while(first < final){
	      viewT.setUint8(index++, viewS.getUint8(first++));
	    } return result;
	  }
	});
	
	__webpack_require__(314)(ARRAY_BUFFER);

/***/ },
/* 340 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(125)
	  , hide   = __webpack_require__(131)
	  , uid    = __webpack_require__(140)
	  , TYPED  = uid('typed_array')
	  , VIEW   = uid('view')
	  , ABV    = !!(global.ArrayBuffer && global.DataView)
	  , CONSTR = ABV
	  , i = 0, l = 9, Typed;
	
	var TypedArrayConstructors = (
	  'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'
	).split(',');
	
	while(i < l){
	  if(Typed = global[TypedArrayConstructors[i++]]){
	    hide(Typed.prototype, TYPED, true);
	    hide(Typed.prototype, VIEW, true);
	  } else CONSTR = false;
	}
	
	module.exports = {
	  ABV:    ABV,
	  CONSTR: CONSTR,
	  TYPED:  TYPED,
	  VIEW:   VIEW
	};

/***/ },
/* 341 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global         = __webpack_require__(125)
	  , DESCRIPTORS    = __webpack_require__(127)
	  , LIBRARY        = __webpack_require__(149)
	  , $typed         = __webpack_require__(340)
	  , hide           = __webpack_require__(131)
	  , redefineAll    = __webpack_require__(331)
	  , fails          = __webpack_require__(128)
	  , anInstance     = __webpack_require__(211)
	  , toInteger      = __webpack_require__(159)
	  , toLength       = __webpack_require__(158)
	  , gOPN           = __webpack_require__(171).f
	  , dP             = __webpack_require__(132).f
	  , arrayFill      = __webpack_require__(310)
	  , setToStringTag = __webpack_require__(145)
	  , ARRAY_BUFFER   = 'ArrayBuffer'
	  , DATA_VIEW      = 'DataView'
	  , PROTOTYPE      = 'prototype'
	  , WRONG_LENGTH   = 'Wrong length!'
	  , WRONG_INDEX    = 'Wrong index!'
	  , $ArrayBuffer   = global[ARRAY_BUFFER]
	  , $DataView      = global[DATA_VIEW]
	  , Math           = global.Math
	  , parseInt       = global.parseInt
	  , RangeError     = global.RangeError
	  , Infinity       = global.Infinity
	  , BaseBuffer     = $ArrayBuffer
	  , abs            = Math.abs
	  , pow            = Math.pow
	  , min            = Math.min
	  , floor          = Math.floor
	  , log            = Math.log
	  , LN2            = Math.LN2
	  , BUFFER         = 'buffer'
	  , BYTE_LENGTH    = 'byteLength'
	  , BYTE_OFFSET    = 'byteOffset'
	  , $BUFFER        = DESCRIPTORS ? '_b' : BUFFER
	  , $LENGTH        = DESCRIPTORS ? '_l' : BYTE_LENGTH
	  , $OFFSET        = DESCRIPTORS ? '_o' : BYTE_OFFSET;
	
	// IEEE754 conversions based on https://github.com/feross/ieee754
	var packIEEE754 = function(value, mLen, nBytes){
	  var buffer = Array(nBytes)
	    , eLen   = nBytes * 8 - mLen - 1
	    , eMax   = (1 << eLen) - 1
	    , eBias  = eMax >> 1
	    , rt     = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0
	    , i      = 0
	    , s      = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0
	    , e, m, c;
	  value = abs(value)
	  if(value != value || value === Infinity){
	    m = value != value ? 1 : 0;
	    e = eMax;
	  } else {
	    e = floor(log(value) / LN2);
	    if(value * (c = pow(2, -e)) < 1){
	      e--;
	      c *= 2;
	    }
	    if(e + eBias >= 1){
	      value += rt / c;
	    } else {
	      value += rt * pow(2, 1 - eBias);
	    }
	    if(value * c >= 2){
	      e++;
	      c /= 2;
	    }
	    if(e + eBias >= eMax){
	      m = 0;
	      e = eMax;
	    } else if(e + eBias >= 1){
	      m = (value * c - 1) * pow(2, mLen);
	      e = e + eBias;
	    } else {
	      m = value * pow(2, eBias - 1) * pow(2, mLen);
	      e = 0;
	    }
	  }
	  for(; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8);
	  e = e << mLen | m;
	  eLen += mLen;
	  for(; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8);
	  buffer[--i] |= s * 128;
	  return buffer;
	};
	var unpackIEEE754 = function(buffer, mLen, nBytes){
	  var eLen  = nBytes * 8 - mLen - 1
	    , eMax  = (1 << eLen) - 1
	    , eBias = eMax >> 1
	    , nBits = eLen - 7
	    , i     = nBytes - 1
	    , s     = buffer[i--]
	    , e     = s & 127
	    , m;
	  s >>= 7;
	  for(; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8);
	  m = e & (1 << -nBits) - 1;
	  e >>= -nBits;
	  nBits += mLen;
	  for(; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8);
	  if(e === 0){
	    e = 1 - eBias;
	  } else if(e === eMax){
	    return m ? NaN : s ? -Infinity : Infinity;
	  } else {
	    m = m + pow(2, mLen);
	    e = e - eBias;
	  } return (s ? -1 : 1) * m * pow(2, e - mLen);
	};
	
	var unpackI32 = function(bytes){
	  return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
	};
	var packI8 = function(it){
	  return [it & 0xff];
	};
	var packI16 = function(it){
	  return [it & 0xff, it >> 8 & 0xff];
	};
	var packI32 = function(it){
	  return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
	};
	var packF64 = function(it){
	  return packIEEE754(it, 52, 8);
	};
	var packF32 = function(it){
	  return packIEEE754(it, 23, 4);
	};
	
	var addGetter = function(C, key, internal){
	  dP(C[PROTOTYPE], key, {get: function(){ return this[internal]; }});
	};
	
	var get = function(view, bytes, index, isLittleEndian){
	  var numIndex = +index
	    , intIndex = toInteger(numIndex);
	  if(numIndex != intIndex || intIndex < 0 || intIndex + bytes > view[$LENGTH])throw RangeError(WRONG_INDEX);
	  var store = view[$BUFFER]._b
	    , start = intIndex + view[$OFFSET]
	    , pack  = store.slice(start, start + bytes);
	  return isLittleEndian ? pack : pack.reverse();
	};
	var set = function(view, bytes, index, conversion, value, isLittleEndian){
	  var numIndex = +index
	    , intIndex = toInteger(numIndex);
	  if(numIndex != intIndex || intIndex < 0 || intIndex + bytes > view[$LENGTH])throw RangeError(WRONG_INDEX);
	  var store = view[$BUFFER]._b
	    , start = intIndex + view[$OFFSET]
	    , pack  = conversion(+value);
	  for(var i = 0; i < bytes; i++)store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
	};
	
	var validateArrayBufferArguments = function(that, length){
	  anInstance(that, $ArrayBuffer, ARRAY_BUFFER);
	  var numberLength = +length
	    , byteLength   = toLength(numberLength);
	  if(numberLength != byteLength)throw RangeError(WRONG_LENGTH);
	  return byteLength;
	};
	
	if(!$typed.ABV){
	  $ArrayBuffer = function ArrayBuffer(length){
	    var byteLength = validateArrayBufferArguments(this, length);
	    this._b       = arrayFill.call(Array(byteLength), 0);
	    this[$LENGTH] = byteLength;
	  };
	
	  $DataView = function DataView(buffer, byteOffset, byteLength){
	    anInstance(this, $DataView, DATA_VIEW);
	    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
	    var bufferLength = buffer[$LENGTH]
	      , offset       = toInteger(byteOffset);
	    if(offset < 0 || offset > bufferLength)throw RangeError('Wrong offset!');
	    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
	    if(offset + byteLength > bufferLength)throw RangeError(WRONG_LENGTH);
	    this[$BUFFER] = buffer;
	    this[$OFFSET] = offset;
	    this[$LENGTH] = byteLength;
	  };
	
	  if(DESCRIPTORS){
	    addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
	    addGetter($DataView, BUFFER, '_b');
	    addGetter($DataView, BYTE_LENGTH, '_l');
	    addGetter($DataView, BYTE_OFFSET, '_o');
	  }
	
	  redefineAll($DataView[PROTOTYPE], {
	    getInt8: function getInt8(byteOffset){
	      return get(this, 1, byteOffset)[0] << 24 >> 24;
	    },
	    getUint8: function getUint8(byteOffset){
	      return get(this, 1, byteOffset)[0];
	    },
	    getInt16: function getInt16(byteOffset /*, littleEndian */){
	      var bytes = get(this, 2, byteOffset, arguments[1]);
	      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
	    },
	    getUint16: function getUint16(byteOffset /*, littleEndian */){
	      var bytes = get(this, 2, byteOffset, arguments[1]);
	      return bytes[1] << 8 | bytes[0];
	    },
	    getInt32: function getInt32(byteOffset /*, littleEndian */){
	      return unpackI32(get(this, 4, byteOffset, arguments[1]));
	    },
	    getUint32: function getUint32(byteOffset /*, littleEndian */){
	      return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
	    },
	    getFloat32: function getFloat32(byteOffset /*, littleEndian */){
	      return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
	    },
	    getFloat64: function getFloat64(byteOffset /*, littleEndian */){
	      return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
	    },
	    setInt8: function setInt8(byteOffset, value){
	      set(this, 1, byteOffset, packI8, value);
	    },
	    setUint8: function setUint8(byteOffset, value){
	      set(this, 1, byteOffset, packI8, value);
	    },
	    setInt16: function setInt16(byteOffset, value /*, littleEndian */){
	      set(this, 2, byteOffset, packI16, value, arguments[2]);
	    },
	    setUint16: function setUint16(byteOffset, value /*, littleEndian */){
	      set(this, 2, byteOffset, packI16, value, arguments[2]);
	    },
	    setInt32: function setInt32(byteOffset, value /*, littleEndian */){
	      set(this, 4, byteOffset, packI32, value, arguments[2]);
	    },
	    setUint32: function setUint32(byteOffset, value /*, littleEndian */){
	      set(this, 4, byteOffset, packI32, value, arguments[2]);
	    },
	    setFloat32: function setFloat32(byteOffset, value /*, littleEndian */){
	      set(this, 4, byteOffset, packF32, value, arguments[2]);
	    },
	    setFloat64: function setFloat64(byteOffset, value /*, littleEndian */){
	      set(this, 8, byteOffset, packF64, value, arguments[2]);
	    }
	  });
	} else {
	  if(!fails(function(){
	    new $ArrayBuffer;     // eslint-disable-line no-new
	  }) || !fails(function(){
	    new $ArrayBuffer(.5); // eslint-disable-line no-new
	  })){
	    $ArrayBuffer = function ArrayBuffer(length){
	      return new BaseBuffer(validateArrayBufferArguments(this, length));
	    };
	    var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
	    for(var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j; ){
	      if(!((key = keys[j++]) in $ArrayBuffer))hide($ArrayBuffer, key, BaseBuffer[key]);
	    };
	    if(!LIBRARY)ArrayBufferProto.constructor = $ArrayBuffer;
	  }
	  // iOS Safari 7.x bug
	  var view = new $DataView(new $ArrayBuffer(2))
	    , $setInt8 = $DataView[PROTOTYPE].setInt8;
	  view.setInt8(0, 2147483648);
	  view.setInt8(1, 2147483649);
	  if(view.getInt8(0) || !view.getInt8(1))redefineAll($DataView[PROTOTYPE], {
	    setInt8: function setInt8(byteOffset, value){
	      $setInt8.call(this, byteOffset, value << 24 >> 24);
	    },
	    setUint8: function setUint8(byteOffset, value){
	      $setInt8.call(this, byteOffset, value << 24 >> 24);
	    }
	  }, true);
	}
	setToStringTag($ArrayBuffer, ARRAY_BUFFER);
	setToStringTag($DataView, DATA_VIEW);
	hide($DataView[PROTOTYPE], $typed.VIEW, true);
	exports[ARRAY_BUFFER] = $ArrayBuffer;
	exports[DATA_VIEW] = $DataView;

/***/ },
/* 342 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(129);
	$export($export.G + $export.W + $export.F * !__webpack_require__(340).ABV, {
	  DataView: __webpack_require__(341).DataView
	});

/***/ },
/* 343 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(344)('Int8', 1, function(init){
	  return function Int8Array(data, byteOffset, length){
	    return init(this, data, byteOffset, length);
	  };
	});

/***/ },
/* 344 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	if(__webpack_require__(127)){
	  var LIBRARY             = __webpack_require__(149)
	    , global              = __webpack_require__(125)
	    , fails               = __webpack_require__(128)
	    , $export             = __webpack_require__(129)
	    , $typed              = __webpack_require__(340)
	    , $buffer             = __webpack_require__(341)
	    , ctx                 = __webpack_require__(141)
	    , anInstance          = __webpack_require__(211)
	    , propertyDesc        = __webpack_require__(138)
	    , hide                = __webpack_require__(131)
	    , redefineAll         = __webpack_require__(331)
	    , isInteger           = __webpack_require__(218)
	    , toInteger           = __webpack_require__(159)
	    , toLength            = __webpack_require__(158)
	    , toIndex             = __webpack_require__(160)
	    , toPrimitive         = __webpack_require__(137)
	    , has                 = __webpack_require__(126)
	    , same                = __webpack_require__(192)
	    , classof             = __webpack_require__(196)
	    , isObject            = __webpack_require__(134)
	    , toObject            = __webpack_require__(179)
	    , isArrayIter         = __webpack_require__(284)
	    , create              = __webpack_require__(167)
	    , getPrototypeOf      = __webpack_require__(180)
	    , gOPN                = __webpack_require__(171).f
	    , isIterable          = __webpack_require__(345)
	    , getIterFn           = __webpack_require__(286)
	    , uid                 = __webpack_require__(140)
	    , wks                 = __webpack_require__(146)
	    , createArrayMethod   = __webpack_require__(294)
	    , createArrayIncludes = __webpack_require__(157)
	    , speciesConstructor  = __webpack_require__(328)
	    , ArrayIterators      = __webpack_require__(315)
	    , Iterators           = __webpack_require__(251)
	    , $iterDetect         = __webpack_require__(287)
	    , setSpecies          = __webpack_require__(314)
	    , arrayFill           = __webpack_require__(310)
	    , arrayCopyWithin     = __webpack_require__(307)
	    , $DP                 = __webpack_require__(132)
	    , $GOPD               = __webpack_require__(172)
	    , dP                  = $DP.f
	    , gOPD                = $GOPD.f
	    , RangeError          = global.RangeError
	    , TypeError           = global.TypeError
	    , Uint8Array          = global.Uint8Array
	    , ARRAY_BUFFER        = 'ArrayBuffer'
	    , SHARED_BUFFER       = 'Shared' + ARRAY_BUFFER
	    , BYTES_PER_ELEMENT   = 'BYTES_PER_ELEMENT'
	    , PROTOTYPE           = 'prototype'
	    , ArrayProto          = Array[PROTOTYPE]
	    , $ArrayBuffer        = $buffer.ArrayBuffer
	    , $DataView           = $buffer.DataView
	    , arrayForEach        = createArrayMethod(0)
	    , arrayFilter         = createArrayMethod(2)
	    , arraySome           = createArrayMethod(3)
	    , arrayEvery          = createArrayMethod(4)
	    , arrayFind           = createArrayMethod(5)
	    , arrayFindIndex      = createArrayMethod(6)
	    , arrayIncludes       = createArrayIncludes(true)
	    , arrayIndexOf        = createArrayIncludes(false)
	    , arrayValues         = ArrayIterators.values
	    , arrayKeys           = ArrayIterators.keys
	    , arrayEntries        = ArrayIterators.entries
	    , arrayLastIndexOf    = ArrayProto.lastIndexOf
	    , arrayReduce         = ArrayProto.reduce
	    , arrayReduceRight    = ArrayProto.reduceRight
	    , arrayJoin           = ArrayProto.join
	    , arraySort           = ArrayProto.sort
	    , arraySlice          = ArrayProto.slice
	    , arrayToString       = ArrayProto.toString
	    , arrayToLocaleString = ArrayProto.toLocaleString
	    , ITERATOR            = wks('iterator')
	    , TAG                 = wks('toStringTag')
	    , TYPED_CONSTRUCTOR   = uid('typed_constructor')
	    , DEF_CONSTRUCTOR     = uid('def_constructor')
	    , ALL_CONSTRUCTORS    = $typed.CONSTR
	    , TYPED_ARRAY         = $typed.TYPED
	    , VIEW                = $typed.VIEW
	    , WRONG_LENGTH        = 'Wrong length!';
	
	  var $map = createArrayMethod(1, function(O, length){
	    return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
	  });
	
	  var LITTLE_ENDIAN = fails(function(){
	    return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
	  });
	
	  var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function(){
	    new Uint8Array(1).set({});
	  });
	
	  var strictToLength = function(it, SAME){
	    if(it === undefined)throw TypeError(WRONG_LENGTH);
	    var number = +it
	      , length = toLength(it);
	    if(SAME && !same(number, length))throw RangeError(WRONG_LENGTH);
	    return length;
	  };
	
	  var toOffset = function(it, BYTES){
	    var offset = toInteger(it);
	    if(offset < 0 || offset % BYTES)throw RangeError('Wrong offset!');
	    return offset;
	  };
	
	  var validate = function(it){
	    if(isObject(it) && TYPED_ARRAY in it)return it;
	    throw TypeError(it + ' is not a typed array!');
	  };
	
	  var allocate = function(C, length){
	    if(!(isObject(C) && TYPED_CONSTRUCTOR in C)){
	      throw TypeError('It is not a typed array constructor!');
	    } return new C(length);
	  };
	
	  var speciesFromList = function(O, list){
	    return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
	  };
	
	  var fromList = function(C, list){
	    var index  = 0
	      , length = list.length
	      , result = allocate(C, length);
	    while(length > index)result[index] = list[index++];
	    return result;
	  };
	
	  var addGetter = function(it, key, internal){
	    dP(it, key, {get: function(){ return this._d[internal]; }});
	  };
	
	  var $from = function from(source /*, mapfn, thisArg */){
	    var O       = toObject(source)
	      , aLen    = arguments.length
	      , mapfn   = aLen > 1 ? arguments[1] : undefined
	      , mapping = mapfn !== undefined
	      , iterFn  = getIterFn(O)
	      , i, length, values, result, step, iterator;
	    if(iterFn != undefined && !isArrayIter(iterFn)){
	      for(iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++){
	        values.push(step.value);
	      } O = values;
	    }
	    if(mapping && aLen > 2)mapfn = ctx(mapfn, arguments[2], 2);
	    for(i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++){
	      result[i] = mapping ? mapfn(O[i], i) : O[i];
	    }
	    return result;
	  };
	
	  var $of = function of(/*...items*/){
	    var index  = 0
	      , length = arguments.length
	      , result = allocate(this, length);
	    while(length > index)result[index] = arguments[index++];
	    return result;
	  };
	
	  // iOS Safari 6.x fails here
	  var TO_LOCALE_BUG = !!Uint8Array && fails(function(){ arrayToLocaleString.call(new Uint8Array(1)); });
	
	  var $toLocaleString = function toLocaleString(){
	    return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
	  };
	
	  var proto = {
	    copyWithin: function copyWithin(target, start /*, end */){
	      return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
	    },
	    every: function every(callbackfn /*, thisArg */){
	      return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    fill: function fill(value /*, start, end */){ // eslint-disable-line no-unused-vars
	      return arrayFill.apply(validate(this), arguments);
	    },
	    filter: function filter(callbackfn /*, thisArg */){
	      return speciesFromList(this, arrayFilter(validate(this), callbackfn,
	        arguments.length > 1 ? arguments[1] : undefined));
	    },
	    find: function find(predicate /*, thisArg */){
	      return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    findIndex: function findIndex(predicate /*, thisArg */){
	      return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    forEach: function forEach(callbackfn /*, thisArg */){
	      arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    indexOf: function indexOf(searchElement /*, fromIndex */){
	      return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    includes: function includes(searchElement /*, fromIndex */){
	      return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    join: function join(separator){ // eslint-disable-line no-unused-vars
	      return arrayJoin.apply(validate(this), arguments);
	    },
	    lastIndexOf: function lastIndexOf(searchElement /*, fromIndex */){ // eslint-disable-line no-unused-vars
	      return arrayLastIndexOf.apply(validate(this), arguments);
	    },
	    map: function map(mapfn /*, thisArg */){
	      return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    reduce: function reduce(callbackfn /*, initialValue */){ // eslint-disable-line no-unused-vars
	      return arrayReduce.apply(validate(this), arguments);
	    },
	    reduceRight: function reduceRight(callbackfn /*, initialValue */){ // eslint-disable-line no-unused-vars
	      return arrayReduceRight.apply(validate(this), arguments);
	    },
	    reverse: function reverse(){
	      var that   = this
	        , length = validate(that).length
	        , middle = Math.floor(length / 2)
	        , index  = 0
	        , value;
	      while(index < middle){
	        value         = that[index];
	        that[index++] = that[--length];
	        that[length]  = value;
	      } return that;
	    },
	    some: function some(callbackfn /*, thisArg */){
	      return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    sort: function sort(comparefn){
	      return arraySort.call(validate(this), comparefn);
	    },
	    subarray: function subarray(begin, end){
	      var O      = validate(this)
	        , length = O.length
	        , $begin = toIndex(begin, length);
	      return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(
	        O.buffer,
	        O.byteOffset + $begin * O.BYTES_PER_ELEMENT,
	        toLength((end === undefined ? length : toIndex(end, length)) - $begin)
	      );
	    }
	  };
	
	  var $slice = function slice(start, end){
	    return speciesFromList(this, arraySlice.call(validate(this), start, end));
	  };
	
	  var $set = function set(arrayLike /*, offset */){
	    validate(this);
	    var offset = toOffset(arguments[1], 1)
	      , length = this.length
	      , src    = toObject(arrayLike)
	      , len    = toLength(src.length)
	      , index  = 0;
	    if(len + offset > length)throw RangeError(WRONG_LENGTH);
	    while(index < len)this[offset + index] = src[index++];
	  };
	
	  var $iterators = {
	    entries: function entries(){
	      return arrayEntries.call(validate(this));
	    },
	    keys: function keys(){
	      return arrayKeys.call(validate(this));
	    },
	    values: function values(){
	      return arrayValues.call(validate(this));
	    }
	  };
	
	  var isTAIndex = function(target, key){
	    return isObject(target)
	      && target[TYPED_ARRAY]
	      && typeof key != 'symbol'
	      && key in target
	      && String(+key) == String(key);
	  };
	  var $getDesc = function getOwnPropertyDescriptor(target, key){
	    return isTAIndex(target, key = toPrimitive(key, true))
	      ? propertyDesc(2, target[key])
	      : gOPD(target, key);
	  };
	  var $setDesc = function defineProperty(target, key, desc){
	    if(isTAIndex(target, key = toPrimitive(key, true))
	      && isObject(desc)
	      && has(desc, 'value')
	      && !has(desc, 'get')
	      && !has(desc, 'set')
	      // TODO: add validation descriptor w/o calling accessors
	      && !desc.configurable
	      && (!has(desc, 'writable') || desc.writable)
	      && (!has(desc, 'enumerable') || desc.enumerable)
	    ){
	      target[key] = desc.value;
	      return target;
	    } else return dP(target, key, desc);
	  };
	
	  if(!ALL_CONSTRUCTORS){
	    $GOPD.f = $getDesc;
	    $DP.f   = $setDesc;
	  }
	
	  $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
	    getOwnPropertyDescriptor: $getDesc,
	    defineProperty:           $setDesc
	  });
	
	  if(fails(function(){ arrayToString.call({}); })){
	    arrayToString = arrayToLocaleString = function toString(){
	      return arrayJoin.call(this);
	    }
	  }
	
	  var $TypedArrayPrototype$ = redefineAll({}, proto);
	  redefineAll($TypedArrayPrototype$, $iterators);
	  hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
	  redefineAll($TypedArrayPrototype$, {
	    slice:          $slice,
	    set:            $set,
	    constructor:    function(){ /* noop */ },
	    toString:       arrayToString,
	    toLocaleString: $toLocaleString
	  });
	  addGetter($TypedArrayPrototype$, 'buffer', 'b');
	  addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
	  addGetter($TypedArrayPrototype$, 'byteLength', 'l');
	  addGetter($TypedArrayPrototype$, 'length', 'e');
	  dP($TypedArrayPrototype$, TAG, {
	    get: function(){ return this[TYPED_ARRAY]; }
	  });
	
	  module.exports = function(KEY, BYTES, wrapper, CLAMPED){
	    CLAMPED = !!CLAMPED;
	    var NAME       = KEY + (CLAMPED ? 'Clamped' : '') + 'Array'
	      , ISNT_UINT8 = NAME != 'Uint8Array'
	      , GETTER     = 'get' + KEY
	      , SETTER     = 'set' + KEY
	      , TypedArray = global[NAME]
	      , Base       = TypedArray || {}
	      , TAC        = TypedArray && getPrototypeOf(TypedArray)
	      , FORCED     = !TypedArray || !$typed.ABV
	      , O          = {}
	      , TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
	    var getter = function(that, index){
	      var data = that._d;
	      return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
	    };
	    var setter = function(that, index, value){
	      var data = that._d;
	      if(CLAMPED)value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
	      data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
	    };
	    var addElement = function(that, index){
	      dP(that, index, {
	        get: function(){
	          return getter(this, index);
	        },
	        set: function(value){
	          return setter(this, index, value);
	        },
	        enumerable: true
	      });
	    };
	    if(FORCED){
	      TypedArray = wrapper(function(that, data, $offset, $length){
	        anInstance(that, TypedArray, NAME, '_d');
	        var index  = 0
	          , offset = 0
	          , buffer, byteLength, length, klass;
	        if(!isObject(data)){
	          length     = strictToLength(data, true)
	          byteLength = length * BYTES;
	          buffer     = new $ArrayBuffer(byteLength);
	        } else if(data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER){
	          buffer = data;
	          offset = toOffset($offset, BYTES);
	          var $len = data.byteLength;
	          if($length === undefined){
	            if($len % BYTES)throw RangeError(WRONG_LENGTH);
	            byteLength = $len - offset;
	            if(byteLength < 0)throw RangeError(WRONG_LENGTH);
	          } else {
	            byteLength = toLength($length) * BYTES;
	            if(byteLength + offset > $len)throw RangeError(WRONG_LENGTH);
	          }
	          length = byteLength / BYTES;
	        } else if(TYPED_ARRAY in data){
	          return fromList(TypedArray, data);
	        } else {
	          return $from.call(TypedArray, data);
	        }
	        hide(that, '_d', {
	          b: buffer,
	          o: offset,
	          l: byteLength,
	          e: length,
	          v: new $DataView(buffer)
	        });
	        while(index < length)addElement(that, index++);
	      });
	      TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
	      hide(TypedArrayPrototype, 'constructor', TypedArray);
	    } else if(!$iterDetect(function(iter){
	      // V8 works with iterators, but fails in many other cases
	      // https://code.google.com/p/v8/issues/detail?id=4552
	      new TypedArray(null); // eslint-disable-line no-new
	      new TypedArray(iter); // eslint-disable-line no-new
	    }, true)){
	      TypedArray = wrapper(function(that, data, $offset, $length){
	        anInstance(that, TypedArray, NAME);
	        var klass;
	        // `ws` module bug, temporarily remove validation length for Uint8Array
	        // https://github.com/websockets/ws/pull/645
	        if(!isObject(data))return new Base(strictToLength(data, ISNT_UINT8));
	        if(data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER){
	          return $length !== undefined
	            ? new Base(data, toOffset($offset, BYTES), $length)
	            : $offset !== undefined
	              ? new Base(data, toOffset($offset, BYTES))
	              : new Base(data);
	        }
	        if(TYPED_ARRAY in data)return fromList(TypedArray, data);
	        return $from.call(TypedArray, data);
	      });
	      arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function(key){
	        if(!(key in TypedArray))hide(TypedArray, key, Base[key]);
	      });
	      TypedArray[PROTOTYPE] = TypedArrayPrototype;
	      if(!LIBRARY)TypedArrayPrototype.constructor = TypedArray;
	    }
	    var $nativeIterator   = TypedArrayPrototype[ITERATOR]
	      , CORRECT_ITER_NAME = !!$nativeIterator && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined)
	      , $iterator         = $iterators.values;
	    hide(TypedArray, TYPED_CONSTRUCTOR, true);
	    hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
	    hide(TypedArrayPrototype, VIEW, true);
	    hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);
	
	    if(CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)){
	      dP(TypedArrayPrototype, TAG, {
	        get: function(){ return NAME; }
	      });
	    }
	
	    O[NAME] = TypedArray;
	
	    $export($export.G + $export.W + $export.F * (TypedArray != Base), O);
	
	    $export($export.S, NAME, {
	      BYTES_PER_ELEMENT: BYTES,
	      from: $from,
	      of: $of
	    });
	
	    if(!(BYTES_PER_ELEMENT in TypedArrayPrototype))hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);
	
	    $export($export.P, NAME, proto);
	
	    setSpecies(NAME);
	
	    $export($export.P + $export.F * FORCED_SET, NAME, {set: $set});
	
	    $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);
	
	    $export($export.P + $export.F * (TypedArrayPrototype.toString != arrayToString), NAME, {toString: arrayToString});
	
	    $export($export.P + $export.F * fails(function(){
	      new TypedArray(1).slice();
	    }), NAME, {slice: $slice});
	
	    $export($export.P + $export.F * (fails(function(){
	      return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString()
	    }) || !fails(function(){
	      TypedArrayPrototype.toLocaleString.call([1, 2]);
	    })), NAME, {toLocaleString: $toLocaleString});
	
	    Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
	    if(!LIBRARY && !CORRECT_ITER_NAME)hide(TypedArrayPrototype, ITERATOR, $iterator);
	  };
	} else module.exports = function(){ /* empty */ };

/***/ },
/* 345 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(196)
	  , ITERATOR  = __webpack_require__(146)('iterator')
	  , Iterators = __webpack_require__(251);
	module.exports = __webpack_require__(130).isIterable = function(it){
	  var O = Object(it);
	  return O[ITERATOR] !== undefined
	    || '@@iterator' in O
	    || Iterators.hasOwnProperty(classof(O));
	};

/***/ },
/* 346 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(344)('Uint8', 1, function(init){
	  return function Uint8Array(data, byteOffset, length){
	    return init(this, data, byteOffset, length);
	  };
	});

/***/ },
/* 347 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(344)('Uint8', 1, function(init){
	  return function Uint8ClampedArray(data, byteOffset, length){
	    return init(this, data, byteOffset, length);
	  };
	}, true);

/***/ },
/* 348 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(344)('Int16', 2, function(init){
	  return function Int16Array(data, byteOffset, length){
	    return init(this, data, byteOffset, length);
	  };
	});

/***/ },
/* 349 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(344)('Uint16', 2, function(init){
	  return function Uint16Array(data, byteOffset, length){
	    return init(this, data, byteOffset, length);
	  };
	});

/***/ },
/* 350 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(344)('Int32', 4, function(init){
	  return function Int32Array(data, byteOffset, length){
	    return init(this, data, byteOffset, length);
	  };
	});

/***/ },
/* 351 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(344)('Uint32', 4, function(init){
	  return function Uint32Array(data, byteOffset, length){
	    return init(this, data, byteOffset, length);
	  };
	});

/***/ },
/* 352 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(344)('Float32', 4, function(init){
	  return function Float32Array(data, byteOffset, length){
	    return init(this, data, byteOffset, length);
	  };
	});

/***/ },
/* 353 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(344)('Float64', 8, function(init){
	  return function Float64Array(data, byteOffset, length){
	    return init(this, data, byteOffset, length);
	  };
	});

/***/ },
/* 354 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
	var $export   = __webpack_require__(129)
	  , aFunction = __webpack_require__(142)
	  , anObject  = __webpack_require__(133)
	  , _apply    = Function.apply;
	
	$export($export.S, 'Reflect', {
	  apply: function apply(target, thisArgument, argumentsList){
	    return _apply.call(aFunction(target), thisArgument, anObject(argumentsList));
	  }
	});

/***/ },
/* 355 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
	var $export   = __webpack_require__(129)
	  , create    = __webpack_require__(167)
	  , aFunction = __webpack_require__(142)
	  , anObject  = __webpack_require__(133)
	  , isObject  = __webpack_require__(134)
	  , bind      = __webpack_require__(198);
	
	// MS Edge supports only 2 arguments
	// FF Nightly sets third argument as `new.target`, but does not create `this` from it
	$export($export.S + $export.F * __webpack_require__(128)(function(){
	  function F(){}
	  return !(Reflect.construct(function(){}, [], F) instanceof F);
	}), 'Reflect', {
	  construct: function construct(Target, args /*, newTarget*/){
	    aFunction(Target);
	    anObject(args);
	    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
	    if(Target == newTarget){
	      // w/o altered newTarget, optimization for 0-4 arguments
	      switch(args.length){
	        case 0: return new Target;
	        case 1: return new Target(args[0]);
	        case 2: return new Target(args[0], args[1]);
	        case 3: return new Target(args[0], args[1], args[2]);
	        case 4: return new Target(args[0], args[1], args[2], args[3]);
	      }
	      // w/o altered newTarget, lot of arguments case
	      var $args = [null];
	      $args.push.apply($args, args);
	      return new (bind.apply(Target, $args));
	    }
	    // with altered newTarget, not support built-in constructors
	    var proto    = newTarget.prototype
	      , instance = create(isObject(proto) ? proto : Object.prototype)
	      , result   = Function.apply.call(Target, instance, args);
	    return isObject(result) ? result : instance;
	  }
	});

/***/ },
/* 356 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
	var dP          = __webpack_require__(132)
	  , $export     = __webpack_require__(129)
	  , anObject    = __webpack_require__(133)
	  , toPrimitive = __webpack_require__(137);
	
	// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
	$export($export.S + $export.F * __webpack_require__(128)(function(){
	  Reflect.defineProperty(dP.f({}, 1, {value: 1}), 1, {value: 2});
	}), 'Reflect', {
	  defineProperty: function defineProperty(target, propertyKey, attributes){
	    anObject(target);
	    propertyKey = toPrimitive(propertyKey, true);
	    anObject(attributes);
	    try {
	      dP.f(target, propertyKey, attributes);
	      return true;
	    } catch(e){
	      return false;
	    }
	  }
	});

/***/ },
/* 357 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.4 Reflect.deleteProperty(target, propertyKey)
	var $export  = __webpack_require__(129)
	  , gOPD     = __webpack_require__(172).f
	  , anObject = __webpack_require__(133);
	
	$export($export.S, 'Reflect', {
	  deleteProperty: function deleteProperty(target, propertyKey){
	    var desc = gOPD(anObject(target), propertyKey);
	    return desc && !desc.configurable ? false : delete target[propertyKey];
	  }
	});

/***/ },
/* 358 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 26.1.5 Reflect.enumerate(target)
	var $export  = __webpack_require__(129)
	  , anObject = __webpack_require__(133);
	var Enumerate = function(iterated){
	  this._t = anObject(iterated); // target
	  this._i = 0;                  // next index
	  var keys = this._k = []       // keys
	    , key;
	  for(key in iterated)keys.push(key);
	};
	__webpack_require__(252)(Enumerate, 'Object', function(){
	  var that = this
	    , keys = that._k
	    , key;
	  do {
	    if(that._i >= keys.length)return {value: undefined, done: true};
	  } while(!((key = keys[that._i++]) in that._t));
	  return {value: key, done: false};
	});
	
	$export($export.S, 'Reflect', {
	  enumerate: function enumerate(target){
	    return new Enumerate(target);
	  }
	});

/***/ },
/* 359 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.6 Reflect.get(target, propertyKey [, receiver])
	var gOPD           = __webpack_require__(172)
	  , getPrototypeOf = __webpack_require__(180)
	  , has            = __webpack_require__(126)
	  , $export        = __webpack_require__(129)
	  , isObject       = __webpack_require__(134)
	  , anObject       = __webpack_require__(133);
	
	function get(target, propertyKey/*, receiver*/){
	  var receiver = arguments.length < 3 ? target : arguments[2]
	    , desc, proto;
	  if(anObject(target) === receiver)return target[propertyKey];
	  if(desc = gOPD.f(target, propertyKey))return has(desc, 'value')
	    ? desc.value
	    : desc.get !== undefined
	      ? desc.get.call(receiver)
	      : undefined;
	  if(isObject(proto = getPrototypeOf(target)))return get(proto, propertyKey, receiver);
	}
	
	$export($export.S, 'Reflect', {get: get});

/***/ },
/* 360 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
	var gOPD     = __webpack_require__(172)
	  , $export  = __webpack_require__(129)
	  , anObject = __webpack_require__(133);
	
	$export($export.S, 'Reflect', {
	  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey){
	    return gOPD.f(anObject(target), propertyKey);
	  }
	});

/***/ },
/* 361 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.8 Reflect.getPrototypeOf(target)
	var $export  = __webpack_require__(129)
	  , getProto = __webpack_require__(180)
	  , anObject = __webpack_require__(133);
	
	$export($export.S, 'Reflect', {
	  getPrototypeOf: function getPrototypeOf(target){
	    return getProto(anObject(target));
	  }
	});

/***/ },
/* 362 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.9 Reflect.has(target, propertyKey)
	var $export = __webpack_require__(129);
	
	$export($export.S, 'Reflect', {
	  has: function has(target, propertyKey){
	    return propertyKey in target;
	  }
	});

/***/ },
/* 363 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.10 Reflect.isExtensible(target)
	var $export       = __webpack_require__(129)
	  , anObject      = __webpack_require__(133)
	  , $isExtensible = Object.isExtensible;
	
	$export($export.S, 'Reflect', {
	  isExtensible: function isExtensible(target){
	    anObject(target);
	    return $isExtensible ? $isExtensible(target) : true;
	  }
	});

/***/ },
/* 364 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.11 Reflect.ownKeys(target)
	var $export = __webpack_require__(129);
	
	$export($export.S, 'Reflect', {ownKeys: __webpack_require__(365)});

/***/ },
/* 365 */
/***/ function(module, exports, __webpack_require__) {

	// all object keys, includes non-enumerable and symbols
	var gOPN     = __webpack_require__(171)
	  , gOPS     = __webpack_require__(164)
	  , anObject = __webpack_require__(133)
	  , Reflect  = __webpack_require__(125).Reflect;
	module.exports = Reflect && Reflect.ownKeys || function ownKeys(it){
	  var keys       = gOPN.f(anObject(it))
	    , getSymbols = gOPS.f;
	  return getSymbols ? keys.concat(getSymbols(it)) : keys;
	};

/***/ },
/* 366 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.12 Reflect.preventExtensions(target)
	var $export            = __webpack_require__(129)
	  , anObject           = __webpack_require__(133)
	  , $preventExtensions = Object.preventExtensions;
	
	$export($export.S, 'Reflect', {
	  preventExtensions: function preventExtensions(target){
	    anObject(target);
	    try {
	      if($preventExtensions)$preventExtensions(target);
	      return true;
	    } catch(e){
	      return false;
	    }
	  }
	});

/***/ },
/* 367 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
	var dP             = __webpack_require__(132)
	  , gOPD           = __webpack_require__(172)
	  , getPrototypeOf = __webpack_require__(180)
	  , has            = __webpack_require__(126)
	  , $export        = __webpack_require__(129)
	  , createDesc     = __webpack_require__(138)
	  , anObject       = __webpack_require__(133)
	  , isObject       = __webpack_require__(134);
	
	function set(target, propertyKey, V/*, receiver*/){
	  var receiver = arguments.length < 4 ? target : arguments[3]
	    , ownDesc  = gOPD.f(anObject(target), propertyKey)
	    , existingDescriptor, proto;
	  if(!ownDesc){
	    if(isObject(proto = getPrototypeOf(target))){
	      return set(proto, propertyKey, V, receiver);
	    }
	    ownDesc = createDesc(0);
	  }
	  if(has(ownDesc, 'value')){
	    if(ownDesc.writable === false || !isObject(receiver))return false;
	    existingDescriptor = gOPD.f(receiver, propertyKey) || createDesc(0);
	    existingDescriptor.value = V;
	    dP.f(receiver, propertyKey, existingDescriptor);
	    return true;
	  }
	  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
	}
	
	$export($export.S, 'Reflect', {set: set});

/***/ },
/* 368 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.14 Reflect.setPrototypeOf(target, proto)
	var $export  = __webpack_require__(129)
	  , setProto = __webpack_require__(194);
	
	if(setProto)$export($export.S, 'Reflect', {
	  setPrototypeOf: function setPrototypeOf(target, proto){
	    setProto.check(target, proto);
	    try {
	      setProto.set(target, proto);
	      return true;
	    } catch(e){
	      return false;
	    }
	  }
	});

/***/ },
/* 369 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// https://github.com/tc39/Array.prototype.includes
	var $export   = __webpack_require__(129)
	  , $includes = __webpack_require__(157)(true);
	
	$export($export.P, 'Array', {
	  includes: function includes(el /*, fromIndex = 0 */){
	    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});
	
	__webpack_require__(308)('includes');

/***/ },
/* 370 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// https://github.com/mathiasbynens/String.prototype.at
	var $export = __webpack_require__(129)
	  , $at     = __webpack_require__(249)(true);
	
	$export($export.P, 'String', {
	  at: function at(pos){
	    return $at(this, pos);
	  }
	});

/***/ },
/* 371 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// https://github.com/tc39/proposal-string-pad-start-end
	var $export = __webpack_require__(129)
	  , $pad    = __webpack_require__(372);
	
	$export($export.P, 'String', {
	  padStart: function padStart(maxLength /*, fillString = ' ' */){
	    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
	  }
	});

/***/ },
/* 372 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/tc39/proposal-string-pad-start-end
	var toLength = __webpack_require__(158)
	  , repeat   = __webpack_require__(213)
	  , defined  = __webpack_require__(156);
	
	module.exports = function(that, maxLength, fillString, left){
	  var S            = String(defined(that))
	    , stringLength = S.length
	    , fillStr      = fillString === undefined ? ' ' : String(fillString)
	    , intMaxLength = toLength(maxLength);
	  if(intMaxLength <= stringLength || fillStr == '')return S;
	  var fillLen = intMaxLength - stringLength
	    , stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
	  if(stringFiller.length > fillLen)stringFiller = stringFiller.slice(0, fillLen);
	  return left ? stringFiller + S : S + stringFiller;
	};


/***/ },
/* 373 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// https://github.com/tc39/proposal-string-pad-start-end
	var $export = __webpack_require__(129)
	  , $pad    = __webpack_require__(372);
	
	$export($export.P, 'String', {
	  padEnd: function padEnd(maxLength /*, fillString = ' ' */){
	    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
	  }
	});

/***/ },
/* 374 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
	__webpack_require__(204)('trimLeft', function($trim){
	  return function trimLeft(){
	    return $trim(this, 1);
	  };
	}, 'trimStart');

/***/ },
/* 375 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
	__webpack_require__(204)('trimRight', function($trim){
	  return function trimRight(){
	    return $trim(this, 2);
	  };
	}, 'trimEnd');

/***/ },
/* 376 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// https://tc39.github.io/String.prototype.matchAll/
	var $export     = __webpack_require__(129)
	  , defined     = __webpack_require__(156)
	  , toLength    = __webpack_require__(158)
	  , isRegExp    = __webpack_require__(256)
	  , getFlags    = __webpack_require__(318)
	  , RegExpProto = RegExp.prototype;
	
	var $RegExpStringIterator = function(regexp, string){
	  this._r = regexp;
	  this._s = string;
	};
	
	__webpack_require__(252)($RegExpStringIterator, 'RegExp String', function next(){
	  var match = this._r.exec(this._s);
	  return {value: match, done: match === null};
	});
	
	$export($export.P, 'String', {
	  matchAll: function matchAll(regexp){
	    defined(this);
	    if(!isRegExp(regexp))throw TypeError(regexp + ' is not a regexp!');
	    var S     = String(this)
	      , flags = 'flags' in RegExpProto ? String(regexp.flags) : getFlags.call(regexp)
	      , rx    = new RegExp(regexp.source, ~flags.indexOf('g') ? flags : 'g' + flags);
	    rx.lastIndex = toLength(regexp.lastIndex);
	    return new $RegExpStringIterator(rx, S);
	  }
	});

/***/ },
/* 377 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(148)('asyncIterator');

/***/ },
/* 378 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(148)('observable');

/***/ },
/* 379 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/tc39/proposal-object-getownpropertydescriptors
	var $export        = __webpack_require__(129)
	  , ownKeys        = __webpack_require__(365)
	  , toIObject      = __webpack_require__(153)
	  , gOPD           = __webpack_require__(172)
	  , createProperty = __webpack_require__(285);
	
	$export($export.S, 'Object', {
	  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object){
	    var O       = toIObject(object)
	      , getDesc = gOPD.f
	      , keys    = ownKeys(O)
	      , result  = {}
	      , i       = 0
	      , key, D;
	    while(keys.length > i)createProperty(result, key = keys[i++], getDesc(O, key));
	    return result;
	  }
	});

/***/ },
/* 380 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/tc39/proposal-object-values-entries
	var $export = __webpack_require__(129)
	  , $values = __webpack_require__(381)(false);
	
	$export($export.S, 'Object', {
	  values: function values(it){
	    return $values(it);
	  }
	});

/***/ },
/* 381 */
/***/ function(module, exports, __webpack_require__) {

	var getKeys   = __webpack_require__(151)
	  , toIObject = __webpack_require__(153)
	  , isEnum    = __webpack_require__(165).f;
	module.exports = function(isEntries){
	  return function(it){
	    var O      = toIObject(it)
	      , keys   = getKeys(O)
	      , length = keys.length
	      , i      = 0
	      , result = []
	      , key;
	    while(length > i)if(isEnum.call(O, key = keys[i++])){
	      result.push(isEntries ? [key, O[key]] : O[key]);
	    } return result;
	  };
	};

/***/ },
/* 382 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/tc39/proposal-object-values-entries
	var $export  = __webpack_require__(129)
	  , $entries = __webpack_require__(381)(true);
	
	$export($export.S, 'Object', {
	  entries: function entries(it){
	    return $entries(it);
	  }
	});

/***/ },
/* 383 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export         = __webpack_require__(129)
	  , toObject        = __webpack_require__(179)
	  , aFunction       = __webpack_require__(142)
	  , $defineProperty = __webpack_require__(132);
	
	// B.2.2.2 Object.prototype.__defineGetter__(P, getter)
	__webpack_require__(127) && $export($export.P + __webpack_require__(384), 'Object', {
	  __defineGetter__: function __defineGetter__(P, getter){
	    $defineProperty.f(toObject(this), P, {get: aFunction(getter), enumerable: true, configurable: true});
	  }
	});

/***/ },
/* 384 */
/***/ function(module, exports, __webpack_require__) {

	// Forced replacement prototype accessors methods
	module.exports = __webpack_require__(149)|| !__webpack_require__(128)(function(){
	  var K = Math.random();
	  // In FF throws only define methods
	  __defineSetter__.call(null, K, function(){ /* empty */});
	  delete __webpack_require__(125)[K];
	});

/***/ },
/* 385 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export         = __webpack_require__(129)
	  , toObject        = __webpack_require__(179)
	  , aFunction       = __webpack_require__(142)
	  , $defineProperty = __webpack_require__(132);
	
	// B.2.2.3 Object.prototype.__defineSetter__(P, setter)
	__webpack_require__(127) && $export($export.P + __webpack_require__(384), 'Object', {
	  __defineSetter__: function __defineSetter__(P, setter){
	    $defineProperty.f(toObject(this), P, {set: aFunction(setter), enumerable: true, configurable: true});
	  }
	});

/***/ },
/* 386 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export                  = __webpack_require__(129)
	  , toObject                 = __webpack_require__(179)
	  , toPrimitive              = __webpack_require__(137)
	  , getPrototypeOf           = __webpack_require__(180)
	  , getOwnPropertyDescriptor = __webpack_require__(172).f;
	
	// B.2.2.4 Object.prototype.__lookupGetter__(P)
	__webpack_require__(127) && $export($export.P + __webpack_require__(384), 'Object', {
	  __lookupGetter__: function __lookupGetter__(P){
	    var O = toObject(this)
	      , K = toPrimitive(P, true)
	      , D;
	    do {
	      if(D = getOwnPropertyDescriptor(O, K))return D.get;
	    } while(O = getPrototypeOf(O));
	  }
	});

/***/ },
/* 387 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export                  = __webpack_require__(129)
	  , toObject                 = __webpack_require__(179)
	  , toPrimitive              = __webpack_require__(137)
	  , getPrototypeOf           = __webpack_require__(180)
	  , getOwnPropertyDescriptor = __webpack_require__(172).f;
	
	// B.2.2.5 Object.prototype.__lookupSetter__(P)
	__webpack_require__(127) && $export($export.P + __webpack_require__(384), 'Object', {
	  __lookupSetter__: function __lookupSetter__(P){
	    var O = toObject(this)
	      , K = toPrimitive(P, true)
	      , D;
	    do {
	      if(D = getOwnPropertyDescriptor(O, K))return D.set;
	    } while(O = getPrototypeOf(O));
	  }
	});

/***/ },
/* 388 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var $export  = __webpack_require__(129);
	
	$export($export.P + $export.R, 'Map', {toJSON: __webpack_require__(389)('Map')});

/***/ },
/* 389 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var classof = __webpack_require__(196)
	  , from    = __webpack_require__(390);
	module.exports = function(NAME){
	  return function toJSON(){
	    if(classof(this) != NAME)throw TypeError(NAME + "#toJSON isn't generic");
	    return from(this);
	  };
	};

/***/ },
/* 390 */
/***/ function(module, exports, __webpack_require__) {

	var forOf = __webpack_require__(327);
	
	module.exports = function(iter, ITERATOR){
	  var result = [];
	  forOf(iter, false, result.push, result, ITERATOR);
	  return result;
	};


/***/ },
/* 391 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var $export  = __webpack_require__(129);
	
	$export($export.P + $export.R, 'Set', {toJSON: __webpack_require__(389)('Set')});

/***/ },
/* 392 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/ljharb/proposal-global
	var $export = __webpack_require__(129);
	
	$export($export.S, 'System', {global: __webpack_require__(125)});

/***/ },
/* 393 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/ljharb/proposal-is-error
	var $export = __webpack_require__(129)
	  , cof     = __webpack_require__(155);
	
	$export($export.S, 'Error', {
	  isError: function isError(it){
	    return cof(it) === 'Error';
	  }
	});

/***/ },
/* 394 */
/***/ function(module, exports, __webpack_require__) {

	// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
	var $export = __webpack_require__(129);
	
	$export($export.S, 'Math', {
	  iaddh: function iaddh(x0, x1, y0, y1){
	    var $x0 = x0 >>> 0
	      , $x1 = x1 >>> 0
	      , $y0 = y0 >>> 0;
	    return $x1 + (y1 >>> 0) + (($x0 & $y0 | ($x0 | $y0) & ~($x0 + $y0 >>> 0)) >>> 31) | 0;
	  }
	});

/***/ },
/* 395 */
/***/ function(module, exports, __webpack_require__) {

	// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
	var $export = __webpack_require__(129);
	
	$export($export.S, 'Math', {
	  isubh: function isubh(x0, x1, y0, y1){
	    var $x0 = x0 >>> 0
	      , $x1 = x1 >>> 0
	      , $y0 = y0 >>> 0;
	    return $x1 - (y1 >>> 0) - ((~$x0 & $y0 | ~($x0 ^ $y0) & $x0 - $y0 >>> 0) >>> 31) | 0;
	  }
	});

/***/ },
/* 396 */
/***/ function(module, exports, __webpack_require__) {

	// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
	var $export = __webpack_require__(129);
	
	$export($export.S, 'Math', {
	  imulh: function imulh(u, v){
	    var UINT16 = 0xffff
	      , $u = +u
	      , $v = +v
	      , u0 = $u & UINT16
	      , v0 = $v & UINT16
	      , u1 = $u >> 16
	      , v1 = $v >> 16
	      , t  = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
	    return u1 * v1 + (t >> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >> 16);
	  }
	});

/***/ },
/* 397 */
/***/ function(module, exports, __webpack_require__) {

	// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
	var $export = __webpack_require__(129);
	
	$export($export.S, 'Math', {
	  umulh: function umulh(u, v){
	    var UINT16 = 0xffff
	      , $u = +u
	      , $v = +v
	      , u0 = $u & UINT16
	      , v0 = $v & UINT16
	      , u1 = $u >>> 16
	      , v1 = $v >>> 16
	      , t  = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
	    return u1 * v1 + (t >>> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >>> 16);
	  }
	});

/***/ },
/* 398 */
/***/ function(module, exports, __webpack_require__) {

	var metadata                  = __webpack_require__(399)
	  , anObject                  = __webpack_require__(133)
	  , toMetaKey                 = metadata.key
	  , ordinaryDefineOwnMetadata = metadata.set;
	
	metadata.exp({defineMetadata: function defineMetadata(metadataKey, metadataValue, target, targetKey){
	  ordinaryDefineOwnMetadata(metadataKey, metadataValue, anObject(target), toMetaKey(targetKey));
	}});

/***/ },
/* 399 */
/***/ function(module, exports, __webpack_require__) {

	var Map     = __webpack_require__(332)
	  , $export = __webpack_require__(129)
	  , shared  = __webpack_require__(144)('metadata')
	  , store   = shared.store || (shared.store = new (__webpack_require__(336)));
	
	var getOrCreateMetadataMap = function(target, targetKey, create){
	  var targetMetadata = store.get(target);
	  if(!targetMetadata){
	    if(!create)return undefined;
	    store.set(target, targetMetadata = new Map);
	  }
	  var keyMetadata = targetMetadata.get(targetKey);
	  if(!keyMetadata){
	    if(!create)return undefined;
	    targetMetadata.set(targetKey, keyMetadata = new Map);
	  } return keyMetadata;
	};
	var ordinaryHasOwnMetadata = function(MetadataKey, O, P){
	  var metadataMap = getOrCreateMetadataMap(O, P, false);
	  return metadataMap === undefined ? false : metadataMap.has(MetadataKey);
	};
	var ordinaryGetOwnMetadata = function(MetadataKey, O, P){
	  var metadataMap = getOrCreateMetadataMap(O, P, false);
	  return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
	};
	var ordinaryDefineOwnMetadata = function(MetadataKey, MetadataValue, O, P){
	  getOrCreateMetadataMap(O, P, true).set(MetadataKey, MetadataValue);
	};
	var ordinaryOwnMetadataKeys = function(target, targetKey){
	  var metadataMap = getOrCreateMetadataMap(target, targetKey, false)
	    , keys        = [];
	  if(metadataMap)metadataMap.forEach(function(_, key){ keys.push(key); });
	  return keys;
	};
	var toMetaKey = function(it){
	  return it === undefined || typeof it == 'symbol' ? it : String(it);
	};
	var exp = function(O){
	  $export($export.S, 'Reflect', O);
	};
	
	module.exports = {
	  store: store,
	  map: getOrCreateMetadataMap,
	  has: ordinaryHasOwnMetadata,
	  get: ordinaryGetOwnMetadata,
	  set: ordinaryDefineOwnMetadata,
	  keys: ordinaryOwnMetadataKeys,
	  key: toMetaKey,
	  exp: exp
	};

/***/ },
/* 400 */
/***/ function(module, exports, __webpack_require__) {

	var metadata               = __webpack_require__(399)
	  , anObject               = __webpack_require__(133)
	  , toMetaKey              = metadata.key
	  , getOrCreateMetadataMap = metadata.map
	  , store                  = metadata.store;
	
	metadata.exp({deleteMetadata: function deleteMetadata(metadataKey, target /*, targetKey */){
	  var targetKey   = arguments.length < 3 ? undefined : toMetaKey(arguments[2])
	    , metadataMap = getOrCreateMetadataMap(anObject(target), targetKey, false);
	  if(metadataMap === undefined || !metadataMap['delete'](metadataKey))return false;
	  if(metadataMap.size)return true;
	  var targetMetadata = store.get(target);
	  targetMetadata['delete'](targetKey);
	  return !!targetMetadata.size || store['delete'](target);
	}});

/***/ },
/* 401 */
/***/ function(module, exports, __webpack_require__) {

	var metadata               = __webpack_require__(399)
	  , anObject               = __webpack_require__(133)
	  , getPrototypeOf         = __webpack_require__(180)
	  , ordinaryHasOwnMetadata = metadata.has
	  , ordinaryGetOwnMetadata = metadata.get
	  , toMetaKey              = metadata.key;
	
	var ordinaryGetMetadata = function(MetadataKey, O, P){
	  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
	  if(hasOwn)return ordinaryGetOwnMetadata(MetadataKey, O, P);
	  var parent = getPrototypeOf(O);
	  return parent !== null ? ordinaryGetMetadata(MetadataKey, parent, P) : undefined;
	};
	
	metadata.exp({getMetadata: function getMetadata(metadataKey, target /*, targetKey */){
	  return ordinaryGetMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
	}});

/***/ },
/* 402 */
/***/ function(module, exports, __webpack_require__) {

	var Set                     = __webpack_require__(335)
	  , from                    = __webpack_require__(390)
	  , metadata                = __webpack_require__(399)
	  , anObject                = __webpack_require__(133)
	  , getPrototypeOf          = __webpack_require__(180)
	  , ordinaryOwnMetadataKeys = metadata.keys
	  , toMetaKey               = metadata.key;
	
	var ordinaryMetadataKeys = function(O, P){
	  var oKeys  = ordinaryOwnMetadataKeys(O, P)
	    , parent = getPrototypeOf(O);
	  if(parent === null)return oKeys;
	  var pKeys  = ordinaryMetadataKeys(parent, P);
	  return pKeys.length ? oKeys.length ? from(new Set(oKeys.concat(pKeys))) : pKeys : oKeys;
	};
	
	metadata.exp({getMetadataKeys: function getMetadataKeys(target /*, targetKey */){
	  return ordinaryMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
	}});

/***/ },
/* 403 */
/***/ function(module, exports, __webpack_require__) {

	var metadata               = __webpack_require__(399)
	  , anObject               = __webpack_require__(133)
	  , ordinaryGetOwnMetadata = metadata.get
	  , toMetaKey              = metadata.key;
	
	metadata.exp({getOwnMetadata: function getOwnMetadata(metadataKey, target /*, targetKey */){
	  return ordinaryGetOwnMetadata(metadataKey, anObject(target)
	    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
	}});

/***/ },
/* 404 */
/***/ function(module, exports, __webpack_require__) {

	var metadata                = __webpack_require__(399)
	  , anObject                = __webpack_require__(133)
	  , ordinaryOwnMetadataKeys = metadata.keys
	  , toMetaKey               = metadata.key;
	
	metadata.exp({getOwnMetadataKeys: function getOwnMetadataKeys(target /*, targetKey */){
	  return ordinaryOwnMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
	}});

/***/ },
/* 405 */
/***/ function(module, exports, __webpack_require__) {

	var metadata               = __webpack_require__(399)
	  , anObject               = __webpack_require__(133)
	  , getPrototypeOf         = __webpack_require__(180)
	  , ordinaryHasOwnMetadata = metadata.has
	  , toMetaKey              = metadata.key;
	
	var ordinaryHasMetadata = function(MetadataKey, O, P){
	  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
	  if(hasOwn)return true;
	  var parent = getPrototypeOf(O);
	  return parent !== null ? ordinaryHasMetadata(MetadataKey, parent, P) : false;
	};
	
	metadata.exp({hasMetadata: function hasMetadata(metadataKey, target /*, targetKey */){
	  return ordinaryHasMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
	}});

/***/ },
/* 406 */
/***/ function(module, exports, __webpack_require__) {

	var metadata               = __webpack_require__(399)
	  , anObject               = __webpack_require__(133)
	  , ordinaryHasOwnMetadata = metadata.has
	  , toMetaKey              = metadata.key;
	
	metadata.exp({hasOwnMetadata: function hasOwnMetadata(metadataKey, target /*, targetKey */){
	  return ordinaryHasOwnMetadata(metadataKey, anObject(target)
	    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
	}});

/***/ },
/* 407 */
/***/ function(module, exports, __webpack_require__) {

	var metadata                  = __webpack_require__(399)
	  , anObject                  = __webpack_require__(133)
	  , aFunction                 = __webpack_require__(142)
	  , toMetaKey                 = metadata.key
	  , ordinaryDefineOwnMetadata = metadata.set;
	
	metadata.exp({metadata: function metadata(metadataKey, metadataValue){
	  return function decorator(target, targetKey){
	    ordinaryDefineOwnMetadata(
	      metadataKey, metadataValue,
	      (targetKey !== undefined ? anObject : aFunction)(target),
	      toMetaKey(targetKey)
	    );
	  };
	}});

/***/ },
/* 408 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/rwaldron/tc39-notes/blob/master/es6/2014-09/sept-25.md#510-globalasap-for-enqueuing-a-microtask
	var $export   = __webpack_require__(129)
	  , microtask = __webpack_require__(330)()
	  , process   = __webpack_require__(125).process
	  , isNode    = __webpack_require__(155)(process) == 'process';
	
	$export($export.G, {
	  asap: function asap(fn){
	    var domain = isNode && process.domain;
	    microtask(domain ? domain.bind(fn) : fn);
	  }
	});

/***/ },
/* 409 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// https://github.com/zenparsing/es-observable
	var $export     = __webpack_require__(129)
	  , global      = __webpack_require__(125)
	  , core        = __webpack_require__(130)
	  , microtask   = __webpack_require__(330)()
	  , OBSERVABLE  = __webpack_require__(146)('observable')
	  , aFunction   = __webpack_require__(142)
	  , anObject    = __webpack_require__(133)
	  , anInstance  = __webpack_require__(211)
	  , redefineAll = __webpack_require__(331)
	  , hide        = __webpack_require__(131)
	  , forOf       = __webpack_require__(327)
	  , RETURN      = forOf.RETURN;
	
	var getMethod = function(fn){
	  return fn == null ? undefined : aFunction(fn);
	};
	
	var cleanupSubscription = function(subscription){
	  var cleanup = subscription._c;
	  if(cleanup){
	    subscription._c = undefined;
	    cleanup();
	  }
	};
	
	var subscriptionClosed = function(subscription){
	  return subscription._o === undefined;
	};
	
	var closeSubscription = function(subscription){
	  if(!subscriptionClosed(subscription)){
	    subscription._o = undefined;
	    cleanupSubscription(subscription);
	  }
	};
	
	var Subscription = function(observer, subscriber){
	  anObject(observer);
	  this._c = undefined;
	  this._o = observer;
	  observer = new SubscriptionObserver(this);
	  try {
	    var cleanup      = subscriber(observer)
	      , subscription = cleanup;
	    if(cleanup != null){
	      if(typeof cleanup.unsubscribe === 'function')cleanup = function(){ subscription.unsubscribe(); };
	      else aFunction(cleanup);
	      this._c = cleanup;
	    }
	  } catch(e){
	    observer.error(e);
	    return;
	  } if(subscriptionClosed(this))cleanupSubscription(this);
	};
	
	Subscription.prototype = redefineAll({}, {
	  unsubscribe: function unsubscribe(){ closeSubscription(this); }
	});
	
	var SubscriptionObserver = function(subscription){
	  this._s = subscription;
	};
	
	SubscriptionObserver.prototype = redefineAll({}, {
	  next: function next(value){
	    var subscription = this._s;
	    if(!subscriptionClosed(subscription)){
	      var observer = subscription._o;
	      try {
	        var m = getMethod(observer.next);
	        if(m)return m.call(observer, value);
	      } catch(e){
	        try {
	          closeSubscription(subscription);
	        } finally {
	          throw e;
	        }
	      }
	    }
	  },
	  error: function error(value){
	    var subscription = this._s;
	    if(subscriptionClosed(subscription))throw value;
	    var observer = subscription._o;
	    subscription._o = undefined;
	    try {
	      var m = getMethod(observer.error);
	      if(!m)throw value;
	      value = m.call(observer, value);
	    } catch(e){
	      try {
	        cleanupSubscription(subscription);
	      } finally {
	        throw e;
	      }
	    } cleanupSubscription(subscription);
	    return value;
	  },
	  complete: function complete(value){
	    var subscription = this._s;
	    if(!subscriptionClosed(subscription)){
	      var observer = subscription._o;
	      subscription._o = undefined;
	      try {
	        var m = getMethod(observer.complete);
	        value = m ? m.call(observer, value) : undefined;
	      } catch(e){
	        try {
	          cleanupSubscription(subscription);
	        } finally {
	          throw e;
	        }
	      } cleanupSubscription(subscription);
	      return value;
	    }
	  }
	});
	
	var $Observable = function Observable(subscriber){
	  anInstance(this, $Observable, 'Observable', '_f')._f = aFunction(subscriber);
	};
	
	redefineAll($Observable.prototype, {
	  subscribe: function subscribe(observer){
	    return new Subscription(observer, this._f);
	  },
	  forEach: function forEach(fn){
	    var that = this;
	    return new (core.Promise || global.Promise)(function(resolve, reject){
	      aFunction(fn);
	      var subscription = that.subscribe({
	        next : function(value){
	          try {
	            return fn(value);
	          } catch(e){
	            reject(e);
	            subscription.unsubscribe();
	          }
	        },
	        error: reject,
	        complete: resolve
	      });
	    });
	  }
	});
	
	redefineAll($Observable, {
	  from: function from(x){
	    var C = typeof this === 'function' ? this : $Observable;
	    var method = getMethod(anObject(x)[OBSERVABLE]);
	    if(method){
	      var observable = anObject(method.call(x));
	      return observable.constructor === C ? observable : new C(function(observer){
	        return observable.subscribe(observer);
	      });
	    }
	    return new C(function(observer){
	      var done = false;
	      microtask(function(){
	        if(!done){
	          try {
	            if(forOf(x, false, function(it){
	              observer.next(it);
	              if(done)return RETURN;
	            }) === RETURN)return;
	          } catch(e){
	            if(done)throw e;
	            observer.error(e);
	            return;
	          } observer.complete();
	        }
	      });
	      return function(){ done = true; };
	    });
	  },
	  of: function of(){
	    for(var i = 0, l = arguments.length, items = Array(l); i < l;)items[i] = arguments[i++];
	    return new (typeof this === 'function' ? this : $Observable)(function(observer){
	      var done = false;
	      microtask(function(){
	        if(!done){
	          for(var i = 0; i < items.length; ++i){
	            observer.next(items[i]);
	            if(done)return;
	          } observer.complete();
	        }
	      });
	      return function(){ done = true; };
	    });
	  }
	});
	
	hide($Observable.prototype, OBSERVABLE, function(){ return this; });
	
	$export($export.G, {Observable: $Observable});
	
	__webpack_require__(314)('Observable');

/***/ },
/* 410 */
/***/ function(module, exports, __webpack_require__) {

	// ie9- setTimeout & setInterval additional parameters fix
	var global     = __webpack_require__(125)
	  , $export    = __webpack_require__(129)
	  , invoke     = __webpack_require__(199)
	  , partial    = __webpack_require__(411)
	  , navigator  = global.navigator
	  , MSIE       = !!navigator && /MSIE .\./.test(navigator.userAgent); // <- dirty ie9- check
	var wrap = function(set){
	  return MSIE ? function(fn, time /*, ...args */){
	    return set(invoke(
	      partial,
	      [].slice.call(arguments, 2),
	      typeof fn == 'function' ? fn : Function(fn)
	    ), time);
	  } : set;
	};
	$export($export.G + $export.B + $export.F * MSIE, {
	  setTimeout:  wrap(global.setTimeout),
	  setInterval: wrap(global.setInterval)
	});

/***/ },
/* 411 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var path      = __webpack_require__(412)
	  , invoke    = __webpack_require__(199)
	  , aFunction = __webpack_require__(142);
	module.exports = function(/* ...pargs */){
	  var fn     = aFunction(this)
	    , length = arguments.length
	    , pargs  = Array(length)
	    , i      = 0
	    , _      = path._
	    , holder = false;
	  while(length > i)if((pargs[i] = arguments[i++]) === _)holder = true;
	  return function(/* ...args */){
	    var that = this
	      , aLen = arguments.length
	      , j = 0, k = 0, args;
	    if(!holder && !aLen)return invoke(fn, pargs, that);
	    args = pargs.slice();
	    if(holder)for(;length > j; j++)if(args[j] === _)args[j] = arguments[k++];
	    while(aLen > k)args.push(arguments[k++]);
	    return invoke(fn, args, that);
	  };
	};

/***/ },
/* 412 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(125);

/***/ },
/* 413 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(129)
	  , $task   = __webpack_require__(329);
	$export($export.G + $export.B, {
	  setImmediate:   $task.set,
	  clearImmediate: $task.clear
	});

/***/ },
/* 414 */
/***/ function(module, exports, __webpack_require__) {

	var $iterators    = __webpack_require__(315)
	  , redefine      = __webpack_require__(139)
	  , global        = __webpack_require__(125)
	  , hide          = __webpack_require__(131)
	  , Iterators     = __webpack_require__(251)
	  , wks           = __webpack_require__(146)
	  , ITERATOR      = wks('iterator')
	  , TO_STRING_TAG = wks('toStringTag')
	  , ArrayValues   = Iterators.Array;
	
	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype
	    , key;
	  if(proto){
	    if(!proto[ITERATOR])hide(proto, ITERATOR, ArrayValues);
	    if(!proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	    Iterators[NAME] = ArrayValues;
	    for(key in $iterators)if(!proto[key])redefine(proto, key, $iterators[key], true);
	  }
	}

/***/ },
/* 415 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {/**
	 * Copyright (c) 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
	 * additional grant of patent rights can be found in the PATENTS file in
	 * the same directory.
	 */
	
	!(function(global) {
	  "use strict";
	
	  var hasOwn = Object.prototype.hasOwnProperty;
	  var undefined; // More compressible than void 0.
	  var $Symbol = typeof Symbol === "function" ? Symbol : {};
	  var iteratorSymbol = $Symbol.iterator || "@@iterator";
	  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
	
	  var inModule = typeof module === "object";
	  var runtime = global.regeneratorRuntime;
	  if (runtime) {
	    if (inModule) {
	      // If regeneratorRuntime is defined globally and we're in a module,
	      // make the exports object identical to regeneratorRuntime.
	      module.exports = runtime;
	    }
	    // Don't bother evaluating the rest of this file if the runtime was
	    // already defined globally.
	    return;
	  }
	
	  // Define the runtime globally (as expected by generated code) as either
	  // module.exports (if we're in a module) or a new, empty object.
	  runtime = global.regeneratorRuntime = inModule ? module.exports : {};
	
	  function wrap(innerFn, outerFn, self, tryLocsList) {
	    // If outerFn provided, then outerFn.prototype instanceof Generator.
	    var generator = Object.create((outerFn || Generator).prototype);
	    var context = new Context(tryLocsList || []);
	
	    // The ._invoke method unifies the implementations of the .next,
	    // .throw, and .return methods.
	    generator._invoke = makeInvokeMethod(innerFn, self, context);
	
	    return generator;
	  }
	  runtime.wrap = wrap;
	
	  // Try/catch helper to minimize deoptimizations. Returns a completion
	  // record like context.tryEntries[i].completion. This interface could
	  // have been (and was previously) designed to take a closure to be
	  // invoked without arguments, but in all the cases we care about we
	  // already have an existing method we want to call, so there's no need
	  // to create a new function object. We can even get away with assuming
	  // the method takes exactly one argument, since that happens to be true
	  // in every case, so we don't have to touch the arguments object. The
	  // only additional allocation required is the completion record, which
	  // has a stable shape and so hopefully should be cheap to allocate.
	  function tryCatch(fn, obj, arg) {
	    try {
	      return { type: "normal", arg: fn.call(obj, arg) };
	    } catch (err) {
	      return { type: "throw", arg: err };
	    }
	  }
	
	  var GenStateSuspendedStart = "suspendedStart";
	  var GenStateSuspendedYield = "suspendedYield";
	  var GenStateExecuting = "executing";
	  var GenStateCompleted = "completed";
	
	  // Returning this object from the innerFn has the same effect as
	  // breaking out of the dispatch switch statement.
	  var ContinueSentinel = {};
	
	  // Dummy constructor functions that we use as the .constructor and
	  // .constructor.prototype properties for functions that return Generator
	  // objects. For full spec compliance, you may wish to configure your
	  // minifier not to mangle the names of these two functions.
	  function Generator() {}
	  function GeneratorFunction() {}
	  function GeneratorFunctionPrototype() {}
	
	  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype;
	  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
	  GeneratorFunctionPrototype.constructor = GeneratorFunction;
	  GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction";
	
	  // Helper for defining the .next, .throw, and .return methods of the
	  // Iterator interface in terms of a single ._invoke method.
	  function defineIteratorMethods(prototype) {
	    ["next", "throw", "return"].forEach(function(method) {
	      prototype[method] = function(arg) {
	        return this._invoke(method, arg);
	      };
	    });
	  }
	
	  runtime.isGeneratorFunction = function(genFun) {
	    var ctor = typeof genFun === "function" && genFun.constructor;
	    return ctor
	      ? ctor === GeneratorFunction ||
	        // For the native GeneratorFunction constructor, the best we can
	        // do is to check its .name property.
	        (ctor.displayName || ctor.name) === "GeneratorFunction"
	      : false;
	  };
	
	  runtime.mark = function(genFun) {
	    if (Object.setPrototypeOf) {
	      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
	    } else {
	      genFun.__proto__ = GeneratorFunctionPrototype;
	      if (!(toStringTagSymbol in genFun)) {
	        genFun[toStringTagSymbol] = "GeneratorFunction";
	      }
	    }
	    genFun.prototype = Object.create(Gp);
	    return genFun;
	  };
	
	  // Within the body of any async function, `await x` is transformed to
	  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
	  // `value instanceof AwaitArgument` to determine if the yielded value is
	  // meant to be awaited. Some may consider the name of this method too
	  // cutesy, but they are curmudgeons.
	  runtime.awrap = function(arg) {
	    return new AwaitArgument(arg);
	  };
	
	  function AwaitArgument(arg) {
	    this.arg = arg;
	  }
	
	  function AsyncIterator(generator) {
	    function invoke(method, arg, resolve, reject) {
	      var record = tryCatch(generator[method], generator, arg);
	      if (record.type === "throw") {
	        reject(record.arg);
	      } else {
	        var result = record.arg;
	        var value = result.value;
	        if (value instanceof AwaitArgument) {
	          return Promise.resolve(value.arg).then(function(value) {
	            invoke("next", value, resolve, reject);
	          }, function(err) {
	            invoke("throw", err, resolve, reject);
	          });
	        }
	
	        return Promise.resolve(value).then(function(unwrapped) {
	          // When a yielded Promise is resolved, its final value becomes
	          // the .value of the Promise<{value,done}> result for the
	          // current iteration. If the Promise is rejected, however, the
	          // result for this iteration will be rejected with the same
	          // reason. Note that rejections of yielded Promises are not
	          // thrown back into the generator function, as is the case
	          // when an awaited Promise is rejected. This difference in
	          // behavior between yield and await is important, because it
	          // allows the consumer to decide what to do with the yielded
	          // rejection (swallow it and continue, manually .throw it back
	          // into the generator, abandon iteration, whatever). With
	          // await, by contrast, there is no opportunity to examine the
	          // rejection reason outside the generator function, so the
	          // only option is to throw it from the await expression, and
	          // let the generator function handle the exception.
	          result.value = unwrapped;
	          resolve(result);
	        }, reject);
	      }
	    }
	
	    if (typeof process === "object" && process.domain) {
	      invoke = process.domain.bind(invoke);
	    }
	
	    var previousPromise;
	
	    function enqueue(method, arg) {
	      function callInvokeWithMethodAndArg() {
	        return new Promise(function(resolve, reject) {
	          invoke(method, arg, resolve, reject);
	        });
	      }
	
	      return previousPromise =
	        // If enqueue has been called before, then we want to wait until
	        // all previous Promises have been resolved before calling invoke,
	        // so that results are always delivered in the correct order. If
	        // enqueue has not been called before, then it is important to
	        // call invoke immediately, without waiting on a callback to fire,
	        // so that the async generator function has the opportunity to do
	        // any necessary setup in a predictable way. This predictability
	        // is why the Promise constructor synchronously invokes its
	        // executor callback, and why async functions synchronously
	        // execute code before the first await. Since we implement simple
	        // async functions in terms of async generators, it is especially
	        // important to get this right, even though it requires care.
	        previousPromise ? previousPromise.then(
	          callInvokeWithMethodAndArg,
	          // Avoid propagating failures to Promises returned by later
	          // invocations of the iterator.
	          callInvokeWithMethodAndArg
	        ) : callInvokeWithMethodAndArg();
	    }
	
	    // Define the unified helper method that is used to implement .next,
	    // .throw, and .return (see defineIteratorMethods).
	    this._invoke = enqueue;
	  }
	
	  defineIteratorMethods(AsyncIterator.prototype);
	
	  // Note that simple async functions are implemented on top of
	  // AsyncIterator objects; they just return a Promise for the value of
	  // the final result produced by the iterator.
	  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
	    var iter = new AsyncIterator(
	      wrap(innerFn, outerFn, self, tryLocsList)
	    );
	
	    return runtime.isGeneratorFunction(outerFn)
	      ? iter // If outerFn is a generator, return the full iterator.
	      : iter.next().then(function(result) {
	          return result.done ? result.value : iter.next();
	        });
	  };
	
	  function makeInvokeMethod(innerFn, self, context) {
	    var state = GenStateSuspendedStart;
	
	    return function invoke(method, arg) {
	      if (state === GenStateExecuting) {
	        throw new Error("Generator is already running");
	      }
	
	      if (state === GenStateCompleted) {
	        if (method === "throw") {
	          throw arg;
	        }
	
	        // Be forgiving, per 25.3.3.3.3 of the spec:
	        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
	        return doneResult();
	      }
	
	      while (true) {
	        var delegate = context.delegate;
	        if (delegate) {
	          if (method === "return" ||
	              (method === "throw" && delegate.iterator[method] === undefined)) {
	            // A return or throw (when the delegate iterator has no throw
	            // method) always terminates the yield* loop.
	            context.delegate = null;
	
	            // If the delegate iterator has a return method, give it a
	            // chance to clean up.
	            var returnMethod = delegate.iterator["return"];
	            if (returnMethod) {
	              var record = tryCatch(returnMethod, delegate.iterator, arg);
	              if (record.type === "throw") {
	                // If the return method threw an exception, let that
	                // exception prevail over the original return or throw.
	                method = "throw";
	                arg = record.arg;
	                continue;
	              }
	            }
	
	            if (method === "return") {
	              // Continue with the outer return, now that the delegate
	              // iterator has been terminated.
	              continue;
	            }
	          }
	
	          var record = tryCatch(
	            delegate.iterator[method],
	            delegate.iterator,
	            arg
	          );
	
	          if (record.type === "throw") {
	            context.delegate = null;
	
	            // Like returning generator.throw(uncaught), but without the
	            // overhead of an extra function call.
	            method = "throw";
	            arg = record.arg;
	            continue;
	          }
	
	          // Delegate generator ran and handled its own exceptions so
	          // regardless of what the method was, we continue as if it is
	          // "next" with an undefined arg.
	          method = "next";
	          arg = undefined;
	
	          var info = record.arg;
	          if (info.done) {
	            context[delegate.resultName] = info.value;
	            context.next = delegate.nextLoc;
	          } else {
	            state = GenStateSuspendedYield;
	            return info;
	          }
	
	          context.delegate = null;
	        }
	
	        if (method === "next") {
	          // Setting context._sent for legacy support of Babel's
	          // function.sent implementation.
	          context.sent = context._sent = arg;
	
	        } else if (method === "throw") {
	          if (state === GenStateSuspendedStart) {
	            state = GenStateCompleted;
	            throw arg;
	          }
	
	          if (context.dispatchException(arg)) {
	            // If the dispatched exception was caught by a catch block,
	            // then let that catch block handle the exception normally.
	            method = "next";
	            arg = undefined;
	          }
	
	        } else if (method === "return") {
	          context.abrupt("return", arg);
	        }
	
	        state = GenStateExecuting;
	
	        var record = tryCatch(innerFn, self, context);
	        if (record.type === "normal") {
	          // If an exception is thrown from innerFn, we leave state ===
	          // GenStateExecuting and loop back for another invocation.
	          state = context.done
	            ? GenStateCompleted
	            : GenStateSuspendedYield;
	
	          var info = {
	            value: record.arg,
	            done: context.done
	          };
	
	          if (record.arg === ContinueSentinel) {
	            if (context.delegate && method === "next") {
	              // Deliberately forget the last sent value so that we don't
	              // accidentally pass it on to the delegate.
	              arg = undefined;
	            }
	          } else {
	            return info;
	          }
	
	        } else if (record.type === "throw") {
	          state = GenStateCompleted;
	          // Dispatch the exception by looping back around to the
	          // context.dispatchException(arg) call above.
	          method = "throw";
	          arg = record.arg;
	        }
	      }
	    };
	  }
	
	  // Define Generator.prototype.{next,throw,return} in terms of the
	  // unified ._invoke helper method.
	  defineIteratorMethods(Gp);
	
	  Gp[iteratorSymbol] = function() {
	    return this;
	  };
	
	  Gp[toStringTagSymbol] = "Generator";
	
	  Gp.toString = function() {
	    return "[object Generator]";
	  };
	
	  function pushTryEntry(locs) {
	    var entry = { tryLoc: locs[0] };
	
	    if (1 in locs) {
	      entry.catchLoc = locs[1];
	    }
	
	    if (2 in locs) {
	      entry.finallyLoc = locs[2];
	      entry.afterLoc = locs[3];
	    }
	
	    this.tryEntries.push(entry);
	  }
	
	  function resetTryEntry(entry) {
	    var record = entry.completion || {};
	    record.type = "normal";
	    delete record.arg;
	    entry.completion = record;
	  }
	
	  function Context(tryLocsList) {
	    // The root entry object (effectively a try statement without a catch
	    // or a finally block) gives us a place to store values thrown from
	    // locations where there is no enclosing try statement.
	    this.tryEntries = [{ tryLoc: "root" }];
	    tryLocsList.forEach(pushTryEntry, this);
	    this.reset(true);
	  }
	
	  runtime.keys = function(object) {
	    var keys = [];
	    for (var key in object) {
	      keys.push(key);
	    }
	    keys.reverse();
	
	    // Rather than returning an object with a next method, we keep
	    // things simple and return the next function itself.
	    return function next() {
	      while (keys.length) {
	        var key = keys.pop();
	        if (key in object) {
	          next.value = key;
	          next.done = false;
	          return next;
	        }
	      }
	
	      // To avoid creating an additional object, we just hang the .value
	      // and .done properties off the next function object itself. This
	      // also ensures that the minifier will not anonymize the function.
	      next.done = true;
	      return next;
	    };
	  };
	
	  function values(iterable) {
	    if (iterable) {
	      var iteratorMethod = iterable[iteratorSymbol];
	      if (iteratorMethod) {
	        return iteratorMethod.call(iterable);
	      }
	
	      if (typeof iterable.next === "function") {
	        return iterable;
	      }
	
	      if (!isNaN(iterable.length)) {
	        var i = -1, next = function next() {
	          while (++i < iterable.length) {
	            if (hasOwn.call(iterable, i)) {
	              next.value = iterable[i];
	              next.done = false;
	              return next;
	            }
	          }
	
	          next.value = undefined;
	          next.done = true;
	
	          return next;
	        };
	
	        return next.next = next;
	      }
	    }
	
	    // Return an iterator with no values.
	    return { next: doneResult };
	  }
	  runtime.values = values;
	
	  function doneResult() {
	    return { value: undefined, done: true };
	  }
	
	  Context.prototype = {
	    constructor: Context,
	
	    reset: function(skipTempReset) {
	      this.prev = 0;
	      this.next = 0;
	      // Resetting context._sent for legacy support of Babel's
	      // function.sent implementation.
	      this.sent = this._sent = undefined;
	      this.done = false;
	      this.delegate = null;
	
	      this.tryEntries.forEach(resetTryEntry);
	
	      if (!skipTempReset) {
	        for (var name in this) {
	          // Not sure about the optimal order of these conditions:
	          if (name.charAt(0) === "t" &&
	              hasOwn.call(this, name) &&
	              !isNaN(+name.slice(1))) {
	            this[name] = undefined;
	          }
	        }
	      }
	    },
	
	    stop: function() {
	      this.done = true;
	
	      var rootEntry = this.tryEntries[0];
	      var rootRecord = rootEntry.completion;
	      if (rootRecord.type === "throw") {
	        throw rootRecord.arg;
	      }
	
	      return this.rval;
	    },
	
	    dispatchException: function(exception) {
	      if (this.done) {
	        throw exception;
	      }
	
	      var context = this;
	      function handle(loc, caught) {
	        record.type = "throw";
	        record.arg = exception;
	        context.next = loc;
	        return !!caught;
	      }
	
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        var record = entry.completion;
	
	        if (entry.tryLoc === "root") {
	          // Exception thrown outside of any try block that could handle
	          // it, so set the completion value of the entire function to
	          // throw the exception.
	          return handle("end");
	        }
	
	        if (entry.tryLoc <= this.prev) {
	          var hasCatch = hasOwn.call(entry, "catchLoc");
	          var hasFinally = hasOwn.call(entry, "finallyLoc");
	
	          if (hasCatch && hasFinally) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            } else if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }
	
	          } else if (hasCatch) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            }
	
	          } else if (hasFinally) {
	            if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }
	
	          } else {
	            throw new Error("try statement without catch or finally");
	          }
	        }
	      }
	    },
	
	    abrupt: function(type, arg) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc <= this.prev &&
	            hasOwn.call(entry, "finallyLoc") &&
	            this.prev < entry.finallyLoc) {
	          var finallyEntry = entry;
	          break;
	        }
	      }
	
	      if (finallyEntry &&
	          (type === "break" ||
	           type === "continue") &&
	          finallyEntry.tryLoc <= arg &&
	          arg <= finallyEntry.finallyLoc) {
	        // Ignore the finally entry if control is not jumping to a
	        // location outside the try/catch block.
	        finallyEntry = null;
	      }
	
	      var record = finallyEntry ? finallyEntry.completion : {};
	      record.type = type;
	      record.arg = arg;
	
	      if (finallyEntry) {
	        this.next = finallyEntry.finallyLoc;
	      } else {
	        this.complete(record);
	      }
	
	      return ContinueSentinel;
	    },
	
	    complete: function(record, afterLoc) {
	      if (record.type === "throw") {
	        throw record.arg;
	      }
	
	      if (record.type === "break" ||
	          record.type === "continue") {
	        this.next = record.arg;
	      } else if (record.type === "return") {
	        this.rval = record.arg;
	        this.next = "end";
	      } else if (record.type === "normal" && afterLoc) {
	        this.next = afterLoc;
	      }
	    },
	
	    finish: function(finallyLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.finallyLoc === finallyLoc) {
	          this.complete(entry.completion, entry.afterLoc);
	          resetTryEntry(entry);
	          return ContinueSentinel;
	        }
	      }
	    },
	
	    "catch": function(tryLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc === tryLoc) {
	          var record = entry.completion;
	          if (record.type === "throw") {
	            var thrown = record.arg;
	            resetTryEntry(entry);
	          }
	          return thrown;
	        }
	      }
	
	      // The context.catch method must only be called with a location
	      // argument that corresponds to a known catch block.
	      throw new Error("illegal catch attempt");
	    },
	
	    delegateYield: function(iterable, resultName, nextLoc) {
	      this.delegate = {
	        iterator: values(iterable),
	        resultName: resultName,
	        nextLoc: nextLoc
	      };
	
	      return ContinueSentinel;
	    }
	  };
	})(
	  // Among the various tricks for obtaining a reference to the global
	  // object, this seems to be the most reliable technique that does not
	  // use indirect eval (which violates Content Security Policy).
	  typeof global === "object" ? global :
	  typeof window === "object" ? window :
	  typeof self === "object" ? self : this
	);
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(416)))

/***/ },
/* 416 */
/***/ function(module, exports) {

	// shim for using process in browser
	
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	(function () {
	  try {
	    cachedSetTimeout = setTimeout;
	  } catch (e) {
	    cachedSetTimeout = function () {
	      throw new Error('setTimeout is not defined');
	    }
	  }
	  try {
	    cachedClearTimeout = clearTimeout;
	  } catch (e) {
	    cachedClearTimeout = function () {
	      throw new Error('clearTimeout is not defined');
	    }
	  }
	} ())
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = cachedSetTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    cachedClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        cachedSetTimeout(drainQueue, 0);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 417 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(418);
	module.exports = __webpack_require__(130).RegExp.escape;

/***/ },
/* 418 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/benjamingr/RexExp.escape
	var $export = __webpack_require__(129)
	  , $re     = __webpack_require__(419)(/[\\^$*+?.()|[\]{}]/g, '\\$&');
	
	$export($export.S, 'RegExp', {escape: function escape(it){ return $re(it); }});


/***/ },
/* 419 */
/***/ function(module, exports) {

	module.exports = function(regExp, replace){
	  var replacer = replace === Object(replace) ? function(part){
	    return replace[part];
	  } : replace;
	  return function(it){
	    return String(it).replace(regExp, replacer);
	  };
	};

/***/ },
/* 420 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.LightBox = exports.Dropdown = exports.OffCanvas = exports.Toggleable = exports.Util = exports.Settings = exports.Widget = exports.Modal = exports.Tooltip = exports.Form = undefined;
	
	var _Form = __webpack_require__(421);
	
	var _Form2 = _interopRequireDefault(_Form);
	
	var _Tooltip = __webpack_require__(422);
	
	var _Tooltip2 = _interopRequireDefault(_Tooltip);
	
	var _Modal = __webpack_require__(429);
	
	var _Modal2 = _interopRequireDefault(_Modal);
	
	var _Widget = __webpack_require__(430);
	
	var _Widget2 = _interopRequireDefault(_Widget);
	
	var _Settings = __webpack_require__(425);
	
	var _Settings2 = _interopRequireDefault(_Settings);
	
	var _Toggleable = __webpack_require__(433);
	
	var _Toggleable2 = _interopRequireDefault(_Toggleable);
	
	var _OffCanvas = __webpack_require__(434);
	
	var _OffCanvas2 = _interopRequireDefault(_OffCanvas);
	
	var _Dropdown = __webpack_require__(435);
	
	var _Dropdown2 = _interopRequireDefault(_Dropdown);
	
	var _LightBox = __webpack_require__(436);
	
	var _LightBox2 = _interopRequireDefault(_LightBox);
	
	var _Util = __webpack_require__(423);
	
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
/* 421 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.EVENT_FORM_AJAX_COMPLETED = exports.EVENT_FORM_AFTER_AJAX_SUBMIT = exports.EVENT_FORM_SUBMIT = exports.EVENT_FORM_READY = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _Tooltip = __webpack_require__(422);
	
	var _Tooltip2 = _interopRequireDefault(_Tooltip);
	
	__webpack_require__(426);
	
	var _Event = __webpack_require__(428);
	
	var _Event2 = _interopRequireDefault(_Event);
	
	var _Util = __webpack_require__(423);
	
	var _Util2 = _interopRequireDefault(_Util);
	
	var _Settings = __webpack_require__(425);
	
	var _Settings2 = _interopRequireDefault(_Settings);
	
	var _DestroyableWidget2 = __webpack_require__(424);
	
	var _DestroyableWidget3 = _interopRequireDefault(_DestroyableWidget2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*global HTMLFormElement, fetch, FormData, clearTimeout, NodeList*/
	
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
	
	var Form = function (_DestroyableWidget) {
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
	            shouldScrollToElement: true,
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
	            return this._handleValidation(fields, focus, true).then(function (r) {
	                if (!r.foundAnyError) {
	                    // remove tooltips
	                    if (_this2.tooltips) {
	                        _this2.tooltips.removeTooltip();
	                    }
	                }
	                return r;
	            }.bind(this));
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
	            Object.keys(fields).forEach(function (id) {
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
	            }.bind(this));
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
	                var _field = fields[0];
	                var id = _field.getAttribute(ATTR_DATA_CUSTOM_LABEL) || _field.id;
	                if (id) {
	                    var linkedFields = Array.from(this.getForm().querySelectorAll('[' + ATTR_DATA_CUSTOM_LABEL + '="' + id + '"], #' + id));
	                    linkedFields.forEach(function (thisField) {
	                        var validity = thisField.validity,
	                            isInvalid = validity && !validity.valid && this._isElementInvalidElement(thisField);
	                        handleAdditionalLabels(isInvalid, labelGroups, thisField);
	                    }.bind(this));
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
	            if (this.options.shouldScrollToElement) {
	                _Util2.default.scrollToElement(el, this.options.scrollToElementDiff);
	            }
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
	}(_DestroyableWidget3.default);
	
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
/* 422 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _Util = __webpack_require__(423);
	
	var _Util2 = _interopRequireDefault(_Util);
	
	var _DestroyableWidget2 = __webpack_require__(424);
	
	var _DestroyableWidget3 = _interopRequireDefault(_DestroyableWidget2);
	
	var _Settings = __webpack_require__(425);
	
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
	
	var Tooltip = function (_DestroyableWidget) {
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
	}(_DestroyableWidget3.default);
	
	exports.default = Tooltip;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 423 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
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
	
	var Util = function () {
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
	            var t = void 0;
	            var el = document.createElement('fake');
	
	            var transitions = {
	                transition: 'transitionend',
	                OTransition: 'oTransitionEnd',
	                MozTransition: 'transitionend',
	                WebkitTransition: 'webkitTransitionEnd'
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
	         * Finds the closest element including itself matching a callback
	         * @param {Node} el
	         * @param {Function} callback
	         * @returns {Node|boolean}
	         */
	
	    }, {
	        key: "closestCallback",
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
	
	            return s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + (s4() + s4() + s4());
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
	         * @param {boolean} [centerHorizontal] set true to center element, otherwise it's put on the right border by default
	         * @param {boolean} [positionTop] flip top, by default element is positioned to the bottom.
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
	
	            var calcTop = void 0;
	            var calcLeft = void 0;
	            if (isCollisionLeft && !isCollisionRight) {
	                // put element to left if collision with left
	                calcLeft = targetPosition.left - colRect.left - amountLeft + "px";
	                classList.add(COL_LEFT_CLASS);
	            } else {
	                // maybe center if no collision with either side
	                var rightPosition = targetRight - elementRect.width - colRect.left - amountLeft + "px";
	                var leftCentered = (targetLeft + targetPosition.width / 2 - elementRect.width / 2 || 0) - colRect.left;
	                var collisionCentered = leftCentered + elementRect.width > colRect.width;
	                if (centerHorizontal && !collisionCentered) {
	                    calcLeft = leftCentered + "px";
	                } else {
	                    classList.add(COL_RIGHT_CLASS);
	                    calcLeft = rightPosition;
	                }
	            }
	
	            if (isCollisionBottom || positionTop && !isCollisionTop) {
	                // Put Element on top if collision
	                calcTop = targetTop - elementRect.height - colRect.top + "px";
	                classList.add(COL_BOTTOM_CLASS);
	            } else {
	                calcTop = targetTop + targetPosition.height - colRect.top + "px";
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
	                    var scrolledY = window.pageYOffset;
	                    if (scrolledY) {
	                        window.scroll(0, scrolledY - thisOffset);
	                    }
	                }
	            }
	        }
	    }]);
	
	    return Util;
	}();
	
	exports.default = Util;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 424 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
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
	
	/**
	 * Provides a Basic Widget
	 */
	
	var DestroyableWidget = function () {
	    function DestroyableWidget() {
	        _classCallCheck(this, DestroyableWidget);
	
	        this.listeners = [];
	    }
	
	    /**
	     * Destroys a Widget
	     */
	
	
	    _createClass(DestroyableWidget, [{
	        key: "destroy",
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
	        key: "addEventListener",
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
	}();
	
	exports.default = DestroyableWidget;

/***/ },
/* 425 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*
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
	
	
	var _Util = __webpack_require__(423);
	
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
	            // breakpoint when touchmove should be available
	            touchMoveBreakpointOffCanvas: 768,
	            // nodes that should be updated when no scrollbar is expected
	            scrollbarUpdateNodes: global.document.body !== null ? [global.document.body] : [],
	            // additional Delay until darkener is fully hidden
	            darkenerFadeDelay: 100,
	            // class that is added if canvas has been toggled
	            canvasToggledClass: 'toggled-canvas'
	        };
	
	        global.FLEXCSS_CONST_IS_IOS = null;
	
	        global.FLEXCSS_CONST_IS_TOUCH = null;
	
	        global.FLEXCSS_CONST_IS_SAFARI = null;
	
	        global.FLEXCSS_CONST_IS_IE = null;
	
	        global.FLEXCSS_CONST_TAB_EVENT = 'click';
	
	        global.FLEXCSS_IS_SMALL_SCREEN = false;
	
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
	
	var Settings = function () {
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
	         * Detects a safari browser
	         * @returns {boolean}
	         */
	
	    }, {
	        key: 'isSafari',
	        value: function isSafari() {
	            if (!global.FLEXCSS_CONST_IS_SAFARI) {
	                global.FLEXCSS_CONST_IS_SAFARI = !!/^((?!chrome|android).)*safari/i.test(global.navigator.userAgent);
	            }
	            return global.FLEXCSS_CONST_IS_SAFARI;
	        }
	
	        /**
	         * @returns {boolean}
	         */
	
	    }, {
	        key: 'isSmallScreen',
	        value: function isSmallScreen() {
	            return window.innerWidth < Settings.get().smallBreakpoint;
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
	}();
	
	exports.default = Settings;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 426 */
/***/ function(module, exports, __webpack_require__) {

	// the whatwg-fetch polyfill installs the fetch() function
	// on the global object (window or self)
	//
	// Return that as the export for use in Webpack, Browserify etc.
	__webpack_require__(427);
	module.exports = self.fetch.bind(self);


/***/ },
/* 427 */
/***/ function(module, exports) {

	(function(self) {
	  'use strict';
	
	  if (self.fetch) {
	    return
	  }
	
	  var support = {
	    searchParams: 'URLSearchParams' in self,
	    iterable: 'Symbol' in self && 'iterator' in Symbol,
	    blob: 'FileReader' in self && 'Blob' in self && (function() {
	      try {
	        new Blob()
	        return true
	      } catch(e) {
	        return false
	      }
	    })(),
	    formData: 'FormData' in self,
	    arrayBuffer: 'ArrayBuffer' in self
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
	
	  // Build a destructive iterator for the value list
	  function iteratorFor(items) {
	    var iterator = {
	      next: function() {
	        var value = items.shift()
	        return {done: value === undefined, value: value}
	      }
	    }
	
	    if (support.iterable) {
	      iterator[Symbol.iterator] = function() {
	        return iterator
	      }
	    }
	
	    return iterator
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
	
	  Headers.prototype.keys = function() {
	    var items = []
	    this.forEach(function(value, name) { items.push(name) })
	    return iteratorFor(items)
	  }
	
	  Headers.prototype.values = function() {
	    var items = []
	    this.forEach(function(value) { items.push(value) })
	    return iteratorFor(items)
	  }
	
	  Headers.prototype.entries = function() {
	    var items = []
	    this.forEach(function(value, name) { items.push([name, value]) })
	    return iteratorFor(items)
	  }
	
	  if (support.iterable) {
	    Headers.prototype[Symbol.iterator] = Headers.prototype.entries
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
	      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
	        this._bodyText = body.toString()
	      } else if (!body) {
	        this._bodyText = ''
	      } else if (support.arrayBuffer && ArrayBuffer.prototype.isPrototypeOf(body)) {
	        // Only support ArrayBuffers for POST method.
	        // Receiving ArrayBuffers happens via Blobs, instead.
	      } else {
	        throw new Error('unsupported BodyInit type')
	      }
	
	      if (!this.headers.get('content-type')) {
	        if (typeof body === 'string') {
	          this.headers.set('content-type', 'text/plain;charset=UTF-8')
	        } else if (this._bodyBlob && this._bodyBlob.type) {
	          this.headers.set('content-type', this._bodyBlob.type)
	        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
	          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
	        }
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
	    var pairs = (xhr.getAllResponseHeaders() || '').trim().split('\n')
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
	
	    this.type = 'default'
	    this.status = options.status
	    this.ok = this.status >= 200 && this.status < 300
	    this.statusText = options.statusText
	    this.headers = options.headers instanceof Headers ? options.headers : new Headers(options.headers)
	    this.url = options.url || ''
	    this._initBody(bodyInit)
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
	
	  self.Headers = Headers
	  self.Request = Request
	  self.Response = Response
	
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
	
	        return
	      }
	
	      xhr.onload = function() {
	        var options = {
	          status: xhr.status,
	          statusText: xhr.statusText,
	          headers: headers(xhr),
	          url: responseURL()
	        }
	        var body = 'response' in xhr ? xhr.response : xhr.responseText
	        resolve(new Response(body, options))
	      }
	
	      xhr.onerror = function() {
	        reject(new TypeError('Network request failed'))
	      }
	
	      xhr.ontimeout = function() {
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
	})(typeof self !== 'undefined' ? self : this);


/***/ },
/* 428 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
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
	            var thisParams = params || {
	                bubbles: false,
	                cancelable: false,
	                detail: undefined
	            };
	            var evt = document.createEvent("CustomEvent");
	            evt.initCustomEvent(event, thisParams.bubbles, thisParams.cancelable, thisParams.detail);
	            evt.superPreventDefault = evt.preventDefault;
	            evt.preventDefault = function () {
	                // Due a bug in IE11, we need to set defaultPrevented manually
	                Object.defineProperty(evt, "defaultPrevented", {
	                    get: function get() {
	                        return true;
	                    }
	                });
	                evt.superPreventDefault();
	            };
	            return evt;
	        };
	        _CustomEvent.prototype = global.Event.prototype;
	        global.CustomEvent = _CustomEvent;
	    }
	})();
	/**
	 * Simpler Event dispatching
	 */
	
	var EventHandler = function () {
	
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
	}();
	
	var Event = function () {
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
	}();
	
	exports.default = Event;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 429 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.EVENT_MODAL_ASYNC_TARGET_LOADED = exports.EVENT_MODAL_INIT = exports.EVENT_MODAL_OPENED = exports.EVENT_MODAL_BEFORE_CLOSED = exports.EVENT_MODAL_CLOSED = undefined;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*
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
	
	/* global KeyboardEvent */
	
	var _Settings = __webpack_require__(425);
	
	var _Settings2 = _interopRequireDefault(_Settings);
	
	var _Event = __webpack_require__(428);
	
	var _Event2 = _interopRequireDefault(_Event);
	
	var _Util = __webpack_require__(423);
	
	var _Util2 = _interopRequireDefault(_Util);
	
	var _Widget = __webpack_require__(430);
	
	var _Widget2 = _interopRequireDefault(_Widget);
	
	var _FixedWindow = __webpack_require__(431);
	
	var _FixedWindow2 = _interopRequireDefault(_FixedWindow);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
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
	var CLS_MODAL_CONTAINER = 'modal-container';
	var CLS_ANIM_END = 'modal-anim-end';
	var CLS_LOADER_CONTAINER = 'loader-container';
	var CLS_LOADER = 'loader';
	var CLS_BACKDROP = 'backdrop';
	
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
	
	var Modal = function () {
	    function Modal(DelegateContainer, options) {
	        _classCallCheck(this, Modal);
	
	        var doc = global.document;
	        var container = DelegateContainer instanceof HTMLElement ? DelegateContainer : doc.getElementById(DelegateContainer);
	
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
	            var t = Modal._modalInstances.indexOf(n);
	            if (t > -1) {
	                Modal._modalInstances.splice(t, 1);
	                _FixedWindow2.default.getInstance().close();
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
	                var lastContainer = Modal._modalInstances[Modal._modalInstances.length - 1];
	                var classList = self.modalContainer.classList;
	                classList.remove(CLS_CONTAINER_CURRENT);
	                classList.remove(CLS_BACKDROP);
	                classList.remove(CLS_OPEN);
	                // Remove all current classes from child-nodes
	                for (var i = 0; i < self.modalContainer.childNodes.length; i++) {
	                    var node = self.modalContainer.childNodes[i];
	                    var cl = node.classList;
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
	            _FixedWindow2.default.getInstance().open(this, this.modalContainer);
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
	                var n = this.modalContainer.childNodes[i];
	                var isCurrent = n.classList.contains(CLS_CURRENT);
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
	
	        /**
	         * Creates a Modal and opens it (later)
	         * @param e
	         * @returns {Promise|boolean}
	         */
	
	    }, {
	        key: 'createWidget',
	        value: function createWidget(e) {
	            var _this = this;
	
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
	            var targetContent = void 0;
	            var future = void 0;
	            var widget = void 0;
	            var target = void 0;
	            var hasTarget = true;
	            var isHtmlElement = e instanceof HTMLElement;
	            var isWidget = _Widget2.default.isWidget(e);
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
	                    throw new Error('Could not find target, did you pass an event, a HTMLElement or an Widget?');
	                }
	                hasTarget = target.hasAttribute(ATTR_NAME);
	                targetContent = target.getAttribute(ATTR_NAME);
	                widget = _Widget2.default.findWidget(target);
	                if (target.hasAttribute(ATTR_CREATE_NEW) && !e.newInstance) {
	                    var _ret = function () {
	                        var newInstance = new Modal(_this.container).setDestroyOnFinish(true);
	                        e.newInstance = true;
	                        newInstance.fromEvent(e).then(function () {
	                            newInstance.registerEvents(newInstance.getModalContainer());
	                        });
	                        return {
	                            v: false
	                        };
	                    }();
	
	                    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
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
	                    if (_this.loading) {
	                        return false;
	                    }
	                    if (_Util2.default.isPartOfNode(ce.target, _this.currentOpen)) {
	                        if (!ce.target.hasAttribute(ATTR_CLOSE)) {
	                            return false;
	                        }
	                    }
	                    _this.close(ce);
	                };
	
	                this.modalContainer.addEventListener(_Settings2.default.getTabEvent(), closeModalFunction, false);
	
	                modalContainerClasses = this.modalContainer.classList;
	                this.container.appendChild(this.modalContainer);
	            } else {
	                modalContainerClasses.add(CLS_OPEN);
	            }
	
	            var loader = void 0;
	            var doc = global.document;
	            var toggleLoader = function toggleLoader(show) {
	                if (show) {
	                    loader = doc.createElement('div');
	                    loader.className = CLS_LOADER_CONTAINER;
	                    var loaderLoader = doc.createElement('div');
	                    loaderLoader.className = CLS_LOADER;
	                    loader.appendChild(loaderLoader);
	                    _this.modalContainer.appendChild(loader);
	                } else {
	                    loader.parentNode.removeChild(loader);
	                }
	            };
	            modalContainerClasses.add('loading');
	            modalContainerClasses.add(CLS_CONTAINER_CURRENT);
	
	            requestAnimationFrame(function () {
	                requestAnimationFrame(function () {
	                    modalContainerClasses.add(CLS_BACKDROP);
	                });
	            });
	
	            this.loading = true;
	            toggleLoader(true);
	            var async = widget ? widget.getAsync() : null;
	            if (_Widget2.default.isWidget(widget) && async) {
	                future = async.then(function (r) {
	                    var result = void 0;
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
	                (function () {
	                    var el = targetContent instanceof HTMLElement || targetContent instanceof DocumentFragment ? targetContent : doc.getElementById(targetContent);
	                    if (el) {
	                        future = new Promise(function (resolve) {
	                            resolve(el);
	                        });
	                    } else {
	                        throw new Error('Could not found given modal element (content) with ID: ' + targetContent);
	                    }
	                })();
	            }
	
	            _Event2.default.dispatchAndFire(target, EVENT_MODAL_INIT);
	
	            return future.then(function (thisEl) {
	                thisEl.hfWidgetInstance = _this;
	                _this.modalContainer.appendChild(thisEl);
	                modalContainerClasses.remove('loading');
	                _this.loading = false;
	                toggleLoader(false);
	                _this.open(thisEl, true, e);
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
	            }
	            this.switchModals(modal, this.currentOpen);
	
	            _Event2.default.dispatch(modal, EVENT_MODAL_OPENED).withOriginal(maybeEvent).fire();
	        }
	    }, {
	        key: 'registerEvents',
	        value: function registerEvents(delegate) {
	            var _this2 = this;
	
	            var delegateContainer = delegate || this.container;
	            // Modals should always be fixed
	            _FixedWindow2.default.getInstance().addScreenConstraint(Modal, function () {
	                return true;
	            });
	            // register modal instance so we can detect multiple registrars
	            delegateContainer.flexModalInstance = this;
	            this.eventFunction = function () {
	                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	                    args[_key] = arguments[_key];
	                }
	
	                _this2.createWidget.apply(_this2, args);
	            };
	            delegateContainer.addEventListener(_Settings2.default.getTabEvent(), this.eventFunction, false);
	
	            this.eventContainer = delegateContainer;
	            return this;
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
	            var modalContainer = this.modalContainer;
	            var isEmptyContainer = modalContainer.childNodes.length === 0;
	            // Remove event listener on destroy, do not remove DOM node
	            if (this.eventContainer) {
	                this.eventContainer.removeEventListener(_Settings2.default.getTabEvent(), this.eventFunction, true);
	            }
	
	            if (isEmptyContainer) {
	                if (modalContainer.parentNode) {
	                    modalContainer.parentNode.removeChild(modalContainer);
	                }
	            }
	            if (global.MutationObserver) {
	                (function () {
	                    var observer = new MutationObserver(function (mutations) {
	                        mutations.forEach(function () {
	                            if (modalContainer.childNodes.length === 0) {
	                                modalContainer.parentNode.removeChild(modalContainer);
	                                observer.disconnect();
	                            }
	                        });
	                    });
	                    observer.observe(modalContainer, {
	                        childList: true
	                    });
	                })();
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
	}();
	
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
/* 430 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
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
	
	var Widget = function () {
	
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
	}();
	
	exports.default = Widget;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 431 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.ALLOW_ELEMENT_OVERFLOW_TOUCH = exports.EVENT_AFTER_FIXED_REMOVE = exports.EVENT_BEFORE_FIXED_ADD = undefined;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Settings = __webpack_require__(425);
	
	var _Settings2 = _interopRequireDefault(_Settings);
	
	var _debounce = __webpack_require__(432);
	
	var _debounce2 = _interopRequireDefault(_debounce);
	
	var _Event = __webpack_require__(428);
	
	var _Event2 = _interopRequireDefault(_Event);
	
	var _Util = __webpack_require__(423);
	
	var _Util2 = _interopRequireDefault(_Util);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var CLS_FIXED_WINDOW = 'fixed-window-open';
	
	var EVENT_BEFORE_FIXED_ADD = exports.EVENT_BEFORE_FIXED_ADD = 'flexcss.fixedWindow.beforeAdd';
	var EVENT_AFTER_FIXED_REMOVE = exports.EVENT_AFTER_FIXED_REMOVE = 'flexcss.fixedWindow.afterRemove';
	
	/**
	 * @type {string}
	 */
	var ALLOW_ELEMENT_OVERFLOW_TOUCH = exports.ALLOW_ELEMENT_OVERFLOW_TOUCH = 'data-overflow';
	
	/**
	 * @type {FixedWindow}
	 */
	var fixedWindowInstance = void 0;
	
	var FixedWindow = function () {
	    function FixedWindow() {
	        _classCallCheck(this, FixedWindow);
	
	        this.widgets = [];
	        this.currentScrollTop = 0;
	        this.fixedScreenConstraints = [];
	        this.windowWidth = 0;
	        this.isFixedWindowActive = false;
	        this.touchListener = null;
	    }
	
	    /**
	     * Adds a constraint to detect if the window needs to be changed when the screensize changes
	     *
	     * @param {Function} widget
	     * @param {Function} fixedBreakpointFn gets a width argument, return true to open a window
	     */
	
	
	    _createClass(FixedWindow, [{
	        key: 'addScreenConstraint',
	        value: function addScreenConstraint(widget, fixedBreakpointFn) {
	            this.fixedScreenConstraints[widget] = fixedBreakpointFn;
	        }
	
	        /**
	         * @returns {null|DestroyableWidget}
	         */
	
	    }, {
	        key: 'getCurrentWidget',
	        value: function getCurrentWidget() {
	            return this.widgets.length > 0 ? this.widgets[this.widgets.length - 1] : null;
	        }
	    }, {
	        key: 'getLastFixedWidget',
	        value: function getLastFixedWidget() {
	            var length = this.widgets.length;
	            var widget = null;
	            while (length > 0) {
	                var thisWidget = this.widgets[length - 1];
	                if (thisWidget.fixed) {
	                    widget = thisWidget;
	                    break;
	                }
	                length--;
	            }
	            return widget;
	        }
	
	        /**
	         * @private
	         */
	
	    }, {
	        key: '_checkFixedNeeded',
	        value: function _checkFixedNeeded() {
	            var _this = this;
	
	            if (this.widgets.length === 0) {
	                return;
	            }
	            var widgets = new Set(this.widgets);
	            var widgetsThatRequireFixedWindow = Array.from(widgets).some(function (el) {
	                var widget = el.widget;
	
	                var isFixed = _this.fixedScreenConstraints[widget] && _this.fixedScreenConstraints[widget](_this.windowWidth, _this.getCurrentWidget());
	                var index = _this.widgets.indexOf(el);
	                _this.widgets[index] = Object.assign(el, { fixed: isFixed });
	                return isFixed;
	            });
	            if (!widgetsThatRequireFixedWindow) {
	                this._removeFixedContainer();
	            } else {
	                this._addFixedContainer();
	            }
	        }
	
	        /**
	         * @private
	         */
	
	    }, {
	        key: '_addFixedContainer',
	        value: function _addFixedContainer() {
	            var _this2 = this;
	
	            if (this.isFixedWindowActive) {
	                return;
	            }
	            _Event2.default.dispatchAndFire(global.document, EVENT_BEFORE_FIXED_ADD, {
	                detail: this.getCurrentWidget()
	            });
	            // this causes layout and should be optimized
	            // At lest we write in a batch later
	            _Settings2.default.get().scrollbarUpdateNodes.map(function (n) {
	                var foundProperty = 'paddingRight';
	                var direction = 1;
	                var node = n;
	                if (n instanceof Array) {
	                    var _n = _slicedToArray(n, 3);
	
	                    var whatNode = _n[0];
	                    var property = _n[1];
	                    var d = _n[2];
	
	                    foundProperty = property;
	                    node = whatNode;
	                    direction = d || 1;
	                }
	                return {
	                    node: node,
	                    property: foundProperty,
	                    value: parseInt(global.getComputedStyle(node)[foundProperty], 10) + (!node.__fixedWindowMod__ ? _Settings2.default.getScrollbarWidth() * direction : 0) + 'px'
	                };
	            }).forEach(function (d) {
	                d.node.__fixedWindowMod__ = true;
	                d.node.style[d.property] = d.value;
	            });
	
	            this.touchListener = function (e) {
	                e.preventDefault();
	            };
	
	            var shouldNotMoveUp = false;
	            var shouldNotMoveDown = false;
	            var neverScroll = false;
	            var lastClientY = 0;
	            this.touchStartListener = function (e) {
	                var _getLastFixedWidget = _this2.getLastFixedWidget();
	
	                var element = _getLastFixedWidget.element;
	
	                var closestOverflow = _Util2.default.closestCallback(e.target, function (el) {
	                    return el instanceof HTMLTextAreaElement || el.hasAttribute && el.hasAttribute(ALLOW_ELEMENT_OVERFLOW_TOUCH);
	                });
	                if (closestOverflow && closestOverflow.scrollHeight !== closestOverflow.offsetHeight) {
	                    element = closestOverflow;
	                }
	                if (_Util2.default.isPartOfNode(e.target, element)) {
	                    neverScroll = element.scrollHeight === element.offsetHeight;
	                    lastClientY = e.touches[0].clientY;
	                    // never allow scrolling when there is nothing to scroll
	                    if (neverScroll) {
	                        return false;
	                    }
	                    if (element.scrollTop === 0) {
	                        shouldNotMoveUp = true;
	                    } else if (element.scrollHeight === element.scrollTop + element.offsetHeight) {
	                        shouldNotMoveDown = true;
	                    }
	                }
	            };
	
	            global.addEventListener('touchmove', this.touchListener);
	            global.document.body.addEventListener('touchstart', this.touchStartListener);
	
	            this.touchMoveListener = function (e) {
	                var _getLastFixedWidget2 = _this2.getLastFixedWidget();
	
	                var element = _getLastFixedWidget2.element;
	
	                if (_Util2.default.isPartOfNode(e.target, element)) {
	                    var clientY = e.touches[0].clientY;
	
	                    var isScrollingDown = lastClientY - clientY > 0;
	                    lastClientY = clientY;
	                    if (neverScroll) {
	                        return false;
	                    }
	                    if (!shouldNotMoveDown && isScrollingDown || shouldNotMoveDown && !isScrollingDown || !shouldNotMoveDown && !shouldNotMoveUp && !isScrollingDown || shouldNotMoveDown && shouldNotMoveUp && isScrollingDown) {
	                        e.stopImmediatePropagation();
	                    }
	                }
	            };
	
	            this.touchEndListener = function () {
	                neverScroll = false;
	                shouldNotMoveUp = false;
	                shouldNotMoveDown = false;
	                lastClientY = 0;
	            };
	
	            global.document.body.addEventListener('touchmove', this.touchMoveListener);
	            global.document.body.addEventListener('touchend', this.touchEndListener);
	            global.document.documentElement.classList.add(CLS_FIXED_WINDOW);
	            this.isFixedWindowActive = true;
	        }
	
	        /**
	         * @private
	         */
	
	    }, {
	        key: '_removeFixedContainer',
	        value: function _removeFixedContainer() {
	            if (this.isFixedWindowActive) {
	                // cleanup event listeners
	                global.removeEventListener('touchmove', this.touchListener);
	                global.document.body.removeEventListener('touchstart', this.touchStartListener);
	                global.document.body.removeEventListener('touchmove', this.touchMoveListener);
	                global.document.body.removeEventListener('touchend', this.touchEndListener);
	
	                // reset scrollbar nodes
	                _Settings2.default.get().scrollbarUpdateNodes.forEach(function (node) {
	                    if (node instanceof Array) {
	                        var _node = _slicedToArray(node, 2);
	
	                        var whatNode = _node[0];
	                        var property = _node[1];
	
	                        delete whatNode.__fixedWindowMod__;
	                        whatNode.style[property] = '';
	                    } else {
	                        delete node.__fixedWindowMod__;
	                        node.style.paddingRight = '';
	                    }
	                });
	                global.document.documentElement.classList.remove(CLS_FIXED_WINDOW);
	                _Event2.default.dispatchAndFire(global.document, EVENT_AFTER_FIXED_REMOVE);
	                this.isFixedWindowActive = false;
	            }
	        }
	
	        /**
	         * Will close a window when no widgets are opened that need one
	         */
	
	    }, {
	        key: 'resizeListener',
	        value: function resizeListener() {
	            this.windowWidth = global.innerWidth;
	            this._checkFixedNeeded();
	        }
	
	        /**
	         * @returns {FixedWindow}
	         */
	
	    }, {
	        key: 'close',
	
	
	        /**
	         * Request a close of the fixed window
	         */
	        value: function close() {
	            this.widgets.pop();
	            this._checkFixedNeeded();
	            if (this.widgets.length === 0) {
	                this._removeFixedContainer();
	            }
	        }
	
	        /**
	         * Request to open a fixed windows
	         * @param {Object|DestroyableWidget} instance
	         * @param {HTMLElement} element
	         */
	
	    }, {
	        key: 'open',
	        value: function open(instance, element) {
	            var fixed = false;
	            if ((typeof instance === 'undefined' ? 'undefined' : _typeof(instance)) === 'object') {
	                var widget = instance.constructor;
	                var fixedWidget = this.fixedScreenConstraints[instance.constructor];
	                if (widget && fixedWidget) {
	                    fixed = fixedWidget(this.windowWidth, instance);
	                }
	                this.widgets.push({
	                    widget: widget,
	                    element: element,
	                    fixed: fixed
	                });
	                // open a new window if there is no window active
	                if (!this.isFixedWindowActive && fixed) {
	                    this._addFixedContainer();
	                }
	            }
	        }
	    }], [{
	        key: 'getInstance',
	        value: function getInstance() {
	            if (!fixedWindowInstance) {
	                fixedWindowInstance = new FixedWindow();
	                fixedWindowInstance.windowWidth = global.innerWidth;
	                var eventHandler = fixedWindowInstance.resizeListener.bind(fixedWindowInstance);
	                global.addEventListener('resize', (0, _debounce2.default)(eventHandler, 500));
	                global.addEventListener('orientationchange', eventHandler);
	            }
	            return fixedWindowInstance;
	        }
	    }]);
	
	    return FixedWindow;
	}();
	
	exports.default = FixedWindow;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 432 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (fn, ms) {
	  return function () {
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    clearTimeout(fn.timeout);
	    fn.timeout = setTimeout(fn.bind.apply(fn, [undefined].concat(args)), ms);
	    return fn.timeout;
	  };
	};

/***/ },
/* 433 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.EVENT_TAB_OPENED = exports.EVENT_TAB_CLOSED = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*
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
	
	var _Settings = __webpack_require__(425);
	
	var _Settings2 = _interopRequireDefault(_Settings);
	
	var _Widget = __webpack_require__(430);
	
	var _Widget2 = _interopRequireDefault(_Widget);
	
	var _Util = __webpack_require__(423);
	
	var _Util2 = _interopRequireDefault(_Util);
	
	var _Event = __webpack_require__(428);
	
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
	
	var Toggleable = function () {
	    function Toggleable(ContainerId) {
	        _classCallCheck(this, Toggleable);
	
	        var doc = global.document;
	
	        this.container = ContainerId instanceof HTMLElement ? ContainerId : doc.getElementById(ContainerId);
	
	        this.loading = false;
	
	        if (!this.container) {
	            throw new Error('Toggleable container with id ' + ContainerId + ' not found');
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
	            var target = e.target;
	            var parent = target.parentNode;
	            var doc = global.document;
	
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
	
	            var refId = target.getAttribute(ATTR_NAME);
	            var ref = doc.getElementById(refId);
	
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
	         * @param {HTMLElement|Node} ref
	         * @param {HTMLElement|Node} [selfTarget] optional target node
	         */
	
	    }, {
	        key: 'toggleTarget',
	        value: function toggleTarget(ref, selfTarget) {
	            var _this = this;
	
	            var target = selfTarget;
	            if (!target && !ref) {
	                return;
	            }
	            if (!target) {
	                target = document.querySelector('[' + ATTR_NAME + '="' + ref.id + '"]');
	            }
	
	            var future = void 0;
	            var elClassList = target.classList;
	            var parent = target.parentNode;
	            var doc = global.document;
	
	            future = new Promise(function (resolve, failure) {
	                if (ref) {
	                    resolve(ref);
	                } else {
	                    var widget = _Widget2.default.findWidget(target);
	                    var async = widget ? widget.getAsync() : null;
	                    if (_Widget2.default.isWidget(widget) && async) {
	                        future = async.then(function (r) {
	                            if (r instanceof HTMLElement) {
	                                var id = _Util2.default.guid();
	                                r.id = id;
	                                target.setAttribute(ATTR_NAME, id);
	                                resolve(r);
	                            } else {
	                                throw new Error('Dynamically creating toggle-content is not supported right now.\n                            Return an HTMLElement instance');
	                            }
	                        });
	                    } else {
	                        failure('Target not given');
	                    }
	                }
	            });
	
	            if (parent) {
	                var maybeToggleNode = _Util2.default.parentsUntil(target, function (node) {
	                    return node && node.hasAttribute && node.hasAttribute(ATTR_TOGGLE_LIST);
	                });
	
	                var parentClassList = parent.classList;
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
	                        var n = maybeToggleNode.children[i];
	                        var targetRef = n.children[0];
	                        if (n !== parent) {
	                            n.classList.remove(ACTIVE_CLASS);
	                            if (targetRef) {
	                                var attr = targetRef.getAttribute(ATTR_NAME);
	                                var el = attr ? doc.getElementById(attr) : null;
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
	            future.then(function (r) {
	                _Event2.default.dispatchAndFire(r, EVENT_TAB_OPENED);
	                Toggleable._handleLoaded(target);
	                r.classList.toggle(ACTIVE_CLASS);
	                _this.loading = false;
	            }).catch(function () {
	                _this.loading = false;
	                Toggleable._handleLoaded(target);
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
	}();
	
	exports.default = Toggleable;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 434 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.EVENT_TOGGLE = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*
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
	
	var _Settings = __webpack_require__(425);
	
	var _Settings2 = _interopRequireDefault(_Settings);
	
	var _Util = __webpack_require__(423);
	
	var _Util2 = _interopRequireDefault(_Util);
	
	var _Event = __webpack_require__(428);
	
	var _Event2 = _interopRequireDefault(_Event);
	
	var _FixedWindow = __webpack_require__(431);
	
	var _FixedWindow2 = _interopRequireDefault(_FixedWindow);
	
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
	 * @type {string}
	 */
	var EVENT_TOGGLE = exports.EVENT_TOGGLE = 'flexcss.offcanvas.toggle';
	
	/**
	 * A OffCanvas Implementation
	 */
	
	var OffCanvas = function () {
	
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
	        var touchedX = 0;
	        var navigationContainer = NavigationId instanceof HTMLElement ? NavigationId : doc.getElementById(NavigationId);
	        var darkener = Darkener instanceof HTMLElement ? Darkener : doc.getElementById(Darkener);
	        var DARKENER_CLASS_TOGGLE = 'toggle-' + darkener.id || 'darkener';
	        var DARKENER_CLASS_INSTANT_TOGGLE = DARKENER_CLASS_TOGGLE + '-open';
	
	        var shouldNotTouch = function shouldNotTouch() {
	            return window.innerWidth >= _Settings2.default.get().touchMoveBreakpointOffCanvas;
	        };
	
	        if (!darkener || !navigationContainer) {
	            throw new Error('Could not find needed elements (Darkener and/or NavigationId)');
	        }
	
	        this.darkener = darkener;
	        this.darkenerClassToggle = DARKENER_CLASS_TOGGLE;
	        this.darkenerClassToggleInstant = DARKENER_CLASS_INSTANT_TOGGLE;
	        this.globalToggleClass = _Settings2.default.get().canvasToggledClass;
	
	        this.navigationContainer = navigationContainer;
	        this.navigationContainerId = navigationContainer.id;
	
	        // create id if id does not exist
	        if (!this.navigationContainerId) {
	            this.navigationContainerId = _Util2.default.guid();
	            navigationContainer.id = this.navigationContainerId;
	        }
	
	        if (!disableTouch) {
	            navigationContainer.addEventListener('touchstart', function (e) {
	                if (shouldNotTouch()) {
	                    return;
	                }
	                touchedX = e.touches[0].clientX;
	                navigationContainer.mustHide = false;
	            });
	            navigationContainer.addEventListener('touchmove', function (e) {
	                if (shouldNotTouch()) {
	                    return;
	                }
	                var clientX = e.touches[0].clientX;
	
	                var target = navigationContainer;
	                var style = target.style;
	                var calcX = touchedX - clientX;
	                var bounds = target.getBoundingClientRect();
	                var compare = factor > 0 ? calcX <= 0 : calcX >= 0;
	                if (compare) {
	                    style.transition = 'transform 0s ease';
	                    style.webkitTransition = '-webkit-transform 0s ease';
	                    target.mustHide = factor > 0 ? calcX * -1 > bounds.width / HIDE_FACTOR : calcX > bounds.width / HIDE_FACTOR;
	                    var transform = 'translate3d(' + calcX * -1 + 'px,0,0)';
	                    style.transform = transform;
	                    style.webkitTransform = transform;
	                }
	            });
	            navigationContainer.addEventListener('touchend', function () {
	                if (shouldNotTouch()) {
	                    return;
	                }
	                var target = navigationContainer;
	                var style = target.style;
	                if (target.mustHide) {
	                    var width = target.getBoundingClientRect().width * factor;
	                    style.transition = 'transform .2s ease';
	                    style.webkitTransition = '-webkit-transform .2s ease';
	                    var transform = 'translate3d(' + width + 'px,0,0)';
	                    style.transform = transform;
	                    style.webkitTransform = transform;
	                    _this._remove().then(function () {
	                        _this.resetTransform(style);
	                    });
	                    _this._removeInstant();
	                } else {
	                    _this.resetTransform(style);
	                }
	            });
	        }
	    }
	
	    /**
	     * @param {Object} s
	     */
	
	
	    _createClass(OffCanvas, [{
	        key: 'resetTransform',
	        value: function resetTransform(s) {
	            s.transform = '';
	            s.transition = '';
	            s.webkitTransform = '';
	            s.webkitTransition = '';
	        }
	
	        /**
	         * @param {Object} [event]
	         * @private
	         */
	
	    }, {
	        key: '_remove',
	        value: function _remove(event) {
	            var _this2 = this;
	
	            return new Promise(function (resolve) {
	                _Util2.default.addEventOnce(_Settings2.default.getTransitionEvent(), _this2.navigationContainer, function scheduler(e) {
	                    var _this3 = this;
	
	                    if (e.target !== this.navigationContainer) {
	                        return _Util2.default.addEventOnce(_Settings2.default.getTransitionEvent(), this.navigationContainer, scheduler.bind(this));
	                    }
	                    requestAnimationFrame(function () {
	                        OffCanvas.currentOpen = null;
	                        var docCls = global.document.documentElement.classList;
	                        docCls.remove(_this3.darkenerClassToggle);
	                        docCls.remove(_this3.globalToggleClass);
	                        if (!!event) {
	                            _Event2.default.dispatchAndFire(_this3.navigationContainer, EVENT_TOGGLE);
	                        }
	                        resolve();
	                    });
	                }.bind(_this2));
	            });
	        }
	
	        /**
	         * @private
	         */
	
	    }, {
	        key: '_removeInstant',
	        value: function _removeInstant() {
	            this.navigationContainer.classList.remove(OPEN_CLASS);
	            global.document.documentElement.classList.remove(this.darkenerClassToggleInstant);
	            this.darkener.classList.remove(INIT_CLASS);
	            _FixedWindow2.default.getInstance().close();
	        }
	
	        /**
	         * Toggles a an off-canvas element
	         * @param [e]
	         * @private
	         */
	
	    }, {
	        key: 'toggle',
	        value: function toggle(e) {
	            var _this4 = this;
	
	            if (e) {
	                e.preventDefault();
	            }
	            this.resetTransform(this.navigationContainer.style);
	            var darkenerClass = this.darkener.classList;
	            var DARKENER_CLASS_TOGGLE = this.darkenerClassToggle;
	            var DARKENER_CLASS_INSTANT_TOGGLE = this.darkenerClassToggleInstant;
	            var navigationControllerClassList = this.navigationContainer.classList;
	            if (!OffCanvas.currentOpen) {
	                _Util2.default.addEventOnce(_Settings2.default.getTransitionEvent(), this.navigationContainer, function () {
	                    if (!!e) {
	                        _Event2.default.dispatchAndFire(_this4.navigationContainer, EVENT_TOGGLE);
	                    }
	                });
	                OffCanvas.currentOpen = this;
	                _FixedWindow2.default.getInstance().open(this, this.navigationContainer);
	                var docElementCls = global.document.documentElement.classList;
	                docElementCls.add(this.globalToggleClass);
	                docElementCls.add(DARKENER_CLASS_INSTANT_TOGGLE);
	                docElementCls.add(DARKENER_CLASS_TOGGLE);
	                darkenerClass.add(INIT_CLASS);
	                navigationControllerClassList.add(OPEN_CLASS);
	            } else {
	                return this.close(e);
	            }
	        }
	    }, {
	        key: 'close',
	        value: function close(event) {
	            if (this.navigationContainer.classList.contains(OPEN_CLASS)) {
	                var promise = this._remove(event);
	                this._removeInstant();
	                return promise;
	            }
	            return new Promise(function (r) {
	                return r();
	            });
	        }
	
	        /**
	         * Register events
	         * @param [delegate]
	         */
	
	    }, {
	        key: 'registerEvents',
	        value: function registerEvents(delegate) {
	            var _this5 = this;
	
	            var thisDelegate = delegate || global.document;
	            _FixedWindow2.default.getInstance().addScreenConstraint(OffCanvas, function (width) {
	                return width < _Settings2.default.get().smallBreakpoint;
	            });
	            thisDelegate.addEventListener(_Settings2.default.getTabEvent(), function (e) {
	                if (OffCanvas.currentOpen && OffCanvas.currentOpen !== _this5) {
	                    return;
	                }
	                var id = _this5.navigationContainerId;
	                var validTarget = e.target.getAttribute(ATTR_TARGET) === id;
	                if (!_Util2.default.isPartOfNode(e.target, _this5.navigationContainer)) {
	                    if (validTarget || OffCanvas.currentOpen === _this5 && e.target === _this5.darkener) {
	                        _this5.toggle(e);
	                    }
	                } else {
	                    if (e.target.hasAttribute(ATTR_CLOSE_SIDEBAR)) {
	                        _this5.toggle(e);
	                    }
	                }
	            });
	        }
	    }]);
	
	    return OffCanvas;
	}();
	
	OffCanvas.currentOpen = null;
	
	exports.default = OffCanvas;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 435 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.EVENT_DROPDOWN_CLOSED = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*
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
	
	var _Util = __webpack_require__(423);
	
	var _Util2 = _interopRequireDefault(_Util);
	
	var _Settings = __webpack_require__(425);
	
	var _Settings2 = _interopRequireDefault(_Settings);
	
	var _Event = __webpack_require__(428);
	
	var _Event2 = _interopRequireDefault(_Event);
	
	var _Widget = __webpack_require__(430);
	
	var _Widget2 = _interopRequireDefault(_Widget);
	
	var _FixedWindow = __webpack_require__(431);
	
	var _FixedWindow2 = _interopRequireDefault(_FixedWindow);
	
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
	
	var Dropdown = function () {
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
	            var target = _Util2.default.closestCallback(e.target, function (n) {
	                return n instanceof HTMLElement && n.hasAttribute(ATTR_NAME);
	            });
	            var targetIsCurrent = target === this.currentTarget;
	
	            if (currentOpen && !_Util2.default.isPartOfNode(e.target, currentOpen) || targetIsCurrent) {
	                this.close();
	                if (targetIsCurrent) {
	                    e.preventDefault();
	                }
	                return targetIsCurrent ? false : this._delegateFunction(e);
	            }
	
	            if (target && !currentOpen) {
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
	            _FixedWindow2.default.getInstance().addScreenConstraint(Dropdown, function (width) {
	                return width < _Settings2.default.get().smallBreakpoint;
	            });
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
	            var _this2 = this;
	
	            var currentOpen = this.currentOpen;
	            if (!currentOpen) {
	                return false;
	            }
	            var darkenerInstance = currentOpen.flexDarkenerInstance || this.darkener;
	            var thisCurrentOpen = currentOpen;
	
	            var future = new Promise(function (resolve) {
	                if (window.getComputedStyle(currentOpen).position === 'fixed') {
	                    _Util2.default.addEventOnce(_Settings2.default.getTransitionEvent(), currentOpen, function scheduler(e) {
	                        var _this = this;
	
	                        if (e.target !== currentOpen) {
	                            return _Util2.default.addEventOnce(_Settings2.default.getTransitionEvent(), currentOpen, scheduler.bind(this));
	                        }
	                        requestAnimationFrame(function () {
	                            _Event2.default.dispatchAndFire(thisCurrentOpen, EVENT_DROPDOWN_CLOSED);
	                            // if a new dropdown has been opened in the meantime, do not remove darkener
	                            if (_this.currentOpen !== null) {
	                                return false;
	                            }
	                            _this.toggleDarkenerToggler(darkenerInstance, false);
	                            resolve(true);
	                        });
	                    }.bind(_this2));
	                } else {
	                    resolve(true);
	                    _Event2.default.dispatchAndFire(thisCurrentOpen, EVENT_DROPDOWN_CLOSED);
	                }
	            });
	
	            _FixedWindow2.default.getInstance().close();
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
	            var _this3 = this;
	
	            var doc = global.document;
	
	            if (!target) {
	                throw new Error('Dropdown target not found');
	            }
	
	            var widget = thisWidget || _Widget2.default.findWidget(target);
	            var future = void 0;
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
	                    _this3.container.appendChild(element);
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
	                if (_this3.currentOpen) {
	                    _this3.close();
	                }
	                // Skip one frame to show animation
	                target.dropdownContent = dropdownContent;
	                var isAbsolute = global.getComputedStyle(dropdownContent).position === 'absolute';
	                dropdownContent.hfWidgetInstance = _this3;
	
	                if (!target.flexCollisionContainer) {
	                    var collisionC = target.getAttribute(ATTR_CC);
	                    target.flexCollisionContainer = collisionC ? doc.getElementById(collisionC) || document.documentElement : document.documentElement;
	                }
	
	                dropdownContent.classList.toggle(CLS_OPEN);
	                if (dropdownContent.classList.contains(CLS_OPEN)) {
	                    _this3.currentOpen = dropdownContent;
	                    _this3.currentTarget = target;
	                }
	                _FixedWindow2.default.getInstance().open(_this3, dropdownContent);
	                if (isAbsolute) {
	                    // Check collision:
	                    var selfTarget = target.getAttribute(ATTR_DATA_TARGET);
	                    selfTarget = selfTarget ? doc.getElementById(selfTarget) : target;
	                    _Util2.default.setupPositionNearby(selfTarget, dropdownContent, target.flexCollisionContainer);
	                } else {
	                    // optionally get custom darkener container for target
	                    var d = target.getAttribute(ATTR_DARKENER);
	                    if (d) {
	                        dropdownContent.flexDarkenerInstance = doc.getElementById(d);
	                        (dropdownContent.flexDarkenerInstance || _this3.darkener).classList.toggle(DARKENER_INIT);
	                    } else {
	                        _this3.darkener.classList.toggle(DARKENER_INIT);
	                    }
	                    _this3.toggleDarkenerToggler(dropdownContent.flexDarkenerInstance || _this3.darkener, true);
	
	                    dropdownContent.style.left = '0';
	                    dropdownContent.style.top = 'auto';
	                }
	            });
	        }
	    }]);
	
	    return Dropdown;
	}();
	
	exports.default = Dropdown;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 436 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*
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
	
	/* global Image, TouchEvent*/
	
	var _Modal = __webpack_require__(429);
	
	var _Modal2 = _interopRequireDefault(_Modal);
	
	var _Settings = __webpack_require__(425);
	
	var _Settings2 = _interopRequireDefault(_Settings);
	
	var _Widget = __webpack_require__(430);
	
	var _Widget2 = _interopRequireDefault(_Widget);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
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
	
	var LightBox = function () {
	
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
	                    var _ret = function () {
	                        var nextThumb = next.hasAttribute(ATTR_NO_THUMBNAIL) ? next : next.children[0] || next;
	                        var nextHighRes = next.getAttribute(ATTR_DATA_HREF) || next.getAttribute(ATTR_HREF);
	                        var nextSource = nextThumb.getAttribute(ATTR_SRC) || nextThumb.src || nextHighRes;
	                        var nextImgObject = new Image();
	
	                        if (!nextSource) {
	                            reject(next);
	                            return {
	                                v: void 0
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
	                    }();
	
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
	}();
	
	exports.default = LightBox;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }
/******/ ])
});
;
//# sourceMappingURL=site.map