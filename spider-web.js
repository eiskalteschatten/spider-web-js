function drawSpiderWeb() {
  const canvas = document.getElementById('spiderWebCanvas');
  
  if (!canvas) {
    throw new Error('No canvas found!');
  }

  const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const distanceToEdge = Math.min(centerX, centerY)
  
  const ctx = canvas.getContext('2d');
      
  const numberOfMainBranches = 8;
  const angleOfSections = 360 / numberOfMainBranches;

  const getRadian = theta => Math.PI * theta / 180;
  
  function drawBranches() {
    const radius = 90;

    ctx.strokeStyle = isDarkMode ? 'white' : 'black';
    ctx.setLineDash([2, 4]);

    for (let theta = 0; theta < 360; theta += angleOfSections) {
      const radian = getRadian(theta);
      const x = Math.cos(radian);
      const y = Math.sin(radian);
      
      ctx.beginPath();
      ctx.setTransform(1,0,0,1, centerX, centerY);
      ctx.rotate(radian);
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.closePath();

      for (let radiusFromOrigin = radius; radiusFromOrigin < distanceToEdge; radiusFromOrigin += radius) {
        const startX = radiusFromOrigin * x;
        const startY = radiusFromOrigin * y;
        
        const endRadian = getRadian(theta + angleOfSections);
        const endX = radiusFromOrigin * Math.cos(endRadian);
        const endY = radiusFromOrigin * Math.sin(endRadian);
        
        ctx.beginPath();
        ctx.setTransform(1,0,0,1, centerX, centerY);
        ctx.bezierCurveTo(startX, startY, 0, 0, endX, endY);
        ctx.stroke();
        ctx.closePath();
      }
    }
  }

  drawBranches();
}

window.onload = drawSpiderWeb;
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', drawSpiderWeb);