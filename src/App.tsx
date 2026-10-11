import {Link, Route, Routes} from 'react-router';
import TireSearch from './routes/TireSearch';

function NotFound() {
  return <main className="not-found"><h1>Page not found</h1><Link to="/search/tires">Go to Tire Search</Link></main>;
}

export default function App() {
  return (
    <Routes>
      <Route path="/search/tires" element={<TireSearch />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
