'use client';

import React, { useEffect, useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "@/lib/ag-grid-setup";
import Image from 'next/image';
import {ColDef, GridApi, ICellRendererParams, GetRowIdParams } from "ag-grid-community";
import SelectAll from "@/components/agTable/SelectAll";
import CustomPagination from "@/components/agTable/CustomPagination";
import ColumnSettings from "@/components/agTable/ColumnSettings";
import ActionButtons from "@/components/agTable/ActionButtons";
import { useCertificationDetails, fetchAccessDetails} from "@/hooks/useApi";
import { getLineItemDetails } from "@/lib/api";
import { EntitlementInfo } from "@/types/lineItem";
import {UserRowData} from "@/types/certification"

interface TreeClientProps {
  reviewerId: string;
  certId: string;
}

const TreeClient: React.FC<TreeClientProps> = ({ reviewerId, certId }) => {
  const gridApiRef = useRef<GridApi | null>(null);
  const [rowData, setRowData] = useState<UserRowData[]>([]);
  const { data: certificationData, error } = useCertificationDetails(reviewerId, certId);
  

  useEffect(() => {
    if (!certificationData) return;
    const mapped = certificationData.items.map((task: any) => {
      const userInfo = task.userInfo?.[0] || {};
      const access = task.access?.[0] || {};
      const delta = task.DeltaChanges?.[0] || {};

      return {
        id: task.taskId, 
        ...userInfo,
        certificationId: certId,
        taskId: task.taskId,
        numOfApplicationsCertified: access.numOfApplicationsCertified,
        numOfRolesCertified: access.numOfRolesCertified,
        numOfEntitlementsCertified: access.numOfEntitlementsCertified,
        profileChange: delta.profileChange,
        SoDConflicts: delta.SoDConflicts,
        addedAccounts: delta.addedAccounts,
        addedEntitlements: delta.addedEntitlements,
      };
    });

    setRowData(mapped);
  }, [certificationData, certId]);

  const columnDefs = useMemo<ColDef[]>(() => [
      {
    headerCheckboxSelection: true,
    checkboxSelection: true,
    headerComponent:()=> "Users",
    field: "UserName",
    headerName: "Users", 
    cellRenderer: "agGroupCellRenderer",
    cellRendererParams: {
      suppressCount: true,
      innerRenderer: (params: ICellRendererParams) => {
        return <div className="flex items-center gap-4">
          <Image
            src="https://avatar.iran.liara.run/public/9"
            alt="User Avatar"
            width={32}
            height={32}
            className="w-8 h-8 rounded-full"
          />
          {params.value}
          </div>
      },
    },
   
  },  
    { field: "Risk", headerName: "Risk",
      cellRenderer: (params: ICellRendererParams) => {
        const userName = params.value;
        const risk = params.data?.Risk;
        const riskColor = risk === "High" ? "red" : risk === "Medium" ? "orange" : "green";
        return (
          <span style={{ color: riskColor }}>
            {userName}
          </span>
        );
       }
    },
    { field: "UserID", headerName: "ID" },
    { field: "JobTitle", headerName: "Job Title" },
    {
      colId: "actionColumn",
      headerName: "Action",
      headerComponent:()=> null,
      cellRenderer: (params: ICellRendererParams) => {
      
        const api = gridApiRef.current;
        if (!api) return null;
    
        return (
          <ActionButtons
            api={api}
            selectedRows={params.data}
          />
        );
      },
      suppressMenu: true,
      sortable: false,
      filter: false,
      resizable: false,
    }
    
  ], []);

  const defaultColDef = useMemo<ColDef>(() => ({
    flex: 1,
    resizable: true,
  }), []);

  const detailCellRendererParams = useMemo(() => ({
    detailGridOptions: {
      columnDefs: [{
        headerCheckboxSelection: true,
        checkboxSelection: true,
        headerComponent:()=> "Account",
       field: "user", headerName: "Account", 
       cellRenderer: "agGroupCellRenderer",
        cellRendererParams: {
          suppressCount: true,
          innerRenderer: (params: ICellRendererParams) => {
            return <div className="flex items-center gap-4">
               <Image
                  src="https://avatar.iran.liara.run/public/9"
                  alt="User Avatar"
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full"
                />
              <small className="leading-4">{params.value.split('\n')[0]}<br/>{params.value.split('\n')[1]}</small>
              </div>
          },
        },
       
      },  
      { field: "risk", headerName: "Risk",
      cellRenderer: (params: ICellRendererParams) => {
        const userName = params.value;
        const risk = params.data?.Risk;
        const riskColor = risk === "High" ? "red" : risk === "Medium" ? "orange" : "green";
        return (
          <span style={{ color: riskColor }}>
            {userName}
          </span>
        );
       }
    },
        { field: "applicationName", headerName: "Application" },
        { field: "description", headerName: "Description" },
        { field: "lastLogin", headerName: "Last Login " },
        { field: "recommendation", headerName: "AI Assist Confidence",
          cellRenderer: (params: ICellRendererParams) => {
            const cellText = params.value;
            return (
              <div className="leading-3.5 flex items-center justify-center h-full">
                <span>
               {/* <span className="font-semibold text-[#175AE4] text-[12px]">{cellText as string}</span> */}
               {
                cellText=="Certify" ?
                <svg width="21" height="18" viewBox="0 0 21 18" className="m-auto" >
                <path fill="#34C759" d="  M3.76 7.5V18.76H0V7.5H3.76ZM18.76 6.24C18.9277 6.23138 19.0954 6.25807 19.2522 6.31834C19.409 6.37861 19.5513 6.47112 19.6701 6.58989C19.7889 6.70866 19.8814 6.85103 19.9417 7.00781C20.0019 7.16458 20.0286 7.33226 20.02 7.5V12.16C19.9961 12.3819 19.9353 12.5982 19.84 12.8L17 17.54C16.772 17.9044 16.4571 18.2066 16.0837 18.4195C15.7102 18.6324 15.2898 18.7494 14.86 18.76H7.5C6.83696 18.76 6.20107 18.4966 5.73223 18.0278C5.26339 17.5589 5 16.923 5 16.26V7.12C5.00576 6.55515 5.19531 6.00753 5.54 5.56L10 0C10.3342 0 10.6547 0.13275 10.891 0.369045C11.1273 0.605341 11.26 0.925827 11.26 1.26V6.26L18.76 6.24Z" />
                </svg>
                : 
                <svg width="21" height="19" viewBox="0 0 21 19" fill="none"  className="m-auto">
                <path fill="#FF2D55" d="M3.76 11.24V0H0V11.26L3.76 11.24ZM18.76 12.5C18.9277 12.5086 19.0954 12.4819 19.2522 12.4217C19.409 12.3614 19.5513 12.2689 19.6701 12.1501C19.7889 12.0313 19.8814 11.889 19.9417 11.7322C20.0019 11.5754 20.0286 11.4077 20.02 11.24V6.58C19.9961 6.35812 19.9353 6.1418 19.84 5.94L17 1.2C16.7678 0.836499 16.4487 0.53649 16.0717 0.327006C15.6946 0.117522 15.2713 0.00514447 14.84 0H7.5C6.83696 0 6.20107 0.263392 5.73223 0.732233C5.26339 1.20107 5 1.83696 5 2.5V11.62C5 12.1933 5.18 12.7133 5.54 13.18L10 18.74C10.3342 18.74 10.6547 18.6073 10.891 18.371C11.1273 18.1347 11.26 17.8142 11.26 17.48V12.48L18.76 12.5Z"/>
                </svg>
                }
             </span>  
            </div> 
            );
           }
         },
        {
          colId: "actionColumn",
          headerName: "Action",
          headerComponent:()=> null,
          cellRenderer: (params: ICellRendererParams) => {
          
            const api = gridApiRef.current;
            if (!api) return null;
        
            return (
              <ActionButtons
                api={api}
                selectedRows={params.data}
              />
            );
          },
          suppressMenu: true,
          sortable: false,
          filter: false,
          resizable: false,
        } 
      ],
      defaultColDef: {
        flex: 1,
        resizable: true,
      },
      rowSelection: "multiple",
      masterDetail: true,
      isRowMaster: () => true,
      detailCellRendererParams: {
        detailGridOptions: {
          columnDefs: [
            {
              headerCheckboxSelection: true,
              checkboxSelection: true,
              headerComponent:()=> "Entitlement",
             field: "entitlementName", headerName: "Entitlement", 
             cellRenderer: "agGroupCellRenderer",
              cellRendererParams: {
                suppressCount: true,
                innerRenderer: (params: ICellRendererParams) => {
                  return <div className="flex items-center gap-4">
                     <Image
                        src="https://avatar.iran.liara.run/public/9"
                        alt="User Avatar"
                        width={32}
                        height={32}
                        className="w-8 h-8 rounded-full"
                      />
                    {params.value}</div>
                },
              },
             
            },  
              { field: "itemRisk", headerName: "Risk",
                cellRenderer: (params: ICellRendererParams) => {
                  const userName = params.value;
                  const risk = params.data?.Risk;
                  const riskColor = risk === "High" ? "red" : risk === "Medium" ? "orange" : "green";
                  return (
                    <span style={{ color: riskColor }}>
                      {userName}
                    </span>
                  );
                 }
              },        
             { field: "Justification", headerName: "Justification" },    
             { field: "entitlementDescription", headerName: "Description" },  
            { field: "accessedWithinAMonth", headerName: "Access History" },
            { field: "recommendation", headerName: "AI Assist Confidence",
              cellRenderer: (params: ICellRendererParams) => {
                const cellText = params.value;
                return (
                  <div className="leading-3.5 flex items-center justify-center h-full">
                    <span>
                  
                   {
                    cellText=="Certify" ?
                    <svg width="21" height="18" viewBox="0 0 21 18" className="m-auto" >
                    <path fill="#34C759" d="  M3.76 7.5V18.76H0V7.5H3.76ZM18.76 6.24C18.9277 6.23138 19.0954 6.25807 19.2522 6.31834C19.409 6.37861 19.5513 6.47112 19.6701 6.58989C19.7889 6.70866 19.8814 6.85103 19.9417 7.00781C20.0019 7.16458 20.0286 7.33226 20.02 7.5V12.16C19.9961 12.3819 19.9353 12.5982 19.84 12.8L17 17.54C16.772 17.9044 16.4571 18.2066 16.0837 18.4195C15.7102 18.6324 15.2898 18.7494 14.86 18.76H7.5C6.83696 18.76 6.20107 18.4966 5.73223 18.0278C5.26339 17.5589 5 16.923 5 16.26V7.12C5.00576 6.55515 5.19531 6.00753 5.54 5.56L10 0C10.3342 0 10.6547 0.13275 10.891 0.369045C11.1273 0.605341 11.26 0.925827 11.26 1.26V6.26L18.76 6.24Z" />
                    </svg>
                    : 
                    <svg width="21" height="19" viewBox="0 0 21 19" fill="none"  className="m-auto">
                    <path fill="#FF2D55" d="M3.76 11.24V0H0V11.26L3.76 11.24ZM18.76 12.5C18.9277 12.5086 19.0954 12.4819 19.2522 12.4217C19.409 12.3614 19.5513 12.2689 19.6701 12.1501C19.7889 12.0313 19.8814 11.889 19.9417 11.7322C20.0019 11.5754 20.0286 11.4077 20.02 11.24V6.58C19.9961 6.35812 19.9353 6.1418 19.84 5.94L17 1.2C16.7678 0.836499 16.4487 0.53649 16.0717 0.327006C15.6946 0.117522 15.2713 0.00514447 14.84 0H7.5C6.83696 0 6.20107 0.263392 5.73223 0.732233C5.26339 1.20107 5 1.83696 5 2.5V11.62C5 12.1933 5.18 12.7133 5.54 13.18L10 18.74C10.3342 18.74 10.6547 18.6073 10.891 18.371C11.1273 18.1347 11.26 17.8142 11.26 17.48V12.48L18.76 12.5Z"/>
                    </svg>
                    }
                 </span>  
                </div> 
                );
               }
             },
             {
              colId: "actionColumn",
              headerName: "Action",
              headerComponent:()=> null,
              cellRenderer: (params: ICellRendererParams) => {
                const api = gridApiRef.current;
                if (!api) return null;
                return (
                  <ActionButtons
                    api={api}
                    selectedRows={params.data}
                  />
                );
              },
              suppressMenu: true,
              sortable: false,
              filter: false,
              resizable: false,
            } 
          ],
          defaultColDef: {
            flex: 1,
            resizable: true,
          },
        },
        getDetailRowData: async (params: any) => {
          const { taskId, lineItemId } = params.data;
          if (!taskId || !lineItemId) return;
      
          try {
            const data = await getLineItemDetails(reviewerId, certId, taskId, lineItemId);
      
            const mapped = data.map((item) => {
              const info: EntitlementInfo = item.entitlementInfo?.[0] ?? {
                entitlementName: '',
                entitlementDescription: '',
              };
              const ai = item.AIAssist?.[0] ?? {};
              return {
                entitlementName: info.entitlementName ?? '',
                entitlementDescription: info.entitlementDescription ?? '',
                recommendation: ai.Recommendation ?? '',
                accessedWithinAMonth: ai.accessedWithinAMonth ?? '',
                itemRisk: item.itemRisk ?? '',
                percAccessInSameDept: ai.percAccessInSameDept ?? '',
                percAccessWithSameJobtitle: ai.percAccessWithSameJobtitle ?? '',
                percAccessWithSameManager: ai.percAccessWithSameManager ?? '',
                actionInLastReview: ai.actionInLastReview ?? '',
              };
            });
      
            params.successCallback(mapped);
          } catch (err) {
            console.error("Failed to load entitlements", err);
            params.successCallback([]);
          }
        },
      },
    },
    getDetailRowData: async (params: any) => {
      const taskId = params.data.taskId;
      if (!taskId) return;
      console.log('1st level');
      try {
        const data = await fetchAccessDetails(reviewerId, certId, taskId);
        params.successCallback(data ?? []);
      } catch (err) {
        console.error("Error loading accessDetails", err);
        params.successCallback([]);
      }
    }
  }),[certId, reviewerId]);
  

  return (
    <div style={{ height: "100vh", width: "100%", display: "flex", flexDirection: "column" }}>
      {error && <div style={{ color: "red", padding: 10 }}>{String(error)}</div>}

    <div className="ag-theme-alpine" style={{ flexGrow: 1 }}>
      <div className="flex items-center justify-between mb-4 relative z-10">
      <SelectAll gridApi={gridApiRef.current || null} />
        <div className="flex items-center">
        <CustomPagination gridApi={gridApiRef.current || null} /> 
        <ColumnSettings
            columnDefs={columnDefs}
            gridRef={gridApiRef}
            visibleColumns={() => {
              const visibleCols: string[] = [];
              columnDefs.forEach((colDef) => {
                if (colDef.field) {
                  visibleCols.push(colDef.field);
                }
              });
              return visibleCols;
            }}
          />
        </div>
      </div>

        <AgGridReact
          rowData={rowData}
          getRowId={(params:GetRowIdParams) => params.data.id}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          masterDetail={true}
          rowSelection="multiple"
          detailCellRendererParams={detailCellRendererParams}
          isRowMaster={() => true}
          onGridReady={(params) => {
            gridApiRef.current = params.api;
            params.api.sizeColumnsToFit();
          }}
          overlayLoadingTemplate={`<span class="ag-overlay-loading-center">⏳ Loading certification data...</span>`}
          overlayNoRowsTemplate={`<span class="ag-overlay-loading-center">No data to display.</span>`}
        />
      </div>
    </div>
  );
};

export default TreeClient;
