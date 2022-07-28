export default function sw()
{
    let swURL = `${process.env.PUBLIC_URL}/sw.js`
    navigator.serviceWorker.register(swURL).then((res)=>{
        console.log('res '+ res)
    })
}