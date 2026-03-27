# James Lane Assistant

A Firebase-hosted living-resume assistant that answers only from the approved source document:

- `C:\Users\angry\Downloads\James_Lane_BA_Resume_With_BI_Additions.pdf`

## Guarantees

- No web browsing or external search.
- Answers come only from resume excerpts stored in the local source corpus.
- If an answer is not explicitly supported, the assistant refuses with the required exact message.
- Each answer includes stable internal references such as `p1-tools-platforms`.

## Commands

```powershell
npm install
npm run test
npm run verify
npm run build
```

## Firebase

1. Copy `.firebaserc.example` to `.firebaserc`.
2. Replace the placeholder project ID with a new Firebase project.
3. Run `firebase deploy --only hosting`.
