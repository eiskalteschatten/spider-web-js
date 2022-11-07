function drawSpiderWeb() {
  const canvas = document.getElementById('spiderWebCanvas');
  
  if (canvas) {
    const ctx = canvas.getContext('2d');
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    const twoPi = Math.PI * 2;
    const centerCircleSize = 8;
    
    ctx.fillStyle = 'black';
    ctx.arc(centerX, centerY, centerCircleSize, 0, twoPi);
    ctx.fill();
    
    const numberOfLegs = 8;
    const angleOfSections = 360 / numberOfLegs;
    
    for (let theta = 0; theta <= 360; theta += angleOfSections) {
      const radian = twoPi * theta / 360;
      const x = Math.cos(radian);
      const y = Math.sin(radian) * -1;

      ctx.beginPath();
      ctx.setTransform(1,0,0,1, centerX, centerY);
      ctx.rotate(radian);
      ctx.setLineDash([2, 5]);
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  }
}

window.onload = drawSpiderWeb;