import request from 'supertest';

import { createApp } from '@/app';

describe('Calculate Associate Integration Flow', () => {
  const app = createApp();

  it('should accept a calculate associate request and return a calculationGroupId', async () => {
    const response = await request(app)
      .post('/api/v1/calculate-associate')
      .send({
        requesterAOID: 'G3A1VB1MR5A1KTYJ',
        calculateAssociate: [
          {
            organizationOID: 'G3F4HH2X9K5DP07C',
            payrollProfileID: 'PAYROLL_PROFILE_001',
            paymentGroupID: 'PAYMENT_GROUP_001',
            countryCode: 'US',
            payPeriodID: '2026-06',
            calculationTypeCode: 'GROSS_TO_NET',
            payDate: '2026-06-30',
            associateOID: 'G3NV1ECB2Q031KH2',
            associateWeeklyStandardHours: 40,
          },
        ],
      });

    expect(response.status).toBe(202);
    expect(response.body).toEqual({
      calculationGroupId: expect.any(String),
      status: 'CALCULATING',
      message: expect.any(String),
    });
  });

  it('should reject invalid calculate associate payloads', async () => {
    const response = await request(app).post('/api/v1/calculate-associate').send({});

    expect(response.status).toBe(400);
    expect(response.body.error.code).toBe('VALIDATION_ERROR');
    expect(response.body.error.issues).toEqual(expect.any(Array));
  });
});
