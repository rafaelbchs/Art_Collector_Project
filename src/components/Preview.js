import React from "react";


import { fetchQueryResultsFromURL } from "../api";

const Preview = (props) => {
  const { setSearchResults, setIsLoading, setFeaturedResult } = props;
  const { info, records } = props.searchResults;

  async function fetchPage(pageUrl) {
    setIsLoading(true);

    try {
      const results = await fetchQueryResultsFromURL(pageUrl);
      setSearchResults(results);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <aside id="preview">
      <header className="pagination">
        {/* This button should be disabled if nothing is set in info.prev, and should call fetchPage with info.prev when clicked */}
        <button
          disabled={!info.prev}
          className="previous"
          onClick={() => {
            fetchPage(info.prev);
          }}
        >
          Previous
        </button>
        {/* This button should be disabled if nothing is set in info.next, and should call fetchPage with info.next when clicked */}
        <button
          disabled={!info.next}
          className="next"
          onClick={() => {
            fetchPage(info.next);
          }}
        >
          Next
        </button>
      </header>
      <section className="results">
        {
          records.map((record,index) => {
            return (
              <div
                key={index}
                className="object-preview"
                onClick={(event) => {
                  event.preventDefault();
                  setFeaturedResult(record);
                  // prevent the default
                  // set the featured result to be this record, using setFeaturedResult
                }}
              ><a href="#">
                {
                  record.primaryimageurl ? (
                    <img
                      src={record.primaryimageurl}
                      alt={record.description}
                    />
                  ) : null
                  // if the record.primaryimageurl exists, show this: <img src={ record.primaryimageurl } alt={ record.description } />, otherwise show nothing
                }
                {
                  record.title ? <h3>{record.title}</h3> : <h3>MISSING INFO</h3>
                  // if the record.title exists, add this: <h3>{ record.title }</h3>, otherwise show this: <h3>MISSING INFO</h3>
                }
                </a>
              </div>
            );
          })
        }
      </section>
    </aside>
  );
};

export default Preview;
