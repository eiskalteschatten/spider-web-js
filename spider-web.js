function drawSpiderWeb() {
  const canvas = document.getElementById('spiderWebCanvas');
  
  if (canvas) {
    const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const fillColor = isDarkMode ? 'white' : 'black';
    const twoPi = Math.PI * 2;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const distanceToEdge = Math.min(centerX, centerY)
    const centerCircleSize = 4;
    
    const ctx = canvas.getContext('2d');
        
    ctx.arc(centerX, centerY, centerCircleSize, 0, twoPi);
    ctx.fillStyle = fillColor;
    ctx.fill();
    
    const numberOfMainBranches = 8;
    const angleOfSections = 360 / numberOfMainBranches;
    const lineDash = [2, 5];

    const getRadian = theta => twoPi * theta / 360;
    
    function drawMainBranches() {
      for (let theta = 0; theta < 360; theta += angleOfSections) {
        const radian = getRadian(theta);
        const x = Math.cos(radian);
        const y = Math.sin(radian) * -1;

        ctx.beginPath();
        ctx.setTransform(1,0,0,1, centerX, centerY);
        ctx.rotate(radian);
        ctx.setLineDash(lineDash);
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(x, y);
        ctx.strokeStyle = fillColor;
        ctx.stroke();
        ctx.closePath();
      }
    }

    function drawBetweenBranches() {
      const radius = 80;
      
      for (let radiusFromOrigin = radius; radiusFromOrigin < distanceToEdge; radiusFromOrigin += radius) {
        for (let theta = 0; theta < 360; theta += angleOfSections) {
          const startRadian = getRadian(theta);
          const startX = radiusFromOrigin * Math.cos(startRadian);
          const startY = radiusFromOrigin * Math.sin(startRadian);
          
          const endRadian = getRadian(theta + angleOfSections);
          const endX = radiusFromOrigin * Math.cos(endRadian);
          const endY = radiusFromOrigin * Math.sin(endRadian);

          ctx.beginPath();
          ctx.setTransform(1,0,0,1, centerX, centerY);
          ctx.bezierCurveTo(startX, startY, 0, 0, endX, endY);
          ctx.strokeStyle = fillColor;
          ctx.stroke();
          ctx.closePath();
        }
      }
    }

    drawMainBranches();
    drawBetweenBranches();
  }
  else {
    console.error('No canvas found!');
  }
}

window.onload = drawSpiderWeb;
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', drawSpiderWeb);