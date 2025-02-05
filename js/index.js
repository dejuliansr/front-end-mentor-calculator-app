document.addEventListener("DOMContentLoaded", () => {
  const display = document.getElementById("display");
  let currentInput = "0"; // Nilai saat ini yang ditampilkan
  let previousInput = ""; // Nilai sebelumnya
  let operator = null; // Operator yang dipilih
  let shouldResetInput = false; // Flag untuk mereset input setelah operator ditekan

  // Fungsi untuk memperbarui tampilan
  const updateDisplay = () => {
    display.innerText = currentInput;
  };

  // Fungsi untuk melakukan perhitungan
  const calculate = (a, operator, b) => {
    a = parseFloat(a);
    b = parseFloat(b);
    switch (operator) {
      case "+":
        return a + b;
      case "-":
        return a - b;
      case "x":
        return a * b;
      case "/":
        return a / b;
      default:
        return b;
    }
  };

  // Event listener untuk tombol
  document.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      const value = button.getAttribute("data-key");

      if (!value) return; 
      
      // Handle angka dan titik desimal
      if (!isNaN(value) || value === ".") {
        if (shouldResetInput || currentInput === "0") {
          currentInput = value;
          shouldResetInput = false;
        } else {
          currentInput += value;
        }
        updateDisplay();
      }
      // Handle tombol DEL
      else if (value === "DEL") {
        currentInput = currentInput.slice(0, -1) || "0";
        updateDisplay();
      }
      // Handle tombol RESET
      else if (value === "RESET") {
        currentInput = "0";
        previousInput = "";
        operator = null;
        shouldResetInput = false;
        updateDisplay();
      }
      // Handle tombol operator (+, -, x, /)
      else if (["+", "-", "x", "/"].includes(value)) {
        if (operator && !shouldResetInput) {
          // Lakukan perhitungan jika ada operator sebelumnya
          currentInput = calculate(previousInput, operator, currentInput).toString();
          updateDisplay();
        }
        previousInput = currentInput;
        operator = value;
        shouldResetInput = true;
      }
      // Handle tombol sama dengan (=)
      else if (value === "=") {
        if (operator && previousInput !== "") {
          currentInput = calculate(previousInput, operator, currentInput).toString();
          operator = null;
          previousInput = "";
          shouldResetInput = true;
          updateDisplay();
        }
      }
    });
  });

  // Set tampilan awal
  updateDisplay();
});