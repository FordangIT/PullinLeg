import { LinearProgress } from "@mui/material"
function Loading() {
return(
<div className="flex-col items-center justify-center"> 
    <div className="mt-4">
        <LinearProgress color="secondary"/>
    </div>
    <div className="text-center mt-10">
        AI가 당신의 관상을 확인하고 있습니다.
    </div>
</div>
   
   
)
}
export default Loading