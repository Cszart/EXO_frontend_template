import { ForgotPasswordScreen } from 'components/screens';
import { useEffect } from 'react';
import authUtils from 'utils/auth';

const ForgotPassword = (): JSX.Element => {
	useEffect(() => {
		authUtils.redirectUserIfNeeded();
	}, []);

	return <ForgotPasswordScreen />;
};

export default ForgotPassword;
