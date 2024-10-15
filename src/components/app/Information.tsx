type TInformationProps = {
    total: number;
    selected: number;
};
function Information(props: TInformationProps) {
    const { total, selected } = props;
    return (
        <div className='font-silkscreen grid grid-flow-col gap-2'>
            <p>
                {chrome.i18n.getMessage('total')}: {total}
            </p>
            <p>
                {chrome.i18n.getMessage('selected')}: {selected}
            </p>
        </div>
    );
}

export default Information;
