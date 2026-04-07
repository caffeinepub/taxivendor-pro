import { cn } from "@/lib/utils";
import { MessageCircle, Phone } from "lucide-react";

interface ClickableContactProps {
  mobile: string;
  whatsapp?: string;
  name?: string;
  className?: string;
  compact?: boolean;
}

export default function ClickableContact({
  mobile,
  whatsapp,
  name,
  className,
  compact = false,
}: ClickableContactProps) {
  const waNumber = (whatsapp ?? mobile).replace(/\D/g, "");
  const telNumber = mobile.replace(/\D/g, "");

  return (
    <div className={cn("flex items-center gap-2 flex-wrap", className)}>
      {name && !compact && (
        <span className="text-sm text-muted-foreground mr-1">{name}:</span>
      )}
      <a
        href={`tel:+91${telNumber}`}
        className="flex items-center gap-1 px-2.5 py-1 rounded-sm bg-secondary/20 text-secondary border border-secondary/30 text-xs font-semibold hover:bg-secondary/30 transition-colors"
        data-ocid="contact-call-btn"
        aria-label={`Call ${mobile}`}
      >
        <Phone className="w-3 h-3" />
        {!compact && <span>{mobile}</span>}
        {compact && <span>Call</span>}
      </a>
      <a
        href={`https://wa.me/91${waNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1 px-2.5 py-1 rounded-sm bg-accent/20 text-accent border border-accent/30 text-xs font-semibold hover:bg-accent/30 transition-colors"
        data-ocid="contact-whatsapp-btn"
        aria-label={`WhatsApp ${whatsapp ?? mobile}`}
      >
        <MessageCircle className="w-3 h-3" />
        {!compact && <span>{whatsapp ?? mobile}</span>}
        {compact && <span>WhatsApp</span>}
      </a>
    </div>
  );
}
