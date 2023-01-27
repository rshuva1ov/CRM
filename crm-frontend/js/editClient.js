// EDIT CLIENT

import {
  sendClientData
} from "./clientsAPI.js";
import {
  createClientItem
} from "./createClientItem.js";
import {
  createContactItem
} from "./createContact.js";
import {
  deleteClientModal
} from "./createDeleteModal.js";
import {
  createClientsForm
} from "./createModalForm.js";
import {
  validateClientContact
} from "./validateContact.js";
import {
  validateClientForm
} from "./validateForm.js";

export const editClientModal = (data) => {
  const editModal = document.createElement("div");
  const editModalContent = document.createElement("div");
  const createForm = createClientsForm();
  const editModalId = document.createElement("span");

  editModal.classList.add("modal-edit", "site-modal", "modal-active");
  editModalContent.classList.add("edit-modal__content", "site-modal__content", "modal-active");
  editModalId.classList.add("edit-modal__id");

  createForm.modalHeading.textContent = "Изменить данные";
  createForm.cancelButton.textContent = "Удалить клиента";
  editModalId.textContent = "ID: " + data._id.substr(0, 6);

  //удаление через модалку изменить
  createForm.cancelButton.addEventListener("click", (e) => {
    e.preventDefault();

    const deleteModal = deleteClientModal();
    document.body.append(deleteModal.deleteModal);

    import("./clientsAPI.js").then(({
      deleteClientItem
    }) => {
      deleteModal.deleteModalDelete.addEventListener("click", () => {
        try {
          deleteModal.deleteSpinner.style.display = "block";
          setTimeout(() => {
            deleteClientItem(data._id);
            document.getElementById(data._id).remove();
            deleteModal.deleteModal.remove();
            document.querySelector(".modal-edit").remove();
          }, 1300);
        } catch (error) {
          console.log(error);
        } finally {
          setTimeout(() => (deleteModal.deleteSpinner.style.display = "none"), 1300);
        }
      });
    });
  });

  createForm.modalCloseButton.addEventListener("click", () => {
    editModal.remove();
  });

  createForm.inputName.value = data.name;
  createForm.inputSurname.value = data.surname;
  createForm.inputLastName.value = data.lastName;

  for (const contact of data.contacts) {
    const createContact = createContactItem();

    createContact.contactNameButton.textContent = contact.type;
    createContact.contactInput.value = contact.value;

    createForm.contactsBlock.prepend(createContact.contact);
    createForm.contactsBlock.style.backgroundColor = "var(--athens-gray)";
  }

  if (data.contacts.lelength == 10) {
    createForm.addContactButton.classList.remove("modal__button-contact--active");
  }

  createForm.modalForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!validateClientForm()) {
      return;
    }

    const contactTypes = document.querySelectorAll(".contact__button-name");
    const contactValues = document.querySelectorAll(".contact__input");

    let contacts = [];
    let client = {};

    for (let i = 0; i < contactTypes.length; i++) {
      if (!validateClientContact(contactTypes[i], contactValues[i])) {
        return;
      }
      contacts.push({
        type: contactTypes[i].innerHTML,
        value: contactValues[i].value,
      });
    }

    client.name = createForm.inputName.value;
    client.surname = createForm.inputSurname.value;
    client.lastName = createForm.inputLastName.value;
    client.contacts = contacts;

    const spinner = document.querySelector(".modal__spinner");

    try {
      spinner.style.display = "block";
      const editedData = await sendClientData(client, "PATCH", data._id);
      document.querySelector(".clients__tbody").replaceChild(
        createClientItem(editedData),
        document.getElementById(editedData._id)
      );
      editModal.remove();
    } catch (error) {
      console.log(error);
    } finally {
      spinner.style.display = "none";
    }
  });

  editModalContent.append(createForm.modalCloseButton, createForm.modalHeading, createForm.modalForm);
  editModal.append(editModalContent);
  createForm.modalHeading.append(editModalId);

  document.addEventListener("click", (e) => {
    if (e.target == editModal) {
      editModal.remove();
    }
  });

  return {
    editModal,
    editModalContent,
  };
};