import React from "react";

function SearchResults (props) {
	const {results} = props.field;
	if (results.length) {
		return (
			<div className="results-container">
				{results.map((result) => {
					return (
						<a key={result.id} href={result.previewURL} className="result-items">
							{/* <h6 className="image-username">{result.user}</h6>  */}
							 {/* <div className="image-wrapper">  */}
								<img className="image" src={result.previewURL} alt={result.user}/>
							{/* </div> */}
						</a>
					);
				})}
			</div>
		);
	}
};

export default SearchResults;