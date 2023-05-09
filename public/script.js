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
      input.setAttribute("name", e);
      input.setAttribute("class", "checkbox");
      div.appendChild(label);
      div.appendChild(input);
      domainItems.appendChild(div);
    });
  }
};

const domainFilter = () => {
  const domain = document.getElementById("domainFilter").value;
  
}