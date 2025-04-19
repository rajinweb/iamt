export interface EntitlementInfo {
    entitlementName: string;
    entitlementDescription: string;
  }
  
  export interface LineItemDetail {
    ID: string;
    entitlementInfo?: EntitlementInfo[];
    Recommendation?: string;
    accessedWithinAMonth?: string;
    entityRisk?: string;
    itemRisk?:string;
    percAccessInSameDept?: string;
    percAccessWithSameJobtitle?: string;
    percAccessWithSameManager?: string;
    actionInLastReview?: string;
  }