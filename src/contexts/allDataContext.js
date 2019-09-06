import React, { createContext, useEffect, useState } from 'react';

import { getAllData } from '../apis/FPL';
import testData from '../apis/sampleAllData.json';

export const AllDataContext = createContext();

export function AllDataProvider({ children }) {
  const [allData, setAllData] = useState(testData);

  // useEffect(() => {
  //   async function getData() {
  //     const response = await getAllData();
  //     setAllData(response);
  //   }
  //   getData();
  // }, []);

  return (
    <AllDataContext.Provider value={allData}>
      {children}
    </AllDataContext.Provider>
  );
}
