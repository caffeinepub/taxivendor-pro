import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Car, CheckCircle, MapPin, Shield, Zap } from "lucide-react";

const FEATURES = [
  {
    icon: MapPin,
    title: "Smart City Search",
    desc: "Pickup & drop with instant city suggestions across India",
  },
  {
    icon: Shield,
    title: "Verified Vendors",
    desc: "Admin-approved vendors with documents on file",
  },
  {
    icon: Zap,
    title: "Real-time Bookings",
    desc: "One Way, Round Trip & Local — manage everything in one place",
  },
];

const STEPS = [
  {
    step: "01",
    title: "Register",
    desc: "Submit your company details and documents",
  },
  {
    step: "02",
    title: "Get Approved",
    desc: "Admin reviews and activates your account",
  },
  {
    step: "03",
    title: "Post Bookings",
    desc: "Add trips with driver earnings and commission",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center px-5 py-16 text-center bg-gradient-to-b from-card to-background">
        {/* Logo mark */}
        <div className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center shadow-lg mb-6">
          <Car className="w-10 h-10 text-primary-foreground" />
        </div>

        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary bg-primary/10 border border-primary/20 rounded-full px-3 py-1 mb-4">
          <CheckCircle className="w-3.5 h-3.5" />
          Trusted by 500+ vendors across India
        </span>

        <h1 className="font-display font-bold text-4xl sm:text-5xl text-foreground leading-tight tracking-tight mb-4">
          Manage your taxi bookings{" "}
          <span className="text-primary">with ease</span>
        </h1>

        <p className="text-base text-muted-foreground max-w-sm mb-8 leading-relaxed">
          KabGo helps cab vendors post trips, track earnings, and manage driver
          assignments — all from your phone.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-xs">
          <Link to="/signup" className="w-full">
            <Button
              className="btn-primary w-full h-12 text-base font-bold"
              data-ocid="home-signup-btn"
            >
              Get Started Free
            </Button>
          </Link>
          <Link to="/login" className="w-full">
            <Button
              variant="outline"
              className="w-full h-12 text-base font-semibold border-border"
              data-ocid="home-login-btn"
            >
              Sign In
            </Button>
          </Link>
        </div>

        <p className="mt-4 text-xs text-muted-foreground">
          Already registered?{" "}
          <Link
            to="/login"
            className="text-primary font-medium hover:underline"
          >
            Login here
          </Link>
        </p>
      </section>

      {/* Features */}
      <section className="bg-muted/30 border-t border-border px-5 py-12">
        <h2 className="font-display font-bold text-xl text-foreground text-center mb-8">
          Everything you need to run your fleet
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="form-card flex flex-col items-start gap-3"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-display font-semibold text-foreground text-sm">
                  {title}
                </p>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-background border-t border-border px-5 py-12">
        <h2 className="font-display font-bold text-xl text-foreground text-center mb-8">
          How it works
        </h2>
        <div className="flex flex-col sm:flex-row items-start gap-6 max-w-2xl mx-auto">
          {STEPS.map(({ step, title, desc }) => (
            <div key={step} className="flex items-start gap-4 flex-1">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-primary-foreground">
                  {step}
                </span>
              </div>
              <div>
                <p className="font-display font-semibold text-foreground text-sm">
                  {title}
                </p>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA banner */}
      <section className="bg-primary px-5 py-10 text-center">
        <h2 className="font-display font-bold text-xl text-primary-foreground mb-2">
          Ready to grow your cab business?
        </h2>
        <p className="text-sm text-primary-foreground/80 mb-6">
          Join hundreds of vendors managing bookings on KabGo
        </p>
        <Link to="/signup">
          <Button
            variant="outline"
            className="bg-primary-foreground text-primary border-primary-foreground font-bold h-11 px-8 hover:bg-primary-foreground/90"
            data-ocid="home-cta-signup-btn"
          >
            Create Vendor Account
          </Button>
        </Link>
      </section>
    </div>
  );
}
