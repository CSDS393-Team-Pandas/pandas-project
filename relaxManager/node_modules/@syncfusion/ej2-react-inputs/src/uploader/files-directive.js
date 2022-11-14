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
 * `FilesDirective` represent a file of the react uploader.
 * It must be contained in a Uploader component(`UploaderComponent`).
 * ```tsx
 * <UploaderComponent multiple={true}>
 *   <FilesDirective>
 *    <FileDirective name='Java' size=23000 type='pdf'><FileDirective>
 *    <FileDirective name='C++' size=30000 type='.docx'><FileDirective>
 *   </FilesDirective>
 * </UploaderComponent>
 * ```
 */
var UploadedFilesDirective = /** @class */ (function (_super) {
    __extends(UploadedFilesDirective, _super);
    function UploadedFilesDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UploadedFilesDirective.moduleName = 'uploadedFiles';
    return UploadedFilesDirective;
}(ComplexBase));
export { UploadedFilesDirective };
var FilesDirective = /** @class */ (function (_super) {
    __extends(FilesDirective, _super);
    function FilesDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FilesDirective.propertyName = 'files';
    FilesDirective.moduleName = 'files';
    return FilesDirective;
}(ComplexBase));
export { FilesDirective };
