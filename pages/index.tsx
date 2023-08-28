// Local components
import { Typography } from 'components/form';
import { Layout } from 'components/layout';
// import { GetServerSideProps } from 'next';
// import { getSession } from 'next-auth/react';

const HomePage = (): any => {
	return (
		<Layout with_sidebar>
			<div className="flex justify-center items-center h-screen w-full text-2xl font-bold">
				<Typography type="headline-2">Welcome to the Dashboard</Typography>
			</div>
		</Layout>
	);
};

// export const getServerSideProps: GetServerSideProps = async (context) => {
// 	const session = await getSession(context);
// 	if (!session) {
// 		return {
// 			redirect: {
// 				destination: '/auth/signin',
// 				permanent: false,
// 			},
// 		};
// 	}

// 	return {
// 		props: {
// 			session,
// 		},
// 	};
// };

export default HomePage;
