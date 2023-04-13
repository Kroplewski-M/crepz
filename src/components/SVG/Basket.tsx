
interface Props{
    fill:string,
    width:number,
    height:number,
}
export const Basket = (props:Props)=>{
    return(
<svg fill={props.fill} width={props.width} height={props.height} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M21,9H19.535l-3.7-5.555a1,1,0,0,0-1.664,1.11L17.132,9H6.868L9.832,4.555a1,1,0,0,0-1.664-1.11L4.465,9H3a1,1,0,0,0,0,2H4v8a2,2,0,0,0,2,2H18a2,2,0,0,0,2-2V11h1a1,1,0,0,0,0-2ZM9,17.5a1,1,0,0,1-2,0v-4a1,1,0,0,1,2,0Zm4,0a1,1,0,0,1-2,0v-4a1,1,0,0,1,2,0Zm4,0a1,1,0,0,1-2,0v-4a1,1,0,0,1,2,0Z"></path></g></svg>)}