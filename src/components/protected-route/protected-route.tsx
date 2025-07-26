import { getIsAuthChecked, getUserInfo } from '@/services/auth/reducer';
import { useSelector } from '@/services/store';
import { TUserData } from '@/utils/api';
import { Navigate, useLocation } from 'react-router';

type TProtectedProps = {
	onlyUnAuth?: boolean;
	component: React.ReactNode;
};

type TOnlyUnAuthProps = Pick<TProtectedProps, 'component'>;

const Protected = ({ onlyUnAuth = false, component }: TProtectedProps) => {
	const isAuthChecked: boolean = useSelector(getIsAuthChecked);
	const user: Pick<TUserData, 'name' | 'email'> | null =
		useSelector(getUserInfo);
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
export const OnlyUnAuth = ({
	component,
}: TOnlyUnAuthProps): React.JSX.Element => (
	<Protected onlyUnAuth={true} component={component} />
);
