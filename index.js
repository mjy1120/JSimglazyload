var imgSrc = [
  'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557291180766&di=2d4b642819f985efe7a446612374b000&imgtype=0&src=http%3A%2F%2Fimg17.3lian.com%2Fd%2Ffile%2F201702%2F20%2F4e1603e67b7b9cef85cebd5bb02d1b79.jpg',
  'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557291216983&di=1ad94f93df11070521ca6b636fdc4995&imgtype=0&src=http%3A%2F%2Fphoto.16pic.com%2F00%2F52%2F40%2F16pic_5240503_b.jpg',
  'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557291792961&di=f426865c9cce3868209d5a04a550d16d&imgtype=0&src=http%3A%2F%2Fimg5q.duitang.com%2Fuploads%2Fitem%2F201209%2F03%2F20120903213444_endkL.thumb.700_0.jpeg',
  'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1156876238,2394913651&fm=26&gp=0.jpg',
  'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557291866213&di=94305b93abe1b0e253dda04e3b6ef077&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201112%2F08%2F20111208223953_dxNQR.thumb.700_0.jpg',
  'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2936262041,4118049603&fm=26&gp=0.jpg'
]
const dataSrc = 'http://a.hiphotos.baidu.com/image/pic/item/18d8bc3eb13533fafab48a41a3d3fd1f41345b5a.jpg'
const content = document.getElementById("lazyCon")
const timeObj = {}
for (var i = 0; i < imgSrc.length; i++) {
  var imgNode = new Image()
  imgNode.setAttribute('data-src', imgSrc[i])
  imgNode.src = dataSrc
  content.appendChild(imgNode)
}
window.onload = () => {
  srcReplace()
  document.onscroll = () => {
    srcReplace()
  }
}

function srcReplace () {
  const imgList = Array.from(document.querySelectorAll('img'))
  const clientHeight = document.documentElement.clientHeight
  const startTime = new Date().getTime()
  imgList.map((item, index) => {
    const imgTop = item.getBoundingClientRect().top
    if (timeObj['img' + index] !== undefined) { return }
    if (imgTop > clientHeight) { return }
    else {
      item.src = item.getAttribute('data-src')
      Object.assign(timeObj, {
        ["img" + index]: false
      })
    }
    if (item.src === dataSrc) { return }
    else {
      item.onload = () => {
        const endTime = new Date().getTime()
        const needTime = endTime - startTime
        console.log('第' + (index + 1) + '张图片加载用了' + (needTime / 1000) + '秒')
      }
    }
  })
}