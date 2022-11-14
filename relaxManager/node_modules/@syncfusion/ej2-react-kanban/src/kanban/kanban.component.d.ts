import * as React from 'react';
import { Kanban, KanbanModel } from '@syncfusion/ej2-kanban';
import { DefaultHtmlAttributes } from '@syncfusion/ej2-react-base';
export interface KanbanTypecast {
    tooltipTemplate?: string | Function | any;
    columnsTemplate?: string | Function | any;
    swimlaneSettingsTemplate?: string | Function | any;
    cardSettingsTemplate?: string | Function | any;
    dialogSettingsTemplate?: string | Function | any;
}
/**
 * `KanbanComponent` represents the react Kanban.
 * ```tsx
 * <KanbanComponent/>
 * ```
 */
export declare class KanbanComponent extends Kanban {
    state: Readonly<{
        children?: React.ReactNode | React.ReactNode[];
    }> & Readonly<KanbanModel & DefaultHtmlAttributes | KanbanTypecast>;
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
    }> & Readonly<KanbanModel & DefaultHtmlAttributes | KanbanTypecast>;
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
