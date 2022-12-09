const express=require('express')

const router =require('./router/router')
//解决跨域问题
const cor =require('cors')

const app=express()

app.use(cor())

app.use(router)

app.listen(80,()=>{
  console.log('success');
})