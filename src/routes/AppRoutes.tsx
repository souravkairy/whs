import {
    Routes,
    Route,
} from "react-router-dom";
import Login from '../components/auth/Login';
import Dashboard from '../components/dashboard/Dashboard';
import Group from '../components/groups/Group';
import Groups from '../components/groups/Groups';
import Settings from '../components/setting/Settings';
import EditStudent from "../components/students/EditStudent";
import Student from '../components/students/Student';
import Students from '../components/students/Students';
import User from '../components/users/User';
import Ds from '../Ds';
import HomePage from '../pages/HomePage';
import ProtectedRoutes from "./ProtectedRoutes";
const AppRoutes = () => {


    return (
        <Routes>
            {/* <Route path="/" element={<HomePage />} /> */}
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<ProtectedRoutes><Dashboard /></ProtectedRoutes>} />
            <Route path="/students" element={<ProtectedRoutes><Students /></ProtectedRoutes>} />
            <Route path="/students/:id" element={<ProtectedRoutes><Student /></ProtectedRoutes>} />
            <Route path="/edit-students/:id" element={<ProtectedRoutes><EditStudent /></ProtectedRoutes>} />
            <Route path="/groups" element={<ProtectedRoutes><Groups /></ProtectedRoutes>} />
            <Route path="/groups/:id" element={<ProtectedRoutes><Group /></ProtectedRoutes>} />
            <Route path="/setting/users" element={<ProtectedRoutes><Settings /></ProtectedRoutes>} />
            <Route path="/setting/users/:id" element={<ProtectedRoutes><User /></ProtectedRoutes>} />


            <Route path="/testdashboard" element={<Ds />} />
        </Routes>
    )
}

export default AppRoutes