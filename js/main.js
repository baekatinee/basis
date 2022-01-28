function runAjax() {
  $.getJSON('https://basis.clothing/', function (data) {
    window.alert(JSON.stringify(data));
  });
}
