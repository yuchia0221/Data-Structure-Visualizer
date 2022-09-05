import React from "react";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

const footerStyle = {
    position: "absolute",
    top: "95%",
    left: "50%",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
};

export default function Footer() {
    return (
        <div style={footerStyle}>
            <Typography variant="body2" color="textSecondary">
                <Link style={{ fontSize: "2vmin" }} underline="none" href="/">
                    {"Copyright © Ultimate Visualizer " + new Date().getFullYear()}
                </Link>
            </Typography>
        </div>
    );
}
