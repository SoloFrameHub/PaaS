# Vertical Template

Source for `pnpm new-vertical <id>`. Copy this directory to `verticals/<id>/`
and replace placeholders:

- `__VERTICAL_ID__` — short slug (lowercase, hyphenated; matches `^[a-z][a-z0-9-]{1,30}$`).
- `__DISPLAY_NAME__` — human-readable name.

After copying:

1. Edit [`manifest.json`](./manifest.json) — pick modules, set roles + events.
2. Drop a logo at [`branding/logo.svg`](./branding/logo.svg) and favicon.
3. Add at least one prompt under `prompts/<task>/v1.md` and an `_active.txt`.
4. Run `pnpm manifest-cli validate verticals/<id>` to confirm Zod-clean.
5. Run `pnpm manifest-cli lock verticals/<id>` to write `manifest.lock`.
