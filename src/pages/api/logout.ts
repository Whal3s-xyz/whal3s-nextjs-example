import { withIronSessionApiRoute } from "iron-session/next";
import {sessionOptions} from "@/lib/session";

export default withIronSessionApiRoute(
    function logoutRoute(req, res) {
        // destroy the session
        req.session.destroy();
        res.json({
            isLoggedIn: false,
            walletAddress: "",
            signature: "",
        });
    },
    sessionOptions
);
