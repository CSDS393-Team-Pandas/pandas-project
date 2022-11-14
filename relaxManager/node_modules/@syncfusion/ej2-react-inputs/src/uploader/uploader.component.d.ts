import * as React from 'react';
import { Uploader, UploaderModel } from '@syncfusion/ej2-inputs';
import { DefaultHtmlAttributes } from '@syncfusion/ej2-react-base';
export interface UploaderTypecast {
    template?: string | Function | any;
}
/**
 * Represents the React Uploader Component
 * ```html
 * <UploaderComponent></UploaderComponent>
 * ```
 */
export declare class UploaderComponent extends Uploader {
    state: Readonly<{
        children?: React.ReactNode | React.ReactNode[];
    }> & Readonly<UploaderModel & DefaultHtmlAttributes | UploaderTypecast>;
    setState: any;
    private getDefaultAttributes;
    initRenderCalled: boolean;
    private checkInjectedModules;
    directivekeys: {
        [key: string]: Object;
    };
    private immediateRender;
    props: Readonly<{
        children?: React.ReactNode | React.ReactNode[];
    }> & Readonly<UploaderModel & DefaultHtmlAttributes | UploaderTypecast>;
    forceUpdate: (callBack?: () => any) => void;
    context: Object;
    portals: any;
    isReactComponent: Object;
    refs: {
        [key: string]: React.ReactInstance;
    };
    constructor(props: any);
    render(): any;
}
