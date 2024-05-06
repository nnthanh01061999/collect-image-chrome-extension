import JSZip from 'jszip';
import { getFileName } from '.';
import { Image } from '@/types';
import ExcelJS from 'exceljs';

export function downloadVideoFromUrl(videoUrl: string, fileName: string) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', videoUrl, true);
    xhr.responseType = 'blob';

    xhr.onload = function () {
        if (xhr.status === 200) {
            const blobUrl = URL.createObjectURL(xhr.response);

            const downloadLink = document.createElement('a');
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
                    const fileName = getFileName(item.src);
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
    callback: (item: string) => void,
) => {
    return () => {
        data?.forEach((item) => {
            fetch(item, {
                method: 'GET',
                headers: {},
            })
                .then((response) => {
                    response.arrayBuffer().then((buffer) => {
                        const url = window.URL.createObjectURL(
                            new Blob([buffer]),
                        );
                        const fileName = getFileName(item);
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

export const downloadAllImagesAsZip = (
    imageUrls: string[],
    errorCallback: (errorItem: string) => void,
) => {
    return () => {
        const zip = new JSZip();

        const downloadPromises = imageUrls.map((imageUrl, index) => {
            return fetch(imageUrl)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`Failed to fetch ${imageUrl}`);
                    }
                    return response.blob();
                })
                .then((blob) => {
                    // Extract filename from URL or use index as a fallback
                    const fileName =
                        getFileName(imageUrl) || `image_${index + 1}.jpg`;
                    zip.file(fileName, blob);
                })
                .catch(() => {
                    errorCallback(imageUrl);
                });
        });

        Promise.all(downloadPromises)
            .then(() => {
                return zip.generateAsync({ type: 'blob' });
            })
            .then((zipBlob) => {
                const downloadUrl = URL.createObjectURL(zipBlob);
                const link = document.createElement('a');
                link.href = downloadUrl;
                link.download = 'images.zip';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            });
    };
};

export const exportImageToExcel = (imageUrls: string[]) => () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Images');

    worksheet.addRow(['Image URL']);

    imageUrls.forEach((imageUrl) => {
        worksheet.addRow([imageUrl]);
    });

    workbook.xlsx.writeBuffer().then((buffer) => {
        const blob = new Blob([buffer], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        const downloadUrl = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = 'image_urls.xlsx';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
};
