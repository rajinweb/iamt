import { v4 as uuidv4 } from "uuid";  
export const exportToCSV = (gridApi: any) => {
  if (!gridApi) return;

  gridApi.exportDataAsCsv({
    fileName: "data.csv",
    onlySelected: false, // set to true if you want to export only selected rows
    allColumns: true,
  });
};

// Export filtered & sorted rows as JSON manually
export const exportToJSON = (gridApi: any) => {
  if (!gridApi) return;

  const rowData: any[] = [];
  gridApi.forEachNodeAfterFilterAndSort((node: any) => {
    if (node.data) {
      rowData.push(node.data);
    }
  });

  const jsonStr = JSON.stringify(rowData, null, 2);
  const blob = new Blob([jsonStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "data.json";
  a.click();
  URL.revokeObjectURL(url);
};

export const exportToExcel = (gridApi: any) => {
  if (!gridApi || !gridApi.exportDataAsExcel) {
    console.warn("Excel export requires AG Grid Enterprise.");
    return;
  }

  gridApi.exportDataAsExcel({
    fileName: "data.xlsx",
    sheetName: "ExportedData",
    allColumns: true, // include all columns even if some are hidden
    exportMode: "all",
    onlySelected: false,
  });
};

export const defaultExpression = {
  id: uuidv4(),
  attribute: null,
  operator: null,
  value: "",
  logicalOp: "AND",
};
export const asterisk = "[&:after]:text-red-400 [&:after]:content-['*'] ";
export const downArrow = `after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-2 after:border-l-[10px] after:border-l-transparent after:border-r-[10px] after:border-r-transparent after:border-t-[#15274E] after:border-t-[10px]`;
export const durationOptions = [
  { value: "7 Days", label: "7 Days" },
  { value: "15 Days", label: "15 Days" },
  { value: "30 Days", label: "30 Days" },
];

export const recurrenceOptions = [
  { value: "Weekly", label: "Weekly" },
  { value: "Monthly", label: "Monthly" },
  { value: "Quarterly ", label: "Quarterly" },
  { value: "Half Yearly ", label: "Half Yearly" },
  { value: "Yearly ", label: "Yearly" },
];

export const everyDayReminders = [
  { value: "every 2 Days", label: "every 2 Days" },
  { value: "every 7 Days", label: "every 7 Days" },
  { value: "every 15 Days", label: "every 15 Days" },
  { value: "every 30 Days", label: "every 30 Days" },
];
export const startOfCampaign = [
  { value: "Start Of Campaign", label: "Start Of Campaign" },
  { value: "every 5 Days", label: "every 5 Days" },
  { value: "every 7 Days", label: "every 7 Days" },
  { value: "every 310 Days", label: "every 10 Days" },
];
export const beforeExpiryReminders = [
  { value: "before 2 Days expiry", label: "Before 2 Days Expiry" },
  { value: "before 7 Days expiry", label: "Before 7 Days Expiry" },
  { value: "before 15 Days expiry", label: "Before 15 Days Expiry" },
  { value: "before 30 Days expiry", label: "Before 30 Days Expiry" },
];
export const beforeReminders = [
  { value: "before 2 Days", label: "Before 2 Days" },
  { value: "before 7 Days", label: "Before 7 Days" },
  { value: "before 15 Days", label: "Before 15 Days" },
  { value: "before 30 Days", label: "Before 30 Days" },
];

export const enforceComments = [
  { value: "All Actions", label: "All Actions" },
  { value: "Approve", label: "Approve" },
  { value: "Revoke", label: "Revoke" },
  { value: "Custom Fields", label: "Custom Fields" },
];
export const template = [
  { value: "Template 1", label: "Template 1" },
  { value: "Template 2", label: "Template 2" },
  { value: "Template 3", label: "Template 3" },
  { value: "Template 4", label: "Template 4" },
];

export const userGroups = [
  { label: "UserGroup A", value: "UserGroup_a" },
  { label: "UserGroup B", value: "UserGroup_b" },
];

export const excludeUsers = [
  { label: "excludeUser A", value: "excludeUser_1" },
  { label: "excludeUser B", value: "excludeUser_2" },
];
export function numberToWords(n: number) {
  const ones = [
    "first",
    "second",
    "third",
    "fourth",
    "fifth",
    "sixth",
    "seventh",
    "eighth",
    "ninth",
    "tenth",
  ];
  const teens = [
    "eleventh",
    "twelfth",
    "thirteenth",
    "fourteenth",
    "fifteenth",
    "sixteenth",
    "seventeenth",
    "eighteenth",
    "nineteenth",
  ];
  const tens = [
    "tenth",
    "twentieth",
    "thirtieth",
    "fortieth",
    "fiftieth",
    "sixtieth",
    "seventieth",
    "eightieth",
    "ninetieth",
  ];

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

export const reviewersOptions = [
  { value: "self-review", label: "Self Review" },
  { value: "user-manager", label: "User Manager" },
  { value: "app-owner", label: "App Owner" },
  { value: "entitlement-owner", label: "Entitlement Owner" },
  { value: "security-team", label: "Security Team" },
  { value: "custom-reviewer", label: "Custom Reviewer" },
];
