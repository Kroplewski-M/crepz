import { useState,useEffect } from 'react'
import filterIcon from '../assets/images/filter.png'
import { Filter } from '../components/Filter'
import { ProductCard } from '../components/ProductCard';
import { Shoe, useProductInfo } from '../context/ProductContext';
import { useNavigate  } from 'react-router-dom';
import { useFilterInfo } from '../context/FilterContext';

export const Browse = ()=>{
    const {FilterState} = useFilterInfo();
    // console.log(FilterState());
    const navigate = useNavigate();
    const {getProducts} = useProductInfo();
    const [showFilter, setShowFilter] = useState<boolean>(true);
    const [windowSize, setWindowSize] = useState<number>(getWindowSize());
    const [sortArrow, setSortArrow] = useState<string>('↓');
    const mobileLimit:number = 768;
    const [products,setProducts] = useState<Shoe[]>();
    //SET FILTER DISPLAY DEPENDING ON SCREEN SIZE
    function getWindowSize() {
        const innerWidth:number = window.innerWidth;
        return innerWidth;
      }
      useEffect(() => {
        function handleWindowResize() {
          setWindowSize(getWindowSize());
        }
        window.addEventListener('resize', handleWindowResize);
        return () => {
          window.removeEventListener('resize', handleWindowResize);
        };
      }, []);
      useEffect(() =>{
        if(windowSize >= mobileLimit && !showFilter){
          setShowFilter(true);
        }
        if(windowSize < mobileLimit){
            setShowFilter(false);
        }
    },[windowSize]);

    useEffect(()=>{
        setProducts(getProducts());
    },[getProducts()]);

    useEffect(() => {
        window.scrollTo(0, 0)
      }, []);

    const closeFilter = ()=>{
        setShowFilter(false);
    }
    const flipSort = ()=>{
        if(sortArrow === '↑'){
            setSortArrow('↓');
        }else{
            setSortArrow('↑');
        }
    } 
    
    const getFilteredProducts = ()=>{
        const filterBrands:string[] = [];
        const filterGender:string[] = [];

        FilterState().brand.map(brand =>{
            if(brand.checked == true){
                filterBrands.push(brand.brand);
            }
        });
        FilterState().gender.map(brand =>{
            if(brand.checked == true){
                filterGender.push(brand.gender);
            }
        })
        products?.map((product)=>{
            if(product.Brand == filterBrands[0]){
                console.log(product);
            }

        })
    }
    getFilteredProducts();
    return(
        <section className="w-[100vw] max-w-[2000px]  mx-auto pb-10 pt-16">
            <div className="w-[200px] mx-auto flex space-x-3">
                <div className='grid place-content-center w-[95px] h-[40px] bg-[#333333] hover:cursor-pointer md:hidden' onClick={()=>setShowFilter(true)}>
                    <div className='flex space-x-2'>
                        <p className='text-gray-200 '>Filter</p>
                        <img src={filterIcon} alt="" className='w-[20px] h-[20px]' />
                    </div>
                </div>
                <div className='grid place-content-center w-[95px] h-[40px] bg-[#333333] hover:cursor-pointer' onClick={flipSort}>
                    <div className='flex space-x-2'>
                        <p className='text-gray-200 '>Sort</p>
                        <p className='text-gray-300'>{sortArrow}</p>
                    </div>
                </div>
            </div>
            <div className='flex mt-10'>
                {
                    showFilter?(
                    <Filter closeFilter={closeFilter} />):(<></>)
                }
                <section className='md:w-[70%] w-[100vw] md:ml-16 flex flex-wrap -mt-5'>
                    {
                        products?.map(product =>(
                            <div key={product.id} onClick={()=> navigate(`/product/${product.id}`)} className='w-[200px] mx-auto md:w-[300px] md:ml-[5px] mt-5'>
                                <ProductCard  info={product}/> 
                            </div>
                        ))
                    }
                </section>
            </div>
        </section>
    )
}