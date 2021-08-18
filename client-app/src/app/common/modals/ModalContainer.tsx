import { observer } from 'mobx-react-lite';
import React from 'react';
import { Modal } from 'semantic-ui-react';
import { useStore } from '../../stores/store';

export default observer(function ModalContainer() {
	const {
		modalStore: { modal },
		modalStore,
	} = useStore();

	return (
		<Modal open={modal.open} onClose={modalStore.closeModal} size='mini'>
			<Modal.Content>{modal.body}</Modal.Content>
		</Modal>
	);
});
