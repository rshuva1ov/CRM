// APP CREATE

import { createClientsHeader } from "./createHeader.js";
import { createClients } from "./createClients.js";
import { getClients } from "./clientsAPI.js";
import { createClientItem } from "./createClientItem.js";
import { sortTable } from "./sortClientsTable.js";
import { searchClients } from "./searchClient.js";

const createApp = async () => {
  const header = createClientsHeader();
  const clientsSection = createClients();
  document.body.append(header, clientsSection.main);
  const preloader = document.querySelector(".preloader");
  const tableWrapper = document.querySelector(".clients__wrapper");

  try {
    tableWrapper.style.overflow = "visible";
    const clients = await getClients();
    searchClients(clients);

    for (const client of clients) {
      clientsSection.tableBody.append(createClientItem(client));
    }
  } catch (error) {
    console.log(error);
  } finally {
    setTimeout(() => {
      preloader.remove();
    }, 1300);
    tableWrapper.style.overflow = "auto";
  }
};
createApp();
document.addEventListener("DOMContentLoaded", sortTable);
