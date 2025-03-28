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
  
export const asterisk="[&:after]:text-red-400 [&:after]:content-['*'] ";
export const downArrow= `after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-2 after:border-l-[10px] after:border-l-transparent after:border-r-[10px] after:border-r-transparent after:border-t-[#15274E] after:border-t-[10px]`;
export const durationOptions=[
  { value: "7 Days", label: "7 Days" },
  { value: "15 Days", label: "15 Days" },
  { value: "30 Days", label: "30 Days" },

]

export const recurrenceOptions=[
  { value: "Weekly", label: "Weekly" },
  { value: "Monthly", label: "Monthly" },
  { value: "Quarterly ", label: "Quarterly" },
  { value: "Half Yearly ", label: "Half Yearly" },
  { value: "Yearly ", label: "Yearly" },
]


export const beforeReminders=[
  { value: "before 2 Days", label: "Before 2 Days" },
  { value: "before 7 Days", label: "Before 7 Days" },
  { value: "before 15 Days", label: "Before 15 Days" },
  { value: "before 30 Days", label: "Before 30 Days" },
]

export const enforceComments=[
  { value: "All Actions", label: "All Actions" },
  { value: "Approve", label: "Approve" },
  { value: "Revoke", label: "Revoke" },
  { value: "Custom Fields", label: "Custom Fields" },
]
export const  template=[
  { value: "Template 1", label: "Template 1" },
  { value: "Template 2", label: "Template 2" },
  { value: "Template 3", label: "Template 3" },
  { value: "Template 4", label: "Template 4" },
]

export const userGroups = [
  { label: "UserGroup A", value: "UserGroup_a" },
  { label: "UserGroup B", value: "UserGroup_b" },
];

export const excludeUsers = [
  { label: "excludeUser A", value: "excludeUser_1" },
  { label: "excludeUser B", value: "excludeUser_2" },
];
export function numberToWords(n:number) {
  const ones = ["first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth", "ninth", "tenth"];
  const teens = ["eleventh", "twelfth", "thirteenth", "fourteenth", "fifteenth", "sixteenth", "seventeenth", "eighteenth", "nineteenth"];
  const tens = ["tenth", "twentieth", "thirtieth", "fortieth", "fiftieth", "sixtieth", "seventieth", "eightieth", "ninetieth"];
  
  if (n <= 10) {
    return ones[n];
  } else if (n > 10 && n <= 19) {
    return teens[n - 10];
  } else if (n % 10 === 0) {
    return tens[n / 10];
  } else {
    let tensPlace = Math.floor(n / 10);
    let onesPlace = n % 10;
    return tens[tensPlace] + "-" + ones[onesPlace];
  }
}