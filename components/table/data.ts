'use client';
export const rowData = [
  {
   
    user: "Derrick Watson",
    id:603682,
    avtar: 'https://avatar.iran.liara.run/public/8',
    risk: "62 Medium",
    jobTitle:'Lead Product Design',
    changeSinceLastReview:5,
    aIAssistConfidence:'thumbs-up',
    employeeType:'Contractor',
    email: "alice@example.com",
    status: "Active",
    path: ["Users", "Derrick Watson"],
    subRows: [
      {
        user: "Administrator",
        role: "Administrator",
        roleType: "Full Access",
        path: ["Users", "Derrick Watson", "Roles", "Administrator"],
        subRows: [
          {
            user: "Manage Users",
            permission: "Manage Users",
            accessLevel: "Write",
            path: ["Users", "Derrick Watson", "Roles", "Administrator", "Permissions", "Manage Users"],
          },
          {
            user: "Manage Roles",
            permission: "Manage Roles",
            accessLevel: "Write",
            path: ["Users", "Derrick Watson", "Roles", "Administrator", "Permissions", "Manage Roles"],
          },
        ],
      },
    ],
  },
  {
    user: "Sophia Davis",
    id: 724395,
    avtar: "https://avatar.iran.liara.run/public/9",
    risk: "75 High",
    jobTitle: "Senior Software Engineer",
    changeSinceLastReview: 3,
    aIAssistConfidence: "thumbs-down",
    email: "sophia.davis@example.com",
    status: "Active",
    path: ["Users", "Sophia Davis"],
    subRows: [
      {
        user: "Administrator",
        role: "Administrator",
        roleType: "Full Access",
        path: ["Users", "Sophia Davis", "Roles", "Administrator"],
        subRows: [
          {
            user: "Manage Users",
            permission: "Manage Users",
            accessLevel: "Write",
            path: ["Users", "Sophia Davis", "Roles", "Administrator", "Permissions", "Manage Users"]
          },
          {
            user: "Manage Projects",
            permission: "Manage Projects",
            accessLevel: "Write",
            path: ["Users", "Sophia Davis", "Roles", "Administrator", "Permissions", "Manage Projects"]
          }
        ]
      }
    ]
  } 
 ];
