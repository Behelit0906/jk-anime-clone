
interface Props {
  image: string;
  number: number
}

function ChapterCard ({image, number}: Props) {
  return (
    <article className="w-[47%] lg:w-[210px] xl:w-[262px] h-[150px] pl-2 pt-2 rounded-lg overflow-hidden" style={{
      backgroundImage: `url('${image}')`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: 'cover'
    }}>
      <span className="block w-20 py-1 px-3 bg-myOrange-50 text-white text-[10px] font-mulish rounded-3xl">
        Chapter {number}
      </span>
    </article>
  );
}

export default ChapterCard