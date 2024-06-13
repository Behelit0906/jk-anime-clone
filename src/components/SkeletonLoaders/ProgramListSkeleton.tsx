

function ProgramListSkeleton() {
  
  const count = [1,2,3,4,5,6,7,8,9,10]

  return (
    <ul className="w-full overflow-hidden h-[900px] rounded-[10px] bg-white dark:bg-dark-100 mb-10">
      {
        count.map((item) => 
          <li className="w-full min-h-[93px] transition-colors duration-300" key={item}>
            <div className="flex gap-x-3 pr-3 items-center py-[10px] px-[6px] h-fit border-b border-[#efefef] dark:border-[#303240]">
              <span className="relative w-[114px] h-[73px] rounded-[10px] overflow-hidden shrink-0 bg-[#F1F2F3]" />
              <div className="flex flex-col gap-2 justify-between w-full h-fit pr-3">
                <span className="block w-full h-[15px] rounded-[10px] bg-[#F1F2F3]" />
                <span className="block w-3/5 h-[15px] rounded-[10px] bg-[#F1F2F3]" />
              </div>
            </div>
          </li> 
        )
      } 
    </ul>
  )
}

export default ProgramListSkeleton;