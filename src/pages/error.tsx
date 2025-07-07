type TErrorPageProps = {
	message: string;
};

export const ErrorPage = ({ message }: TErrorPageProps): React.JSX.Element => {
	return (
		<div className='container padding-top-180'>
			<div className='centered'>
				<h1 className='text text_type_main-medium mb-15'>{message}</h1>
			</div>
		</div>
	);
};
