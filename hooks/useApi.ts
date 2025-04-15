import { useQuery } from '@tanstack/react-query';
import {
  getCertifications,
  getCertificationDetails,
  getAccessDetails,
} from '@/lib/api';

// Types
import type { CertificationRow } from '@/app/page';

export const useCertifications = (reviewerId: string, enabled = true) => {
  return useQuery({
    queryKey: ['certifications', reviewerId],
    queryFn: async () => {
      const res = await getCertifications<{ items: any[] }>(reviewerId);
      return res.items.map((item: any): CertificationRow => {
        const certInfo = item.reviewerCertificationInfo?.[0] || {};
        const actionInfo = item.reviewerCertificateActionInfo?.[0] || {};
        return {
          reviewerId: item.reviewerId,
          certificationId: item.certificationId,
          campaignId: item.campaignId,
          certificationName: certInfo.certificationName,
          certificationType: certInfo.certificationType,
          certificationCreatedOn: certInfo.certificationCreatedOn,
          certificationExpiration: certInfo.certificationExpiration,
          status: certInfo.status,
          certificationSignedOff: certInfo.certificationSignedOff,
          certificateRequester: certInfo.certificateRequester,
          percentageCompleted: actionInfo.percentageCompleted,
          totalActions: actionInfo.totalActions,
          totalActionsCompleted: actionInfo.totalActionsCompleted,
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
) => {
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

    access.entityAppinstance?.forEach((app: any) => {
      app.entityEntitlements?.forEach((ent: any) => {
        const ai = ent.AIAssist?.[0] ?? {};
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
        });
      });
    });
  });

  return flattened;
};
