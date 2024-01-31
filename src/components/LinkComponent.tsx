import { Link } from "react-router-dom";

interface Props {
  children: string
  link: string
  padding: string
}

function LinkComponent(props:Props) {

  const classes = props.padding + ' rounded-[10px] font-mulish font-bold text-white bg-blue-100 dark:bg-dark-100 hover:bg-blue-150 transition-colors duration-300' 
  return (
    <Link to={props.link} className={classes}>
      {props.children}
    </Link>
  )
}

export default LinkComponent;