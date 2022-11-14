import * as React from 'react';
import { Signature, SignatureModel } from '@syncfusion/ej2-inputs';
import { DefaultHtmlAttributes } from '@syncfusion/ej2-react-base';
/**
 * Represents the React Signature Component
 * ```html
 * <SignatureComponent></SignatureComponent>
 * ```
 */
export declare class SignatureComponent extends Signature {
    state: Readonly<{
        children?: React.ReactNode | React.ReactNode[];
    }> & Readonly<SignatureModel & DefaultHtmlAttributes>;
    setState: any;
    private getDefaultAttributes;
    initRenderCalled: boolean;
    private checkInjectedModules;
    private immediateRender;
    props: Readonly<{
        children?: React.ReactNode | React.ReactNode[];
    }> & Readonly<SignatureModel & DefaultHtmlAttributes>;
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
