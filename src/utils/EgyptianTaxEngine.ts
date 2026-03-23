/**
 * Egyptian Tax Calculation Engine (2024/2025)
 * 
 * Tax Rules:
 * - Personal Exemption: 20,000 EGP
 * - Progressive Tax Brackets:
 *   0% up to 20,000 EGP
 *   10% from 20,001 to 40,000 EGP
 *   15% from 40,001 to 60,000 EGP
 *   20% from 60,001 to 100,000 EGP
 *   25% from 100,001 to 200,000 EGP
 *   27.5% above 200,000 EGP
 */

interface SalaryInputs {
  socialInsuranceSalary: number;
  comprehensiveBasic: number;
  allowance: number;
  salesCommission: number;
  quarterlyBonus: number;
  ramadanBonus: number;
  companySIShare: number; // 18.75%
}

interface Deductions {
  companySIShareContra: number;
  employeeSIShare: number; // 11%
  martyrsFund: number; // 0.05%
  latePenalty: number;
  illnessVacation: number;
}

interface TaxCalculationResult {
  grossSalary: number;
  totalDeductions: number;
  taxableIncome: number;
  incomeTax: number;
  netSalary: number;
  breakdown: {
    earnings: SalaryInputs;
    deductions: Deductions;
  };
}

export class EgyptianTaxEngine {
  private personalExemption = 20000; // EGP

  /**
   * Calculate progressive tax based on Egyptian law 2024/2025
   * @param taxableIncome - Income after personal exemption
   * @returns Calculated tax amount
   */
  private calculateProgressiveTax(taxableIncome: number): number {
    if (taxableIncome <= 0) return 0;

    let tax = 0;

    // Bracket 1: 0% (up to 20,000 EGP)
    if (taxableIncome <= 20000) {
      tax = 0;
    }
    // Bracket 2: 10% (20,001 - 40,000 EGP)
    else if (taxableIncome <= 40000) {
      tax = (taxableIncome - 20000) * 0.10;
    }
    // Bracket 3: 15% (40,001 - 60,000 EGP)
    else if (taxableIncome <= 60000) {
      tax = 2000 + (taxableIncome - 40000) * 0.15;
    }
    // Bracket 4: 20% (60,001 - 100,000 EGP)
    else if (taxableIncome <= 100000) {
      tax = 5000 + (taxableIncome - 60000) * 0.20;
    }
    // Bracket 5: 25% (100,001 - 200,000 EGP)
    else if (taxableIncome <= 200000) {
      tax = 13000 + (taxableIncome - 100000) * 0.25;
    }
    // Bracket 6: 27.5% (above 200,000 EGP)
    else {
      tax = 38000 + (taxableIncome - 200000) * 0.275;
    }

    return Math.round(tax * 100) / 100; // Round to 2 decimal places
  }

  /**
   * Calculate total deductions based on inputs
   * @param salaryInputs - Salary input components
   * @param deductions - Deduction components
   * @returns Total deductions amount
   */
  private calculateTotalDeductions(
    salaryInputs: SalaryInputs,
    deductions: Deductions
  ): number {
    const grossSalary = this.calculateGrossSalary(salaryInputs);

    // Calculate mandatory deductions as percentages
    const employeeSI = grossSalary * 0.11; // 11%
    const martyrsFund = grossSalary * 0.0005; // 0.05%

    return (
      deductions.companySIShareContra +
      employeeSI +
      martyrsFund +
      deductions.latePenalty +
      deductions.illnessVacation
    );
  }

  /**
   * Calculate gross salary from all earning components
   * @param salaryInputs - Salary input components
   * @returns Total gross salary
   */
  private calculateGrossSalary(salaryInputs: SalaryInputs): number {
    return (
      salaryInputs.socialInsuranceSalary +
      salaryInputs.comprehensiveBasic +
      salaryInputs.allowance +
      salaryInputs.salesCommission +
      salaryInputs.quarterlyBonus +
      salaryInputs.ramadanBonus +
      salaryInputs.companySIShare
    );
  }

  /**
   * Main calculation method - computes all salary and tax components
   * @param salaryInputs - Earnings components
   * @param deductions - Deduction components
   * @param customTax - Optional custom tax override (if user manually enters tax)
   * @returns Complete tax calculation result
   */
  public calculateSalary(
    salaryInputs: SalaryInputs,
    deductions: Deductions,
    customTax?: number
  ): TaxCalculationResult {
    const grossSalary = this.calculateGrossSalary(salaryInputs);
    const totalDeductions = this.calculateTotalDeductions(
      salaryInputs,
      deductions
    );
    const taxableIncome = Math.max(0, grossSalary - this.personalExemption);

    // Use custom tax if provided, otherwise calculate automatically
    const incomeTax = customTax !== undefined ? customTax : this.calculateProgressiveTax(taxableIncome);

    const netSalary = Math.max(0, grossSalary - totalDeductions - incomeTax);

    return {
      grossSalary,
      totalDeductions,
      taxableIncome,
      incomeTax,
      netSalary,
      breakdown: {
        earnings: salaryInputs,
        deductions: deductions,
      },
    };
  }

  /**
   * Reset custom tax to automatic calculation
   * @param salaryInputs - Earnings components
   * @returns Auto-calculated tax amount
   */
  public resetToAutoTax(salaryInputs: SalaryInputs): number {
    const grossSalary = this.calculateGrossSalary(salaryInputs);
    const taxableIncome = Math.max(0, grossSalary - this.personalExemption);
    return this.calculateProgressiveTax(taxableIncome);
  }

  /**
   * Get tax bracket information for educational purposes
   * @returns Array of tax brackets
   */
  public getTaxBrackets(): Array<{
    from: number;
    to: number;
    rate: number;
  }> {
    return [
      { from: 0, to: 20000, rate: 0 },
      { from: 20001, to: 40000, rate: 10 },
      { from: 40001, to: 60000, rate: 15 },
      { from: 60001, to: 100000, rate: 20 },
      { from: 100001, to: 200000, rate: 25 },
      { from: 200001, to: Infinity, rate: 27.5 },
    ];
  }
}