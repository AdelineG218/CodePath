import React from 'react';
import activities  from './assets/activities';
import { useEffect, useState } from 'react';

function App() {
  const [list, setList] = useState([]); // will hold 30 activities
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [averages, setAverages] = useState([0, 0, 0, 0]);
  const type = ["education", "recreational", "social", "charity", "cooking", "relaxation", "busywork"];
  const l = activities;

  useEffect(() => {
    const fetchAllData = async () => {
      let allData = [];

      try {
        for (let i = 0; i < type.length; i++) {
          const response = await fetch(`https://bored-api.appbrewery.com/filter?type=${type[i]}`);
          const json = await response.json();
          allData.concat(json);
        }
        setList(allData);
      } catch {
        allData = l;
        setList(l);
      }
      setFilteredResults(allData);
      calculateAverages(allData);                                                                                                                                
    };

    fetchAllData().catch(console.error);
  }, []);

  const calculateAverages = data => {
    let kidFriendlyCount = data.filter(item => {
      return item.kidFriendly;
    }).length;
    const totalCount = data.length;
    const totalPrice = data.reduce((sum, item) => (item.price || 0), 0);;
    const totalParticipants = data.reduce((sum, item) => sum + (item.participants || 0), 0);;

    setAverages([
      (totalCount),
      (kidFriendlyCount),
      (totalPrice / totalCount).toFixed(2),
      (totalParticipants / totalCount).toFixed(2),
    ]);
  };

  useEffect(() => {
    const filtered = list.filter(item => {
      const matchesType = selectedType === 'all' || item.type === selectedType;
      const matchesSearch =
        searchInput === '' ||
        item.activity.toLowerCase().includes(searchInput.toLowerCase());
      return matchesType && matchesSearch;
    });

    setFilteredResults(filtered);
  }, [searchInput, selectedType, list]);

  return (
    <div className='whole-page'>
      <h1>Boredom Buster</h1>

      <h3>Summary Statistics</h3>
      <div className='Summary'>
        <p>Number of Kid-Friendly Activities: {averages[1]}/{averages[0]}</p>
        <p>Average Price: {averages[2]}</p>
        <p>Average Participants: {averages[3]}</p>
      </div>

      <input
        type='text'
        placeholder='Search by activity name...'
        onChange={e => setSearchInput(e.target.value)}
        value={searchInput}
      />

      <select
        onChange={e => setSelectedType(e.target.value)}
        value={selectedType}
      >
        <option value='all'>All Types</option>
        <option value='education'>Education</option>
        <option value='recreational'>Recreational</option>
        <option value='social'>Social</option>
        <option value='charity'>Charity</option>
        <option value='cooking'>Cooking</option>
        <option value='relaxation'>Relaxation</option>
        <option value='busywork'>Busywork</option>
      </select>

      <ul className='activity-list'>
        {filteredResults.map((item, index) => (
          <li key={index} className='activity-card'>
            <p><strong>{item.activity}</strong> Participants: {item.participants} {item.link.length > 0 ? "| " + item.link : ""} | Price: {item.price} | Accessibility: {item.accessibility} | Type: {item.type}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
