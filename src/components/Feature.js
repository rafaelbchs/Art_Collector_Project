import React, { Fragment } from "react";

// Don't touch this import
import { fetchQueryResultsFromTermAndValue } from "../api";


const Searchable = (props) => {
  const { searchTerm, searchValue, setIsLoading, setSearchResults } = props;
  return (
    <span className="content">
      <a
        href="#"
        onClick={async (event) => {
          event.preventDefault();
          setIsLoading(true);
          try {
            const result = await fetchQueryResultsFromTermAndValue(
              searchTerm,
              searchValue
            );
            setSearchResults(result);
          } catch (error) {
            console.error(error);
          } finally {
            setIsLoading(false);
          }
        }}
      >
        {searchValue}
      </a>
    </span>
  );
};

const Feature = (props) => {
  const { featuredResult, setIsLoading, setSearchResults } = props;
  if (!featuredResult) {
    return <main id="feature"></main>;
  }
  const {
    title,
    dated,
    images,
    primaryimageurl,
    description,
    culture,
    style,
    technique,
    medium,
    dimensions,
    people,
    department,
    division,
    contact,
    creditline,
  } = featuredResult;
  return (
    <main id="feature">
      <div className="object-feature">
        <header>
          <h3>{title}</h3>
          <h4>{dated}</h4>
        </header>
        <section className="facts">
          {description ? (
            <React.Fragment>
              <span className="title">Description</span>
              <span className="content">{description}</span>
            </React.Fragment>
          ) : null}

          <span className="title">Culture</span>
          <Searchable
            searchValue={culture}
            searchTerm="culture"
            setSearchResults={setSearchResults}
            setIsLoading={setIsLoading}
          />

          {technique ? (
            <React.Fragment>
              <span className="title">Technique</span>
              <Searchable
                searchValue={technique}
                searchTerm="technique"
                setSearchResults={setSearchResults}
                setIsLoading={setIsLoading}
              />
            </React.Fragment>
          ) : null}

          {medium ? (
            <React.Fragment>
              <span className="title">Medium</span>
              <Searchable
                searchValue={medium}
                searchTerm="medium"
                setSearchResults={setSearchResults}
                setIsLoading={setIsLoading}
              />
            </React.Fragment>
          ) : null}

          {people ? (
            <React.Fragment>
              {people.map((person) => {
                return (
                  <>
                    <span className="title">Person</span>
                    <Searchable
                      searchValue={person.name}
                      searchTerm="person"
                      setSearchResults={setSearchResults}
                      setIsLoading={setIsLoading}
                    />
                  </>
                );
              })}
            </React.Fragment>
          ) : null}

          {dimensions ? (
            <React.Fragment>
              <span className="title">Dimensions</span>
              <span className="content">{dimensions}</span>
            </React.Fragment>
          ) : null}

          {department ? (
            <React.Fragment>
              <span className="title">Department</span>
              <span className="content">{department}</span>
            </React.Fragment>
          ) : null}

          <span className="title">Division</span>
          <span className="content">{division}</span>

          {contact ? (
            <React.Fragment>
              <span className="title">Contact</span>
              <span className="content">
                <a href="#">{contact}</a>
              </span>
            </React.Fragment>
          ) : null}

          <span className="title">CreditLine</span>
          <span className="content">{creditline}</span>
        </section>

        {images ? (
          <React.Fragment>
            <section className="photos">
              {images.map((image) => {
                return <img src={image.baseimageurl} alt="any" />;
              })}
            </section>
          </React.Fragment>
        ) : null}
      </div>
    </main>
  );
};

export default Feature;
