import { useEffect, useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

const useSessionControl = () => {
  const [sessionActive, setSessionActive] = useState<boolean>(false);
  const [otherTabActive, setOtherTabActive] = useState<boolean>(false);
  const sessionKey = "app_session";
  const sessionTabKey = "app_session_tab";

  const currentTabId = useRef<string>(uuidv4()).current;

  const startSession = () => {
    try {
      localStorage.setItem(sessionKey, "active");
      localStorage.setItem(sessionTabKey, currentTabId);
      setSessionActive(true);
      setOtherTabActive(false);
    } catch (error) {
      console.error("Error accessing localStorage:", error);
    }
  };

  const endSession = () => {
    try {
      localStorage.removeItem(sessionKey);
      localStorage.removeItem(sessionTabKey);
      setSessionActive(false);
    } catch (error) {
      console.error("Error accessing localStorage:", error);
    }
  };

  useEffect(() => {
    const isSessionActive = localStorage.getItem(sessionKey) === "active";
    const storedTabId = localStorage.getItem(sessionTabKey);

    if (isSessionActive && storedTabId === currentTabId) {
      setSessionActive(true);
      setOtherTabActive(false);
    } else if (storedTabId && storedTabId !== currentTabId) {
      setOtherTabActive(true);
      setSessionActive(false);
    } else {
      startSession();
    }

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === sessionTabKey) {
        const newSessionTabId = event.newValue;

        if (newSessionTabId && newSessionTabId !== currentTabId) {
          setOtherTabActive(true);
          setSessionActive(false);
        } else if (newSessionTabId === currentTabId) {
          setSessionActive(true);
          setOtherTabActive(false);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      endSession();
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return { sessionActive, otherTabActive, startSession, endSession };
};

export default useSessionControl;
