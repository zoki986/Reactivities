import { format } from 'date-fns';
import React from 'react';
import { Grid, Icon, Segment } from 'semantic-ui-react';
import { DateFormat } from '../../../app/common/Constants';
import { Activity } from '../../../app/models/activity';

interface Props {
	activity: Activity;
}
export default function ActivityDetailedInfo({ activity }: Props) {
	return (
		<Segment.Group>
			<Segment attached='top'>
				<Grid>
					<Grid.Column width={1}>
						<Icon size='large' color='teal' name='info' />
					</Grid.Column>
					<Grid.Column width={15}>
						<p>{activity.description}</p>
					</Grid.Column>
				</Grid>
			</Segment>
			<Segment attached>
                <Grid verticalAlign='middle'>
                    <Grid.Column width={1}>
                        <Icon name='calendar' size='large' color='teal' />
                    </Grid.Column>
                    <Grid.Column width={15}>
                        <span>{format(activity.date!, DateFormat)}</span>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid verticalAlign='middle' >
                    <Grid.Column width={1}>
                        <Icon name='marker' size='large' color='teal' />
                    </Grid.Column>
                    <Grid.Column width={11}>
                        <span>{activity.venue}, {activity.city}</span>
                    </Grid.Column>
                </Grid>
            </Segment>
		</Segment.Group>
	);
}
