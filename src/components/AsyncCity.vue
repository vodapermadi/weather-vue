<script setup>
import axios from "axios";
import { useRoute } from "vue-router";
const route = useRoute();
const getWeatherData = async () => {
  try {
    const weatherData = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${route.query.lat}&lon=${route.query.lng}&exclude={part}&appid=7efa332cf48aeb9d2d391a51027f1a71&units=imperial`
    );
    // cal current date & time
    const localOffset = new Date().getTimezoneOffset() * 60000;
    const utc = weatherData.data.current.dt * 1000 + localOffset;
    weatherData.data.currentTime =
      utc + 1000 * weatherData.data.timezone_offset;
    // cal hourly weather offset
    weatherData.data.hourly.forEach((hour) => {
      const utc = hour.dt * 1000 + localOffset;
      hour.currentTime =
        utc + 1000 * weatherData.data.timezone_offset;
    });
    return weatherData.data;
  } catch (err) {
    console.log(err);
  }
};
const weatherData = await getWeatherData();
console.log(weatherData)
</script>
<template>
  <div class="flex flex-col items-center">
    <!-- Banner -->
    <div v-if="route.query.preview" class="text-white font-semibold text-lg w-full text-center p-4 bg-[#395B64]">
      <p class="capitalize">
        anda dapat menambahkan kota, selain kota {{ route.params.city }} dengan menekan tombol '+'
      </p>
    </div>
    <!-- weather overview -->
    <div class="flex flex-col py-6 text-white items-center">
      <h1 class="text-4xl mb-2">{{ route.params.city }}</h1>
      <p class="text-lg">
        {{
          new Date(weatherData.currentTime).toLocaleDateString(
            "en-us",
            {
              weekday: "long",
              day: "2-digit",
              month: "long",
            }
          )
        }}
        {{
          new Date(weatherData.currentTime).toLocaleTimeString(
            "en-us",
            {
              timeStyle: "short",
            }
          )
        }}
        </p>
        <p class="mt-4 text-center font-bold">
          <span class="text-3xl">
            Temprature
          </span>
          <br>
          <span class="pl-6 text-8xl">
            {{ 
            Math.round((weatherData.current.temp - 32) * 5/9)
          }}&deg;C
          </span>
        </p>
        <p class="text-xl mt-2 font-bold text-center">
          <span class="">
            Feels Like
          </span>
          {{ 
            Math.round((weatherData.current.feels_like - 32) * 5/9)
          }}&deg;C
        </p>
        <img
        class="w-[150px] h-auto"
        :src="
          `http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`
        "
        alt=""
      />
    </div>
    <!-- hourly -->
    <div>

    </div>
  </div>
</template>
