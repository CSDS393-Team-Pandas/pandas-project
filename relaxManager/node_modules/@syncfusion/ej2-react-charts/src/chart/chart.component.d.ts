import * as React from 'react';
import { Chart, ChartModel } from '@syncfusion/ej2-charts';
import { DefaultHtmlAttributes } from '@syncfusion/ej2-react-base';
export interface ChartTypecast {
    tooltipTemplate?: string | Function | any;
}
/**
 * Represents react Chart Component
 * ```tsx
 * <ChartComponent></ChartComponent>
 * ```
 */
export declare class ChartComponent extends Chart {
    state: Readonly<{
        children?: React.ReactNode | React.ReactNode[];
    }> & Readonly<ChartModel & DefaultHtmlAttributes | ChartTypecast>;
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
    }> & Readonly<ChartModel & DefaultHtmlAttributes | ChartTypecast>;
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
