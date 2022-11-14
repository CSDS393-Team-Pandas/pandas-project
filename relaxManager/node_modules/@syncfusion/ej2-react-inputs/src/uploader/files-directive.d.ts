import { ComplexBase } from '@syncfusion/ej2-react-base';
import { FilesPropModel } from '@syncfusion/ej2-inputs';
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
export declare class UploadedFilesDirective extends ComplexBase<FilesPropModel, FilesPropModel> {
    static moduleName: string;
}
export declare class FilesDirective extends ComplexBase<{}, {}> {
    static propertyName: string;
    static moduleName: string;
}
