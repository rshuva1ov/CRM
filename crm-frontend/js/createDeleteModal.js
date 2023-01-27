// DELETE CLIENT MODAL

export const deleteClientModal = () => {
  const deleteModalContent = document.createElement("div");
  const modalClose = document.createElement("button");
  const deleteModalHeading = document.createElement("h2");
  const deleteModalText = document.createElement("p");
  const deleteModal = document.createElement("div");
  const deleteModalDelete = document.createElement("button");
  const deleteModalBack = document.createElement("button");
  const deleteSpinner = document.createElement("span");

  deleteSpinner.classList.add("modal__spinner");
  deleteModal.classList.add("delete-modal", "site-modal", "modal-active");
  deleteModalContent.classList.add("delete-modal__content", "site-modal__content", "modal-active");
  deleteModalText.classList.add("delete-modal__text");
  deleteModalHeading.classList.add("delete-modal__heading", "modal__heading");
  deleteModalDelete.classList.add("delete-modal__delete", "site-button");
  deleteModalBack.classList.add("delete-modal__back");
  modalClose.classList.add("modal__close");

  deleteModalHeading.textContent = "Удалить клиента";
  deleteModalText.textContent = "Вы действительно хотите удалить данного клиента?";
  deleteModalDelete.textContent = "Удалить";
  deleteModalBack.textContent = "Отмена";

  deleteModalDelete.append(deleteSpinner);
  deleteModalContent.append(modalClose, deleteModalHeading, deleteModalText, deleteModalDelete, deleteModalBack);
  deleteModal.append(deleteModalContent);

  modalClose.addEventListener("click", () => deleteModal.remove());
  deleteModalBack.addEventListener("click", () => deleteModal.remove());

  window.addEventListener("click", (e) => {
    if (e.target === deleteModal) {
      deleteModal.remove();
    }
  });

  return {
    deleteModal,
    deleteModalContent,
    deleteModalDelete,
    deleteSpinner
  };
};
