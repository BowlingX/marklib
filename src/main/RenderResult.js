'use strict';

/**
 * A Render Result
 */
export default class RenderResult {
    /**
     * @param {int} startOffset
     * @param {int} endOffset
     * @param {String} startContainerPath
     * @param {String} endContainerPath
     */
    constructor(startOffset, endOffset, startContainerPath, endContainerPath) {
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
    static fromObject(result) {
        return new RenderResult(
            result.startOffset,
            result.endOffset,
            result.startContainerPath,
            result.endContainerPath
        );
    }

    /**
     * @returns {Object}
     */
    serialize() {
        return {
            startOffset: this.startOffset,
            endOffset: this.endOffset,
            startContainerPath: this.startContainerPath,
            endContainerPath: this.endContainerPath
        }
    }

    /**
     * @param {String} text
     */
    set text(text) {
        this._text = text;
    }

    /**
     * @returns {String}
     */
    get text() {
        return this._text;
    }

    /**
     * @returns {null|Rendering}
     */
    get instance() {
        return this._renderingInstance;
    }

    /**
     * @param {null|Rendering} instance
     */
    set instance(instance) {
        this._renderingInstance = instance;
    }
}