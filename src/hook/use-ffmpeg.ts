import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';
import { useState, useRef } from 'react';

export function useFFmpeg() {
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const ffmpegRef = useRef(new FFmpeg());

  const load = async () => {
    const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd';
    const ffmpeg = ffmpegRef.current;
    ffmpeg.on('log', ({ message }) => {
      console.log(message);
    });
    ffmpeg.on('progress', ({ progress }) => {
        setProgress(progress * 100);
    });
    // toBlobURL is used to bypass CORS issues
    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
      wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
    });
    setLoaded(true);
  };

  const clipVideo = async (inputUrl: string, startTime: number, duration: number) => {
    if (!loaded) await load();
    const ffmpeg = ffmpegRef.current;
    const inputName = 'input.mp4';
    const outputName = 'output.mp4';

    await ffmpeg.writeFile(inputName, await fetchFile(inputUrl));

    // Simple clip and resize to 9:16 (vertical)
    // We crop the center 9:16 area from a 16:9 video
    // Formula: crop=ih*9/16:ih
    // We also burn subtitles if they were provided
    await ffmpeg.exec([
      '-i', inputName,
      '-ss', startTime.toString(),
      '-t', duration.toString(),
      '-vf', 'crop=ih*9/16:ih,scale=720:1280,drawtext=text=\'ClipForge AI\':fontcolor=white:fontsize=24:box=1:boxcolor=black@0.5:boxborderw=5:x=(w-text_w)/2:y=h-100',
      '-c:a', 'copy',
      outputName
    ]);

    const data = await ffmpeg.readFile(outputName);
    return new Blob([data as any], { type: 'video/mp4' });
  };

  return { loaded, progress, load, clipVideo };
}
