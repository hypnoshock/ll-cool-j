import { useCallback, useEffect, useRef, useState } from "react";
import { alphabetTimings } from "./alphabet-timings";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "./App.css";

function App() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputTxt, setInputTxt] = useState<string>("super sharp shooter");
  const [speechTxt, setSpeechTxt] = useState<string>("");
  const [currentLetterIdx, setCurrentLetterIdx] = useState<number>(0);

  useEffect(() => {
    if (!videoRef.current) {
      return;
    }
    if (speechTxt.length === 0) {
      return;
    }

    const video = videoRef.current;

    if (currentLetterIdx >= speechTxt.length) {
      video.pause();
      video.currentTime = 0;
      return;
    }

    const letter = speechTxt[currentLetterIdx].toLowerCase();
    const letterTiming = alphabetTimings[letter];

    if (!letterTiming) {
      setCurrentLetterIdx((prevIdx) => prevIdx + 1);
      return;
    }

    // Set video time
    video.currentTime = letterTiming.time;
    videoRef.current.play();

    // pump Cool J
    if (letter !== " ") {
      gsap.fromTo(
        video,
        {
          scale: 1,
        },
        {
          scale: 1.1,
          duration: letterTiming.duration * 0.5,
          repeat: 1,
          yoyo: true,
          ease: "power1.inOut",
        }
      );
    }

    let animationFrameId: number;
    const checkTime = () => {
      if (video.currentTime >= letterTiming.time + letterTiming.duration) {
        setCurrentLetterIdx((prevIdx) => prevIdx + 1);
      } else {
        animationFrameId = requestAnimationFrame(checkTime);
      }
    };

    animationFrameId = requestAnimationFrame(checkTime);

    return () => {
      cancelAnimationFrame(animationFrameId);
      video.pause();
    };
  }, [speechTxt, currentLetterIdx]);

  const onPlayBtn = useCallback(() => {
    if (!videoRef.current) {
      return;
    }
    setSpeechTxt(inputTxt);
    setCurrentLetterIdx(0);

    if (inputTxt.length === 0) {
      videoRef.current.pause();
      return;
    }

    const letter = inputTxt[0].toLowerCase();
    const letterTiming = alphabetTimings[letter];
    videoRef.current.currentTime = letterTiming?.time || 0;
  }, [inputTxt]);

  const onTextChange = useCallback(() => {
    const text = inputRef.current?.value || "";
    setInputTxt(text);
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div className="video-container">
        <video className="ll-cool-j" ref={videoRef} src="ll-cool-j.mp4" />
      </div>
      <input ref={inputRef} value={inputTxt} onChange={onTextChange} />
      <button onClick={onPlayBtn}>Say it Cool J!</button>
    </div>
  );
}

export default App;
