import React, { useEffect, useState } from 'react';

/**
 * Don't touch these imports!
 */
import { 
  fetchAllCenturies,
  fetchAllClassifications,
  fetchQueryResults,
  fetchAllMedium
} from '../api';

const Search = (props) => {
  const {setSearchResults, setIsLoading, setFeaturedResult} = props

  const [centuryList, setCenturyList] = useState([])
  const [classificationList, setClassificationList] = useState([])

  const [queryString, setQueryString] = useState('')

  const [century, setCentury] = useState('any')
  const [classification, setClassification] = useState('any')

  const [medium, setMedium] = useState("any")
  const [mediumList, setMediumList] = useState([])
  

  const [predictionResult, setPredictionResult] = useState([])

  useEffect(() => {
    try{
    Promise.all([fetchAllCenturies(),fetchAllClassifications(),fetchAllMedium()])
    .then(([centuries,classifications,medium]) => {
        setCenturyList(centuries);
        setClassificationList(classifications);
        setMediumList(medium)
      }
    )}
    catch(error){
      console.error(error);
    }

  }, []);

  return <form id="search" onSubmit={async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try{
      const results = await fetchQueryResults({
        century,
        classification,
        medium,
        queryString
        
      })
      setSearchResults(results);
    }catch(error){
      console.error(error)
    }
    finally{
      setIsLoading(false)
    }
  }}>
    <fieldset>
      <label htmlFor="keywords">Query</label>
      <input 
        id="keywords" 
        type="text" 
        placeholder="enter keywords..." 
        value={queryString} 
        onChange={async (event)=>{
          setQueryString(event.target.value)
          
          try{
          const results = await fetchQueryResults({
            century,
            classification,
            medium,
            queryString})
          setPredictionResult(results.records)
          }catch(error){
          console.error(error)
          }
          }}/>
        <ul>
        {predictionResult.map((result)=>{
          return(
            <li onClick={()=>{setFeaturedResult(result)}}>{result.title}</li>
            )
        })}
        </ul>
    </fieldset>
    <fieldset>
      <label htmlFor="select-classification">Classification <span className="classification-count">({ classificationList.length })</span></label>
      <select 
        name="classification"
        id="select-classification"
        value={classification} 
        onChange={(event)=>{setClassification(event.target.value)}}>
          <option value="any">Any</option>
        {classificationList.map((value,index)=>{
          return <option value={value.name} key={index}>{value.name}</option>
        })}
      </select>
    </fieldset>
    <fieldset>
      <label htmlFor="select-century">Century <span className="century-count">({ centuryList.length })</span></label>
      <select 
        name="century" 
        id="select-century"
        value={century} 
        onChange={(event)=>{setCentury(event.target.value)}}>
          <option value="any">Any</option>
        {centuryList.map((value,index)=>{
         
          return <option value={value.name} key={index}>{value.name}</option>
        })}
      </select>
     </fieldset>
     <fieldset>
      <label htmlFor="select-medium">Medium <span className="medium-count">({ mediumList.length })</span></label>
      <select 
        name="medium" 
        id="select-medium"
        value={medium} 
        onChange={(event)=>{setMedium(event.target.value)}}>
          <option value="any">Any</option>
        {mediumList.map((value,index)=>{   
          return <option value={value.name} key={index}>{value.name}</option>
        })}
      </select>
     </fieldset>
    <button>SEARCH</button>
  </form>
}

export default Search;