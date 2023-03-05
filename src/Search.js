import React, {useState } from "react";
import "./Search.css";
import axios from "axios";
import SearchResults from "./SearchResults";
import { RotatingLines } from "react-loader-spinner";
import PageNavigation from "./PageNavigation";

function Search() {
  const [field, setField] = useState({
    searchValue: "",
    results: {},
    loading: false,
    message: "",
  });
  const [pageNo, setPageNo] = useState({
    totalResults: 0,
    totalPages: 0,
    currentPageNo: 1,
  });
  let updatedPageNo=0;

  function getPageCount(total, denominator) {
    const divisible = total % denominator === 0;
    const valueToBeAdded = divisible ? 0 : 1;
    return Math.floor(total / denominator) + valueToBeAdded;
  }

  function handlePageClick(type) {
  updatedPageNo =
      "prev" === type ? pageNo.currentPageNo - 1 : pageNo.currentPageNo + 1;

    fetchSearchResults(updatedPageNo, field.searchValue);
  }

  //How to update setpageNo state as well
  function handleOnInputChange(event) {
    const searchValue = event.target.value;
    if (!searchValue) {
      return setField({ searchValue, results: {}, message: "" }) 
      // setPageNo({totalResults: 0, totalPages: 0,currentPageNo: 1})
    } else {
      setField((prevValue) => {
        return { ...prevValue, searchValue, loading: true, message: "" };
      });
    }
    fetchSearchResults(1, searchValue);
  }

  //Passing page number which helps in pagination
  function fetchSearchResults(updatedPageNo, searchValue) {
    const pageNumber = updatedPageNo ? `&page=${updatedPageNo}` : "";
    const searchUrl = `https://pixabay.com/api/?key=34125993-b98ea48cabd1217a7d8783176&q=${searchValue}${pageNumber}`;

    //Delete cancel token for each key stroke to avoid mini queries, which impacts performance
    // Cancel the previous axios token if any and get a new token

    axios
      .get(
        searchUrl
        // , { cancelToken: this.cancel.token}
      )
      .then((res) => {
        const total = res.data.total;
        const totalPageCount = getPageCount(total, 20);
        const resultNotFoundMsg = !res.data.hits.length
          ? "No results found."
          : "";
        setField({
          results: res.data.hits,
          message: resultNotFoundMsg,
          loading: false,
          searchValue,
        });
        setPageNo({
          totalResults: total,
          totalPages: totalPageCount,
          currentPageNo: updatedPageNo,
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
          autoComplete="off"
        />
        <i className="fa fa-search search-icon" />
      </label>

      {/*Error Message*/}
      {field.message && <p className="message">{field.message}</p>}

      {/* Loader */}
      {field.loading && (
        <RotatingLines strokeColor="grey" animationDuration="2" />
      )}
      <PageNavigation
        pageNo={pageNo}
        handlePageClickPrev={() => {
          handlePageClick("prev");
        }}
        handlePageClickNext={() => {
          handlePageClick("next");
        }}
      />
      <SearchResults field={field} />
      <PageNavigation
        pageNo={pageNo}
        handlePageClickPrev={() => {
          handlePageClick("prev");
        }}
        handlePageClickNext={() => {
          handlePageClick("next");
        }}
      />
    </div>
  );
}
export default Search;
