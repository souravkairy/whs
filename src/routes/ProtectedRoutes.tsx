import { Navigate } from 'react-router-dom';

type Props = {
    children: JSX.Element,
};

const ProtectedRoutes = ({ children }: Props) => {

    const token = localStorage.getItem('user-info')

    if (!token) {
        return <Navigate to="/login" />;
    }

    return children;
}

export default ProtectedRoutes

