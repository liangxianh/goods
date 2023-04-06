<template>
  <div class="goods-container">
    <header>
      <div class="left-title"><h3>{{ pageTitle }}</h3></div>
      <div class="right-cart">
        <nav class="shop-cart" @mouseover="mouseEnter()" @mouseenter="mouseEnter()" @mouseout="mouseOut">
          购物车
          <div class="cart-wrapper" v-show="cartShow">
            <div class="no-data" v-if="cartGoodsList.length === 0">还没有商品，快去浏览商品加入购物车吧！</div>
            <div v-else>
              <div class="item-info" v-for="(item, index) in cartGoodsList" :key="item.id">
                <span class="item-name">{{item.name}}</span>
                <span class="item-price">{{ item.price | priceFormat }} * {{ item.num }}</span>
                <button class="item-button button-del" @click="delCart(index)">删除</button>
              </div>
              <div class="item-buy">
                <button @click="toBuy()">购买</button>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
    <main>
      <div class="section-wrapper">
        <div class="section-item" v-for="item in list" :key="item.id">
          <div class="item-img">
            <template v-if="item.url">
              <img src="@/assets/imgs/large.jpg" alt="goods">
            </template>
            <template>
              <!-- 占位图 -->
              <img src="@/assets/imgs/large.jpg" alt="goods">
            </template>
          </div>
          <div class="item-info">
            <span class="item-name">{{item.name}}</span>
            <span class="item-price">{{ item.price | priceFormat }}</span>
            <button class="item-button button-add" @click="addCart(item)">加入购物车</button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'Goods',
  filters: {
    priceFormat (val) {
      return val.toFixed(2)
    }
  },
  data () {
    return {
      pageTitle: '购物天堂',
      list: [
        {
          id: 1,
          name: '香蕉-广西香蕉新鲜包熟包甜，不好吃包退呦！',
          price: 11,
          img: '@/assets/imgs/watch.png'
        },
        {
          id: 2,
          name: '苹果-保甜不好吃不要钱！',
          price: 23.00,
          img: '@/assets/imgs/phone.png'
        },
        {
          id: 3,
          name: '猕猴桃',
          description: '广西香蕉新鲜包熟包甜，不好吃包退呦！',
          price: 9.89,
          img: ''
        },
        {
          id: 4,
          name: '榴莲',
          price: 0.999,
          img: ''
        },
        {
          id: 5,
          name: '西瓜',
          price: 1199,
          img: ''
        }
      ],
      cartGoodsList: [],
      cartShow: false
    }
  },
  created () {
    // this.getGoods()
    var arr = [
      {
        id: 1,
        name: '香蕉-广西香蕉新鲜包熟包甜，不好吃包退呦！',
        price: 11,
        img: '@/assets/imgs/watch.png',
        num: 1
      },
      {
        id: 2,
        name: '香蕉-广西香蕉新鲜包熟包甜，不好吃包退呦！',
        price: 14,
        img: '@/assets/imgs/watch.png',
        num: 2
      }
    ]
    const total = arr.reduce((result, item) => {
      // eslint-disable-next-line no-return-assign
      return result += item.num * item.price
    })
    console.log(total)
  },
  methods: {
    // getGoods () {
    //   此处可以模拟从服务端获取数据
    // }
    addCart (item) {
      const isHave = this.cartGoodsList.findIndex((inner, index, arr) => {
        return inner.id === item.id
      })
      console.log(isHave)
      if (isHave > -1) {
        this.cartGoodsList[isHave].num++
      } else {
        const tempObj = {num: 1, ...item}
        this.cartGoodsList.push(tempObj)
      }
      // window.alert('添加成功')
      console.log(this.cartGoodsList)
    },
    delCart (index) {
      let r = window.confirm('确认删除该商品么？')
      if (r) {
        this.cartGoodsList.splice(index, 1)
      } else {
        console.log('已取消')
      }
    },
    mouseEnter () {
      this.cartShow = true
    },
    mouseOut () {
      this.cartShow = false
    },
    toBuy () {
      let total = 0
      this.cartGoodsList.forEach((item) => {
        total = total + item.num * item.price
      })
      // console.log(total)
      let r = window.confirm(`你的商品总价为${total},确定下单么？`)
      if (r) {
        // 确认下单的相关操心
        console.log('已成功下单')
        this.cartGoodsList = []
      } else {
        // 取消的相关操作
        console.log('已取消')
      }
    }
  }
}
</script>
<style scoped>
.goods-container {
  font-size: 14px;
}
header {
  display: flex;
}
header .left-title {
  width: 80px;
}
header .right-cart {
  flex: 1;
  align-self: flex-end;
  text-align: right;
  position: relative;
}
header .right-cart .shop-cart {
  line-height: 54px;
}
.cart-wrapper {
  width: 300px;
  position: absolute;
  top: 40px;
  right: 0;
  z-index: 99;
  background-color:#fff;
  padding: 12px 8px;
  box-shadow: 5px 0px 5px 0px rgba(0,0,0,0.5);
  border-radius: 10px;
}
.section-wrapper {
  display: flex;
  justify-content: left;
  flex-wrap: wrap;
}
.section-wrapper .section-item {
  /* flex: 1; */
  width: 300px;
  border: 1px solid #eeeeee;
  margin: 8px;
  padding: 8px;
}

.section-item .item-img {
  background: #fcfcfc;
  width: 300px;
  height: 300px;
  margin-bottom: 8px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.section-item .item-img img{
  height: 100%;
}
.item-info {
  height: 30px;
  line-height: 30px;
  display: flex;
}
.item-name {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: left;
  flex: 1;
}
.item-price {
  width: 72px;
  display: inline-block;
  text-align: right;
  padding-right: 4px;
}
.item-button {
  width: 84px;
}
.button-add {
  width: 84px;
  height: 28px;
}
.button-del {
  width: 50px;
  height: 24px;
  /* background-color: goldenrod;
  color: #fff; */
  /* border:none; */
}
.item-buy {
  text-align: center;
}
.item-buy button {
  width: 96%;
  height:30px;
}
</style>
