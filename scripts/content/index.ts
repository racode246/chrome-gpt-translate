import { fetchGptTranslation } from "./fetchGpt";
import { TRANSLATE_LENGTH, OPENAI_API_KEY } from "../lib/env";

const apiToken = OPENAI_API_KEY;
const translateLength = parseInt(TRANSLATE_LENGTH, 10);

let lastSelectedText: string = "";

function createTranslateButton(selectedText: string, event: MouseEvent) {
  const translateButton: HTMLButtonElement = document.createElement("button");
  translateButton.id = "translate-button";
  translateButton.classList.add("translate-button");
  translateButton.innerText = "Translate";
  translateButton.style.top = event.pageY + "px";
  translateButton.style.left = event.pageX + "px";

  document.body.appendChild(translateButton);

  translateButton.addEventListener("click", function (btnEvent: MouseEvent) {
    btnEvent.stopPropagation();
    createPopup(selectedText, event, translateButton);
  });
}

function createPopup(
  selectedText: string,
  event: MouseEvent,
  translateButton: HTMLButtonElement
) {
  const popup: HTMLDivElement = document.createElement("div");
  popup.id = "translate-popup";
  popup.classList.add("translate-popup");
  popup.style.top = event.pageY + 20 + "px";
  popup.style.left = event.pageX + "px";
  popup.innerText = "Translating...";

  document.body.appendChild(popup);

  fetchGptTranslation(selectedText, apiToken)
    .then(function (translatedText: string) {
      popup.innerText = translatedText;
    })
    .catch(function (error: any) {
      popup.innerText = "Failed to translate.";
      console.error(error);
    });

  // Do not close the popup when clicking inside
  popup.addEventListener("click", function (e: MouseEvent) {
    e.stopPropagation();
  });

  const handleOutsideClick = function (e: MouseEvent) {
    if (!popup.contains(e.target as Node) && e.target !== translateButton) {
      popup.remove();
      translateButton.remove();
      // lastSelectedText = ''; // You need to reset the lastSelectedText here
      document.removeEventListener("click", handleOutsideClick);
    }
  };
  setTimeout(function () {
    document.addEventListener("click", handleOutsideClick);
  }, 0);
}

document.addEventListener("mouseup", function (event: MouseEvent) {
  const existingButton = document.getElementById("translate-button");
  const existingPopup = document.getElementById("translate-popup");

  // Do nothing if the operation is on the button or popup
  if (
    (event.target instanceof Element &&
      event.target.id === "translate-button") ||
    (existingPopup && existingPopup.contains(event.target as Node))
  ) {
    return;
  }

  // Optionally, remove (reset) the previous button/popup if necessary
  if (existingButton) existingButton.remove();
  if (existingPopup) existingPopup.remove();

  const selectedText: string = window.getSelection()?.toString().trim() || "";
  console.log("Selected:", selectedText);

  if (selectedText === lastSelectedText) {
    return;
  }

  if (selectedText.length > 0 && selectedText.length <= translateLength) {
    createTranslateButton(selectedText, event);
    lastSelectedText = selectedText;
  } else {
    // Clear the last selected text if the selected text is out of range
    lastSelectedText = "";
  }
});
