import { useParams } from "react-router-dom";
import { useState } from "react";
import Axios from "axios";

function Home() {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(0);
  const [error, setError] = useState("");
  const [appointmentTitle, setAppointmentTitle] = useState("");

  const { username } = useParams();
  
  console.log(`The date:${date}`);
  console.log(`The time:${time}`);

  const createAppointment = async () => {
    //  TODO: ADD A STATEMENT TO CHECK IF DATE IS SET TO THE PAST
    if (!date || date === 0 || !time || time === 0 || time > 17) {
      setError("Please select a valid date and time");
      return;
    }
    try {
      await Axios.post("http://localhost:3001/createAppointment", {
        username: username,
        date: date,
        time: time,
        appointmentTitle: appointmentTitle
      });
      console.log("username sent to server succesfully");
    } catch (err) {
      console.log(`An error occured!: ${err}`);
    }
  };

  return (
    <>
      <div>Hello, {username}!</div>
      <input
        type="date"
        name="dateAppointment"
        id="dateAppointment"
        onChange={(e) => setDate(e.target.value)}
      />
      <input
        type="time"
        name="time"
        id="time"
        onChange={(e) => setTime(e.target.value)}
      />
      <input
        type="text"
        name="title"
        id="title"
        onChange={(e) => setAppointmentTitle(e.target.value)}
      />
      <p>{error}</p>
      <button onClick={createAppointment}>Create appointment</button>
    </>
  );
}

export default Home;
