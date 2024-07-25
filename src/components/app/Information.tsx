type TInformationProps = {
    total: number;
    selected: number;
};
function Information(props: TInformationProps) {
    const { total, selected } = props;
    return (
        <div className='grid grid-flow-col gap-2'>
            <p>Total: {total}</p>
            <p>Selected: {selected}</p>
        </div>
    );
}

export default Information;
