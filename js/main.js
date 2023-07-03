function getPlaylists() {
  //TODO: Correct url api call
  fetch("http://127.0.0.1:3000/api/playlists")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Problemas");
      }
      return response.json();
    })
    .then((jsonData) => {
      jsonData.forEach((data) => {
        const tableBody = document.getElementById("playlists_table");
        const row = document.createElement("tr");
        const nameCell = document.createElement("td");
        nameCell.textContent = data.name;
        row.appendChild(nameCell);
        const creationCell = document.createElement("td");
        creationCell.textContent = data.creation_date;
        row.appendChild(creationCell);
        const lastCell = document.createElement("td");
        lastCell.textContent = data.last_reproduction;
        row.appendChild(lastCell);
        const actionCell = document.createElement("td");
        actionCell.innerHTML = `
        <span class="material-symbols-outlined" onclick="openEdit('${data.id}')">edit</span>
        <span class="material-symbols-outlined" onclick="openDelete('${data.id}')">delete</span>
        `;
        row.appendChild(actionCell);
        tableBody.appendChild(row);
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

let urlCount = 1;
function addUrlField(containerID, val = "") {
  const container = document.getElementById(containerID);
  const urlDiv = document.createElement("div");
  urlDiv.classList.add("form-group");
  urlDiv.innerHTML = `
        <input type="url" class="form-control w-75 d-inline"  name="url${urlCount}" value="${val}" required style="margin-top:1em">
        <button type="button" class="btn btn-danger d-inline"
        onclick="removeUrlField(this)"><span
                class="material-symbols-outlined" style='padding:0%'>delete</span></button>
      `;
  container.appendChild(urlDiv);
  console.log(container);
  urlCount++;
}

function removeUrlField(button) {
  const urlField = button.parentNode;
  urlField.parentNode.removeChild(urlField);
}

function openEdit(id) {
  //TODO: Correct url api call
  fetch("http://127.0.0.1:3000/api/playlists/" + id)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Problemas");
      }
      return response.json();
    })
    .then((jsonData) => {
      const data = jsonData[0];
      $("#name_e").val(data.name);
      data.song_url.forEach((song, index) => {
        if (index == 0) {
          $("#url_e").val(song);
        } else {
          addUrlField("urlsContainerEdit", song);
        }
        console.log(jsonData);
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  $("#editModal").modal("toggle");
}

function openDelete(id) {
  fetch("http://127.0.0.1:3000/api/playlists/" + id)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Problemas");
      }
      return response.json();
    })
    .then((jsonData) => {
      const data = jsonData[0];
      console.log('Playlist: '+data.name)
      $("#delete_modal_content").html('Playlist: '+data.name)
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  $("#deleteModal").modal("toggle");
}

document
  .getElementById("playlistForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const formData = new FormData(this);
    const urls = [];
    for (let i = 0; i < urlCount; i++) {
      const url = formData.get(`url${i}`);
      if (url) {
        urls.push(url);
      }
    }
    const playlistData = {
      name: formData.get("name"),
      urls: urls,
    };
    console.log(playlistData);
    this.reset();
    document.getElementById("urlsContainer").innerHTML = `
        <div class="form-group">
          <label for="url">URL:</label>
          <input type="url" class="form-control" name="url" required>
        </div>
      `;
    urlCount = 1;
  });
