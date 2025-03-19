'use client';
export const rowData = [
  {
    user: "Derrick Watson",
    id: 7243915,
    avatar: "https://avatar.iran.liara.run/public/9",
    risk: "High",
    jobTitle: "Financial Analyst",
    role: "Contractor",
    employeetype: "Full Time",
    lastLogin: "2025-03-01 14:25:43",
    accessHistory: "2025-03-01 14:25:43",
    changeSinceLastReview: 3,
    aiAssistConfidence: "thumbs-down",
    email: "Derrick.Watson@example.com",
    status: "Active",
    subRows: [
      {
        account: "dwatson",
        id: 8243916,
        role: "Administrator",
        risk: "Low",
        applications: ["SAP ERP", "Slack"],
        roleType: "Full Access",
        subRows: [
          {
            id: 9243915,
            entitlement: "SP_DBA_CONTRIBUTOR",
            risk: "Medium",
            description: "Write",
            justification: "Needs access for reporting",
            accessHistory: "2025-03-01 14:25:43",
            aiAssistConfidence: "thumbs-down",
          },
          {
            id: 1043915,
            entitlement: "SP_ANALYST",
            risk: "30 Medium",
            description: "Read",
            justification: "View only access",
            accessHistory: "2025-02-15 10:12:30",
            aiAssistConfidence: "thumbs-up",
          },
        ],
      },
      {
        account: "awatson",
        id: 1143917,
        role: "User",
        risk: "Low",
        applications: ["Google Drive", "Teams"],
        roleType: "Limited Access",
        subRows: [
          {
            id: 1243917,
            entitlement: "SP_VIEWER",
            risk: "Low",
            description: "Read-Only",
            justification: "Basic user access",
            accessHistory: "2025-02-28 12:40:10",
            aiAssistConfidence: "thumbs-up",
          },
        ],
      },
    ],
  },
  {
    user: "Sophia Davis",
    id: 7243215,
    avatar: "https://avatar.iran.liara.run/public/9",
    risk: "High",
    jobTitle: "Financial Analyst",
    role: "Contractor",
    employeetype: "Full Time",
    lastLogin: "2025-03-01 14:25:43",
    accessHistory: "2025-03-01 14:25:43",
    changeSinceLastReview: 3,
    aiAssistConfidence: "thumbs-down",
    email: "Derrick.Watson@example.com",
    status: "Active",
    subRows: [
      {
        account: "dwatson",
        id: 8243116,
        role: "Administrator",
        risk: "Low",
        applications: ["SAP ERP", "Slack"],
        roleType: "Full Access",
        subRows: [
          {
            id: 922915,
            entitlement: "SP_DBA_CONTRIBUTOR",
            risk: "Medium",
            description: "Write",
            justification: "Needs access for reporting",
            accessHistory: "2025-03-01 14:25:43",
            aiAssistConfidence: "thumbs-down",
          },
          {
            id: 10243915,
            entitlement: "SP_ANALYST",
            risk: "30 Medium",
            description: "Read",
            justification: "View only access",
            accessHistory: "2025-02-15 10:12:30",
            aiAssistConfidence: "thumbs-up",
          },
        ],
      },
      {
        account: "awatson",
        id: 114617,
        role: "User",
        risk: "Low",
        applications: ["Google Drive", "Teams"],
        roleType: "Limited Access",
        subRows: [
          {
            id: 1244917,
            entitlement: "SP_VIEWER",
            risk: "Low",
            description: "Read-Only",
            justification: "Basic user access",
            accessHistory: "2025-02-28 12:40:10",
            aiAssistConfidence: "thumbs-up",
          },
        ],
      },
    ],
  },
];
/*

export const rowData=[
  {
    "user": "Jaws hat",
    "id": 7243915,
    "avatar": "https://avatar.iran.liara.run/public/9",
    "risk": "High",
    "jobTitle": "Senior Software Engineer",
    "changeSinceLastReview": 3,
    "aIAssistConfidence": "thumbs-down",
    "email": "sophia.davis@example.com",
    "status": "Pending",
    "path": ["Users", "Sophia Davis"],
    "subRows": [
      {
        "account": "Account",
        "role": "Administrator",
        "roleType": "Full Access",
        "path": ["Users", "Sophia Davis", "Roles", "Administrator"],
        "subRows": [
          { "user": "Entitlement", "permission": "Manage Users", "accessLevel": "Write", "path": ["Users", "Sophia Davis", "Roles", "Administrator", "Permissions", "Manage Users"] },
          
        ]
      }
    ]
  },{
    "user": "Derrick Watson",
    "id": 603682,
    "avatar": "https://avatar.iran.liara.run/public/8",
    "risk": "Medium",
    "jobTitle": "Lead Product Design",
    "changeSinceLastReview": 5,
    "aIAssistConfidence": "thumbs-up",
    "employeeType": "Contractor",
    "email": "derrick.watson@example.com",
    "status": "Pending",
    "path": ["Users", "Derrick Watson"],
    "subRows": [
      {
        "account": "Skype Account",
        "role": "Administrator",
        "roleType": "Full Access",
        "path": ["Users", "Derrick Watson", "Roles", "Administrator"],
        "subRows": [
          { "entitlement": "Rajesh Entitlement", "permission": "Manage Users", "accessLevel": "Write", "path": ["Users", "Derrick Watson", "Roles", "Administrator", "Permissions", "Manage Users"] },
          { "entitlement": "Atharv Entitlement", "permission": "Manage Roles", "accessLevel": "Write", "path": ["Users", "Derrick Watson", "Roles", "Administrator", "Permissions", "Manage Roles"] },
          { "entitlement": "Ibhaan Entitlement", "permission": "View Projects", "accessLevel": "Read", "path": ["Users", "Derrick Watson", "Roles", "Administrator", "Permissions", "View Projects"] },
          { "entitlement": "Entitlement", "permission": "Create Projects", "accessLevel": "Write", "path": ["Users", "Derrick Watson", "Roles", "Administrator", "Permissions", "Create Projects"] },
          { "entitlement": "Entitlement", "permission": "Delete Projects", "accessLevel": "Write", "path": ["Users", "Derrick Watson", "Roles", "Administrator", "Permissions", "Delete Projects"] },
          { "entitlement": "Entitlement", "permission": "View Users", "accessLevel": "Read", "path": ["Users", "Derrick Watson", "Roles", "Administrator", "Permissions", "View Users"] },
          { "entitlement": "Entitlement", "permission": "Add Users", "accessLevel": "Write", "path": ["Users", "Derrick Watson", "Roles", "Administrator", "Permissions", "Add Users"] },
          { "entitlement": "Entitlement", "permission": "Delete Users", "accessLevel": "Write", "path": ["Users", "Derrick Watson", "Roles", "Administrator", "Permissions", "Delete Users"] },
          { "entitlement": "Entitlement", "permission": "Manage Roles", "accessLevel": "Write", "path": ["Users", "Derrick Watson", "Roles", "Administrator", "Permissions", "Manage Roles"] },
          { "entitlement": "Entitlement", "permission": "Manage Settings", "accessLevel": "Write", "path": ["Users", "Derrick Watson", "Roles", "Administrator", "Permissions", "Manage Settings"] }
        ]
      },
      {
        "account": "Slack Account",
        "role": "Administrator",
        "roleType": "Full Access",
        "path": ["Users", "Derrick Watson", "Roles", "Administrator"],
        "subRows": [
          { "user": "Entitlement", "permission": "Manage Users", "accessLevel": "Write", "path": ["Users", "Derrick Watson", "Roles", "Administrator", "Permissions", "Manage Users"] },
          { "user": "Entitlement", "permission": "Manage Roles", "accessLevel": "Write", "path": ["Users", "Derrick Watson", "Roles", "Administrator", "Permissions", "Manage Roles"] },
          { "user": "Entitlement", "permission": "View Projects", "accessLevel": "Read", "path": ["Users", "Derrick Watson", "Roles", "Administrator", "Permissions", "View Projects"] },
          { "user": "Entitlement", "permission": "Create Projects", "accessLevel": "Write", "path": ["Users", "Derrick Watson", "Roles", "Administrator", "Permissions", "Create Projects"] },
          { "user": "Entitlement", "permission": "Delete Projects", "accessLevel": "Write", "path": ["Users", "Derrick Watson", "Roles", "Administrator", "Permissions", "Delete Projects"] },
          { "user": "Entitlement", "permission": "View Users", "accessLevel": "Read", "path": ["Users", "Derrick Watson", "Roles", "Administrator", "Permissions", "View Users"] },
          { "user": "Entitlement", "permission": "Add Users", "accessLevel": "Write", "path": ["Users", "Derrick Watson", "Roles", "Administrator", "Permissions", "Add Users"] },
          { "user": "Entitlement", "permission": "Delete Users", "accessLevel": "Write", "path": ["Users", "Derrick Watson", "Roles", "Administrator", "Permissions", "Delete Users"] },
          { "user": "Entitlement", "permission": "Manage Roles", "accessLevel": "Write", "path": ["Users", "Derrick Watson", "Roles", "Administrator", "Permissions", "Manage Roles"] },
          { "user": "Entitlement", "permission": "Manage Settings", "accessLevel": "Write", "path": ["Users", "Derrick Watson", "Roles", "Administrator", "Permissions", "Manage Settings"] }
        ]
      },{
        "account": "MS Teams Account",
        "role": "Administrator",
        "roleType": "Full Access",
        "path": ["Users", "Derrick Watson", "Roles", "Administrator"],
        "subRows": [
          { "user": "Rajesh Entitlement", "permission": "Manage Users", "accessLevel": "Write", "path": ["Users", "Derrick Watson", "Roles", "Administrator", "Permissions", "Manage Users"] },
          { "user": "Atharv Entitlement", "permission": "Manage Roles", "accessLevel": "Write", "path": ["Users", "Derrick Watson", "Roles", "Administrator", "Permissions", "Manage Roles"] },
          { "user": "Ibhaan Entitlement", "permission": "View Projects", "accessLevel": "Read", "path": ["Users", "Derrick Watson", "Roles", "Administrator", "Permissions", "View Projects"] },
          { "user": "Entitlement", "permission": "Create Projects", "accessLevel": "Write", "path": ["Users", "Derrick Watson", "Roles", "Administrator", "Permissions", "Create Projects"] },
          { "user": "Entitlement", "permission": "Delete Projects", "accessLevel": "Write", "path": ["Users", "Derrick Watson", "Roles", "Administrator", "Permissions", "Delete Projects"] },
          { "user": "Entitlement", "permission": "View Users", "accessLevel": "Read", "path": ["Users", "Derrick Watson", "Roles", "Administrator", "Permissions", "View Users"] },
          { "user": "Entitlement", "permission": "Add Users", "accessLevel": "Write", "path": ["Users", "Derrick Watson", "Roles", "Administrator", "Permissions", "Add Users"] },
          { "user": "Entitlement", "permission": "Delete Users", "accessLevel": "Write", "path": ["Users", "Derrick Watson", "Roles", "Administrator", "Permissions", "Delete Users"] },
          { "user": "Entitlement", "permission": "Manage Roles", "accessLevel": "Write", "path": ["Users", "Derrick Watson", "Roles", "Administrator", "Permissions", "Manage Roles"] },
          { "user": "Entitlement", "permission": "Manage Settings", "accessLevel": "Write", "path": ["Users", "Derrick Watson", "Roles", "Administrator", "Permissions", "Manage Settings"] }
        ]
      },
      {
        "account": "FB Account",
        "role": "Administrator",
        "roleType": "Full Access",
        "path": ["Users", "Derrick Watson", "Roles", "Administrator"],
        "subRows": [
          { "user": "Entitlement", "permission": "Manage Users", "accessLevel": "Write", "path": ["Users", "Derrick Watson", "Roles", "Administrator", "Permissions", "Manage Users"] },
          { "user": "Entitlement", "permission": "Manage Roles", "accessLevel": "Write", "path": ["Users", "Derrick Watson", "Roles", "Administrator", "Permissions", "Manage Roles"] },
          { "user": "Entitlement", "permission": "View Projects", "accessLevel": "Read", "path": ["Users", "Derrick Watson", "Roles", "Administrator", "Permissions", "View Projects"] },
          { "user": "Entitlement", "permission": "Create Projects", "accessLevel": "Write", "path": ["Users", "Derrick Watson", "Roles", "Administrator", "Permissions", "Create Projects"] },
          { "user": "Entitlement", "permission": "Delete Projects", "accessLevel": "Write", "path": ["Users", "Derrick Watson", "Roles", "Administrator", "Permissions", "Delete Projects"] },
          { "user": "Entitlement", "permission": "View Users", "accessLevel": "Read", "path": ["Users", "Derrick Watson", "Roles", "Administrator", "Permissions", "View Users"] },
          { "user": "Entitlement", "permission": "Add Users", "accessLevel": "Write", "path": ["Users", "Derrick Watson", "Roles", "Administrator", "Permissions", "Add Users"] },
          { "user": "Entitlement", "permission": "Delete Users", "accessLevel": "Write", "path": ["Users", "Derrick Watson", "Roles", "Administrator", "Permissions", "Delete Users"] },
          { "user": "Entitlement", "permission": "Manage Roles", "accessLevel": "Write", "path": ["Users", "Derrick Watson", "Roles", "Administrator", "Permissions", "Manage Roles"] },
          { "user": "Entitlement", "permission": "Manage Settings", "accessLevel": "Write", "path": ["Users", "Derrick Watson", "Roles", "Administrator", "Permissions", "Manage Settings"] }
        ]
      },  {
        "account": "MSN Account",
        "role": "Administrator",
        "roleType": "Full Access",
        "path": ["Users", "Derrick Watson", "Roles", "Administrator"],
        "subRows": [
          { "user": "Entitlement", "permission": "Manage Users", "accessLevel": "Write", "path": ["Users", "Derrick Watson", "Roles", "Administrator", "Permissions", "Manage Users"] },
          { "user": "Entitlement", "permission": "Manage Roles", "accessLevel": "Write", "path": ["Users", "Derrick Watson", "Roles", "Administrator", "Permissions", "Manage Roles"] },
          { "user": "Entitlement", "permission": "View Projects", "accessLevel": "Read", "path": ["Users", "Derrick Watson", "Roles", "Administrator", "Permissions", "View Projects"] },
          { "user": "Entitlement", "permission": "Create Projects", "accessLevel": "Write", "path": ["Users", "Derrick Watson", "Roles", "Administrator", "Permissions", "Create Projects"] },
          { "user": "Entitlement", "permission": "Delete Projects", "accessLevel": "Write", "path": ["Users", "Derrick Watson", "Roles", "Administrator", "Permissions", "Delete Projects"] },
          { "user": "Entitlement", "permission": "View Users", "accessLevel": "Read", "path": ["Users", "Derrick Watson", "Roles", "Administrator", "Permissions", "View Users"] },
          { "user": "Entitlement", "permission": "Add Users", "accessLevel": "Write", "path": ["Users", "Derrick Watson", "Roles", "Administrator", "Permissions", "Add Users"] },
          { "user": "Entitlement", "permission": "Delete Users", "accessLevel": "Write", "path": ["Users", "Derrick Watson", "Roles", "Administrator", "Permissions", "Delete Users"] },
          { "user": "Entitlement", "permission": "Manage Roles", "accessLevel": "Write", "path": ["Users", "Derrick Watson", "Roles", "Administrator", "Permissions", "Manage Roles"] },
          { "user": "Entitlement", "permission": "Manage Settings", "accessLevel": "Write", "path": ["Users", "Derrick Watson", "Roles", "Administrator", "Permissions", "Manage Settings"] }
        ]
      },  {
        "account": "SnapChat Account",
        "role": "Administrator",
        "roleType": "Full Access",
        "path": ["Users", "Derrick Watson", "Roles", "Administrator"],
        "subRows": [
          { "user": "Entitlement", "permission": "Manage Users", "accessLevel": "Write", "path": ["Users", "Derrick Watson", "Roles", "Administrator", "Permissions", "Manage Users"] },
          { "user": "Entitlement", "permission": "Manage Roles", "accessLevel": "Write", "path": ["Users", "Derrick Watson", "Roles", "Administrator", "Permissions", "Manage Roles"] },
          { "user": "Entitlement", "permission": "View Projects", "accessLevel": "Read", "path": ["Users", "Derrick Watson", "Roles", "Administrator", "Permissions", "View Projects"] },
          { "user": "Entitlement", "permission": "Create Projects", "accessLevel": "Write", "path": ["Users", "Derrick Watson", "Roles", "Administrator", "Permissions", "Create Projects"] },
          { "user": "Entitlement", "permission": "Delete Projects", "accessLevel": "Write", "path": ["Users", "Derrick Watson", "Roles", "Administrator", "Permissions", "Delete Projects"] },
          { "user": "Entitlement", "permission": "View Users", "accessLevel": "Read", "path": ["Users", "Derrick Watson", "Roles", "Administrator", "Permissions", "View Users"] },
          { "user": "Entitlement", "permission": "Add Users", "accessLevel": "Write", "path": ["Users", "Derrick Watson", "Roles", "Administrator", "Permissions", "Add Users"] },
          { "user": "Entitlement", "permission": "Delete Users", "accessLevel": "Write", "path": ["Users", "Derrick Watson", "Roles", "Administrator", "Permissions", "Delete Users"] },
          { "user": "Entitlement", "permission": "Manage Roles", "accessLevel": "Write", "path": ["Users", "Derrick Watson", "Roles", "Administrator", "Permissions", "Manage Roles"] },
          { "user": "Entitlement", "permission": "Manage Settings", "accessLevel": "Write", "path": ["Users", "Derrick Watson", "Roles", "Administrator", "Permissions", "Manage Settings"] }
        ]
      }
    ]
  },
  {
    "user": "Sophia Davis",
    "id": 724395,
    "avatar": "https://avatar.iran.liara.run/public/9",
    "risk": "High",
    "jobTitle": "Senior Software Engineer",
    "changeSinceLastReview": 3,
    "aIAssistConfidence": "thumbs-down",
    "email": "sophia.davis@example.com",
    "status": "Revoked",
    "path": ["Users", "Sophia Davis"],
    "subRows": [
      {
        "user": "Account",
        "role": "Administrator",
        "roleType": "Full Access",
        "path": ["Users", "Sophia Davis", "Roles", "Administrator"],
        "subRows": [
          { "user": "Entitlement", "permission": "Manage Users", "accessLevel": "Write", "path": ["Users", "Sophia Davis", "Roles", "Administrator", "Permissions", "Manage Users"] },
          { "user": "Entitlement", "permission": "Manage Projects", "accessLevel": "Write", "path": ["Users", "Sophia Davis", "Roles", "Administrator", "Permissions", "Manage Projects"] },
          { "user": "Entitlement", "permission": "View Projects", "accessLevel": "Read", "path": ["Users", "Sophia Davis", "Roles", "Administrator", "Permissions", "View Projects"] },
          { "user": "Entitlement", "permission": "Create Projects", "accessLevel": "Write", "path": ["Users", "Sophia Davis", "Roles", "Administrator", "Permissions", "Create Projects"] },
          { "user": "Entitlement", "permission": "Delete Projects", "accessLevel": "Write", "path": ["Users", "Sophia Davis", "Roles", "Administrator", "Permissions", "Delete Projects"] },
          { "user": "Entitlement", "permission": "View Users", "accessLevel": "Read", "path": ["Users", "Sophia Davis", "Roles", "Administrator", "Permissions", "View Users"] },
          { "user": "Entitlement", "permission": "Add Users", "accessLevel": "Write", "path": ["Users", "Sophia Davis", "Roles", "Administrator", "Permissions", "Add Users"] },
          { "user": "Entitlement", "permission": "Delete Users", "accessLevel": "Write", "path": ["Users", "Sophia Davis", "Roles", "Administrator", "Permissions", "Delete Users"] },
          { "user": "Entitlement", "permission": "Manage Roles", "accessLevel": "Write", "path": ["Users", "Sophia Davis", "Roles", "Administrator", "Permissions", "Manage Roles"] },
          { "user": "Entitlement", "permission": "Manage Settings", "accessLevel": "Write", "path": ["Users", "Sophia Davis", "Roles", "Administrator", "Permissions", "Manage Settings"] }
        ]
      }
    ]
  },
  {
    "user": "James Smith",
    "id": 101234,
    "avatar": "https://avatar.iran.liara.run/public/10",
    "risk": "Low",
    "jobTitle": "Junior Developer",
    "changeSinceLastReview": 1,
    "aIAssistConfidence": "thumbs-up",
    "email": "james.smith@example.com",
    "status": "Delegated",
    "path": ["Users", "James Smith"],
    "subRows": [
      {
        "user": "Account",
        "role": "User",
        "roleType": "Limited Access",
        "path": ["Users", "James Smith", "Roles", "User"],
        "subRows": [
          { "user": "Entitlement", "permission": "View Projects", "accessLevel": "Read", "path": ["Users", "James Smith", "Roles", "User", "Permissions", "View Projects"] },
          { "user": "Entitlement", "permission": "Request Access", "accessLevel": "Write", "path": ["Users", "James Smith", "Roles", "User", "Permissions", "Request Access"] },
          { "user": "Entitlement", "permission": "View Users", "accessLevel": "Read", "path": ["Users", "James Smith", "Roles", "User", "Permissions", "View Users"] },
          { "user": "Entitlement", "permission": "View Settings", "accessLevel": "Read", "path": ["Users", "James Smith", "Roles", "User", "Permissions", "View Settings"] },
          { "user": "Entitlement", "permission": "Create Tickets", "accessLevel": "Write", "path": ["Users", "James Smith", "Roles", "User", "Permissions", "Create Tickets"] },
          { "user": "Entitlement", "permission": "Manage Tickets", "accessLevel": "Write", "path": ["Users", "James Smith", "Roles", "User", "Permissions", "Manage Tickets"] },
          { "user": "Entitlement", "permission": "Comment on Tickets", "accessLevel": "Write", "path": ["Users", "James Smith", "Roles", "User", "Permissions", "Comment on Tickets"] },
          { "user": "Entitlement", "permission": "View Reports", "accessLevel": "Read", "path": ["Users", "James Smith", "Roles", "User", "Permissions", "View Reports"] },
          { "user": "Entitlement", "permission": "Export Reports", "accessLevel": "Read", "path": ["Users", "James Smith", "Roles", "User", "Permissions", "Export Reports"] },
          { "user": "Entitlement", "permission": "Manage Feedback", "accessLevel": "Write", "path": ["Users", "James Smith", "Roles", "User", "Permissions", "Manage Feedback"] }
        ]
      }
    ]
  },
  {
    "user": "Rachel Lee",
    "id": 112345,
    "avatar": "https://avatar.iran.liara.run/public/11",
    "risk": "Low",
    "jobTitle": "HR Manager",
    "changeSinceLastReview": 2,
    "aIAssistConfidence": "thumbs-up",
    "email": "rachel.lee@example.com",
    "status": "Active",
    "path": ["Users", "Rachel Lee"],
    "subRows": [
      {
        "user": "Account",
        "role": "HR Manager",
        "roleType": "Limited Access",
        "path": ["Users", "Rachel Lee", "Roles", "HR Manager"],
        "subRows": [
          { "user": "Entitlement", "permission": "View Users", "accessLevel": "Read", "path": ["Users", "Rachel Lee", "Roles", "HR Manager", "Permissions", "View Users"] },
          { "user": "Entitlement", "permission": "Add Users", "accessLevel": "Write", "path": ["Users", "Rachel Lee", "Roles", "HR Manager", "Permissions", "Add Users"] },
          { "user": "Entitlement", "permission": "Delete Users", "accessLevel": "Write", "path": ["Users", "Rachel Lee", "Roles", "HR Manager", "Permissions", "Delete Users"] },
          { "user": "Entitlement", "permission": "Manage Profiles", "accessLevel": "Write", "path": ["Users", "Rachel Lee", "Roles", "HR Manager", "Permissions", "Manage Profiles"] },
          { "user": "Entitlement", "permission": "View Projects", "accessLevel": "Read", "path": ["Users", "Rachel Lee", "Roles", "HR Manager", "Permissions", "View Projects"] },
          { "user": "Entitlement", "permission": "Create Projects", "accessLevel": "Write", "path": ["Users", "Rachel Lee", "Roles", "HR Manager", "Permissions", "Create Projects"] },
          { "user": "Entitlement", "permission": "Manage Settings", "accessLevel": "Write", "path": ["Users", "Rachel Lee", "Roles", "HR Manager", "Permissions", "Manage Settings"] },
          { "user": "Entitlement", "permission": "Generate Reports", "accessLevel": "Write", "path": ["Users", "Rachel Lee", "Roles", "HR Manager", "Permissions", "Generate Reports"] },
          { "user": "Entitlement", "permission": "View Feedback", "accessLevel": "Read", "path": ["Users", "Rachel Lee", "Roles", "HR Manager", "Permissions", "View Feedback"] },
          { "user": "Entitlement", "permission": "Manage Feedback", "accessLevel": "Write", "path": ["Users", "Rachel Lee", "Roles", "HR Manager", "Permissions", "Manage Feedback"] }
        ]
      }
    ]
  },
  {
    "user": "Emily Johnson",
    "id": 132467,
    "avatar": "https://avatar.iran.liara.run/public/12",
    "risk": "Medium",
    "jobTitle": "Marketing Manager",
    "changeSinceLastReview": 4,
    "aIAssistConfidence": "thumbs-up",
    "email": "emily.johnson@example.com",
    "status": "Active",
    "path": ["Users", "Emily Johnson"],
    "subRows": [
      {
        "user": "Account",
        "role": "Marketing Manager",
        "roleType": "Full Access",
        "path": ["Users", "Emily Johnson", "Roles", "Marketing Manager"],
        "subRows": [
          { "user": "Entitlement", "permission": "View Campaigns", "accessLevel": "Read", "path": ["Users", "Emily Johnson", "Roles", "Marketing Manager", "Permissions", "View Campaigns"] },
          { "user": "Entitlement", "permission": "Create Campaigns", "accessLevel": "Write", "path": ["Users", "Emily Johnson", "Roles", "Marketing Manager", "Permissions", "Create Campaigns"] },
          { "user": "Entitlement", "permission": "Edit Campaigns", "accessLevel": "Write", "path": ["Users", "Emily Johnson", "Roles", "Marketing Manager", "Permissions", "Edit Campaigns"] },
          { "user": "Entitlement", "permission": "Delete Campaigns", "accessLevel": "Write", "path": ["Users", "Emily Johnson", "Roles", "Marketing Manager", "Permissions", "Delete Campaigns"] },
          { "user": "Entitlement", "permission": "View Reports", "accessLevel": "Read", "path": ["Users", "Emily Johnson", "Roles", "Marketing Manager", "Permissions", "View Reports"] },
          { "user": "Entitlement", "permission": "Generate Reports", "accessLevel": "Write", "path": ["Users", "Emily Johnson", "Roles", "Marketing Manager", "Permissions", "Generate Reports"] },
          { "user": "Entitlement", "permission": "Manage Budget", "accessLevel": "Write", "path": ["Users", "Emily Johnson", "Roles", "Marketing Manager", "Permissions", "Manage Budget"] },
          { "user": "Entitlement", "permission": "Approve Budget", "accessLevel": "Write", "path": ["Users", "Emily Johnson", "Roles", "Marketing Manager", "Permissions", "Approve Budget"] },
          { "user": "Entitlement", "permission": "Manage Content", "accessLevel": "Write", "path": ["Users", "Emily Johnson", "Roles", "Marketing Manager", "Permissions", "Manage Content"] },
          { "user": "Entitlement", "permission": "View Feedback", "accessLevel": "Read", "path": ["Users", "Emily Johnson", "Roles", "Marketing Manager", "Permissions", "View Feedback"] }
        ]
      }
    ]
  },
  {
    "user": "Daniel Turner",
    "id": 142567,
    "avatar": "https://avatar.iran.liara.run/public/13",
    "risk": "Medium",
    "jobTitle": "Product Owner",
    "changeSinceLastReview": 6,
    "aIAssistConfidence": "thumbs-up",
    "email": "daniel.turner@example.com",
    "status": "Active",
    "path": ["Users", "Daniel Turner"],
    "subRows": [
      {
        "user": "Account",
        "role": "Product Owner",
        "roleType": "Full Access",
        "path": ["Users", "Daniel Turner", "Roles", "Product Owner"],
        "subRows": [
          { "user": "Entitlement", "permission": "Manage Products", "accessLevel": "Write", "path": ["Users", "Daniel Turner", "Roles", "Product Owner", "Permissions", "Manage Products"] },
          { "user": "Entitlement", "permission": "View Products", "accessLevel": "Read", "path": ["Users", "Daniel Turner", "Roles", "Product Owner", "Permissions", "View Products"] },
          { "user": "Entitlement", "permission": "Edit Products", "accessLevel": "Write", "path": ["Users", "Daniel Turner", "Roles", "Product Owner", "Permissions", "Edit Products"] },
          { "user": "Entitlement", "permission": "Delete Products", "accessLevel": "Write", "path": ["Users", "Daniel Turner", "Roles", "Product Owner", "Permissions", "Delete Products"] },
          { "user": "Entitlement", "permission": "Create Roadmaps", "accessLevel": "Write", "path": ["Users", "Daniel Turner", "Roles", "Product Owner", "Permissions", "Create Roadmaps"] },
          { "user": "Entitlement", "permission": "View Roadmaps", "accessLevel": "Read", "path": ["Users", "Daniel Turner", "Roles", "Product Owner", "Permissions", "View Roadmaps"] },
          { "user": "Entitlement", "permission": "Update Roadmaps", "accessLevel": "Write", "path": ["Users", "Daniel Turner", "Roles", "Product Owner", "Permissions", "Update Roadmaps"] },
          { "user": "Entitlement", "permission": "Create Sprints", "accessLevel": "Write", "path": ["Users", "Daniel Turner", "Roles", "Product Owner", "Permissions", "Create Sprints"] },
          { "user": "Entitlement", "permission": "View Sprints", "accessLevel": "Read", "path": ["Users", "Daniel Turner", "Roles", "Product Owner", "Permissions", "View Sprints"] },
          { "user": "Entitlement", "permission": "Assign Tasks", "accessLevel": "Write", "path": ["Users", "Daniel Turner", "Roles", "Product Owner", "Permissions", "Assign Tasks"] }
        ]
      }
    ]
  },
  {
    "user": "Sarah Wilson",
    "id": 152768,
    "avatar": "https://avatar.iran.liara.run/public/14",
    "risk": "High",
    "jobTitle": "Senior Analyst",
    "changeSinceLastReview": 2,
    "aIAssistConfidence": "thumbs-down",
    "email": "sarah.wilson@example.com",
    "status": "Inactive",
    "path": ["Users", "Sarah Wilson"],
    "subRows": [
      {
        "user": "Account",
        "role": "Analyst",
        "roleType": "Limited Access",
        "path": ["Users", "Sarah Wilson", "Roles", "Analyst"],
        "subRows": [
          { "user": "Entitlement", "permission": "View Reports", "accessLevel": "Read", "path": ["Users", "Sarah Wilson", "Roles", "Analyst", "Permissions", "View Reports"] },
          { "user": "Entitlement", "permission": "Export Reports", "accessLevel": "Read", "path": ["Users", "Sarah Wilson", "Roles", "Analyst", "Permissions", "Export Reports"] },
          { "user": "Entitlement", "permission": "View Dashboards", "accessLevel": "Read", "path": ["Users", "Sarah Wilson", "Roles", "Analyst", "Permissions", "View Dashboards"] },
          { "user": "Entitlement", "permission": "Analyze Data", "accessLevel": "Write", "path": ["Users", "Sarah Wilson", "Roles", "Analyst", "Permissions", "Analyze Data"] },
          { "user": "Entitlement", "permission": "Share Reports", "accessLevel": "Write", "path": ["Users", "Sarah Wilson", "Roles", "Analyst", "Permissions", "Share Reports"] },
          { "user": "Entitlement", "permission": "Manage Feedback", "accessLevel": "Write", "path": ["Users", "Sarah Wilson", "Roles", "Analyst", "Permissions", "Manage Feedback"] },
          { "user": "Entitlement", "permission": "Generate Reports", "accessLevel": "Write", "path": ["Users", "Sarah Wilson", "Roles", "Analyst", "Permissions", "Generate Reports"] },
          { "user": "Entitlement", "permission": "Create Dashboards", "accessLevel": "Write", "path": ["Users", "Sarah Wilson", "Roles", "Analyst", "Permissions", "Create Dashboards"] },
          { "user": "Entitlement", "permission": "View Feedback", "accessLevel": "Read", "path": ["Users", "Sarah Wilson", "Roles", "Analyst", "Permissions", "View Feedback"] },
          { "user": "Entitlement", "permission": "Assign Reports", "accessLevel": "Write", "path": ["Users", "Sarah Wilson", "Roles", "Analyst", "Permissions", "Assign Reports"] }
        ]
      }
    ]
  },
  {
    "user": "Joshua Parker",
    "id": 162768,
    "avatar": "https://avatar.iran.liara.run/public/15",
    "risk": "Low",
    "jobTitle": "Team Lead",
    "changeSinceLastReview": 5,
    "aIAssistConfidence": "thumbs-up",
    "email": "joshua.parker@example.com",
    "status": "Active",
    "path": ["Users", "Joshua Parker"],
    "subRows": [
      {
        "user": "Account",
        "role": "Team Lead",
        "roleType": "Full Access",
        "path": ["Users", "Joshua Parker", "Roles", "Team Lead"],
        "subRows": [
          { "user": "Entitlement", "permission": "Manage Team", "accessLevel": "Write", "path": ["Users", "Joshua Parker", "Roles", "Team Lead", "Permissions", "Manage Team"] },
          { "user": "Entitlement", "permission": "View Reports", "accessLevel": "Read", "path": ["Users", "Joshua Parker", "Roles", "Team Lead", "Permissions", "View Reports"] },
          { "user": "Entitlement", "permission": "Assign Tasks", "accessLevel": "Write", "path": ["Users", "Joshua Parker", "Roles", "Team Lead", "Permissions", "Assign Tasks"] },
          { "user": "Entitlement", "permission": "View Team", "accessLevel": "Read", "path": ["Users", "Joshua Parker", "Roles", "Team Lead", "Permissions", "View Team"] },
          { "user": "Entitlement", "permission": "Manage Projects", "accessLevel": "Write", "path": ["Users", "Joshua Parker", "Roles", "Team Lead", "Permissions", "Manage Projects"] },
          { "user": "Entitlement", "permission": "Approve Tasks", "accessLevel": "Write", "path": ["Users", "Joshua Parker", "Roles", "Team Lead", "Permissions", "Approve Tasks"] },
          { "user": "Entitlement", "permission": "View Feedback", "accessLevel": "Read", "path": ["Users", "Joshua Parker", "Roles", "Team Lead", "Permissions", "View Feedback"] },
          { "user": "Entitlement", "permission": "Manage Feedback", "accessLevel": "Write", "path": ["Users", "Joshua Parker", "Roles", "Team Lead", "Permissions", "Manage Feedback"] },
          { "user": "Entitlement", "permission": "Generate Reports", "accessLevel": "Write", "path": ["Users", "Joshua Parker", "Roles", "Team Lead", "Permissions", "Generate Reports"] },
          { "user": "Entitlement", "permission": "Create Roadmaps", "accessLevel": "Write", "path": ["Users", "Joshua Parker", "Roles", "Team Lead", "Permissions", "Create Roadmaps"] }
        ]
      }
    ]
  },
  {
    "user": "Olivia Harris",
    "id": 172869,
    "avatar": "https://avatar.iran.liara.run/public/16",
    "risk": "Medium",
    "jobTitle": "Business Analyst",
    "changeSinceLastReview": 3,
    "aIAssistConfidence": "thumbs-up",
    "email": "olivia.harris@example.com",
    "status": "Active",
    "path": ["Users", "Olivia Harris"],
    "subRows": [
      {
        "user": "Account",
        "role": "Business Analyst",
        "roleType": "Limited Access",
        "path": ["Users", "Olivia Harris", "Roles", "Business Analyst"],
        "subRows": [
          { "user": "Entitlement", "permission": "View Reports", "accessLevel": "Read", "path": ["Users", "Olivia Harris", "Roles", "Business Analyst", "Permissions", "View Reports"] },
          { "user": "Entitlement", "permission": "Export Reports", "accessLevel": "Read", "path": ["Users", "Olivia Harris", "Roles", "Business Analyst", "Permissions", "Export Reports"] },
          { "user": "Entitlement", "permission": "Analyze Data", "accessLevel": "Write", "path": ["Users", "Olivia Harris", "Roles", "Business Analyst", "Permissions", "Analyze Data"] },
          { "user": "Entitlement", "permission": "View Dashboards", "accessLevel": "Read", "path": ["Users", "Olivia Harris", "Roles", "Business Analyst", "Permissions", "View Dashboards"] },
          { "user": "Entitlement", "permission": "Create Dashboards", "accessLevel": "Write", "path": ["Users", "Olivia Harris", "Roles", "Business Analyst", "Permissions", "Create Dashboards"] },
          { "user": "Entitlement", "permission": "Manage Projects", "accessLevel": "Write", "path": ["Users", "Olivia Harris", "Roles", "Business Analyst", "Permissions", "Manage Projects"] },
          { "user": "Entitlement", "permission": "View Feedback", "accessLevel": "Read", "path": ["Users", "Olivia Harris", "Roles", "Business Analyst", "Permissions", "View Feedback"] },
          { "user": "Entitlement", "permission": "Manage Feedback", "accessLevel": "Write", "path": ["Users", "Olivia Harris", "Roles", "Business Analyst", "Permissions", "Manage Feedback"] },
          { "user": "Entitlement", "permission": "Generate Reports", "accessLevel": "Write", "path": ["Users", "Olivia Harris", "Roles", "Business Analyst", "Permissions", "Generate Reports"] },
          { "user": "Entitlement", "permission": "Share Reports", "accessLevel": "Write", "path": ["Users", "Olivia Harris", "Roles", "Business Analyst", "Permissions", "Share Reports"] }
        ]
      }
    ]
  },
  {
    "user": "Michael Scott",
    "id": 182970,
    "avatar": "https://avatar.iran.liara.run/public/17",
    "risk": "Critical",
    "jobTitle": "Chief Executive Officer",
    "changeSinceLastReview": 1,
    "aIAssistConfidence": "thumbs-down",
    "email": "michael.scott@example.com",
    "status": "Active",
    "path": ["Users", "Michael Scott"],
    "subRows": [
      {
        "user": "Account",
        "role": "CEO",
        "roleType": "Full Access",
        "path": ["Users", "Michael Scott", "Roles", "CEO"],
        "subRows": [
          { "user": "Entitlement", "permission": "Manage Company", "accessLevel": "Write", "path": ["Users", "Michael Scott", "Roles", "CEO", "Permissions", "Manage Company"] },
          { "user": "Entitlement", "permission": "View Company Reports", "accessLevel": "Read", "path": ["Users", "Michael Scott", "Roles", "CEO", "Permissions", "View Company Reports"] },
          { "user": "Entitlement", "permission": "Approve Budgets", "accessLevel": "Write", "path": ["Users", "Michael Scott", "Roles", "CEO", "Permissions", "Approve Budgets"] },
          { "user": "Entitlement", "permission": "Create Company Strategies", "accessLevel": "Write", "path": ["Users", "Michael Scott", "Roles", "CEO", "Permissions", "Create Company Strategies"] },
          { "user": "Entitlement", "permission": "Manage Financials", "accessLevel": "Write", "path": ["Users", "Michael Scott", "Roles", "CEO", "Permissions", "Manage Financials"] },
          { "user": "Entitlement", "permission": "Approve Marketing Plans", "accessLevel": "Write", "path": ["Users", "Michael Scott", "Roles", "CEO", "Permissions", "Approve Marketing Plans"] },
          { "user": "Entitlement", "permission": "Set Company Policies", "accessLevel": "Write", "path": ["Users", "Michael Scott", "Roles", "CEO", "Permissions", "Set Company Policies"] },
          { "user": "Entitlement", "permission": "Oversee Teams", "accessLevel": "Write", "path": ["Users", "Michael Scott", "Roles", "CEO", "Permissions", "Oversee Teams"] },
          { "user": "Entitlement", "permission": "Manage Investor Relations", "accessLevel": "Write", "path": ["Users", "Michael Scott", "Roles", "CEO", "Permissions", "Manage Investor Relations"] },
          { "user": "Entitlement", "permission": "Public Speaking", "accessLevel": "Write", "path": ["Users", "Michael Scott", "Roles", "CEO", "Permissions", "Public Speaking"] }
        ]
      }
    ]
  }  
]

*/
export const campData=[
  {
    "id": 1,
    "campaignName": "Quarterly Access Review",
    "description": "Review user permissions and access levels across departments.",
    "instances": 150,
    "progress": "75%",
    "expiryDate": "2025-04-15",
    "owner": "John Doe"
  },
  {
    "id": 2,
    "campaignName": "Finance Role Audit",
    "description": "Verify finance department users have appropriate access rights.",
    "instances": 75,
    "progress": "50%",
    "expiryDate": "2025-05-01",
    "owner": "Alice Johnson"
  },
  {
    "id": 3,
    "campaignName": "MFA Compliance Check",
    "description": "Ensure all employees have enabled Multi-Factor Authentication.",
    "instances": 200,
    "progress": "90%",
    "expiryDate": "2025-03-30",
    "owner": "Robert Smith"
  },
  {
    "id": 4,
    "campaignName": "Privileged Account Review",
    "description": "Identify and validate privileged users' access rights.",
    "instances": 50,
    "progress": "60%",
    "expiryDate": "2025-04-10",
    "owner": "Emily White"
  }
]
  
