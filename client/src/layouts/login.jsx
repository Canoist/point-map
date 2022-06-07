import { Box } from "@mui/material";
import React from "react";

const Login = () => {
    // const { type } = useParams();
    // const dispatch = useDispatch();
    // const [formType, setFormType] = useState(
    //     type === "register" ? type : "login"
    // );
    // const toggleFormType = () => {
    //     setFormType((prev) => (prev === "register" ? "login" : "register"));
    //     dispatch(resetAuthErrors());
    // };

    return (
        <Box
            sx={{
                width: "100vw" - "18px",
                minHeight: "80vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                "&::-webkit-scrollbar": {
                    width: "18px",
                },
            }}>
            <h1>Login Page</h1>
            {/* {formType === "register" ? (
                <>
                    <Box sx={{ pb: { xs: "100px", md: "70px" } }}>
                        <RegisterForm toggleForm={toggleFormType} />
                    </Box>
                </>
            ) : (
                <>
                    <SignInForm toggleForm={toggleFormType} />
                </>
            )} */}
        </Box>
    );
};
export default Login;
