export interface PayrollBuilderRequest {
  requesterAOID: string;
  associateOIDs: string[];
  correlationId: string;
}

export interface PayrollBuilderAssociate {
  associateOID: string;
  organizationOID: string;
  countryCode: string;
  payrollProfileID: string;
  paymentGroupID: string;
  employmentStatus: 'ACTIVE' | 'TERMINATED';
  standardHours: number;
  baseRateAmount: number;
  currencyCode: string;
}

export interface PayrollBuilderResponse {
  associates: PayrollBuilderAssociate[];
}
