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
 * `StackedHeadersDirective` represent a stacked header of the react Kanban board.
 * It must be contained in a Kanban component(`KanbanComponent`).
 * ```tsx
 * <KanbanComponent>
 *  <StackedHeadersDirective>
 *   <StackedHeaderDirective keyField='Open' text='To Do'></StackedHeaderDirective>
 *   <StackedHeaderDirective keyField='Close' text='Completed'></StackedHeaderDirective>
 *  <StackedHeadersDirective>
 * </KanbanComponent>
 * ```
 */
var StackedHeaderDirective = /** @class */ (function (_super) {
    __extends(StackedHeaderDirective, _super);
    function StackedHeaderDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StackedHeaderDirective.moduleName = 'stackedHeader';
    return StackedHeaderDirective;
}(ComplexBase));
export { StackedHeaderDirective };
var StackedHeadersDirective = /** @class */ (function (_super) {
    __extends(StackedHeadersDirective, _super);
    function StackedHeadersDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StackedHeadersDirective.propertyName = 'stackedHeaders';
    StackedHeadersDirective.moduleName = 'stackedHeaders';
    return StackedHeadersDirective;
}(ComplexBase));
export { StackedHeadersDirective };
