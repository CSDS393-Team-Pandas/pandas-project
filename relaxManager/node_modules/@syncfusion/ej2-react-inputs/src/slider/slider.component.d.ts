import * as React from 'react';
import { Slider, SliderModel } from '@syncfusion/ej2-inputs';
import { DefaultHtmlAttributes } from '@syncfusion/ej2-react-base';
export interface SliderHtmlAttributes {
    name?: string;
}
/**
 * Represents the React Slider Component
 * ```html
 * <Slider value={value}></Slider>
 * ```
 */
export declare class SliderComponent extends Slider {
    state: Readonly<{
        children?: React.ReactNode | React.ReactNode[];
    }> & Readonly<SliderModel & DefaultHtmlAttributes & SliderHtmlAttributes>;
    setState: any;
    private controlAttributes;
    private getDefaultAttributes;
    initRenderCalled: boolean;
    private checkInjectedModules;
    private immediateRender;
    props: Readonly<{
        children?: React.ReactNode | React.ReactNode[];
    }> & Readonly<SliderModel & DefaultHtmlAttributes & SliderHtmlAttributes>;
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
