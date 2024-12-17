// Variables necesarias
let currentNumber = ""; // Número que se está escribiendo
let previousNumber = ""; // Número almacenado para operar
let operator = ""; // Operador seleccionado
let operationInProgress = false; // Para manejar operaciones encadenadas

// Elementos del DOM
const resultDisplay = document.querySelector(".main__results");
const buttons = document.querySelectorAll("button");

// Inicializar el resultado
resultDisplay.textContent = "0";

// Agregar evento a cada botón
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.textContent; // Captura el valor del botón presionado

    if (!isNaN(value) || value === ".") {
      // Si el botón es un número o un punto decimal
      handleNumber(value);
    } else if (value === "AC") {
      // Si el botón es "AC" (limpiar todo)
      clearCalculator();
    } else if (value === "CS") {
      // Si el botón es "CE" (borrar último número)
      clearLastEntry();
    } else if (value === "=") {
      // Si el botón es "=" (realizar cálculo)
      calculateResult();
    } else {
      // Si es un operador (+, -, *, /)
      handleOperator(value);
    }
  });
});

// Manejar los números
function handleNumber(value) {
  // Evitar múltiples puntos decimales
  if (value === "." && currentNumber.includes(".")) return;

  // Si se está realizando una operación, reiniciar el número actual
  if (operationInProgress) {
    currentNumber = value;
    operationInProgress = false;
  } else {
    currentNumber += value;
  }

  resultDisplay.textContent = currentNumber;
}

// Manejar los operadores
function handleOperator(value) {
  if (currentNumber === "") return; // No permitir operador sin un número actual

  if (previousNumber !== "") {
    // Si ya hay un número anterior, calcular el resultado parcial
    calculateResult();
  }

  // Guardar el número actual y el operador
  previousNumber = currentNumber;
  operator = value;
  currentNumber = ""; // Preparar para el siguiente número
}

// Calcular el resultado teniendo en cuenta la precedencia de operaciones
function calculateResult() {
  // Verificar si hay un número anterior y un operador
  if (previousNumber === "" || currentNumber === "" || operator === "") return;

  let result;
  const prev = parseFloat(previousNumber);
  const current = parseFloat(currentNumber);

  // Realizar la operación según el operador
  switch (operator) {
    case "+":
      result = prev + current;
      break;
    case "-":
      result = prev - current;
      break;
    case "X":
      result = prev * current;
      break;
    case "/":
      if (current === 0) {
        result = "Error"; // Dividir por cero no es permitido
      } else {
        result = prev / current;
      }
      break;
    default:
      return;
  }

  // Mostrar el resultado y preparar para la siguiente operación
  resultDisplay.textContent = result;
  previousNumber = result.toString();
  currentNumber = "";
  operator = "";
  operationInProgress = true; // Para encadenar operaciones
}

// Limpiar todo (AC)
function clearCalculator() {
  currentNumber = "";
  previousNumber = "";
  operator = "";
  resultDisplay.textContent = "0"; // Resetear la pantalla a "0"
}

// Borrar el último número (CE)
function clearLastEntry() {
  currentNumber = currentNumber.slice(0, -1); // Eliminar el último carácter
  if (currentNumber === "") {
    resultDisplay.textContent = "0"; // Si no hay más números, mostrar 0
  } else {
    resultDisplay.textContent = currentNumber; // Mostrar el número actualizado
  }
}
