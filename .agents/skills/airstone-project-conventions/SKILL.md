---
name: airstone-project-conventions
description: Apply Airstone repository structure and reuse conventions whenever creating, editing, refactoring, or reviewing application code in this project.
---

# Airstone Project Conventions

Follow the existing project architecture and keep route, screen, shared component, state, enum, and form concerns separated.

## Structure

- Keep files in `src/pages` thin. A page should import and render its screen component.
- Put feature-specific UI in `src/components/screen/<feature>`.
- Put reusable application components in `src/components/common/<domain>`.
- Keep untouched Shadcn primitives in `src/components/ui`; UI-specific rules are defined in the `airstone-ui-design` skill.
- Put Redux setup and slices in `src/store`. Use the `@redux` alias for imports from this directory.
- Put shared enums in `src/enum`.
- Prefer an existing path alias over a long relative import:
  - `@commonComponent` for `src/components/common`
  - `@screenComponent` for `src/components/screen`
  - `@shadcnComponent` for `src/components/ui`
  - `@redux` for `src/store`
  - `@page` for `src/pages`
  - `@lib` for `src/lib`

## Forms

- Use the shared controls in `src/components/common/form` instead of duplicating input or dropdown markup.
- Use Formik for form state and Yup for validation when working in an existing Formik form.
- Keep feature form fields, initial values, validation limits, validation messages, and Yup schema in focused files when those concerns already use that split.
- Do not store passwords or other secrets in Redux state.

## Change Discipline

- Reuse existing components and conventions before adding a new abstraction.
- Keep feature-only logic within its feature folder; promote it to `common` only when it is reusable.
- Preserve unrelated user changes in the working tree.
- Run the production build after implementation and report any pre-existing validation failure separately from new failures.
