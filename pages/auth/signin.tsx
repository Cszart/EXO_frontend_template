import { SignInComponent } from 'components/auth';
import { Layout } from 'components/layout';
import * as React from 'react';

const SignIn = () => {
	return (
		<Layout className_children="flex items-center">
			<SignInComponent providers={['email']} />
		</Layout>
	);
};

export default SignIn;
