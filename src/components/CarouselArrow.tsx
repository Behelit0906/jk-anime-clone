interface Props {
  direction: 'left'|'right'
}

function CarouselArrow(props: Props) {
  const classes = props.direction === 'right' ? 'block border-t-[2.5px] border-r-[2.5px] border-white h-3 w-3' : 'block border-b-[2.5px] border-l-[2.5px] border-white h-3 w-3';
  return (
    <span className="flex justify-center items-center w-[40px] h-[40px] bg-blue-50 rotate-45">
      <span className="flex justify-center items-center bg-blue-100 w-[26px] h-[26px]">
        <span className={classes}></span>
      </span>
    </span>
  )
}

export default CarouselArrow;