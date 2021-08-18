import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button, Header, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import { v4 as uuid } from 'uuid';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import SelectInput from '../../../app/common/form/SelectInput';
import { CategoryOptions } from '../../../app/common/options/CategoryOptions';
import MyDateInput from '../../../app/common/form/MyDateInput';
import { Activity } from '../../../app/models/activity';

export default observer(function ActivityForm() {
	const history = useHistory();
	const { activityStore } = useStore();
	const {
		createActivity,
		updateActivity,
		loading,
		loadActivity,
		loadingInitial,
	} = activityStore;

	const { id } = useParams<{ id: string }>();

	const [activity, setActivity] = useState<Activity>({
		id: '',
		title: '',
		category: '',
		description: '',
		date: null,
		city: '',
		venue: '',
	});

	const validationSchema = Yup.object({
		title: Yup.string().required('The activity title is required.'),
		description: Yup.string().required('The activity description is required.'),
		category: Yup.string().required(),
		date: Yup.string().required('Date is required.').nullable(),
		venue: Yup.string().required(),
		city: Yup.string().required(),
	});

	useEffect(() => {
		if (id) loadActivity(id).then(activity => setActivity(activity!));
	}, [id, loadActivity]);

	async function handleFormSubmit(activity: Activity) {
		if (!activity.id) {
			let newActivity = {
				...activity,
				id: uuid(),
			};
			await createActivity(newActivity);
			history.push(`/activities/${newActivity.id}`);
		} else {
			await updateActivity(activity);
			history.push(`/activities/${activity.id}`);
		}
	}

	if (loadingInitial) return <LoadingComponent content='Loading activity...' />;

	return (
		<Segment clearing>
			<Header content='Activity Details' sub color='teal' />
			<Formik
				enableReinitialize
				initialValues={activity}
				validationSchema={validationSchema}
				onSubmit={values => handleFormSubmit(values)}
			>
				{({ handleSubmit, isValid, isSubmitting, dirty }) => (
					<Form onSubmit={handleSubmit} autoComplete='off' className='ui form'>
						<MyTextInput placeholder='Title' name='title' />
						<MyTextArea placeholder='Description' name='description' rows={3} />
						<SelectInput
							placeholder='Category'
							name='category'
							options={CategoryOptions}
						/>
						<MyDateInput
							name='date'
							placeholderText='Date'
							showTimeSelect
							timeCaption='time'
							dateFormat='MMMM d, yyyy h:mm aa'
						/>

						<Header content='Location Details' sub color='teal' />
						<MyTextInput placeholder='City' name='city' />
						<MyTextInput placeholder='Venue' name='venue' />

						<Button
							loading={loading}
							floated='right'
							positive
							type='submit'
							content='Submit'
							disabled={isSubmitting || !dirty || !isValid}
						/>
						<Button
							floated='right'
							type='button'
							content='Cancel'
							as={Link}
							to='/activities'
						/>
					</Form>
				)}
			</Formik>
		</Segment>
	);
});
