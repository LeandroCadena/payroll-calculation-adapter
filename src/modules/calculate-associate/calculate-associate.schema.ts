import { z } from 'zod';

// Zod valida datos externos antes de que entren a la lógica de negocio.
// Esto evita que requests inválidas lleguen al use case.
export const calculateAssociateSchema = z.object({
  body: z.object({
    requesterAOID: z.string().min(1),
    calculateAssociate: z
      .array(
        z.object({
          organizationOID: z.string().min(1),
          payrollProfileID: z.string().min(1),
          paymentGroupID: z.string().min(1),
          countryCode: z.string().length(2),
          payPeriodID: z.string().min(1),
          calculationTypeCode: z.enum(['GROSS_TO_NET', 'NET_TO_GROSS']),
          payDate: z.string().date(),
          associateOID: z.string().min(1),
          associateWeeklyStandardHours: z.number().positive(),
        }),
      )
      .min(1),
  }),
});
