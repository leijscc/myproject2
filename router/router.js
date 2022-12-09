const express = require('express')

const handler = require('../handler/handler')

const router = express.Router()

router.get('/guess', handler.guessYouLike)

router.get('/goods', handler.getGoods)
//用户登录路由
router.get('/login', handler.login)
//检查账户是否已注册路由
router.get('/check', handler.check)
//用户注册路由
router.get('/register', handler.register)
//添加商品到购物车中路由
router.get('/cart', handler.addCart)
//加载购物车页面路由
router.get('/loadcart', handler.loadCart)
//添加购物车成功路由
router.get('/success', handler.success)
//删除购物车中单个商品路由
router.get('/delcart', handler.delCart)
//改变购物车中商品数量路由
router.get('/countchg', handler.countChg)
//改变购物车中商品状态路由
router.get('/statechg', handler.stateChg)
//全选购物车中的商品路由
router.get('/fullchg', handler.fullChg)
//删除购物车中所选商品路由
router.get('/delall', handler.delAll)
//清理购物车路由
router.get('/removecart', handler.removeCart)
//加载商品路由
router.get('/loadgoods', handler.loadGoods)
//搜索商品路由
router.get('/searchgoods', handler.searchGoods)
//分类商品路由
router.get('/classifygoods', handler.classifyGoods)
//添加订单路由
router.get('/addindent', handler.addIndent)
//加载订单路由
router.get('/loadindent', handler.loadIndent)
//加入收藏路由
router.get('/addconcern', handler.addConcern)
//加载收藏路由
router.get('/loadconcern', handler.loadConcern)
//移出收藏路由
router.get('/delconcern', handler.delConcern)
//删除订单路由
router.get('/delindent', handler.delIndent)
//加载用户地址路由
router.get('/loadaddress', handler.loadAddress)
//修改用户地址路由
router.get('/rectaddress', handler.rectAddress)




module.exports = router