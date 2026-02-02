import { FinancialData, FinancialAnalysis, FinancialRatios } from "@/types/financial";

export const calculateFinancialHealth = (data: FinancialData): FinancialAnalysis => {
  const { incomeStatement, balanceSheet, cashFlow } = data;

  // Calculate ratios
  const ratios: FinancialRatios = {
    profitability: {
      grossMargin: (incomeStatement.grossProfit / incomeStatement.totalRevenue) * 100,
      operatingMargin: (incomeStatement.operatingIncome / incomeStatement.totalRevenue) * 100,
      netMargin: (incomeStatement.netIncome / incomeStatement.totalRevenue) * 100,
    },
    liquidity: {
      currentRatio: balanceSheet.currentAssets / balanceSheet.currentLiabilities,
      quickRatio: (balanceSheet.currentAssets - (balanceSheet.currentAssets * 0.3)) / balanceSheet.currentLiabilities,
    },
    leverage: {
      debtToEquity: balanceSheet.totalLiabilities / balanceSheet.stockholdersEquity,
      debtToAssets: balanceSheet.totalLiabilities / balanceSheet.totalAssets,
    },
    efficiency: {
      returnOnAssets: (incomeStatement.netIncome / balanceSheet.totalAssets) * 100,
      returnOnEquity: (incomeStatement.netIncome / balanceSheet.stockholdersEquity) * 100,
    },
  };

  // Calculate Altman Z-Score
  const workingCapital = balanceSheet.currentAssets - balanceSheet.currentLiabilities;
  const retainedEarnings = balanceSheet.stockholdersEquity * 0.5; // Approximation
  
  const x1 = workingCapital / balanceSheet.totalAssets;
  const x2 = retainedEarnings / balanceSheet.totalAssets;
  const x3 = incomeStatement.operatingIncome / balanceSheet.totalAssets;
  const x4 = balanceSheet.stockholdersEquity / balanceSheet.totalLiabilities;
  const x5 = incomeStatement.totalRevenue / balanceSheet.totalAssets;
  
  const zScore = 1.2 * x1 + 1.4 * x2 + 3.3 * x3 + 0.6 * x4 + 1.0 * x5;

  // Determine risk level
  let riskLevel: "Healthy" | "Watch" | "At Risk";
  if (zScore > 2.99) riskLevel = "Healthy";
  else if (zScore > 1.81) riskLevel = "Watch";
  else riskLevel = "At Risk";

  // Calculate health score (0-100)
  const healthScore = Math.min(100, Math.max(0, 
    (zScore / 3) * 30 +
    (ratios.profitability.netMargin / 20) * 25 +
    (ratios.liquidity.currentRatio / 2) * 20 +
    (1 / (ratios.leverage.debtToEquity + 0.1)) * 15 +
    (ratios.efficiency.returnOnAssets / 15) * 10
  ));

  // Identify strengths and weaknesses
  const strengths: string[] = [];
  const weaknesses: string[] = [];

  if (ratios.profitability.netMargin > 10) {
    strengths.push(`Strong net profit margin of ${ratios.profitability.netMargin.toFixed(1)}%`);
  } else if (ratios.profitability.netMargin < 5) {
    weaknesses.push(`Low net profit margin of ${ratios.profitability.netMargin.toFixed(1)}%`);
  }

  if (ratios.liquidity.currentRatio > 1.5) {
    strengths.push(`Healthy liquidity with current ratio of ${ratios.liquidity.currentRatio.toFixed(2)}`);
  } else if (ratios.liquidity.currentRatio < 1) {
    weaknesses.push(`Concerning liquidity with current ratio of ${ratios.liquidity.currentRatio.toFixed(2)}`);
  }

  if (ratios.leverage.debtToEquity < 1) {
    strengths.push(`Conservative debt levels with debt-to-equity of ${ratios.leverage.debtToEquity.toFixed(2)}`);
  } else if (ratios.leverage.debtToEquity > 2) {
    weaknesses.push(`High debt burden with debt-to-equity of ${ratios.leverage.debtToEquity.toFixed(2)}`);
  }

  if (ratios.efficiency.returnOnAssets > 8) {
    strengths.push(`Excellent asset utilization with ROA of ${ratios.efficiency.returnOnAssets.toFixed(1)}%`);
  } else if (ratios.efficiency.returnOnAssets < 4) {
    weaknesses.push(`Poor asset efficiency with ROA of ${ratios.efficiency.returnOnAssets.toFixed(1)}%`);
  }

  // Generate AI insights
  const aiInsights = `Your business shows a Z-Score of ${zScore.toFixed(2)}, indicating ${riskLevel.toLowerCase()} financial status. 
  With a net profit margin of ${ratios.profitability.netMargin.toFixed(1)}% and current ratio of ${ratios.liquidity.currentRatio.toFixed(2)}, 
  ${riskLevel === "Healthy" ? "your company demonstrates solid financial fundamentals" : 
    riskLevel === "Watch" ? "there are areas requiring attention to prevent financial deterioration" : 
    "immediate action is needed to improve financial stability"}. 
  Focus on ${weaknesses.length > 0 ? "improving " + weaknesses[0].toLowerCase() : "maintaining current performance"}.`;

  // Generate recommendations
  const recommendations = {
    immediate: [] as string[],
    quarterly: [] as string[],
  };

  if (ratios.liquidity.currentRatio < 1.2) {
    recommendations.immediate.push("Improve working capital by accelerating collections and managing payables");
  }
  if (ratios.leverage.debtToEquity > 1.5) {
    recommendations.immediate.push("Reduce debt burden through debt repayment or equity injection");
  }
  if (ratios.profitability.netMargin < 8) {
    recommendations.quarterly.push("Analyze and reduce operating expenses to improve profit margins");
  }
  if (ratios.efficiency.returnOnAssets < 6) {
    recommendations.quarterly.push("Optimize asset utilization and consider divesting underperforming assets");
  }

  // Add general recommendations if none specific
  if (recommendations.immediate.length === 0) {
    recommendations.immediate.push("Maintain current financial practices and monitor key metrics monthly");
  }
  if (recommendations.quarterly.length === 0) {
    recommendations.quarterly.push("Build cash reserves to at least 3 months of operating expenses");
    recommendations.quarterly.push("Review pricing strategy to maintain competitive margins");
  }

  return {
    healthScore: Math.round(healthScore),
    zScore,
    riskLevel,
    ratios,
    strengths: strengths.length > 0 ? strengths : ["Adequate financial performance"],
    weaknesses: weaknesses.length > 0 ? weaknesses : ["No critical issues identified"],
    aiInsights,
    recommendations,
  };
};
