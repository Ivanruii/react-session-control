import React, { useEffect } from "react";
import useSessionControl from "./use-session-control.hook";

const changeFavicon = (isSessionActive: boolean) => {
  const faviconLink = document.querySelector(
    "link[rel*='icon']"
  ) as HTMLLinkElement;
  if (faviconLink) {
    if (isSessionActive) {
      faviconLink.href = "/favicon-active.ico";
    } else {
      faviconLink.href = "/favicon-inactive.ico";
    }
  }
};

const App: React.FC = () => {
  const { sessionActive, otherTabActive, startSession, endSession } =
    useSessionControl();

  useEffect(() => {
    changeFavicon(sessionActive);
  }, [sessionActive]);

  return (
    <div>
      {sessionActive ? (
        <>
          <h1>Session Active</h1>
          <button onClick={endSession}>Log Out</button>
        </>
      ) : otherTabActive ? (
        <>
          <h1>Session is active in another tab</h1>
          <button onClick={startSession}>Transfer session to this tab</button>
        </>
      ) : (
        <>
          <h1>Session Closed</h1>
          <button onClick={startSession}>Open session on this tab</button>
        </>
      )}
    </div>
  );
};

export default App;
