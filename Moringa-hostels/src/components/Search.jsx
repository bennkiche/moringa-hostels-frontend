import React from "react"
function Search({onSearch}){
    function handleChange(e){
       onSearch(e.target.value)
    }
    return(
        <div>
            <h3>What are you looking for ?</h3>
             <label htmlFor="search" >Search: </label>
                <input id="search" 
                type="text" 
                placeholder="Search..." 
                onChange={handleChange}
                />
        </div>
    )
}

export default Search