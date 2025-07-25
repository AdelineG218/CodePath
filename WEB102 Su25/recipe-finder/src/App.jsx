import { useState, useEffect, PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { Link } from 'react-router-dom';
import './App.css';

// could have chart showing bar chart of the number of steps
// chart w/ number of steps by prep time
// stacked bar chart w/ prep time and cook time
// could have chart with counts of cuisines or diets (word chart?)
function App() {
  const API_KEY = import.meta.env.VITE_APP_ACCESS_KEY;
  const [list, setList] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [selectedLabels, setSelectedLabels] = useState([false, false, false, false, false, false, false]);
  const [averages, setAverages] = useState([0, 0, 0]);
  const [barData, updateBarData] = useState([]);
  const [radarData, updateRadarData] = useState([]);
  const labels = [
    // {id: 0, label: "breakfast"},
    // {id: 1, label: "lunch"},
    // {id: 2, label: "dinner"},
    {id: 3, label: "ketogenic"},
    {id: 4, label: "lowFodmap"},
    {id: 5, label: "vegan"},
    {id: 6, label: "vegetarian"},
    {id: 7, label: "whole30"},
    {id: 8, label: "glutenFree"},
    {id: 9, label: "dairyFree"}
  ]

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://api.spoonacular.com/recipes/random?number=10&includeNutrition=false&apiKey=${API_KEY}`);
      const json = await response.json();
      console.log(json.recipes);
      setList(json.recipes);
      calculateAverages(json.recipes);
      calculateGraphData(json.recipes);
    }
    fetchData().catch(console.error);
  }, []);

  const calculateAverages = (data) => {
    const totalCount = data.length;
    const totalHealth = data.reduce((sum, item) => (item.healthScore || 0), 0);;
    const totalTime = data.reduce((sum, item) => (item.readyInMinutes || 0), 0);
    const totalServings = data.reduce((sum, item) => sum + (item.servings || 0), 0);

    setAverages([
      (totalHealth / totalCount),
      (totalTime / totalCount).toFixed(1),
      (totalServings / totalCount),
    ]);
  };

  const calculateGraphData = (data) => {
    const l = [];
    const d = {};
    const l2 = [];
    let mx = 0;
    for (let i=0; i<data.length; i++) {
      if (data[i].readyInMinutes) {
        if (data[i].preparationMinutes && data[i].cookingMinutes) {
          l.push({name: data[i].title, prepTime: data[i].preparationMinutes, cookTime: data[i].cookingMinutes});
        } else {
          l.push({name: data[i].title, prepTime: data[i].readyInMinutes, cookTime: 0});
        }
      }
      for (let j=0; j<data[i].diets.length; j++) {
        const temp = data[i].diets[j];
        if (temp in d) {
          d[temp] = d[temp]+1;
        } else {
          d[temp] = 1;
        }
        if (d[temp] > mx) {
          mx = d[temp];
        }
      }
    }
    for (const key in d) {
      l2.push({diet: key, v: d[key], fullMark: mx});
    }
    updateBarData(l);
    updateRadarData(l2);
    console.log(l);
    console.log(l2);
  }

  const handleCheckboxChange = (event) => {
    const labelId = event.target.value;
    const updatedLabels = [...selectedLabels];
    updatedLabels[labelId-3] = event.target.checked;
    setSelectedLabels(updatedLabels);
    console.log(updatedLabels);
  };
  
  const searchItems = searchValue => {
    setSearchInput(searchValue);
    if (searchValue !== "") {
      const filteredData = list.filter((item) => {
        const searchedAttributes = [item.title].map(attr => attr.toLowerCase())
        return searchedAttributes.some(attr => attr.includes(searchValue))
      })
      setFilteredResults(filteredData);
      calculateAverages(filteredData);
    } else {
      setFilteredResults(list);
    }
  };

  return (
    <div className="whole-page">
      <div className='summary'>
        <h3>Summary Statistics</h3>
        <p>Average Health Score: {averages[0]}</p>
        <p>Ready in an Average of {averages[1]} Minutes</p>
        <p>Makes an Average of {averages[2]} Servings</p>
      </div>

      <div className='graphs'>
        {barData.length>0 &&<BarChart
          width={500}
          height={400}
          data={barData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="prepTime" stackId="a" fill="#8cd685ff" />
          <Bar dataKey="cookTime" stackId="a" fill="#fd9d77ff" />
        </BarChart>}
        <div style={{ width: 500, height: 400 }}>
          {radarData.length>0 && <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="diet" />
              <PolarRadiusAxis />
              <Radar name="d" dataKey="v" stroke="#fd9d77ff" fill="#fd9d77ff" fillOpacity={0.6} />
            </RadarChart>
          </ResponsiveContainer>}
        </div>
      </div>

      <div className='inputs'>
        <input
          type="text"
          placeholder="Search..."
          onChange={(inputString) => searchItems(inputString.target.value)}
        />
        {labels.map((l) => (
          <label key={l.id}>
            <input
              type="checkbox"
              value={l.id}
              checked={selectedLabels[l.id-3]}
              onChange={handleCheckboxChange}
            />
            {l.label}
          </label>
        ))}
      </div>
      <ul className='recipe-list'>
        {searchInput.length > 0 ?
          filteredResults?.map((recipe) => (
            <div className="recipe-item" key={recipe.id}>
              <div className="recipe-info-top">
                <h3>{recipe.title}</h3>
                {recipe.healthScore && <span>Health Score: {recipe.healthScore}</span>}
                {recipe.servings && <span> • Servings: {recipe.servings}</span>}
                {recipe.readyInMinutes && <span> • Ready in: {recipe.readyInMinutes} min</span>}
              </div>
              <div className="recipe-info-bottom">
                <Link to={`/recipeDetails/${recipe.id}`} key={recipe.id}>View Details</Link>
              </div>
            </div>
          ))
         :
          list?.map((recipe) => (
            <div className="recipe-item" key={recipe.id}>
              <h3>{recipe.title}</h3>
              <div className="recipe-info-top">
                {recipe.healthScore && <span>Health Score: {recipe.healthScore}</span>}
                {recipe.servings && <span> • Servings: {recipe.servings}</span>}
                {recipe.readyInMinutes && <span> • Ready in: {recipe.readyInMinutes} min</span>}
              </div>
              <div className="recipe-info-bottom">
                <Link to={`/recipeDetails/${recipe.id}`} key={recipe.id}>View Details</Link>
                {/* {recipe.sourceUrl && <a href={recipe.sourceUrl} target="_blank" rel="noopener noreferrer">View Recipe</a>} */}
              </div>
            </div>
          ))
        }
      </ul>
    </div>
  )
}

export default App;
