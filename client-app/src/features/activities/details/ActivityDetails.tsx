import React from 'react'
import { Button, Card, Image } from 'semantic-ui-react'
import { Activity } from '../../../app/models/activity';

interface Props {
    activity: Activity,
    openForm: (id:string) => void;
    cancelSelectActivity: () => void;
};

const ActivityDetails = ({ activity, openForm, cancelSelectActivity }: Props) => (
    <Card fluid>
        <Image src={`/assets/categoryImages/${activity.category}.jpg`} wrapped ui={false} />
        <Card.Content>
            <Card.Header>{activity.title}</Card.Header>
            <Card.Meta>
                <span>{activity.date}</span>
            </Card.Meta>
            <Card.Description>
                {activity.description}
            </Card.Description>
        </Card.Content>
        <Card.Content extra>
            <Button.Group widths='2'>
                <Button basic color='blue' content='Edit' onClick={() => openForm(activity.id)} />
                <Button basic color='grey' content='Cancel' onClick={cancelSelectActivity} />
            </Button.Group>
        </Card.Content>
    </Card>
);

export default ActivityDetails;