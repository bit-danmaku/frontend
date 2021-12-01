<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import {onMounted, ref, watch} from 'vue'
import {useRoute} from 'vue-router'
import DPlayer from 'dplayer'

function isNumeric(str) {
  if (typeof str != "string") return false // we only process strings!  
  return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

const dp = ref(null)

const route = useRoute()
const id = ref(route.params.channelID)

const newPlayer = (channelID) => {

  if (isNumeric(channelID)) {
    const dp = new DPlayer({
      container: document.getElementById('dplayer'),
      video: {
        url: "https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4",
      },
      danmaku: {
        id: null,
        api: `http://10.4.20.63:8008/channel/${channelID}/`,
      },
      /*apiBackend: {*/
      /*read: function (endpoint, callback) {*/
      /*console.log('Pretend to connect WebSocket');*/
      /*[>callback();<]*/
      /*},*/

      /*send: function (endpoint, danmakuData, callback) {*/
      /*console.log('Pretend to send danmaku via WebSocket', danmakuData);*/
      /*[>callback();<]*/
      /*},*/
      /*}*/
    });
    dp.on('danmaku_send', (args) => {

      console.log('danmaku', args)

    });
    return dp;
  } else {
    console.log(channelID, String.toString(channelID))
  }
  return null
}

watch(route, (currentRoute, oldRoute) => {
  console.log('currentID', currentRoute.params.channelID, id.value)
  if (currentRoute.params.channelID != id.value) {
    id.value = currentRoute.params.channelID
    dp.value = newPlayer(currentRoute.params.channelID)
  }
})

onMounted(() => {
  console.log("id", id, id.value)
  dp.value = newPlayer(id.value)
});

</script>

<template>
  <div class="container flex flex-col justify-between min-h-screen px-4 mx-auto">
    <div class="antialiased bg-gray-100 dark-mode:bg-gray-900">
      <div class="w-full text-gray-700 bg-white dark-mode:text-gray-200 dark-mode:bg-gray-800">
        <div class="flex flex-row items-center justify-between px-4 max-w-screen">
          <div class="flex flex-row items-center justify-between p-4">
            <router-link :to="{name: 'main', params: {channelID: 1}}">
              <a
                class="text-lg font-semibold tracking-widest text-gray-900 uppercase rounded-lg dark-mode:text-white focus:outline-none focus:shadow-outline"
              >BIT-Danmaku 弹幕视频网站</a>
            </router-link>
          </div>
          <nav class="flex-col flex-grow hidden pb-4 md:pb-0 md:flex md:justify-end md:flex-row">
            <div
              class="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
              href="#"
            >Channel #{{id}}</div>
          </nav>
        </div>
      </div>
    </div>
    <div class="w-full px-48">
      <div id="dplayer"></div>
    </div>
    <footer class="relative pt-8 pb-6 bg-blueGray-200">
      <div class="flex flex-wrap text-left lg:text-left">
        <div class="w-full px-4 lg:w-6/12">
          <h4 class="text-3xl fonat-semibold text-blueGray-700">关于我们</h4>
          <h5 class="mt-0 mb-2 text-lg text-blueGray-600">BIT-Danmaku 是一个支持弹幕的视频网站</h5>
        </div>
        <div class="w-full px-4 lg:w-6/12">
          <div class="flex flex-wrap mb-6 items-top">
            <div class="w-full px-4 ml-auto lg:w-4/12">
              <span class="block mb-2 text-sm font-semibold uppercase text-blueGray-500">我们使用了</span>
              <ul class="list-unstyled">
                <li>
                  <a
                    class="block pb-2 text-sm font-semibold text-blueGray-600 hover:text-blueGray-800"
                  >DevOps</a>
                </li>
                <li>
                  <a
                    class="block pb-2 text-sm font-semibold text-blueGray-600 hover:text-blueGray-800"
                    href="https://blog.creative-tim.com?ref=njs-profile"
                  >微服务</a>
                </li>
                <li>
                  <a
                    class="block pb-2 text-sm font-semibold text-blueGray-600 hover:text-blueGray-800"
                    href="https://www.github.com/creativetimofficial?ref=njs-profile"
                  >Github</a>
                </li>
                <li>
                  <a
                    class="block pb-2 text-sm font-semibold text-blueGray-600 hover:text-blueGray-800"
                    href="https://www.creative-tim.com/bootstrap-themes/free?ref=njs-profile"
                  >Monorepo</a>
                </li>
              </ul>
            </div>
            <div class="w-full px-4 lg:w-4/12">
              <span class="block mb-2 text-sm font-semibold uppercase text-blueGray-500">技术栈</span>
              <ul class="list-unstyled">
                <li>
                  <a
                    class="block pb-2 text-sm font-semibold text-blueGray-600 hover:text-blueGray-800"
                  >Golang go-micro</a>
                </li>
                <li>
                  <a
                    class="block pb-2 text-sm font-semibold text-blueGray-600 hover:text-blueGray-800"
                  >Vue 3</a>
                </li>
                <li>
                  <a
                    class="block pb-2 text-sm font-semibold text-blueGray-600 hover:text-blueGray-800"
                  >DPlayer</a>
                </li>
                <li>
                  <a
                    class="block pb-2 text-sm font-semibold text-blueGray-600 hover:text-blueGray-800"
                  >Kafka</a>
                </li>
                <li>
                  <a
                    class="block pb-2 text-sm font-semibold text-blueGray-600 hover:text-blueGray-800"
                  >Redis</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <hr class="my-6 border-blueGray-300" />
      <div class="flex flex-wrap items-center justify-center md:justify-between">
        <div class="w-full px-4 mx-auto text-center md:w-4/12">
          <div class="py-1 text-sm font-semibold text-blueGray-500">
            Copyright ©
            <span id="get-current-year">2021</span>
            <a
              href="https://www.creative-tim.com?ref=njs-profile"
              class="ml-1 text-blueGray-500 hover:text-blueGray-800"
            >bit-danmaku</a>.
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
a {
  color: #42b983;
}
</style>
