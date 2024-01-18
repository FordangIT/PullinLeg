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
        prediction.sort((a, b) => parseFloat(b.probability) - parseFloat(a.probability));
        
        setPredictionArr(prediction)
        setShowResult(true)
        setLoading(false)
        setResult(prediction[0].className)
        console.log(prediction[0].className, '이게뭐야1')
        console.log(result, '바뀌어야함')
        switch(prediction[0].className){
            case "독립운동가":
              setKeyword("독립운동가 관상으로 주변인에게 두터운 신뢰로 관계를 이어가는 관상입니다");
              console.log("setkeyword 실행")
              break;
            case "친일파":
              setKeyword("친일파 관상으로 자신의 이익을 위해 언제든 배신을 할 준비가 되어있는 관상입니다");
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
                <span className='text-gray-500 text-xs'>대표적인 독립운동가,친일파 데이터를 활용했습니다</span>
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
                {showResult? <span className='text-md'>{keyword}</span> : <span className='text-main-ppink text-sm font-bold'>{loading? <Loading /> : <span className='text-main-ppink text-sm font-bold'>'클릭'하여, 얼굴 정면 사진을 업로드해주세요!!😊</span> }</span>}
            </div>
            <div className='flex justify-center items-center mt-12'>
              <div onClick={()=> {inputRef.current.click()}} className='w-80 h-44 rounded-2xl bg-main-green hover:bg-main-yellow'>
                <input ref={inputRef} onChange={handleChangeFile} type="file" accept="image/*" className='hidden'/>
                {imgBase64 ? <img id="srcImg" src={imgBase64} alt='Input' className='w-full h-full rounded-2xl'/> : null}
                {/* <span className='text-xs text-gray-600'>얼굴 정면 사진을 업로드하세요!</span> */}
              </div>
            </div>
            {/* <div className='flex-col h-80'>
                <div className='flex justify-center'>
                    {imgBase64 ? <img id="srcImg" src={imgBase64} alt='Input' className='rounded-full w-40 h-40'/> : null}
                </div>
            </div> */}
            <div className='flex justify-center items-center my-24'>
                <button onClick={restart} className='w-20 h-8 bg-gray-700 rounded-sm'><span className='text-white'>다시하기</span></button>
            </div>   0 
        </div>
    </div>
 )
};

export default Test1;
