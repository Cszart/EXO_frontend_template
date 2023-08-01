// Local components
import { Layout } from 'components/layout';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';

const HomePage = (): any => {
	return (
		<Layout with_footer>
			<div className="flex justify-center items-center w-full text-2xl font-bold">
				You are logged in and this is the Home Page
			</div>
		</Layout>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const session = await getSession(context);
	if (!session) {
		return {
			redirect: {
				destination: '/auth/signin',
				permanent: false,
			},
		};
	}

	return {
		props: {
			session,
		},
	};
};

export default HomePage;
