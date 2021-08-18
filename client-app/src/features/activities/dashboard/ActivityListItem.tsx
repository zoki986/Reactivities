import { format } from 'date-fns';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Item, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import { DateFormat}  from '../../../app/common/Constants';

interface Props {
	activity: Activity;
}
export default function ActivityListItem({ activity }: Props) {
	return (
		<Segment.Group>
			<Segment>
				<Item.Group>
					<Item>
						<Item.Image size='tiny' circular src='/assets/user.jpg' />
						<Item.Content>
							<Item.Header as={Link} to={`/activities/${activity.id}`}>
								{activity.title}
							</Item.Header>
							<Item.Description>Hosted by Bob</Item.Description>
						</Item.Content>
					</Item>
				</Item.Group>
			</Segment>
			<Segment>
				<span>
					<Icon name='clock' /> {format(activity.date!, DateFormat)}
					<Icon name='marker' /> {activity.venue}
				</span>
			</Segment>
			<Segment secondary>Attendees</Segment>
			<Segment clearing>
				<span>{activity.description}</span>
				<Button
					as={Link}
					to={`/activities/${activity.id}`}
					color='teal'
					floated='right'
					content='View'
				></Button>
			</Segment>
		</Segment.Group>
	);
}
