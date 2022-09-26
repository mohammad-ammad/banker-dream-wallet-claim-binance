import React, { useContext, useState } from 'react'
import {FcSearch} from 'react-icons/fc'
import {SiBinance} from 'react-icons/si'
import LoadingBar from 'react-top-loading-bar';
import { InstanceContext } from '../Context/InstanceContext';

const Landing = () => {
    //---USESTATE
    const [searchVal, setSearchVal] = useState("");
    //---USECONTEXT
    const {search, form, progress, setProgress} = useContext(InstanceContext);

  return (
    <>
    <LoadingBar
        color='#6A0DAD'
        height={3}
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
    />
    <div className='flex justify-center items-center flex-col bg-slate-50 h-screen pt-16 pb-8'>
        <div>
            <h1 className='text-3xl text-purple-600 font-bold'>Bankers Dreams</h1>
        </div>
        <div className='flex justify-start items-center bg-white border-solid border-2 border-purple-600 py-2 px-3 rounded-md mt-2'>
            <input type="text" value={searchVal} onChange={(e) => setSearchVal(e.target.value)} className='w-full md:w-80 outline-none text-sm text-slate-600' placeholder='Wallet Address' name="" id="" />
            <FcSearch onClick={()=>search(searchVal)} className='text-2xl cursor-pointer'/>
        </div>
        <div className='bg-white w-full md:w-2/6 mx-2 md:mx-0 px-5 py-4 mt-3 border-solid border-2 border-slate-400 rounded-md'>
            <div className='flex justify-center items-center flex-col py-5'>
                <h1 className='text-xl text-slate-400 font-bold uppercase'>Your Wallet</h1>
                <p className='text-xl text-slate-400 font-semibold mt-2 inline-flex items-center'>
                    {form.balance} <span className='ml-2'><SiBinance className='fill-yellow-400'/></span>
                </p>
            </div>
            <hr/>
            <div className='flex justify-center items-center flex-col py-5'>
                <h1 className='text-xl text-slate-400 font-bold uppercase'>Total Earned</h1>
                <p className='text-xl text-slate-400 font-semibold mt-2 inline-flex items-center'>
                    {form.earned} <span className='ml-2'><SiBinance className='fill-yellow-400'/></span>
                </p>
            </div>
            <hr/>
            <div className='flex justify-center items-center flex-col py-5'>
                <h1 className='text-xl text-slate-400 font-bold uppercase'>Your Pending Rewards</h1>
                <p className='text-xl text-slate-400 font-semibold mt-2 inline-flex items-center'>
                    {form.pending} <span className='ml-2'><SiBinance className='fill-yellow-400'/></span>
                </p>
            </div>
            <hr/>
            <div className='flex justify-center items-center flex-col py-5'>
                <h1 className='text-xl text-slate-400 font-bold text-center uppercase'>Total Rewards Distributed to Holders</h1>
                <p className='text-xl text-slate-400 font-semibold mt-2 inline-flex items-center'>
                {form.total} <span className='ml-2'><SiBinance className='fill-yellow-400'/></span>
                </p>
            </div>
        </div>
    </div>
    </>
  )
}

export default Landing