import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';

function App() {

  const [activities, setActivities] = useState([]);

  useEffect(() => {
    async function fetchActivities() {
      const activitiesResponse = await axios.get('http://localhost:5000/api/activities');
      const activities = await activitiesResponse.data;

      setActivities(activities);
    }

    fetchActivities();
  }, []);

  return (
    <div>
      <Header as='h2' icon='users' content='Reactivities' />

        <List>
          {activities.map(((activity: any) => {
            return <li key={activity.id}>{activity.title}</li>
          }))}
        </List>

    </div>
  );
}

export default App;
