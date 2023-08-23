import { useDispatch, useSelector } from "react-redux";
import { updateSelectedFilter } from "./reducer";

const FILTERS = [
    {key: "popularity", name: "Popularity"},
    {key: "priceHighToLow", name: "Price: High to Low"},
    {key: "priceLowToHigh", name: "Price: Low to High"}
]
function Filters(){
    const {items, selectedFilter, itemsCopy } = useSelector((state) => state.listing);
    const dispatch = useDispatch();
    const handleFilterChange = (e) => {
        const {id, value} = e.target;
        switch(id){
            case "priceHighToLow" : {
                let sortedItems = [...items];
                sortedItems.sort((firstItem, secondItem) => firstItem.price - secondItem.price);
                dispatch(updateSelectedFilter({filter: {key: id, name: value}, items: sortedItems}));
                break;
            }
            case "priceLowToHigh" : {
                let sortedItems = [...items];
                sortedItems.sort((firstItem, secondItem) => secondItem.price - firstItem.price);
                dispatch(updateSelectedFilter({filter: {key: id, name: value}, items: sortedItems}));
                break;
            }
            default : {
                dispatch(updateSelectedFilter({filter: {key: id, name: value}, items: itemsCopy}));
            }
        }
    }
    return(
        <div>
            {
                FILTERS.map((filter) => 
                    <div>
                        <input checked={selectedFilter.key === filter.key} type="radio" name="filters" value={filter.name} id={filter.key} onChange={handleFilterChange}/>
                        <label for={filter.key}>{filter.name}</label>
                    </div>
                )
            }
        </div>
    )
}

export default Filters;