// Local components
import withAuthorizationServerSide from 'components/auth/withAuthorizationServerSide';
import { Typography } from 'components/common';
import { Layout } from 'components/layout';
import RolesEnum from 'const/role';
import AppRoutes from 'const/routes';
import { GetServerSideProps, Redirect } from 'next';
import { getSession } from 'next-auth/react';
import Image from 'next/image';
import { crudPermissions } from 'utils';

const HomePage = (): any => {
	return (
		<Layout withSidebar>
			<div className="flex flex-col justify-center text-center items-center mt-20 w-full">
				<Image
					src="/icons/svg/welcome.svg"
					width={300}
					height={400}
					alt="welcome"
					className="mb-10"
				/>
				<Typography type="headline-2">Welcome to the Dashboard</Typography>
				<Typography type="subtitle-1" className="mt-3">
					Frontend Template
				</Typography>
			</div>
		</Layout>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const session = await getSession(context);
	const redirect: Redirect | undefined = await withAuthorizationServerSide({
		session: session,
		allowedPermissions: crudPermissions(),
		allowedRoles: [RolesEnum.ADMIN, RolesEnum.MODERATOR, RolesEnum.USER],
		redirectTo: AppRoutes.AUTH_SIGN_IN,
	});

	return {
		props: {},
		redirect: redirect,
	};
};

export default HomePage;
