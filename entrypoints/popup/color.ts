const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
const hexaColorRegex = /^#([A-Fa-f0-9]{8}|[A-Fa-f0-9]{4})$/;
const rgbColorRegex =
  /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/;
const rgbaColorRegex =
  /^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d(\.\d+)?|\.\d+)\s*\)$/;
const hslColorRegex =
  /^hsl\(\s*(\d{1,3})\s*,\s*(\d{1,3})%?\s*,\s*(\d{1,3})%?\s*\)$/;
const hslaColorRegex =
  /^hsla\(\s*(\d{1,3})\s*,\s*(\d{1,3})%?\s*,\s*(\d{1,3})%?\s*,\s*(\d(\.\d+)?|\.\d+)\s*\)$/;
const hsvColorRegex =
  /^hsv\(\s*(\d{1,3})\s*,\s*(\d{1,3})%?\s*,\s*(\d{1,3})%?\s*\)$/;
const hsvaColorRegex =
  /^hsva\(\s*(\d{1,3})\s*,\s*(\d{1,3})%?\s*,\s*(\d{1,3})%?\s*,\s*(\d(\.\d+)?|\.\d+)\s*\)$/;
const cmykColorRegex =
  /^cmyk\(\s*(\d{1,3})%?\s*,\s*(\d{1,3})%?\s*,\s*(\d{1,3})%?\s*,\s*(\d{1,3})%?\s*\)$/;
const cmykaColorRegex =
  /^cmyka\(\s*(\d{1,3})%?\s*,\s*(\d{1,3})%?\s*,\s*(\d{1,3})%?\s*,\s*(\d{1,3})%?\s*,\s*(\d(\.\d+)?|\.\d+)\s*\)$/;

const hexToRgbString = (hex: string) => {
  const result = hexColorRegex.exec(hex);
  if (!result) {
    throw new Error("Invalid HEX color");
  }
  const hexString = result[1];
  if (hexString.length === 3) {
    const r = parseInt(hexString[0], 16) * 17;
    const g = parseInt(hexString[1], 16) * 17;
    const b = parseInt(hexString[2], 16) * 17;
    return `rgb(${r}, ${g}, ${b})`;
  } else {
    const r = parseInt(hexString.slice(0, 2), 16);
    const g = parseInt(hexString.slice(2, 4), 16);
    const b = parseInt(hexString.slice(4, 6), 16);
    return `rgb(${r}, ${g}, ${b})`;
  }
};

const hslToRgbString = (hsl: string) => {
  const result = hslColorRegex.exec(hsl);
  if (!result) {
    throw new Error("Invalid HSL color");
  }
  const h = parseInt(result[1]) / 360;
  const s = parseInt(result[2]) / 100;
  const l = parseInt(result[3]) / 100;
  const r = l <= 0.5 ? l * (s + 1) : l + s - l * s;
  const g = l <= 0.5 ? l * (s + 1) - l * s : l + s - l * s;
  const b = l * 2 - r - g;
  return `rgb(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(
    b * 255
  )})`;
};

const hsvToRgbString = (hsv: string) => {
  const result = hsvColorRegex.exec(hsv);
  if (!result) {
    throw new Error("Invalid HSV color");
  }
  const h = parseInt(result[1]) / 360;
  const s = parseInt(result[2]) / 100;
  const v = parseInt(result[3]) / 100;
  const c = v * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = v - c;
  let r = 0;
  let g = 0;
  let b = 0;
  if (h >= 0 && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (h >= 60 && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (h >= 120 && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (h >= 180 && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (h >= 240 && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (h >= 300 && h < 360) {
    r = c;
    g = 0;
    b = x;
  }
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);
  return `rgb(${r}, ${g}, ${b})`;
};

const cmykToRgbString = (cmyk: string) => {
  const result = cmykColorRegex.exec(cmyk);
  if (!result) {
    throw new Error("Invalid CMYK color");
  }
  const c = parseInt(result[1]) / 100;
  const m = parseInt(result[2]) / 100;
  const y = parseInt(result[3]) / 100;
  const k = parseInt(result[4]) / 100;
  const r = 255 * (1 - c) * (1 - k);
  const g = 255 * (1 - m) * (1 - k);
  const b = 255 * (1 - y) * (1 - k);
  return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
};

const rgbToHex = (rgb: string) => {
  const result = rgbColorRegex.exec(rgb);
  if (!result) {
    throw new Error("Invalid RGB color");
  }
  const r = parseInt(result[1]);
  const g = parseInt(result[2]);
  const b = parseInt(result[3]);
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
};

const rgbToHslString = (rgb: string) => {
  const result = rgbColorRegex.exec(rgb);
  if (!result) {
    throw new Error("Invalid RGB color");
  }
  const r = parseInt(result[1]) / 255;
  const g = parseInt(result[2]) / 255;
  const b = parseInt(result[3]) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0;
  let s = 0;
  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(
    l * 100
  )}%)`;
};

const rgbToHsvString = (rgb: string) => {
  const result = rgbColorRegex.exec(rgb);
  if (!result) {
    throw new Error("Invalid RGB color");
  }
  const r = parseInt(result[1]) / 255;
  const g = parseInt(result[2]) / 255;
  const b = parseInt(result[3]) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const v = max;
  const d = max - min;
  let s = 0;
  let h = 0;
  if (max === 0) {
    s = 0;
  } else {
    s = d / max;
  }
  if (max === min) {
    h = 0; // achromatic
  } else {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return `hsv(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(
    v * 100
  )}%)`;
};

const rgbToCmykString = (rgb: string) => {
  const result = rgbColorRegex.exec(rgb);
  if (!result) {
    throw new Error("Invalid RGB color");
  }
  const r = parseInt(result[1]) / 255;
  const g = parseInt(result[2]) / 255;
  const b = parseInt(result[3]) / 255;
  const k = 1 - Math.max(r, g, b);
  const c = (1 - r - k) / (1 - k) || 0;
  const m = (1 - g - k) / (1 - k) || 0;
  const y = (1 - b - k) / (1 - k) || 0;
  return `cmyk(${Math.round(c * 100)}%, ${Math.round(m * 100)}%, ${Math.round(
    y * 100
  )}%, ${Math.round(k * 100)}%)`;
};

const hexaToRgbaString = (hexa: string) => {
  const result = hexaColorRegex.exec(hexa);
  if (!result) {
    throw new Error("Invalid HEXA color");
  }
  const hexaString = result[1];
  if (hexaString.length === 4) {
    const r = parseInt(hexaString[0], 16) * 17;
    const g = parseInt(hexaString[1], 16) * 17;
    const b = parseInt(hexaString[2], 16) * 17;
    const a = parseInt(hexaString[3], 16) / 255;
    return `rgba(${r}, ${g}, ${b}, ${a.toFixed(2)})`;
  } else {
    const r = parseInt(hexaString.slice(0, 2), 16);
    const g = parseInt(hexaString.slice(2, 4), 16);
    const b = parseInt(hexaString.slice(4, 6), 16);
    const a = parseInt(hexaString.slice(6, 8), 16) / 255;
    return `rgba(${r}, ${g}, ${b}, ${a.toFixed(2)})`;
  }
};

const hslaToRgbaString = (hsla: string) => {
  const result = hslaColorRegex.exec(hsla);
  if (!result) {
    throw new Error("Invalid HSLA color");
  }
  const h = parseInt(result[1]) / 360;
  const s = parseInt(result[2]) / 100;
  const l = parseInt(result[3]) / 100;
  const a = parseFloat(result[4]);
  const r = l <= 0.5 ? l * (s + 1) : l + s - l * s;
  const g = l <= 0.5 ? l * (s + 1) - l * s : l + s - l * s;
  const b = l * 2 - r - g;
  return `rgba(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(
    b * 255
  )}, ${a})`;
};

const hsvaToRgbaString = (hsva: string) => {
  const result = hsvaColorRegex.exec(hsva);
  if (!result) {
    throw new Error("Invalid HSVA color");
  }
  const h = parseInt(result[1]) / 360;
  const s = parseInt(result[2]) / 100;
  const v = parseInt(result[3]) / 100;
  const a = parseFloat(result[4]);
  const c = v * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = v - c;
  let r = 0;
  let g = 0;
  let b = 0;
  if (h >= 0 && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (h >= 60 && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (h >= 120 && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (h >= 180 && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (h >= 240 && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (h >= 300 && h < 360) {
    r = c;
    g = 0;
    b = x;
  }
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
};

const cmykaToRgbaString = (cmyka: string) => {
  const result = cmykaColorRegex.exec(cmyka);
  if (!result) {
    throw new Error("Invalid CMYKA color");
  }
  const c = parseInt(result[1]) / 100;
  const m = parseInt(result[2]) / 100;
  const y = parseInt(result[3]) / 100;
  const k = parseInt(result[4]) / 100;
  const a = parseFloat(result[5]);
  const r = 255 * (1 - c) * (1 - k);
  const g = 255 * (1 - m) * (1 - k);
  const b = 255 * (1 - y) * (1 - k);
  return `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, ${a})`;
};

const rgbaToHexaString = (rgba: string) => {
  const result = rgbaColorRegex.exec(rgba);
  if (!result) {
    throw new Error("Invalid RGBA color");
  }
  const r = parseInt(result[1]);
  const g = parseInt(result[2]);
  const b = parseInt(result[3]);
  const a = parseFloat(result[4]);
  return `#${r.toString(16).padStart(2, "0")}${g
    .toString(16)
    .padStart(2, "0")}${b.toString(16).padStart(2, "0")}${Math.round(a * 255)
    .toString(16)
    .padStart(2, "0")}`;
};

const rgbaToHslaString = (rgba: string) => {
  const result = rgbaColorRegex.exec(rgba);
  if (!result) {
    throw new Error("Invalid RGBA color");
  }
  const r = parseInt(result[1]) / 255;
  const g = parseInt(result[2]) / 255;
  const b = parseInt(result[3]) / 255;
  const a = parseFloat(result[4]);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0;
  let s = 0;
  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return `hsla(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(
    l * 100
  )}%, ${a})`;
};

const rgbaToHsvaString = (rgba: string) => {
  const result = rgbaColorRegex.exec(rgba);
  if (!result) {
    throw new Error("Invalid RGBA color");
  }
  const r = parseInt(result[1]) / 255;
  const g = parseInt(result[2]) / 255;
  const b = parseInt(result[3]) / 255;
  const a = parseFloat(result[4]);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const v = max;
  const d = max - min;
  let s = 0;
  let h = 0;
  if (max === 0) {
    s = 0;
  } else {
    s = d / max;
  }
  if (max === min) {
    h = 0; // achromatic
  } else {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return `hsva(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(
    v * 100
  )}%, ${a})`;
};

const rgbaToCmykaString = (rgba: string) => {
  const result = rgbaColorRegex.exec(rgba);
  if (!result) {
    throw new Error("Invalid RGBA color");
  }
  const r = parseInt(result[1]) / 255;
  const g = parseInt(result[2]) / 255;
  const b = parseInt(result[3]) / 255;
  const a = parseFloat(result[4]);
  const k = 1 - Math.max(r, g, b);
  const c = (1 - r - k) / (1 - k) || 0;
  const m = (1 - g - k) / (1 - k) || 0;
  const y = (1 - b - k) / (1 - k) || 0;
  return `cmyka(${Math.round(c * 100)}%, ${Math.round(m * 100)}%, ${Math.round(
    y * 100
  )}%, ${Math.round(k * 100)}%, ${a})`;
}

export const colorConverter = {
  hexColorRegex,
  hexaColorRegex,
  rgbColorRegex,
  rgbaColorRegex,
  hslColorRegex,
  hslaColorRegex,
  hsvColorRegex,
  hsvaColorRegex,
  cmykColorRegex,
  cmykaColorRegex,
  hexToRgbString,
  hslToRgbString,
  hsvToRgbString,
  cmykToRgbString,
  hexaToRgbaString,
  hslaToRgbaString,
  hsvaToRgbaString,
  cmykaToRgbaString,
  rgbToHex,
  rgbToHslString,
  rgbToHsvString,
  rgbToCmykString,
  rgbaToHexaString,
  rgbaToHslaString,
  rgbaToHsvaString,
  rgbaToCmykaString,
};
