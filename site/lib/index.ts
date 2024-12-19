import { generateRadixColors } from "./generateRadixColors";

type GeneratedColors = ReturnType<typeof generateRadixColors>;

interface GetColorScaleCssParams {
  isDarkMode: boolean;
  name: string;
  scale: GeneratedColors['accentScale'];
  scaleWideGamut: GeneratedColors['accentScaleWideGamut'];
  scaleAlpha: GeneratedColors['accentScaleAlpha'];
  scaleAlphaWideGamut: GeneratedColors['accentScaleAlphaWideGamut'];
  contrast: GeneratedColors['accentContrast'];
  surface: GeneratedColors['accentSurface'];
  surfaceWideGamut: GeneratedColors['accentSurfaceWideGamut'];
}

const DEFAULT_GRAY_COLOR = '#8B8D98';
const DEFAULT_LIGHT_BACKGROUND = '#FFFFFF';
const DEFAULT_DARK_BACKGROUND = '#111111';

const getColorScaleCss = ({
  isDarkMode,
  name,
  scale,
  scaleWideGamut,
  scaleAlpha,
  scaleAlphaWideGamut,
  contrast,
  surface,
  surfaceWideGamut,
}: GetColorScaleCssParams) => {
  const prefix = isDarkMode ? 'dark' : 'light';
  const selector = isDarkMode ? '.dark, .dark-theme' : ':root, .light, .light-theme';

  return `
:root {
  ${scale.map((value, index) => `--${prefix}-${name}-${index + 1}: ${value};`).join('\n  ')}

  ${scaleAlpha.map((value, index) => `--${prefix}-${name}-a${index + 1}: ${value};`).join('\n  ')}

  --${prefix}-${name}-contrast: ${contrast};
  --${prefix}-${name}-surface: ${surface};
  --${prefix}-${name}-indicator: ${scale[8]};
  --${prefix}-${name}-track: ${scale[8]};
}

@supports (color: color(display-p3 1 1 1)) {
  @media (color-gamut: p3) {
    :root {
      ${scaleWideGamut.map((value, index) => `--${prefix}-${name}-${index + 1}: ${value};`).join('\n      ')}

      ${scaleAlphaWideGamut
        .map((value, index) => `--${prefix}-${name}-a${index + 1}: ${value};`)
        .join('\n      ')}

      --${prefix}-${name}-contrast: ${contrast};
      --${prefix}-${name}-surface: ${surfaceWideGamut};
      --${prefix}-${name}-indicator: ${scaleWideGamut[8]};
      --${prefix}-${name}-track: ${scaleWideGamut[8]};
    }
  }
}

${selector} {
  ${scale.map((_, index) => `--${name}-${index + 1}: var(--${prefix}-${name}-${index + 1});`).join('\n  ')}
  ${scaleAlpha.map((_, index) => `--${name}-a${index + 1}: var(--${prefix}-${name}-a${index + 1});`).join('\n  ')}
  --${name}-contrast: var(--${prefix}-${name}-contrast);
  --${name}-surface: var(--${prefix}-${name}-surface);
  --${name}-indicator: var(--${prefix}-${name}-indicator);
  --${name}-track: var(--${prefix}-${name}-track);
}
  `.trim();
};

interface GenerateColorsCssParams {
  accent: string;
  gray?: string;
  name?: string;
}


export const generateColorsCss = ({
  accent,
  gray = DEFAULT_GRAY_COLOR,
  name = 'accent',
}: GenerateColorsCssParams) => {
  const lightColors = generateRadixColors({
    accent,
    gray,
    appearance: "light",
    background: DEFAULT_LIGHT_BACKGROUND,
  });

  const darkColors = generateRadixColors({
    accent,
    gray,
    appearance: "dark",
    background: DEFAULT_DARK_BACKGROUND,
  });

  const lightResult = getColorScaleCss({
    isDarkMode: false,
    name,
    contrast: lightColors.accentContrast,
    scale: lightColors.accentScale,
    scaleWideGamut: lightColors.accentScaleWideGamut,
    scaleAlpha: lightColors.accentScaleAlpha,
    scaleAlphaWideGamut: lightColors.accentScaleAlphaWideGamut,
    surface: lightColors.accentSurface,
    surfaceWideGamut: lightColors.accentSurfaceWideGamut,
  });

  const darkResult = getColorScaleCss({
    isDarkMode: true,
    name,
    contrast: darkColors.accentContrast,
    scale: darkColors.accentScale,
    scaleWideGamut: darkColors.accentScaleWideGamut,
    scaleAlpha: darkColors.accentScaleAlpha,
    scaleAlphaWideGamut: darkColors.accentScaleAlphaWideGamut,
    surface: darkColors.accentSurface,
    surfaceWideGamut: darkColors.accentSurfaceWideGamut,
  });

  return `${lightResult}\n\n${darkResult}\n`;
};
