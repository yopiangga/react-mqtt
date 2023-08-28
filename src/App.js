import { useState, useEffect } from "react";
import useMqtt from "./useMqtt";
import "./App.css";
import _ from "lodash";

function App() {
  const { mqttSubscribe, isConnected, payload, mqttPublish } = useMqtt();
  const [notificationList, setNotificationList] = useState([]);

  useEffect(() => {
    if (isConnected) {
      console.log("MQTT Connected")
      mqttSubscribe("text")
      setTimeout(function loopFn(){
        const message = "Hello World!"
        mqttPublish("text", message)
        setTimeout(loopFn, 2000)
      }, 2000)
    }
  }, [isConnected]);

  useEffect(() => {
  }, []);

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
        <ol>
          {notificationList.map((notif, index) =>
            <li key={index}>{notif}</li>
          )}
        </ol>
      </div>
    </div>
  );
}

export default App;
