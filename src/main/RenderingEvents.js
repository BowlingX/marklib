/* global Set */

import EventEmitter from 'wolfy87-eventemitter';
import Rendering from './Rendering';
import Util from './util/Util';

/**
 * @type {string}
 */
export const EVENT_CLICK = 'click';

/**
 * @type {string}
 */
export const EVENT_MOUSEENTER = 'hover-enter';

/**
 * @type {string}
 */
export const EVENT_MOUSELEAVE = 'hover-leave';

/**
 * @type {string}
 */
export const EVENT_PART_TREE_ENTER = 'tree-enter';

/**
 * @type {string}
 */
export const EVENT_PART_TREE_LEAVE = 'tree-leave';

/**
 * Generic Event Handlings for Renderer
 */
export default class RenderingEvents extends EventEmitter {

    /**
     * @param {Object} options
     * @param {Document} document
     */
    constructor(options, document) {
        super();

        /**
         * Options
         * @type {Object}
         */
        this.options = {
            hoverClass: 'marklib--hover',
            treeClass: 'marklib--tree',
            className: ['marking']
        };

        this.options = Object.assign(this.options, options || {});

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
    get range() {
        const range = this.document.createRange();
        const textNodes = [];

        this.wrapperNodes.forEach((wrapper) => {
            Util.walkTextNodes(wrapper, (node) => {
                textNodes.push(node);
            });
        });

        if (textNodes.length > 0) {
            const lastTextNode = textNodes[textNodes.length - 1];
            range.setStart(textNodes[0], 0);
            range.setEnd(lastTextNode, lastTextNode.length);
            return range;
        }

        return null;
    }

    /**
     * Will register events if not already bind.
     * @param {Document} document
     * @private
     */
    _registerEvents(document) {
        this.on(EVENT_MOUSEENTER, () => {
            this.wrapperNodes.forEach((node) => {
                node.classList.add(this.options.hoverClass);
            });
        });

        this.on(EVENT_MOUSELEAVE, () => {
            this.wrapperNodes.forEach((node) => {
                node.classList.remove(this.options.hoverClass);
            });
        });

        this.on(EVENT_PART_TREE_ENTER, () => {
            this.wrapperNodes.forEach((node) => {
                node.classList.add(this.options.treeClass);
            });
        });

        this.on(EVENT_PART_TREE_LEAVE, () => {
            this.wrapperNodes.forEach((node) => {
                node.classList.remove(this.options.treeClass);
            });
        });


        if (!global.__MARKLIB_EVENTS__) {
            global.__MARKLIB_EVENTS__ = true;
            (function init() {
                const currentHoverInstances = new Set();
                const betweenInstances = new Set();

                function checkMarklibInstance(e) {
                    const instance = Rendering.getMarklibInstance(e);
                    // instanceof check will fail if used in test scenario where different DOMs are used
                    // see also http://perfectionkills.com/instanceof-considered-harmful-or-how-to-write-a-robust-isarray/
                    return instance && (instance instanceof Rendering || 'wrapperNodes' in instance);
                }

                function closestInstance(e) {
                    const closest = Util.closestCallback(
                        e.target,
                        (thisE) => checkMarklibInstance(thisE)
                    );
                    if (typeof closest === 'object') {
                        return Rendering.getMarklibInstance(closest);
                    }
                    return false;
                }

                function getInstancesBetween(e, instance) {
                    return Util.parentsCallback(
                        e.target,
                        (el) => checkMarklibInstance(el) && Rendering.getMarklibInstance(el) !== instance
                    ).map(el => Rendering.getMarklibInstance(el));
                }

                function mouseOutClear() {
                    currentHoverInstances.forEach((thisInstance) => {
                        thisInstance.emit(EVENT_MOUSELEAVE);
                    });
                    currentHoverInstances.clear();

                    betweenInstances.forEach((thisInstance) => {
                        thisInstance.emit(EVENT_PART_TREE_LEAVE);
                    });

                    betweenInstances.clear();
                }

                /**
                 * @param {Event} e
                 * @returns {Array|boolean}
                 */
                function findTarget(e) {
                    let instance = closestInstance(e);
                    if (instance) {
                        const between = getInstancesBetween(e, instance);
                        if (e.target.textContent !== instance.result.text && between.length > 0) {
                            let allInstances = between;
                            allInstances.unshift(instance);
                            // take the smallest selection
                            allInstances = allInstances.sort(
                                (a, b) => a.result.text.length < b.result.text.length ? -1 : 1
                            );
                            instance = allInstances[0];
                        }

                        return [instance, between];
                    }
                    return false;
                }

                document.addEventListener('click', (e) => {
                    const target = findTarget(e);
                    if (target) {
                        target[0].emit(EVENT_CLICK, e, target[1]);
                    }
                }, true);

                document.addEventListener('mouseover', (e) => {
                    const target = findTarget(e);
                    if (target) {
                        const [instance, between] = target;
                        // find instances that lay in between the node
                        mouseOutClear();
                        between.forEach((instanceBetween) => {
                            betweenInstances.add(instanceBetween);
                            instanceBetween.emit(EVENT_PART_TREE_ENTER, e, between);
                        });
                        instance.emit(EVENT_MOUSEENTER, e, between);
                        currentHoverInstances.add(instance);
                    } else {
                        mouseOutClear();
                    }
                }, true);
            })();
        }
    }
}
