import * as THREE from "three";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function hexToThreeJSVector4(hexColor: string) {
  if (hexColor[0] === "#") {
    hexColor = hexColor.slice(1);
  }

  const r = parseInt(hexColor.slice(0, 2), 16) / 255;
  const g = parseInt(hexColor.slice(2, 4), 16) / 255;
  const b = parseInt(hexColor.slice(4, 6), 16) / 255;

  let a = 1.0;
  if (hexColor.length === 8) {
    a = parseInt(hexColor.slice(6, 8), 16) / 255;
  }

  const color = new THREE.Vector4(r, g, b, a);

  return color;
}


function getFile(url: string | URL) {
  let httpRequest = new XMLHttpRequest();
  httpRequest.open("GET", url, false);
  httpRequest.send();
  if (httpRequest.status == 200) return httpRequest.responseText;
  else return "";
}

export function resolveLygia(lines: string | string[]) {
  if (!Array.isArray(lines)) {
    lines = lines.split(/\r?\n/);
  }

  let src = "";
  lines.forEach((line, _) => {
    const line_trim = line.trim();
    if (line_trim.startsWith('#include "lygia')) {
      let include_url = line_trim.substring(15);
      include_url = "https://lygia.xyz" + include_url.replace(/\"|\;|\s/g, "");
      src += getFile(include_url) + "\n";
    } else {
      src += line + "\n";
    }
  });

  return src;
}
