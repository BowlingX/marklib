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
	
	var _Object$defineProperty = __webpack_require__(2)['default'];
	
	var _interopRequireDefault = __webpack_require__(6)['default'];
	
	_Object$defineProperty(exports, '__esModule', {
	    value: true
	});
	
	/* global localStorage */
	
	var _modulesMarklib = __webpack_require__(7);
	
	var _modulesMarklib2 = _interopRequireDefault(_modulesMarklib);
	
	var KEY_ENTER = 13;
	
	/**
	 * Contains Module for the demonstration
	 */
	
	document.addEventListener('DOMContentLoaded', function () {
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
	            r.renderWithRange(range, true);
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
	            marker.renderWithPath(range.startContainerPath + ';' + range.startOffset, range.endContainerPath + ';' + range.endOffset);
	        } catch (e) {
	            console.warn('Could not render:', range);
	            localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
	            throw 'Cleared local storage because of a rendering issue, the page might have been changed ;)';
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
	            savedRanges.push(result);
	            localStorage.setItem(STORAGE_KEY, JSON.stringify(savedRanges));
	        } catch (e) {
	            console.warn('Could not add selection: ', e);
	        }
	    };
	
	    document.addEventListener('keydown', function (e) {
	        if (e.keyCode === KEY_ENTER) {
	            actionMark();
	        }
	    });
	
	    document.addEventListener('click', function (e) {
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
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9ib3dsaW5neC9Qcm9qZWt0ZS9tYXJrbGliL25vZGVfbW9kdWxlcy9lc2xpbnQtbG9hZGVyL2luZGV4LmpzIS9Vc2Vycy9ib3dsaW5neC9Qcm9qZWt0ZS9tYXJrbGliL3NyYy9tYWluL21vZHVsZXMvU2l0ZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7Ozs7Ozs7Ozs7Ozs4QkFJTyxpQkFBaUI7Ozs7QUFFckMsSUFBTSxTQUFTLEdBQUcsRUFBRSxDQUFDOzs7Ozs7QUFNckIsUUFBUSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFLFlBQVk7QUFDdEQsUUFBTSxXQUFXLEdBQUcsYUFBYSxDQUFDOzs7OztBQUtsQyxhQUFTLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFO0FBQ25ELFlBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzNELFlBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7O0FBRTdCLFlBQUksTUFBTSxHQUFHLFNBQVQsTUFBTSxDQUFhLFlBQVksRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFO0FBQzVDLGdCQUFJLENBQUMsR0FBRyxJQUFJLDRCQUFRLFNBQVMsQ0FBQyxRQUFRLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFDcEQsZ0JBQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztBQUNuQyxpQkFBSyxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDaEMsaUJBQUssQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQzlCLGFBQUMsQ0FBQyxlQUFlLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQy9CLGdCQUFJLFlBQVksQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFOztBQUNyQyx3QkFB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QWdCLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxFQUFFO0FBQzlDLFlBQUksQ0FBQyxDQUFDLE9BQU8sS0FBSyxTQUFTLEVBQUU7QUFDekIsc0JBQVUsRUFBRSxDQUFDO1NBQ2hCO0tBQ0osQ0FBQyxDQUFDOztBQUVILFlBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLEVBQUU7QUFDNUMsWUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsS0FBSyxhQUFhLEVBQUU7QUFDL0IsbUJBQU8sVUFBVSxFQUFFLENBQUM7U0FDdkIsTUFBTSxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxLQUFLLGNBQWMsRUFBRTtBQUN2QyxnQkFBSSxRQUFRLEdBQUcsUUFBUSxDQUFDLG9CQUFvQixDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ3pELGlCQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUN0Qyx3QkFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDckMsd0JBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBRTNDO0FBQ0QsdUJBQVcsR0FBRyxFQUFFLENBQUM7QUFDakIsd0JBQVksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUN6RDtLQUNKLENBQUMsQ0FBQztDQUNOLENBQUMsQ0FBQyIsImZpbGUiOiIvVXNlcnMvYm93bGluZ3gvUHJvamVrdGUvbWFya2xpYi9ub2RlX21vZHVsZXMvZXNsaW50LWxvYWRlci9pbmRleC5qcyEvVXNlcnMvYm93bGluZ3gvUHJvamVrdGUvbWFya2xpYi9zcmMvbWFpbi9tb2R1bGVzL1NpdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbi8qIGdsb2JhbCBsb2NhbFN0b3JhZ2UgKi9cblxuaW1wb3J0IE1hcmtsaWIgZnJvbSAnbW9kdWxlcy9NYXJrbGliJztcblxuY29uc3QgS0VZX0VOVEVSID0gMTM7XG5cbi8qKlxuICogQ29udGFpbnMgTW9kdWxlIGZvciB0aGUgZGVtb25zdHJhdGlvblxuICovXG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCBTVE9SQUdFX0tFWSA9ICdzYXZlZFJhbmdlcyc7XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIGFuaW1hdGVkIHJlbmRlcmluZ1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIHByZXNlbnRSZW5kZXJpbmcoc2VsZWN0b3IsIGNsYXNzTmFtZXMsIHNwZWVkKSB7XG4gICAgICAgIHZhciB0ZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc2VsZWN0b3IpLmNoaWxkTm9kZXNbMF07XG4gICAgICAgIGxldCB0aGlzTGVuZ3RoID0gdGV4dC5sZW5ndGg7XG5cbiAgICAgICAgdmFyIHJlbmRlciA9IGZ1bmN0aW9uIChhdXRvTWFya1RleHQsIGMsIGxlbmd0aCkge1xuICAgICAgICAgICAgdmFyIHIgPSBuZXcgTWFya2xpYi5SZW5kZXJpbmcoZG9jdW1lbnQsIGNsYXNzTmFtZXMpO1xuICAgICAgICAgICAgdmFyIHJhbmdlID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTtcbiAgICAgICAgICAgIHJhbmdlLnNldFN0YXJ0KGF1dG9NYXJrVGV4dCwgMCk7XG4gICAgICAgICAgICByYW5nZS5zZXRFbmQoYXV0b01hcmtUZXh0LCAxKTtcbiAgICAgICAgICAgIHIucmVuZGVyV2l0aFJhbmdlKHJhbmdlLCB0cnVlKTtcbiAgICAgICAgICAgIGlmIChhdXRvTWFya1RleHQucGFyZW50Tm9kZS5uZXh0U2libGluZykge1xuICAgICAgICAgICAgICAgIGxldCBuZXh0VGV4dCA9IGF1dG9NYXJrVGV4dC5wYXJlbnROb2RlLm5leHRTaWJsaW5nLmNoaWxkTm9kZXNbMF07XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZW5kZXIobmV4dFRleHQsICsrYywgbGVuZ3RoKTtcbiAgICAgICAgICAgICAgICB9LCBzcGVlZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiByZW5kZXIodGV4dCwgMCwgdGhpc0xlbmd0aCk7XG4gICAgfVxuXG4gICAgcHJlc2VudFJlbmRlcmluZygnYXV0b21hcmsnLCAnZmFkZUluRG93bicsIDIwKTtcblxuICAgIHZhciBzYXZlZFJhbmdlcyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oU1RPUkFHRV9LRVkpKSB8fCBbXSwgYW5pbWF0ZWQgPSBmYWxzZTtcblxuICAgIHNhdmVkUmFuZ2VzLmZvckVhY2goZnVuY3Rpb24gKHJhbmdlKSB7XG4gICAgICAgIHZhciBtYXJrZXIgPSBuZXcgTWFya2xpYi5SZW5kZXJpbmcoZG9jdW1lbnQpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbWFya2VyLnJlbmRlcldpdGhQYXRoKHJhbmdlLnN0YXJ0Q29udGFpbmVyUGF0aCArIFwiO1wiICsgcmFuZ2Uuc3RhcnRPZmZzZXQsXG4gICAgICAgICAgICAgICAgcmFuZ2UuZW5kQ29udGFpbmVyUGF0aCArIFwiO1wiICsgcmFuZ2UuZW5kT2Zmc2V0KTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKFwiQ291bGQgbm90IHJlbmRlcjpcIiwgcmFuZ2UpO1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oU1RPUkFHRV9LRVksIEpTT04uc3RyaW5naWZ5KFtdKSk7XG4gICAgICAgICAgICB0aHJvdyAnQ2xlYXJlZCBsb2NhbCBzdG9yYWdlIGJlY2F1c2Ugb2YgYSByZW5kZXJpbmcgaXNzdWUsIHRoZSBwYWdlIG1pZ2h0IGhhdmUgYmVlbiBjaGFuZ2VkIDspJztcbiAgICAgICAgfVxuXG4gICAgfSk7XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2Vjb25kUGFyYWdyYXBoJyksIHIgPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcbiAgICAgICAgICAgIGh0bWwgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG4gICAgICAgIGlmIChyLnRvcCA8PSBodG1sLmNsaWVudEhlaWdodCAmJiByLmJvdHRvbSA+PSAwICYmICFhbmltYXRlZCkge1xuICAgICAgICAgICAgYW5pbWF0ZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKCdhbmltYXRlJyk7XG4gICAgICAgICAgICBpZiAoIXNhdmVkUmFuZ2VzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHByZXNlbnRSZW5kZXJpbmcoJ3NlY29uZFBhcmFncmFwaEl0ZW0nLCAnbWFya2luZycsIDMwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgdmFyIGFjdGlvbk1hcmsgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB2YXIgc2VsZWN0aW9uID0gZG9jdW1lbnQuZ2V0U2VsZWN0aW9uKCksIHJlbmRlcmVyID0gbmV3IE1hcmtsaWIuUmVuZGVyaW5nKGRvY3VtZW50KSxcbiAgICAgICAgICAgICAgICByZXN1bHQgPSByZW5kZXJlci5yZW5kZXJXaXRoUmFuZ2Uoc2VsZWN0aW9uLmdldFJhbmdlQXQoMCkpO1xuICAgICAgICAgICAgc2VsZWN0aW9uLnJlbW92ZUFsbFJhbmdlcygpO1xuICAgICAgICAgICAgc2F2ZWRSYW5nZXMucHVzaChyZXN1bHQpO1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oU1RPUkFHRV9LRVksIEpTT04uc3RyaW5naWZ5KHNhdmVkUmFuZ2VzKSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcIkNvdWxkIG5vdCBhZGQgc2VsZWN0aW9uOiBcIiwgZSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gS0VZX0VOVEVSKSB7XG4gICAgICAgICAgICBhY3Rpb25NYXJrKCk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBpZiAoZS50YXJnZXQuaWQgPT09ICdhY3Rpb24tbWFyaycpIHtcbiAgICAgICAgICAgIHJldHVybiBhY3Rpb25NYXJrKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoZS50YXJnZXQuaWQgPT09ICdhY3Rpb24tY2xlYXInKSB7XG4gICAgICAgICAgICB2YXIgZWxlbWVudHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgneC1tYXJrZXInKTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50c1tpXS5jbGFzc0xpc3QuYWRkKCdkZWxldGVkJyk7XG4gICAgICAgICAgICAgICAgZWxlbWVudHNbaV0uY2xhc3NMaXN0LnJlbW92ZSgnbWFya2luZycpO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzYXZlZFJhbmdlcyA9IFtdO1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oU1RPUkFHRV9LRVksIEpTT04uc3RyaW5naWZ5KFtdKSk7XG4gICAgICAgIH1cbiAgICB9KTtcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBNYXJrbGliO1xuIl19

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(3), __esModule: true };

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(4);
	module.exports = function defineProperty(it, key, desc){
	  return $.setDesc(it, key, desc);
	};

/***/ },
/* 4 */
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
	
	var $ = module.exports = __webpack_require__(5)({
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
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function($){
	  $.FW   = false;
	  $.path = $.core;
	  return $;
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports["default"] = function (obj) {
	  return obj && obj.__esModule ? obj : {
	    "default": obj
	  };
	};
	
	exports.__esModule = true;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _Object$defineProperty = __webpack_require__(2)['default'];
	
	var _interopRequireDefault = __webpack_require__(6)['default'];
	
	_Object$defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _Rendering = __webpack_require__(8);
	
	var _Rendering2 = _interopRequireDefault(_Rendering);
	
	var _utilUtil = __webpack_require__(11);
	
	var _utilUtil2 = _interopRequireDefault(_utilUtil);
	
	exports['default'] = {
	    Rendering: _Rendering2['default'],
	    Util: _utilUtil2['default']
	};
	module.exports = exports['default'];
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9ib3dsaW5neC9Qcm9qZWt0ZS9tYXJrbGliL25vZGVfbW9kdWxlcy9lc2xpbnQtbG9hZGVyL2luZGV4LmpzIS9Vc2Vycy9ib3dsaW5neC9Qcm9qZWt0ZS9tYXJrbGliL3NyYy9tYWluL21vZHVsZXMvTWFya2xpYi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7Ozs7Ozs7Ozs7eUJBRVMsV0FBVzs7Ozt3QkFDaEIsV0FBVzs7OztxQkFFYjtBQUNYLGFBQVMsd0JBQVc7QUFDcEIsUUFBSSx1QkFBTTtDQUNiIiwiZmlsZSI6Ii9Vc2Vycy9ib3dsaW5neC9Qcm9qZWt0ZS9tYXJrbGliL25vZGVfbW9kdWxlcy9lc2xpbnQtbG9hZGVyL2luZGV4LmpzIS9Vc2Vycy9ib3dsaW5neC9Qcm9qZWt0ZS9tYXJrbGliL3NyYy9tYWluL21vZHVsZXMvTWFya2xpYi5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IFJlbmRlcmluZyBmcm9tICdSZW5kZXJpbmcnO1xuaW1wb3J0IFV0aWwgZnJvbSAndXRpbC9VdGlsJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIFJlbmRlcmluZzogUmVuZGVyaW5nLFxuICAgIFV0aWw6IFV0aWxcbn07XG4iXX0=

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/* global Node, Document */
	
	'use strict';
	
	var _createClass = __webpack_require__(9)['default'];
	
	var _classCallCheck = __webpack_require__(10)['default'];
	
	var _Object$defineProperty = __webpack_require__(2)['default'];
	
	var _interopRequireDefault = __webpack_require__(6)['default'];
	
	_Object$defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _utilUtil = __webpack_require__(11);
	
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
	         * @param {String} id
	         * @param {String} text
	         * @returns {Node}
	         * @private
	         */
	        value: function _createStartEndWrapTemplate(id, text) {
	            var el = this._createWrapTemplate(),
	                vTrue = 'true';
	            el.setAttribute(ATTR_DATA_START_END, vTrue);
	            el.id = id;
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
	            var wrapper = this._createStartEndWrapTemplate(prefix + this.getId(), text);
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
	                container = this.context.querySelector(p);
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
	         * @returns {*}
	         */
	        value: function renderWithPath(startPath, endPath) {
	            var startContainer = this._deserializePath(startPath);
	            var endContainer = this._deserializePath(endPath);
	            if (startContainer && endContainer && startContainer.node && endContainer.node) {
	                var range = document.createRange();
	                range.setStart(startContainer.node, startContainer.offset);
	                range.setEnd(endContainer.node, endContainer.offset);
	                this.renderWithRange(range, true);
	                return range;
	            }
	            throw 'Could not find start- and/or end-container in document';
	        }
	    }, {
	        key: 'renderWithRange',
	
	        /**
	         * Prepares a selection with a range object
	         * @param {Range} range
	         * @param {boolean} [withoutResult] optional do calculate a result, the selection would not be serializable
	         * @returns {*}
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
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9ib3dsaW5neC9Qcm9qZWt0ZS9tYXJrbGliL25vZGVfbW9kdWxlcy9lc2xpbnQtbG9hZGVyL2luZGV4LmpzIS9Vc2Vycy9ib3dsaW5neC9Qcm9qZWt0ZS9tYXJrbGliL3NyYy9tYWluL1JlbmRlcmluZy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLFlBQVksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7d0JBRUksV0FBVzs7Ozs7OztBQU81QixJQUFNLFFBQVEsR0FBRyxVQUFVLENBQUM7Ozs7QUFJNUIsSUFBTSwrQkFBK0IsR0FBRyw0QkFBNEIsQ0FBQzs7OztBQUlyRSxJQUFNLDZCQUE2QixHQUFHLDBCQUEwQixDQUFDOzs7O0FBSWpFLElBQU0sbUJBQW1CLEdBQUcsbUJBQW1CLENBQUM7Ozs7QUFJaEQsSUFBTSwyQkFBMkIsR0FBRyx3QkFBd0IsQ0FBQzs7OztBQUk3RCxJQUFNLFlBQVksR0FBRyxtQkFBbUIsQ0FBQzs7Ozs7O0FBTXpDLElBQU0sOEJBQThCLEdBQUcsRUFBRSxDQUFDOztJQUdwQyxTQUFTO0FBRUEsYUFGVCxTQUFTLENBRUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUU7OEJBRnZDLFNBQVM7O0FBSVAsWUFBSSxFQUFFLFFBQVEsWUFBWSxRQUFRLENBQUEsQUFBQyxFQUFFO0FBQ2pDLGtCQUFNLG1EQUFtRCxDQUFDO1NBQzdEOzs7O0FBSUQsWUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7Ozs7OztBQU16QixZQUFJLENBQUMsRUFBRSxHQUFHLHNCQUFLLElBQUksRUFBRSxDQUFDOzs7Ozs7QUFNdEIsWUFBSSxDQUFDLFFBQVEsR0FBRyxTQUFTLEtBQUssUUFBUSxHQUFHLFNBQVMsR0FBRyxRQUFRLENBQUM7Ozs7OztBQU05RCxZQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQzs7Ozs7O0FBTTNCLFlBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDOzs7Ozs7QUFNekIsWUFBSSxDQUFDLFlBQVksR0FB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cUJBQVQsU0FBUyIsImZpbGUiOiIvVXNlcnMvYm93bGluZ3gvUHJvamVrdGUvbWFya2xpYi9ub2RlX21vZHVsZXMvZXNsaW50LWxvYWRlci9pbmRleC5qcyEvVXNlcnMvYm93bGluZ3gvUHJvamVrdGUvbWFya2xpYi9zcmMvbWFpbi9SZW5kZXJpbmcuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBnbG9iYWwgTm9kZSwgRG9jdW1lbnQgKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgVXRpbCBmcm9tICd1dGlsL1V0aWwnO1xuXG5pbXBvcnQge0FUVFJfREFUQV9PUklHSU5BTF9JTkRFWCwgREFUQV9JU19TRUxFQ1RJT059IGZyb20gJ3V0aWwvVXRpbCc7XG5cbi8qKlxuICogQHR5cGUge3N0cmluZ31cbiAqL1xuY29uc3QgVEFHX05BTUUgPSAneC1tYXJrZXInO1xuLyoqXG4gKiBAdHlwZSB7c3RyaW5nfVxuICovXG5jb25zdCBBVFRSX0RBVEFfT1JJR0lOQUxfT0ZGU0VUX1NUQVJUID0gJ2RhdGEtb3JpZ2luYWwtb2Zmc2V0LXN0YXJ0Jztcbi8qKlxuICogQHR5cGUge3N0cmluZ31cbiAqL1xuY29uc3QgREFUQV9PUklHSU5BTF9URVhUX05PREVfSU5ERVggPSAnb3JpZ2luYWwtdGV4dC1ub2RlLWluZGV4Jztcbi8qKlxuICogQHR5cGUge3N0cmluZ31cbiAqL1xuY29uc3QgQVRUUl9EQVRBX1NUQVJUX0VORCA9ICdkYXRhLWlzLXN0YXJ0LWVuZCc7XG4vKipcbiAqIEB0eXBlIHtzdHJpbmd9XG4gKi9cbmNvbnN0IEFUVFJfREFUQV9JU19ISUdITElHSFRfTk9ERSA9ICdkYXRhLWlzLWhpZ2hsaWdodC1ub2RlJztcbi8qKlxuICogQHR5cGUge3N0cmluZ31cbiAqL1xuY29uc3QgQVRUUl9EQVRBX0lEID0gJ2RhdGEtc2VsZWN0aW9uLWlkJztcblxuLyoqXG4gKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2RlL2RvY3MvV2ViL0FQSS9Ob2RlL2NvbXBhcmVEb2N1bWVudFBvc2l0aW9uXG4gKiBAdHlwZSB7bnVtYmVyfVxuICovXG5jb25zdCBET0NVTUVOVF9QT1NJVElPTl9DT05UQUlORURfQlkgPSAxNjtcblxuZXhwb3J0IGRlZmF1bHRcbmNsYXNzIFJlbmRlcmluZyB7XG5cbiAgICBjb25zdHJ1Y3Rvcihkb2N1bWVudCwgY3NzQ2xhc3MsIGNvbnRleHQpIHtcblxuICAgICAgICBpZiAoIShkb2N1bWVudCBpbnN0YW5jZW9mIERvY3VtZW50KSkge1xuICAgICAgICAgICAgdGhyb3cgJ01hcmtsaWIgezB9IGlzIHJlcXVpcmVkIHRvIGJlIGEgZG9jdW1lbnQgaW5zdGFuY2UnO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAdHlwZSB7RG9jdW1lbnR9XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmRvY3VtZW50ID0gZG9jdW1lbnQ7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIElEIG9mIHJlbmRlcmluZywgd2lsbCBiZSBzZXQgb24gZWFjaCBlbGVtZW50IHRoYXQgaXMgcGFydCBvZiBpdFxuICAgICAgICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5pZCA9IFV0aWwuZ3VpZCgpO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDbGFzcyB0aGF0IGlzIHNldCBvbiBhbGwgaGlnaGxpZ2h0IG5vZGVzXG4gICAgICAgICAqIEB0eXBlIHtTdHJpbmd9XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmNzc0NsYXNzID0gdW5kZWZpbmVkID09PSBjc3NDbGFzcyA/ICdtYXJraW5nJyA6IGNzc0NsYXNzO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTdGFydENvbnRhaW5lclxuICAgICAgICAgKiBAdHlwZSB7Tm9kZX1cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuc3RhcnRDb250YWluZXIgPSBudWxsO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBFbmRDb250YWluZXJcbiAgICAgICAgICogQHR5cGUge05vZGV9XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmVuZENvbnRhaW5lciA9IG51bGw7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFByZWZpeCBiZWZvcmUgSURcbiAgICAgICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMubWFya2VyUHJlZml4ID0gJ21hcmtlci1zdGFydC0nO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTdWZmaXggYmVmb3JlIElEXG4gICAgICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLm1hcmtlclN1ZmZpeCA9ICdtYXJrZXItZW5kLSc7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEB0eXBlIHtOb2RlfVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5jb250ZXh0ID0gY29udGV4dCB8fCB0aGlzLmRvY3VtZW50O1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAdHlwZSB7RnVuY3Rpb259XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLl9vbldyYXBwZWROb2RlRnVuYyA9IG51bGw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMge3N0cmluZ30gaWQgb2YgdGhpcyByZW5kZXJpbmdcbiAgICAgKi9cbiAgICBnZXRJZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaWQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlkXG4gICAgICogQHJldHVybnMge1JlbmRlcmluZ31cbiAgICAgKi9cbiAgICBzZXRJZChpZCkge1xuICAgICAgICB0aGlzLmlkID0gaWQ7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExpc3RlbmVyIHRoYXQgaXMgY2FsbGVkIHdoZW4gYSBub2RlIGlzIHdyYXBwZWQgb24gdGhpcyBpbnN0YW5jZVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZcbiAgICAgKiBAcmV0dXJucyB7UmVuZGVyaW5nfVxuICAgICAqL1xuICAgIG9uV3JhcHBlZE5vZGUoZikge1xuICAgICAgICB0aGlzLl9vbldyYXBwZWROb2RlRnVuYyA9IGY7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2NhbGxPbldyYXBwZWROb2RlKCkge1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMuX29uV3JhcHBlZE5vZGVGdW5jID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aGlzLl9vbldyYXBwZWROb2RlRnVuYy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge05vZGV9IGNvbnRhaW5lclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB0aGlzSW5kZXhcbiAgICAgKiBAcmV0dXJucyB7aW50fSBpbmRleCBvZiBwYXJlbnQgb3Igb3JpZ2luYWxcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHN0YXRpYyBfZ2V0SW5kZXhQYXJlbnRJZkhhcyhjb250YWluZXIsIHRoaXNJbmRleCkge1xuICAgICAgICB2YXIgcCA9IGNvbnRhaW5lci5wYXJlbnROb2RlO1xuICAgICAgICB2YXIgaW5kZXggPSBwYXJzZUludChwLmdldEF0dHJpYnV0ZShBVFRSX0RBVEFfT1JJR0lOQUxfSU5ERVgpKTtcbiAgICAgICAgcmV0dXJuIGluZGV4ID4gdGhpc0luZGV4ID8gaW5kZXggOiB0aGlzSW5kZXg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGNvbnRhaW5lclxuICAgICAqIEByZXR1cm5zIHtpbnR9IG9mZnNldCBzdGFydCBvZiBwYXJlbnQgaWYgaGFzLCBlbHNlIDBcbiAgICAgKi9cbiAgICBzdGF0aWMgX2dldE9mZnNldFBhcmVudElmSGFzKGNvbnRhaW5lcikge1xuICAgICAgICB2YXIgcCA9IGNvbnRhaW5lci5wYXJlbnROb2RlO1xuICAgICAgICB2YXIgb2Zmc2V0ID0gcGFyc2VJbnQocC5nZXRBdHRyaWJ1dGUoQVRUUl9EQVRBX09SSUdJTkFMX09GRlNFVF9TVEFSVCkpO1xuICAgICAgICByZXR1cm4gb2Zmc2V0ID4gMCA/IG9mZnNldCA6IDA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIFRlbXBsYXRlIHVzZWQgYXMgYSB3cmFwcGVyXG4gICAgICogQHJldHVybnMge05vZGV9XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfY3JlYXRlV3JhcFRlbXBsYXRlKCkge1xuICAgICAgICB2YXIgZWwgPSB0aGlzLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoVEFHX05BTUUpLCB2VHJ1ZSA9IFwidHJ1ZVwiO1xuICAgICAgICBlbC5jbGFzc05hbWUgPSB0aGlzLmNzc0NsYXNzO1xuICAgICAgICBlbC5zZXRBdHRyaWJ1dGUoREFUQV9JU19TRUxFQ1RJT04sIHZUcnVlKTtcbiAgICAgICAgZWwuc2V0QXR0cmlidXRlKEFUVFJfREFUQV9JRCwgdGhpcy5nZXRJZCgpKTtcbiAgICAgICAgZWwuc2V0QXR0cmlidXRlKEFUVFJfREFUQV9JU19ISUdITElHSFRfTk9ERSwgdlRydWUpO1xuXG4gICAgICAgIHJldHVybiBlbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgVGVtcGxhdGUgdG8gdXNlIGFzIHN0YXJ0IGFuZCBlbmQgbWFya3NcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdGV4dFxuICAgICAqIEByZXR1cm5zIHtOb2RlfVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2NyZWF0ZVN0YXJ0RW5kV3JhcFRlbXBsYXRlKGlkLCB0ZXh0KSB7XG4gICAgICAgIHZhciBlbCA9IHRoaXMuX2NyZWF0ZVdyYXBUZW1wbGF0ZSgpLCB2VHJ1ZSA9IFwidHJ1ZVwiO1xuICAgICAgICBlbC5zZXRBdHRyaWJ1dGUoQVRUUl9EQVRBX1NUQVJUX0VORCwgdlRydWUpO1xuICAgICAgICBlbC5pZCA9IGlkO1xuICAgICAgICBlbC50ZXh0Q29udGVudCA9IHRleHQ7XG4gICAgICAgIHJldHVybiBlbDtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgU3RhcnQgb3IgRW5kIENvbnRhaW5lciBFbGVtZW50XG4gICAgICogQHBhcmFtIGluaXRpYWxOb2RlXG4gICAgICogQHBhcmFtIHByZWZpeFxuICAgICAqIEBwYXJhbSB0ZXh0XG4gICAgICogQHBhcmFtIG9mZnNldFxuICAgICAqIEBwYXJhbSBpbmRleFxuICAgICAqIEByZXR1cm5zIHtOb2RlfVxuICAgICAqL1xuICAgIF9jcmVhdGVTdGFydE9yRW5kQ29udGFpbmVyKGluaXRpYWxOb2RlLCBwcmVmaXgsIHRleHQsIG9mZnNldCwgaW5kZXgpIHtcbiAgICAgICAgY29uc3Qgd3JhcHBlciA9IHRoaXMuX2NyZWF0ZVN0YXJ0RW5kV3JhcFRlbXBsYXRlKHByZWZpeCArIHRoaXMuZ2V0SWQoKSwgdGV4dCk7XG4gICAgICAgIHdyYXBwZXIuc2V0QXR0cmlidXRlKEFUVFJfREFUQV9PUklHSU5BTF9JTkRFWCwgUmVuZGVyaW5nLl9nZXRJbmRleFBhcmVudElmSGFzKGluaXRpYWxOb2RlLCBpbmRleCkpO1xuICAgICAgICB3cmFwcGVyLnNldEF0dHJpYnV0ZShBVFRSX0RBVEFfT1JJR0lOQUxfT0ZGU0VUX1NUQVJULCBvZmZzZXQpO1xuICAgICAgICB3cmFwcGVyLnNldEF0dHJpYnV0ZShEQVRBX09SSUdJTkFMX1RFWFRfTk9ERV9JTkRFWCwgaW5kZXgpO1xuICAgICAgICB3cmFwcGVyLm1hcmtsaWJJbnN0YW5jZSA9IHRoaXM7XG4gICAgICAgIHJldHVybiB3cmFwcGVyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFdyYXBzIGdpdmVuIGVsZW1lbnRcbiAgICAgKiBAcGFyYW0ge05vZGV9IGVsXG4gICAgICogQHBhcmFtIFtvcHRpb25hbExlbmd0aF1cbiAgICAgKiBAcGFyYW0gW29wdGlvbmFsSW5kZXhdXG4gICAgICogQHBhcmFtIFtvcHRpb25hbElzU2FtZU5vZGVdXG4gICAgICogQHJldHVybnMge05vZGV9XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfY3JlYXRlV3JhcChlbCwgb3B0aW9uYWxMZW5ndGgsIG9wdGlvbmFsSW5kZXgsIG9wdGlvbmFsSXNTYW1lTm9kZSkge1xuICAgICAgICBjb25zdCBvcmlnaW5hbEluZGV4ID0gb3B0aW9uYWxJbmRleCA+PSAwID8gb3B0aW9uYWxJbmRleCA6IFV0aWwuY2FsY0luZGV4KGVsKTtcbiAgICAgICAgY29uc3Qgd3JhcHBlciA9IHRoaXMuX2NyZWF0ZVdyYXBUZW1wbGF0ZSgpO1xuICAgICAgICB3cmFwcGVyLnNldEF0dHJpYnV0ZShBVFRSX0RBVEFfT1JJR0lOQUxfSU5ERVgsIFJlbmRlcmluZy5fZ2V0SW5kZXhQYXJlbnRJZkhhcyhlbCwgb3JpZ2luYWxJbmRleCkpO1xuICAgICAgICBjb25zdCBvZmZzZXRMZW5ndGggPSBvcHRpb25hbExlbmd0aCA+PSAwID8gb3B0aW9uYWxMZW5ndGggOiBSZW5kZXJpbmcuX2dldE9mZnNldFBhcmVudElmSGFzKGVsKTtcbiAgICAgICAgd3JhcHBlci5zZXRBdHRyaWJ1dGUoQVRUUl9EQVRBX09SSUdJTkFMX09GRlNFVF9TVEFSVCwgb2Zmc2V0TGVuZ3RoKTtcblxuICAgICAgICAvLyBTYXZlIGEgcmVmZXJlbmNlIHRvIG9yaWdpbmFsIHRleHQgbm9kZSBpbiB3cmFwcGVyXG4gICAgICAgIHdyYXBwZXIuc2V0QXR0cmlidXRlKERBVEFfT1JJR0lOQUxfVEVYVF9OT0RFX0lOREVYLCBvcmlnaW5hbEluZGV4KTtcblxuICAgICAgICAvLyBzYXZlIHRoaXMgbWFya2VyIGluc3RhbmNlIHRvIGdpdmVuIG5vZGVcbiAgICAgICAgd3JhcHBlci5tYXJrbGliSW5zdGFuY2UgPSB0aGlzO1xuXG4gICAgICAgIGlmIChvcHRpb25hbElzU2FtZU5vZGUpIHtcbiAgICAgICAgICAgIHdyYXBwZXIuc2V0QXR0cmlidXRlKEFUVFJfREFUQV9TVEFSVF9FTkQsIEFUVFJfREFUQV9TVEFSVF9FTkQpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHdyYXAgPSBVdGlsLndyYXAoZWwsIHdyYXBwZXIpO1xuICAgICAgICB0aGlzLl9jYWxsT25XcmFwcGVkTm9kZShlbCwgd3JhcCk7XG4gICAgICAgIHJldHVybiB3cmFwO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBzcGxpdCBjb250YWluZXIgZWxlbWVudFxuICAgICAqIEBwYXJhbSBvcmlnaW5hbEVsZW1lbnQge05vZGV9IG9yaWdpbmFsIHRleHQgbm9kZSBlbGVtZW50IHRoYXQgaXMgY3JlYXRlZCBhIHdyYXBwZXIgZm9yXG4gICAgICogQHBhcmFtIGluZGV4XG4gICAgICogQHBhcmFtIG9mZnNldFxuICAgICAqIEByZXR1cm5zIHsqfGpRdWVyeXxOb2RlfVxuICAgICAqL1xuICAgIF9jcmVhdGVTcGxpdENvbnRhaW5lcihvcmlnaW5hbEVsZW1lbnQsIGluZGV4LCBvZmZzZXQpIHtcbiAgICAgICAgY29uc3Qgd3JhcHBlciA9IHRoaXMuZG9jdW1lbnQuY3JlYXRlRWxlbWVudChUQUdfTkFNRSksIHZUcnVlID0gXCJ0cnVlXCI7XG4gICAgICAgIHdyYXBwZXIuc2V0QXR0cmlidXRlKERBVEFfSVNfU0VMRUNUSU9OLCB2VHJ1ZSk7XG4gICAgICAgIHdyYXBwZXIuc2V0QXR0cmlidXRlKEFUVFJfREFUQV9PUklHSU5BTF9JTkRFWCwgUmVuZGVyaW5nLl9nZXRJbmRleFBhcmVudElmSGFzKG9yaWdpbmFsRWxlbWVudCwgaW5kZXgpKTtcbiAgICAgICAgd3JhcHBlci5zZXRBdHRyaWJ1dGUoQVRUUl9EQVRBX09SSUdJTkFMX09GRlNFVF9TVEFSVCwgb2Zmc2V0KTtcbiAgICAgICAgd3JhcHBlci5zZXRBdHRyaWJ1dGUoREFUQV9PUklHSU5BTF9URVhUX05PREVfSU5ERVgsIGluZGV4KTtcbiAgICAgICAgcmV0dXJuIHdyYXBwZXI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRXh0cmFjdHMgYWxsIFRleHROb2RlcyBpbnNpZGUgYSBjb250YWluZXJcbiAgICAgKiBAcGFyYW0ge05vZGV9IGVsXG4gICAgICogQHJldHVybnMge0FycmF5LjxUZXh0Pn1cbiAgICAgKi9cbiAgICBfd2Fsa1RleHROb2RlcyhlbCwgZnVuYykge1xuICAgICAgICB0aGlzLndhbGtEb20oZWwsIGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgICAgICBpZiAoTm9kZS5URVhUX05PREUgPT09IG5vZGUubm9kZVR5cGUgJiYgIVV0aWwubm9kZUlzRW1wdHkobm9kZSkpIHtcbiAgICAgICAgICAgICAgICBmdW5jKG5vZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFdhbGtzIHRoZSB0cmVlXG4gICAgICogQHBhcmFtIHN0YXJ0XG4gICAgICogQHBhcmFtIGVuZENvbnRhaW5lclxuICAgICAqIEBwYXJhbSBuZXh0UGFyZW50XG4gICAgICovXG4gICAgd2FsayhzdGFydCwgZW5kQ29udGFpbmVyLCBuZXh0UGFyZW50KSB7XG4gICAgICAgIGxldCBuZXh0UGFyZW50Tm9kZSA9IHN0YXJ0O1xuICAgICAgICB3aGlsZSAobmV4dFBhcmVudE5vZGUgJiYgbmV4dFBhcmVudE5vZGUgIT09IG5leHRQYXJlbnQucGFyZW50Tm9kZSkge1xuICAgICAgICAgICAgdmFyIGN1cnJlbnRQYXJlbnROb2RlID0gbmV4dFBhcmVudE5vZGU7XG4gICAgICAgICAgICBuZXh0UGFyZW50Tm9kZSA9IG5leHRQYXJlbnROb2RlLnBhcmVudE5vZGU7XG4gICAgICAgICAgICBpZiAodGhpcy53cmFwU2libGluZ3MoY3VycmVudFBhcmVudE5vZGUubmV4dFNpYmxpbmcsIGVuZENvbnRhaW5lcikpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogV2lsbCBXcmFwIGFsbCB0ZXh0Tm9kZSBzaWJsaW5ncyBvZiBhIGNvbnRhaW5lciAoc3RhcnQpIGluc2lkZSBhIGRlZmluZWQgRWxlbWVudCAobGlrZSBhIHNwYW4pXG4gICAgICogSWYgYW4gRWxlbWVudCBub2RlIGlzIGZvdW5kLCBpdCB3aWxsIHdyYXAgYWxsIGNoaWxkcmVuIG9mIHRoaXMgbm9kZSBpbnNpZGUgYSBlbGVtZW50IGFzIHdlbGwuXG4gICAgICogSXQgd2lsbCBzdG9wIGlmIGVuZENvbnRhaW5lciBpcyBmb3VuZCBhcyBhIG5vZGVcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7Tm9kZX0gc3RhcnRcbiAgICAgKiBAcGFyYW0ge05vZGV9IGVuZENvbnRhaW5lclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSAodHJ1ZSBpZiBlbmRDb250YWluZXIgd2FzIGZvdW5kKVxuICAgICAqL1xuICAgIHdyYXBTaWJsaW5ncyhzdGFydCwgZW5kQ29udGFpbmVyKSB7XG4gICAgICAgIGxldCBuZXh0ID0gc3RhcnQsXG4gICAgICAgICAgICBmb3VuZCA9IGZhbHNlO1xuXG4gICAgICAgIC8vIENhcHN1bGUgc29tZSBsb2dpY1xuICAgICAgICBjb25zdCB3cmFwID0gKChuKSA9PiB7XG4gICAgICAgICAgICBpZiAobi5wYXJlbnROb2RlLmhhc0F0dHJpYnV0ZShBVFRSX0RBVEFfU1RBUlRfRU5EKSAmJlxuICAgICAgICAgICAgICAgIG4ucGFyZW50Tm9kZS5oYXNBdHRyaWJ1dGUoQVRUUl9EQVRBX0lTX0hJR0hMSUdIVF9OT0RFKSAmJlxuICAgICAgICAgICAgICAgIG4ucGFyZW50Tm9kZS5nZXRBdHRyaWJ1dGUoQVRUUl9EQVRBX0lEKSA9PT0gdGhpcy5nZXRJZCgpKSB7XG4gICAgICAgICAgICAgICAgbGV0IHRoaXNOb2RlID0gdGhpcy5fY3JlYXRlV3JhcChuKS5wYXJlbnROb2RlO1xuICAgICAgICAgICAgICAgIHRoaXNOb2RlLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5jc3NDbGFzcyk7XG4gICAgICAgICAgICAgICAgdGhpc05vZGUucmVtb3ZlQXR0cmlidXRlKEFUVFJfREFUQV9JU19ISUdITElHSFRfTk9ERSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX2NyZWF0ZVdyYXAobik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLmJpbmQodGhpcyk7XG5cbiAgICAgICAgLy8gaGVscGVyIGZ1bmN0aW9uc1xuXG4gICAgICAgIGNvbnN0IHdyYXBJZiA9IChuKSA9PiB7XG4gICAgICAgICAgICBpZiAoIVV0aWwubm9kZUlzRW1wdHkobikpIHtcbiAgICAgICAgICAgICAgICB3cmFwKG4pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IHdhbGtJZkNvbnRhaW5lZCA9IChlKSA9PiB7XG4gICAgICAgICAgICBpZiAoZSA9PT0gZW5kQ29udGFpbmVyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKE5vZGUuVEVYVF9OT0RFID09PSBlLm5vZGVUeXBlKSB7XG4gICAgICAgICAgICAgICAgd3JhcElmKGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3Qgd2Fsa0lmTm90Q29udGFpbmVkID0gKGVsKSA9PiB7XG4gICAgICAgICAgICB3cmFwSWYoZWwpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHdoaWxlIChuZXh0ICE9PSBudWxsICYmIG5leHQgIT09IGVuZENvbnRhaW5lcikge1xuICAgICAgICAgICAgdmFyIGN1cnJlbnROZXh0ID0gbmV4dDtcbiAgICAgICAgICAgIG5leHQgPSBuZXh0Lm5leHRTaWJsaW5nO1xuICAgICAgICAgICAgLy8gRm91bmQgYSB0ZXh0IG5vZGUsIGRpcmVjdGx5IHdyYXAgaW5zaWRlIGEgc3BhblxuICAgICAgICAgICAgaWYgKE5vZGUuVEVYVF9OT0RFID09PSBjdXJyZW50TmV4dC5ub2RlVHlwZSkge1xuICAgICAgICAgICAgICAgIHdyYXBJZihjdXJyZW50TmV4dCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICgoY3VycmVudE5leHQuY29tcGFyZURvY3VtZW50UG9zaXRpb24oZW5kQ29udGFpbmVyKSAmIERPQ1VNRU5UX1BPU0lUSU9OX0NPTlRBSU5FRF9CWSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53YWxrRG9tKGN1cnJlbnROZXh0LCB3YWxrSWZDb250YWluZWQpO1xuICAgICAgICAgICAgICAgICAgICBmb3VuZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fd2Fsa1RleHROb2RlcyhjdXJyZW50TmV4dCwgd2Fsa0lmTm90Q29udGFpbmVkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGZvdW5kKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZm91bmQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVjdXJzaXZlbHkgd2Fsa3MgdGhlIGRvbSB0cmVlIHVubGVzcyBmdW5jIHJldHVybnMgZmFsc2VcbiAgICAgKiBUaGlzIGlzIGEgbG90IG1vcmUgZWZmaWNpZW50IHRoZW4gdXNpbmcgYW55IGpRdWVyeSBvcGVyYXRpb25zXG4gICAgICpcbiAgICAgKiBBcHBsaWVzIG5vZGUgdG8gZnVuY3Rpb25cbiAgICAgKiBAcGFyYW0gbm9kZVxuICAgICAqIEBwYXJhbSBmdW5jXG4gICAgICogQHJldHVybnMgeyp9XG4gICAgICovXG4gICAgd2Fsa0RvbShub2RlLCBmdW5jKSB7XG4gICAgICAgIGlmICghbm9kZSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNoaWxkcmVuID0gbm9kZS5jaGlsZE5vZGVzO1xuICAgICAgICBpZiAoIWNoaWxkcmVuKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKCF0aGlzLndhbGtEb20oY2hpbGRyZW5baV0sIGZ1bmMpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmdW5jKG5vZGUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1hcmtzIHRleHQgb2YgdGhlIHNhbWUgbm9kZVxuICAgICAqIEBwYXJhbSB7Tm9kZX0gdGV4dE5vZGVcbiAgICAgKiBAcGFyYW0ge2ludH0gc3RhcnRJbmRleFxuICAgICAqIEBwYXJhbSB7aW50fSBlbmRJbmRleFxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX21hcmtUZXh0U2FtZU5vZGUodGV4dE5vZGUsIHN0YXJ0SW5kZXgsIGVuZEluZGV4KSB7XG5cbiAgICAgICAgY29uc3QgaW5pdGlhbFRleHQgPSB0ZXh0Tm9kZS5ub2RlVmFsdWUsXG4gICAgICAgICAgICBpbml0aWFsSW5kZXggPSBVdGlsLmNhbGNJbmRleCh0ZXh0Tm9kZSk7XG5cbiAgICAgICAgaWYgKCFpbml0aWFsVGV4dCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9JZiB0aGVyZSBpcyBhbiB1bm1hcmtlZCBwYXJ0IGluIHRoZSBiZWdpbm5pbmcgb2YgdGhlIHRleHQgbm9kZSxcbiAgICAgICAgLy9jdXQgb2ZmIHRoYXQgcGFydCBhbmQgcHV0IGl0IGludG8gaXQncyBvd24gdGV4dG5vZGUuXG4gICAgICAgIGlmIChzdGFydEluZGV4ID4gMCkge1xuICAgICAgICAgICAgY29uc3QgdGV4dEJlZm9yZSA9IGluaXRpYWxUZXh0LnNsaWNlKDAsIHN0YXJ0SW5kZXgpO1xuICAgICAgICAgICAgdGV4dE5vZGUucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUodGhpcy5kb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0ZXh0QmVmb3JlKSwgdGV4dE5vZGUpO1xuICAgICAgICAgICAgLy8gd3JhcCBjdXR0ZWQgdGV4dCBub2RlOlxuICAgICAgICAgICAgVXRpbC53cmFwKHRleHROb2RlLnByZXZpb3VzU2libGluZywgdGhpcy5fY3JlYXRlU3BsaXRDb250YWluZXIodGV4dE5vZGUsXG4gICAgICAgICAgICAgICAgaW5pdGlhbEluZGV4LCBSZW5kZXJpbmcuX2dldE9mZnNldFBhcmVudElmSGFzKHRleHROb2RlKSkpO1xuICAgICAgICB9XG4gICAgICAgIC8vSWYgdGhlcmUgaXMgYW4gdW5tYXJrZWQgcGFydCBhdCB0aGUgZW5kIG9mIHRoZSB0ZXh0IG5vZGUsXG4gICAgICAgIC8vY3V0IG9mZiB0aGF0IHBhcnQgYW5kIHB1dCBpdCBpbnRvIGl0J3Mgb3duIHRleHRub2RlLlxuICAgICAgICBpZiAoZW5kSW5kZXggPCBpbml0aWFsVGV4dC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnN0IHRleHRBZnRlciA9IGluaXRpYWxUZXh0LnNsaWNlKGVuZEluZGV4LCBpbml0aWFsVGV4dC5sZW5ndGgpO1xuICAgICAgICAgICAgdGV4dE5vZGUucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUodGhpcy5kb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0ZXh0QWZ0ZXIpLCB0ZXh0Tm9kZS5uZXh0U2libGluZyk7XG4gICAgICAgICAgICBVdGlsLndyYXAodGV4dE5vZGUubmV4dFNpYmxpbmcsIHRoaXMuX2NyZWF0ZVNwbGl0Q29udGFpbmVyKHRleHROb2RlLFxuICAgICAgICAgICAgICAgIGluaXRpYWxJbmRleCwgUmVuZGVyaW5nLl9nZXRPZmZzZXRQYXJlbnRJZkhhcyh0ZXh0Tm9kZSkgKyBlbmRJbmRleCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9DdXRvZmYgdGhlIHVubWFya2VkIHBhcnRzIGFuZCB3cmFwIHRoZSB0ZXh0bm9kZSBpbnRvIGEgc3Bhbi5cbiAgICAgICAgdGV4dE5vZGUubm9kZVZhbHVlID0gaW5pdGlhbFRleHQuc2xpY2Uoc3RhcnRJbmRleCwgZW5kSW5kZXgpO1xuICAgICAgICB0aGlzLnN0YXJ0Q29udGFpbmVyID0gdGhpcy5fY3JlYXRlV3JhcCh0ZXh0Tm9kZSxcbiAgICAgICAgICAgIFJlbmRlcmluZy5fZ2V0T2Zmc2V0UGFyZW50SWZIYXModGV4dE5vZGUpICsgc3RhcnRJbmRleCwgaW5pdGlhbEluZGV4LCB0cnVlKS5wYXJlbnROb2RlO1xuICAgICAgICB0aGlzLmVuZENvbnRhaW5lciA9IHRoaXMuc3RhcnRDb250YWluZXI7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXJ0Q29udGFpbmVyO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogTWFya3MgdGV4dCBvZiBlbmQgYW5kIHN0YXJ0IGNvbnRhaW5lcnMgaWYgc3RhcnQgYW5kIGVuZCBub2RlcyBhcmUgZGlmZmVyZW50XG4gICAgICogSW1wb3J0YW50OiBUaGVyZSBtaWdodCBiZSBubyBlbmQgY29udGFpbmVyIVxuICAgICAqXG4gICAgICogQHBhcmFtIHtOb2RlfSBzdGFydENvbnRhaW5lclxuICAgICAqIEBwYXJhbSB7Tm9kZX0gZW5kQ29udGFpbmVyXG4gICAgICogQHBhcmFtIHtpbnR9IHN0YXJ0T2Zmc2V0XG4gICAgICogQHBhcmFtIHtpbnR9IGVuZE9mZnNldFxuICAgICAqIEByZXR1cm5zIHt7c3RhcnRUOiAoTm9kZSksIGVuZFQ6IChOb2RlKX19XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfbWFya1RleHREaWZmZXJlbnROb2RlKHN0YXJ0Q29udGFpbmVyLCBlbmRDb250YWluZXIsIHN0YXJ0T2Zmc2V0LCBlbmRPZmZzZXQpIHtcbiAgICAgICAgLy8gR2V0IGN1cnJlbnQgZm9yIGJvdGggc3RhcnQgYW5kIGVuZDpcbiAgICAgICAgY29uc3Qgc3RhcnRDb250YWluZXJJbmRleCA9IFV0aWwuY2FsY0luZGV4KHN0YXJ0Q29udGFpbmVyKTtcbiAgICAgICAgY29uc3QgZW5kQ29udGFpbmVySW5kZXggPSBVdGlsLmNhbGNJbmRleChlbmRDb250YWluZXIpO1xuXG4gICAgICAgIC8vIFNwbGl0IHRleHRcbiAgICAgICAgY29uc3QgZnVsbFRleHRTdGFydFZhbHVlID0gc3RhcnRDb250YWluZXIubm9kZVZhbHVlO1xuICAgICAgICAvLyBpbml0IHdpdGggc3RhcnRDb250YWluZXIgYmVjYXVzZSB3ZSBtYXkgaGF2ZSBub3QgYSB0ZXh0IG5vZGUgaGVyZVxuICAgICAgICBsZXQgc3RhcnRUID0gc3RhcnRDb250YWluZXI7XG5cbiAgICAgICAgaWYgKHVuZGVmaW5lZCAhPT0gZnVsbFRleHRTdGFydFZhbHVlKSB7XG4gICAgICAgICAgICB2YXIgcGFydFRleHRTdGFydFZhbHVlID0gZnVsbFRleHRTdGFydFZhbHVlLnNsaWNlKHN0YXJ0T2Zmc2V0LCBmdWxsVGV4dFN0YXJ0VmFsdWUubGVuZ3RoKTtcbiAgICAgICAgICAgIC8vIFNldCBuZXcgdGV4dCB0byBzdGFydCBub2RlXG4gICAgICAgICAgICBzdGFydENvbnRhaW5lci5ub2RlVmFsdWUgPSBmdWxsVGV4dFN0YXJ0VmFsdWUuc2xpY2UoMCwgc3RhcnRPZmZzZXQpO1xuXG4gICAgICAgICAgICB2YXIgb2Zmc2V0U3RhcnQgPSBSZW5kZXJpbmcuX2dldE9mZnNldFBhcmVudElmSGFzKHN0YXJ0Q29udGFpbmVyKTtcbiAgICAgICAgICAgIC8vIENyZWF0ZSBhIG5ldyBub2RlIGZvciBzcGxpdHRlZCB0ZXh0LCBvZmZzZXQgaXMgdGhlIGxlbmd0aCBvZiBuZXcgc3RhcnRDb250YWluZXIubm9kZVZhbHVlOlxuICAgICAgICAgICAgc3RhcnRUID0gdGhpcy5fY3JlYXRlU3RhcnRPckVuZENvbnRhaW5lcihzdGFydENvbnRhaW5lciwgdGhpcy5tYXJrZXJQcmVmaXgsIHBhcnRUZXh0U3RhcnRWYWx1ZSxcbiAgICAgICAgICAgICAgICBvZmZzZXRTdGFydCA9PT0gc3RhcnRPZmZzZXQgPyBvZmZzZXRTdGFydCA6IG9mZnNldFN0YXJ0ICsgc3RhcnRPZmZzZXQsIHN0YXJ0Q29udGFpbmVySW5kZXgpO1xuICAgICAgICAgICAgLy8gQXBwZW5kIHRoaXMgbm9kZSBhZnRlciBzdGFydENvbnRhaW5lclxuICAgICAgICAgICAgc3RhcnRDb250YWluZXIucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoc3RhcnRULCBzdGFydENvbnRhaW5lci5uZXh0U2libGluZyk7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0Q29udGFpbmVyID0gc3RhcnRUO1xuXG4gICAgICAgICAgICBpZiAoc3RhcnRDb250YWluZXIubm9kZVZhbHVlKSB7XG4gICAgICAgICAgICAgICAgLy8gV3JhcCBzdGFydCBjb250YWluZXIgaW4gZGV0ZWN0aW9uIG5vZGUsIG9mZnNldCBpcyBhbHdheXMgMCBvciBwYXJlbnQgb2Zmc2V0LlxuICAgICAgICAgICAgICAgIFV0aWwud3JhcChzdGFydENvbnRhaW5lciwgdGhpcy5fY3JlYXRlU3BsaXRDb250YWluZXIoc3RhcnRDb250YWluZXIsIHN0YXJ0Q29udGFpbmVySW5kZXgsXG4gICAgICAgICAgICAgICAgICAgIFJlbmRlcmluZy5fZ2V0T2Zmc2V0UGFyZW50SWZIYXMoc3RhcnRDb250YWluZXIpKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpbml0IHdpdGggZW5kQ29udGFpbmVyIGJlY2F1c2Ugd2UgbWF5IGhhdmUgbm90IGEgdGV4dCBub2RlIGhlcmVcbiAgICAgICAgbGV0IGVuZFQgPSBlbmRDb250YWluZXI7XG5cbiAgICAgICAgLy8gMi4gRXh0cmFjdCBlbmQgVGV4dCBub2RlLFxuICAgICAgICBjb25zdCBmdWxsVGV4dEVuZFZhbHVlID0gZW5kQ29udGFpbmVyLm5vZGVWYWx1ZTtcbiAgICAgICAgLy8gSXQncyBwb3NzaWJsZSB0aGF0IGVuZCBjb250YWluZXIgdmFsdWUgaXMgbnVsbCAoaWYgYSB3aG9sZSBwYXJhZ3JhcGggaXMgbWFya2VkKVxuICAgICAgICBpZiAodW5kZWZpbmVkICE9PSBmdWxsVGV4dEVuZFZhbHVlKSB7XG4gICAgICAgICAgICAvLyBTcGxpdCB0ZXh0XG4gICAgICAgICAgICB2YXIgcGFydFRleHRFbmRWYWx1ZSA9IGZ1bGxUZXh0RW5kVmFsdWUuc2xpY2UoMCwgZW5kT2Zmc2V0KTtcbiAgICAgICAgICAgIGVuZENvbnRhaW5lci5ub2RlVmFsdWUgPSBmdWxsVGV4dEVuZFZhbHVlLnNsaWNlKGVuZE9mZnNldCwgZnVsbFRleHRFbmRWYWx1ZS5sZW5ndGgpO1xuICAgICAgICAgICAgLy8gRW5kIENvbnRhaW5lciBzdGFydCBvZmZzZXQgaXMgYWx3YXlzIDAgb3IgcGFyZW50IG9mZnNldC5cbiAgICAgICAgICAgIGVuZFQgPSB0aGlzLl9jcmVhdGVTdGFydE9yRW5kQ29udGFpbmVyKGVuZENvbnRhaW5lciwgdGhpcy5tYXJrZXJTdWZmaXgsIHBhcnRUZXh0RW5kVmFsdWUsXG4gICAgICAgICAgICAgICAgUmVuZGVyaW5nLl9nZXRPZmZzZXRQYXJlbnRJZkhhcyhlbmRDb250YWluZXIpLCBlbmRDb250YWluZXJJbmRleCk7XG5cbiAgICAgICAgICAgIGVuZENvbnRhaW5lci5wYXJlbnROb2RlLmluc2VydEJlZm9yZShlbmRULCBlbmRDb250YWluZXIpO1xuICAgICAgICAgICAgdGhpcy5lbmRDb250YWluZXIgPSBlbmRUO1xuICAgICAgICAgICAgdmFyIG9mZnNldFBhcmVudCA9IFJlbmRlcmluZy5fZ2V0T2Zmc2V0UGFyZW50SWZIYXMoZW5kQ29udGFpbmVyKTtcbiAgICAgICAgICAgIFV0aWwud3JhcChlbmRDb250YWluZXIsIHRoaXMuX2NyZWF0ZVNwbGl0Q29udGFpbmVyKGVuZENvbnRhaW5lciwgZW5kQ29udGFpbmVySW5kZXgsXG4gICAgICAgICAgICAgICAgb2Zmc2V0UGFyZW50ID09PSBlbmRPZmZzZXQgPyBvZmZzZXRQYXJlbnQgOiBvZmZzZXRQYXJlbnQgKyBlbmRPZmZzZXQpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7c3RhcnRUOiBzdGFydFQsIGVuZFQ6IGVuZFR9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFdpbGwgcmV0dXJuIHRoZSBvcmlnaW5hbCBmaXJzdCBvZmZzZXRcbiAgICAgKiBAcGFyYW0gZWxlbWVudFxuICAgICAqIEByZXR1cm5zIHtpbnR9XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfZmluZE9yaWdpbmFsT2Zmc2V0KGVsZW1lbnQpIHtcbiAgICAgICAgaWYgKCFlbGVtZW50LnBhcmVudE5vZGUuaGFzQXR0cmlidXRlKEFUVFJfREFUQV9PUklHSU5BTF9PRkZTRVRfU1RBUlQpKSB7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBsZW5ndGhFbGVtZW50ID0gVXRpbC5wYXJlbnQoZWxlbWVudCwgJ1snICsgQVRUUl9EQVRBX09SSUdJTkFMX09GRlNFVF9TVEFSVCArICddJyk7XG4gICAgICAgIHJldHVybiBsZW5ndGhFbGVtZW50ID8gcGFyc2VJbnQobGVuZ3RoRWxlbWVudC5nZXRBdHRyaWJ1dGUoQVRUUl9EQVRBX09SSUdJTkFMX09GRlNFVF9TVEFSVCkpIDogMDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW5kZXJzIGEgc2VsZWN0aW9uXG4gICAgICogQHBhcmFtIHtOb2RlfSBzdGFydENvbnRhaW5lclxuICAgICAqIEBwYXJhbSB7Tm9kZX0gZW5kQ29udGFpbmVyXG4gICAgICogQHBhcmFtIHtOb2RlfSBjb21tb25BbmNlc3RvclxuICAgICAqIEBwYXJhbSB7aW50fSBzdGFydE9mZnNldFxuICAgICAqIEBwYXJhbSB7aW50fSBlbmRPZmZzZXRcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFt3aXRob3V0UmVzdWx0XSBpZiB0cnVlIHJlc3VsdCB3aWxsIG5vdCBiZSBjYWxjdWxhdGVkXG4gICAgICogQHJldHVybnMge3tzdGFydE9mZnNldDogKGludCksIGVuZE9mZnNldDogKGludCl9fSB0aGUgb3JpZ2luYWwgb2Zmc2V0cyBmb3VuZFxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX3JlbmRlcldpdGhFbGVtZW50cyhzdGFydENvbnRhaW5lciwgZW5kQ29udGFpbmVyLCBjb21tb25BbmNlc3Rvciwgc3RhcnRPZmZzZXQsIGVuZE9mZnNldCwgd2l0aG91dFJlc3VsdCkge1xuICAgICAgICBsZXQgb3V0ZXIgPSBVdGlsLnBhcmVudHMoc3RhcnRDb250YWluZXIsIGNvbW1vbkFuY2VzdG9yKTtcbiAgICAgICAgb3V0ZXIgPSBvdXRlcltvdXRlci5sZW5ndGggLSAxXTtcbiAgICAgICAgY29uc3QgY29udGV4dENvbnRhaW5lciA9IG91dGVyID8gb3V0ZXIgOiBjb21tb25BbmNlc3RvcjtcblxuICAgICAgICAvLyBTYW1lIEVsZW1lbnQsIG1lYW5zIHRoZSBzZWxlY3Rpb24gaXMgZnVsbHkgY29udGFpbmVkIGluIGEgZGlzY3JldGUgYXJlYSwgc3RhcnQgYW5kIGVuZHBvaW50IGhhdmUgdGhlIHNhbWUgcGFyZW50XG4gICAgICAgIC8vIGJ1dCBhcmUgZGlmZmVyZW50IG5vZGVzOlxuXG4gICAgICAgIC8vIFN0YXJ0IGFuZCBFbmQgb2Zmc2V0IGhhdmUgdG8gYmUgcmVjYWxjdWxhdGVkIGJlY2F1c2UgZG9tIG1pZ2h0IGJlIGFscmVhZHkgY2hhbmdlZCBieSBoaWdobGlnaHRpbmcgaW4gZ2l2ZW4gbm9kZVxuICAgICAgICAvLyAxOiBGaXJzdCBkZXRlY3QgcmVhbCBzdGFydCBvZmZzZXQgaW4gc3RhcnRDb250YWluZXI6XG5cbiAgICAgICAgLy8gVGhhdCB3b3JrcyBieSBzZWxlY3RpbmcgdGhlIGhpZ2hlc3Qgd3JhcHBlciBhbmQgZ2V0IG9yaWdpbmFsLW9mZnNldC1zdGFydCBkYXRhIGVsZW1lbnQsIHNlZSBcImZpbmRPcmlnaW5hbE9mZnNldFwiXG4gICAgICAgIC8vIFNvIGZpcnN0IHNlbGVjdCB0aGF0IGNvbnRhaW5lcjpcbiAgICAgICAgY29uc3Qgb3JpZ2luYWxTdGFydE9mZnNldCA9IHRoaXMuX2ZpbmRPcmlnaW5hbE9mZnNldChzdGFydENvbnRhaW5lcik7XG4gICAgICAgIGNvbnN0IG9yaWdpbmFsRW5kT2Zmc2V0ID0gdGhpcy5fZmluZE9yaWdpbmFsT2Zmc2V0KGVuZENvbnRhaW5lcik7XG5cbiAgICAgICAgLy8gV2UgbWF5IHJ1biBpbnRvIEJyb3dzZXIgQnVnczpcblxuICAgICAgICAvLyBJZiBib3RoIGFyZSBub3QgdGV4dCBub2RlcywgdXNlIG5leHQgc2libGluZyBhcyBlbmRDb250YWluZXJcbiAgICAgICAgaWYgKHN0YXJ0Q29udGFpbmVyLm5vZGVUeXBlICE9PSBOb2RlLlRFWFRfTk9ERSAmJiBlbmRDb250YWluZXIubm9kZVR5cGUgIT09IE5vZGUuVEVYVF9OT0RFKSB7XG4gICAgICAgICAgICBpZiAoc3RhcnRDb250YWluZXIgPT09IGVuZENvbnRhaW5lcikge1xuICAgICAgICAgICAgICAgIGVuZENvbnRhaW5lciA9IGVuZENvbnRhaW5lci5uZXh0RWxlbWVudFNpYmxpbmcgfHwgZW5kQ29udGFpbmVyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIElGIHN0YXJ0L2VuZCBjb250YWluZXIgaXMgbm90IHR5cGUgb2YgdGV4dCwgc2VsZWN0IGZpcnN0IGNoaWxkIHRleHQgbm9kZTpcbiAgICAgICAgLy8gV2UgcnVuIGluIHNvbWUgYnVncyB3aXRoIGZpcmVmb3ggaGVyZSB0aGF0IHNlbGVjdHMgbm8gdGV4dC1ub2RlcyBzb21ldGltZXMsIHRyeWluZyB0byBmaXggdGhpcyBoZXJlXG4gICAgICAgIC8vIFNvbWV0aW1lcyBkb2VzIG5vdCB3b3JrIGNvcnJlY3RseS4uLiAoc3BlY2lhbGx5IHdoZW4gRE9NIHdhcyBtb2RpZmllZClcbiAgICAgICAgaWYgKHN0YXJ0Q29udGFpbmVyLm5vZGVUeXBlICE9PSBOb2RlLlRFWFRfTk9ERSkge1xuICAgICAgICAgICAgdGhpcy53YWxrRG9tKHN0YXJ0Q29udGFpbmVyLCBmdW5jdGlvbiAoZWwpIHtcbiAgICAgICAgICAgICAgICBpZiAoZWwubm9kZVR5cGUgPT09IE5vZGUuVEVYVF9OT0RFKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0Q29udGFpbmVyID0gZWw7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlbmRDb250YWluZXIubm9kZVR5cGUgIT09IE5vZGUuVEVYVF9OT0RFKSB7XG4gICAgICAgICAgICAvLyBHZXQgdGhlIGxhc3QgdGV4dCBub2RlOlxuICAgICAgICAgICAgY29uc3QgZW5kQ29udGFpbmVyQ29udGVudHMgPSBVdGlsLmNsb3Nlc3Qoc3RhcnRDb250YWluZXIsICc6bm90KFsnICsgREFUQV9JU19TRUxFQ1RJT04gKyAnXSknKS5jaGlsZE5vZGVzO1xuICAgICAgICAgICAgaWYgKGVuZENvbnRhaW5lckNvbnRlbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHIgPSBlbmRDb250YWluZXJDb250ZW50c1tlbmRDb250YWluZXJDb250ZW50cy5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgICAgICBpZiAoci5ub2RlVHlwZSA9PT0gTm9kZS5URVhUX05PREUpIHtcbiAgICAgICAgICAgICAgICAgICAgZW5kQ29udGFpbmVyID0gcjtcbiAgICAgICAgICAgICAgICAgICAgZW5kT2Zmc2V0ID0gci5sZW5ndGg7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGYgPSByLmxhc3RDaGlsZDtcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKGYgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmICYmIGYubm9kZVR5cGUgPT09IE5vZGUuVEVYVF9OT0RFKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5kQ29udGFpbmVyID0gZjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmRPZmZzZXQgPSBmLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZi5wYXJlbnROb2RlLmhhc0F0dHJpYnV0ZShBVFRSX0RBVEFfT1JJR0lOQUxfT0ZGU0VUX1NUQVJUKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmRPZmZzZXQgPSBwYXJzZUludChmLnBhcmVudE5vZGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXRBdHRyaWJ1dGUoQVRUUl9EQVRBX09SSUdJTkFMX09GRlNFVF9TVEFSVCkpICsgZW5kT2Zmc2V0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGYgPSBmLmxhc3RDaGlsZDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIHN0aWxsIG5vIHRleHROb2RlP1xuICAgICAgICAgICAgaWYgKGVuZENvbnRhaW5lci5ub2RlVHlwZSAhPT0gTm9kZS5URVhUX05PREUpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyAnQ291bGQgbm90IGZvdW5kIGVuZENvbnRhaW5lciwgaGlnaGxpZ2h0aW5nIHdvdWxkIGJlIHVuc3RhYmxlJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHZhciByZXN1bHQgPSB3aXRob3V0UmVzdWx0IHx8IHtcbiAgICAgICAgICAgICAgICAvLyBSZWFsIG9mZnNldCBpcyBjYWxjdWxhdGVkIGJ5IHJlbGF0aXZlIGxlbmd0aCBhbmQgYWJzb2x1dGUgbGVuZ3RoXG4gICAgICAgICAgICAgICAgc3RhcnRPZmZzZXQ6IG9yaWdpbmFsU3RhcnRPZmZzZXQgKyBzdGFydE9mZnNldCxcbiAgICAgICAgICAgICAgICBlbmRPZmZzZXQ6IG9yaWdpbmFsRW5kT2Zmc2V0ICsgZW5kT2Zmc2V0LFxuICAgICAgICAgICAgICAgIC8vIGdldCB0aGUgcGF0aCBmb3IgdGhpcyBzZWxlY3Rpb25cbiAgICAgICAgICAgICAgICBzdGFydENvbnRhaW5lclBhdGg6IFV0aWwuZ2V0UGF0aChzdGFydENvbnRhaW5lciwgdGhpcy5jb250ZXh0KSxcbiAgICAgICAgICAgICAgICBlbmRDb250YWluZXJQYXRoOiBVdGlsLmdldFBhdGgoZW5kQ29udGFpbmVyLCB0aGlzLmNvbnRleHQpXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuX3JlbmRlclNlbGVjdGlvbihzdGFydENvbnRhaW5lciwgZW5kQ29udGFpbmVyLCBzdGFydE9mZnNldCwgZW5kT2Zmc2V0LCBjb250ZXh0Q29udGFpbmVyLCBvdXRlcik7XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW5kZXJzIGEgZ2l2ZW4gc2VsZWN0aW9uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge05vZGV9IHN0YXJ0Q29udGFpbmVyXG4gICAgICogQHBhcmFtIHtOb2RlfSBlbmRDb250YWluZXJcbiAgICAgKiBAcGFyYW0ge2ludH0gc3RhcnRPZmZzZXRcbiAgICAgKiBAcGFyYW0ge2ludH0gZW5kT2Zmc2V0XG4gICAgICogQHBhcmFtIHtOb2RlfSBjb250ZXh0Q29udGFpbmVyXG4gICAgICogQHBhcmFtIHtOb2RlfSBvdXRlclxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX3JlbmRlclNlbGVjdGlvbihzdGFydENvbnRhaW5lciwgZW5kQ29udGFpbmVyLCBzdGFydE9mZnNldCwgZW5kT2Zmc2V0LCBjb250ZXh0Q29udGFpbmVyLCBvdXRlcikge1xuXG4gICAgICAgIC8vIGlmIHN0YXJ0IGFuZCBlbmQtY29udGFpbmVyIGFyZSB0aGUgc2FtZSwgbWFyayB0ZXh0IG9uIHRoZSBzYW1lIG5vZGVcbiAgICAgICAgaWYgKHN0YXJ0Q29udGFpbmVyID09PSBlbmRDb250YWluZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX21hcmtUZXh0U2FtZU5vZGUoc3RhcnRDb250YWluZXIsIHN0YXJ0T2Zmc2V0LCBlbmRPZmZzZXQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHRoaXMuX21hcmtUZXh0RGlmZmVyZW50Tm9kZShzdGFydENvbnRhaW5lciwgZW5kQ29udGFpbmVyLCBzdGFydE9mZnNldCwgZW5kT2Zmc2V0KTtcbiAgICAgICAgICAgIGlmICghb3V0ZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLndyYXBTaWJsaW5ncyhyZXN1bHQuc3RhcnRULm5leHRTaWJsaW5nLCBlbmRDb250YWluZXIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLndhbGsocmVzdWx0LnN0YXJ0VCwgZW5kQ29udGFpbmVyLCBjb250ZXh0Q29udGFpbmVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogRGVzZXJpYWxpemUgYSBzcGVjaWZpYyBwYXRoIGFuZCBmaW5kcyB0aGUgcmlnaHQgdGV4dE5vZGVzXG4gICAgICogVGhpcyBldmVuIHdvcmtzIHdoZW4gRE9NIGhhcyBiZWVuIG1hbmlwdWxhdGVkIGJlZm9yZSBieSBgbWFya2xpYmBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGF0aCB0aGUgc2VyaWFsaXplZCBwYXRoIChpbmNsdWRpbmcgb2Zmc2V0cylcbiAgICAgKiBAcmV0dXJuIHtOb2RlfVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2Rlc2VyaWFsaXplUGF0aChwYXRoKSB7XG4gICAgICAgIGNvbnN0IHBTcGxpdCA9IHBhdGguc3BsaXQoJzsnKSwgcCA9IHBTcGxpdFswXSxcbiAgICAgICAgICAgIG9iamVjdEluZGV4ID0gcGFyc2VJbnQocFNwbGl0WzFdKSxcbiAgICAgICAgICAgIGNoYXJPZmZzZXQgPSBwYXJzZUludChwU3BsaXRbMl0pLFxuICAgICAgICAgICAgY29udGFpbmVyID0gdGhpcy5jb250ZXh0LnF1ZXJ5U2VsZWN0b3IocCk7XG4gICAgICAgIGxldCBtYXliZUZvdW5kTm9kZSA9IG51bGw7XG4gICAgICAgIHRoaXMud2Fsa0RvbShjb250YWluZXIsIGZ1bmN0aW9uIChuKSB7XG4gICAgICAgICAgICBpZiAobi5ub2RlVHlwZSA9PT0gTm9kZS5URVhUX05PREUpIHtcbiAgICAgICAgICAgICAgICB2YXIgYXRyT2Zmc2V0U3RhcnQgPSBuLnBhcmVudE5vZGUuZ2V0QXR0cmlidXRlKEFUVFJfREFUQV9PUklHSU5BTF9PRkZTRVRfU1RBUlQpO1xuICAgICAgICAgICAgICAgIGF0ck9mZnNldFN0YXJ0ID0gYXRyT2Zmc2V0U3RhcnQgPT09IG51bGwgPyAwIDogYXRyT2Zmc2V0U3RhcnQ7XG4gICAgICAgICAgICAgICAgdmFyIGF0ckluZGV4ID0gbi5wYXJlbnROb2RlLmdldEF0dHJpYnV0ZShBVFRSX0RBVEFfT1JJR0lOQUxfSU5ERVgpO1xuICAgICAgICAgICAgICAgIGF0ckluZGV4ID0gYXRySW5kZXggPT09IG51bGwgPyBVdGlsLmNhbGNJbmRleChuKSA6IGF0ckluZGV4O1xuICAgICAgICAgICAgICAgIGlmIChwYXJzZUludChhdHJJbmRleCkgPT09IG9iamVjdEluZGV4ICYmIGNoYXJPZmZzZXQgPj0gYXRyT2Zmc2V0U3RhcnQgJiZcbiAgICAgICAgICAgICAgICAgICAgKChwYXJzZUludChhdHJPZmZzZXRTdGFydCkgKyBuLmxlbmd0aCkgPj0gY2hhck9mZnNldCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRoaXNPZmZzZXQgPSBuLnBhcmVudE5vZGVcbiAgICAgICAgICAgICAgICAgICAgICAgIC5oYXNBdHRyaWJ1dGUoQVRUUl9EQVRBX09SSUdJTkFMX09GRlNFVF9TVEFSVCkgPyBjaGFyT2Zmc2V0IC1cbiAgICAgICAgICAgICAgICAgICAgcGFyc2VJbnQobi5wYXJlbnROb2RlXG4gICAgICAgICAgICAgICAgICAgICAgICAuZ2V0QXR0cmlidXRlKEFUVFJfREFUQV9PUklHSU5BTF9PRkZTRVRfU1RBUlQpKSA6IGNoYXJPZmZzZXQ7XG4gICAgICAgICAgICAgICAgICAgIG1heWJlRm91bmROb2RlID0ge25vZGU6IG4sIG9mZnNldDogdGhpc09mZnNldH07XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBtYXliZUZvdW5kTm9kZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQcmVwYXJlcyB0byByZW5kZXIgYSBTZWxlY3Rpb24gd2l0aCBwYXRoIHNlbGVjdG9yc1xuICAgICAqIGBgYFxuICAgICAqIEEgUGF0aCBsb29rcyBsaWtlIHRoaXM6XG4gICAgICpcbiAgICAgKiAjc2VsZWN0b3I7I3RleHRub2RlOyNvZmZzZXRcbiAgICAgKiBgYFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzdGFydFBhdGhcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZW5kUGF0aFxuICAgICAqIEByZXR1cm5zIHsqfVxuICAgICAqL1xuICAgIHJlbmRlcldpdGhQYXRoKHN0YXJ0UGF0aCwgZW5kUGF0aCkge1xuICAgICAgICBjb25zdCBzdGFydENvbnRhaW5lciA9IHRoaXMuX2Rlc2VyaWFsaXplUGF0aChzdGFydFBhdGgpO1xuICAgICAgICBjb25zdCBlbmRDb250YWluZXIgPSB0aGlzLl9kZXNlcmlhbGl6ZVBhdGgoZW5kUGF0aCk7XG4gICAgICAgIGlmIChzdGFydENvbnRhaW5lciAmJiBlbmRDb250YWluZXIgJiYgc3RhcnRDb250YWluZXIubm9kZSAmJiBlbmRDb250YWluZXIubm9kZSkge1xuICAgICAgICAgICAgdmFyIHJhbmdlID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTtcbiAgICAgICAgICAgIHJhbmdlLnNldFN0YXJ0KHN0YXJ0Q29udGFpbmVyLm5vZGUsIHN0YXJ0Q29udGFpbmVyLm9mZnNldCk7XG4gICAgICAgICAgICByYW5nZS5zZXRFbmQoZW5kQ29udGFpbmVyLm5vZGUsIGVuZENvbnRhaW5lci5vZmZzZXQpO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJXaXRoUmFuZ2UocmFuZ2UsIHRydWUpO1xuICAgICAgICAgICAgcmV0dXJuIHJhbmdlO1xuICAgICAgICB9XG4gICAgICAgIHRocm93ICdDb3VsZCBub3QgZmluZCBzdGFydC0gYW5kL29yIGVuZC1jb250YWluZXIgaW4gZG9jdW1lbnQnO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogUHJlcGFyZXMgYSBzZWxlY3Rpb24gd2l0aCBhIHJhbmdlIG9iamVjdFxuICAgICAqIEBwYXJhbSB7UmFuZ2V9IHJhbmdlXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbd2l0aG91dFJlc3VsdF0gb3B0aW9uYWwgZG8gY2FsY3VsYXRlIGEgcmVzdWx0LCB0aGUgc2VsZWN0aW9uIHdvdWxkIG5vdCBiZSBzZXJpYWxpemFibGVcbiAgICAgKiBAcmV0dXJucyB7Kn1cbiAgICAgKi9cbiAgICByZW5kZXJXaXRoUmFuZ2UocmFuZ2UsIHdpdGhvdXRSZXN1bHQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlbmRlcldpdGhFbGVtZW50cyhyYW5nZS5zdGFydENvbnRhaW5lciwgcmFuZ2UuZW5kQ29udGFpbmVyLFxuICAgICAgICAgICAgcmFuZ2UuY29tbW9uQW5jZXN0b3JDb250YWluZXIsIHJhbmdlLnN0YXJ0T2Zmc2V0LCByYW5nZS5lbmRPZmZzZXQsIHdpdGhvdXRSZXN1bHQpO1xuICAgIH1cbn1cblxuIl19

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _Object$defineProperty = __webpack_require__(2)["default"];
	
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
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports["default"] = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};
	
	exports.__esModule = true;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/* global Node, NodeList, Element */
	
	'use strict';
	
	var _createClass = __webpack_require__(9)['default'];
	
	var _classCallCheck = __webpack_require__(10)['default'];
	
	var _Object$defineProperty = __webpack_require__(2)['default'];
	
	_Object$defineProperty(exports, '__esModule', {
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
	                return Math.floor((1 + Math.random()) * 65536).toString(16).substring(1);
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
	                    node = parent;
	                    continue;
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
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9ib3dsaW5neC9Qcm9qZWt0ZS9tYXJrbGliL25vZGVfbW9kdWxlcy9lc2xpbnQtbG9hZGVyL2luZGV4LmpzIS9Vc2Vycy9ib3dsaW5neC9Qcm9qZWt0ZS9tYXJrbGliL3NyYy9tYWluL3V0aWwvVXRpbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLFlBQVksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7O0FBS04sSUFBTSx3QkFBd0IsR0FBRyxxQkFBcUIsQ0FBQztRQUFqRCx3QkFBd0IsR0FBeEIsd0JBQXdCOzs7O0FBSTlCLElBQU0sV0FBVyxHQUFHLGdCQUFnQixDQUFDO1FBQS9CLFdBQVcsR0FBWCxXQUFXOzs7O0FBSWpCLElBQU0saUJBQWlCLEdBQUcsbUJBQW1CLENBQUM7UUFBeEMsaUJBQWlCLEdBQWpCLGlCQUFpQjs7OztBQUk5QixJQUFNLG1CQUFtQixHQUFHLEdBQUcsQ0FBQzs7O0FBR2hDLElBQUksT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUU7QUFDdkMsUUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQztBQUMxQixLQUFDLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxlQUFlLElBQ3pCLENBQUMsQ0FBQyxrQkFBa0IsSUFBSSxDQUFDLENBQUMsaUJBQWlCLElBQzNDLENBQUMsQ0FBQyxnQkFBZ0IsSUFBSSxDQUFDLENBQUMscUJBQXFCLENBQUM7Q0FDckQ7Ozs7Ozs7SUFPSyxJQUFJO2FBQUosSUFBSTs4QkFBSixJQUFJOzs7aUJBQUosSUFBSTs7Ozs7Ozs7O2VBT2Usd0JBQUMsS0FBSyxFQUFFLElBQUksRUFBRTtBQUMvQixtQkFBTyxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUN6RDs7Ozs7Ozs7ZUFPVSxnQkFBRztBQUNWLHFCQUFTLEVBQUUsR0FBRztBQUNWLHVCQUFPLElBQUks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QUFNLEdBQUcsQ0FBQyxJQUFJLFNBQVMsSUFBSSxDQUFDLEVBQUU7QUFDdkMsd0JBQUksSUFBSSxlQUFlLElBQUksU0FBUyxHQUFHLENBQUMsQ0FBQSxBQUFDLEdBQUcsR0FBRyxDQUFDO2lCQUNuRDs7QUFFRCxvQkFBSSxHQUFHLElBQUksSUFBSSxJQUFJLEdBQUcsR0FBRyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUEsQUFBQyxDQUFDOztBQUV2QyxvQkFBSSxNQUFNLEtBQUssT0FBTyxFQUFFO0FBQ3BCLDBCQUFNO2lCQUNUOztBQUVELG9CQUFJLEdBQUcsTUFBTSxDQUFDO2FBQ2pCOztBQUVELG1CQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDNUQ7OztXQWpQQyxJQUFJOzs7cUJBQUosSUFBSSIsImZpbGUiOiIvVXNlcnMvYm93bGluZ3gvUHJvamVrdGUvbWFya2xpYi9ub2RlX21vZHVsZXMvZXNsaW50LWxvYWRlci9pbmRleC5qcyEvVXNlcnMvYm93bGluZ3gvUHJvamVrdGUvbWFya2xpYi9zcmMvbWFpbi91dGlsL1V0aWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBnbG9iYWwgTm9kZSwgTm9kZUxpc3QsIEVsZW1lbnQgKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIEB0eXBlIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBjb25zdCBBVFRSX0RBVEFfT1JJR0lOQUxfSU5ERVggPSAnZGF0YS1vcmlnaW5hbC1pbmRleCc7XG4vKipcbiAqIEB0eXBlIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBjb25zdCBEQVRBX1BTRVVETyA9ICdkYXRhLWlzLXBzZXVkbyc7XG4vKipcbiAqIEB0eXBlIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBjb25zdCBEQVRBX0lTX1NFTEVDVElPTiA9ICdkYXRhLWlzLXNlbGVjdGlvbic7XG4vKipcbiAqIEB0eXBlIHtzdHJpbmd9XG4gKi9cbmNvbnN0IFNFUklBTElaRV9TRVBBUkFUT1IgPSBcIjtcIjtcblxuLy8gcG9seWZpbGwgZm9yIG1hdGNoZXNTZWxlY3RvciwgSUUgMTAvMTEgZG9lcyBub3Qgc3VwcG9ydCBFbGVtZW50Lm1hdGNoZXNcbmlmIChFbGVtZW50ICYmICFFbGVtZW50LnByb3RvdHlwZS5tYXRjaGVzKSB7XG4gICAgdmFyIHAgPSBFbGVtZW50LnByb3RvdHlwZTtcbiAgICBwLm1hdGNoZXMgPSBwLm1hdGNoZXNTZWxlY3RvciB8fFxuICAgICAgICBwLm1vek1hdGNoZXNTZWxlY3RvciB8fCBwLm1zTWF0Y2hlc1NlbGVjdG9yIHx8XG4gICAgICAgIHAub01hdGNoZXNTZWxlY3RvciB8fCBwLndlYmtpdE1hdGNoZXNTZWxlY3Rvcjtcbn1cblxuLyoqXG4gKiBVdGlsaXR5IGNsYXNzXG4gKiBDb250YWlucyBET00vTm9kZSBtYW5pcHVsYXRpb24gaGVscGVyc1xuICovXG5leHBvcnQgZGVmYXVsdFxuY2xhc3MgVXRpbCB7XG4gICAgLyoqXG4gICAgICogRmlsdGVyIGZvciBhIE5vZGVMaXN0XG4gICAgICogQHBhcmFtIHtOb2RlTGlzdH0gbm9kZXNcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jXG4gICAgICogQHJldHVybnMge0FycmF5LjxIVE1MRWxlbWVudD59XG4gICAgICovXG4gICAgc3RhdGljIG5vZGVMaXN0RmlsdGVyKG5vZGVzLCBmdW5jKSB7XG4gICAgICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUuZmlsdGVyLmNhbGwobm9kZXMgfHwgW10sIGZ1bmMpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogR2VuZXJhdGVzIGEgdW5pcXVlIGlkXG4gICAgICogQHJldHVybiB7U3RyaW5nfVxuICAgICAqL1xuICAgIHN0YXRpYyBndWlkKCkge1xuICAgICAgICBmdW5jdGlvbiBzNCgpIHtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLmZsb29yKCgxICsgTWF0aC5yYW5kb20oKSkgKiAweDEwMDAwKVxuICAgICAgICAgICAgICAgIC50b1N0cmluZygxNilcbiAgICAgICAgICAgICAgICAuc3Vic3RyaW5nKDEpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHM0KCkgKyBzNCgpICsgJy0nICsgczQoKSArICctJyArIHM0KCkgKyAnLScgK1xuICAgICAgICAgICAgczQoKSArICctJyArIHM0KCkgKyBzNCgpICsgczQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgYSBnaXZlbiBub2RlIGlzIGVtcHR5XG4gICAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gbm9kZVxuICAgICAqIEByZXR1cm5zIHsqfVxuICAgICAqL1xuICAgIHN0YXRpYyBub2RlSXNFbXB0eShub2RlKSB7XG4gICAgICAgIHJldHVybiBub2RlLm5vZGVWYWx1ZS5tYXRjaCgvXltcXHNdKiQvZyk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBub2RlXG4gICAgICogQHBhcmFtIFtvcHRpb25hbExpc3RdXG4gICAgICogQHJldHVybiB7aW50fSB0aGUgaW5kZXggb2YgdGhpcyBub2RlIGluIGNvbnRleHQgdG8gaXQncyBzaWJsaW5nc1xuICAgICAqL1xuICAgIHN0YXRpYyBpbmRleChub2RlLCBvcHRpb25hbExpc3QpIHtcbiAgICAgICAgY29uc3QgY2hpbGRyZW4gPSBvcHRpb25hbExpc3QgfHwgKG5vZGUubm9kZVR5cGUgPT09IE5vZGUuVEVYVF9OT0RFID9cbiAgICAgICAgICAgICAgICBub2RlLnBhcmVudE5vZGUuY2hpbGROb2RlcyA6IG5vZGUucGFyZW50Tm9kZS5jaGlsZHJlbik7XG4gICAgICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUuaW5kZXhPZi5jYWxsKGNoaWxkcmVuIHx8IFtdLCBub2RlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBXcmFwcyBnaXZlbiBgZWxtc2AgaW4gZ2l2ZW4gYHdyYXBwZXJgXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSB3cmFwcGVyXG4gICAgICogQHBhcmFtIHtIVE1MRWxlbWVudHxBcnJheS48SFRNTEVsZW1lbnQ+fSBlbG1zXG4gICAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAgICovXG4gICAgc3RhdGljIHdyYXAoZWxtcywgd3JhcHBlcikge1xuICAgICAgICBpZiAoIWVsbXMpIHtcbiAgICAgICAgICAgIHJldHVybiB3cmFwcGVyO1xuICAgICAgICB9XG4gICAgICAgIC8vIENvbnZlcnQgYGVsbXNgIHRvIGFuIGFycmF5LCBpZiBuZWNlc3NhcnkuXG4gICAgICAgIGlmICghKGVsbXMgaW5zdGFuY2VvZiBOb2RlTGlzdCB8fCBlbG1zIGluc3RhbmNlb2YgQXJyYXkpKSB7XG4gICAgICAgICAgICBlbG1zID0gW2VsbXNdO1xuICAgICAgICB9XG4gICAgICAgIGZvciAodmFyIGkgPSBlbG1zLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICBjb25zdCBjaGlsZCA9IChpID4gMCkgPyB3cmFwcGVyLmNsb25lTm9kZSh0cnVlKSA6IHdyYXBwZXI7XG4gICAgICAgICAgICBjb25zdCBlbCA9IGVsbXNbaV07XG4gICAgICAgICAgICAvLyBDYWNoZSB0aGUgY3VycmVudCBwYXJlbnQgYW5kIHNpYmxpbmcuXG4gICAgICAgICAgICBjb25zdCBwYXJlbnQgPSBlbC5wYXJlbnROb2RlLCBzaWJsaW5nID0gZWwubmV4dFNpYmxpbmc7XG5cbiAgICAgICAgICAgIGNoaWxkLmFwcGVuZENoaWxkKGVsKTtcbiAgICAgICAgICAgIGlmIChzaWJsaW5nKSB7XG4gICAgICAgICAgICAgICAgcGFyZW50Lmluc2VydEJlZm9yZShjaGlsZCwgc2libGluZyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHBhcmVudC5hcHBlbmRDaGlsZChjaGlsZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHdyYXBwZXI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogV2lsbCBjYWxjdWxhdGUgYW4gaW5kZXggZGVwZW5kaW5nIG9uIGFuIGFscmVhZHkgbW9kaWZpZWQgZG9tIGJ5IG1hcmtsaWJcbiAgICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBub2RlXG4gICAgICogQHJldHVybnMge2ludHxib29sZWFufVxuICAgICAqL1xuICAgIHN0YXRpYyBjYWxjSW5kZXgobm9kZSkge1xuICAgICAgICBsZXQgY2FsY3VsYXRlZEluZGV4ID0gMCxcbiAgICAgICAgICAgIGZvdW5kV3JhcHBlciA9IGZhbHNlO1xuICAgICAgICBjb25zdCBub2RlcyA9IG5vZGUuY2hpbGROb2RlcywgbGVuZ3RoID0gbm9kZXMubGVuZ3RoO1xuICAgICAgICBmb3IgKGxldCB0aGlzSW5kZXggPSAwOyB0aGlzSW5kZXggPCBsZW5ndGg7IHRoaXNJbmRleCsrKSB7XG4gICAgICAgICAgICBjb25zdCBlbCA9IG5vZGVzW3RoaXNJbmRleF07XG4gICAgICAgICAgICBpZiAoZWwgPT09IG5vZGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBtYXliZUluZGV4T2ZPcmlnaW5hbCA9IGVsLmdldEF0dHJpYnV0ZShBVFRSX0RBVEFfT1JJR0lOQUxfSU5ERVgpO1xuICAgICAgICAgICAgY29uc3QgaXNPcmlnaW5hbCA9IG1heWJlSW5kZXhPZk9yaWdpbmFsICE9PSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAvLyBJbXBvcnRhbnQ6IGRvIG5vdCBpbmNsdWRlIHBzZXVkbyBlbGVtZW50c1xuICAgICAgICAgICAgaWYgKGVsICE9PSBub2RlICYmIChlbC5ub2RlVHlwZSAhPT0gTm9kZS5URVhUX05PREUgfHwgaXNPcmlnaW5hbCkgJiYgIWVsLmhhc0F0dHJpYnV0ZShEQVRBX1BTRVVETykpIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNPcmlnaW5hbCkge1xuICAgICAgICAgICAgICAgICAgICBjYWxjdWxhdGVkSW5kZXggPSBwYXJzZUludChtYXliZUluZGV4T2ZPcmlnaW5hbCk7XG4gICAgICAgICAgICAgICAgICAgIGZvdW5kV3JhcHBlciA9IHRydWU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsY3VsYXRlZEluZGV4Kys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmb3VuZFdyYXBwZXIgPyBjYWxjdWxhdGVkSW5kZXggOiBVdGlsLmluZGV4KG5vZGUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IFtvcHRpb25hbFNlbGVjdG9yXSB3aWxsIHRlc3QgZ2l2ZW4gZWxlbWVudCBhZ2FpbnN0IGEgc2VsZWN0b3JcbiAgICAgKiAgaWYgbWF0Y2hlcywgcmV0dXJucyB0aGlzIGVsZW1lbnQgaW1tZWRpYXRlbHlcbiAgICAgKiBAcmV0dXJuIHtBcnJheS48SFRNTEVsZW1lbnQ+fSBhbiBhcnJheSBvZiBhbGwgZm91bmQgcGFyZW50cyBvZiBnaXZlbiBlbGVtZW50IChhbmQgb3B0aW9uYWwgc2VsZWN0b3IpXG4gICAgICovXG4gICAgc3RhdGljIHBhcmVudHMoZWwsIG9wdGlvbmFsU2VsZWN0b3IpIHtcbiAgICAgICAgbGV0IGVsZW1lbnQgPSBlbDtcbiAgICAgICAgY29uc3QgZm91bmRFbGVtZW50cyA9IFtdO1xuICAgICAgICB3aGlsZSAoZWxlbWVudC5wYXJlbnROb2RlICE9PSBudWxsKSB7XG4gICAgICAgICAgICBlbGVtZW50ID0gZWxlbWVudC5wYXJlbnROb2RlO1xuICAgICAgICAgICAgaWYgKG9wdGlvbmFsU2VsZWN0b3IgJiYgKChlbGVtZW50ID09PSBvcHRpb25hbFNlbGVjdG9yKSB8fFxuICAgICAgICAgICAgICAgICggKHR5cGVvZiBvcHRpb25hbFNlbGVjdG9yID09PSAnc3RyaW5nJykgJiYgZWxlbWVudC5tYXRjaGVzICYmIGVsZW1lbnQubWF0Y2hlcyhvcHRpb25hbFNlbGVjdG9yKSkpKSB7XG4gICAgICAgICAgICAgICAgZm91bmRFbGVtZW50cy5wdXNoKGVsZW1lbnQpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICghb3B0aW9uYWxTZWxlY3Rvcikge1xuICAgICAgICAgICAgICAgIGZvdW5kRWxlbWVudHMucHVzaChlbGVtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZm91bmRFbGVtZW50cztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGaW5kcyBhIHBhcmVudCBub2RlICh0aGUgY2xvc2VzdCkgd2l0aCBhIGdpdmVuIHNlbGVjdG9yXG4gICAgICogQHBhcmFtIHtOb2RlfSBlbFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBzZWxlY3RvclxuICAgICAqIEByZXR1cm5zIHtOb2RlfGJvb2x9XG4gICAgICovXG4gICAgc3RhdGljIHBhcmVudChlbCwgc2VsZWN0b3IpIHtcbiAgICAgICAgbGV0IGVsZW1lbnQgPSBlbDtcbiAgICAgICAgd2hpbGUgKGVsZW1lbnQucGFyZW50Tm9kZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgZWxlbWVudCA9IGVsZW1lbnQucGFyZW50Tm9kZTtcbiAgICAgICAgICAgIGlmIChlbGVtZW50Lm1hdGNoZXMgJiYgZWxlbWVudC5tYXRjaGVzKHNlbGVjdG9yKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBlbGVtZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGaW5kcyB0aGUgY2xvc2VzdCBlbGVtZW50IGluY2x1ZGluZyBpdHNlbGYgbWF0Y2hpbmcgYSBnaXZlbiBzZWxlY3RvclxuICAgICAqIEBwYXJhbSB7Tm9kZX0gZWxcbiAgICAgKiBAcGFyYW0gc2VsZWN0b3JcbiAgICAgKiBAcmV0dXJucyB7Tm9kZXxib29sfVxuICAgICAqL1xuICAgIHN0YXRpYyBjbG9zZXN0KGVsLCBzZWxlY3Rvcikge1xuICAgICAgICBsZXQgZWxlbWVudCA9IGVsO1xuICAgICAgICB3aGlsZSAoZWxlbWVudCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKGVsZW1lbnQubWF0Y2hlcyAmJiBlbGVtZW50Lm1hdGNoZXMoc2VsZWN0b3IpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbGVtZW50ID0gZWxlbWVudC5wYXJlbnROb2RlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBuXG4gICAgICogQHJldHVybiB7Ym9vbH1cbiAgICAgKi9cbiAgICBzdGF0aWMgaXNNYXJrTm9kZShuKSB7XG4gICAgICAgIHJldHVybiBuIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgJiYgbi5oYXNBdHRyaWJ1dGUoREFUQV9JU19TRUxFQ1RJT04pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERldGVybWluZXMgdGhlIGNvcnJlY3QgcGF0aHMgYW5kIGV4Y2x1ZGVzIGFsbCBgbWFya2xpYmAgZ2VuZXJhdGVkIGNvbnRlbnRcbiAgICAgKiBUT0RPOiBUbyBpbXByb3ZlIHBlcmZvcm1hbmNlIHdlIGNvdWxkIHNob3J0ZW4gdGhlIHBhdGggaWYgYW4gSUQgaXMgcHJlc2VudCBpbiBpdC5cbiAgICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbFxuICAgICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IFtjb250ZXh0XSBpZiBnaXZlbiBleHRyYWN0aW9uIHBhdGggaXMgcmVsYXRpdmUgdG8gdGhpcyBlbGVtZW50XG4gICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0UGF0aChlbCwgY29udGV4dCkge1xuICAgICAgICB2YXIgcGF0aCA9IG51bGwsIG5vZGUgPSBlbDtcblxuICAgICAgICBjb25zdCBmaWx0ZXJTaWJsaW5ncyA9ICh0aGlzRWwpID0+IHtcbiAgICAgICAgICAgIHJldHVybiAhVXRpbC5pc01hcmtOb2RlKHRoaXNFbCkgJiYgdGhpc0VsLm5vZGVOYW1lID09PSBub2RlLm5vZGVOYW1lO1xuICAgICAgICB9O1xuXG4gICAgICAgIHdoaWxlIChub2RlKSB7XG4gICAgICAgICAgICB2YXIgbmFtZSA9IG51bGw7XG4gICAgICAgICAgICAvLyBJZiBub2RlIGlzIGEgdGV4dC1ub2RlLCBzYXZlIGluZGV4XG4gICAgICAgICAgICBpZiAoTm9kZS5URVhUX05PREUgPT09IG5vZGUubm9kZVR5cGUpIHtcblxuICAgICAgICAgICAgICAgIC8qIEJlY2F1c2Ugbm9kZXMgbWF5IHdyYXBwZWQgaW5zaWRlIGEgaGlnaGxpZ2h0aW5nIG5vZGUsIHdlIG5lZWQgdG8gZmluZCB0aGUgb3JpZ2luYWwgaW5kZXggdGhhdCB3YXNcbiAgICAgICAgICAgICAgICAgKiB2YWxpZCBiZWZvcmUgdGhlIGRvbSBjaGFuZ2VzLiBXZSBzdG9yZSB0aGUgbGFzdCBrbm93biBpbmRleCBwb3NpdGlvbiBpbnNpZGUgYWxsIHdyYXBwZXIgZWxlbWVudHNcbiAgICAgICAgICAgICAgICAgKiBXZSBzZWxlY3QgdGhlIG91dGVybW9zdFxuICAgICAgICAgICAgICAgICAqL1xuXG4gICAgICAgICAgICAgICAgLy8gRXh0cmFjdCBvcmlnaW5hbCBpbmRleCBvZiB0aGlzIG5vZGU6XG4gICAgICAgICAgICAgICAgLy8gT3V0ZXIgbW9zdCBkYXRhLW9yaWdpbmFsLWluZGV4IGlzIG9yaWdpbmFsIGluZGV4XG4gICAgICAgICAgICAgICAgY29uc3Qgb3V0ZXJNb3N0RWxlbWVudCA9IFV0aWwucGFyZW50cyhub2RlLCAnWycgKyBBVFRSX0RBVEFfT1JJR0lOQUxfSU5ERVggKyAnXScpLnJldmVyc2UoKVswXTtcbiAgICAgICAgICAgICAgICAvLyBpZiBlbGVtZW50IGlzIG5vdCB5ZXQgd3JhcHBlZCBpbiBzcGFuLCByZWNhbGN1bGF0ZSBpbmRleCBiYXNlZCBvbiBwYXJlbnQgY29udGFpbmVyOlxuICAgICAgICAgICAgICAgIC8vIFdlIGhhdmUgdG8gZG8gdGhpcyBiZWNhdXNlIHRleHQgbm9kZSBpbmRleGVzICE9IGVsZW1lbnQgaW5kZXhlcy4uLlxuICAgICAgICAgICAgICAgIGxldCBjYWxjdWxhdGVkSW5kZXggPSAwO1xuICAgICAgICAgICAgICAgIGlmICghb3V0ZXJNb3N0RWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICBjYWxjdWxhdGVkSW5kZXggPSBVdGlsLmNhbGNJbmRleChub2RlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgaW5kZXggPSBvdXRlck1vc3RFbGVtZW50ID8gcGFyc2VJbnQoXG4gICAgICAgICAgICAgICAgICAgIG91dGVyTW9zdEVsZW1lbnQuZ2V0QXR0cmlidXRlKEFUVFJfREFUQV9PUklHSU5BTF9JTkRFWCkpIDogY2FsY3VsYXRlZEluZGV4O1xuICAgICAgICAgICAgICAgIG5hbWUgPSBTRVJJQUxJWkVfU0VQQVJBVE9SICsgaW5kZXg7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG5hbWUgPSBub2RlLm5vZGVOYW1lO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIW5hbWUpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbmFtZSA9IG5hbWUudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICAgICAgdmFyIHBhcmVudCA9IG5vZGUucGFyZW50Tm9kZTtcbiAgICAgICAgICAgIGlmIChVdGlsLmlzTWFya05vZGUobm9kZSkpIHtcbiAgICAgICAgICAgICAgICBub2RlID0gcGFyZW50O1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gU2VsZWN0IG9ubHkgc2libGluZ3MgdGhhdCBhcmUgbm90IHBhcnQgb2Ygc2VsZWN0aW9uIGFuZCBhcmUgb2YgdGhlIHNhbWUgdHlwZVxuICAgICAgICAgICAgLy8gKGJlY2F1c2Ugd2UgdXNlIG50aC1vZi10eXBlIHNlbGVjdG9yIGxhdGVyKVxuICAgICAgICAgICAgY29uc3Qgc2libGluZ3MgPSBVdGlsLm5vZGVMaXN0RmlsdGVyKHBhcmVudC5jaGlsZHJlbiwgZmlsdGVyU2libGluZ3MpLFxuICAgICAgICAgICAgICAgIG5vZGVJbmRleCA9IFV0aWwuaW5kZXgobm9kZSwgc2libGluZ3MpO1xuXG4gICAgICAgICAgICBpZiAoc2libGluZ3MubGVuZ3RoID4gMSAmJiBub2RlSW5kZXggPj0gMCkge1xuICAgICAgICAgICAgICAgIG5hbWUgKz0gJzpudGgtb2YtdHlwZSgnICsgKG5vZGVJbmRleCArIDEpICsgJyknO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBwYXRoID0gbmFtZSArIChwYXRoID8gJz4nICsgcGF0aCA6ICcnKTtcblxuICAgICAgICAgICAgaWYgKHBhcmVudCA9PT0gY29udGV4dCkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBub2RlID0gcGFyZW50O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHBhdGgucmVwbGFjZShcIiNkb2N1bWVudD5cIiwgXCJcIikucmVwbGFjZSgnPjsnLCAnOycpO1xuICAgIH1cblxufVxuIl19

/***/ }
/******/ ])
});
;
//# sourceMappingURL=site.map