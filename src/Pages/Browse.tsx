import { useState,useEffect } from 'react'
import filterIcon from '../assets/images/filter.png'
import { Filter } from '../components/Filter'
import { ProductCard } from '../components/ProductCard';
import { Shoe, useProductInfo } from '../context/ProductContext';
import { useNavigate  } from 'react-router-dom';
import { useFilterInfo } from '../context/FilterContext';
import { Heart } from '../components/SVG/Heart';
import { useWishListInfo } from '../context/WishListContext';
import { LogInMessage } from '../components/LogInMessage';
import { useUserInfo } from '../context/UserContext';
import { ViewProductCard } from '../components/ViewProductCard';

export const Browse = ()=>{
    const {FilterState,maxPrice,minPrice} = useFilterInfo();
    const {userInfo} = useUserInfo();
    const {wishList,toggleFromWishList} = useWishListInfo();
    const navigate = useNavigate();
    const {getProducts} = useProductInfo();
    const [showFilter, setShowFilter] = useState<boolean>(true);
    const [windowSize, setWindowSize] = useState<number>(getWindowSize());
    const mobileLimit:number = 768;
    const [products,setProducts] = useState<Shoe[]>();
    const [filteredProducts, setFilteredProducts] = useState<Shoe[]>([]);
    const [showLogInMessage,setShowLogInMessage] = useState<boolean>(false);
    const [logInMessage,setLogInMessage] = useState<string>('');
    const [selectedItem,setSelectedItem] = useState<string>('');
    const [showViewProductCard,setViewShowProductCard] = useState<boolean>(false);

    //WAIT FOR ALL IMGS TO LOAD
    const [loadedImgs,setLoadedImgs] = useState<number>(0);
    const [allImgsLoaded,setAllImgsLoaded] = useState<boolean>(false);
    const imgLoaded = ()=>{
        setLoadedImgs((prevState)=> prevState+1);
    }
    useEffect(()=>{
        if(loadedImgs == filteredProducts.length ){
            setAllImgsLoaded(true);
        }
    },[loadedImgs])
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

    useEffect(()=>{
        setFilteredProducts([]);
        getFilteredProducts();
    },[FilterState(),products,maxPrice,minPrice])

    useEffect(() => {
        window.scrollTo(0, 0)
      }, []);

    const closeFilter = ()=>{
        setShowFilter(false);
    }
    const closeViewProductItem=()=>{
        setViewShowProductCard(false);
    }
    const getFilteredProducts = ()=>{
        const filterBrands:string[] = [];
        const filterGender:string[] = [];
        FilterState().brand.map(brand =>{
            if(brand.checked == true){
                if(brand.brand == 'New-Balance'){
                    filterBrands.push('New Balance');
                }
                else if(brand.brand == 'Under-Armour'){
                    filterBrands.push('Under Armour');
                }
                else{
                    filterBrands.push(brand.brand);
                }
            }
        });
        FilterState().gender.map(brand =>{
            if(brand.checked == true){
                filterGender.push(brand.gender);
            }
        });
        products?.map((product)=>{
            if((filterBrands.includes(product.Brand) || filterBrands.length == 0) && (filterGender.includes(product.Gender) || filterGender.length == 0)
                && product.Price >= minPrice && product.Price <= maxPrice){
                setFilteredProducts((prevProducts) => [...prevProducts,product]);
            }

        })
    }
    const isWishListed = (value:string)=>{
        if(wishList.includes(value)){
            return '#ff0000';
        }else{
            return '#FFFFFF';
        }
    }
    const WishListItem = (value:string)=>{
        if(userInfo.id !== ''){
            toggleFromWishList(value);
        }else{
            setLogInMessage('You have to log in to favorite items!');
            setShowLogInMessage(true);
        }
    }
    useEffect(()=>{
        setTimeout(() => {
            setShowLogInMessage(false);
        }, 5000);
    },[showLogInMessage])

    const addToBasketCheck = (value:string)=>{
        if(userInfo.id !== ''){
            setSelectedItem(value);
            setViewShowProductCard(true);
        }else{
            setLogInMessage('You have to log in to add items to basket!');
            setShowLogInMessage(true);
        }
    }
    return(
        <section className="w-[100vw] max-w-[2000px]  mx-auto pb-10 pt-16">
            <div className="w-[95px] mx-auto">
                <div className='grid place-content-center w-[95px] h-[40px] bg-[#333333] hover:cursor-pointer md:hidden' onClick={()=>setShowFilter(true)}>
                    <div className='flex space-x-2'>
                        <p className='text-gray-200 '>Filter</p>
                        <img src={filterIcon} alt="" className='w-[20px] h-[20px]' />
                    </div>
                </div>
            </div>
            <div className='flex mt-10'>
                {
                    showFilter?(
                    <Filter closeFilter={closeFilter} />):(<></>)
                }
                <section className='md:w-[70%] w-[100vw] md:ml-16 -mt-5'>
                    <h1 className='font-bold text-[40px] text-[#222222] mt-[5px] text-center md:text-left'>Browse</h1>
                    <div className='flex flex-wrap w-[100%]'>
                            {
                                filteredProducts?.map(product =>(
                                    <div key={product.id} className={`w-[165px] mx-auto md:w-[300px] md:ml-[5px] mt-5 relative ${allImgsLoaded?(''):('hidden')}`}>
                                        <div className='absolute w-[35px] h-[35px] ml-[5px] mt-[5px] rounded-full bg-[#444444] grid place-content-center hover:cursor-pointer z-50' 
                                        onClick={()=> WishListItem(product.id)}>
                                            <Heart fill={isWishListed(product.id)} width={20} height={20} />
                                        </div>
                                        <div onClick={()=> navigate(`/product/${product.id}`)}>
                                            <ProductCard  info={product} imgLoaded={imgLoaded}/> 
                                        </div>
                                        <div className='w-[100%] absolute z-50 bottom-5'>
                                            <div className='md:w-[200px] w-[130px] mx-auto ' onClick={()=> addToBasketCheck(product.id)}>
                                                <button className='w-[100%] h-[30px] rounded-md bg-gray-200 hover:bg-gray-300 text-[#333333] font-bold mt-[10px]'>Add to basket</button>
                                            </div>
                                        </div>
                                    </div>

                                ))
                            }
                                <div className={`flex flex-wrap w-[100%] ${!allImgsLoaded?(''):('hidden')}`}>
                                    <div className='w-[165px] md:w-[300px] h-[300px] ml-[5px] mt-5 bg-gray-400 animate-pulse rounded-md'></div>
                                    <div className='w-[165px] md:w-[300px] h-[300px] ml-[5px] mt-5 bg-gray-400 animate-pulse rounded-md'></div>
                                    <div className='w-[165px] h-[300px] md:w-[300px] ml-[5px] mt-5 bg-gray-400 animate-pulse rounded-md'></div>
                                    <div className='w-[165px] h-[300px] md:w-[300px] ml-[5px] mt-5 bg-gray-400 animate-pulse rounded-md'></div>
                                    <div className='w-[165px] h-[300px] md:w-[300px] ml-[5px] mt-5 bg-gray-400 animate-pulse rounded-md'></div>
                                </div>
                    </div>
                </section>
            </div>
            {
                showLogInMessage?(<LogInMessage message={logInMessage}/>):(<></>)
            }
            {
                showViewProductCard?(<ViewProductCard close={closeViewProductItem} id={selectedItem}/>):(<></>)
            }
        </section>
    )
}