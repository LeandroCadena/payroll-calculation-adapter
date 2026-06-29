export interface CalculateAssociateRequestDto {
  requesterAOID: string;
  calculateAssociate: CalculateAssociateItemDto[];
}

// Las interfaces definen contratos de datos en TypeScript.
// Aquí documentamos la forma esperada de cada asociado recibido por la API.
export interface CalculateAssociateItemDto {
  organizationOID: string;
  payrollProfileID: string;
  paymentGroupID: string;
  countryCode: string;
  payPeriodID: string;
  calculationTypeCode: 'GROSS_TO_NET' | 'NET_TO_GROSS';
  payDate: string;
  associateOID: string;
  associateWeeklyStandardHours: number;
}

export interface CalculateAssociateAcceptedResponseDto {
  calculationGroupId: string;
  status: 'CALCULATING' | 'CALCULATED' | 'ERROR';
  message: string;
}
