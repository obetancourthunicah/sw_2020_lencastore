import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './Page.css';
export default ({pageTitle, children})=>{
  return(
    <section className="page">
      <Header>{pageTitle || "Page"}</Header>
      <main>
        {children}
      </main>
      <Footer></Footer>
    </section>
  );
}
