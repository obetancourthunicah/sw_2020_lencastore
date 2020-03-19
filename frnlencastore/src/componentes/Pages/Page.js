import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './Page.css';
export default ({pageTitle, hideFooter ,children})=>{
  const finalHideFooter = hideFooter || false;
  return(
    <section className="page">
      <Header>{pageTitle || "Page"}</Header>
      <main>
        {children}
      </main>
      {(!finalHideFooter)?(<Footer></Footer>):null}
    </section>
  );
}
