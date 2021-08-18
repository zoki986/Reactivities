import React from 'react';
import { Link } from 'react-router-dom';
import { Item, Label, List, Segment, Image } from 'semantic-ui-react';

export default function ActivityDetailedSidebar() {
	return (
		<>
			<Segment
				textAlign='center'
				attached='top'
				secondary
				inverted
				color='teal'
				style={{ border: 'none' }}
			>
				3 People Going
			</Segment>
			<Segment attached>
				<List relaxed divided>
					<Item style={{ position: 'relative' }}>
						<Label
							style={{ position: 'absolute' }}
							color='orange'
							ribbon='right'
						>
							Host
						</Label>
						<Image size='tiny' src={'/assets/user.jpg'} />
						<Item.Content verticalAlign='middle'>
							<Item.Header as='h3'>
								<Link to={'#'}>Bob</Link>
							</Item.Header>
							<Item.Extra style={{ color: 'orange' }}>Following</Item.Extra>
						</Item.Content>
					</Item>
					<Item style={{ position: 'relative' }}>
						<Image size='tiny' src={'/assets/user.jpg'} />
						<Item.Content verticalAlign='middle'>
							<Item.Header as='h3'>
								<Link to={'#'}>Tom</Link>
							</Item.Header>
							<Item.Extra style={{ color: 'orange' }}>Following</Item.Extra>
						</Item.Content>
					</Item>
					<Item style={{ position: 'relative' }}>
						<Image size='tiny' src={'/assets/user.jpg'} />
						<Item.Content verticalAlign='middle'>
							<Item.Header as='h3'>
								<Link to={'#'}>Sally</Link>
							</Item.Header>
							<Item.Extra style={{ color: 'orange' }}></Item.Extra>
						</Item.Content>
					</Item>
				</List>
			</Segment>
		</>
	);
}
