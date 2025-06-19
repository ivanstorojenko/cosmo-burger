import { getIsAuthChecked, getUserInfo } from '@services/auth/reducer';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router';

const Protected = ({ onlyUnAuth = false, component }) => {
	const isAuthChecked = useSelector(getIsAuthChecked);
	const user = useSelector(getUserInfo);
	const location = useLocation();

	if (!isAuthChecked) {
		return (
			<div className='container padding-top-180'>
				<div className='centered'>
					<span className='text text_type_main-medium'>Загрузка...</span>
				</div>
			</div>
		);
	}

	if (!onlyUnAuth && !user) {
		return <Navigate to='/login' state={{ from: location }} />;
	}

	if (onlyUnAuth && user) {
		const { from } = location.state ?? { from: { pathname: '/' } };
		return <Navigate to={from} />;
	}

	return component;
};

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({ component }) => (
	<Protected onlyUnAuth={true} component={component} />
);
