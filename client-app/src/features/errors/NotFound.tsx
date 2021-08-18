import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Header, Icon, Segment } from 'semantic-ui-react';

export default function NotFound() {
	return (
		<Segment textAlign='center'>
			<Header icon>
				<Icon name='search' />
				Ooops - not found.
			</Header>
			<Segment.Inline>
				<Button as={Link} to='/activities' primary>
					Return to activities page.
				</Button>
			</Segment.Inline>
		</Segment>
	);
}