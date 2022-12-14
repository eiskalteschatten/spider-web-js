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

  const numberOfMainBranches = 9;
  const twoPi = Math.PI * 2;
  const angleOfSections = twoPi / numberOfMainBranches;

  function drawBranches() {
    const radius = 90;

    ctx.strokeStyle = isDarkMode ? 'white' : 'black';
    ctx.setLineDash([2, 4]);

    for (let radian = 0; radian < twoPi; radian += angleOfSections) {
      const x = Math.cos(radian);
      const y = Math.sin(radian);

      ctx.beginPath();
      ctx.setTransform(1,0,0,1, centerX, centerY);
      ctx.moveTo(0, 0);
      ctx.lineTo(x * radius * distanceToEdge, y * radius * distanceToEdge);
      ctx.stroke();
      ctx.closePath();

      for (let radiusFromOrigin = radius; radiusFromOrigin < distanceToEdge; radiusFromOrigin += radius) {
        const startX = radiusFromOrigin * x;
        const startY = radiusFromOrigin * y;

        const endRadian = radian + angleOfSections;
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
