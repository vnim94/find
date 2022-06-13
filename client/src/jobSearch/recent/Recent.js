function Recent() {
    return (
        <div className="py-5 flex justify-center">
            <div className="w-[992px] flex flex-col">
                <div className="mb-2 flex flex-row items-center">
                    <span className="mr-1 material-icons-outlined">history</span>
                    <span className="text-lg">Recent searches</span>
                </div>
                <div className="grid grid-cols-3 gap-x-2">
                    <Card what="web developer" where="All Melbourne VIC"/>
                    <Card what="All jobs" where="Australia"/>
                    <Card what="designer" where="All Melbourne VIC"/>
                </div>
            </div>
        </div>
    )
}

function Card(props) {

    const { what, where } = props;

    return (
        <button className="bg-grey-2 rounded-md">
            <div className="pt-1 px-2 flex flex-row text-green-5">
                <span className="text-base material-icons-outlined">search</span>
                <span className="text-sm">{what}</span>
            </div>
            <div className="pb-1 px-2 flex text-sm">
                <span>{where}</span>
            </div>
        </button>
    )
}

export default Recent;