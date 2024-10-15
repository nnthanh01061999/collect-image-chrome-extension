function Empty() {
    return (
        <div className='font-silkscreen flex h-full w-full items-center justify-center p-4'>
            <p>{chrome.i18n.getMessage('there_is_nothing_here')}</p>
        </div>
    );
}

export default Empty;
