// Local components
import { Typography } from 'components/form';
import { Layout } from 'components/layout';

const HomePage = (): any => {
	return (
		<Layout withSidebar>
			<div className="flex justify-center items-center h-screen w-full text-2xl font-bold">
				<Typography type="headline-2">Welcome to the Dashboard</Typography>
			</div>
		</Layout>
	);
};

export default HomePage;
