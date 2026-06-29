import type { PayrollBuilderRequest, PayrollBuilderResponse } from './payroll-builder.types';

// Este mock simula el payroll-builder real.
// En producción, este client podría reemplazarse por una llamada HTTP al repo en Go.
export const fetchPayrollBuilderData = async (
  request: PayrollBuilderRequest,
  accessToken: string,
): Promise<PayrollBuilderResponse> => {
  void accessToken;

  return {
    associates: request.associateOIDs.map((associateOID) => ({
      associateOID,
      organizationOID: 'G3F4HH2X9K5DP07C',
      countryCode: 'US',
      payrollProfileID: 'PAYROLL_PROFILE_001',
      paymentGroupID: 'PAYMENT_GROUP_001',
      employmentStatus: 'ACTIVE',
      standardHours: 40,
      baseRateAmount: 45,
      currencyCode: 'USD',
    })),
  };
};
