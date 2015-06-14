/* global Node, NodeList, Element */

'use strict';

/**
 * @type {string}
 */
export const ATTR_DATA_ORIGINAL_INDEX = 'data-original-index';
/**
 * @type {string}
 */
export const DATA_PSEUDO = 'data-is-pseudo';
/**
 * @type {string}
 */
export const DATA_IS_SELECTION = 'data-is-selection';
/**
 * @type {string}
 */
const SERIALIZE_SEPARATOR = ";";

// polyfill for matchesSelector, IE 10/11 does not support Element.matches
if (Element && !Element.prototype.matches) {
    var p = Element.prototype;
    p.matches = p.matchesSelector ||
        p.mozMatchesSelector || p.msMatchesSelector ||
        p.oMatchesSelector || p.webkitMatchesSelector;
}

/**
 * Utility class
 * Contains DOM/Node manipulation helpers
 */
export default
class Util {
    /**
     * Filter for a NodeList
     * @param {NodeList} nodes
     * @param {Function} func
     * @returns {Array.<HTMLElement>}
     */
    static nodeListFilter(nodes, func) {
        return Array.prototype.filter.call(nodes || [], func);
    }


    /**
     * Generates a unique id
     * @return {String}
     */
    static guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }

        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }

    /**
     * Checks if a given node is empty
     * @param {HTMLElement} node
     * @returns {*}
     */
    static nodeIsEmpty(node) {
        return node.nodeValue.match(/^[\s]*$/g);
    }


    /**
     * @param {HTMLElement} node
     * @param [optionalList]
     * @return {int} the index of this node in context to it's siblings
     */
    static index(node, optionalList) {
        const children = optionalList || (node.nodeType === Node.TEXT_NODE ?
                node.parentNode.childNodes : node.parentNode.children);
        return Array.prototype.indexOf.call(children || [], node);
    }

    /**
     * Wraps given `elms` in given `wrapper`
     *
     * @param {HTMLElement} wrapper
     * @param {HTMLElement|Array.<HTMLElement>} elms
     * @return {HTMLElement}
     */
    static wrap(elms, wrapper) {
        if (!elms) {
            return wrapper;
        }
        // Convert `elms` to an array, if necessary.
        if (!(elms instanceof NodeList || elms instanceof Array)) {
            elms = [elms];
        }
        for (var i = elms.length - 1; i >= 0; i--) {
            const child = (i > 0) ? wrapper.cloneNode(true) : wrapper;
            const el = elms[i];
            // Cache the current parent and sibling.
            const parent = el.parentNode, sibling = el.nextSibling;

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
     * @param {HTMLElement} node
     * @returns {int|boolean}
     */
    static calcIndex(node) {
        let calculatedIndex = 0,
            foundWrapper = false;
        const nodes = node.childNodes, length = nodes.length;
        for (let thisIndex = 0; thisIndex < length; thisIndex++) {
            const el = nodes[thisIndex];
            if (el === node) {
                return false;
            }
            const maybeIndexOfOriginal = el.getAttribute(ATTR_DATA_ORIGINAL_INDEX);
            const isOriginal = maybeIndexOfOriginal !== undefined;
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

    /**
     * @param {HTMLElement} el
     * @param {String} [optionalSelector] will test given element against a selector
     *  if matches, returns this element immediately
     * @return {Array.<HTMLElement>} an array of all found parents of given element (and optional selector)
     */
    static parents(el, optionalSelector) {
        let element = el;
        const foundElements = [];
        while (element.parentNode !== null) {
            element = element.parentNode;
            if (optionalSelector && ((element === optionalSelector) ||
                ( (typeof optionalSelector === 'string') && element.matches && element.matches(optionalSelector)))) {
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
     * @returns {Node|bool}
     */
    static parent(el, selector) {
        let element = el;
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
     * @returns {Node|bool}
     */
    static closest(el, selector) {
        let element = el;
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
     * @return {bool}
     */
    static isMarkNode(n) {
        return n instanceof HTMLElement && n.hasAttribute(DATA_IS_SELECTION);
    }

    /**
     * Determines the correct paths and excludes all `marklib` generated content
     * TODO: To improve performance we could shorten the path if an ID is present in it.
     * @param {HTMLElement} el
     * @param {HTMLElement} [context] if given extraction path is relative to this element
     * @returns {string}
     */
    static getPath(el, context) {
        var path = null, node = el;

        const filterSiblings = (thisEl) => {
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
                const outerMostElement = Util.parents(node, '[' + ATTR_DATA_ORIGINAL_INDEX + ']').reverse()[0];
                // if element is not yet wrapped in span, recalculate index based on parent container:
                // We have to do this because text node indexes != element indexes...
                let calculatedIndex = 0;
                if (!outerMostElement) {
                    calculatedIndex = Util.calcIndex(node);
                }
                const index = outerMostElement ? parseInt(
                    outerMostElement.getAttribute(ATTR_DATA_ORIGINAL_INDEX)) : calculatedIndex;
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
            const siblings = Util.nodeListFilter(parent.children, filterSiblings),
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

}
