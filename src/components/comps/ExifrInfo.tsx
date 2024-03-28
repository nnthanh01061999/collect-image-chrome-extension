import exifr from 'exifr';
import { PropsWithChildren, useEffect, useState } from 'react';
import ReactJson from 'react-json-view';

type TExifrInfoProps = {
    enabled?: boolean;
    url: string;
};
function ExifrInfo({ children, ...props }: PropsWithChildren<TExifrInfoProps>) {
    const { url, enabled = false } = props;

    const [data, setData] = useState<any>();

    useEffect(() => {
        if (!enabled) return;
        exifr
            .parse(url, true)
            .then((data) => {
                setData(data);
            })
            .catch(() => setData(undefined));
    }, [enabled, url]);

    return (
        <div className='grid max-w-60'>
            <p>{data ? <ReactJson src={data} /> : 'No info'}</p>
        </div>
    );
}

export default ExifrInfo;
