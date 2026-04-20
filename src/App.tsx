import Header from './components/Header';
import Hero from './components/Hero';
import Internships from './components/Internships';
import Hobbies from './components/Hobbies';
import Connect from './components/Connect';

export default function App() {
  return (
    <main className="selection:bg-brand-accent selection:text-white">
      <Header />
      <Hero />
      <Internships />
      <Hobbies />
      <Connect />
    </main>
  );
}
