import { css, FlattenSimpleInterpolation } from "styled-components";
import { theme } from "styles/theme";

type TBreakpoints = typeof theme.breakpoints;
const breakpoints: Record<keyof TBreakpoints, string> = theme.breakpoints;

type mediaType = Record<
  keyof TBreakpoints,
  (...args: [TemplateStringsArray]) => FlattenSimpleInterpolation
>;

export const media = Object.keys(breakpoints).reduce((accumulator: mediaType, label: string) => {
  accumulator[label as keyof TBreakpoints] = (...args: [TemplateStringsArray]) => css`
    @media (min-width: ${breakpoints[label as keyof TBreakpoints]}) {
      ${css(...args)};
    }
  `;

  return accumulator;
}, {} as mediaType);
