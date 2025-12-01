const yearSpan = document.getElementById("currentyear");
const lastModifiedParagraph = document.getElementById("lastModified");

const currentYear = new Date().getFullYear();
yearSpan.textContent = currentYear;

lastModifiedParagraph.textContent = `Last Modified: ${document.lastModified}`;