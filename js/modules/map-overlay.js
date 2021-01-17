export function hideMapOverlay() {
  document.getElementById("map-overlay").style.display = "none";
}

export function showMapOverlay() {
  document.getElementById("map-overlay").style.display = "block";
}

export async function loadMapOverlay(url) {
  const content = document.getElementById("map-overlay-content");
  content.innerHTML = await fetchHtmlAsText(url);
  showMapOverlay();
}

async function fetchHtmlAsText(url) {
  const response = await fetch(url);
  return await response.text();
}

document
  .getElementById("map-overlay-close")
  .addEventListener("click", hideMapOverlay);
document
  .getElementById("map-overlay")
  .addEventListener("click", hideMapOverlay);
