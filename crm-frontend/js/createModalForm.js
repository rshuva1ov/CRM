// MODAL FORM CREATE
import { svgContactDefault } from "./svg.js";
import { svgContactHover } from "./svg.js";
import { createContactItem } from "./createContact.js";

export const createClientsForm = () => {
  const modalHeading = document.createElement("h2");
  const modalCloseButton = document.createElement("button");
  const modalForm = document.createElement("form");
  const inputName = document.createElement("input");
  const requiaredName = document.createElement("span");
  const labelName = document.createElement("label");
  const inputSurname = document.createElement("input");
  const requiaredSurname = document.createElement("span");
  const labelSurname = document.createElement("label");
  const inputLastName = document.createElement("input");
  const labelLastName = document.createElement("label");
  const addContactButton = document.createElement("button");
  const contactButtonDefault = document.createElement("span");
  const contactButtonHover = document.createElement("span");
  const saveButton = document.createElement("button");
  const cancelButton = document.createElement("button");
  const contactsBlock = document.createElement("div");
  const contactsBox = document.createElement("div");
  const formFloatingName = document.createElement("div");
  const formFloatingSurname = document.createElement("div");
  const formFloatingLastName = document.createElement("div");
  const saveSpinner = document.createElement("span");

  // validate
  const errorBlock = document.createElement("p");
  const unacceptableLetter = document.createElement("span");
  const writeName = document.createElement("span");
  const writeSurname = document.createElement("span");
  const writeLastName = document.createElement("span");
  const reqiredValue = document.createElement("span");
  const requiredContacts = document.createElement("span");

  errorBlock.classList.add("modal__error");
  unacceptableLetter.id = "unacceptableLetter";
  writeName.id = "writeName";
  writeSurname.id = "writeSurname";
  writeLastName.id = "writeLastName";
  reqiredValue.id = "reqiredValue";
  requiredContacts.id = "requiredContacts";

  saveSpinner.classList.add("modal__spinner");
  modalHeading.classList.add("modal__heading");
  modalCloseButton.classList.add("modal__close");
  modalForm.classList.add("modal__form");
  formFloatingName.classList.add("form-floating");
  formFloatingSurname.classList.add("form-floating");
  formFloatingLastName.classList.add("form-floating");
  inputName.classList.add("modal__input");
  inputSurname.classList.add("modal__input");
  inputLastName.classList.add("modal__input");
  labelName.classList.add("modal__label");
  labelSurname.classList.add("modal__label");
  labelLastName.classList.add("modal__label");
  requiaredName.classList.add("modal__label");
  requiaredSurname.classList.add("modal__label");
  addContactButton.classList.add("modal__button-contact", "modal__button-contact--active");
  saveButton.classList.add("modal__button-save", "site-button");
  cancelButton.classList.add("modal__button-cancel");
  contactButtonDefault.classList.add("contact__svg", "contact__svg-default", "contact__svg-active");
  contactButtonHover.classList.add("contact__svg", "contact__svg-hover");
  contactsBlock.classList.add("modal__contact");
  contactsBox.classList.add("modal__contact-box");

  inputName.for = "formFloatingName";
  inputSurname.for = "formFloatingSurname";
  inputLastName.for = "formFloatingLastName";
  inputName.id = "formFloatingName";
  inputSurname.id = "formFloatingSurname";
  inputLastName.id = "formFloatingLastName";
  inputName.type = "text";
  inputSurname.type = "text";
  inputLastName.type = "text";
  inputName.placeholder = "Имя";
  inputSurname.placeholder = "Фамилия";
  inputLastName.placeholder = "Отчество";

  modalHeading.textContent = "Новый клиент";
  labelName.textContent = "Имя";
  labelSurname.textContent = "Фамилия";
  labelLastName.textContent = "Отчество";
  addContactButton.textContent = "Добавить контакт";
  saveButton.textContent = "Сохранить";
  cancelButton.textContent = "Отмена";
  requiaredName.textContent = "*";
  requiaredSurname.textContent = "*";
  contactButtonDefault.innerHTML = svgContactDefault;
  contactButtonHover.innerHTML = svgContactHover;

  labelName.append(requiaredName);
  saveButton.append(saveSpinner);
  labelSurname.append(requiaredSurname);
  formFloatingName.append(inputName, labelName);
  formFloatingSurname.append(inputSurname, labelSurname);
  formFloatingLastName.append(inputLastName, labelLastName);
  contactsBlock.append(contactsBox, addContactButton);
  errorBlock.append(writeName, writeSurname, writeLastName, reqiredValue, unacceptableLetter, requiredContacts);
  modalForm.append(formFloatingSurname, formFloatingName, formFloatingLastName, contactsBlock, errorBlock, saveButton, cancelButton);
  addContactButton.append(contactButtonDefault, contactButtonHover);

  // Реализация ховера
  addContactButton.addEventListener("mousemove", () => {
    contactButtonDefault.classList.remove("contact__svg-active");
    contactButtonHover.classList.add("contact__svg-active");
  });

  addContactButton.addEventListener("mouseleave", () => {
    contactButtonDefault.classList.add("contact__svg-active");
    contactButtonHover.classList.remove("contact__svg-active");
  });

  // Кнопка в зависимости от кол-ва
  addContactButton.addEventListener("click", (e) => {
    e.preventDefault();

    const namberOfContacts = 9; //-1
    const contactsItems = document.getElementsByClassName("contact");

    if (contactsItems.length < namberOfContacts) {
      const contactItem = createContactItem();
      contactsBox.prepend(contactItem.contact);
      contactsBlock.style.backgroundColor = "var(--athens-gray)";
      if (contactsItems.length > 5) {
        document.querySelector(".site-modal__content").style.top = "70%";
      } else {
        document.querySelector(".site-modal__content").style.top = "50%";
      }
    } else {
      const contactItem = createContactItem();
      contactsBox.prepend(contactItem.contact);
      addContactButton.classList.remove("modal__button-contact--active");
    }
  });

  return {
    modalForm,
    modalCloseButton,
    modalHeading,
    cancelButton,
    inputName,
    inputSurname,
    inputLastName,
    labelName,
    labelSurname,
    labelLastName,
    contactsBlock,
    contactsBox,
    addContactButton,
  };
};
