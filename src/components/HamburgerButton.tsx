interface Props {
  onClick: () => void
}

function HamburgerButton(props:Props) {

  return (
    <button onClick={props.onClick} className="w-[51px] h-[38px] flex flex-col items-center justify-center gap-y-[5px] bg-[#f8f9fa] rounded py-[6px] px-[14.5px] hover:bg-gray-100 transition-colors duration-300">
      <span className="w-full border border-[#707274]"></span>
      <span className="w-full border border-[#707274]"></span>
      <span className="w-full border border-[#707274]"></span>
    </button>
  )
}

export default HamburgerButton;