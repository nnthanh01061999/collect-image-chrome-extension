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
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (!enabled) return;
        setLoading(true);
        exifr
            .parse(url, true)
            .then((data) => {
                setData(data);
            })
            .catch(() => setData(undefined))
            .finally(() => setLoading(false));
    }, [enabled, url]);

    return (
        <div className='grid max-w-65 overflow-auto'>
            {loading ? (
                'Loading'
            ) : data ? (
                <ReactJson src={data} />
            ) : (
                chrome.i18n.getMessage('no_info')
            )}
        </div>
    );
}

export default ExifrInfo;
