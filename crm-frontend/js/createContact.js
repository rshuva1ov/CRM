// CREATE ADD CONTACT

import { svgDelete } from "./svg.js";

export const createContactItem = () => {
  const contact = document.createElement("div");
  const contactType = document.createElement("div");
  const contactNameButton = document.createElement("button");
  const contactList = document.createElement("ul");
  const contactPhone = document.createElement("li");
  const contactVk = document.createElement("li");
  const contactFb = document.createElement("li");
  const contactEmail = document.createElement("li");
  const contactOther = document.createElement("li");
  const contactInput = document.createElement("input");
  const contactDeleteButton = document.createElement("button");
  const contactDeleteTooltip = document.createElement("span");

  contact.classList.add("contact");
  contactDeleteTooltip.classList.add("contact__tooltip", "site-tooltip");
  contactType.classList.add("contact__type");
  contactNameButton.classList.add("contact__button-name");
  contactList.classList.add("contact__list");
  contactPhone.classList.add("contact__item");
  contactVk.classList.add("contact__item");
  contactFb.classList.add("contact__item");
  contactEmail.classList.add("contact__item");
  contactOther.classList.add("contact__item");
  contactInput.classList.add("contact__input");
  contactDeleteButton.classList.add("contact__button-delete");

  contactNameButton.textContent = "Телефон";
  contactDeleteTooltip.textContent = "Удалить контакт";
  contactPhone.textContent = "Телефон";
  contactVk.textContent = "Vk";
  contactFb.textContent = "Facebook";
  contactEmail.textContent = "Email";
  contactOther.textContent = "Другое";
  contactInput.placeholder = "Введите данные контакта";
  contactInput.type = "text";
  contactDeleteButton.innerHTML = svgDelete;

  contactDeleteButton.addEventListener("click", (e) => {
    e.preventDefault();
    contact.remove();
    document.querySelector(".modal__button-contact").classList.add("modal__button-contact--active");
  });

  contactNameButton.addEventListener("click", (e) => {
    e.preventDefault();
    contactList.classList.toggle("contact__list-active");
    contactNameButton.classList.toggle("contact__list-active");
  });
  contactType.addEventListener("mouseleave", () => {
    contactList.classList.remove("contact__list-active");
    contactNameButton.classList.remove("contact__list-active");
  });

  const setType = (type) => {
    type.addEventListener("click", () => {
      contactNameButton.textContent = type.textContent;
      contactList.classList.remove("contact__list-active");
      contactNameButton.classList.remove("contact__list-active");
    });
  };

  const typesArray = [contactPhone, contactEmail, contactVk, contactFb, contactOther];

  for (const type of typesArray) {
    setType(type);
  }

  contactDeleteButton.append(contactDeleteTooltip);
  contact.append(contactType, contactInput, contactDeleteButton);
  contactType.append(contactNameButton, contactList);
  contactList.append(contactPhone, contactEmail, contactVk, contactFb, contactOther);

  return {
    contact,
    contactNameButton,
    contactInput,
    contactDeleteButton,
  };
};
