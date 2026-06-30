export interface ApplicationMetrics {
  calculationsStarted: number;
  calculationsCompleted: number;
  calculationsFailed: number;
  externalCalls: number;
  retries: number;
}

const metrics: ApplicationMetrics = {
  calculationsStarted: 0,
  calculationsCompleted: 0,
  calculationsFailed: 0,
  externalCalls: 0,
  retries: 0,
};

export const incrementCalculationsStarted = (): void => {
  metrics.calculationsStarted += 1;
};

export const incrementCalculationsCompleted = (): void => {
  metrics.calculationsCompleted += 1;
};

export const incrementCalculationsFailed = (): void => {
  metrics.calculationsFailed += 1;
};

export const incrementExternalCalls = (): void => {
  metrics.externalCalls += 1;
};

export const incrementRetries = (): void => {
  metrics.retries += 1;
};

export const getApplicationMetrics = (): ApplicationMetrics => {
  return { ...metrics };
};
