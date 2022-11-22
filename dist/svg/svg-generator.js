"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const badge_width_1 = require("../utils/badge-width");
const hex_color_1 = require("../utils/hex-color");
class SvgGenerator {
    constructor(card) {
        /**
         * Generates the SVG card from the Card
         * variable passed in the constructor.
         *
         * @returns {string} The generated raw SVG.
         */
        this.toString = () => {
            return `
      <svg
        width="${this.width}"
        height="${this.height}"
        viewBox="0 0 ${this.width} ${this.height}"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        role="img"
        aria-label="My Tech Stack"
      >
        <title>${this.card.getTitle()}</title>

        <rect
          x="0.5"
          y="0.5"
          rx="4.5"
          height="${this.height - 1}"
          stroke="${this.card.getTheme().borderColor}"
          width="${this.width - 1}"
          fill="${this.card.getTheme().backgroundColor}"
          stroke-opacity="1"
        />

        <g transform="translate(25, 35)">
          <text x="0" y="0" class="header">${this.card.getTitle()}</text>
        </g>

        ${this.generateLines()}

        <style>
          .header {
            font: 600 18px 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            fill: ${this.card.getTheme().titleColor};
          }
        </style>
      </svg>`;
        };
        this.generateLines = () => {
            let res = "";
            for (const line of this.card.getLinesMap()) {
                res += this.createLine(line[1], line[0]);
            }
            return res;
        };
        this.createLine = (badges, lineNumber) => {
            // the first line is 35
            // each additional line increases this by 35
            const translateY = 35 + (lineNumber - 1) * 35;
            let line = `<g transform="translate(25, ${translateY})">`;
            let leftPadding = 0;
            for (const badge of badges) {
                line += this.createBadge(badge, leftPadding);
                leftPadding += 10 + (0, badge_width_1.badgeWidth)(badge.label);
            }
            line += "</g>";
            return line;
        };
        this.createBadge = (badge, leftPadding) => {
            const badgeColor = (0, hex_color_1.formatHexColor)(this.card.getTheme().badgeColor);
            return `
      <image 
        x="0" 
        y="15" 
        transform="translate(${leftPadding}, 0)"
        xlink:href="https://img.shields.io/badge/${badge.label}-${badgeColor}.svg?style=for-the-badge&amp;logo=${badge.logoName}&amp;logoColor=${(0, hex_color_1.formatHexColor)(badge.logoColor)}&amp;logoWidth=16" 
      />
    `;
        };
        this.card = card;
        this.width = 495;
        // the base (line == 1) height is 100
        // each additional line increases the height by 35
        this.height = 100 + (card.getLineCount() - 1) * 35;
    }
}
exports.default = SvgGenerator;
