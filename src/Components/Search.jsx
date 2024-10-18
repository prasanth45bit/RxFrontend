import React, { useState, useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import "./Search.css";

const drug = [
  { title: "Paracetamol 250mg"},
  { title: "T.Razo 20mg"},
  { title: "T.Shelcal 500mg"},
  { title: "T.Shelcal 500mg" },
  { title: "T.Razo 20mg" },
  { title: "T.Shelcal 500mg" },
];

export default function LimitTags({ setSelectedData }) {
  const [selectedFilms, setSelectedFilms] = useState([]);
  const [filter, setFilter] = useState("All");
  const [filteredOptions, setFilteredOptions] = useState(drug);

  // Filter logic based on button selection
  useEffect(() => {
    if (filter === "Drugs") {
      setFilteredOptions(drug.filter((film) => film.year >= 1950 && film.year <= 1990));
    } else if (filter === "RxGroup") {
      setFilteredOptions(drug.filter((film) => film.year > 1990));
    } else {
      setFilteredOptions(drug); // "All" shows everything
    }
  }, [filter]);

  const handleChange = (event, newValue) => {
    setSelectedFilms(newValue);
    setSelectedData(newValue);
  };

  return (
    <>
      <div className="input-div">
        <Autocomplete
          className="search-field"
          multiple
          limitTags={2}
          sx={{ width:'82%', height:'80%',display:'flex', alignItems:'center', border:'none', outline:'none',
            
          }}
          options={filteredOptions}
          getOptionLabel={(option) => option.title}
          value={selectedFilms}
          onChange={handleChange}
          renderTags={() => null}
          renderInput={(params) => (
            <TextField
              {...params}
              
              placeholder="Search drugs"
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <SearchIcon 
                  />
                ),
                endAdornment: null,
                
              }}
              inputProps={{
                ...params.inputProps,
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    border: "none",
                  },
                  "&:hover fieldset": {
                    border: "none",
                  },
                  "&.Mui-focused fieldset": {
                    border: "none",
                  },
                },
              }}
            />
          )}
        />

        <div className="tabs">
          <button
            className={filter === "All" ? "active" : ""}
            onClick={() => setFilter("All")}
          >
            All
          </button>

          <button
            className={filter === "Drugs" ? "active" : ""}
            onClick={() => setFilter("Drugs")}
          >
            Drugs
          </button>

          <button
            className={filter === "RxGroup" ? "active" : ""}
            onClick={() => setFilter("RxGroup")}
          >
            Rx Group
          </button>
        </div>
      </div>
    </>
  );
}
