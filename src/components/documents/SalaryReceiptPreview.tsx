import React, { forwardRef } from "react";
import SchoolHeader from "./SchoolHeader";

export interface SalaryReceiptData {
  month: string;
  employeeName: string;
  employeeId?: string;
  designation?: string;
  basicPay: number;
  hra: number;
  allowances: number;
  deductions: number;
  accountantName?: string;
  principalName?: string;
  amountInWords: string;
}

const SalaryReceiptPreview = forwardRef<HTMLDivElement, { data: SalaryReceiptData }>(
  ({ data }, ref) => {
    const {
      month,
      employeeName,
      employeeId,
      designation,
      basicPay,
      hra,
      allowances,
      deductions,
      accountantName,
      principalName,
      amountInWords,
    } = data;

    const gross = basicPay + hra + allowances;
    const net = Math.max(0, gross - deductions);

    return (
      <article ref={ref as any} className="a4 font-serifDoc">
        <SchoolHeader />

        <div className="text-center mb-6">
          <h2 className="text-lg font-bold uppercase tracking-wide">Salary Receipt</h2>
          <p className="text-sm text-muted-foreground">Salary Month: {month || "[Month]"}</p>
        </div>

        <section className="text-sm leading-7 grid grid-cols-2 gap-4 mb-4">
          <p><span className="font-semibold">Employee Name:</span> {employeeName || "[Name]"}</p>
          {employeeId && <p><span className="font-semibold">Employee ID:</span> {employeeId}</p>}
          {designation && <p><span className="font-semibold">Designation:</span> {designation}</p>}
        </section>

        <section className="mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2">Component</th>
                <th className="text-right py-2">Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="py-2">Basic Pay</td>
                <td className="py-2 text-right">{basicPay.toFixed(2)}</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2">HRA</td>
                <td className="py-2 text-right">{hra.toFixed(2)}</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2">Allowances</td>
                <td className="py-2 text-right">{allowances.toFixed(2)}</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 font-semibold">Gross Pay</td>
                <td className="py-2 text-right font-semibold">{gross.toFixed(2)}</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 text-destructive font-semibold">Deductions</td>
                <td className="py-2 text-right text-destructive font-semibold">-{deductions.toFixed(2)}</td>
              </tr>
              <tr>
                <td className="py-2 font-bold">Net Pay</td>
                <td className="py-2 text-right font-bold">{net.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
          <p className="mt-3 text-sm"><span className="font-semibold">Total (in words):</span> {amountInWords || "[Amount in words]"}</p>
        </section>

        <section className="mt-10 grid grid-cols-2 gap-6">
          <div>
            <p className="font-semibold">Accountant</p>
            <p className="mt-12 font-semibold">{accountantName || "[Accountant Name]"}</p>
          </div>
          <div className="text-right">
            <p className="font-semibold">Principal/Head</p>
            <p className="mt-12 font-semibold">{principalName || "[Principal Name]"}</p>
          </div>
        </section>
      </article>
    );
  }
);

SalaryReceiptPreview.displayName = "SalaryReceiptPreview";
export default SalaryReceiptPreview;
