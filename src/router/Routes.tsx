import { createBrowserRouter } from 'react-router'
import AuthLayout from '../Layouts/AuthLayout'
import Login from '../views/Login'
import DashboardLayout from '../Layouts/DashboardLayout'
import Categories from '../views/Categories'
import AuthMidleware from '../middleware/AuthMidleware'

const Routes = createBrowserRouter([
    {
        path: '/auth',
        element: <AuthLayout />,
        children: [
            {
                index: true,
                path: '/auth/login',
                element: <Login />,

            },
        ]
    },

    {
        path: '/admin',
        element: <AuthMidleware />,
        children:[
            {
                path:'/admin',
                element: <DashboardLayout />,
                children:[
                    {
                        index:true,
                        element: <Categories />
                    },
                    {
                        path: '/admin/categories',
                        element: <Categories />
                    }
                ]
            }
        ]
    }
])


export default Routes
