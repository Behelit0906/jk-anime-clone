

function ListOfLatestSkeleton() {
  const count = new Array(66).fill(null);
  return (
    <ul className="flex flex-col gap-1">
      {
        count.map((_item, key) => 
          <li className="bg-[#ebecee] w-full h-[20px]" key={key} />
        )
      }
    </ul>
  )
}

export default ListOfLatestSkeleton;