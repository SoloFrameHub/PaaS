For Instantly, you don’t need a special “hyperpersonalization” format—just a well-structured CSV with clear column headers that you then map to variables on upload. [help.instantly](https://help.instantly.ai/en/articles/6254215-how-to-import-leads-via-csv)

### Minimum required

- **Email** – One column with valid email addresses; this is the only mandatory field and must be mapped to the predefined **Email** variable during upload. [help.instantly](https://help.instantly.ai/en/articles/6135930-how-to-add-variables)
- Header row present – First row must contain column names (no data), each under 20 characters, unique, and starting with a capital letter (e.g., `Email`, `FirstName`, `Company`, `Line1`). [help.instantly](https://help.instantly.ai/en/articles/6254215-how-to-import-leads-via-csv)

### Typical hyperpersonalized setup

In your CSV, use something like:

- `Email` – recipient’s email. [help.instantly](https://help.instantly.ai/en/articles/6254215-how-to-import-leads-via-csv)
- `FirstName` – first name for greeting (map to predefined **First name**). [help.instantly](https://help.instantly.ai/en/articles/6451970-quick-start-guide-all-in-one)
- `Company` – company (map to **Company name**). [help.instantly](https://help.instantly.ai/en/articles/6135930-how-to-add-variables)
- `Personalization` – your fully written custom opener line (or name it `Line1`, `Icebreaker`, etc. and map it as **Personalization** or a **Custom variable** on upload). [instantly](https://instantly.ai/blog/merge-tags/)
- Any extra fields used in copy (e.g., `Role`, `Industry`, `TriggerEvent`, `LastPost`, `PainPoint`) – map each as a **Custom variable** so you can use them as `{{Role}}`, `{{Industry}}`, etc. in the email body. [instantly](https://instantly.ai/blog/merge-tags/)

### Instantly side (how it connects)

- During upload, Instantly auto-detects columns and lets you map each one as **Predefined**, **Custom variable**, **Personalization**, or **Do Not Import**; just ensure your hyperpersonalized line column is mapped, not skipped. [help.instantly](https://help.instantly.ai/en/articles/6451970-quick-start-guide-all-in-one)
- In your templates, reference the fields with merge tags such as:  
  `Hi {{First name | there }}`  
  `{{Personalization}}`  
  or any custom tag like `{{Industry}}` or `{{TriggerEvent}}`. [instantly](https://instantly.ai/blog/merge-tags/)

If you tell me which specific hyperpersonalized fields you’re generating (e.g., first line only vs. multi-sentence research), I can give you an exact header set and a sample row.