// MODAL ADD CLIENT

import {
  createClientsForm
} from "./createModalForm.js";
import {
  sendClientData
} from "./clientsAPI.js";
import {
  validateClientForm
} from "./validateForm.js";
import {
  validateClientContact
} from "./validateContact.js";
import {
  createClientItem
} from "./createClientItem.js";

export const addClientModal = () => {
  const createForm = createClientsForm();
  const modal = document.createElement("div");
  const modalContent = document.createElement("div");

  modal.classList.add("modal", "site-modal", "modal-active");
  modalContent.classList.add("modal__content", "site-modal__content", "modal-active");
  createForm.modalForm.classList.add("add-client");

  modal.append(modalContent);
  modalContent.append(createForm.modalCloseButton, createForm.modalHeading, createForm.modalForm);

  createForm.modalForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!validateClientForm()) {
      return;
    }

    const contactTypes = document.querySelectorAll(".contact__button-name");
    const contactValues = document.querySelectorAll(".contact__input");
    let contacts = [];
    let clientObject = {};

    for (let i = 0; i < contactTypes.length; i++) {
      if (!validateClientContact(contactTypes[i], contactValues[i])) {
        return;
      }
      contacts.push({
        type: contactTypes[i].innerHTML,
        value: contactValues[i].value,
      });
    }

    clientObject.name = createForm.inputName.value;
    clientObject.surname = createForm.inputSurname.value;
    clientObject.lastName = createForm.inputLastName.value;
    clientObject.contacts = contacts;

    const spinner = document.querySelector(".modal__spinner");

    try {
      spinner.style.display = "block";
      const data = await sendClientData(clientObject, "POST");
      document.querySelector(".clients__tbody").append(createClientItem(data));
      document.querySelector(".modal").remove();
    } catch (error) {
      console.log(error);
    } finally {
      spinner.style.display = "none";
    }
  });

  createForm.modalCloseButton.addEventListener("click", () => {
    modal.remove();
  });

  document.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.remove();
    }
  });

  createForm.cancelButton.addEventListener("click", () => {
    modal.remove();
  });

  return modal;
};