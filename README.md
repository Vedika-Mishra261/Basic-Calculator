<<<<<<< HEAD
# Basic Calculator

A simple, clean, and responsive calculator web application.

The project uses only HTML, CSS, and JavaScript. It performs basic arithmetic operations without any libraries, frameworks, or `eval()`.

## Features

- Addition, subtraction, multiplication, and division
- Decimal number calculations
- Clear (`C`) button to reset the calculator
- Equals (`=`) button to calculate the result
- Prevents more than one decimal point in a single number
- Friendly error message for division by zero
- Handles chained operations, for example `8 + 2 × 3`
- Limits input to 12 digits and formats results to avoid floating-point rounding errors
- Responsive layout for desktop, tablet, and mobile screens
- Hover, active, and keyboard focus effects on buttons
- Optional keyboard support:
  - Digits `0-9` for numbers
  - `.` for decimal point
  - `+`, `-`, `*`, `/` for operators
  - `Enter` or `=` for equals
  - `Escape` or `C` for clear

## Technologies Used

- **HTML5** - page structure
- **CSS3** - styling, CSS Grid layout, and responsive design
- **JavaScript** - state handling, calculations, and DOM manipulation

## Project Files

```text
Basic Calculator/
├── index.html   # Calculator structure
├── style.css    # Styling and responsive layout
├── script.js    # Calculator logic and event handling
└── README.md    # Project documentation
```

## How to Run

1. Keep all four files in the same folder.
2. Open `index.html` in any modern web browser.

That is all. No installation or build step is required.

### Optional: Run with a local server

If you prefer to serve the project locally, run this command from the project folder:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

## How It Works

The JavaScript keeps track of the current number, the previous number, and the selected operator. Button clicks are handled with one shared event listener. Calculations are performed with a `switch` statement instead of `eval()`, and the display is updated through DOM manipulation after every action.
=======
# Basic-Calculator
>>>>>>> 581e631eb219f3265bbcddc0e3903f2243731fb2
