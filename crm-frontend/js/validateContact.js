// VALIDATE CONTACT

export const validateClientContact = (contactType, contactValue) => {
  const writeValue = document.getElementById("writeName");
  const onlyNumbers = /[^0-9]+$/g;
  const onlyEmail = /[^a-zA-Z|@|.]+$/g;

  const ouInputValue = (input) => {
    input.addEventListener("input", () => {
      input.style.borderColor = "var(--gray-suit)";
      writeValue.textContent = "";
    });

    input.oncut =
      input.oncopy =
      input.onpaste =
        () => {
          input.style.borderColor = "var(--gray-suit)";
          for (const item of validateArray) {
            writeValue.textContent = "";
          }
        };
  };

  const showErrorMessage = (message, block, input) => {
    block.textContent = message;
    input.style.borderColor = "var(--burnt-sienna)";
  };
  ouInputValue(contactValue);

  if (!contactValue.value) {
    showErrorMessage("Заполните все поля контактов!", writeValue, contactValue);
    return false;
  }

  switch (contactType.innerHTML) {
    case "Телефон":
      if (onlyNumbers.test(contactValue.value)) {
        showErrorMessage("Допустимы только цифровые значения!", writeValue, contactValue);
        return false;
      } else if (contactValue.value.length != 11) {
        showErrorMessage("Номер должен состоять из одинадцати цифр!", writeValue, contactValue);
        return false;
      }
      return true;

    case "Email":
      if (onlyEmail.test(contactValue.value)) {
        showErrorMessage("Email указан в неверном формате!", writeValue, contactValue);
        return false;
      }
      return true;
      
    default:
      return true;
  }
};
