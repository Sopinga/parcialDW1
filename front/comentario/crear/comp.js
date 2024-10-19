document
  .getElementById("btonComentar")
  .addEventListener("click", async function (comentario) {
    const comentario = document.getElementById("comentario").value;

    if (comentario === "") {
      alert("Por favor ingrese un comentario");
      return;
    } else if (comentario.length < 5) {
      alert("El comentario debe tener al menos 5 caracteres");
      return;
    } else if (comentario.length > 255) {
      alert("El comentario no puede tener más de 255 caracteres");
      return;
    }
  });
