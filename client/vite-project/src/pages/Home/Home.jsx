import { useParams } from "react-router-dom"
import { useState } from "react";

function Home() {

  const [date, setDate] = useState(0);

  const { username } = useParams();

  return (
    <div>Hello, {username}!</div>
  )
}

export default Home