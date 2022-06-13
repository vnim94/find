function Content() {
    return (
        <div className="bg-grey-1 flex justify-center">
            <div className="w-[992px] py-10 grid grid-cols-2 gap-x-7">
                <div className="h-60 p-7 flex items-center bg-black-2 text-grey-2">
                    <div>
                        <div className="flex flex-col">
                            <span className="font-semibold text-lg">Take advantage of</span>
                            <span className="text-2xl"><b>The Great Job Boom</b></span>
                        </div>
                        <button className="my-3 px-4 py-2 bg-grey-2 font-semibold text-lg text-black-1 rounded-md hover:bg-grey-1">
                            <a href="/">Search jobs</a>
                        </button>
                    </div>
                </div>
                <div className="h-60 p-7 flex items-center bg-black-2 text-grey-2">
                    <div>
                        <div className="flex flex-col">
                            <span className="text-2xl"><b>Hiring?</b></span>
                            <span className="font-semibold text-lg">The best jobs ads find</span> 
                            <span className="font-semibold text-lg">the best people</span>
                        </div>
                        <button className="my-3 px-4 py-2 bg-grey-2 font-semibold text-lg text-black-1 rounded-md hover:bg-grey-1">
                            <a href="/">Find out more</a>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Content;