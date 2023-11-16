import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [time, setTime] = useState(null);
  const [minute, setMinute] = useState(null);
  const [second, setSecond] = useState(null);
  const [updateTime, setUpdateTime] = useState(time);
  const [stopCountDown, setStopCountDown] = useState(false);

  useEffect(() => {
    if (stopCountDown) {
      let interval = setInterval(() => {
        let [m, s] = convertToMinuteSec(updateTime);
        setMinute(m);
        setSecond(s);
        setUpdateTime((t) => t - 1);
        if (stopCountDown && updateTime <= 0) {
          clearInterval(interval);
          setStopCountDown(false);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [stopCountDown, updateTime]);

  const handleChange = (e) => {
    setTime(e.target.value);
  };

  const handleStart = () => {
    setStopCountDown(true);
  };

  const handlePause = () => {
    setStopCountDown(false);
  };

  const handleRestart = () => {
    window.location.reload();
  };

  const handleCountDown = () => {
    setStopCountDown(true);
    setUpdateTime(time);
  };

  const convertToMinuteSec = (t) => {
    return [Math.floor(t / 60), t % 60];
  };

  return (
    <div className="container">
      <div className="inputData">
        <input
          type="number"
          value={time}
          onChange={handleChange}
          placeholder="Seconds...."
        />
        <button onClick={handleCountDown}>Start Count Down</button>
        {(second > 0 || minute > 0) && (
          <div className="countdown">
            <div>{`${String(minute).padStart(2, "0")} : ${String(
              second
            ).padStart(2, "0")}`}</div>
            <div>
              <button onClick={handleStart}>Start</button>
              <button onClick={handlePause} style={{ marginLeft: "8px" }}>
                Pause
              </button>
              <button onClick={handleRestart} style={{ marginLeft: "8px" }}>
                Restart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
