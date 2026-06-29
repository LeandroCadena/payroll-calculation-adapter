import type { PayrollBuilderAssociate } from '@/clients/payroll-builder';

export interface CalculationEngineAssociateInput {
  associateOID: string;
  organizationOID: string;
  countryCode: string;
  payrollProfileID: string;
  paymentGroupID: string;
  standardHours: number;
  baseRateAmount: number;
  currencyCode: string;
}

// Los mappers transforman datos entre sistemas.
// Esto evita que el formato de Payroll Builder se filtre hacia Calculation Engine.
export const mapPayrollBuilderAssociatesToCalculationEngineInput = (
  associates: PayrollBuilderAssociate[],
): CalculationEngineAssociateInput[] => {
  return associates.map((associate) => ({
    associateOID: associate.associateOID,
    organizationOID: associate.organizationOID,
    countryCode: associate.countryCode,
    payrollProfileID: associate.payrollProfileID,
    paymentGroupID: associate.paymentGroupID,
    standardHours: associate.standardHours,
    baseRateAmount: associate.baseRateAmount,
    currencyCode: associate.currencyCode,
  }));
};
