# 📊 Portfolio Dashboard – Case Study

This is a **full-stack portfolio dashboard** built using **Next.js** and **Node.js**.  
The application reads portfolio holdings from an **Excel file**, enriches them with **live financial data**, and displays real-time investment performance in a clean, responsive dashboard.

This project demonstrates real-world backend data handling, use of unofficial financial data sources, and stable real-time UI updates.

---

## ✨ Features

- Excel-based portfolio ingestion  
- Live market price (CMP) enrichment  
- Gain/Loss calculation with color indicators  
- Sector-wise portfolio summary  
- Auto-refresh every 15 seconds  
- Graceful handling of API failures  
- Backend caching for performance optimization  

---

## 🛠 Tech Stack

### Frontend
- Next.js (App Router)
- React Hooks
- Tailwind CSS
- TypeScript

### Backend
- Node.js
- Express.js
- Axios
- XLSX (Excel parsing)
- Node Cache (in-memory caching)

---

## 🧱 Data Flow & Architecture

### Excel Ingestion
- Portfolio data is read from an `.xlsx` file
- Section header rows (e.g. Financial Sector, Tech Sector) are ignored
- Only valid stock rows with:
  - Purchase Price
  - Quantity
  - Exchange Code  
  are processed

---

### Backend Data Enrichment
- **Investment**
- Live CMP fetched from Yahoo Finance (unofficial public endpoint)
- P/E Ratio and Earnings fetched from Google Finance (scraped)
- Exchange symbols normalized:
- `NSE → .NS`
- `BSE → .BO`

---

### Caching & Rate Limiting
- External API responses are cached
- Prevents repeated API calls
- Reduces rate-limit issues
- Improves backend performance

---

### Frontend Rendering
- Portfolio table with:
- Investment
- Present Value
- Gain/Loss (green/red)
- Portfolio weight
- Sector summary cards
- Auto-refresh indicator
- “Last updated” timestamp for transparency

---

## 🔄 Real-Time Update Strategy

The frontend uses polling every **15 seconds**:


### Why Polling?
- Financial data does not require millisecond precision
- Polling is simpler and more reliable than WebSockets
- Backend caching minimizes external API load

---

## ⚠️ Handling API Limitations

Yahoo Finance and Google Finance do not provide official public APIs.

As a result:
- Requests may occasionally fail or return empty responses
- CMP may appear as `—` in the UI during blocked responses

### Graceful Handling
- Cached values are returned when available
- Falls back to `null` without breaking the UI
- UI clearly displays the last successful update time

This behavior reflects real-world financial applications where data availability can vary.

---

## 🎨 UI Highlights

- Portfolio table with gain/loss color coding
- Sector summary cards
- Auto-refresh status
- Last updated timestamp for user trust

---

## 🚀 Getting Started

Follow the steps below to run the project locally.

###  Setup

```bash
cd backend
npm install
npm run dev

cd frontend
npm install
npm run dev

