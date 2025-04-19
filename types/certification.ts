export interface ReviewerCertificationInfo {
    certificationName: string;
    certificationType: string;
    certificationCreatedOn: string;
    certificationExpiration: string;
    status: string;
    certificationSignedOff: boolean;
    certificateRequester: string;
}

export interface ReviewerCertificateActionInfo {
    percentageCompleted: number;
    totalActions: number;
    totalActionsCompleted: number;
}

export interface RawCertification {
    reviewerId: string;
    certificationId: string;
    campaignId: string;
    reviewerCertificationInfo?: ReviewerCertificationInfo[];
    reviewerCertificateActionInfo?: ReviewerCertificateActionInfo[];
}

export interface CertificationResponse {
    items: RawCertification[];
}

export interface CertificationRow {
    reviewerId: string;
    certificationId: string;
    campaignId: string;
    certificationName: string;
    certificationType: string;
    certificationCreatedOn: string;
    certificationExpiration: string;
    status: string;
    certificationSignedOff: boolean;
    certificateRequester: string;
    percentageCompleted: number;
    totalActions: number;
    totalActionsCompleted: number;
  }
  