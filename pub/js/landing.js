const txt =
  "Create interactive and responsive Anime thumbnails with this javascript library.";
let i = 0;
const type_now = () => {
  if (i < txt.length) {
    const target = document.getElementById("target");
    target.innerHTML += txt[i];
    i += 1;
    console.log(1);
    setTimeout(type_now, 100);
  }
};

const to_demo = () => {
  window.open("http://localhost:5000/example.html", "_blank");
};

const to_docu = () => {
  window.open("http://localhost:5000/documentation.html", "_blank");
};

const to_git = () => {
  window.open("https://github.com/allanli524/js-lib-liyife15", "_blank");
};
type_now();
