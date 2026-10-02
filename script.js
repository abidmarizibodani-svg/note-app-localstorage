function inputdata(event) {
  event.preventDefault();

  let data1 = document.getElementById("note").value.trim();
  let data2 = document.getElementById("label").value;

  if (!data1 || !data2) {
    return;
  }

  let siswa = JSON.parse(localStorage.getItem("siswa")) || [];
  siswa.push({ note: data1, label: data2 });

  localStorage.setItem("siswa", JSON.stringify(siswa));
  document.getElementById("note").value = "";
  document.getElementById("label").selectedIndex = 0;

  tampilkan();
}

function tampilkan() {
  let data = JSON.parse(localStorage.getItem("siswa")) || [];
  const ul = document.getElementById("data-tampil");
  const clearAllButton = document.getElementById("clear-all-button");
  ul.innerHTML = "";
  clearAllButton.hidden = data.length === 0;

  data.forEach((item, index) => {
    const li = document.createElement("li");
    const text = document.createElement("span");
    const deleteButton = document.createElement("button");

    text.textContent = `${item.note} - ${item.label}`;

    deleteButton.type = "button";
    deleteButton.className = "delete-button";
    deleteButton.textContent = "Hapus";
    deleteButton.addEventListener("click", () => deleteItem(index));

    li.appendChild(text);
    li.appendChild(deleteButton);
    ul.appendChild(li);
  });
}

function deleteItem(index) {
  let siswa = JSON.parse(localStorage.getItem("siswa")) || [];

  if (index < 0 || index >= siswa.length) {
    return;
  }

  if (!confirm("Hapus catatan ini?")) {
    return;
  }

  siswa.splice(index, 1);
  localStorage.setItem("siswa", JSON.stringify(siswa));
  tampilkan();
}

function clearAll() {
  let siswa = JSON.parse(localStorage.getItem("siswa")) || [];

  if (siswa.length === 0 || !confirm("Yakin ingin menghapus semua catatan?")) {
    return;
  }

  localStorage.removeItem("siswa");
  tampilkan();
}

tampilkan();
