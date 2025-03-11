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

    const nextLetter = () => {
      const nextIdx = currentLetterIdx + 1;
      if (nextIdx < speechTxt.length) {
        setCurrentLetterIdx(nextIdx);
      } else {
        video.pause();
      }
    };

    const video = videoRef.current;
    const letter = speechTxt[currentLetterIdx].toLowerCase();
    const letterTiming = alphabetTimings[letter];

    if (!letterTiming) {
      nextLetter();
      return;
    }

    // Set video time
    video.currentTime = letterTiming.time;
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
        nextLetter();
      } else {
        animationFrameId = requestAnimationFrame(checkTime);
      }
    };

    animationFrameId = requestAnimationFrame(checkTime);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [speechTxt, currentLetterIdx]);

  const playSpeech = useCallback(() => {
    if (!videoRef.current) {
      return;
    }
    setSpeechTxt(inputTxt);
    setCurrentLetterIdx(0);
    videoRef.current.currentTime = 0;
    videoRef.current.play();
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
      <button onClick={playSpeech}>Say it Cool J!</button>
    </div>
  );
}

export default App;
