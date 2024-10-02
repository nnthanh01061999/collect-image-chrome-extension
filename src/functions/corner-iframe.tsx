import CornerIframe from '@/components/content/corner-iframe/CornerIframe';
import { CORNER_IFRAME } from '@/constants';
import { injectReact } from '@/functions/inject-react';

export const showCornerIframe = () => {
    injectReact(CORNER_IFRAME, <CornerIframe/>);
};
