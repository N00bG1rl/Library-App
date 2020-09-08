console.log('Hello world!')

//Example from: https://www.w3schools.com/howto/howto_js_toggle_class.asp
var element = document.getElementById("myDIV");

if (element.classList) {
  element.classList.toggle("mystyle");
} else {
  // For IE9
  var classes = element.className.split(" ");
  var i = classes.indexOf("mystyle");

  if (i >= 0)
    classes.splice(i, 1);
  else
    classes.push("mystyle");
    element.className = classes.join(" ");
}