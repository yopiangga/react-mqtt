import { useState, useEffect } from "react";
import useMqtt from "./useMqtt";
import "./App.css";

function App() {
  const { mqttSubscribe, isConnected, payload } = useMqtt();
  const [notificationList, setNotificationList] = useState([]);

  useEffect(() => {}, []);

  useEffect(() => {
    if (isConnected) {
      console.log("MQTT Connected");
      mqttSubscribe("text");
    }
  }, [isConnected]);

  useEffect(() => {
    if (payload.message && ["text"].includes(payload.topic)) {
      const newMessage = JSON.parse(payload.message);
      const notif = [...notificationList, newMessage];
      setNotificationList(notif);
    }
  }, [payload]);

  return (
    <div className="App">
      <h1>MQTT React Vite</h1>
      <div className="card">
        <h2>Notifications : </h2>
        <ol></ol>
      </div>
    </div>
  );
}

export default App;
