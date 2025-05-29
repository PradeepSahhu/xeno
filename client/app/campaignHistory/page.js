"use client";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useState } from "react";
ModuleRegistry.registerModules([AllCommunityModule]);

const campaignHistory = () => {
  // Row Data: The data to be displayed.
  const [rowData, setRowData] = useState([
    { make: "Tesla", model: "Model Y", price: 64950, electric: true },
    { make: "Ford", model: "F-Series", price: 33850, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
    { make: "Chevrolet", model: "Silverado", price: 42100, electric: false },
    { make: "Honda", model: "Civic", price: 28100, electric: false },
    { make: "BMW", model: "i4", price: 56400, electric: true },
    { make: "Nissan", model: "Leaf", price: 31250, electric: true },
    { make: "Hyundai", model: "Kona Electric", price: 38400, electric: true },
    { make: "Volkswagen", model: "ID.4", price: 43900, electric: true },
    { make: "Kia", model: "EV6", price: 48300, electric: true },
    { make: "Jeep", model: "Wrangler", price: 39800, electric: false },
    { make: "Subaru", model: "Outback", price: 35600, electric: false },
    { make: "Mazda", model: "CX-5", price: 34900, electric: false },
    { make: "Mercedes-Benz", model: "EQB", price: 59900, electric: true },
    { make: "Lucid", model: "Air", price: 77400, electric: true },
    { make: "Rivian", model: "R1T", price: 73100, electric: true },
    { make: "Chevrolet", model: "Bolt EV", price: 27500, electric: true },
    { make: "Ford", model: "Mustang Mach-E", price: 48600, electric: true },
    { make: "Toyota", model: "Camry", price: 31500, electric: false },
    { make: "Honda", model: "Accord", price: 32700, electric: false },
    { make: "Tesla", model: "Model 3", price: 41990, electric: true },
    { make: "Tesla", model: "Model X", price: 89990, electric: true },
    { make: "Hyundai", model: "IONIQ 5", price: 45700, electric: true },
    { make: "Nissan", model: "Ariya", price: 51200, electric: true },
    { make: "GMC", model: "Hummer EV", price: 110295, electric: true },
    { make: "Volkswagen", model: "Golf", price: 30500, electric: false },
    { make: "Audi", model: "Q4 e-tron", price: 52900, electric: true },
    { make: "BMW", model: "3 Series", price: 45300, electric: false },
    { make: "Kia", model: "Sorento", price: 36900, electric: false },
    { make: "Lexus", model: "RX", price: 51200, electric: false },
  ]);

  // Column Definitions: Defines the columns to be displayed.
  const [colDefs, setColDefs] = useState([
    { field: "make" },
    { field: "model" },
    { field: "price" },
    { field: "electric" },
  ]);

  return (
    <div>
      <div>
        <h2>It is the campaign history page</h2>
        <ul>
          <li>show the past campaign</li>
          <li>past campaign rules</li>
          <li> how much successful it was</li>
        </ul>
      </div>
      // Data Grid will fill the size of the parent container
      <div style={{ height: 500, width: 500, backgroundColor: "black" }}>
        <AgGridReact rowData={rowData} columnDefs={colDefs} />
      </div>
    </div>
  );
};

export default campaignHistory;
