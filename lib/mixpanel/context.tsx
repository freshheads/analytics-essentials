'use client';

import React, { createContext, useContext, useEffect } from 'react';
import { MixpanelEvent, MixpanelPageViewEvent } from './types';
import {
    extractUtmParams,
    isStandalonePWA,
    writeUtmParamsToSessionStorage,
} from './utils.ts';

interface MixpanelContextProps {
    trackEvent: (event: MixpanelEvent) => void;
    trackPageView: (event: MixpanelPageViewEvent) => void;
}

interface MixpanelProviderProps {
    children: React.ReactNode;
    eventApiClient: (
        args: MixpanelEvent | MixpanelPageViewEvent
    ) => Promise<unknown>;
    defaultEventContext?: MixpanelEvent['context'];
}

const MixpanelContext = createContext<MixpanelContextProps | null>(null);

export function useMixpanelContext() {
    const context = useContext(MixpanelContext);

    if (!context) {
        throw new Error('<MixpanelProvider /> not found');
    }

    return context;
}

export function MixpanelProvider({
    children,
    eventApiClient,
    defaultEventContext,
}: MixpanelProviderProps) {
    const trackEvent = (event: MixpanelEvent) => {
        // only send events on the client
        if (typeof window === 'undefined') {
            return;
        }

        const utmParams = extractUtmParams(window.location.search);

        eventApiClient({
            ...event,
            context: {
                title: document.title,
                pathname: window.location.pathname,
                pwa: isStandalonePWA(),
                ...defaultEventContext,
                ...utmParams,
                ...event.context,
            },
        }).catch((e) => console.error(e));
    };

    const trackPageView = (event: MixpanelPageViewEvent) => {
        // only send events on the client
        if (typeof window === 'undefined') {
            return;
        }

        const utmParams = extractUtmParams(window.location.search);

        eventApiClient({
            ...event,
            name: 'Page view',
            context: {
                pwa: isStandalonePWA(),
                ...utmParams,
                ...event.context,
            },
        }).catch((e) => console.error(e));
    };

    useEffect(() => {
        writeUtmParamsToSessionStorage(window.location.search);
    }, []);

    return (
        <MixpanelContext.Provider
            value={{
                trackEvent,
                trackPageView,
            }}
        >
            {children}
        </MixpanelContext.Provider>
    );
}
