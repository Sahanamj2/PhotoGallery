import React from "react";

function PageNavigation(props){
   const showPrevLink = 1 < props.pageNo.currentPageNo;
   const showNextLink = props.pageNo.totalPages > props.pageNo.currentPageNo;
    return(
        <div className="nav-link-container">
            <button type="submit" className={`nav-link ${showPrevLink ? 'show' : 'hide'}`} onClick={props.handlePageClickPrev}>Prev</button>
            <button type="submit" className={`nav-link ${showNextLink ? 'show' : 'hide'}`} onClick={props.handlePageClickNext}>Next</button>
        </div>

    )
}

export default PageNavigation;