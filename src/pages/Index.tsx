import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-accent/30">
      <Helmet>
        <title>Formal Forge | Appointment Letter & Salary Receipt Generator</title>
        <meta name="description" content="Create professional Appointment Letters and Salary Receipts. Print-ready A4 layouts. Save as PDF." />
        <link rel="canonical" href="/" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Formal Forge",
          "applicationCategory": "BusinessApplication",
          "description": "Appointment Letter and Salary Receipt generator",
        })}</script>
      </Helmet>

      <section className="container py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Formal Forge</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Generate polished, print-perfect documents for schools and organizations in seconds.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/appointment-letter">
            <Button variant="hero" size="lg">Appointment Letter</Button>
          </Link>
          <Link to="/salary-receipt">
            <Button variant="outline" size="lg">Salary Receipt</Button>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Index;
