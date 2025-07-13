
const materias = [
  {
    año: "Primer año",
    lista: [
      { id: 1, nombre: "Obstetricia normal" },
      { id: 2, nombre: "Anatomía, histología y embriología" },
      { id: 4, nombre: "Biología celular y genética" },
      { id: 5, nombre: "Ciencias sociales y medicina" },
      { id: 12, nombre: "Psicología" }
    ]
  },
  {
    año: "Segundo año",
    lista: [
      { id: 6, nombre: "Obstetricia patológica", requiere: [1] },
      { id: 17, nombre: "La salud materno infantil" },
      { id: 9, nombre: "Microbiología, parasitología", requiere: [4] },
      { id: 10, nombre: "Farmacología general" },
      { id: 11, nombre: "Epidemiología" },
      { id: 18, nombre: "Educación para la salud reproductiva" },
      { id: 7, nombre: "Fisiología humana", requiere: [2, 4] }
    ]
  },
  {
    año: "Tercer año",
    lista: [
      { id: 13, nombre: "Clínica obstétrica normal y patológica", requiere: [1, 6] },
      { id: 22, nombre: "Salud pública", requiere: [5, 11] },
      { id: 8, nombre: "Neonatología normal y patológica", requiere: [1, 6] },
      { id: 16, nombre: "Terapéutica: bases farmacológicas", requiere: [10] },
      { id: 21, nombre: "Investigación en salud" }
    ]
  },
  {
    año: "Cuarto año",
    lista: [
      { id: 20, nombre: "Taller de tesis: tesina final", requiere: "todas" },
      { id: 14, nombre: "Enfermedades infecciosas", requiere: [9, 10, 11, 16] },
      { id: 15, nombre: "Ética, deontología y obstetricia legal" },
      { id: 19, nombre: "Informática aplicada a las ciencias de la salud" },
      { id: 21, nombre: "Inglés técnico" },
      { id: 23, nombre: "Práctica final obligatoria" }
    ]
  }
];

const seccion = document.querySelector(".malla");

materias.forEach(bloque => {
  const columna = document.createElement("div");
  columna.className = "columna";

  const titulo = document.createElement("h2");
  titulo.textContent = bloque.año;
  columna.appendChild(titulo);

  bloque.lista.forEach(materia => {
    const div = document.createElement("div");
    div.className = "materia bloqueada";
    div.textContent = materia.nombre;
    div.dataset.id = materia.id;
    columna.appendChild(div);
  });

  seccion.appendChild(columna);
});

function desbloquear(id) {
  const box = document.querySelector(`.materia[data-id='${id}']`);
  if (box) box.classList.remove("bloqueada");
}

function checkDesbloqueos() {
  const activas = [...document.querySelectorAll(".materia:not(.bloqueada)")].map(m => +m.dataset.id);

  materias.forEach(bloque => {
    bloque.lista.forEach(materia => {
      const div = document.querySelector(`.materia[data-id='${materia.id}']`);
      if (!div.classList.contains("bloqueada")) return;

      if (!materia.requiere) return div.classList.remove("bloqueada");

      if (materia.requiere === "todas") {
        const total = document.querySelectorAll(".materia").length;
        const activasCount = document.querySelectorAll(".materia:not(.bloqueada)").length;
        if (activasCount >= total - 1) div.classList.remove("bloqueada");
        return;
      }

      const habilitada = materia.requiere.every(r => activas.includes(r));
      if (habilitada) div.classList.remove("bloqueada");
    });
  });
}

document.querySelectorAll(".materia").forEach(div => {
  div.addEventListener("click", () => {
    if (div.classList.contains("bloqueada")) return;
    div.classList.add("bloqueada");
    checkDesbloqueos();
  });
});

checkDesbloqueos();
