<script setup>
import { ref } from 'vue';
import axios from 'axios'
import { useRouter } from 'vue-router';

const searchQuery = ref("")
const queryTimeout = ref(null)
const mapboxResult = ref(null)
const searchError = ref(false)
const router = useRouter()
const keyApi = "pk.eyJ1Ijoiam9obmtvbWFybmlja2kiLCJhIjoiY2t5NjFzODZvMHJkaDJ1bWx6OGVieGxreSJ9.IpojdT3U3NENknF6_WhR2Q"

const previewCity = (result) => {
  console.log(result)
  const [city,state] = result.place_name.split(',')
  router.push({
    name : 'cityView',
    params : {
      state : state.replaceAll(" ",""),
      city : city
    },
    query : {
      lat : result.geometry.coordinates[1],
      lng : result.geometry.coordinates[0],
      preview : true
    }
  })
}

const getSearchResult = () => {
  clearTimeout(queryTimeout.value)
  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value !== "") {
      try {
        const result = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}/.json?access_token=${keyApi}&types=place`)
        mapboxResult.value = result.data.features
      } catch (error) {
        searchError.value = true
      }
      return
    }
    mapboxResult.value = null
  }, 100)
}
</script>

<template>
  <main class="text-white flex flex-col justify-center items-center">
    <div class="container pt-8 mb-8 relative flex justify-center items-center">
      <input type="text" v-model="searchQuery" @input="getSearchResult" placeholder="search for a city or state"
        class="p-2 w-3/4 border-b-2 bg-transparent text-2xl focus:outline-none font-semibold">
      <ul v-if="mapboxResult"
        class="absolute bg-[#E7F6F2] text-gray-700 font-semibold text-xl w-3/4 py-2 px-1 rounded top-[73px]">
        <p v-if="searchError" class="py-2">
          intinya pencarian error...
        </p>
        <p class="py-2" v-if="!searchError && mapboxResult.length === 0">
          No results match your query, try a different term.
        </p>
        <template v-else>
          <li v-for="searchResult in mapboxResult" :key="searchResult.id"
            class="py-2 cursor-pointer border-b border-b-gray-300 mt-1 hover:bg-gray-200"
            @click="previewCity(searchResult)">
            {{ searchResult.place_name }}
          </li>
        </template>
      </ul>
    </div>
  </main>
</template>
