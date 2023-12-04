import React from 'react';
import { Helmet } from "react-helmet";
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children, title, description, keywords, author }) => {
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                <meta name="author" content={author} />
                <title>{title}</title>
            </Helmet>
            <Header />
            <main style={{ minHeight: '63vh' }}>
  
                {children}

            </main>
            <Footer />
        </>
    );
};

Layout.defaultProps = {
    title: 'Horus Santeria',
    description: 'Santeria Horus, variedad de productos religiosos y afines',
    keywords: 'SANTERIA, VELAS, SAHUMERIOS, CARTAS, TAROT',
    author: 'Ariel Videla',
};

export default Layout;