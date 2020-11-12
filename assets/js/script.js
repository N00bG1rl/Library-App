/* Overlay appearance */
let openBtn = document.getElementById("openBtn");
let closeBtn = document.getElementById("closeBtn");
let overlay = document.getElementById("overlay");
let body = document.getElementsByTagName('body')[0];

openBtn.onclick = function() {
  overlay.style.display = "block";
  body.style.overflow = "hidden";
  closeBtn.classList.add("closeBtnActive");
  openBtn.classList.remove("openBtnActive");
}
closeBtn.onclick = function() {
  overlay.style.display = "none";
  body.style.overflow = "auto";
  openBtn.classList.add("openBtnActive");
  closeBtn.classList.remove("closeBtnActive")
}

/* Input field label animation */
$('input').on('focusin', function() {
  $(this).parent().find('label').addClass('active');
});

$('input').on('focusout', function() {
  if (!this.value) {
    $(this).parent().find('label').removeClass('active');
  }
});