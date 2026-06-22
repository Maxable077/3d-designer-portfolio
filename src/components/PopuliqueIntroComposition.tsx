import { AbsoluteFill, Easing, Img, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

type PopuliqueIntroCompositionProps = {
  reduceMotion?: boolean;
};

const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

function PopuliqueLockup() {
  return (
    <Img
      src="/populique-lockup-primary.svg"
      style={{ display: "block", height: "100%", width: "100%", objectFit: "contain" }}
    />
  );
}

export function PopuliqueIntroComposition({ reduceMotion = false }: PopuliqueIntroCompositionProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const at = (seconds: number) => seconds * fps;
  const easeOut = Easing.bezier(0.16, 1, 0.3, 1);
  const focusEase = Easing.bezier(0.76, 0, 0.24, 1);

  const intro = reduceMotion
    ? 1
    : interpolate(frame, [at(0), at(0.7)], [0, 1], {
        ...clamp,
        easing: easeOut,
      });
  const focus = reduceMotion
    ? 0
    : interpolate(frame, [at(0.95), at(2.45)], [0, 1], {
        ...clamp,
        easing: focusEase,
      });
  const whiteFlash = reduceMotion
    ? 0
    : interpolate(frame, [at(2.28), at(2.82)], [0, 1], {
        ...clamp,
        easing: Easing.in(Easing.cubic),
      });
  const shine = reduceMotion
    ? 0
    : interpolate(frame, [at(0.45), at(1.45)], [-130, 145], {
        ...clamp,
        easing: Easing.bezier(0.45, 0, 0.55, 1),
      });

  const logoScale = interpolate(focus, [0, 1], [1, 18], clamp);
  const logoX = interpolate(focus, [0, 1], [0, -92], clamp);
  const logoOpacity = interpolate(whiteFlash, [0, 0.82, 1], [1, 0.64, 0], clamp);
  const panelOpacity = interpolate(whiteFlash, [0, 1], [0.76, 0], clamp);

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        background: "#fbf9f5",
        display: "flex",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          height: 150,
          width: 586,
        }}
      >
        <PopuliqueLockup />
      </div>
    </AbsoluteFill>
  );
}
