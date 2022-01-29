import img from "../../resources/img/404.png";
import { Link } from "react-router-dom";

const Page404 = () => {
    return (
        <div>
            <img src={img} alt="404_page_not found" />
            <Link
                style={{
                    display: "block",
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "24px",
                    margin: "20px auto 0",
                    width: "250px",
                    color: "#ffffff",
                    backgroundColor: "#9F0013",
                    textTransform: "uppercase",
                    cursor: "cointer",
                }}
                to="/characters"
            >
                Back to main page
            </Link>
        </div>
    );
};

export default Page404;
