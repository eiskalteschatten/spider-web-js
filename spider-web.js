function drawSpiderWeb() {
  const canvas = document.getElementById('spiderWebCanvas');

  if (canvas) {
    const context = canvas.getContext('2d');
    context.beginPath();
    context.moveTo(20, 20);
    context.lineTo(20, 100);
    context.lineTo(70, 100);
    context.stroke();
  }
}

window.onload = drawSpiderWeb;