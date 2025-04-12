'use client';

import { ColDef } from "ag-grid-enterprise";
import ActionButtons from "../table/ActionButtons";

export const defaultColDef = {
  sortable: true,
  filter: true,
  resizable: true,
};

export const columnDefs: ColDef[]  = [
  { headerName: "Certification Type", field: "certificationType" },
  { headerName: "Reviewer ID", field: "reviewerId" },
  { headerName: "Created On", field: "certificationCreatedOn" },
  { headerName: "Expiration", field: "certificationExpiration" },
  { headerName: "Status", field: "status" },
  { headerName: "Signed Off", field: "certificationSignedOff" },
  { headerName: "Requester", field: "certificateRequester" },
  { headerName: "Completed %", field: "percentageCompleted" },
  { headerName: "Total Actions", field: "totalActions" },
  { headerName: "Actions Completed", field: "totalActionsCompleted" },
  {
    headerName: "Actions",
    width: 200,
    cellRenderer: (params: any) => <ActionButtons api={params.api} selectedRows={params.data} />,
  },
];