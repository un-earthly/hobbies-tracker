import { useState } from 'react';
import Table from './components/Table'
function App() {
  const [theme, setTheme] = useState("dark")
  return (
    <div>
      <Table />
    </div>
  );
}

export default App;
