'use client';

import React, { useEffect, useRef, useState, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import "@/lib/ag-grid-setup";
import { ColDef, GridApi } from "ag-grid-community";
import { getCertificationDetails, getAccessDetails} from "@/lib/api";

interface TreeClientProps {
  reviewerId: string;
  certId: string;
}

const TreeClient: React.FC<TreeClientProps> = ({ reviewerId, certId }) => {
  const gridApiRef = useRef<GridApi | null>(null);

  const [rowData, setRowData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const response = await getCertificationDetails(reviewerId, certId);
        const details = response.items || [];

        const mappedDetails = details.map((task: any) => {
          const userInfo = task.userInfo?.[0] || {};
          const access = task.access?.[0] || {};
          const deltaChanges = task.DeltaChanges?.[0] || {};

          return {
            ...userInfo,
            certificationId: certId,
            taskId: task.taskId,
            numOfApplicationsCertified: access.numOfApplicationsCertified,
            numOfRolesCertified: access.numOfRolesCertified,
            numOfEntitlementsCertified: access.numOfEntitlementsCertified,
            profileChange: deltaChanges.profileChange,
            SoDConflicts: deltaChanges.SoDConflicts,
            addedAccounts: deltaChanges.addedAccounts,
            addedEntitlements: deltaChanges.addedEntitlements,
          };
        });

        setRowData(mappedDetails);
        setError(null);
      } catch (err) {
        setError("Failed to fetch certification details.");
        setRowData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [reviewerId, certId]);

  const columnDefs = useMemo<ColDef[]>(() => [
      {
    headerCheckboxSelection: true,
    checkboxSelection: true,
    width: 50,
    pinned: "left",
    suppressMenu: true,
  },  
    { field: "UserName", headerName: "User Name", cellRenderer: "agGroupCellRenderer" },
    { field: "Email", headerName: "Email" },
    { field: "Risk", headerName: "Risk" },
    { field: "JobTitle", headerName: "Job Title" },
    { field: "UserType", headerName: "User Type" },
    { field: "Department", headerName: "Department" },
    { field: "numOfApplicationsCertified", headerName: "Apps Certified" },
    { field: "numOfRolesCertified", headerName: "Roles Certified" },
    { field: "numOfEntitlementsCertified", headerName: "Entitlements Certified" },
    { field: "profileChange", headerName: "Profile Change" },
    { field: "SoDConflicts", headerName: "SoD Conflicts" },
    { field: "addedAccounts", headerName: "Added Accounts" },
    { field: "addedEntitlements", headerName: "Added Entitlements" },
  ], []);

  const defaultColDef = useMemo<ColDef>(() => ({
    flex: 1,
    resizable: true,
  }), []);

  const detailCellRendererParams = useMemo(() => ({
    detailGridOptions: {
      columnDefs: [
         {
        headerCheckboxSelection: true,
        checkboxSelection: true,
        width: 50,
        pinned: "left",
        suppressMenu: true,
      },
        { field: "itemType", headerName: "Type" },
        { field: "name", headerName: "Name" },
        { field: "description", headerName: "Description" },
        { field: "action", headerName: "Action" },
        { field: "oldComments", headerName: "Old Comments" },
        { field: "risk", headerName: "Risk" },
        { field: "recommendation", headerName: "AI Recommendation" },
      ],
      defaultColDef: {
        flex: 1,
        resizable: true,
      },
       rowSelection: 'multiple', // 👈 Enable selection in child grid
    suppressRowClickSelection: true,
    },
    getDetailRowData: async (params: any) => {
      const taskId = params.data.taskId;

      const response = await getAccessDetails(reviewerId, certId, taskId);
      const items = response.items?.[0]?.accessDetails ?? [];
      const flattened: any[] = [];

      items.forEach((access: any) => {
        access.entityRole?.forEach((role: any) => {
          flattened.push({
            itemType: "Role",
            name: role.roleInfo?.[0]?.roleName,
            description: role.roleInfo?.[0]?.roleDescription,
            action: role.action,
            oldComments: role.oldComments,
            risk: role.itemRisk,
            recommendation: "",
          });
        });

        access.entityAppinstance?.forEach((app: any) => {
          app.entityEntitlements?.forEach((ent: any) => {
            const ai = ent.AIAssist?.[0] ?? {};
            flattened.push({
              itemType: "Entitlement",
              name: ent.entitlementInfo?.[0]?.entitlementName,
              description: ent.entitlementInfo?.[0]?.entitlementDescription,
              action: ent.action,
              oldComments: ent.oldComments,
              risk: ent.itemRisk,
              recommendation: ai.Recommendation,
            });
          });
        });
      });

      params.successCallback(flattened);
    },
    
  }), [reviewerId, certId]);

  return (
    <div style={{ height: "100vh", width: "100%", display: "flex", flexDirection: "column" }}>
      {/* {loading && <div style={{ padding: 10 }}>🔄 Loading...</div>} */}
      {error && <div style={{ color: "red", padding: 10 }}>{error}</div>}

      <div className="ag-theme-alpine" style={{ flexGrow: 1 }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          masterDetail={true}
          rowSelection="multiple" // 👈 Enables multi-select with checkboxes 
          detailCellRendererParams={detailCellRendererParams}
          onGridReady={(params) => {
            gridApiRef.current = params.api;
          }}
          overlayLoadingTemplate={`<span class="ag-overlay-loading-center">⏳ Loading certification data...</span>`}
          overlayNoRowsTemplate={`<span class="ag-overlay-loading-center">Loading....</span>`}
        />
      </div>
    </div>
  );
};

export default TreeClient;
