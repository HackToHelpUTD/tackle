function fadeOutEffect(fadeTarget) {
  var fadeEffect = setInterval(function () {
      if (!fadeTarget.style.opacity) {
        fadeTarget.style.opacity = 1;
      }
      if (fadeTarget.style.opacity > 0) {
        fadeTarget.style.opacity -= 0.6;
        fadeTarget.style.height -= 1000;
      } else {
        var parent = fadeTarget.parentElement;
        parent.removeChild(fadeTarget);
        clearInterval(fadeEffect);
      }
  }, 100);
}