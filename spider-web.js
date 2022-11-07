function drawSpiderWeb() {
  const canvas = document.getElementById('spiderWebCanvas');
  
  if (canvas) {
    const isDarkMode =window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
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

    function drawBetweenBranches(theta) {
      const distanceBetweenBranches = 60;
      const nextAngle = theta + angleOfSections;

      for (let pointOnMainBranch = distanceBetweenBranches; pointOnMainBranch < distanceToEdge; pointOnMainBranch += distanceBetweenBranches) {
        const startX = theta > 180 ? -pointOnMainBranch : pointOnMainBranch;
        // y = mx + b where b is always 0 because the line always intersects the y axis at (0,0)
        const startY = Math.tan(theta) * startX + 0;

        console.log('t', theta, 'x', startX, 'y', startY)

        ctx.beginPath();
        ctx.arc(startX, startY, centerCircleSize, 0, twoPi);
        ctx.fillStyle = 'yellow';
        ctx.fill();
        // ctx.setTransform(1,0,0,1, startX, startY);
        // ctx.setLineDash(lineDash);
        // ctx.moveTo(startX, startY);
        // ctx.lineTo(endCoordinates, endCoordinates);
        // ctx.strokeStyle = 'yellow';//fillColor;
        // ctx.stroke();
      }
    }

    function drawMainBranches() {
      for (let theta = 0; theta <= 360; theta += angleOfSections) {
        const radian = twoPi * theta / 360;
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

        drawBetweenBranches(theta);
      }
    }
    
    drawMainBranches();
  }
  else {
    console.error('No canvas found!');
  }
}

window.onload = drawSpiderWeb;