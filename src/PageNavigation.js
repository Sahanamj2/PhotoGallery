import React from "react";

function PageNavigation(props){
   const showPrevLink = 1 < props.pageNo.currentPageNo;
   const showNextLink = props.pageNo.totalPages > props.pageNo.currentPageNo;
    return(
        <div className="nav-link-container">
            <a href="#" className={`nav-link ${showPrevLink ? 'show' : 'hide'}`} onClick={props.handlePageClickPrev}>Prev</a>
            <a href="#" className={`nav-link ${showNextLink ? 'show' : 'hide'}`} onClick={props.handlePageClickNext}>Next</a>
        </div>

    )
}

export default PageNavigation;