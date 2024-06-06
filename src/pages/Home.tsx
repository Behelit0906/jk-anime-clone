import Layout from "./Layout";
import Carousel from "../components/Carousel";
import ProgramList from "../components/ProgramList";
import SpecialTable from "../components/SpecialTable";
import TopList from "../components/TopList";
import TableOfLatestAdditions from "../components/TableOfLatestAdditions";
import ListOfLatestAdditions from "../components/ListOfLatestAdditions";

function Home() {

  const items = [
    {
      title: 'Kimetsu no Yaiba: Hashira Geiko-hen', 
      img: 'https://cdn.jkdesu.com/assets/images/animes/video/image/jkvideo_1756de8854c866aaf9e81db33a15028e.jpg',
      id: 55701
    },
    {
      title: 'Tensei Kizoku, Kantei Skill de Nariagaru',
      img: 'https://cdn.jkdesu.com/assets/images/animes/video/image/jkvideo_01a1d82b10e85a4b723e0707458244f4.jpg',
      id: 55265
    },
    {
      title: 'Kaijuu 8-gou',
      img: 'https://cdn.jkdesu.com/assets/images/animes/video/image/jkvideo_aadb192a01447c8bcc3b4c1a46d3bd82.jpg',
      id: 52588
    },
    {
      title: 'Tensei shitara Slime Datta Ken 3rd Season',
      img: 'https://cdn.jkdesu.com/assets/images/animes/video/image/jkvideo_7dfb632a3a55951b44533f5a5f52b8ab.jpg',
      id: 53580
    },
    {
      title: 'Wind Breaker',
      img: 'https://cdn.jkdesu.com/assets/images/animes/video/image/jkvideo_391366c601403242ffb745d069287fae.jpg',
      id: 54900
    },
  ]
  return (
    <Layout>
      <div className="w-full pt-[50px] cl-2:w-[540px] md:w-[720px] cl-2:px-0 px-[15px] h-full flex flex-col lg:flex-row lg:items-start lg:gap-5 justify-center items-center lg:w-[960px] xl:w-[1170px]">
        <div className="w-full lg:w-[600px] xl:w-[740px] mb-3">
          <Carousel items={items}/>
          <SpecialTable />
        </div>
        <div className="w-full mb-10 lg:w-[320px] xl:w-[390px] shrink-0 lg:pt-4 lg:px-[15px]">     
          <ProgramList />
        </div>
      </div>
      <div className="w-full flex justify-center bg-gray-100 dark:bg-dark-100">
        <TopList/>
      </div>
      <div className="w-full flex justify-center">
        <TableOfLatestAdditions />
        <ListOfLatestAdditions />
      </div>
      
    </Layout>
  )
}

export default Home;