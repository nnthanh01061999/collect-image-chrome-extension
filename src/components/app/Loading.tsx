function Loading() {
    return (
        <div className='absolute inset-0 z-20 flex items-center justify-center'>
            <div className='absolute inset-0 z-10 bg-white opacity-50' />
            <div className='z-30 flex items-center justify-center rounded-sm bg-accent p-4'>
                <p className='text-black'>
                    {chrome.i18n.getMessage('collecting')}!
                </p>
            </div>
        </div>
    );
}

export default Loading;
