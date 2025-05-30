"use client";

// import { useState, useMemo, useEffect } from "react";
// import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
// import { AgGridReact } from "ag-grid-react";
// import "ag-grid-community/styles/ag-grid.css";
// import "ag-grid-community/styles/ag-theme-alpine.css";

// ModuleRegistry.registerModules([AllCommunityModule]);

// const CampaignHistory = () => {
//   const [campaignData, setCampaignData] = useState();

//   useEffect(() => {
//     const fetchAllCampaigns = async () => {
//       const res = await fetch(
//         "http://localhost:4000/api/campaign/getAllCampaign"
//       );

//       const value = await res.json();

//       console.log(value.data);

//       setCampaignData(value.data);
//     };

//     fetchAllCampaigns();
//   }, []);
//   const [rowData, setRowData] = useState([
//     {
//       id: "",
//       name: "Summer Promo",
//       message: "Enjoy 20% off all items!",
//       rule: "country == 'US'",
//       audienceSize: 1500,
//       sentCount: 1400,
//       failedCount: 100,
//       createdAt: "2024-07-20",
//     },
//     {
//       id: "",
//       name: "Winter Sale",
//       message: "Massive discounts on winter wear",
//       rule: "age >= 25",
//       audienceSize: 2000,
//       sentCount: 1950,
//       failedCount: 50,
//       createdAt: "2024-12-01",
//     },
//     {
//       id: "",
//       name: "Back to School",
//       message: "School supplies deals",
//       rule: "student == true",
//       audienceSize: 1200,
//       sentCount: 1180,
//       failedCount: 20,
//       createdAt: "2024-08-10",
//     },
//     {
//       id: "",
//       name: "New Year Launch",
//       message: "Kickstart your year with our new collection!",
//       rule: "subscribed == true",
//       audienceSize: 3000,
//       sentCount: 2900,
//       failedCount: 100,
//       createdAt: "2025-01-05",
//     },
//   ]);

//   const colDefs = useMemo(
//     () => [
//       { field: "id", headerName: "ID", shortable: true },
//       { field: "name", headerName: "Campaign Name", sortable: true },
//       { field: "message", headerName: "Message", flex: 1 },
//       { field: "rule", headerName: "Rule", flex: 1 },
//       { field: "audienceSize", headerName: "Audience Size", sortable: true },
//       { field: "sentCount", headerName: "Sent", sortable: true },
//       { field: "failedCount", headerName: "Failed", sortable: true },
//       {
//         field: "createdAt",
//         headerName: "Date Created",
//         sortable: true,
//         sort: "desc",
//         comparator: (a, b) => new Date(b) - new Date(a),
//       },
//     ],
//     []
//   );

//   return (
//     <div className="min-h-screen flex flex-col px-4 sm:px-6 lg:px-8 py-10 bg-white text-black">
//       <div className="w-full max-w-6xl mx-auto">
//         <h2 className="text-2xl font-semibold mb-2">Campaign History</h2>
//         <ul className="mb-6 list-disc list-inside text-gray-700">
//           <li>Past campaign records</li>
//           <li>Associated rules for each campaign</li>
//           <li>Success/failure counts and dates</li>
//         </ul>

//         <div
//           className="ag-theme-alpine"
//           style={{
//             height: 500,
//             width: "100%",
//             borderRadius: "0.75rem",
//             overflow: "hidden",
//             border: "1px solid #e5e7eb",
//           }}
//         >
//           <AgGridReact
//             rowData={campaignData}
//             columnDefs={colDefs}
//             domLayout="autoHeight"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CampaignHistory;
"use client";

import { useState, useMemo, useEffect } from "react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

ModuleRegistry.registerModules([AllCommunityModule]);

const CampaignHistory = () => {
  const [campaignData, setCampaignData] = useState();

  // Helper function to parse complex rule structure into readable format
  const parseRule = (ruleObj) => {
    if (typeof ruleObj === "string") return ruleObj;

    if (!ruleObj || !ruleObj.rules) return "No rule defined";

    const formatRule = (rule) => {
      if (rule.field && rule.operator && rule.value !== undefined) {
        return `${rule.field} ${rule.operator} ${rule.value}`;
      }
      return "";
    };

    if (ruleObj.rules.length === 1) {
      return formatRule(ruleObj.rules[0]);
    }

    const combinator = ruleObj.combinator?.toUpperCase() || "AND";
    const ruleStrings = ruleObj.rules.map(formatRule).filter((r) => r);
    return ruleStrings.join(` ${combinator} `);
  };

  useEffect(() => {
    const fetchAllCampaigns = async () => {
      try {
        const res = await fetch(
          "http://localhost:4000/api/campaign/getAllCampaign"
        );
        const value = await res.json();

        // Process and clean the data
        const processedData = value.data?.map((campaign) => ({
          name: campaign.name,
          rule: parseRule(campaign.rule),
          rawRule: campaign.rule,
          audienceSize: campaign.audienceSize || 0,
          sentCount: campaign.sentCount || 0,
          failedCount: campaign.failedCount || 0,
          createdAt: campaign.createdAt,
          createdBy: campaign.createdBy,
          updatedAt: campaign.updatedAt,
        }));

        console.log(processedData);
        setCampaignData(processedData);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
        // Fallback to sample data if API fails
        setCampaignData([
          {
            name: "Summer Promo",
            rule: "country == 'US'",
            audienceSize: 1500,
            sentCount: 1400,
            failedCount: 100,
            createdAt: "2024-07-20",
            createdBy: "John Doe",
          },
          {
            name: "Winter Sale",
            rule: "age >= 25",
            audienceSize: 2000,
            sentCount: 1950,
            failedCount: 50,
            createdAt: "2024-12-01",
            createdBy: "Jane Smith",
          },
        ]);
      }
    };

    fetchAllCampaigns();
  }, []);

  const colDefs = useMemo(
    () => [
      {
        field: "name",
        headerName: "Campaign Name",
        sortable: true,
        flex: 1.2,
        minWidth: 180,
        cellStyle: { fontWeight: "600", fontSize: "14px" },
      },
      {
        field: "rule",
        headerName: "Targeting Rule",
        flex: 1.8,
        minWidth: 250,
        cellRenderer: (params) => {
          const rule = params.value;
          return `<div style="width: 100%; padding: 2px;">
            <input type="text" value="${rule}" readonly 
              style="width: 100%; padding: 6px 10px; border: 1px solid #d1d5db; border-radius: 6px; background-color: #f9fafb; font-family: monospace; font-size: 12px; color: #374151; cursor: default;" />
          </div>`;
        },
      },
      {
        field: "audienceSize",
        headerName: "Audience Size",
        sortable: true,
        flex: 0.8,
        minWidth: 120,
        cellStyle: { textAlign: "right", fontSize: "14px", fontWeight: "500" },
        valueFormatter: (params) => params.value?.toLocaleString() || "0",
      },
      {
        field: "sentCount",
        headerName: "Messages Sent",
        sortable: true,
        flex: 0.8,
        minWidth: 120,
        cellStyle: {
          textAlign: "right",
          color: "#28a745",
          fontWeight: "600",
          fontSize: "14px",
        },
        valueFormatter: (params) => params.value?.toLocaleString() || "0",
      },
      {
        field: "failedCount",
        headerName: "Messages Failed",
        sortable: true,
        flex: 0.8,
        minWidth: 120,
        cellStyle: {
          textAlign: "right",
          color: "#dc3545",
          fontWeight: "600",
          fontSize: "14px",
        },
        valueFormatter: (params) => params.value?.toLocaleString() || "0",
      },
      {
        field: "createdAt",
        headerName: "Created Date & Time",
        sortable: true,
        sort: "desc",
        flex: 1.2,
        minWidth: 180,
        comparator: (a, b) => new Date(b) - new Date(a),
        valueFormatter: (params) => {
          const date = new Date(params.value);
          return date.toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          });
        },
        cellStyle: { fontSize: "12px" },
      },
      {
        field: "createdBy",
        headerName: "Created By",
        flex: 0.8,
        minWidth: 120,
        cellStyle: { fontSize: "13px", fontWeight: "500" },
      },
    ],
    []
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-full mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Campaign History
          </h1>
          <p className="text-gray-600">
            View and manage your past marketing campaigns
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div
            className="ag-theme-alpine"
            style={{
              height: 600,
              width: "100%",
            }}
          >
            <AgGridReact
              rowData={campaignData}
              columnDefs={colDefs}
              domLayout="normal"
              rowHeight={55}
              headerHeight={45}
              animateRows={true}
              suppressHorizontalScroll={false}
              defaultColDef={{
                resizable: true,
                sortable: true,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignHistory;
