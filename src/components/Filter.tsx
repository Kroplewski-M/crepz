import './Filter.css'
import { useEffect, useState } from 'react'
import close from '../assets/images/close.png'
import { Shoes } from '../context/FilterContext'
import { useFilterInfo } from '../context/FilterContext'

interface FilterProps{
    closeFilter: ()=>void,
}

export const Filter = (props:FilterProps)=>{
    const {FilterState,updateBrandState,updateGenderState,ResetFilter,SetMaxPrice,SetMinPrice,minPrice,maxPrice} = useFilterInfo();
    const [Filter,setFilter] = useState<Shoes>(FilterState);
    
    useEffect(()=>{
        setFilter(FilterState);
    },[FilterState])

    return(
        <div className="w-[100vw] md:w-[300px] md:h-[900px] h-[100vh] pb-10 fixed overflow-y-auto md:overflow-y-hidden top-0 right-0 md:relative bg-[#333333] md:bg-gray-200 z-[100] text-gray-200 md:text-[#333333] md:ml-16 ">
            <img src={close} alt="" onClick={props.closeFilter} className='absolute w-[30px] h-[30px] right-1 top-1 md:hidden'/>
            <h1 className="text-center md:text-left font-bold text-[35px] mt-10 md:ml-5">Filter</h1>

            <div className="ml-5 mt-10 md:mt-5 font-bold text-[20px] md:text-[16px]">
                <h2 className="text-[30px] md:text-[25px]">Brand:</h2>
                <div className="mt-5 flex flex-col space-y-5">
                    {
                        Filter.brand.map((option, index)=>
                            <div className="" key={option.brand} >
                            <label htmlFor={option.brand} className="mr-[10px]">{option.brand}: </label>
                            <input type="checkbox" name={option.brand} className="cursor-pointer" checked={option.checked} onChange={()=> updateBrandState(option.brand)}/>
                            </div>
                        )
                    }
                </div>
            </div>
                <hr className="mt-5 w-[90%] mx-auto md:border-2 md:border-gray-300"/>
                <div className="ml-5 mt-10 md:mt-5 font-bold text-[20px]">
                    <h2 className="text-[30px]">Gender:</h2>
                    <div className="mt-5 flex flex-col space-y-5">
                    {
                        Filter.gender.map((option,index)=>
                            <div className="" key={option.gender} >
                            <label htmlFor={option.gender} className="mr-[10px]">{option.gender}: </label>
                            <input type="checkbox" name={option.gender} className="cursor-pointer" checked={option.checked} onChange={()=> updateGenderState(option.gender)}/>
                            </div>
                        )
                    }
                    </div> 
                </div>
                <hr className="mt-5 w-[90%] mx-auto md:border-2 md:border-gray-300"/>
                <div className="ml-5 mt-10 md:mt-5 font-bold text-[20px]">
                    <h2 className="text-[30px]">Price:</h2>
                    <div className="flex space-x-2 mt-5">
                            <label htmlFor="min" className="mr-[10px]">Min: </label>
                            <input type="range" name="min" min="0" max="2000" step="20" value={minPrice} onChange={(event)=>SetMinPrice(parseInt(event.target.value))}  className="hover:cursor-ew-resize"/>
                            <p>£{minPrice}</p>
                    </div>
                    <div className="flex space-x-2 mt-5">
                            <label htmlFor="max" className="mr-[10px]">Max: </label>
                            <input type="range" name="max" min="0" max="2000" step="20" value={maxPrice} onChange={(event)=>SetMaxPrice(parseInt(event.target.value))}  className="hover:cursor-ew-resize"/>
                            <p>£{maxPrice}</p>
                    </div>
                </div>
                <div className="mx-auto w-[200px] h-[30px] mt-10 md:hidden">
                    <button className="w-[100%] h-[100%] bg-gray-200 font-bold text-[#333333]" onClick={props.closeFilter}>Done</button>
                </div>
                <div className="mx-auto w-[200px] h-[30px] mt-[20px]" onClick={ResetFilter}>
                    <button className="w-[100%] h-[100%] bg-[#333333] font-bold text-gray-200">Clear Filter</button>
                </div>
        </div>
    )
}