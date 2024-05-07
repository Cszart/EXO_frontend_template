import { emailService } from 'api_services';
import SimpleTable from 'components/common/tables/simpleTable';
import { Layout } from 'components/layout';
import RolesEnum from 'const/role';
import AppRoutes from 'const/routes';
import { EmailTemplateI } from 'interfaces';
import { useRouter } from 'next/router';
import * as React from 'react';

const EmailTemplatesListScreen = (): JSX.Element => {
	// Utils
	const router = useRouter();

	// Templates data
	const [templatesData, setTemplatesData] = React.useState<EmailTemplateI[]>();

	// Fetch templates data
	// NOTE: implementation might change
	React.useEffect(() => {
		async function fetchTemplates(): Promise<void> {
			const response = await emailService.getAllTemplates();
			setTemplatesData(response.data);
		}

		fetchTemplates();
	}, []);

	return (
		<Layout withHeader title="Templates List">
			<SimpleTable<EmailTemplateI>
				columns={[
					{
						header: 'Name',
						content: (instance) => <p>{instance.name}</p>,
					},
					{
						header: 'UUID',
						content: (instance) => <p>{instance.uuid}</p>,
					},
					{
						header: 'Created at',
						content: (instance) => <p>{instance.createdAt}</p>,
					},
					{
						header: 'Modified at',
						content: (instance) => <p>{instance.modifiedAt}</p>,
					},
				]}
				rows={templatesData}
				rowActions={(instance: EmailTemplateI) => [
					{
						label: 'Edit',
						name: 'edit',
						onClick: () => {
							localStorage.setItem('templateToEdit', JSON.stringify(instance));
							router.push({
								pathname: AppRoutes.EMAIL_CONTENT_EDITOR,
								query: {
									editMode: true,
								},
							});
						},
						roles: [RolesEnum.ADMIN],
					},
				]}
			/>
		</Layout>
	);
};

export default EmailTemplatesListScreen;
