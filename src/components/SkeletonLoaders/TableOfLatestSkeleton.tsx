

function TableOfLatestSkeleton () {

  const count = new Array(40).fill(null);

  return (
    <ul className="flex gap-3 flex-wrap justify-between lg:justify-between">
      {
        count.map((_item, index) => 
          <li className="w-[47%] max-w-[330px] lg:w-[130px] xl:w-[165px] mb-[30px]" key={index}>
            <div className="relative w-full h-[255px] rounded-lg overflow-hidden bg-[#ebecee]" />
            <div className="py-2 flex justify-center flex-nowrap gap-1">
              <span className="block bg-[#ebecee] w-[70px] h-[17px] rounded-xl" />
              <span className="block bg-[#ebecee] w-[70px] h-[17px] rounded-xl" />
            </div>
        </li>  
        )
      }    
    </ul>
  )
}

export default TableOfLatestSkeleton;