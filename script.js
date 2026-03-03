const container = document.getElementById("heatmapContainer");
let activity = JSON.parse(localStorage.getItem("activity")) || {};

const year = new Date().getFullYear();

// Generate months separately
for (let month = 0; month < 12; month++) {

  const monthBlock = document.createElement("div");
  monthBlock.classList.add("month-block");

  const monthGrid = document.createElement("div");
  monthGrid.classList.add("month-grid");

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const key = date.toISOString().split("T")[0];

    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.date = key;

    if (activity[key]) {
      cell.classList.add("active");
    }

    monthGrid.appendChild(cell);
  }

  const monthLabel = document.createElement("div");
  monthLabel.classList.add("month-label");
  monthLabel.textContent = new Date(year, month).toLocaleString("default", {
    month: "short"
  });

  monthBlock.appendChild(monthGrid);
  monthBlock.appendChild(monthLabel);

  container.appendChild(monthBlock);
}

// Button marks today
function markToday() {
  const today = new Date().toISOString().split("T")[0];

  activity[today] = true;
  localStorage.setItem("activity", JSON.stringify(activity));

  document.querySelectorAll(".cell").forEach(cell => {
    if (cell.dataset.date === today) {
      cell.classList.add("active");
    }
  });
}
