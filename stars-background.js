document.addEventListener('DOMContentLoaded', function() {
  const canvas = document.createElement('canvas');
  
  Object.assign(canvas.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100vw',
      height: '100vh',
      zIndex: '0', 
      pointerEvents: 'none'
  });
  
  document.body.insertBefore(canvas, document.body.firstChild);
  const ctx = canvas.getContext('2d');
  
  function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createStars();
  }
  
  // Star array and configuration
  let stars = [];
  const starCount = 75;
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  
  function createStars() {
      stars = [];
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      for (let i = 0; i < starCount; i++) {
          stars.push({
              x: Math.random() * width,
              y: Math.random() * height,
              size: Math.random() * 2.5 + 1.5,
              opacity: Math.random() * 0.6 + 0.4,
              speed: Math.random() * 0.05 + 0.01
          });
      }
  }
  
  function updateStars() {
      const height = window.innerHeight;
      const width = window.innerWidth;
      
      stars.forEach(star => {
          star.y += star.speed;
        
          if (star.y > height) {
              star.y = 0;
              star.x = Math.random() * width;
          }
      });
  }
  
  function drawStars() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      stars.forEach(star => {
          ctx.fillStyle = `rgba(0, 0, 0, ${star.opacity})`;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
          ctx.fill();
          
          const dx = mouseX - star.x;
          const dy = mouseY - star.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 200) {
              const lineOpacity = 0.8 * (1 - distance / 200);
              ctx.strokeStyle = `rgba(0, 0, 0, ${lineOpacity})`;
              ctx.lineWidth = 0.8;
              ctx.beginPath();
              ctx.moveTo(star.x, star.y);
              ctx.lineTo(mouseX, mouseY);
              ctx.stroke();
          }
      });
  }
  
  function animate() {
      updateStars();
      drawStars();
      requestAnimationFrame(animate);
  }
  
  // Track mouse movement
  document.addEventListener('mousemove', function(e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
  });
  
  window.addEventListener('resize', resizeCanvas);
  
  resizeCanvas();
  animate();
  
  document.addEventListener('touchmove', function(e) {
      if (e.touches && e.touches[0]) {
          mouseX = e.touches[0].clientX;
          mouseY = e.touches[0].clientY;
          e.preventDefault();
      }
  });
  mouseX = window.innerWidth / 2;
  mouseY = window.innerHeight / 2;
});