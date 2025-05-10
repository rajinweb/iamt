import { useQuery, UseQueryResult } from "@tanstack/react-query";
import {
  getCertifications,
  getCertificationDetails,
  getAccessDetails,
} from "@/lib/api";

import type { CertificationRow } from "@/types/certification";

export const useCertifications = (
  reviewerId: string,
  pageSize?: number,
  pageNumber?: number,
  setTotalPages?: (totalPages: number) => void,
  setTotalItems?: (totalItems: number) => void,
  enabled = true
): UseQueryResult<CertificationRow> => {
  return useQuery({
    queryKey: ["certifications", reviewerId, pageSize, pageNumber],
    queryFn: async () => {
      const res = await getCertifications(reviewerId, pageSize, pageNumber);
      setTotalPages?.(res.total_pages ?? 1);
      setTotalItems?.(res.total_items ?? res.items?.length ?? 0);
      return { ...res };
    },
    enabled,
    staleTime: 1000 * 60 * 5,
  });
};

export const useCertificationDetails = (
  reviewerId: string,
  certId: string,
  pageSize?: number,
  pageNumber?: number,
  setTotalPages?: (totalPages: number) => void,
  setTotalItems?: (totalItems: number) => void,
  enabled = true
): UseQueryResult<any> => {
  return useQuery({
    queryKey: [
      "certificationDetails",
      reviewerId,
      certId,
      pageSize,
      pageNumber,
    ],
    queryFn: async () => {
      const res = await getCertificationDetails(
        reviewerId,
        certId,
        pageSize,
        pageNumber
      );
      setTotalPages?.(res.total_pages ?? 1);
      setTotalItems?.(res.total_items ?? res.items?.length ?? 0);
      return { ...res };
    },
    enabled,
    staleTime: 1000 * 60 * 5,
  });
};

export const fetchAccessDetails = async (
  reviewerId: string,
  certId: string,
  taskId?: string,
  all?: string,
  pageSize?: number,
  pageNumber?: number,
  setTotalPages?: (totalPages: number) => void,
  setTotalItems?: (totalItems: number) => void
) => {
  const res: {
    items?: { accessDetails?: any[] }[];
    total_pages?: number;
    total_items?: number;
  } = await getAccessDetails(
    reviewerId,
    certId,
    taskId,
    all,
    pageSize,
    pageNumber
  );

  setTotalPages?.(res.total_pages ?? 1);
  setTotalItems?.(res.total_items ?? res.items?.length ?? 0);

  const items = res.items?.[0]?.accessDetails ?? [];
  const flattened: any[] = [];

  items.forEach((access: any) => {
    access.entityAppinstance?.forEach((app: any) => {
      app.entityEntitlements?.forEach((ent: any) => {
        const ai = ent.AIAssist?.[0] ?? {};
        const info = ent.entitlementInfo?.[0] ?? {};

        flattened.push({
          itemType: "Entitlement",
          user: info.entitlementName,
          risk: ent.itemRisk,
          description: info.entitlementDescription,
          applicationName: app.applicationInfo?.[0]?.applicationName,
          lastLogin: app.applicationInfo?.[0]?.lastLogin,
          recommendation: ai.Recommendation,
          action: ent.action,
          oldComments: ent.oldComments,
          lineItemId: app.lineItemId,
          taskId,
          entitlementName: info.entitlementName,
          entitlementDescription: info.entitlementDescription,
        });
      });
    });
  });

  return flattened;
};

/*
export const useAccessDetails = (
  reviewerId: string,
  certId: string,
  taskId?: string,
  all?: string,
  enabled = true
): UseQueryResult<any[]> => {
  return useQuery({
    queryKey: ["accessDetails", reviewerId, certId, taskId, all],
    queryFn: () => fetchAccessDetails(reviewerId, certId, taskId, all),
    enabled,
    staleTime: 1000 * 60 * 5,
  });
};

export const useLineItemDetails = (
  reviewerId: string,
  certId: string,
  taskId: string,
  lineItemId: string
) => {
  return useQuery<LineItemDetail[]>({
    queryKey: ["lineItemDetails", reviewerId, certId, taskId, lineItemId],
    queryFn: () => getLineItemDetails(reviewerId, certId, taskId, lineItemId),
    enabled: !!reviewerId && !!certId && !!taskId && !!lineItemId,
    staleTime: 1000 * 60 * 5,
  });
};
*/
