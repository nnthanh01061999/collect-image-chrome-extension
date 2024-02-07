import { getFileName } from '.';
import { Image } from '../types';

export function downloadVideoFromUrl(videoUrl: string, fileName: string) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', videoUrl, true);
    xhr.responseType = 'blob';

    xhr.onload = function () {
        if (xhr.status === 200) {
            var blobUrl = URL.createObjectURL(xhr.response);

            var downloadLink = document.createElement('a');
            downloadLink.href = blobUrl;
            downloadLink.download = fileName;
            downloadLink.textContent = 'Download Video';

            document.body.appendChild(downloadLink);

            downloadLink.click();

            URL.revokeObjectURL(blobUrl);
            document.body.removeChild(downloadLink);
        }
    };

    xhr.send();
}

export const downLoadImage = (item: Image, callback: (src: string) => void) => {
    return () => {
        fetch(item.src, {
            method: 'GET',
            headers: {},
        })
            .then((response) => {
                response.arrayBuffer().then(function (buffer) {
                    const url = window.URL.createObjectURL(new Blob([buffer]));
                    const link = document.createElement('a');
                    let fileName = getFileName(item.src);
                    link.href = url;
                    link.setAttribute('download', fileName);
                    document.body.appendChild(link);
                    link.click();
                });
            })
            .catch(() => {
                callback(item.src);
            });
    };
};

export const downloadAllImage = (
    data: string[],
    callback: (item: string) => void
) => {
    return () => {
        data?.forEach((item) => {
            fetch(item, {
                method: 'GET',
                headers: {},
            })
                .then((response) => {
                    response.arrayBuffer().then(function (buffer) {
                        const url = window.URL.createObjectURL(
                            new Blob([buffer])
                        );
                        let fileName = getFileName(item);
                        const link = document.createElement('a');
                        link.href = url;
                        link.setAttribute('download', fileName);
                        document.body.appendChild(link);
                        link.click();
                    });
                })
                .catch(() => {
                    callback(item);
                });
        });
    };
};
