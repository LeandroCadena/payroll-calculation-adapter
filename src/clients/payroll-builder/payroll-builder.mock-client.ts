import { ExternalServiceError } from '@/shared/errors';

import type { PayrollBuilderRequest, PayrollBuilderResponse } from './payroll-builder.types';

export const fetchPayrollBuilderData = async (
  request: PayrollBuilderRequest,
  accessToken: string,
): Promise<PayrollBuilderResponse> => {
  if (!accessToken) {
    throw new ExternalServiceError('payroll-builder', 'Missing OAuth access token');
  }

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
