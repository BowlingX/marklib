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
	exports.RenderingEvents = exports.RenderResult = exports.Util = exports.Rendering = undefined;
	
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
	exports.EVENT_PART_TREE_LEAVE = exports.EVENT_PART_TREE_ENTER = exports.EVENT_MOUSELEAVE = exports.EVENT_MOUSEENTER = exports.EVENT_CLICK = undefined;
	
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
	
	exports.default = RenderingEvents;
	
	
	RenderingEvents.staticEventListener = new _wolfy87Eventemitter2.default();
	
	var init = function init() {
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
	
	if (!global.__MARKLIB_EVENTS__) {
	  global.__MARKLIB_EVENTS__ = true;
	  init();
	}
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

/***/ }
/******/ ])
});
;
//# sourceMappingURL=marklib.map