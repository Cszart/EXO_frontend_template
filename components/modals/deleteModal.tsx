import { Button, Typography } from 'components/common';
import * as React from 'react';

interface DeleteModalProps {
	type: string;
	isLoading?: boolean;
	onClickCancel: () => void;
	onClickSave: () => void;
}

export const DeleteModalContent: React.FC<DeleteModalProps> = ({
	type,
	isLoading,
	onClickCancel,
	onClickSave,
}) => {
	return (
		<>
			<Typography
				type="subtitle-3"
				text={`Are you sure you want delete this ${type}?`}
				className="my-8 text-center"
			/>
			<div className="flex gap-x-4 w-full justify-center">
				<Button
					label="Cancel"
					decoration="line-primary"
					size="extra-small"
					type="button"
					loading={isLoading}
					onClick={onClickCancel}
				/>
				<Button
					label="Save"
					decoration="fill"
					size="extra-small"
					loading={isLoading}
					onClick={onClickSave}
				/>
			</div>
		</>
	);
};
