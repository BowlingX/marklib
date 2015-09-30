'use strict';

import EventEmitter from 'wolfy87-eventemitter';
import Rendering from 'Rendering';
import Util from 'util/Util';

/**
 * @type {string}
 */
export const EVENT_CLICK = 'click';

export const EVENT_MOUSEENTER = 'mouse-enter';

export const EVENT_MOUSELEAVE = 'mouse-leave';

export const EVENT_PART_TREE_ENTER = 'tree-enter';

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

        if (!document.MARKLIB_EVENTS) {
            document.MARKLIB_EVENTS = true;
            (function () {
                const currentHoverInstances = new Set(),
                      betweenInstances = new Set();

                function isInstance(e) {
                    const closest = Util.closestCallback(
                        e.target,
                        (e) => e.marklibInstance && e.marklibInstance instanceof Rendering
                    );
                    if (typeof closest === 'object') {
                        return closest.marklibInstance;
                    }
                    return false;
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

                document.addEventListener('click', (e) => {
                    const instance = isInstance(e);
                    if (instance) {
                        instance.emit(EVENT_CLICK, e);
                    }
                }, true);

                document.addEventListener('mouseover', (e) => {
                    const instance = isInstance(e);
                    if (instance) {
                        // find instances that lay in between the node
                        let instancesInBetween = Util.parentsCallback(e.target, (el) =>
                            el.marklibInstance && el.marklibInstance instanceof Rendering
                        );
                        instancesInBetween = instancesInBetween.map(el => el.marklibInstance);
                        mouseOutClear();
                        instancesInBetween.forEach((instanceBetween) => {
                            betweenInstances.add(instanceBetween);
                            instanceBetween.emit(EVENT_PART_TREE_ENTER, e, instancesInBetween);
                        });
                        instance.emit(EVENT_MOUSEENTER, e, instancesInBetween);
                        currentHoverInstances.add(instance);
                    } else {
                        mouseOutClear();
                    }
                });

            })();
        }
    }
}


