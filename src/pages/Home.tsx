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
      title: 'Mashle 2nd Season', 
      img: 'https://cdn.jkdesu.com/assets/images/animes/video/image/jkvideo_e94f904c7a702700051e07fa2ade68c3.jpg'
    },
    {
      title: 'Nanatsu no Taizai: Mokushiroku no Yonkishi',
      img: 'https://cdn.jkdesu.com/assets/images/animes/video/image/jkvideo_9d8b3d66363db0f99f4cc366f75c29dd.jpg'
    },
    {
      title: 'Youkoso Jitsuryoku Shijou Shugi no Kyoushitsu e 3rd Season',
      img: 'https://cdn.jkdesu.com/assets/images/animes/video/image/jkvideo_b9a554d1f1f254184104c38aaf1cebe0.jpg'
    },
    {
      title: 'Ore dake Level Up na Ken',
      img: 'https://cdn.jkdesu.com/assets/images/animes/video/image/jkvideo_872a0592f5d9338d0ef888235dd28edc.jpg'
    }
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