import { Maps } from '../../index';
import { SelectionSettingsModel } from '../index';
/**
 * Selection module class
 */
export declare class Selection {
    private maps;
    /**
     * @private
     */
    selectionsettings: SelectionSettingsModel;
    /**
     * @private
     */
    selectionType: string;
    constructor(maps: Maps);
    /**
     * For binding events to selection module
     *
     * @returns {void}
     */
    private addEventListener;
    /**
     * For removing events from selection modue
     *
     * @returns {void}
     */
    private removeEventListener;
    private mouseClick;
    /**
     * @private
     */
    selectElement(targetElement: Element, layerIndex: number, data: any, shapeData: any): void;
    /**
     * Public method for selection
     */
    addSelection(layerIndex: number, name: string, enable: boolean): void;
    /**
     * Method for selection
     *
     * @param {Element} targetElement - Specifies the target element
     * @param {any} shapeData - Specifies the shape data
     * @param {any} data - Specifies the data
     * @returns {void}
     */
    private selectMap;
    /**
     * Remove legend selection
     */
    /**
     * Get module name.
     *
     * @param {Element} targetElement - Specifies the target element
     * @returns {void}
     * @private
     */
    removedSelectionList(targetElement: Element): void;
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name
     */
    protected getModuleName(): string;
    /**
     * To destroy the selection.
     *
     * @param {Maps} maps - Specifies the maps instance.
     * @returns {void}
     * @private
     */
    destroy(maps: Maps): void;
}
