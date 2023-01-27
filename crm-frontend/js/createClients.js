// CLIENTS CREATE
import { addClientModal } from "./addClient.js";
import { createPreloader } from "./preloader.js";
import { svgAddUser } from "./svg.js";

export const createClients = () => {
  const section = document.createElement("section");
  const h1 = document.createElement("h1");
  const container = document.createElement("div");
  const main = document.createElement("main");
  const table = document.createElement("table");
  const tableBody = document.createElement("tbody");
  const tableWrapper = document.createElement("div");
  const sortingDisplay = document.createElement("thead");
  const theadTr = document.createElement("tr");
  const sortingDisplayId = document.createElement("th");
  const sortingDisplayName = document.createElement("th");
  const sortingDisplayCreate = document.createElement("th");
  const createSpan = document.createElement("span");
  const sortingDisplayEdit = document.createElement("th");
  const editSpan = document.createElement("span");
  const sortingDisplayContacts = document.createElement("th");
  const sortingDisplayActions = document.createElement("th");
  const sortingDisplaySpan = document.createElement("span");
  const addUserButton = document.createElement("button");
  const addUserButtonSvg = document.createElement("span");

  const sortDisplayItems = [sortingDisplayId, sortingDisplayName, sortingDisplayCreate, sortingDisplayEdit];

  for (const item of sortDisplayItems) {
    item.addEventListener("click", () => {
      if (item.classList.contains("sort-down")) {
        item.classList.remove("sort-down");
        item.classList.add("sort-up");
      } else {
        item.classList.add("sort-down");
        item.classList.remove("sort-up");
      }
    });
  }

  sortingDisplayCreate.addEventListener("click", () => {
    if (sortingDisplayCreate.classList.contains("sort-down")) {
      createSpan.classList.add("sort-up");
    } else {
      createSpan.classList.remove("sort-up");
    }
  });

  sortingDisplayEdit.addEventListener("click", () => {
    if (sortingDisplayEdit.classList.contains("sort-down")) {
      editSpan.classList.add("sort-up");
    } else {
      editSpan.classList.remove("sort-up");
    }
  });

  sortingDisplayId.setAttribute("data-type", "id");
  sortingDisplayName.setAttribute("data-type", "text");
  sortingDisplayCreate.setAttribute("data-type", "create");
  sortingDisplayEdit.setAttribute("data-type", "update");

  section.classList.add("clients");
  container.classList.add("container", "clients__container");
  h1.classList.add("clients__heading");
  main.classList.add("main");
  tableWrapper.classList.add("clients__wrapper");
  table.classList.add("clients__table");
  tableBody.classList.add("clients__tbody");
  sortingDisplay.classList.add("clients__display", "displayinfo");
  sortingDisplayId.classList.add("displayinfo__item", "displayinfo__item-id", "sort-up");
  sortingDisplayName.classList.add("displayinfo__item", "displayinfo__item-name", "sort-down");
  sortingDisplayCreate.classList.add("displayinfo__item", "displayinfo__item-create", "sort-down");
  createSpan.classList.add("create-span");
  sortingDisplayEdit.classList.add("displayinfo__item", "displayinfo__item-edit", "sort-down");
  editSpan.classList.add("edit-span");
  sortingDisplayContacts.classList.add("displayinfo__item", "displayinfo__item-contacts");
  sortingDisplayActions.classList.add("displayinfo__item", "displayinfo__item-actions");
  sortingDisplaySpan.classList.add("displayinfo__sorting");
  addUserButton.classList.add("clients__button");
  addUserButtonSvg.classList.add("clients__svg");

  h1.textContent = "Клиенты";
  sortingDisplayId.textContent = "id";
  sortingDisplayName.textContent = "Фамилия Имя Отчество";
  sortingDisplaySpan.textContent = "а-я";
  sortingDisplayCreate.textContent = "Дата и время";
  sortingDisplayEdit.textContent = "Последние ";
  sortingDisplayContacts.textContent = "Контакты ";
  sortingDisplayActions.textContent = "Действия ";
  addUserButton.textContent = "Добавить клиента";
  addUserButtonSvg.innerHTML = svgAddUser;

  addUserButton.addEventListener("click", () => {
    document.body.append(addClientModal());
  });

  main.append(section);
  section.append(container);
  sortingDisplayName.appendChild(sortingDisplaySpan);
  sortingDisplayCreate.append(createSpan);
  sortingDisplayEdit.append(editSpan);
  theadTr.append(sortingDisplayId, sortingDisplayName, sortingDisplaySpan, sortingDisplayCreate, sortingDisplayEdit, sortingDisplayContacts, sortingDisplayActions);
  sortingDisplay.append(theadTr);
  tableWrapper.append(table, addUserButton, createPreloader());
  table.append(sortingDisplay, tableBody);
  addUserButton.append(addUserButtonSvg);
  container.append(h1, tableWrapper);

  return {
    main,
    table,
    tableBody,
  };
};
