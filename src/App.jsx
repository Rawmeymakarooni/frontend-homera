import Navbar from './assets/Navbar';
import Hero from './assets/Hero';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
      <Navbar />
      <Hero />
    </div>
    </>
  )
}

export default App;
