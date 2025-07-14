let employes;
let employeList = document.querySelector(".employeList > ul");
let addUser = document.getElementById("add");
let inputs = document.querySelectorAll("input");
let message = document.getElementById("message");
let deleteBtn = document.querySelector(".employeList");

window.onload = () => {
  employes = JSON.parse(localStorage.getItem("employList")) || [];

  renderEmployes(employes);
};

addUser.addEventListener("click", (e) => {
  e.preventDefault();
  if (
    inputs[0].value === "" ||
    inputs[1].value === "" ||
    inputs[2].value === ""
  ) {
    message.style.color = "red";
    message.textContent =
      "Error :Please Make sure All the field before adding in an emplyee";
    message.style.display = "block";
    return;
  }
  console.log(employes);
  let newId = employes.length + 1;
  let newEmploye = {
    id: newId,
    name: inputs[0].value,
    profession: inputs[1].value,
    age: inputs[2].value,
  };

  employes.push(newEmploye);
  renderEmployes(employes);
  inputs[0].value = "";
  inputs[1].value = "";
  inputs[2].value = "";
});

deleteBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.type !== "button") {
    return;
  }
  console.log(employes);
  const userId = Number(e.target.getAttribute("data-user-id"));

  employes = employes.filter((employe) => employe.id !== userId);

  employes = employes.map((employe, index) => {
    employe.id = index + 1;
    return employe;
  });
  if (employes.length > 0) {
    renderEmployes(employes);
    return;
  } else {
    employeList.innerHTML = `<p style="margin:20px">No Data Found</p>`;
    return;
  }
});

function renderEmployes(employes) {
  if (!employes) return;
  localStorage.setItem("employList", JSON.stringify(employes));
  employeList.innerHTML = "";
  employes.forEach((employe) => {
    employeList.innerHTML += `<li>
    <div id="employes">
      <p>${employe.name}</p>
      <p>${employe.profession}</p>
      <p>${employe.age}</p>
    </div>
    <button type="button" id="delete" data-user-id="${employe.id}">Delete</button>
  </li>`;
  });
  message.textContent = "Success : Employe Added";
  message.style.color = "green";
  message.style.display = "block";
}

function generateUserId() {
  return "user-" + Date.now() + "-" + Math.floor(Math.random() * 10000);
}
