import React, { useState, useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import axios from 'axios';
import "./Search.css";

export default function LimitTags({ RXGROUPID }) {
  const [selectedDrugs, setSelectedDrugs] = useState([]);
  const [filter, setFilter] = useState("All");
  const [GROUPID, setGROUPID] = useState(RXGROUPID);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [drugData, setDrugData] = useState([]); 
  const [rxDrugData, setRxDrugData] = useState([]); 
  const doctorData = localStorage.getItem('doctorData');
  const parsedData = doctorData ? JSON.parse(doctorData) : null;
  const doctorId = parsedData?.doctor?.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/rx_group/get_drug');
        if (response.status === 200) {
          const formattedData = response.data.map(item => ({
            title: `${item.drug?.drug_name || 'Unknown Drug'} ${item.drug_varient || ''}`,
            id: item.id,
            doseM: item.dose_m || 0,
            doseAN: item.dose_an || 0,
            doseN: item.dose_n || 0,
            drugname: item.drug?.drug_name || 'Unknown Drug',
            variant: item.drug_varient || 'N/A',
            category: item.Category?.catagory_name || 'Unknown Category',
            time: item.Time?.time || 'N/A',
            when: item.When?.when || 'N/A',
            frequency: item.Frequency?.frequency || 'N/A',
            duration: `${item.Duration?.duration_count || 0} ${item.Duration?.duration_type || 'days'}`,
          }));

          setDrugData(formattedData);
          setFilteredOptions(formattedData);
        } else {
          console.error('Error fetching drug data: Unexpected response status', response.status);
        }
      } catch (error) {
        console.error('Error fetching drug data:', error.response ? error.response.data : error.message);
      }
    };

    fetchData(); 
  }, []);
  
  useEffect(() => {
    const fetchRxData = async () => {
      if (!doctorId) return;
      try {
        const response = await axios.post('http://localhost:5000/rx_group/get_rx', { doctor_id: doctorId });
        if (response.status === 200) {
          const formattedRxData = [];

          response.data.forEach(rxGroup => {
            if (rxGroup.Rx_group_drugs && rxGroup.Rx_group_drugs.length > 0) {
              const group = {
                title: rxGroup.rx_group_name,  
                drugs: [],  
                id: rxGroup.id, 
              };

              rxGroup.Rx_group_drugs.forEach(drug => {
                const formattedDrug = {
                  id: drug.drug_varient_id,
                  drug_id: drug.drug_varient_id,
                  doseM: drug.dose_m || 0,
                  doseAN: drug.dose_an || 0,
                  doseN: drug.dose_n || 0,
                  drugname: drug.Drug_varient.drug.drug_name,
                  variant: drug.Drug_varient.drug_varient || 'N/A',
                  time: drug.drugTime?.time || 'N/A',
                  when: drug.drugWhen?.when || 'N/A',
                  frequency: drug.drugFrequency?.frequency || 'N/A',
                  duration: `${drug.drugDuration?.duration_count || 0} ${drug.drugDuration?.duration_type || 'days'}`,
                  groupId: rxGroup.id, 
                };
                group.drugs.push(formattedDrug); 
              });

              formattedRxData.push(group);
            }
          });

          setRxDrugData(formattedRxData);
        } else {
          console.error('Error fetching RX data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchRxData(); 
  }, [doctorId]);

  useEffect(() => {
    let updatedOptions = [];
    
    if (filter === "All") {
      updatedOptions = [...drugData, ...rxDrugData];
    } else if (filter === "Drugs") {
      updatedOptions = drugData; 
    } else if (filter === "RxGroup") {
      updatedOptions = rxDrugData; 
    }

    setFilteredOptions(updatedOptions);
  }, [filter, drugData, rxDrugData]);

  const handleChange = async (newValue) => {
    try {
      const selectedIds = newValue.map(option => {
        if (option.drugs) {  
          return option.drugs.map(drug => drug.drug_id);
        }
        return option.id; 
      }).flat(); 

      await axios.post('http://localhost:5000/rx_group/post_rx_drug', {
        rx_group_id: GROUPID,
        drug_varient_ids: selectedIds,
      });
      console.log('Data submitted successfully');
    } catch (error) {
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        console.error('Error response headers:', error.response.headers);
      } else if (error.request) {
        console.error('Error request:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
    }
  };

  return (
    <div className="input-div">
      <Autocomplete
        className="search-field"
        multiple
        limitTags={2}
        sx={{ width: '82%', height: '80%', display: 'flex', alignItems: 'center', border: 'none', outline: 'none' }}
        options={filteredOptions}
        getOptionLabel={(option) => option.title}
        value={selectedDrugs}
        onChange={(event, newValue) => {
          setSelectedDrugs(newValue);
          handleChange(newValue);
        }}
        renderTags={() => null}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Search drugs"
            InputProps={{
              ...params.InputProps,
              startAdornment: <SearchIcon />,
              endAdornment: null,
            }}
            inputProps={{ ...params.inputProps }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { border: "none" },
                "&:hover fieldset": { border: "none" },
                "&.Mui-focused fieldset": { border: "none" },
              },
            }}
          />
        )}
      />

      <div className="tabs">
        <button className={filter === "All" ? "active" : ""} onClick={() => setFilter("All")}>
          All
        </button>
        <button className={filter === "Drugs" ? "active" : ""} onClick={() => setFilter("Drugs")}>
          Drugs
        </button>
        <button className={filter === "RxGroup" ? "active" : ""} onClick={() => setFilter("RxGroup")}>
          Rx Group
        </button>
      </div>
    </div>
  );
}
