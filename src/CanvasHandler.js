export class CanvasHandler {
      constructor(canvasId) {
          this.canvas = document.getElementById(canvasId);
          this.ctx = this.canvas.getContext('2d');
          this.offsetX = 20;
          this.offsetY = 10;
      }
  
      drawImage(imageUrl, x, y, width, height) {
          const image = new Image();
          image.src = imageUrl;
          image.onload = () => {
              this.ctx.drawImage(image, x, y, width, height);
          };
      }
  
      drawText(text, x, y, options) {
          const { font, fontSize, color, alignment, maxCharactersPerLine } = options;
          this.ctx.font = `${fontSize}px ${font}`;
          this.ctx.fillStyle = color;
          this.ctx.textAlign = alignment;
          let lines = [];
          let currentLine = '';
          const words = text.split(' ');
          for (const word of words) {
              if ((currentLine + word).length <= maxCharactersPerLine) {
                  currentLine += (currentLine === '' ? '' : ' ') + word;
              } else {
                  lines.push(currentLine);
                  currentLine = word;
              }
          }
          lines.push(currentLine);
  
          // Draw each line of text
          let yOffset = 0;
          for (const line of lines) {
              this.ctx.fillText(line, x, y + yOffset);
              yOffset += fontSize; // Adjust for line height
          }
  
      }
  
      drawCTA(text, x, y, options) {
          if (text == null || text == "") return;
          const { textColor, bgColor, fontSize = 30, wrapLength = 20, padding = 10, cornerRadius = 10 } = options;
      
          // Split text into lines based on wrapLength
          const words = text.split(' ');
          let lines = [];
          let currentLine = '';
          const ctx = this.ctx;
          ctx.font = `${fontSize}px Arial`;
          for (const word of words) {
              const testLine = currentLine + word + ' ';
              const metrics = ctx.measureText(testLine);
              const testWidth = metrics.width;
              if (testWidth > wrapLength && currentLine !== '') {
                  lines.push(currentLine);
                  currentLine = word + ' ';
              } else {
                  currentLine = testLine;
              }
          }
          lines.push(currentLine.trim());
      
          // Measure text width and height
          const textMetrics = ctx.measureText(lines[0]);
          const textHeight = textMetrics.actualBoundingBoxAscent;
          const textWidth = textMetrics.width;
      
          // Calculate the dimensions of the rectangle
          const rectWidth = textWidth + 2 * padding;
          const rectHeight = lines.length * fontSize + 2 * padding;
      
          // Draw circular bordered rectangle
          ctx.fillStyle = bgColor;
          ctx.strokeStyle = textColor;
          ctx.lineWidth = 2; // Border width
          ctx.beginPath();
          ctx.moveTo(x + cornerRadius, y);
          ctx.arcTo(x + rectWidth, y, x + rectWidth, y + rectHeight, cornerRadius);
          ctx.arcTo(x + rectWidth, y + rectHeight, x, y + rectHeight, cornerRadius);
          ctx.arcTo(x, y + rectHeight, x, y, cornerRadius);
          ctx.arcTo(x, y, x + rectWidth, y, cornerRadius);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
      
          // Set text color
          ctx.fillStyle = textColor;
      
          // Draw text with adjusted starting point
          let yOffset = padding + fontSize; // Adjust for padding and line height
          for (const line of lines) {
              ctx.fillText(line, x + padding, y + yOffset);
              yOffset += fontSize; // Adjust for line height
          }
      }
      
  
  }