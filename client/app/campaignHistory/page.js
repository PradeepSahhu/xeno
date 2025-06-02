"use client";

import { useState, useMemo, useEffect } from "react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

ModuleRegistry.registerModules([AllCommunityModule]);

const CampaignHistory = () => {
  const [campaignData, setCampaignData] = useState();
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [campaignDetails, setCampaignDetails] = useState(null);
  const [loading, setLoading] = useState(false);

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

  // Fetch campaign details including customer data
  const fetchCampaignDetails = async (campaignId) => {
    setLoading(true);
    try {
      // Replace with your actual API endpoint
      const res = await fetch(
        `http://localhost:4000/api/log/getCampaign/${campaignId}`
      );
      const data = await res.json();

      console.table(data);
      console.log("the response is : " + data.data);
      setCampaignDetails(data.data);
    } catch (error) {
      console.error("Error fetching campaign details:", error);
      // Mock data for demonstration
      setCampaignDetails({
        name: selectedCampaign.name,
        message: "Get 25% off on all products this summer! Limited time offer.",
        sentCount: 1400,
        failedCount: 100,
        customers: [
          {
            id: 1,
            name: "John Smith",
            email: "john.smith@email.com",
            status: "sent",
            sentAt: "2024-07-20T10:30:00Z",
          },
          {
            id: 2,
            name: "Sarah Johnson",
            email: "sarah.j@email.com",
            status: "sent",
            sentAt: "2024-07-20T10:31:00Z",
          },
          {
            id: 3,
            name: "Mike Wilson",
            email: "mike.wilson@email.com",
            status: "failed",
            failedAt: "2024-07-20T10:32:00Z",
            failReason: "Invalid email address",
          },
          {
            id: 4,
            name: "Emily Davis",
            email: "emily.davis@email.com",
            status: "sent",
            sentAt: "2024-07-20T10:33:00Z",
          },
          {
            id: 5,
            name: "Robert Brown",
            email: "robert.brown@email.com",
            status: "failed",
            failReason: "Bounce back",
          },
        ],
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle row click
  const onRowClicked = (event) => {
    console.log(event.data);
    setSelectedCampaign(event.data);
    setShowModal(true);
    fetchCampaignDetails(event.data.id || event.data.name);
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
          id: campaign.id || campaign._id,
          name: campaign.name,
          rule: parseRule(campaign.rule),
          rawRule: campaign.rule,
          audienceSize: campaign.audienceSize || 0,
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
            id: "1",
            name: "Summer Promo",
            rule: "country == 'US'",
            audienceSize: 1500,
            createdAt: "2024-07-20",
            createdBy: "John Doe",
          },
          {
            id: "2",
            name: "Winter Sale",
            rule: "age >= 25",
            audienceSize: 2000,
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
        cellStyle: {
          fontWeight: "600",
          fontSize: "14px",
          cursor: "pointer",
          color: "#C5172E",
        },
      },
      {
        field: "rule",
        headerName: "Targeting Rule",
        flex: 1.8,
        minWidth: 250,
        cellRenderer: (params) => {
          const rule = params.value;
          return (
            <div className="px-2 py-1 rounded-xl text-xs font-medium capitalize inline-block">
              {rule}
            </div>
          );
        },
      },
      {
        field: "audienceSize",
        headerName: "Audience Size",
        sortable: true,
        flex: 0.8,
        minWidth: 120,
        cellStyle: (params) => ({
          textAlign: "center",
          fontSize: "14px",
          fontWeight: "500",
          cursor: "pointer",
        }),
        valueFormatter: (params) => params.value?.toLocaleString() || "0",
      },
      {
        field: "createdAt",
        headerName: "Created Date & Time",
        sortable: true,
        sort: "asc",
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
        cellStyle: { fontSize: "12px", cursor: "pointer" },
      },
      {
        field: "createdBy",
        headerName: "Created By",
        flex: 0.8,
        minWidth: 120,
        cellStyle: { fontSize: "13px", fontWeight: "500", cursor: "pointer" },
      },
    ],
    []
  );

  // Column definitions for customer details table
  const customerColDefs = useMemo(
    () => [
      {
        field: "customerName",
        headerName: "Customer Name",
        flex: 1,
        minWidth: 100,
        cellStyle: { fontWeight: "500" },
      },
      {
        field: "customerEmail",
        headerName: "Email ID",
        flex: 1.2,
        minWidth: 200,
        cellStyle: { fontFamily: "monospace", fontSize: "13px" },
      },
      {
        field: "status",
        headerName: "Status",
        flex: 0.6,
        minWidth: 100,
        cellRenderer: (params) => {
          const status = params.value;
          const statusClasses =
            status === "SENT"
              ? "text-green-600 bg-green-100"
              : "text-red-600 bg-red-100";

          return (
            <div
              className={`px-2 py-1 rounded-xl text-xs font-medium capitalize ${statusClasses}`}
            >
              {status}
            </div>
          );
        },
      },
      {
        field: "message",
        headerName: "message",
        flex: 1,
        minWidth: 300,
        cellStyle: { fontSize: "12px" },
      },
      {
        field: "sendAt",
        headerName: "SendAt",
        flex: 1,
        minWidth: 150,
        cellStyle: { fontSize: "12px" },
        valueFormatter: (params) => {
          if (!params.value) return "";
          const date = new Date(params.value);
          return date.toLocaleString("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          });
        },
      },
    ],
    []
  );

  const closeModal = () => {
    setShowModal(false);
    setSelectedCampaign(null);
    setCampaignDetails(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-full mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Campaign History
          </h1>
          <p className="text-gray-600">
            View and manage your past marketing campaigns. Click on any row to
            see detailed information.
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
              onRowClicked={onRowClicked}
              defaultColDef={{
                resizable: true,
                sortable: true,
              }}
              rowStyle={{ cursor: "pointer" }}
              getRowStyle={(params) => ({
                cursor: "pointer",
              })}
            />
          </div>
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
              <div className="flex justify-between items-center p-6 border-b border-gray-200">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {selectedCampaign?.name}
                  </h2>
                  <p className="text-gray-600 mt-1">
                    Campaign Details & Customer List
                  </p>
                </div>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                >
                  ×
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
                {loading ? (
                  <div className="flex justify-center items-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                  </div>
                ) : campaignDetails ? (
                  <div className="space-y-6">
                    {/* Campaign Summary */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <h3 className="text-sm font-medium text-green-800 mb-1">
                          Messages Sent
                        </h3>
                        <p className="text-2xl font-bold text-green-900">
                          {campaignDetails.sentCount?.toLocaleString() || "0"}
                        </p>
                      </div>
                      <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                        <h3 className="text-sm font-medium text-red-800 mb-1">
                          Failed Messages
                        </h3>
                        <p className="text-2xl font-bold text-red-900">
                          {campaignDetails.failedCount?.toLocaleString() || "0"}
                        </p>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <h3 className="text-sm font-medium text-blue-800 mb-1">
                          Total Recipients
                        </h3>
                        <p className="text-2xl font-bold text-blue-900">
                          {(
                            (campaignDetails.sentCount || 0) +
                            (campaignDetails.failedCount || 0)
                          ).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Customer Details
                      </h3>
                      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                        <div
                          className="ag-theme-alpine"
                          style={{
                            height: 400,
                            width: "100%",
                          }}
                        >
                          <AgGridReact
                            rowData={campaignDetails.message || []}
                            columnDefs={customerColDefs}
                            domLayout="normal"
                            rowHeight={45}
                            headerHeight={40}
                            animateRows={true}
                            defaultColDef={{
                              resizable: true,
                              sortable: true,
                            }}
                            pagination={true}
                            paginationPageSize={10}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    No details available for this campaign.
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="flex justify-end p-6 border-t border-gray-200">
                <button
                  onClick={closeModal}
                  className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CampaignHistory;
