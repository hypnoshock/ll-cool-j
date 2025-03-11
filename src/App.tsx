import { useCallback, useEffect, useRef, useState } from "react";
import { alphabetTimings } from "./alphabet-timings";
import "./App.css";

function App() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [speechTxt, setSpeechTxt] = useState<string>("llcoolj");

  useEffect(() => {
    if (!videoRef.current) {
      return;
    }
    if (speechTxt.length === 0) {
      return;
    }

    const video = videoRef.current;
    const letter = speechTxt[0].toLowerCase();
    const letterTiming = alphabetTimings[letter];

    video.currentTime = letterTiming.time;

    let animationFrameId: number;

    const checkTime = () => {
      if (video.currentTime >= letterTiming.time + letterTiming.duration) {
        console.log(
          `pausing at ${video.currentTime}. expecting: ${
            letterTiming.time + letterTiming.duration
          } letterTiming: ${JSON.stringify(letterTiming)}`
        );
        video.pause();
        // cancelAnimationFrame(animationFrameId);
      } else {
        animationFrameId = requestAnimationFrame(checkTime);
      }
    };

    animationFrameId = requestAnimationFrame(checkTime);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [speechTxt]);

  const playSpeech = useCallback(() => {
    if (!videoRef.current) {
      return;
    }
    videoRef.current.play();
  }, []);

  const onTextChange = useCallback(() => {
    const text = inputRef.current?.value || "";
    setSpeechTxt(text);
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <video ref={videoRef} src="ll-cool-j.mp4" />
      <input ref={inputRef} value={speechTxt} onChange={onTextChange} />
      <button onClick={playSpeech}>Play Speech</button>
    </div>
  );
}

export default App;
