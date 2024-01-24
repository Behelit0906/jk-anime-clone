import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

interface Props {
  children: React.ReactNode
}

function Layout(props:Props) {
  return (
    <div className="flex flex-col items-center justify-between h-screen bg-[#F7F7F7]">
      <Header/>
      <main>
        {props.children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout;