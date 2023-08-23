import { useDispatch } from "react-redux";
import { searchByTitle } from "./reducer";

function debounce(callBackFn, delay){
    let timer = null;
    return function(){
        const context = this;
        const args = arguments;
        clearTimeout(timer);
        timer = setTimeout(() => {
            callBackFn.apply(context, args)
        }, delay)
    }
}

function Search(){
    const dispatch = useDispatch();

    const onChange = (e) => {
        console.log(e.target.value);
        dispatch(searchByTitle(e.target.value));
    }

    const onChangeDebounce =  debounce(onChange, 1000);
    return(
        <input type="text" onChange={onChangeDebounce} />
    )
}

export default Search;