import React, { useMemo, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useReactToPrint } from "react-to-print";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import SalaryReceiptPreview, { SalaryReceiptData } from "@/components/documents/SalaryReceiptPreview";
import { ToWords } from "to-words";

const toWords = new ToWords({ localeCode: "en-IN" });

const SalaryReceipt: React.FC = () => {
  const [data, setData] = useState<Omit<SalaryReceiptData, "amountInWords">>({
    schoolName: "",
    logoUrl: "",
    address: "",
    month: "",
    employeeName: "",
    employeeId: "",
    designation: "",
    basicPay: 0,
    hra: 0,
    allowances: 0,
    deductions: 0,
    accountantName: "",
    principalName: "",
  });

  const gross = data.basicPay + data.hra + data.allowances;
  const net = Math.max(0, gross - data.deductions);
  const amountInWords = useMemo(() =>
    net > 0 ? `${toWords.convert(net, { currency: true })}` : "",
  [net]);

  const printRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: `${data.employeeName || "Salary"}-Receipt-${data.month || ""}`,
  });

  const pageTitle = useMemo(
    () => `Salary Receipt Generator | ${data.schoolName || "Formal Forge"}`,
    [data.schoolName]
  );

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-accent/30">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content="Generate a professional salary receipt with components, deductions, net pay, and signatures. Print or save as PDF." />
        <link rel="canonical" href="/salary-receipt" />
      </Helmet>

      <div className="container py-8">
        <header className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Salary Receipt</h1>
          <p className="text-muted-foreground">Enter salary components and preview the receipt.</p>
        </header>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="print-hide">
            <CardHeader>
              <CardTitle>Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="schoolName">School/Org Name</Label>
                  <Input id="schoolName" value={data.schoolName} onChange={(e) => setData({ ...data, schoolName: e.target.value })} />
                </div>
                <div>
                  <Label htmlFor="logoUrl">Logo URL (optional)</Label>
                  <Input id="logoUrl" placeholder="https://..." value={data.logoUrl} onChange={(e) => setData({ ...data, logoUrl: e.target.value })} />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="address">Address (optional)</Label>
                  <Input id="address" value={data.address} onChange={(e) => setData({ ...data, address: e.target.value })} />
                </div>
                <div>
                  <Label htmlFor="month">Salary Month</Label>
                  <Input id="month" placeholder="January 2025" value={data.month} onChange={(e) => setData({ ...data, month: e.target.value })} />
                </div>
                <div>
                  <Label htmlFor="employeeName">Employee Name</Label>
                  <Input id="employeeName" value={data.employeeName} onChange={(e) => setData({ ...data, employeeName: e.target.value })} />
                </div>
                <div>
                  <Label htmlFor="employeeId">Employee ID (optional)</Label>
                  <Input id="employeeId" value={data.employeeId} onChange={(e) => setData({ ...data, employeeId: e.target.value })} />
                </div>
                <div>
                  <Label htmlFor="designation">Designation (optional)</Label>
                  <Input id="designation" value={data.designation} onChange={(e) => setData({ ...data, designation: e.target.value })} />
                </div>
                <div>
                  <Label htmlFor="basicPay">Basic Pay</Label>
                  <Input id="basicPay" type="number" value={data.basicPay} onChange={(e) => setData({ ...data, basicPay: Number(e.target.value || 0) })} />
                </div>
                <div>
                  <Label htmlFor="hra">HRA</Label>
                  <Input id="hra" type="number" value={data.hra} onChange={(e) => setData({ ...data, hra: Number(e.target.value || 0) })} />
                </div>
                <div>
                  <Label htmlFor="allowances">Allowances</Label>
                  <Input id="allowances" type="number" value={data.allowances} onChange={(e) => setData({ ...data, allowances: Number(e.target.value || 0) })} />
                </div>
                <div>
                  <Label htmlFor="deductions">Deductions</Label>
                  <Input id="deductions" type="number" value={data.deductions} onChange={(e) => setData({ ...data, deductions: Number(e.target.value || 0) })} />
                </div>
                <div>
                  <Label htmlFor="accountantName">Accountant Name (optional)</Label>
                  <Input id="accountantName" value={data.accountantName} onChange={(e) => setData({ ...data, accountantName: e.target.value })} />
                </div>
                <div>
                  <Label htmlFor="principalName">Principal/Head Name (optional)</Label>
                  <Input id="principalName" value={data.principalName} onChange={(e) => setData({ ...data, principalName: e.target.value })} />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <Button variant="hero" onClick={handlePrint}>Print / Save PDF</Button>
                <Button variant="outline" onClick={() => setData({
                  schoolName: "", logoUrl: "", address: "", month: "", employeeName: "", employeeId: "", designation: "", basicPay: 0, hra: 0, allowances: 0, deductions: 0, accountantName: "", principalName: ""
                })}>Reset</Button>
              </div>
            </CardContent>
          </Card>

          <div>
            <SalaryReceiptPreview ref={printRef} data={{ ...data, amountInWords }} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default SalaryReceipt;
