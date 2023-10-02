import { EventTypes } from './events';

export type ContextType = {
    [index: string]: string | number | object;
};

export type PurchaseEventType = {
    currency: string;
    transaction_id: string;
    value: number;
    coupon?: string;
    shipping?: number;
    tax?: number;
    items: [
        {
            item_id: string;
            item_name: string;
            affiliation?: string;
            price?: number;
            quantity?: number;
        },
        ...{
            item_id: string;
            item_name: string;
            affiliation?: string;
            price?: number;
            quantity?: number;
        }[]
    ];
} & ContextType;

export type ClickEventType = ContextType | undefined;

export type SubmitEventType = ContextType | undefined;

export type CustomEventType = ContextType | undefined;

export type GenericEventType = {
    label: string; // display name instead of custom_event e.g. funnel
    category: string; // e.g. productPage
    action?: string; // viewedStep
    value?: string | number; // e.g. step-1
};

export type TrackEventPropsType = <T extends EventTypes | string>(
    name: T,
    context: T extends EventTypes.CLICK
        ? ClickEventType
        : T extends EventTypes.SUBMIT
        ? SubmitEventType
        : T extends EventTypes.GENERIC
        ? GenericEventType
        : T extends EventTypes.PURCHASE
        ? PurchaseEventType
        : T extends string
        ? CustomEventType
        : never
) => void;

export type PushDataLayerPropsType = TrackEventPropsType & {
    clear?: boolean;
};
