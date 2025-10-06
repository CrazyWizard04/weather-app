export function drawMoon(
  canvas: HTMLCanvasElement | null,
  img: CanvasImageSource,
  phase: number,
) {
  if (!canvas) return;
  const width = canvas.width;
  const height = canvas.height;
  const radius = canvas.width / 2;

  // Creating the 2D Context
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // Drawing a Moon picture as base
  const drawBase = () => {
    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, 0, 0, width, height);
  };

  const drawPhase = (scalePhase: number) => {
    // Creating a new Canvas for the Moon Phases
    const offscreen = document.createElement("canvas");
    offscreen.width = canvas.width;
    offscreen.height = canvas.height;

    // Creating the 2D Context for the Moon Phases
    const offCtx = offscreen.getContext("2d");
    if (!offCtx) return;

    // Drawing a circle for the shadow
    offCtx.beginPath();
    offCtx.arc(radius, radius, radius, -Math.PI / 2, Math.PI / 2, true);
    offCtx.fillStyle = "rgba(0, 0, 0, 0.8)";
    offCtx.fill();

    // Rotating and scaling the phase
    offCtx.translate(radius, radius);
    offCtx.scale(scalePhase, 1);
    offCtx.translate(-radius, -radius);

    const waxGibbous = 0.25 < phase && phase < 0.5; // If the phase is a Waxing Gibbous
    const wanGibbous = 0.5 < phase && phase < 0.75; // If the phase is a Waning Gibbous

    // Cutting of the shadow or continue drawing the shadow using another circle
    offCtx.globalCompositeOperation =
      waxGibbous || wanGibbous ? "destination-out" : "source-over";
    offCtx.beginPath();
    offCtx.arc(radius, radius, radius, -Math.PI / 2, Math.PI / 2, true);
    offCtx.fillStyle =
      waxGibbous || wanGibbous ? "rgba(0, 0, 0, 1)" : "rgba(0, 0, 0, 0.8)";
    offCtx.fill();

    // Drawing the phase
    ctx.drawImage(offscreen, 0, 0);
  };

  ctx.save();
  ctx.clearRect(0, 0, width, height);

  if (phase <= 0.5) {
    // If the phase is waxing
    drawBase();
    drawPhase(4 * phase - 1);
  } else {
    // Else if waning
    drawBase();

    ctx.translate(radius, radius);
    ctx.rotate(Math.PI);
    ctx.translate(-radius, -radius);

    drawPhase(4 * (1 - phase) - 1);

    ctx.restore();
  }

  ctx.restore();
}
