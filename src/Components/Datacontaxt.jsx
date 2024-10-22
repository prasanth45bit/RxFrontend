import { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [SelectedRx, setSelectedRx] = useState([null]);

  return (
    <DataContext.Provider value={{ SelectedRx, setSelectedRx }}>
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => useContext(DataContext);