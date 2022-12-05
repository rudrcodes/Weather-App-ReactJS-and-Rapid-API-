import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { geoApiOptions, GEO_API_URL } from "../../api";

export const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  // const newloadOptions = async (inputValue) => {
  //   const response = await fetch(
  //     `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
  //     geoApiOptions
  //   );
  // const dataToDisplay=await response.json();
  // return dataToDisplay;
  // };
  // newloadOptions().then((dataToDisplay)=>{
  // //   console.log(dataToDisplay.data);
  // return {

  //     dataToDisplay.data.map(()=>{

  //     })
  // }
  // })

  const loadOptions = (inputValue) => {
    return fetch(
      `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
      geoApiOptions
    )
      .then((response) => response.json())
      .then((response) => {
        if (response.data != undefined)
          return {
            options: response.data.map((city) => {
              return {
                value: `${city.latitude} ${city.longitude}`,
                label: `${city.name}, ${city.countryCode}`,
              };
            }),
          };
          else{
            alert("Too many requests at this time.Please try again after 5 seconds 😊")
          }
      })
      .catch((err) => console.error(err));
  };

  const handleChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };
  return (
    <AsyncPaginate
      placeholder="Search for city"
      debounceTimeout={600}
      value={search}
      onChange={handleChange}
      loadOptions={loadOptions}
    />
  );
};
