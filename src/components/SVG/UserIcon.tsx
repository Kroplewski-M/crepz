
interface Props{
    fill:string,
    width:number,
    height:number,
}
export const UserIcon = (props:Props)=>{
    return(
<svg height={props.height} width={props.width} version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 60.671 60.671" xmlSpace="preserve" fill={props.fill}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <ellipse cx="30.336" cy="12.097" rx="11.997" ry="12.097"></ellipse> <path  d="M35.64,30.079H25.031c-7.021,0-12.714,5.739-12.714,12.821v17.771h36.037V42.9 C48.354,35.818,42.661,30.079,35.64,30.079z"></path> </g> </g> </g></svg>)}