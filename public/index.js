
function loading() {
  var button = document.getElementById('btns');
  var spinner = document.getElementById('picius');

  document.getElementById('status').innerHTML = 'Your File Has been placed in queue';
  spinner.style.visibility = "inherit";

  // Disable the button
  button.setAttribute("disabled", true);
  button.classList.add("disabled");
}