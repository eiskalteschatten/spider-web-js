function drawSpiderWeb() {
  const canvas = document.getElementById('spiderWebCanvas');

  if (canvas) {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const ctx = canvas.getContext('2d');
    
    // context.beginPath();
    // context.moveTo(20, 20);
    // context.lineTo(20, 100);
    // context.lineTo(70, 100);
    // context.stroke();

    ctx.fillStyle = 'Black';
    ctx.arc(centerX, centerY, 50, 0, 2 * Math.PI);
    ctx.fill();
  }
}

window.onload = drawSpiderWeb;