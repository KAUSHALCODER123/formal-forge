import React, { useMemo, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useReactToPrint } from "react-to-print";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import LetterPreview, { AppointmentLetterData } from "@/components/documents/LetterPreview";

const today = () => format(new Date(), "yyyy-MM-dd");

const AppointmentLetter: React.FC = () => {
  const [data, setData] = useState<AppointmentLetterData>({
    date: today(),
    recipientName: "",
    designation: "",
    employeeId: "",
    reportingDate: today(),
    terms: "",
    principalName: "",
  });

  const printRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: `${data.recipientName || "Appointment"}-Letter`,
  });

  const pageTitle = "Appointment Letter Generator | Formal Forge";

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-accent/30">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content="Create a professional appointment letter with header, body, and signatures. Print or save as PDF." />
        <link rel="canonical" href="/appointment-letter" />
      </Helmet>

      <div className="container py-8">
        <header className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Appointment Letter</h1>
          <p className="text-muted-foreground">Fill the form and preview your print-ready document.</p>
        </header>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="print-hide">
            <CardHeader>
              <CardTitle>Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" type="date" value={data.date} onChange={(e) => setData({ ...data, date: e.target.value })} />
                </div>
                <div>
                  <Label htmlFor="employeeId">Employee ID (optional)</Label>
                  <Input id="employeeId" value={data.employeeId} onChange={(e) => setData({ ...data, employeeId: e.target.value })} />
                </div>
                <div>
                  <Label htmlFor="recipientName">Recipient Name</Label>
                  <Input id="recipientName" value={data.recipientName} onChange={(e) => setData({ ...data, recipientName: e.target.value })} />
                </div>
                <div>
                  <Label htmlFor="designation">Designation</Label>
                  <Input id="designation" value={data.designation} onChange={(e) => setData({ ...data, designation: e.target.value })} />
                </div>
                <div>
                  <Label htmlFor="reportingDate">Reporting Date</Label>
                  <Input id="reportingDate" type="date" value={data.reportingDate} onChange={(e) => setData({ ...data, reportingDate: e.target.value })} />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="terms">Terms & Notes (optional)</Label>
                  <Textarea id="terms" rows={5} value={data.terms} onChange={(e) => setData({ ...data, terms: e.target.value })} />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="principalName">Principal/Head Name (optional)</Label>
                  <Input id="principalName" value={data.principalName} onChange={(e) => setData({ ...data, principalName: e.target.value })} />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <Button variant="hero" onClick={handlePrint}>Print / Save PDF</Button>
                <Button variant="outline" onClick={() => setData({
                  date: today(), recipientName: "", designation: "", employeeId: "", reportingDate: today(), terms: "", principalName: ""
                })}>Reset</Button>
              </div>
            </CardContent>
          </Card>

          <div>
            <LetterPreview ref={printRef} data={data} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default AppointmentLetter;
