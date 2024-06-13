

function SpecialsSkeleton() {
  const counts = [1,2,3,4,5,6,7,8];
  return (
    <ul className="flex flex-wrap gap-6">
      {
        counts.map((item) => 
          <li key={item}>
            <div className="special-card block w-[130px] xl:w-[165px] h-[218px] overflow-hidden" >
                <span className="block w-full h-[150px] rounded-lg overflow-hidden mb-1 bg-[#F1F2F3]" />
                <span className="block w-full h-[15px] mb-1 rounded-[10px] bg-[#F1F2F3]" />
                <span className="block w-2/5 h-[15px] rounded-[10px] bg-[#F1F2F3]" />
            </div>
          </li>
        )
      }
    </ul>
  )
}

export default SpecialsSkeleton;