
import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home";
import Collections from "../pages/Collections";
import Products from "../pages/Products";
import Cart from "../pages/Cart";
import Checkouts from "../pages/Checkouts";
import Shipping from "../pages/Shipping";
import Payment from "../pages/Payment";
import WishLists from "../pages/WishLists";
import AllProducts from "../pages/AllProducts";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import Profile from "../pages/user/Profile";
import PrivateRoute from "./PrivateRoute";
import UserDashboard from "../layouts/DashboardLayout";
import Dashboard from "../pages/user/Dashboard";
import Order from "../pages/user/Order";
import ChangePassword from "../pages/user/ChangePassword";
import Error from "./../pages/Error/Error";
import Blog from "../pages/Blog";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <Main />,
		children: [
			{ path: "/", element: <Home /> },
			{
				path: "/collection/:category",
				element: <Collections />,
			},
			{
				path: "/cart",
				element: (
					// <PrivateRoute>
						<Cart />
					// </PrivateRoute>
				),
			},
			{ path: "/wishlists", element: <WishLists /> },
			{ path: "/collections/all", element: <AllProducts /> },
			{
				path: "/user-dashboard",
				element: (
					<PrivateRoute>
						<UserDashboard />
					</PrivateRoute>
				),
				children: [
					{ path: "/user-dashboard", element: <Dashboard /> },
					{ path: "/user-dashboard/profile", element: <Profile /> },
					{ path: "/user-dashboard/order/:orderIs", element: <Order /> },
					{
						path: "/user-dashboard/auth/change-password",
						element: <ChangePassword />,
					},
					// { path: "/user-dashboard/order/receive", element: <Receive /> },
					// { path: "/user-dashboard/order/review", element: <Review /> },
				],
			},
			{
				path: "/products/:productId",
				element: <Products />,
			},
			{ path: "/auth/register", element: <Register /> },
			{ path: "/auth/login", element: <Login /> },
			{ path: "/collection/blog", element: <Blog /> },
			// {
			// 	path: "*",
			// 	element: <Error />,
			// },
		],
	},

	{
		path: "/checkouts",
		element: (
			<PrivateRoute>
				<Checkouts />
			</PrivateRoute>
		),
	},
	{
		path: "/checkouts/shipping",
		element: (
			<PrivateRoute>
				<Shipping />
			</PrivateRoute>
		),
	},
	{
		path: "/checkouts/shipping/payment",
		element: (
			<PrivateRoute>
				<Payment />
			</PrivateRoute>
		),
	},

	{
		path: "*",
		element: <Error />,
	},
]);
