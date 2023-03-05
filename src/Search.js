import React, { useState } from "react";
import "./Search.css";
import axios from "axios";
import SearchResults from "./SearchResults";
import { RotatingLines } from "react-loader-spinner";

function Search() {
  const [field, setField] = useState({
    searchValue: "",
    results: {},
    loading: false,
    message: "",
    // cancel:""
  });
  const [pageNo,setPageNo]=useState({
        searchValue: '',
		results: {},
		error: '',
		message: '',
		loading: false,
		totalResults: 0,
		totalPages: 0,
		currentPageNo: 0,
  })

  function handleOnInputChange(event) {
    const searchValue = event.target.value;
//  if block not working
    if(!searchValue){
        setField(()=>{return {
                searchValue:"",
                results:{},
                message: "",
              };
            })
    }else{
        setField((prevValue) => {
            return {
              ...prevValue,
              searchValue,
              loading: true,
              message: "",
            }
          });
    }
    fetchSearchResults(1, searchValue);
  }

  //Passing page number which helps in pagination
  function fetchSearchResults(updatedPageNo, searchValue) {
    const pageNumber = updatedPageNo ? `&page=${updatedPageNo}` : "";
    const searchUrl = `https://pixabay.com/api/?key=34125993-b98ea48cabd1217a7d8783176&q=${searchValue}${pageNumber}`;

    //Delete cancel token for each key stroke to avoid mini queries, which impacts performance
    // Cancel the previous axios token if any
    //  if (field.cancel) field.cancel.cancel();
    // Get a new token
    //  field.cancel = axios.CancelToken.source();

    axios
      .get(
        searchUrl
        //     , {
        //     cancelToken: this.cancel.token,
        // }
      )
      .then((res) => {
        const resultNotFoundMsg = !res.data.hits.length
          ? "No results found."
          : "";
        setField({
          results: res.data.hits,
          message: resultNotFoundMsg,
          loading: false,
        });
      })
      .catch((err) => {
        if (axios.isCancel(err) || err) {
          setField({
            loading: false,
            message: "Failed to fetch results.Please check network",
          });
        }
      });
  }

  return (
    <div className="container">
      {/*Heading*/}
      <h2 className="heading">Welcome to photo Gallery</h2>
      {/*Search Input*/}
      <label className="search-label" htmlFor="search-input">
        <input
          type="text"
          value={field.searchValue}
          id="search-input"
          placeholder="Search..."
          onChange={handleOnInputChange}
        />
        <i className="fa fa-search search-icon" />
      </label>

      {/*Error Message*/}
      {field.message && <p className="message">{field.message}</p>}

      {/* Loader */}
      {field.loading && (
        <RotatingLines strokeColor="grey" animationDuration="2" />
      )}
      <SearchResults field={field} />
    </div>
  );
}
export default Search;
