
import React, { StrictMode, useEffect, useState } from "react";

import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useSelector } from "react-redux";
import { monthNames } from "../util/type";

ModuleRegistry.registerModules([AllCommunityModule]);

const Planning = () => {
  const [months, setMonths] = useState<number>(0);
  const [rowData, setRowData] = useState<any[]>([]);

  const storeData: any = useSelector((data) => data);



  useEffect(() => {
    let date = new Date();
    let months = date.getMonth();
    setMonths(months);
    const map = new Map();
    
    storeData.store.forEach((item: any) => {
      map.set(item.sn, item);
    });
    
    storeData.add_sku.forEach((item: any) => {
      const existingItem = map.get(item.sn);
      const weekCount = getWeeks();
      
      // Create week-specific fields for each item
      const weekFields:any = {};
      for (let i = 0; i < weekCount; i++) {
        weekFields[`salesUnits${i}_${item.sn}`] = 0;
        weekFields[`salesDollars${i}_${item.sn}`] = 0;
        weekFields[`gmDollars${i}_${item.sn}`] = 0;
        weekFields[`gmPercent${i}_${item.sn}`] = 0;
      }
      
      if (existingItem) {
        map.set(item.sn, { ...existingItem, ...item, ...weekFields });
      } 
    });
    
    const getarr = Array.from(map.values());
    console.log(getarr, "storeData.add_sku");
    setRowData(getarr as any);
  }, []);

  const getWeeks = () => {
    let date = new Date();
    let daysInWeek = new Date(date.getFullYear(), months + 1, 0).getDate(); // Fixed calculation
    let weekDivide = Math.ceil(daysInWeek / 7);
    return weekDivide;
  };

  function percentageCellStyle(params: any) {
    const value = params.value;
    if (value >= 0.4) return { backgroundColor: "green", color: "white" };
    if (value >= 0.1) return { backgroundColor: "yellow", color: "black" };
    if (value > 0.05) return { backgroundColor: "orange", color: "white" };
    return { backgroundColor: "red", color: "white" };
  }

  const [colDefs, setColDefs] = useState([
    { field: "store", pinned: "left" },
    { field: "sku", pinned: "left" },
    {
      headerName: monthNames[months],
      children: Array.from({ length: getWeeks() }, (_, i) => ({
        headerName: `Week ${i + 1}`,
        children: [
          { 
            field: `salesUnits${i}`, 
            headerName: "Sales Units", 
            editable: true,
            valueGetter: (params: any) => {
              return params.data[`salesUnits${i}_${params.data.sn}`];
            },
            valueSetter: (params: any) => {
              params.data[`salesUnits${i}_${params.data.sn}`] = params.newValue;
              return true;
            }
          },
          {
            field: `salesDollars${i}`,
            headerName: "Sales Dollars",
            editable: false,
            valueGetter: (params: any) => {
              return params.data[`salesDollars${i}_${params.data.sn}`];
            }
          },
          { 
            field: `gmDollars${i}`, 
            headerName: "GM Dollars", 
            editable: false,
            valueGetter: (params: any) => {
              return params.data[`gmDollars${i}_${params.data.sn}`];
            }
          },
          {
            field: `gmPercent${i}`,
            headerName: "GM %",
            cellStyle: percentageCellStyle,
            valueFormatter: (params: any) =>
              `${(params.value * 100).toFixed(1)}%`,
            valueGetter: (params: any) => {
              return params.data[`gmPercent${i}_${params.data.sn}`];
            }
          },
        ],
      })),
    },
  ]);

  const defaultColDef = {
    resizable: true,
  };

  const onCellEditingStarted = (event: any) => {
    console.log("Cell editing started", event);
  };

  const onCellEditingStopped = (event: any) => {
    const columnId = event.column.getColId();
    const weekMatch = columnId.match(/salesUnits(\d+)/);
    
    if (!weekMatch) return;
    
    const weekNum = weekMatch[1];
    const sn = event.data.sn;
    const salesValue = event.data[`salesUnits${weekNum}_${sn}`];
    const price = event.data.price || 0;
    const cost = event.data.cost || 0;
    
    const salesDollarsData = salesValue * price;
    const gmDaller = (salesDollarsData - salesValue) * cost;
    const gmDollarsData = salesDollarsData > 0 ? gmDaller / salesDollarsData : 0;
    
    setRowData((prevRowData: any[]) => 
      prevRowData.map((row) => {
        if (row.sn === event.data.sn) {
          return { 
            ...row, 
            [`salesUnits${weekNum}_${sn}`]: salesValue,
            [`salesDollars${weekNum}_${sn}`]: salesDollarsData,
            [`gmDollars${weekNum}_${sn}`]: gmDaller,
            [`gmPercent${weekNum}_${sn}`]: gmDollarsData
          };
        }
        return row;
      })
    );
  };

  return (
    <div className="content-area" style={{ overflowY: "auto" }}>
      {/* Scrollable Container */}
      <div className="ag-theme-alpine" style={{ height: "100vh", width: "100%" }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs as any}
          defaultColDef={defaultColDef}
          onCellEditingStarted={onCellEditingStarted}
          onCellEditingStopped={onCellEditingStopped}
        />
      </div>
    </div>
  );
};

export default Planning;
