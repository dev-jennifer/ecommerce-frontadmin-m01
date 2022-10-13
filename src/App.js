import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import PropTypes from "prop-types";
import { connect, useSelector } from "react-redux";
import { userSignOutRequest } from "./store/auth";
import blue from "@mui/material/colors/blue";
import Login from "./Login/Login";
import Setting from "./Setting/Setting";
import Inventory from "./Inventory/Inventory";
import Orders from "./Orders/Orders";
import Home from "./Home/Home";
import AddProduct from "./Inventory/AddProduct";
import Users from "./Users/Users";
import { LayoutBar } from "./Layout/LayoutBar";
import ForgotPassword from "./Login/ForgotPassword";
import ChangePassword from "./Login/ChangePassword";
import Category from "./Inventory/Category/Category";

const theme = createTheme({
  palette: {
    primary: {
      light: blue[300],
      main: blue[500],
      dark: blue[700],
    },
  },

  overrides: {
    MuiOutlinedInput: {
      root: {
        "&:hover:not($disabled):not($focused):not($error) $notchedOutline": {
          border: "2px solid",
          borderColor: blue[200],
        },
      },
    },
    MuiTableCell: {
      root: {
        borderBottom: "none",
      },
    },
  },
});
function App(props) {
  const auth = useSelector((state) => state.auth.isAuthenticated);

  function Private({ children }) {
    if (!auth === true) {
      return <Login />;
    }
    return children;
  }

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route exact path="/password" element={<ForgotPassword />} />
          <Route path="/reset/:id" element={<ChangePassword />} />
          <Route
            path="/"
            element={
              <Private>
                <LayoutBar />
              </Private>
            }
          >
            <Route
              exact
              path="/"
              element={
                <Private>
                  <Home />
                </Private>
              }
            />
            <Route
              path="/setting"
              element={
                <Private>
                  <Setting />
                </Private>
              }
            />
            <Route
              path="/users"
              element={
                <Private>
                  <Users />
                </Private>
              }
            />

            <Route
              path="/inventory/add"
              element={
                <Private>
                  <AddProduct />
                </Private>
              }
            />
            <Route
              path="/inventory/category"
              element={
                <Private>
                  <Category />
                </Private>
              }
            />
            <Route
              path="/inventory"
              element={
                <Private>
                  <Inventory />
                </Private>
              }
            />
            <Route
              path="/orders"
              element={
                <Private>
                  <Orders />
                </Private>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

App.propTypes = {
  auth: PropTypes.object.isRequired,
  userSignOutRequest: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps, { userSignOutRequest })(App);