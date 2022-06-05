export interface userType {
    id: number;
    name: string;
    email: string;
    password: string | null;
    gender: userGender;
    role: userRole;
    placeOfBirth: string | null;
    dateOfBirth: Date | null;
    status: userStatus;
    image: String | null;
    studyGroups?: Group[];
    createdAt: Date;
    updatedAt: Date;
}

export interface groupType {
    id: number;
    name: string;
    leader: string;
    subject: string;
    scheduleTime: Date;
    students?: User[];
    createdAt: Date;
    updatedAt: Date;
}

type userGender = 'none' | 'male' | 'female';

type userRole = 'student' | 'admin';

type userStaus = 'active' | 'inactive' | 'deleted';
