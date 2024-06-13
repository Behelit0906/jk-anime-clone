import TopListCard from "./TopListCard";
import { Link } from "react-router-dom";
import { IoIosArrowRoundDown } from "react-icons/io";
import TimerComponent from "./Timer";
import top from '../json/top.json';

function TopList() {

  return (
    <section className="flex flex-col w-full cl-2:w-[540px] px-[15px] cl-2:px-0 lg:px-[15px] md:w-[720px] lg:w-[960px] xl:w-[1170px] py-6 bg-gray-100 dark:bg-dark-100 pb-10">
      <h4 className="font-oswald border-l-4 border-myOrange-50 pl-4 py-2 text-2xl font-semibold leading-[21px] mb-7">
        <span className="text-[#3a3a3a] dark:text-white">TOP ANIMES</span>
        <TimerComponent />
      </h4>
      { top.data &&
        <div className="flex flex-col lg:flex-row lg:gap-x-6">
          <div className="h-[260px] lg:w-[290px] xl:w-[360px] shrink-0">
            <TopListCard 
            height="h-full"
            rank={1}
            rankColor="bg-red-500"
            title={top.data[0].title}
            backgroundImage={top.data[0].images.jpg.large_image_url}
            score={top.data[0].score}
            id={top.data[0].mal_id}
            />
        
          </div>
          <div className="flex flex-col lg:w-full gap-y-2">
            <div className="flex flex-col lg:flex-row w-full h-[390px] gap-y-2 lg:h-full lg:gap-x-7">
              {
                top.data.map((anime, key) => {
                  const keys = [1, 2, 3];
                  if(keys.includes(key)) {
                    return (
                      <TopListCard
                      key={key} 
                      height="h-[125px]"
                      rank={key + 1}
                      rankColor="bg-blue-50"
                      title={anime.title}
                      backgroundImage={anime.images.jpg.large_image_url}
                      score={anime.score}
                      id={anime.mal_id}
                      />
                    )
                  }
                })
              }
            </div>
            <div className="flex gap-x-7 w-full h-[390px] lg:h-full lg:gap-x-2">
              <div className="flex flex-col w-2/4 gap-2 lg:flex-row">
                {
                  top.data.map((anime, key) => {
                    const keys = [4, 5, 6];
                    if(keys.includes(key)) {
                      return (
                        <TopListCard
                        key={key} 
                        height="h-full"
                        rank={key + 1}
                        rankColor="bg-myOrange-50"
                        title={anime.title}
                        backgroundImage={anime.images.jpg.large_image_url}
                        fontSize="text-[10px]"
                        score={anime.score}
                        id={anime.mal_id}
                        />
                      )
                    }
                  })
                }
              </div>
              <div className="flex flex-col w-2/4 gap-2 lg:flex-row">
                {
                  top.data.map((anime, key) => {
                    const keys = [7, 8, 9];
                    if(keys.includes(key)) {
                      return (
                        <TopListCard
                        key={key} 
                        height="h-full"
                        rank={key + 1}
                        rankColor="bg-myOrange-50"
                        title={anime.title}
                        backgroundImage={anime.images.jpg.large_image_url}
                        fontSize="text-[10px]"
                        score={anime.score}
                        id={anime.mal_id}
                        />
                      )
                    }
                  })
                }
              </div>
            </div>
          </div>
        </div>
      }
      <div className="flex justify-center mt-10">
        <Link className="font-mulish text-2xl text-[#3a3a3a] dark:text-white transition-colors duration-200 dark:hover:text-blue-50 hover:text-blue-50" to="/">
          <IoIosArrowRoundDown className="inline" /> View full list <IoIosArrowRoundDown className="inline" />
        </Link> 
      </div> 
    </section>
  )
}

export default TopList;