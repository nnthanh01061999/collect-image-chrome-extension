type TInformationProps = {
    total: number;
    selected: number;
};
function Information(props: TInformationProps) {
    const { total, selected } = props;
    return (
        <div className='grid gap-2 grid-flow-col'>
            <p>Total: {total}</p>
            <p>Selected: {selected}</p>
        </div>
    );
}

export default Information;
