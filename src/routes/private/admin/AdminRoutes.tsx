import type { ReactNode } from 'react';
import {
  AddStudent,
  EditStudent,
  ViewStudents,
  AddTeacher,
  EditTeacher,
  ViewTeachers,
} from '../../../pages/private/admin';

interface IAdminRoute {
  name: string;
  path: string;
  component: ReactNode;
}

const AdminRoutes: IAdminRoute[] = [
  {
    name: 'add-student',
    path: '/admin/add-student',
    component: <AddStudent />,
  },

  {
    name: 'edit-student',
    path: '/admin/edit-student/:id',
    component: <EditStudent />,
  },

  {
    name: 'view-students',
    path: '/admin/view-students',
    component: <ViewStudents />,
  },
  {
    name: 'add-teacher',
    path: '/admin/add-teacher',
    component: <AddTeacher />,
  },

  {
    name: 'edit-teacher',
    path: '/admin/edit-teacher/:id',
    component: <EditTeacher />,
  },

  {
    name: 'view-teacher',
    path: '/admin/view-teacher',
    component: <ViewTeachers />,
  },
];

export default AdminRoutes;
