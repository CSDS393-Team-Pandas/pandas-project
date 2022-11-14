import * as React from 'react';
import { MaskedTextBox, MaskedTextBoxModel } from '@syncfusion/ej2-inputs';
import { DefaultHtmlAttributes } from '@syncfusion/ej2-react-base';
export interface MaskedTextBoxHtmlAttributes {
    name?: string;
}
/**
 * Represents the React MaskedTextBox Component
 * ```html
 * <MaskedTextBox value={value}></MaskedTextBox>
 * ```
 */
export declare class MaskedTextBoxComponent extends MaskedTextBox {
    state: Readonly<{
        children?: React.ReactNode | React.ReactNode[];
    }> & Readonly<MaskedTextBoxModel & DefaultHtmlAttributes & MaskedTextBoxHtmlAttributes>;
    setState: any;
    private controlAttributes;
    private getDefaultAttributes;
    initRenderCalled: boolean;
    private checkInjectedModules;
    private immediateRender;
    props: Readonly<{
        children?: React.ReactNode | React.ReactNode[];
    }> & Readonly<MaskedTextBoxModel & DefaultHtmlAttributes & MaskedTextBoxHtmlAttributes>;
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
