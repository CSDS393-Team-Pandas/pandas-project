var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { ComplexBase } from '@syncfusion/ej2-react-base';
/**
 * `ColumnsDirective` represent a columns of the react Kanban board.
 * It must be contained in a Kanban component(`KanbanComponent`).
 * ```tsx
 * <KanbanComponent>
 *  <ColumnsDirective>
 *   <ColumnDirective keyField='Open' textField='To Do'></ColumnDirective>
 *   <ColumnDirective keyField='Close' textField='Completed'></ColumnDirective>
 *  <ColumnsDirective>
 * </KanbanComponent>
 * ```
 */
var ColumnDirective = /** @class */ (function (_super) {
    __extends(ColumnDirective, _super);
    function ColumnDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ColumnDirective.moduleName = 'column';
    return ColumnDirective;
}(ComplexBase));
export { ColumnDirective };
var ColumnsDirective = /** @class */ (function (_super) {
    __extends(ColumnsDirective, _super);
    function ColumnsDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ColumnsDirective.propertyName = 'columns';
    ColumnsDirective.moduleName = 'columns';
    return ColumnsDirective;
}(ComplexBase));
export { ColumnsDirective };
