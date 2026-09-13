---
name: airstone-ui-design
description: Create or modify Airstone UI, layouts, styles, forms, and reusable components while preserving the project's Shadcn primitives and visual system.
---

# Airstone UI Design

Build accessible, responsive UI that stays consistent with the existing Airstone visual language and component architecture.

## Shadcn Invariant

The `src/components/ui` folder is reserved exclusively for Shadcn UI primitive files. Never create or store project-specific components, feature code, business logic, helpers, hooks, constants, or other application files in this folder.

Never modify existing component code under `src/components/ui`. The only permitted addition is a missing Shadcn primitive added in its original, uncustomized form.

When an enhancement, new behavior, or project-specific appearance is needed from a Shadcn component:

1. Import the unchanged Shadcn primitive from `@shadcnComponent`.
2. Create a composed or wrapped component in a suitable folder under `src/components/common`.
3. Implement the enhancement in that common component.
4. Use the common component throughout project screens and forms.

If a required Shadcn primitive is not present, add the primitive as a new file under `src/components/ui`, keep that generated primitive uncustomized, and implement project-specific behavior in `src/components/common`.

## Project UI Conventions

- Reuse `Button`, `FormInput`, `FormDropdown`, and other existing shared components before creating alternatives.
- Put reusable form controls in `src/components/common/form`.
- Put feature-only composition in `src/components/screen/<feature>`.
- Use the existing Tailwind theme tokens and established Airstone colors, typography, spacing, radii, and responsive breakpoints.
- Preserve semantic labels, keyboard operation, focus states, error associations, and appropriate ARIA attributes.
- Keep mobile and desktop behavior intentional; verify responsive layouts when a change affects structure or navigation.

## Verification

- Confirm new UI code imports shared or Shadcn components through the configured aliases.
- Confirm no existing file under `src/components/ui` was edited.
- Run the production build after UI changes.
