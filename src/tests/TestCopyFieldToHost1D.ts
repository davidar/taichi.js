//@ts-nocheck
import {ti} from "../taichi"
import {assertArrayEqual} from "./Utils"
async function testCopyFieldToHost1D(): Promise<boolean> {
    console.log("testCopyFieldToHost1D")
     
    await ti.init() 

    let f1 = ti.field([7], ti.i32)
    let f2 = ti.field([5], ti.i32)
    ti.addToKernelScope({f1, f2}) 

    let kernel = ti.kernel(
        function k() {
            //@ts-ignore
            for(let i of range(7)){
                f1[i] = i 
            }
             //@ts-ignore
            for(let i of range(5)){
                f2[i] = i + i
            }
        }
    )

    kernel()
    
    let f1Host = await f1.toArray1D()
    let f2Host = await f2.toArray1D()
     
    console.log(f1Host,f2Host)
    return assertArrayEqual(f1Host,[0,1,2,3,4,5,6]) && assertArrayEqual(f2Host,[0,2,4,6,8])
    
}

export {testCopyFieldToHost1D}