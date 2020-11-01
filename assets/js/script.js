let openBtn = document.getElementById("openBtn");
let closeBtn = document.getElementById("closeBtn");
let overlay = document.getElementById("overlay")

openBtn.onclick = function() {
  overlay.style.display = "block";

  closeBtn.classList.add("closeBtnActive");
  openBtn.classList.remove("openBtnActive");
}
closeBtn.onclick = function() {
  overlay.style.display = "none";

  openBtn.classList.add("openBtnActive");
  closeBtn.classList.remove("closeBtnActive")
}