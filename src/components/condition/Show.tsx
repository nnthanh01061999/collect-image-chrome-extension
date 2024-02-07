import React, { PropsWithChildren } from 'react';

interface ShowProps {
    when: boolean;
}

function Show({
    when,
    children,
}: PropsWithChildren<ShowProps>): JSX.Element | null {
    return when ? <>{children}</> : null;
}

export default Show;
