export interface EntitlementInfo {
    entitlementName: string;
    entitlementDescription: string;
  }
  
  export interface LineItemDetail {
    AIAssist?: any;
    ID: string;
    entitlementInfo?: EntitlementInfo[];
    recommendation?: string;
    accessedWithinAMonth?: string;
    entityRisk?: string;
    itemRisk?:string;
    percAccessInSameDept?: string;
    percAccessWithSameJobtitle?: string;
    percAccessWithSameManager?: string;
    actionInLastReview?: string;
  }