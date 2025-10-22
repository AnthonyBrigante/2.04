document.getElementById("friendSelect").addEventListener("change", function() {
  const fileName = this.value;
  const tableBody = document.querySelector("#scheduleTable tbody");
  tableBody.innerHTML = ""; // clear table

  if (!fileName) return;

  fetch(fileName)
    .then(response => response.json())
    .then(data => {
      data.forEach(item => {
        const className = item.className || item.classname || "N/A";
        const teacher = item.Teacher || item.teacher || "N/A";
        const room = item.roomNumber || "N/A";
        const period = item.period || "N/A";
        const subject = item.subjectArea || item.subjetArea || "N/A";

        const row = `
          <tr>
            <td>${period}</td>
            <td>${className}</td>
            <td>${teacher}</td>
            <td>${room}</td>
            <td>${subject}</td>
          </tr>`;
        tableBody.insertAdjacentHTML("beforeend", row);
      });
    })
    .catch(err => {
      console.error("Error loading JSON:", err);
      tableBody.innerHTML = `<tr><td colspan="5">Error loading schedule</td></tr>`;
    });
});
