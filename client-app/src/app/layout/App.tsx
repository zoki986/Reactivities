import React, { Fragment, useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import { v4 as uuid } from 'uuid';

import Navbar from './navbar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';

function App() {

  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submiting, setSubmiting] = useState(false);

  useEffect(() => {
    async function fetchActivities() {
      try {
        const activitiesResponse = await agent.Activities.list();
        activitiesResponse.forEach(a => a.date = a.date.split('T')[0]);
        setActivities(activitiesResponse);
        setLoading(false);
      } catch (error) {
        setActivities([]);
      }
    }

    fetchActivities();
  }, []);


  function handleSelectActivity(id: string) {
    setSelectedActivity(activities.find(x => x.id === id));
  }

  function handleCancelSelectActivity() { setSelectedActivity(undefined); }

  function handleFormOpen(id?: string) {
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  }

  function handleFormClose() { setEditMode(false) }

  async function handleCreateOrEdit(activity: Activity) {
    setSubmiting(true);

    if (activity.id) {
      await agent.Activities.update(activity);
      setActivities([...activities.filter(x => x.id !== activity.id), activity]);
 
    }else{
      activity.id = uuid();
      await agent.Activities.create(activity);
      setActivities([...activities, activity]);
    }

    setSelectedActivity(activity);
    setEditMode(false);
    setSubmiting(false);
  }

  async function handleDeleteActivity(id: string) {
    setSubmiting(true);
    await agent.Activities.delete(id);
    setActivities([...activities.filter(x => x.id !== id)]);
    setSubmiting(false);
  }

  if (loading) return <LoadingComponent />

  return (
    <Fragment>
      <Navbar openForm={handleFormOpen} />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEdit}
          deleteActivity={handleDeleteActivity}
          submiting={submiting}
        />
      </Container>
    </Fragment>
  );
}

export default App;
