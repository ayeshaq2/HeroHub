

export default function Profile(){
    return(
        //creating a profile card component
        <>
        
        <div className="relative max-w-md mx-auto md:max-w-2xl mt-6 min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-xl mt-16">
            <div className="justify-center items-center">
                            <div className="relative">
                                <img src="https://github.com/creativetimofficial/soft-ui-dashboard-tailwind/blob/main/build/assets/img/team-2.jpg?raw=true" className="shadow-xl rounded-full align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px]"/>
                            </div>
                        </div>
            <div className="px-6">
                <div className="flex flex-wrap justify-center">
                </div>

                <div className="text-center mt-2">
                    <h3 className="text-2x1 text-slate-700 font-bold leading-normal mb-1">
                        Ayesha Qaisar
                    </h3>
                    <div>
                        <i className="fas fa-map-marker-alt mr-2 text-slate-400 opacity-75"/>
                    </div>
                </div>
                <div className="mt-6 py-6 border-t border-slate-200 text-center">
                    <div className="flex flex-wrap justify-center">
                        <div className="w-full px-4">
                            <p className="font-light leading-relaxed text-slate-600 mb-4">some infor i guess</p>
                        </div>

                    </div>

                </div>
            </div>
        </div>

        <footer className="relative pt-6 pb-2 mt-6">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap items-center md:justify-between justify-center">
                    <div className="w-full md:w-6/12 px-4 mx-auto text-center">
                    <div className="text-sm text-slate-500 font-semibold py-1">
                        Some footer bla bla
                    </div>
                    </div>
                </div>
            </div>
        </footer>



        </>

    )


}