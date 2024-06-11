import { getId } from '@/functions/get-id';
import ReactDOM from 'react-dom';

export const injectReact = (
    id: string,
    component: JSX.Element,
    cssURL?: string
) => {
    // Create a div element to mount the React app
    const appId = getId(id);
    const appContainer =
        document.getElementById(appId) || document.createElement('div');
    appContainer.id = appId;

    document.documentElement.appendChild(appContainer);

    const shadowRoot = appContainer.attachShadow({ mode: 'open' });

    const html = document.createElement('html');

    if (cssURL) {
        const cssId = getId(cssURL);
        if (document.getElementById(cssId)) return;
        const link = document.createElement('link');
        link.id = cssId;
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = chrome.runtime.getURL(cssURL);
        link.media = 'all';

        const head = document.createElement('head');
        head.appendChild(link);
        html.appendChild(head);
    }

    const renderIn = document.createElement('body');
    html.appendChild(renderIn);

    shadowRoot.appendChild(html);
    ReactDOM.render(component, renderIn);
};

export const closeReact = (id: string) => {
    const appId = getId(id);
    const app = document.getElementById(appId);
    if (!app) return;
    app.remove();
};
