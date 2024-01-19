import React, { useState, useEffect, useRef } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as tmImage from '@teachablemachine/image';
import Loading from '../components/Loading';
const Test1 = () => {
    const [imgBase64, setImgBase64] = useState("")
    const [imgFile, setImgFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showResult, setShowResult] = useState(false); 
    const [predictionArr, setPredictionArr] = useState([]); 
    const [result, setResult] = useState(null); 
    const [keyword, setKeyword] = useState("");
    
    const inputRef = useRef(); 

    const URL = 'https://teachablemachine.withgoogle.com/models/XoUiNFOgO/'
    const modelURL = URL + "model.json"
    const metadataURL = URL + "metadata.json" 

    let model 


    const init = async () => {
        try{
            model = await tmImage.load(modelURL, metadataURL); 
            console.log("모델이 성공적으로 로드", 'model')
            let maxPredictions = model.getTotalClasses();
        } catch (error) {
            console.log("모델 로드 중 오류:", error)
        }
       
    }

    const predict = async () => {
        model = await tmImage.load(modelURL, metadataURL); 
        const tempImage = document.getElementById("srcImg"); 
        const prediction = await model.predict(tempImage, false); 
        console.log(prediction, 'prediction')
        prediction.sort((a, b) => parseFloat(b.probability) - parseFloat(a.probability));
        
        setPredictionArr(prediction)
        setShowResult(true)
        setLoading(false)
        setResult(prediction[0].className)
        console.log(prediction[0].className, '이게뭐야1')
        console.log(result, '바뀌어야함')
        switch(prediction[0].className){
            case "독립운동가":
              setKeyword("강한 책임감으로 절대 배신하지 않을 독립운동가 관상입니다.");
              console.log("setkeyword 실행")
              break;
            case "친일파":
              setKeyword("친일파 관상으로 자신의 이익을 위해 언제든 나라를 팔 준비가 되어있는 관상입니다");
              console.log("setkeyword 실행")
              break;
            case "현대사기꾼":
                setKeyword("사기꾼 관상으로 주변인에게 피해를 입혀 자신의 이익으로 챙길 관상입니다.");
                console.log("setkeyword 실행")
                break;
            case "현대흉악범죄":
                setKeyword("큰 범죄를 저지를 관상으로 은둔하며 살지 말고, 사회생활을 활발하게 함으로써 밝은 에너지로 살아가시길 바랍니다.");
                console.log("setkeyword 실행")
                break;
            case "현대의인":
                setKeyword("현대 의인 관상으로, 자신의 삶에서 기회가 된다면 다른 사람들을 도울 관상입니다.");
                console.log("setkeyword 실행")
                break;                  
            default:
              break;
          }
          console.log("가장높은확률 : ",prediction[0].className)
          console.log("keyword",keyword)
    }; 

    const handleChangeFile = (event) => {
        setLoading(true); 
        setShowResult(false); 
        setPredictionArr(null)
        setResult(null); 

        let reader = new FileReader(); 

        reader.onloadend = () => {
            const base64 = reader.result; 
            if(base64) {
                setImgBase64(base64.toString()); 
            }
        }; 

        if(event.target.files[0]){
            reader.readAsDataURL(event.target.files[0]); 
            setImgFile(event.target.files[0])

            init().then(() => {
                console.log("init 모델")
                predict()
               }); 
        }
    }
   const restart = () => {
    window.location.reload();
   }
 return(
    <div className='bg-black w-full min-h-screen flex justify-center items-center'>
        <div className='bg-main-pink w-[40rem] min-h-screen flex-col'>
            <div className='flex justify-center items-center mt-20'>
                <span className='text-black text-3xl font-bold'>
                의리/배신 관상 테스트
                </span>
            </div>
            <div className='mt-5 flex justify-center items-center'>
                <span className='text-gray-500 text-xs'>대표적인 독립운동가, 의인/ 친일파, 사기꾼, 흉악범죄자 데이터를 학습시킨 AI입니다.</span>
            </div>
            {/* <div className='flex justify-center items-center mt-8 flex-col'>
                <span className='text-main-ppink text-sm font-bold'>
                    3,420,045,254,485번 내 첫인상을 확인했습니다.
                </span>
                <span className='text-main-ppink text-sm font-bold'>
                    (2024년 1월 13일 15:00 기준)
                </span>
            </div> */}
            
            <div className='flex justify-center items-center mt-20 flex-col'>
                {showResult? <span className='text-main-ppink text-sm font-bold'>밑에서 결과를 확인할 수 있습니다.</span>: <span className='text-main-ppink text-sm font-bold'>{loading? <Loading /> : <span className='text-main-ppink text-sm font-bold'>'클릭'하여, 얼굴 정면 사진을 업로드해주세요!!😊</span> }</span>}
            </div>
            <div className='flex justify-center items-center mt-12'>
              <div onClick={()=> {inputRef.current.click()}} className='w-80 h-44 rounded-2xl bg-main-green hover:bg-main-yellow'>
                <input ref={inputRef} onChange={handleChangeFile} type="file" accept="image/*" className='hidden'/>
                {imgBase64 ? <img id="srcImg" src={imgBase64} alt='Input' className='w-full h-full rounded-2xl'/> : null}
                {/* <span className='text-xs text-gray-600'>얼굴 정면 사진을 업로드하세요!</span> */}
              </div>
            </div>
            <div className='flex justify-center items-center my-24'>
                <button onClick={restart} className='w-20 h-8 bg-gray-700 rounded-sm'><span className='text-white'>다시하기</span></button>
            </div> 
            <div className='mt-20 flex justify-center items-center'>
               {showResult ? <span className='text-main-ppink text-md font-bold'>결과🙊</span> : ""}
            </div>
            <div className='flex-col my-8'>
                <div className='flex justify-center'>
                    {imgBase64 ? <img id="srcImg" src={imgBase64} alt='Input' className='rounded-full w-40 h-40'/> : null}
                </div>
            </div>
            <div className='my-8 flex justify-center items-center'>
               {showResult ? <span className='text-md w-2/3 font-semibold'>{keyword}</span> : ""}
            </div>
            
            
           
        </div>
    </div>
 )
};

export default Test1;
