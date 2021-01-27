export function hideMapOverlay(circle) {
  document.getElementById("map-overlay").style.display = "none";
  document.getElementById("map-controls").style.display = "block";
  circle.attr("stroke", "rgb(102, 16, 242)");
  circle.attr("fill", "rgba(102, 16, 242, 0.5)");
}

export function showMapOverlay() {
  document.getElementById("map-controls").style.display = "none";
  document.getElementById("map-overlay").style.display = "block";
}

export async function loadMapOverlay(titlet, contentt, urlt, circlet) {
  const title = document.getElementById("map-overlay-title");
  title.innerHTML = titlet
  const content = document.getElementById("map-overlay-content");
  content.innerHTML = contentt
  const url = document.getElementById("map-overlay-link2");
  url.innerHTML ="Source: "+ urlt
  url.href = urlt

  document
  .getElementById("map-overlay-close")
  .addEventListener("click", function(){hideMapOverlay(circlet)});

  showMapOverlay();
}

async function fetchHtmlAsText(url) {
  const response = await fetch(url);
  return await response.text();
}

/* document
  .getElementById("map-overlay-close")
  .addEventListener("click", hideMapOverlay);
 */
/* document
  .getElementById("map-overlay")
  .addEventListener("click", hideMapOverlay); */
