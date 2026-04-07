# Design Brief

## Concept
Refined utility maximalism for taxi booking vendor platform. Professional, trustworthy, efficient. Strong form hierarchy with visual separation between vendor signup, approval, and admin oversight zones. Mobile-first CRUD interface.

## Color Palette

| Token              | OKLCH Value    | Purpose                          |
|--------------------|----------------|----------------------------------|
| Primary (Warm)     | 0.58 0.15 70   | Approvals, trusted actions       |
| Secondary (Cool)   | 0.55 0.08 260  | Secondary actions, data emphasis |
| Accent (Teal)      | 0.62 0.18 180  | Attention, status changes        |
| Success            | 0.65 0.16 140  | Positive feedback                |
| Destructive        | 0.55 0.22 25   | Rejections, critical actions     |
| Foreground         | 0.12 0.02 250  | Primary text (light mode)        |
| Background         | 0.98 0.01 250  | Page surface (light mode)        |
| Muted              | 0.88 0.02 250  | Secondary surfaces, disabled     |

## Typography
- **Display**: General Sans (bold, modern grotesque) — headers, badges, emphasis
- **Body**: DM Sans (neutral, accessible) — forms, content, labels
- **Mono**: Geist Mono (dense data) — IDs, references, documentation

## Structural Zones

| Zone      | Treatment                                      |
|-----------|------------------------------------------------|
| Header    | `bg-card border-b`, vendor/admin mode toggle   |
| Forms     | `form-card` class — bordered, subtle bg tint   |
| Uploads   | `upload-area` — dashed border, hover effect    |
| Data Rows | Alternating `table-row-alt` for scannability   |
| Approval  | Elevated card with clear accept/reject actions |
| Status    | Semantic badges (approved/pending/active/rejected) |

## Spacing & Rhythm
- Form field separation: consistent `mb-2`, `py-2` rhythm
- Card padding: 1rem (4 * scale)
- Mobile-first: 1rem gutters, 2rem max width on sm screens
- Dense data zones increase visual separation via row coloring

## Component Patterns
- **Form Fields**: Full-width input with semantic label + helper text
- **Upload Zones**: Dashed border + hover state, drag-drop ready
- **Approval Cards**: Document preview frame + action buttons (accept/reject)
- **Booking List**: Table with alternating rows, inline status badges, action buttons
- **Driver Details**: Mono font for ID/RC, clear field labels, contact links

## Motion
- Smooth transitions: `transition-smooth` (0.3s cubic-bezier) on interactive elements
- No animations on load; animations only on user interaction
- Approval state changes: quick fade-in of confirmation feedback

## Constraints
- No shadows except functional elevation (`shadow-xs` only)
- Border radii: mixed (`sm:`, `md:`, `lg:`) to signal importance hierarchy
- No gradients or decorative effects
- Maximum information density for mobile CRUD workflows

## Signature Detail
Upload document areas use explicit dashed frames with hover tint to signify "interactive boundary" — users immediately understand they can drag/click. Warm primary color on approval actions builds confidence in submission workflows.

