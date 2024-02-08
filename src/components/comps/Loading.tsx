function Loading() {
    return (
        <div className='inset-0 absolute flex justify-center items-center z-20'>
            <div className='inset-0 absolute bg-white opacity-50 z-10' />
            <div className='bg-accent p-4 flex justify-center items-center rounded-sm z-30'>
                <p className='text-black'>Collecting!</p>
            </div>
        </div>
    );
}

export default Loading;
