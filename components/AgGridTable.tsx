'use client';
import { AgGridReact } from "ag-grid-react";
import "@/lib/ag-grid-setup";  
import {
  ColDef,
  GridApi,
  GridOptions,
  IServerSideDatasource,
  ModuleRegistry,
} from "ag-grid-community";
import {
  ServerSideRowModelModule,
  ColumnsToolPanelModule,
  TreeDataModule,
  RowGroupingModule,
  MenuModule,
  ClientSideRowModelModule,
} from "ag-grid-enterprise";
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useEffect,
} from "react";

interface ServerSideGridApi extends GridApi {
  setServerSideDatasource(datasource: IServerSideDatasource): void;
}

ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  ServerSideRowModelModule,
  ColumnsToolPanelModule,
  TreeDataModule,
  RowGroupingModule,
  MenuModule,
]);

type AgGridTableProps = {
  columnDefs: ColDef[];
  rowData?: any[]; // for client-side
  autoGroupColumnDef?: ColDef;
  getRowId?: GridOptions["getRowId"];
  isServerSideGroup?: GridOptions["isServerSideGroup"];
  getServerSideGroupKey?: GridOptions["getServerSideGroupKey"];
  isServerSideGroupOpenByDefault?: GridOptions["isServerSideGroupOpenByDefault"];
  onRowClicked?: GridOptions["onRowClicked"];
  datasource?: IServerSideDatasource; // for server-side
  treeData?: boolean;
  rowModelType?: GridOptions["rowModelType"]; // 'clientSide' or 'serverSide'
  dataPathFromData?: string; // optional shortcut for building getDataPath
  getDataPath?: GridOptions["getDataPath"]; // actual getDataPath handler
  className?: string;
  setGridApi?: (api: GridApi) => void;
};

const AgGridTable = forwardRef<GridApi | undefined, AgGridTableProps>(
  (props, ref) => {
    const gridRef = useRef<AgGridReact<any>>(null);
    const gridApiRef = useRef<ServerSideGridApi | null>(null);

    useImperativeHandle(ref, () => gridApiRef.current!, []);

    useEffect(() => {
      if (
        props.datasource &&
        props.rowModelType === "serverSide" &&
        gridApiRef.current &&
        typeof gridApiRef.current.setServerSideDatasource === "function"
      ) {
        gridApiRef.current.setServerSideDatasource(props.datasource);
      }
    }, [props.datasource, props.rowModelType]);

    const onGridReady = (params: { api: GridApi }) => {
      const api = params.api;
      gridApiRef.current = api as ServerSideGridApi;
      console.log("Grid Ready")
      if (
        props.datasource &&
        props.rowModelType === "serverSide"
        //&& typeof (api as ServerSideGridApi).setServerSideDatasource === "function"
      ) {
        (api as ServerSideGridApi).setServerSideDatasource(props.datasource);
      }
      if (props.setGridApi) {
        props.setGridApi(api);
      }
      
    };

    return (
   
        <AgGridReact  
          ref={gridRef}
          onGridReady={onGridReady}
          columnDefs={props.columnDefs}
          rowData={props.rowData}
          treeData={props.treeData}
          autoGroupColumnDef={props.autoGroupColumnDef}
          getDataPath={   
            props.getDataPath ??
            (typeof props.dataPathFromData === "string"
              ? (data: Record<string, any>) => {
                  const path = data[props.dataPathFromData!];
                  return Array.isArray(path) ? path : [];
                }
              : undefined)
          }
          rowModelType={props.rowModelType}
          getRowId={props.getRowId}
          isServerSideGroup={props.isServerSideGroup}
          getServerSideGroupKey={props.getServerSideGroupKey}
          isServerSideGroupOpenByDefault={ props.isServerSideGroupOpenByDefault}
          onRowClicked={props.onRowClicked}
          animateRows
          rowSelection="multiple"
          
        />
  
    );
  }
);

AgGridTable.displayName = "AgGridTable";
export default AgGridTable;
