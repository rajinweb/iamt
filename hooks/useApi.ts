import { useQuery, UseQueryResult } from '@tanstack/react-query';
import {
  getCertifications,
  getCertificationDetails,
  getAccessDetails,
  getLineItemDetails
} from '@/lib/api';

import type {
  CertificationRow,
  CertificationResponse,
  RawCertification,
} from '@/types/certification';
import { LineItemDetail } from '@/types/lineItem';

export const useCertifications = (reviewerId: string, enabled = true): UseQueryResult<CertificationRow[]> => {
  return useQuery({
    queryKey: ['certifications', reviewerId],
    queryFn: async () => {
      const res = await getCertifications<CertificationResponse>(reviewerId);
      return res.items.map((item: RawCertification): CertificationRow => {
        const certInfo = item.reviewerCertificationInfo?.[0];
        const actionInfo = item.reviewerCertificateActionInfo?.[0];
        return {
          reviewerId: item.reviewerId,
          certificationId: item.certificationId,
          campaignId: item.campaignId,
          certificationName: certInfo?.certificationName ?? '',
          certificationType: certInfo?.certificationType ?? '',
          certificationCreatedOn: certInfo?.certificationCreatedOn ?? '',
          certificationExpiration: certInfo?.certificationExpiration ?? '',
          status: certInfo?.status ?? '',
          certificationSignedOff: certInfo?.certificationSignedOff ?? false,
          certificateRequester: certInfo?.certificateRequester ?? '',
          percentageCompleted: actionInfo?.percentageCompleted ?? 0,
          totalActions: actionInfo?.totalActions ?? 0,
          totalActionsCompleted: actionInfo?.totalActionsCompleted ?? 0,
        };
      });
    },
    enabled,
    staleTime: 1000 * 60 * 5,
  });
};

export const useCertificationDetails = (
  reviewerId: string,
  certId: string,
  enabled = true
): UseQueryResult<any> => {
  return useQuery({
    queryKey: ['certificationDetails', reviewerId, certId],
    queryFn: () => getCertificationDetails<any>(reviewerId, certId),
    enabled,
    staleTime: 1000 * 60 * 5,
  });
};

export const fetchAccessDetails = async (
  reviewerId: string,
  certId: string,
  taskId?: string,
  all?: string
) => {
  const response = await getAccessDetails<any>(reviewerId, certId, taskId, all);
  const items = response.items?.[0]?.accessDetails ?? [];

  const flattened: any[] = [];

  items.forEach((access: any) => {
  /*
    access.entityRole?.forEach((role: any) => {
      flattened.push({
        itemType: "Role",
        user: role.roleInfo?.[0]?.roleOwner + '\n' + role.roleInfo?.[0]?.roleName,
        risk: role.itemRisk,
        description: role.roleInfo?.[0]?.roleDescription,
        action: role.action,
        oldComments: role.oldComments,
        recommendation: "",
      });
    });
    */

    access.entityAppinstance?.forEach((app: any) => {
  
      app.entityEntitlements?.forEach((ent: any) => {
        const ai = ent.AIAssist?.[0] ?? {};
        const info = ent.entitlementInfo?.[0] ?? {};
       
        flattened.push({
          itemType: "Entitlement",
          user: ent.entitlementInfo?.[0]?.entitlementName,
          risk: ent.itemRisk,
          description: ent.entitlementInfo?.[0]?.entitlementDescription,
          applicationName: app.applicationInfo?.[0]?.applicationName,
          lastLogin: app.applicationInfo?.[0]?.lastLogin,
          recommendation: ai.Recommendation,
          action: ent.action,
          oldComments: ent.oldComments,
          lineItemId: app.lineItemId,
          taskId,
          entitlementName: info.entitlementName ?? '',
          entitlementDescription: info.entitlementDescription ?? '',
        });
      });
    });
  });

  return flattened;
};

export const useAccessDetails = (
  reviewerId: string,
  certId: string,
  taskId?: string,
  all?: string,
  enabled = true
): UseQueryResult<any[]> => {
  return useQuery({
    queryKey: ['accessDetails', reviewerId, certId, taskId, all],
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
    queryKey: ['lineItemDetails', reviewerId, certId, taskId, lineItemId],
    queryFn: () => getLineItemDetails(reviewerId, certId, taskId, lineItemId),
    enabled: !!reviewerId && !!certId && !!taskId && !!lineItemId,
    staleTime: 1000 * 60 * 5,
  });
};