import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

interface Props {
  children: React.ReactNode
}

function Layout(props:Props) {
  return (
    <div className="flex flex-col bg-[#F7F7F7] dark:bg-dark-150">
      <Header/>
      <main className="flex flex-col items-center">
        {props.children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout;