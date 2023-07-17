// Local components
import { Layout } from 'components/layout';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';

export default function homePage(): any {
	return (
		<div className="">
			<Layout with_header with_footer>
				This is the content of the homePage
			</Layout>
		</div>
	);
}

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
		redirect: {
			destination: '/',
			permanent: false,
		},
	};
};
