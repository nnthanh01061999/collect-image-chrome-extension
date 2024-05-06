export default function FacebookColorIcon(
    props: React.ComponentPropsWithoutRef<'svg'>,
) {
    return (
        <svg
            height='26'
            width='26'
            fill='none'
            viewBox='0 0 26 26'
            xmlns='http://www.w3.org/2000/svg'
            {...props}
        >
            <rect height='26' width='26' fill='#425893' rx='13' />
            <path
                d='M14.333 13.75H16l.666-2.666h-2.333V9.751c0-.687 0-1.334 1.333-1.334h1v-2.24a18.775 18.775 0 0 0-1.904-.093c-1.81 0-3.096 1.105-3.096 3.133v1.867h-2v2.667h2v5.666h2.667v-5.666Z'
                fill='white'
            />
        </svg>
    );
}
