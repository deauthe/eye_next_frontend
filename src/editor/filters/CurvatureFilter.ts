import { fabric } from "fabric";

interface CurvatureOptions {
  intensity?: number;
  direction?: "horizontal" | "vertical" | "radial" | "custom";
  perspective?: number;
  waveform?: "sine" | "quad" | "cubic" | "custom";
  adaptiveEdges?: boolean;
  meshDensity?: number;
}

interface FilterOptions {
  imageData: ImageData;
}

export class CurvatureFilter extends fabric.Image.filters.BaseFilter {
  declare intensity: number;
  declare direction: string;
  declare perspective: number;
  declare waveform: string;
  declare adaptiveEdges: boolean;
  declare meshDensity: number;

  static type = "Curvature";

  constructor(options: CurvatureOptions = {}) {
    super();
    this.intensity = options.intensity ?? 0.5;
    this.direction = options.direction ?? "horizontal";
    this.perspective = options.perspective ?? 0.3;
    this.waveform = options.waveform ?? "sine";
    this.adaptiveEdges = options.adaptiveEdges ?? true;
    this.meshDensity = options.meshDensity ?? 0.5;
  }

  applyTo2d(options: FilterOptions): void {
    const { imageData } = options;
    const { data, width, height } = imageData;

    // Create temporary canvas for mesh warping
    const tempCanvas = document.createElement("canvas");
    const tempCtx = tempCanvas.getContext("2d");
    if (!tempCtx) return;

    tempCanvas.width = width;
    tempCanvas.height = height;

    // Draw original image data
    tempCtx.putImageData(imageData, 0, 0);

    // Calculate mesh grid size based on density
    const gridSize = Math.max(5, Math.floor(20 * this.meshDensity));
    const xSegments = Math.ceil(width / gridSize);
    const ySegments = Math.ceil(height / gridSize);

    // Create mesh points
    const meshPoints = this.createMeshPoints(
      width,
      height,
      xSegments,
      ySegments
    );

    // Apply curvature transformation
    this.applyMeshDeformation(meshPoints, width, height);

    // Create output canvas
    const outputCanvas = document.createElement("canvas");
    const outputCtx = outputCanvas.getContext("2d");
    if (!outputCtx) return;

    outputCanvas.width = width;
    outputCanvas.height = height;

    // Render warped mesh
    this.renderMesh(tempCanvas, outputCanvas, meshPoints, xSegments, ySegments);

    // Copy result back to original imageData
    const outputData = outputCtx.getImageData(0, 0, width, height);
    for (let i = 0; i < data.length; i++) {
      data[i] = outputData.data[i];
    }
  }

  private createMeshPoints(
    width: number,
    height: number,
    xSegments: number,
    ySegments: number
  ) {
    const points = [];
    const xStep = width / xSegments;
    const yStep = height / ySegments;

    for (let y = 0; y <= ySegments; y++) {
      for (let x = 0; x <= xSegments; x++) {
        points.push({
          x: x * xStep,
          y: y * yStep,
          originalX: x * xStep,
          originalY: y * yStep,
        });
      }
    }

    return points;
  }

  private applyMeshDeformation(points: any[], width: number, height: number) {
    const centerX = width / 2;
    const centerY = height / 2;

    points.forEach((point) => {
      let displacement = 0;
      let normalizedDist = 0;

      switch (this.direction) {
        case "horizontal":
          normalizedDist = (point.y - centerY) / height;
          displacement = this.calculateDisplacement(normalizedDist);
          point.x += displacement * width * this.intensity;
          break;

        case "vertical":
          normalizedDist = (point.x - centerX) / width;
          displacement = this.calculateDisplacement(normalizedDist);
          point.y += displacement * height * this.intensity;
          break;

        case "radial":
          const dx = point.x - centerX;
          const dy = point.y - centerY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          normalizedDist =
            distance / Math.sqrt(width * width + height * height);
          displacement = this.calculateDisplacement(normalizedDist);

          const angle = Math.atan2(dy, dx);
          point.x += Math.cos(angle) * displacement * width * this.intensity;
          point.y += Math.sin(angle) * displacement * height * this.intensity;
          break;
      }

      // Apply perspective transformation
      if (this.perspective > 0) {
        const perspectiveScale = 1 + (point.y / height) * this.perspective;
        point.x = centerX + (point.x - centerX) * perspectiveScale;
      }

      // Apply adaptive edges
      if (this.adaptiveEdges) {
        const edgeFactor = this.calculateEdgeFactor(point, width, height);
        point.x = point.originalX + (point.x - point.originalX) * edgeFactor;
        point.y = point.originalY + (point.y - point.originalY) * edgeFactor;
      }
    });
  }

  private calculateDisplacement(normalizedDist: number): number {
    switch (this.waveform) {
      case "sine":
        return Math.sin(normalizedDist * Math.PI);
      case "quad":
        return normalizedDist * normalizedDist;
      case "cubic":
        return normalizedDist * normalizedDist * normalizedDist;
      case "custom":
        // Can be extended for custom waveforms
        return normalizedDist;
      default:
        return normalizedDist;
    }
  }

  private calculateEdgeFactor(
    point: any,
    width: number,
    height: number
  ): number {
    const edgeDistance = Math.min(
      point.x / width,
      point.y / height,
      (width - point.x) / width,
      (height - point.y) / height
    );
    return CurvatureFilter.smoothStep(0, 0.2, edgeDistance);
  }

  private renderMesh(
    sourceCanvas: HTMLCanvasElement,
    targetCanvas: HTMLCanvasElement,
    points: any[],
    xSegments: number,
    ySegments: number
  ) {
    const ctx = targetCanvas.getContext("2d");
    if (!ctx) return;

    const width = targetCanvas.width;
    const height = targetCanvas.height;

    // Clear the canvas
    ctx.clearRect(0, 0, width, height);

    // For each grid cell
    for (let y = 0; y < ySegments; y++) {
      for (let x = 0; x < xSegments; x++) {
        // Get the four corners of the grid cell
        const topLeft = points[y * (xSegments + 1) + x];
        const topRight = points[y * (xSegments + 1) + x + 1];
        const bottomLeft = points[(y + 1) * (xSegments + 1) + x];
        const bottomRight = points[(y + 1) * (xSegments + 1) + x + 1];

        const srcX = x * (width / xSegments);
        const srcY = y * (height / ySegments);
        const srcWidth = width / xSegments;
        const srcHeight = height / ySegments;

        // Draw the warped grid cell
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(topLeft.x, topLeft.y);
        ctx.lineTo(topRight.x, topRight.y);
        ctx.lineTo(bottomRight.x, bottomRight.y);
        ctx.lineTo(bottomLeft.x, bottomLeft.y);
        ctx.closePath();
        ctx.clip();

        // Transform the image piece
        const dx1 = topRight.x - topLeft.x;
        const dy1 = topRight.y - topLeft.y;
        const dx2 = bottomLeft.x - topLeft.x;
        const dy2 = bottomLeft.y - topLeft.y;

        const determinant = dx1 * dy2 - dx2 * dy1;

        if (Math.abs(determinant) > 0.01) {
          const matrix = [
            dx1 / srcWidth,
            dy1 / srcWidth,
            0,
            dx2 / srcHeight,
            dy2 / srcHeight,
            0,
            topLeft.x,
            topLeft.y,
            1,
          ];

          ctx.transform(
            matrix[0],
            matrix[1],
            matrix[3],
            matrix[4],
            matrix[6],
            matrix[7]
          );

          ctx.drawImage(
            sourceCanvas,
            srcX,
            srcY,
            srcWidth,
            srcHeight,
            0,
            0,
            srcWidth,
            srcHeight
          );
        }

        ctx.restore();
      }
    }
  }

  static smoothStep(min: number, max: number, value: number): number {
    const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
    return x * x * (3 - 2 * x);
  }
}
