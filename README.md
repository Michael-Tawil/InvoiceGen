# InvoiceGen

A modern React application for generating professional invoices with dynamic line items and automated PDF downloads.

## Technologies
- React 18
- Tailwind CSS
- jsPDF & html2canvas

## Design Decisions

**Single-Page Layout**
Chose scrollable single-page form over multi-step wizard to allow users to see their complete invoice while adding line items, reducing navigation complexity.

**Dynamic Rows Implementation**
Used React state array manipulation for invoice line items:
- Add: Spread existing array with new empty object
- Update: Map over array, replacing item at specific index
- Remove: Filter array excluding specified index

Stored quantity and price in UI, calculated amount on API submission to match both UI requirements (quantity + price) and API specification (amount field).

**API Integration**
Transforms HTML5 date format to API format (slashes instead of dashes). API returns HTML invoice which is converted to PDF client-side using html2canvas and jsPDF.

## Screenshot
<img width="815" height="1263" alt="Screenshot From 2025-10-04 13-47-36" src="https://github.com/user-attachments/assets/1708bd1f-b769-41c3-80a1-a887d2af6585" />
<img width="815" height="263" alt="Screenshot From 2025-10-04 13-48-07" src="https://github.com/user-attachments/assets/a80a6113-a73b-4424-b836-6ad2a7832c52" />
<img width="1121" height="710" alt="Screenshot From 2025-10-04 13-52-16" src="https://github.com/user-attachments/assets/dd4ecd82-bd7a-4695-9035-833f8ce864fb" />


**Author:** Michael Tawil  
**Created:** October 2025
