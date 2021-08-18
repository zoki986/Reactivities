import { Container } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { Route, Switch, useLocation } from 'react-router-dom';

import Navbar from './navbar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';

import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
import { ToastContainer } from 'react-toastify';
import NotFound from '../../features/errors/NotFound';
import ServerError from '../../features/errors/ServerError';
import LoginForm from '../../features/users/LoginForm';
import { useStore } from '../stores/store';
import { useEffect } from 'react';
import LoadingComponent from './LoadingComponent';
import ModalContainer from '../common/modals/ModalContainer';

function App() {
	const location = useLocation();
	const { commonStore, userStore } = useStore();

	useEffect(() => {
		if(commonStore.token){
			userStore.getUser().finally(() => commonStore.setApploaded());
		}else{
			commonStore.setApploaded();
		}
	}, [commonStore, userStore]);

	if(!commonStore.appLoaded) return <LoadingComponent content='Loading app..' />

	return (
		<>
			<ToastContainer position='bottom-right' hideProgressBar />
			<ModalContainer />
			<Route path='/' component={HomePage} exact />
			<Route
				path={`/(.+)`}
				render={() => (
					<>
						<Navbar />
						<Container style={{ marginTop: '7em' }}>
							<Switch>
								<Route path='/activities' component={ActivityDashboard} exact />
								<Route path='/activities/:id' component={ActivityDetails} />
								<Route
									path={['/createActivity', '/manage/:id']}
									component={ActivityForm}
									key={location.key}
								/>
								<Route component={ServerError} path='/server-error'/>
								<Route component={LoginForm} path='/login'/>
								<Route component={NotFound} />
							</Switch>
						</Container>
					</>
				)}
			/>
		</>
	);
}

export default observer(App);
