import React, { useEffect, useMemo, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useReactToPrint } from "react-to-print";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import SalaryReceiptPreview, { SalaryReceiptData } from "@/components/documents/SalaryReceiptPreview";
import { ToWords } from "to-words";
import { Link } from "react-router-dom";
import { listTeachers, getTeacher, Teacher } from "@/lib/teachers";

const toWords = new ToWords({ localeCode: "en-IN" });

const SalaryReceipt: React.FC = () => {
  const [data, setData] = useState<Omit<SalaryReceiptData, "amountInWords">>({
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

  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [selectedTeacherId, setSelectedTeacherId] = useState<string>("");

  useEffect(() => {
    setTeachers(listTeachers());
  }, []);

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

  const pageTitle = "Salary Receipt Generator | Formal Forge";

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
                <div className="sm:col-span-2">
                  <Label>Teacher</Label>
                  <div className="flex gap-3 mt-1">
                    <Select value={selectedTeacherId} onValueChange={(val) => {
                      setSelectedTeacherId(val);
                      const t = getTeacher(val);
                      if (t) {
                        setData((d) => ({
                          ...d,
                          employeeName: t.name,
                          employeeId: t.employeeId || "",
                          designation: t.designation || "",
                          basicPay: t.basicPay ?? d.basicPay,
                          hra: t.hra ?? d.hra,
                          allowances: t.allowances ?? d.allowances,
                          deductions: t.deductions ?? d.deductions,
                        }));
                      }
                    }}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a teacher" />
                      </SelectTrigger>
                      <SelectContent>
                        {teachers.map((t) => (
                          <SelectItem key={t.id} value={t.id}>{t.name}{t.employeeId ? ` (${t.employeeId})` : ""}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Link to="/teachers">
                      <Button variant="outline">Manage</Button>
                    </Link>
                    <Button variant="outline" onClick={() => setTeachers(listTeachers())}>Refresh</Button>
                  </div>
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
                  month: "", employeeName: "", employeeId: "", designation: "", basicPay: 0, hra: 0, allowances: 0, deductions: 0, accountantName: "", principalName: ""
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
