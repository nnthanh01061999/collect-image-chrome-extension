export const copyTextToClipboard = (id: string) => {
    const copyText = document.getElementById(id) as HTMLInputElement;
    if (copyText) {
        copyText.select();
        copyText.setSelectionRange(0, 99999); /* For mobile devices */
        navigator.clipboard.writeText(copyText.value);
    }
};
