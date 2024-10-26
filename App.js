let displayUpdateForm = document.querySelector(".display-form-update");
let containerPopUp = document.querySelector(".popup-form-container");
let readContainer = document.querySelector(".read-data-container");
let updateContainer = document.querySelector(".update-container-form");
let cancelBtn = document.querySelector(".fa-x");
let cancelRead = document.querySelector(".read-btn");
let cancelUpdate = document.querySelector(".update-btn");
let addDetails = document.querySelector(".add-details");

let readDataForm = document.querySelector(".form-add-control");
let allId = [];

readDataForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let dataRead = new FormData(readDataForm);
  let readData = Object.fromEntries(dataRead);
  console.log(readData);
  if (
    readData.id != " " &&
    readData.name != "" &&
    readData.email != "" &&
    readData.phone != "" &&
    allId.includes(readData.id) == false
  ) {
    window.fetch("http://localhost:3000/user/", {
      method: "POST",
      headers: { "Content-Type": "addLocation.json" },
      body: JSON.stringify(readData),
    });
    window.location.reload();
  } else {
    addDetails.innerHTML = "ID IS PRESENT. PLEASE ENTER ANOTHER ID...";
    if (
      readData.id != " " &&
      readData.name != "" &&
      readData.email != "" &&
      readData.phone != "" &&
      allId.includes(readData.id) == false
    ) {
      window.fetch("http://localhost:3000/user/", {
        method: "POST",
        headers: { "Content-Type": "addLocation.json" },
        body: JSON.stringify(readData),
      });
      window.location.reload();
    }
  }
});

async function fetchData(e) {
  let data = await window.fetch("http://localhost:3000/user");
  let finalData = await data.json();
  let tbody = document.querySelector("tbody");
  finalData.forEach((v, i) => {
    let { id, name, email, phone } = v;
    allId.push(id);
    tbody.innerHTML += `
        <tr>
        <td>${id}</td>
        <td>${name}</td>
        <td>${phone}</td>
        <td>${email}</td>
        <td>
        <button onclick="handleReadData(event,${id})">Read</button>
        <button onclick="handleUpdate(event,${id})">Update</button>
        <button onclick="handleDelete(event,${id})">Delete</button>
        </td>
        </tr>
        `;
  });
}

fetchData();

displayUpdateForm.addEventListener("click", (e) => {
  containerPopUp.style.display = "block";
});

let idRead = document.querySelector(".id-read");
let nameRead = document.querySelector(".name-read");
let emailRead = document.querySelector(".email-read");
let phoneRead = document.querySelector(".phone-read");

let handleReadData = (e, id) => {
  readContainer.style.display = "block";
  window.fetch(`http://localhost:3000/user/${id}`).then(
    (d) => {
      d.json().then(
        (val) => {
          let { id, email, phone, name } = val;
          (idRead.innerHTML = "ID : " + id),
            (nameRead.innerHTML = "Name : " + name),
            (emailRead.innerHTML = "Email : " + email),
            (phoneRead.innerHTML = "Phone : " + phone);
        },
        (e) => console.log(e)
      );
    },
    (e) => console.log(e)
  );
};

let nameRes = document.querySelector("#uName");
let emailRes = document.querySelector("#uEmail");
let phoneRes = document.querySelector("#uPhone");
let updateData;

let handleUpdate = (e, id) => {
  updateContainer.style.display = "block";
  window.fetch(`http://localhost:3000/user/${id}`).then(
    (d) => {
      d.json().then(
        (value) => {
          console.log(value);
          nameRes.value = value.name;
          emailRes.value = value.email;
          phoneRes.value = value.phone;
          updateData = value;
          formIdUpdate = id;
        },
        (e) => console.log(e)
      );
    },
    (e) => console.log(e)
  );
};

let updateFormData = document.querySelector(".form-update-control");
updateFormData.addEventListener("submit", (e) => {
  window
    .fetch(`http://localhost:3000/user/${formIdUpdate}`, {
      method: "PUT",
      headers: { "Content-Type": "application.json" },
      body: JSON.stringify(Object.fromEntries(new FormData(updateFormData))),
    })
    .then(
      (d) => console.log(d),
      (e) => console.log(e)
    );
});

let handleDelete = (e, id) => {
  let confirm = window.confirm("Are you sure you want to delete this..");
  if (confirm === true) {
    window
      .fetch(`http://localhost:3000/user/${id}`, {
        method: "DELETE",
      })
      .then(
        (d) => console.log(d),
        (e) => console.log(e)
      );
  }
};

cancelBtn.onclick = (e) => {
  containerPopUp.style.display = "none";
};
cancelRead.onclick = (e) => {
  readContainer.style.display = "none";
};
cancelUpdate.onclick = (e) => {
  updateContainer.style.display = "none";
};
