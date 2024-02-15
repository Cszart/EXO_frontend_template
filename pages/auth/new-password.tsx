import { NewPasswordScreen } from 'components/screens';
import { useEffect } from 'react';
import authUtils from 'utils/auth';

const NewPassword = (): JSX.Element => {
	useEffect(() => {
		authUtils.redirectUserIfNeeded();
	}, []);

	return <NewPasswordScreen />;
};

export default NewPassword;
