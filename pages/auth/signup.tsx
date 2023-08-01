import { SignUpComponent } from 'components/auth';
import { Layout } from 'components/layout';
import * as React from 'react';

const SignUp = () => {
	return (
		<Layout className_children="flex items-center">
			<SignUpComponent providers={['email', 'google', 'facebook']} />
		</Layout>
	);
};

export default SignUp;
