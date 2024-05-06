export const checkImage = (src: string, domain: string, url = '') => {
    if (src.includes('base64')) return src;
    if (src.includes('http://') || src.includes('https://')) {
        return src;
    } else {
        const src_ = src.startsWith('/') ? src : '/' + src;
        if (url.includes('http://')) {
            return `http://${domain}${src_}`;
        }
        if (url.includes('https://')) {
            return `https://${domain}${src_}`;
        }
    }
    return '';
};

export const getFileName = (url: string) => {
    if (url.includes('data:image')) return 'image.svg';
    const fileName = url?.split('/')?.pop()?.split('#')[0]?.split('?')[0];
    return !fileName
        ? 'image.png'
        : fileName.match(
                /\w+\.(jpg|jpeg|jfif|pjpeg|pjp|gif|apng|png|tif|tiff|bmp|svg|webp|ico|cur|bmp)$/gi,
            )
          ? fileName
          : fileName + '.png';
};

export const extractHostname = (url: string) => {
    let hostname;
    //find & remove protocol (http, ftp, etc.) and get hostname

    if (url.indexOf('//') > -1) {
        hostname = url.split('/')[2];
    } else {
        hostname = url.split('/')[0];
    }

    //find & remove port number
    hostname = hostname.split(':')[0];
    //find & remove "?"
    hostname = hostname.split('?')[0];

    return hostname;
};
