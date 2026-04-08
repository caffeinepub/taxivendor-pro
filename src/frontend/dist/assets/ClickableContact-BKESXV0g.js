import { f as createLucideIcon, j as jsxRuntimeExports, g as cn } from "./index-CPOLE32K.js";
import { P as Phone } from "./phone-CgErEwWO.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M7.9 20A9 9 0 1 0 4 16.1L2 22Z", key: "vv11sd" }]
];
const MessageCircle = createLucideIcon("message-circle", __iconNode);
function ClickableContact({
  mobile,
  whatsapp,
  name,
  className,
  compact = false
}) {
  const waNumber = (whatsapp ?? mobile).replace(/\D/g, "");
  const telNumber = mobile.replace(/\D/g, "");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("flex items-center gap-2 flex-wrap", className), children: [
    name && !compact && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground mr-1", children: [
      name,
      ":"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "a",
      {
        href: `tel:+91${telNumber}`,
        className: "flex items-center gap-1 px-2.5 py-1 rounded-sm bg-secondary/20 text-secondary border border-secondary/30 text-xs font-semibold hover:bg-secondary/30 transition-colors",
        "data-ocid": "contact-call-btn",
        "aria-label": `Call ${mobile}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-3 h-3" }),
          !compact && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: mobile }),
          compact && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Call" })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "a",
      {
        href: `https://wa.me/91${waNumber}`,
        target: "_blank",
        rel: "noopener noreferrer",
        className: "flex items-center gap-1 px-2.5 py-1 rounded-sm bg-accent/20 text-accent border border-accent/30 text-xs font-semibold hover:bg-accent/30 transition-colors",
        "data-ocid": "contact-whatsapp-btn",
        "aria-label": `WhatsApp ${whatsapp ?? mobile}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-3 h-3" }),
          !compact && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: whatsapp ?? mobile }),
          compact && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "WhatsApp" })
        ]
      }
    )
  ] });
}
export {
  ClickableContact as C
};
