import { IPivotValues } from './engine';
/**
 * This is a file to perform common utility for OLAP and Relational datasource
 * @hidden
 */
export declare class PivotExportUtil {
    private static getDefinedObj;
    static getClonedPivotValues(pivotValues: IPivotValues): IPivotValues;
    private static getClonedPivotValueObj;
    static isContainCommonElements(collection1: Object[], collection2: Object[]): boolean;
    static formatPdfHeaderFooter(pdf: any): any;
    static formatPdfExportProperties(pdf: any): any;
    static formatExcelStyle(style: any): any;
    static formatExcelCell(cell: any): any;
    static formatExcelHeaderFooter(excel: any): any;
    static formatExcelExportProperties(excel: any): any;
}
