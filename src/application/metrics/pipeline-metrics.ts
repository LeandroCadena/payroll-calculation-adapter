export interface PipelineStepMetric {
  stepName: string;
  durationMs: number;
}

export const measurePipelineStep = async <T>(
  stepName: string,
  operation: () => Promise<T>,
  metrics: PipelineStepMetric[],
): Promise<T> => {
  const startTime = Date.now();

  try {
    return await operation();
  } finally {
    metrics.push({
      stepName,
      durationMs: Date.now() - startTime,
    });
  }
};
