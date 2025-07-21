import PorductFilter from "@/components/shopping-view/filter";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { sortOptions } from "@/config";
import { fetchAllFilteredProducts, fetchProductDetails } from "@/store/shop/product-slice";
import { ArrowUpDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSearchParams, useSearchParams } from "react-router-dom";

export default function ShoppingListing() {
  const dispatch = useDispatch();
  const { productList ,productDetails} = useSelector((state) => state.shopProducts);
  const[filters, setFilters] = useState({});
  const [sort, setSort] = useState(null);
  const [searchParams,setSearchParams]=useSearchParams();
  const [openDetailsDialog,setOpenDetailsDialog]=useState(false);

  

  function handleSort(value) {
        setSort(value);
  }


  function handleGetProductDetails(getCurrentProductId){
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function createSearchParamsHelper(filterParams){
    const queryParams=[];
    for(const [key,value] of Object.entries(filterParams)){
      if(Array.isArray(value) && value.length>0){
        const paramValue=value.join(',')
        queryParams.push(`${key}=${encodeURIComponent(paramValue)}`)
      }
    }
    return queryParams.join('&');
  }

  function handleFilter(getSectionId, getCurrentOption){
    console.log(getSectionId,getCurrentOption);
    let cpyFilters = {...filters};
    const indexOfCurrentSection=Object.keys(cpyFilters).indexOf(getSectionId);

    if(indexOfCurrentSection===-1){
      cpyFilters={
        ...cpyFilters,
        [getSectionId]:[getCurrentOption]
      }
    }
    else{
      const indexOfCurrentOption=cpyFilters[getSectionId].indexOf(getCurrentOption);
      if(indexOfCurrentOption===-1){
        cpyFilters[getSectionId].push(getCurrentOption);
      }
      else{
        cpyFilters[getSectionId].splice(indexOfCurrentOption,1);
      }
    }

    setFilters(cpyFilters)
    sessionStorage.setItem("filters",JSON.stringify(cpyFilters));
    
  }

  console.log(productDetails);
  
  useEffect(()=>{
    setSort("price-lowtohigh");
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
  },[])

  useEffect(() => {
    if(filters!==null && sort !== null)
    dispatch(fetchAllFilteredProducts({filterParams : filters, sortParams:sort}));
  }, [dispatch,sort,filters]);


  useEffect(()=>{
    if(filters && Object.keys(filters).length>0){
      const createQueryString=createSearchParamsHelper(filters)
      setSearchParams(new URLSearchParams(createQueryString))
    }
  },[filters])

  useEffect(()=>{
    if(productDetails!==null) setOpenDetailsDialog(true)
  },[productDetails])


  return (
    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6">
      <PorductFilter filters={filters} handleFilter={handleFilter}/>
      <div className="bg-background w-full rounded-lg shadow-sm">

        <div className="p-4 border-b flex item-center  justify-between">
          <h2 className="text-lg font-extrabold mr-2">All Products</h2>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">
              {productList?.length} products
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ArrowUpDownIcon className="h-4 w-4" />
                  <span>Sorty by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem value={sortItem.id} key={sortItem.id}>
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-col-1 sm:grid-col-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {productList && productList.length > 0
            ? productList.map((productItem) => (
                <ShoppingProductTile product={productItem} handleGetProductDetails={handleGetProductDetails}/>
              ))
            : null}
        </div>
      </div>
      <ProductDetailsDialog open={openDetailsDialog} setOpen={setOpenDetailsDialog} productDetails={productDetails}/>
    </div>
  );
}
