import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { listTeachers, saveTeacher, deleteTeacher, Teacher } from "@/lib/teachers";
import { useToast } from "@/components/ui/use-toast";

const Teachers: React.FC = () => {
  const { toast } = useToast();
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [form, setForm] = useState<Omit<Teacher, "id">>({ name: "", employeeId: "", designation: "", basicPay: 0, hra: 0, allowances: 0, deductions: 0 });

  useEffect(() => {
    setTeachers(listTeachers());
  }, []);

  const handleAdd = () => {
    if (!form.name) {
      toast({ title: "Name is required" });
      return;
    }
    const rec = saveTeacher(form);
    setTeachers(listTeachers());
    setForm({ name: "", employeeId: "", designation: "", basicPay: 0, hra: 0, allowances: 0, deductions: 0 });
    toast({ title: "Teacher saved", description: `${rec.name} added` });
  };

  const handleDelete = (id: string) => {
    deleteTeacher(id);
    setTeachers(listTeachers());
    toast({ title: "Deleted" });
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-accent/30">
      <Helmet>
        <title>Manage Teachers | Formal Forge</title>
        <meta name="description" content="Create and manage teacher profiles to quickly fill salary receipts." />
        <link rel="canonical" href="/teachers" />
      </Helmet>

      <div className="container py-8">
        <header className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Manage Teachers</h1>
          <p className="text-muted-foreground">Add teacher details once and reuse them while generating salary receipts.</p>
        </header>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Add Teacher</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>
                <div>
                  <Label htmlFor="employeeId">Employee ID</Label>
                  <Input id="employeeId" value={form.employeeId} onChange={(e) => setForm({ ...form, employeeId: e.target.value })} />
                </div>
                <div>
                  <Label htmlFor="designation">Designation</Label>
                  <Input id="designation" value={form.designation} onChange={(e) => setForm({ ...form, designation: e.target.value })} />
                </div>
                <div>
                  <Label htmlFor="basicPay">Basic Pay</Label>
                  <Input id="basicPay" type="number" value={form.basicPay ?? 0} onChange={(e) => setForm({ ...form, basicPay: Number(e.target.value || 0) })} />
                </div>
                <div>
                  <Label htmlFor="hra">HRA</Label>
                  <Input id="hra" type="number" value={form.hra ?? 0} onChange={(e) => setForm({ ...form, hra: Number(e.target.value || 0) })} />
                </div>
                <div>
                  <Label htmlFor="allowances">Allowances</Label>
                  <Input id="allowances" type="number" value={form.allowances ?? 0} onChange={(e) => setForm({ ...form, allowances: Number(e.target.value || 0) })} />
                </div>
                <div>
                  <Label htmlFor="deductions">Deductions</Label>
                  <Input id="deductions" type="number" value={form.deductions ?? 0} onChange={(e) => setForm({ ...form, deductions: Number(e.target.value || 0) })} />
                </div>
              </div>

              <div className="pt-2">
                <Button variant="hero" onClick={handleAdd}>Save</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Teachers</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Employee ID</TableHead>
                    <TableHead>Designation</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teachers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center text-muted-foreground">No teachers yet.</TableCell>
                    </TableRow>
                  ) : (
                    teachers.map((t) => (
                      <TableRow key={t.id}>
                        <TableCell>{t.name}</TableCell>
                        <TableCell>{t.employeeId}</TableCell>
                        <TableCell>{t.designation}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm" onClick={() => handleDelete(t.id)}>Delete</Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default Teachers;
