// const domains = require ('./public/domain');

const domains = new Map([
  ["universal indian", ["panipuri", "samosa", "chaat"]],
  ["north indian", ["chole bathure", "tawa chicken", "kulcha"]],
  ["fast food", ["pizza", "sandwich", "burger"]],
]);

const domainSubCategory = () => {
  const domain = document.getElementById("Domain").value;
  const domainItems = document.getElementById("domainItems");
  while (domainItems.hasChildNodes()) {
    domainItems.removeChild(domainItems.firstChild);
  }
  if (domain !== "Choose...") {
    const categories = domains.get(domain);
    console.log(categories);
    categories.forEach((e) => {
      const div = document.createElement("div");
      div.setAttribute("class", "checkbox-div");
      const label = document.createElement("LABEL");
      label.innerText = e;
      const input = document.createElement("INPUT");
      input.setAttribute("type", "checkbox");
      input.setAttribute("name", `${domain}_${e}`); // Assign a unique name
      input.setAttribute("class", "checkbox");
      div.appendChild(label);
      div.appendChild(input);
      domainItems.appendChild(div);
    });
  }
};

const domainFilter = () => {
  const domain = document.getElementById("domainFilter").value;
  // alert(`domain changed to ${domain}`);
  const encodedOption = encodeURIComponent(domain); // Encode the option value
  fetch(`/search/${encodedOption}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      let tableHTML = "<tbody>";

      tableHTML += "";
      data.forEach((shop) => {
        tableHTML += "<tr>";
        var startTime = shop.start;
        var endTime = shop.end;

        var currentTime = new Date().toLocaleTimeString("en-US", {
          timeZone: "Asia/Kolkata",
          hour12: false,
        });

        // Convert the start-time, end-time, and current time to comparable formats (e.g., minutes past midnight)
        function convertToMinutes(time) {
          var splitTime = time.split(":");
          return parseInt(splitTime[0]) * 60 + parseInt(splitTime[1]);
        }
        var startMinutes = convertToMinutes(startTime);
        var endMinutes = convertToMinutes(endTime);
        var currentMinutes = convertToMinutes(currentTime);
        console.log(startMinutes + "  " + endMinutes + " " + currentMinutes);
        // Adjust the end time to be on the next day if it's earlier than the start time
        if (endMinutes < startMinutes) {
          endMinutes += 24 * 60;
        }

        // Compare the current time with the start-time and end-time to determine if it falls within the specified range
        if (currentMinutes >= startMinutes && currentMinutes <= endMinutes) {
          // Add a class to the shop-name div to change its background color
          tableHTML += "<th style='color : green'>" + "Open" + "</th>";
        } else {
          tableHTML += "<th style='color : red'>" + "Close" + "</th>";
        }

        if (shop.photo) {
          tableHTML +=
            "<td>" +
            `<img style="width : 180px; max-height : 180px;" src="./uploads/${shop.photo}" alt=''>` +
            "</td>";
        } else {
          tableHTML += "<td>" + "</td>";
          console.log("no img");
        }
        tableHTML += "<td>" + shop.name + "</td>";
        tableHTML += "<td>" + shop.owner + "</td>";
        tableHTML += "<td>" + shop.location + "</td>";
        tableHTML += "<td>" + shop.description + "</td>";
        const itemNames = shop.items.map((item) => item.name).join(", ");
        tableHTML += "<td>" + itemNames + "</td>";
        tableHTML += "<td>" + shop.start + "</td>";
        tableHTML += "<td>" + shop.end + "</td>";
        tableHTML += "</tr>";
      });

      tableHTML += "</tbody>";

      // Display the HTML table
      document.getElementById("shopTableBody").innerHTML = tableHTML;
    });
};
