// import LinkComponent from "./components/LinkComponent"
// import Icon from "./components/Icon";
// import SearchBar from "./components/SearchBar";
// import SearchList from "./components/SearchList";
import Header from "./components/Header";
import Footer from "./components/Footer";


const App = () => {
    return (
        // <article className="h-[150px] p-5 flex items-center gap-x-5 bg-blue-50 font-mulish font-bold text-white">
        //     <Icon />
        //     <LinkComponent link="./" padding="py-[15px] px-[19px]">
        //         Directorio
        //     </LinkComponent>
        //     <LinkComponent link="./" padding="py-[15px] px-[19px]">
        //         Horario
        //     </LinkComponent>
        //     <LinkComponent link="./" padding="py-[15px] px-[19px]">
        //         Top
        //     </LinkComponent>
        //     <SearchBar />
        //     <div>
            
        // </article>
        // <div className="p-10 h-screen bg-blue-100">
        //     <SearchList animes={null} />
        // </div>
        <div className="bg-[#F7F7F7] h-screen flex flex-col justify-between">
            <Header />
            <Footer />
        </div>
        
    )
}

export default App;