import { ApplicationError } from '@/shared/errors';

import type { PayrollBuilderAssociate } from '@/clients/payroll-builder';

export const validatePayrollBuilderAssociates = (associates: PayrollBuilderAssociate[]): void => {
  for (const associate of associates) {
    if (associate.employmentStatus !== 'ACTIVE') {
      throw new ApplicationError(
        `Associate ${associate.associateOID} is not active`,
        422,
        'ASSOCIATE_NOT_ACTIVE',
      );
    }

    if (associate.standardHours <= 0) {
      throw new ApplicationError(
        `Associate ${associate.associateOID} has invalid standard hours`,
        422,
        'INVALID_STANDARD_HOURS',
      );
    }

    if (associate.baseRateAmount <= 0) {
      throw new ApplicationError(
        `Associate ${associate.associateOID} has invalid base rate amount`,
        422,
        'INVALID_BASE_RATE',
      );
    }
  }
};
