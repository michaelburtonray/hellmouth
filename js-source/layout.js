function Layout() {
  Layout.prototype.init = function() {

  };

  Layout.prototype.resize = function() {

  };
}

var layout = new Layout();

document.addEventListener('DOMContentLoaded', layout.init);
window.addEventListener('resize', layout.resize);
