import { ForgotPasswordComponent } from 'components/auth';
import { Layout } from 'components/layout';
import * as React from 'react';

const ForgotPassword = () => {
	return (
		<Layout className_children="flex items-center">
			<ForgotPasswordComponent />
		</Layout>
	);
};

export default ForgotPassword;
