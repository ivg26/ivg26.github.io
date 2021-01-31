export function hideMapOverlay(circle) {
    document.getElementById("map-overlay").style.visibility = "hidden";
    document.getElementById("map-overlay").style.opacity = "0";
    circle.attr("stroke", "rgb(102, 16, 242)");
    circle.attr("fill", "rgba(102, 16, 242, 0.5)");
}

export function showMapOverlay() {
    document.getElementById("map-overlay").style.visibility = "visible";
    document.getElementById("map-overlay").style.opacity = "1";
}

export function loadMapOverlay(title, content, url, circle, date) {
    const overlayTitle = document.getElementById("map-overlay-title");
    overlayTitle.innerHTML = title
    const overlayContent = document.getElementById("map-overlay-content");
    overlayContent.innerHTML = content
    const overlayUrl = document.getElementById("map-overlay-link");
    overlayUrl.href = url
    overlayUrl.innerHTML = date.toDateString() + ', Source'

    document.getElementById("map-overlay-close")
        .addEventListener("click", function () {
            hideMapOverlay(circle)
        });

    showMapOverlay();
}

