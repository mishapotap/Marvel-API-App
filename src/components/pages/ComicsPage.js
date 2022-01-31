import { Helmet, HelmetProvider } from "react-helmet-async";
import AppBanner from "../appBanner/AppBanner";
import ComicsList from "../comicsList/ComicsList";

const ComicsPage = () => {
    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <meta name="description" content="Page with a list of comics" />
                    <title>Comics page</title>
                </Helmet>
            </HelmetProvider>
            <AppBanner />
            <ComicsList />
        </>
    );
};

export default ComicsPage;
