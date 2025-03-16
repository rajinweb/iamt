export const exportToCSV = (rows: any[]) => {
    const headers = Object.keys(rows[0]?.original || {}).join(','); // Extract column headers
    const csvContent = rows.map(row => Object.values(row.original).join(',')).join('\n');
  
    const blob = new Blob([headers + '\n' + csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'data_export.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
export const exportToJSON = (rows: any[]) => {
    const jsonData = rows.map(row => row.original);
    const jsonString = JSON.stringify(jsonData, null, 2);
    
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'data_export.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  