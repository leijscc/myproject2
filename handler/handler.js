const db = require('../mysql/mysql')
const jwt = require('jsonwebtoken')

const guessYouLike = function (req, res) {

  const str = 'select * from goods_table where goods_id>=1715 and goods_id <=2200'

  db.query(str, (err, result) => {

    if (err) {
      return res.send({
        status: 401,
        message: 'sql语句语法错误'
      })
    }
    res.send({
      status: 200,
      result
    })
  })
}

const getGoods = function (req, res) {
  const str = 'select * from goods_table where goods_id = ?'
  db.query(str, req.query.id, (err, result) => {
    if (err) {
      return res.send({
        status: 401,
        message: 'sql语句语法错误'
      })
    }
    res.send({
      status: 200,
      result
    })
  })
}
//用户登录
const login = function (req, res) {
  const secretKey = 'userinfo'
  const str = 'select * from user_table where telephone= ? and password= ?'
  db.query(str, [req.query.telephone, req.query.password], (err, result) => {
    if (err) return res.send({
      status: 401,
      message: '查询失败'
    })

    if (result.length > 0) {
      const token = jwt.sign({ username: req.query.username }, secretKey, { expiresIn: '60s' })
      res.send({
        status: 200,
        message: '登录成功',
        user_id: result[0].user_id,
        token: token
      })
    }
    else {
      res.send({
        status: 400,
        message: '用户名或密码有误'
      })
    }
  })
}
//检查账号是否已注册
const check = function (req, res) {
  const str = "select * from user_table where telephone=?"
  db.query(str, req.query.telephone, (err, result) => {
    if (err) {
      return res.send({
        status: 401,
        message: 'sql语句语法错误'
      })
    }
    if (result.length > 0) {
      res.send({
        status: 201,
        message: "用户已注册"
      })
    }
    else {
      res.send({
        status: 200,
        message: "用户已注册"
      })
    }
  })
}
//用户注册
const register = function (req, res) {
  const str = "insert into user_table set ?"
  db.query(str, { telephone: req.query.telephone, password: req.query.password }, (err, result) => {
    if (err) {
      return res.send({
        status: 401,
        message: 'sql语句语法错误'
      })
    }
    res.send({
      status: 200,
      message: "添加用户成功"
    })
  })
}
//添加购物车
const addCart = function (req, res) {
  const str = "insert into cart_table set ?"
  db.query(str, { goods_name: req.query.goods_name, goods_price: req.query.goods_price, goods_size: req.query.goods_size, goods_color: req.query.goods_color, user_id: req.query.user_id, goods_id: req.query.goods_id, goods_img: req.query.goods_img, goods_count: req.query.goods_count, goods_brand_name: req.query.goods_brand_name, goods_state: req.query.goods_state }, (err, result) => {
    if (err) {
      return res.send({
        status: 401,
        message: 'sql语句语法错误'
      })
    }
    res.send({
      status: 200,
      message: "添加购物车成功！"
    })
  })
}
//加载购物车页面
const loadCart = function (req, res) {
  const str = "select * from cart_table where user_id=?"
  db.query(str, req.query.user_id, (err, result) => {
    if (err) {
      return res.send({
        status: 401,
        message: 'sql语句语法错误'
      })
    }
    res.send({
      status: 200,
      result
    })
  })
}
//添加购物车成功
const success = function (req, res) {
  const str = 'select * from cart_table order by cart_id desc limit 1'
  db.query(str, (err, result) => {
    if (err) {
      return res.send({
        status: 401,
        message: 'sql语句语法错误'
      })
    }
    res.send({
      status: 200,
      result
    })
  })
}

//删除购物车中的商品
const delCart = function (req, res) {
  const str = 'delete from cart_table where cart_id=?'
  db.query(str, req.query.cart_id, (err, result) => {
    if (err) {
      return res.send({
        status: 401,
        message: 'sql语句语法错误'
      })
    }
    res.send({
      status: 200,
      message: "成功删除商品!"
    })
  })
}

//改变商品数量
const countChg = function (req, res) {
  const str = 'update cart_table set goods_count=? where cart_id=' + req.query.cart_id
  db.query(str, req.query.goods_count, (err, result) => {
    if (err) {
      return res.send({
        status: 401,
        message: 'sql语句语法错误'
      })
    }
    res.send({
      status: 200,
      message: "成功改变商品数量"
    })
  })
}

//商品状态改变
const stateChg = function (req, res) {
  const str = 'update cart_table set goods_state=? where cart_id=' + req.query.cart_id
  db.query(str, req.query.goods_state, (err, result) => {
    if (err) {
      return res.send({
        status: 401,
        message: 'sql语句语法错误'
      })
    }
    res.send({
      status: 200,
      message: "成功改变商品数量"
    })
  })
}

//改变全部商品状态
const fullChg = function (req, res) {
  const str = 'update cart_table set goods_state=? where user_id=' + req.query.user_id
  db.query(str, req.query.goods_state, (err, result) => {
    if (err) {
      return res.send({
        status: 401,
        message: 'sql语句语法错误'
      })
    }
    res.send({
      status: 200,
      message: "成功改变商品数量"
    })
  })
}

//删除所选商品
const delAll = function (req, res) {
  const str = 'delete from  cart_table  where user_id= ? and goods_state=1'
  db.query(str, req.query.user_id, (err, result) => {
    if (err) {
      return res.send({
        status: 401,
        message: 'sql语句语法错误'
      })
    }
    res.send({
      status: 200,
      message: "成功改变商品数量"
    })
  })
}
//清理购物车
const removeCart = function (req, res) {
  const str = 'delete from  cart_table  where user_id= ?'
  db.query(str, req.query.user_id, (err, result) => {
    if (err) {
      return res.send({
        status: 401,
        message: 'sql语句语法错误'
      })
    }
    res.send({
      status: 200,
      message: "已成功清理购物车！"
    })
  })
}

//加载库中所有商品

const loadGoods = function (req, res) {

  const str = 'select * from goods_table where goods_id <=10'

  db.query(str, (err, result) => {

    if (err) {
      return res.send({
        status: 401,
        message: 'sql语句语法错误'
      })
    }
    res.send({
      status: 200,
      result
    })
  })
}

//搜索商品

const searchGoods = function (req, res) {
  if (req.query.state == 0) {
    const str = "select * from goods_table where goods_name like '%" + req.query.query + "%'"
    db.query(str, (err, result) => {

      if (err) {
        return res.send({
          status: 401,
          message: 'sql语句语法错误'
        })
      }
      res.send({
        status: 200,
        result
      })
    })
  }
  else if (req.query.state == 1) {
    const str = "select * from goods_table where goods_name like '%" + req.query.query + "%' order by goods_sale desc"
    db.query(str, (err, result) => {

      if (err) {
        return res.send({
          status: 401,
          message: 'sql语句语法错误'
        })
      }
      res.send({
        status: 200,
        result
      })
    })
  }
  else if (req.query.state == 2) {
    const str = "select * from goods_table where goods_name like '%" + req.query.query + "%' order by goods_price desc"
    db.query(str, (err, result) => {

      if (err) {
        return res.send({
          status: 401,
          message: 'sql语句语法错误'
        })
      }
      res.send({
        status: 200,
        result
      })
    })
  }
  else {
    const str = "select * from goods_table where goods_name like '%" + req.query.query + "%' order by goods_price asc"
    db.query(str, (err, result) => {

      if (err) {
        return res.send({
          status: 401,
          message: 'sql语句语法错误'
        })
      }
      res.send({
        status: 200,
        result
      })
    })
  }
}

//搜索页面加载分类商品
const classifyGoods = function (req, res) {
  if (req.query.status == 1) {
    if (req.query.state == 0) {
      const str = "select * from goods_table where cat_id_one =? limit 300"
      db.query(str, req.query.id, (err, result) => {

        if (err) {
          return res.send({
            status: 401,
            message: 'sql语句语法错误'
          })
        }
        res.send({
          status: 200,
          result
        })
      })
    }
    else if(req.query.state==1){
      const str = "select * from goods_table where cat_id_one =? order by goods_sale desc limit 300"
      db.query(str, req.query.id, (err, result) => {

        if (err) {
          return res.send({
            status: 401,
            message: 'sql语句语法错误'
          })
        }
        res.send({
          status: 200,
          result
        })
      })
    }
    else if(req.query.state==2){
      const str = "select * from goods_table where cat_id_one =? order by goods_price desc limit 300 "
      db.query(str, req.query.id, (err, result) => {

        if (err) {
          return res.send({
            status: 401,
            message: 'sql语句语法错误'
          })
        }
        res.send({
          status: 200,
          result
        })
      })
    }
    else{
      const str = "select * from goods_table where cat_id_one =? order by goods_price asc limit 300 "
      db.query(str, req.query.id, (err, result) => {

        if (err) {
          return res.send({
            status: 401,
            message: 'sql语句语法错误'
          })
        }
        res.send({
          status: 200,
          result
        })
      })
    }
  }

  else if (req.query.status == 2) {
    if (req.query.state == 0) {
      const str = "select * from goods_table where cat_id_two =? limit 300"
      db.query(str, req.query.id, (err, result) => {

        if (err) {
          return res.send({
            status: 401,
            message: 'sql语句语法错误'
          })
        }
        res.send({
          status: 200,
          result
        })
      })
    }
    else if(req.query.state==1){
      const str = "select * from goods_table where cat_id_two =? order by goods_sale desc limit 300"
      db.query(str, req.query.id, (err, result) => {

        if (err) {
          return res.send({
            status: 401,
            message: 'sql语句语法错误'
          })
        }
        res.send({
          status: 200,
          result
        })
      })
    }
    else if(req.query.state==2){
      const str = "select * from goods_table where cat_id_two =? order by goods_price desc limit 300 "
      db.query(str, req.query.id, (err, result) => {

        if (err) {
          return res.send({
            status: 401,
            message: 'sql语句语法错误'
          })
        }
        res.send({
          status: 200,
          result
        })
      })
    }
    else{
      const str = "select * from goods_table where cat_id_two =? order by goods_price asc limit 300 "
      db.query(str, req.query.id, (err, result) => {

        if (err) {
          return res.send({
            status: 401,
            message: 'sql语句语法错误'
          })
        }
        res.send({
          status: 200,
          result
        })
      })
    }
  }
  else {
    if (req.query.state == 0) {
      const str = "select * from goods_table where cat_id_three =? limit 300"
      db.query(str, req.query.id, (err, result) => {

        if (err) {
          return res.send({
            status: 401,
            message: 'sql语句语法错误'
          })
        }
        res.send({
          status: 200,
          result
        })
      })
    }
    else if(req.query.state==1){
      const str = "select * from goods_table where cat_id_three =? order by goods_sale desc limit 300"
      db.query(str, req.query.id, (err, result) => {

        if (err) {
          return res.send({
            status: 401,
            message: 'sql语句语法错误'
          })
        }
        res.send({
          status: 200,
          result
        })
      })
    }
    else if(req.query.state==2){
      const str = "select * from goods_table where cat_id_three =? order by goods_price desc limit 300 "
      db.query(str, req.query.id, (err, result) => {

        if (err) {
          return res.send({
            status: 401,
            message: 'sql语句语法错误'
          })
        }
        res.send({
          status: 200,
          result
        })
      })
    }
    else{
      const str = "select * from goods_table where cat_id_three =? order by goods_price asc limit 300 "
      db.query(str, req.query.id, (err, result) => {

        if (err) {
          return res.send({
            status: 401,
            message: 'sql语句语法错误'
          })
        }
        res.send({
          status: 200,
          result
        })
      })
    }
  }
}

//添加订单
const addIndent = function (req, res) {
  const str = "insert into indent_table set ?"
  db.query(str, { goods_image: req.query.goods_image, goods_time: req.query.goods_time, goods_name: req.query.goods_name, goods_brand_name: req.query.goods_brand_name, goods_count: req.query.goods_count, goods_money: req.query.goods_money, user_id: req.query.user_id }, (err, result) => {
    if (err) {
      return res.send({
        status: 401,
        message: 'sql语句语法错误'
      })
    }
    res.send({
      status: 200,
      message: "添加订单成功！"
    })
  })
}

//加载订单
const loadIndent = function (req, res) {
  const page = (req.query.page - 1) * 4
  const str = "select * from indent_table where user_id=? limit " + page + ", 4"
  db.query(str, req.query.user_id, (err, result) => {

    if (err) {
      return res.send({
        status: 401,
        message: 'sql语句语法错误'
      })
    }
    res.send({
      status: 200,
      result
    })
  })
}

//加入收藏
const addConcern = function (req, res) {

  const str = "insert into concern_table set? "

  db.query(str, { user_id: req.query.user_id, goods_id: req.query.goods_id, goods_img: req.query.goods_image, goods_name: req.query.goods_name, goods_price: req.query.goods_price, goods_brand_name: req.query.goods_brand_name, goods_size: req.query.goods_size, goods_count: req.query.goods_count, goods_size: req.query.goods_size, goods_color: req.query.goods_color, goods_state: req.query.goods_state }, (err, result) => {

    if (err) {
      return res.send({
        status: 401,
        message: 'sql语句语法错误'
      })
    }
    res.send({
      status: 200,
      result
    })
  })
}

//加载收藏页面
const loadConcern = function (req, res) {
  const page = (req.query.page - 1) * 8
  const str = "select * from concern_table where user_id=? limit " + page + ", 8 "
  db.query(str, req.query.user_id, (err, result) => {

    if (err) {
      return res.send({
        status: 401,
        message: 'sql语句语法错误'
      })
    }
    res.send({
      status: 200,
      result
    })
  })
}

//移出收藏
const delConcern = function (req, res) {
  const str = 'delete from  concern_table  where concern_id=?'
  db.query(str, req.query.concern_id, (err, result) => {
    if (err) {
      return res.send({
        status: 401,
        message: 'sql语句语法错误'
      })
    }
    res.send({
      status: 200,
      message: "成功移出收藏"
    })
  })
}

//删除订单
const delIndent = function (req, res) {
  const str = 'delete from  indent_table  where id=?'
  db.query(str, req.query.id, (err, result) => {
    if (err) {
      return res.send({
        status: 401,
        message: 'sql语句语法错误'
      })
    }
    res.send({
      status: 200,
      message: "成功移出收藏"
    })
  })
}

//加载用户地址
const loadAddress = function (req, res) {
  const str = "select * from user_table where user_id=?"
  db.query(str, req.query.user_id, (err, result) => {
    if (err) {
      return res.send({
        status: 401,
        message: 'sql语句语法错误'
      })
    }
    res.send({
      status: 200,
      result
    })
  })
}

//修改用户地址
const rectAddress = function (req, res) {
  const str = "update user_table set ? where user_id=" + req.query.user_id
  db.query(str, { user_name: req.query.user_name, region: req.query.region, address: req.query.address, fixed_phone: req.query.fixed_phone, email: req.query.email, phone: req.query.phone }, (err, result) => {
    if (err) {
      return res.send({
        status: 401,
        message: 'sql语句语法错误'
      })
    }
    res.send({
      status: 200,
      result
    })
  })
}



module.exports = {
  guessYouLike,
  getGoods,
  login,
  check,
  register,
  addCart,
  loadCart,
  success,
  delCart,
  countChg,
  stateChg,
  fullChg,
  delAll,
  removeCart,
  loadGoods,
  searchGoods,
  classifyGoods,
  addIndent,
  loadIndent,
  addConcern,
  loadConcern,
  delConcern,
  delIndent,
  loadAddress,
  rectAddress,

}