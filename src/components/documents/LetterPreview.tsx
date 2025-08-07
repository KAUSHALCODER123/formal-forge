import React, { forwardRef } from "react";

export interface AppointmentLetterData {
  schoolName: string;
  logoUrl?: string;
  address?: string;
  contact?: string;
  date: string;
  recipientName: string;
  designation: string;
  employeeId?: string;
  reportingDate?: string;
  terms?: string;
  principalName?: string;
}

const LetterPreview = forwardRef<HTMLDivElement, { data: AppointmentLetterData }>(
  ({ data }, ref) => {
    const {
      schoolName,
      logoUrl,
      address,
      contact,
      date,
      recipientName,
      designation,
      employeeId,
      reportingDate,
      terms,
      principalName,
    } = data;

    return (
      <article ref={ref as any} className="a4 font-serifDoc">
        <header className="mb-6 flex items-center gap-4">
          {logoUrl ? (
            <img
              src={logoUrl}
              alt={`${schoolName} logo`}
              className="h-16 w-16 object-contain"
              onError={(e) => ((e.currentTarget.style.display = "none"))}
              loading="lazy"
            />
          ) : null}
          <div className="flex-1">
            <h1 className="text-xl font-bold tracking-tight">{schoolName || "School / Organization"}</h1>
            {(address || contact) && (
              <p className="text-sm text-muted-foreground">
                {[address, contact].filter(Boolean).join(" • ")}
              </p>
            )}
          </div>
        </header>

        <div className="text-center mb-6">
          <h2 className="text-lg font-bold uppercase tracking-wide">Appointment Letter</h2>
        </div>

        <section className="space-y-1 text-sm leading-7">
          <p><span className="font-semibold">Date:</span> {date}</p>
          {employeeId && (
            <p><span className="font-semibold">Employee ID:</span> {employeeId}</p>
          )}
          <p><span className="font-semibold">To,</span></p>
          <p className="font-semibold">{recipientName || "Recipient Name"}</p>
          <p className="italic">{designation || "Designation"}</p>
        </section>

        <section className="mt-6 space-y-4 text-[0.97rem] leading-7">
          <p>
            We are pleased to inform you that you have been appointed as
            <span className="font-semibold"> {designation || "[Designation]"}</span>
            {schoolName ? ` at ${schoolName}` : ""}. Your appointment is confirmed with effect from
            {" "}
            <span className="font-semibold">{reportingDate || "[Reporting Date]"}</span>.
          </p>
          <p>
            You are required to report to the Head of Institution/Principal on the reporting date. Kindly bring all necessary documents for verification.
          </p>
          {terms && (
            <div>
              <p className="font-semibold">Terms and Conditions:</p>
              <p className="whitespace-pre-wrap">{terms}</p>
            </div>
          )}
          <p>
            We welcome you and look forward to your valuable contribution to the institution.
          </p>
        </section>

        <section className="mt-10 grid grid-cols-2 gap-6">
          <div>
            <p className="font-semibold">Sincerely,</p>
            <p className="mt-12 font-semibold">{principalName || "Principal / Head"}</p>
            <p className="text-sm text-muted-foreground">Principal / Head of Institution</p>
          </div>
          <div className="text-right">
            <p className="font-semibold">Signature</p>
            <div className="mt-12 inline-block min-w-[10rem] border-t border-border" />
          </div>
        </section>

        {(address || contact) && (
          <footer className="mt-12 pt-4 border-t border-border text-center text-xs text-muted-foreground">
            <p>
              {address}
              {address && contact ? " • " : ""}
              {contact}
            </p>
          </footer>
        )}
      </article>
    );
  }
);

LetterPreview.displayName = "LetterPreview";
export default LetterPreview;
