# 🏋️‍♀️ CrossFit Timer App  
A collection of functional training timers built with **Next.js** and **Material UI**, designed to support the most common timer formats used in CrossFit and functional fitness: **CAP**, **OTM**, **1:1**, **Round + Rest**, **AMRAP**, and **TABATA**.

Each timer includes its own logic and customizable parameters, offering a smooth and accurate training experience.

---

## 🚀 Technologies Used

- **Next.js 14 (App Router)**
- **React Hooks (useState, useEffect)**
- **Material UI (MUI)** for UI components and styling
- **URL Search Params** for dynamic configurations
- **Custom timer logic** for each workout format

---

## ⏱️ Available Timers

### 🟥 **CAP Timer**
Countdown from a predefined duration.  
Perfect for “**For Time**” workouts.

**Features:**
- Optional 10-second starter
- Clear countdown display
- Start / Pause / Reset controls

---

### 🟦 **OTM (On The Minute) Timer**
Executes a task every minute for a set number of rounds.

**Features:**
- Fully configurable minute duration
- Automatic round progression
- Countdown logic per round

---

### 🟧 **1:1 Timer**
Tracks work time and assigns **equal rest time** automatically.

**Flow:**
- WORK → athlete performs the round  
- REST → countdown based on the time spent working  
- Repeats until all rounds are complete  

---

### 🟩 **Round + Rest Timer**
Each round consists of:
- A fixed **work duration**
- A fixed **rest duration**

Both phases are countdown-based.

---

### 🟨 **AMRAP (As Many Rounds As Possible)**
A timer that counts up until a defined time cap.

**Features:**
- Built-in 10-second starter
- Ascending timer display
- Buttons to start, pause, and reset

---

### 🟪 **TABATA Timer**
A classic structure with:
- Fixed number of rounds
- Work duration
- Rest duration

**Features:**
- Automatic transitions between work/rest
- Countdown timers for both phases
- Round tracking

---

## 🧠 App Flow

1. The user inputs:
   - duration  
   - rounds  
   - work time  
   - rest time  
   - workout mode

2. The configuration is passed via URL query parameters.

3. Each timer page (`/cap`, `/otm`, `/amrap`, etc.) implements its own internal logic.

4. Many timers include:
   - a 10-second starter  
   - automatic round counting  
   - ascending or descending modes  
   - button locks while the starter runs  

## ✨ Future Improvements

- Sound and vibration alerts (3–2–1)
- Global dark mode
- Save custom workout presets
- Circular or bar progress indicators

## 🧪 Scripts

```bash
npm install
npm run dev
npm run build
npm start
