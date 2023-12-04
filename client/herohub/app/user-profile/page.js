
import { Stack } from '@chakra-ui/react'
import {

    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
  } from '@chakra-ui/react'
  backPort = '3001'
export default function Profile(){
    return(
        //creating a profile card component
        <>
        <Stack>
            <div className="relative max-w-md mx-auto md:max-w-2xl mt-6 min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-xl mt-16">
                <div className='flex justify-center items-center py-5'>
                    <div className="flex-wrap justify-center items-center align-center">
                                    <div className="relative">
                                        {/* <img src="https://github.com/creativetimofficial/soft-ui-dashboard-tailwind/blob/main/build/assets/img/illustrations/rocket-white.png?raw=true" className="shadow-xl rounded-full align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px]"/> */}
                                        <img src="https://github.com/astrit/css.gg/blob/master/icons/png/black/profile.png?raw=true" className="shadow-xl rounded-full align-middle border-none absolute -m-16 -ml-30 lg:-ml-16 max-w-[150px]"/>
                                    </div>
                        </div>
                </div>
                
                <div className="px-6 py-10 text-center mt-2">
                    <div className="text-center mt-2">
                        <h3 className=" text-2x1 text-slate-700 font-bold leading-normal mb-1">
                            Ayesha Qaisar
                        </h3>
                        <i className="fas fa-map-marker-alt text-slate-400 opacity-75"/>
                    </div>
                    <div className="mt-6 py-4 border-t border-slate-200 text-center">
                        <div className="flex flex-wrap justify-center">
                            <div className="w-full px-4">
                                <p className="font-light leading-relaxed text-slate-600 mb-4">some infor i guess</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </Stack>

        <div className='w-full h-20 bg-grey--800'></div>

        {/**Creating private lists */}
        <div className='pt-10 flex justify-center'>
            <div className='w-2/5 bg-red-400 p-6 rounded-md w-4/5 flex justify-center items-center'>
                <Stack className="flex justify-center">
                    <h2 className='font-bold text-center text-2xl'>Create List</h2>
                    <button className='w-2/5 bg-red-300 text-black py-1 pb-2 px-4 mt-2 rounded cursor-pointer hover:bg-red-400 flex justify-center'>cancel</button>
                    <FormControl isRequired className="py-3 pb-1">
                        <FormLabel>Name</FormLabel>
                        <input placeholder='Listname' className='px-2 h-10 rounded-md'></input>
                    </FormControl>
                    <button className='w-3/5 bg-green-300 text-black py-2 pt-1 px-2 mt-2 rounded cursor-pointer hover:bg-green-400'>create list</button>

                </Stack> 
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