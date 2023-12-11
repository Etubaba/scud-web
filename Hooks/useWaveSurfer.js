// import WaveSurfer from "wavesurfer.js";
import { useEffect, useState } from "react";

export const useWavesurfer = (containerRef, options) => {
  const [wavesurfer, setWavesurfer] = useState();

  useEffect(() => {
    if (!containerRef.current) return;

    const loadWaveSurfer = async () => {
      const { default: WaveSurfer } = await import("wavesurfer.js");
      const ws = WaveSurfer.create({
        container: containerRef.current,
        ...options
      });

      const { url } = options;
      ws.load(url);
      setWavesurfer(ws);
      //   return ws;
    };
    loadWaveSurfer();

    return () => {
      //   wavesurfer.destroy();
    };
  }, [options, containerRef]);
  return wavesurfer;
};
