# Governance

HXP follows a simple, transparent governance model designed to keep the protocol stable, small, and broadly useful.

## Roles

### Maintainers

- Review issues and pull requests.
- Approve or reject spec changes.
- Manage releases and version bumps.

### Contributors

- Anyone who opens issues, submits PRs, or participates in discussions.

## Decision Process

- **Rough consensus** among maintainers, documented in the PR or issue.
- No single maintainer has veto power; disagreements are resolved through discussion.

## Versioning Rules

| Change type                        | Version bump |
|------------------------------------|--------------|
| Additive optional fields           | MINOR        |
| New recommended intents/actions    | MINOR        |
| Changes to REQUIRED fields         | **MAJOR**    |
| Removal or rename of existing fields | **MAJOR**  |
| Bug fixes in schema/docs          | PATCH        |

## Extensions

- Extensions do **not** change the core spec.
- Extensions **MUST** be namespaced (see SPEC.md § 7.10).
- Vendor extensions use the `vendor.` prefix.

## Amendments

This governance document may be updated via the standard PR process with maintainer consensus.
