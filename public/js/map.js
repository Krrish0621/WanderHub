if (!coordinates || coordinates.length !== 2) {
  console.error("Invalid coordinates found for this listing", coordinates);
}

// 🔑 MapTiler key
maptilersdk.config.apiKey = map_token;

// 🌍 Create Map
const map = new maptilersdk.Map({
  container: "map",
  style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${map_token}`,
  center: coordinates,
  zoom: 13,
  pitch: 55,
  bearing: -25,
  antialias: true
});

// 🎛 Controls
map.addControl(new maptilersdk.NavigationControl(), "top-right");

// ✅ Main Listing Marker (Animated pulse)
const markerDiv = document.createElement("div");
markerDiv.className = "custom-marker";

new maptilersdk.Marker(markerDiv)
  .setLngLat(coordinates)
  .setPopup(
    new maptilersdk.Popup({ offset: 25 }).setHTML(`
      <div class="map-popup">
        <h6>📍 ${document.querySelector("h3").innerText}</h6>
        <p>This is your destination</p>
      </div>
    `)
  )
  .addTo(map)
  .togglePopup();

// 🚀 Fly on load
map.on("load", async () => {
  map.flyTo({ center: coordinates, zoom: 15, speed: 0.9 });

  getUserRoute();
  loadNearby();
});

// ✅ Get User Current Location
function getUserRoute() {
  if (!navigator.geolocation) return;

  navigator.geolocation.getCurrentPosition(pos => {
    const userLoc = [pos.coords.longitude, pos.coords.latitude];

    // User Marker
    new maptilersdk.Marker({ color: "#22c55e" })
      .setLngLat(userLoc)
      .addTo(map);

    // Route line
    drawRoute(userLoc, coordinates);

    // Badge
    showDistance(userLoc, coordinates);

  }, () => {
    console.log("Location permission denied.");
  });
}

// ✅ Draw route line
function drawRoute(start, end) {
  const route = {
    type: "Feature",
    geometry: {
      type: "LineString",
      coordinates: [start, end]
    }
  };

  map.addSource("route", { type: "geojson", data: route });

  map.addLayer({
    id: "route-line",
    type: "line",
    source: "route",
    paint: {
      "line-color": "#6366f1",
      "line-width": 5
    }
  });
}

// ✅ Distance + ETA
function showDistance(start, end) {
  const rad = Math.PI / 180;

  const d =
    Math.acos(
      Math.cos(start[1] * rad) *
        Math.cos(end[1] * rad) *
        Math.cos((end[0] - start[0]) * rad) +
        Math.sin(start[1] * rad) * Math.sin(end[1] * rad)
    ) * 6371;

  const time = Math.round((d / 50) * 60); // car estimate

  const badge = document.createElement("div");
  badge.className = "distance-badge";
  badge.innerHTML = `📏 ${d.toFixed(1)} km • ⏱ ${time} min`;

  document.getElementById("map").appendChild(badge);
}

// ✅ Fake nearby pins (for god view)
function loadNearby() {
  const nearby = [
    [coordinates[0] + 0.01, coordinates[1] + 0.005],
    [coordinates[0] - 0.01, coordinates[1] - 0.007],
    [coordinates[0] + 0.008, coordinates[1] - 0.01]
  ];

  nearby.forEach((c, i) => {
    new maptilersdk.Marker({ color: "#ef4444" })
      .setLngLat(c)
      .setPopup(
        new maptilersdk.Popup().setHTML(`Nearby Spot ${i + 1}`)
      )
      .addTo(map);
  });
}
